import { useEffect, useState, useMemo, useCallback } from "react";
import { useScroll, useMotionValue, animate } from "framer-motion";
import {
  STAGE_1_SHIFTS,
  ROTATED_IMAGES_STAGE_1,
} from "../constants/st2Constants";
import { generateRandomTransforms } from "../utils/st2Utils";

// Animation configuration constants
const ANIMATION_CONFIG = {
  stageDurations: {
    position: 1.2,
    opacity: 0.8,
    textIn: 0.8,
    textOut: 0.6,
  },
  textDelays: {
    subheading: 200,
    button: 400,
  },
  easing: {
    smooth: "easeInOut",
    textIn: "easeOut",
    textOut: "easeIn",
  },
};

// Stage threshold configuration
const STAGE_THRESHOLDS = {
  stage2: 0.05,
  stage3: 0.25,
  stage4: 0.45,
};

/**
 * Custom hook for St2 scroll-triggered discrete animations
 * @param {Object} containerRef - Reference to the scroll container
 * @param {Array} images - Array of image sources
 * @returns {Object} Animation values for all images and text elements
 */
export const useSt2ScrollAnimations = (containerRef, images) => {
  const [imageTransforms, setImageTransforms] = useState([]);
  const [currentStage, setCurrentStage] = useState(1);
  const [showText, setShowText] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Generate random transforms on mount
  useEffect(() => {
    if (images.length > 0) {
      const transforms = generateRandomTransforms(images.length);
      setImageTransforms(transforms);
    }
  }, [images.length]);

  // Set up scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text motion values - created once per component instance
  const textAnimations = {
    heading: {
      y: useMotionValue(-100),
      opacity: useMotionValue(0),
    },
    subheading: {
      y: useMotionValue(-80),
      opacity: useMotionValue(0),
    },
    button: {
      y: useMotionValue(-60),
      opacity: useMotionValue(0),
    },
  };

  // Image motion values - created once per component instance
  const imageAnimations = images.map(() => ({
    x: useMotionValue(0),
    y: useMotionValue(0),
    rotation: useMotionValue(0),
    opacity: useMotionValue(0.7),
  }));

  // Calculate stage based on scroll progress
  const calculateStage = useCallback((scrollProgress) => {
    if (scrollProgress <= STAGE_THRESHOLDS.stage2) return 1;
    if (scrollProgress <= STAGE_THRESHOLDS.stage3) return 2;
    if (scrollProgress <= STAGE_THRESHOLDS.stage4) return 3;
    return 4;
  }, []);

  // Get target values for a specific stage and image index
  const getStageTargets = useCallback((stage, index, transforms) => {
    const stageConfigs = {
      1: {
        x: transforms.x,
        y: transforms.y,
        rotation: transforms.rotation,
        opacity: 0.7,
      },
      2: {
        x: transforms.x,
        y: transforms.y,
        rotation: 0, // Remove rotations in stage 2
        opacity: 0.8,
      },
      3: {
        x: STAGE_1_SHIFTS[index]?.x || 0,
        y: STAGE_1_SHIFTS[index]?.y || 0,
        rotation: ROTATED_IMAGES_STAGE_1.includes(index) ? 15 : 0,
        opacity: 0.9,
      },
      4: {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
      },
    };

    return stageConfigs[stage] || stageConfigs[1];
  }, []);

  // Animate text elements in with staggered timing
  const animateTextIn = useCallback(() => {
    const { heading, subheading, button } = textAnimations;
    const { textIn } = ANIMATION_CONFIG.easing;
    const duration = ANIMATION_CONFIG.stageDurations.textIn;

    // Animate heading immediately
    animate(heading.y, 0, { duration, ease: textIn });
    animate(heading.opacity, 1, { duration, ease: textIn });

    // Stagger subheading and button
    setTimeout(() => {
      animate(subheading.y, 0, { duration, ease: textIn });
      animate(subheading.opacity, 1, { duration, ease: textIn });
    }, ANIMATION_CONFIG.textDelays.subheading);

    setTimeout(() => {
      animate(button.y, 0, { duration, ease: textIn });
      animate(button.opacity, 1, { duration, ease: textIn });
    }, ANIMATION_CONFIG.textDelays.button);
  }, [textAnimations]);

  // Animate text elements out
  const animateTextOut = useCallback(() => {
    const { heading, subheading, button } = textAnimations;
    const { textOut } = ANIMATION_CONFIG.easing;
    const duration = ANIMATION_CONFIG.stageDurations.textOut;

    // Animate all text elements out simultaneously for faster exit
    [heading, subheading, button].forEach((element, index) => {
      const targetY = [-100, -80, -60][index];
      animate(element.y, targetY, { duration, ease: textOut });
      animate(element.opacity, 0, { duration, ease: textOut });
    });
  }, [textAnimations]);

  // Animate images to a specific stage
  const animateToStage = useCallback((stage) => {
    if (!imageTransforms.length) return;

    images.forEach((_, index) => {
      const transforms = imageTransforms[index];
      if (!transforms) return;

      const targets = getStageTargets(stage, index, transforms);
      const imageAnimation = imageAnimations[index];

      // Animate position and rotation
      animate(imageAnimation.x, targets.x, {
        duration: ANIMATION_CONFIG.stageDurations.position,
        ease: ANIMATION_CONFIG.easing.smooth,
      });
      animate(imageAnimation.y, targets.y, {
        duration: ANIMATION_CONFIG.stageDurations.position,
        ease: ANIMATION_CONFIG.easing.smooth,
      });
      animate(imageAnimation.rotation, targets.rotation, {
        duration: ANIMATION_CONFIG.stageDurations.position,
        ease: ANIMATION_CONFIG.easing.smooth,
      });
      
      // Animate opacity separately for better control
      animate(imageAnimation.opacity, targets.opacity, {
        duration: ANIMATION_CONFIG.stageDurations.opacity,
        ease: ANIMATION_CONFIG.easing.smooth,
      });
    });
  }, [images, imageTransforms, imageAnimations, getStageTargets]);

  // Initialize images to Stage 1 when transforms are ready
  useEffect(() => {
    if (imageTransforms.length > 0 && !isInitialized) {
      images.forEach((_, index) => {
        const transforms = imageTransforms[index];
        const imageAnimation = imageAnimations[index];
        
        if (transforms && imageAnimation) {
          // Set initial values without animation
          imageAnimation.x.set(transforms.x);
          imageAnimation.y.set(transforms.y);
          imageAnimation.rotation.set(transforms.rotation);
          imageAnimation.opacity.set(0.7);
        }
      });
      setIsInitialized(true);
    }
  }, [imageTransforms, images, imageAnimations, isInitialized]);

  // Handle scroll progress changes
  useEffect(() => {
    if (!isInitialized || !imageTransforms.length) return;

    const unsubscribe = scrollYProgress.on("change", (scrollProgress) => {
      const newStage = calculateStage(scrollProgress);
      
      if (newStage !== currentStage) {
        setCurrentStage(newStage);
        animateToStage(newStage);

        // Handle text visibility
        const shouldShowText = newStage === 4;
        if (shouldShowText !== showText) {
          setShowText(shouldShowText);
          if (shouldShowText) {
            animateTextIn();
          } else {
            animateTextOut();
          }
        }
      }
    });

    return unsubscribe;
  }, [
    scrollYProgress,
    currentStage,
    imageTransforms.length,
    showText,
    isInitialized,
    calculateStage,
    animateToStage,
    animateTextIn,
    animateTextOut,
  ]);

  return {
    imageAnimations,
    textAnimations,
    isReady: imageTransforms.length > 0 && isInitialized,
    currentStage, // Exposed for debugging if needed
  };
};