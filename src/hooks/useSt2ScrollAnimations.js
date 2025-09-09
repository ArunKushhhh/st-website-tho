import { useEffect, useState } from "react";
import { useScroll, useMotionValue, animate } from "framer-motion";
import {
  STAGE_1_SHIFTS,
  STAGE_2_SHIFTS,
  ROTATED_IMAGES_STAGE_1,
  OPACITY_STAGES,
} from "../constants/st2Constants";
import { generateRandomTransforms } from "../utils/st2Utils";

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

  // Generate random transforms on mount
  useEffect(() => {
    const transforms = generateRandomTransforms(images.length);
    setImageTransforms(transforms);
  }, [images.length]);

  // Set up scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create motion values for text elements
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

  // Create motion values for each image (these will be animated discretely)
  const imageAnimations = images.map((_, index) => ({
    x: useMotionValue(0),
    y: useMotionValue(0),
    rotation: useMotionValue(0),
    opacity: useMotionValue(0.7),
  }));

  // Listen to scroll progress and trigger stage transitions
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // console.log("Scroll progress:", latest); // Debug log - REMOVED
      let newStage = 1;

      // Extended hold time - final stage triggers earlier and holds longer
      if (latest > 0.1 && latest <= 0.25) {
        newStage = 2; // Remove rotations but keep random positions
      } else if (latest > 0.25 && latest <= 0.45) {
        newStage = 3; // Move to almost organized state
      } else if (latest > 0.45) {
        newStage = 4; // Final organized state - triggers early for longer hold
      }

      if (newStage !== currentStage && imageTransforms.length > 0) {
        // console.log("Stage transition:", currentStage, "->", newStage); // REMOVED
        setCurrentStage(newStage);
        animateToStage(newStage);

        // Handle text animations based on stage transitions
        if (newStage === 4 && !showText) {
          // Entering stage 4 - animate text in
          setShowText(true);
          animateTextIn();
        } else if (newStage < 4 && showText) {
          // Leaving stage 4 - animate text out
          setShowText(false);
          animateTextOut();
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, currentStage, imageTransforms, showText]);

  // Function to animate to a specific stage
  const animateToStage = (stage) => {
    images.forEach((_, index) => {
      const transforms = imageTransforms[index];
      if (!transforms) return;

      let targetX, targetY, targetRotation, targetOpacity;

      switch (stage) {
        case 1:
          // Stage 1: Random chaotic positions with rotations
          targetX = transforms.x;
          targetY = transforms.y;
          targetRotation = transforms.rotation;
          targetOpacity = 0.7;
          break;
        case 2:
          // Stage 2: Same random positions but NO rotations
          targetX = transforms.x;
          targetY = transforms.y;
          targetRotation = 0; // Remove all rotations
          targetOpacity = 0.8;
          break;
        case 3:
          // Stage 3: Almost organized (slightly shifted from final)
          targetX = STAGE_1_SHIFTS[index].x;
          targetY = STAGE_1_SHIFTS[index].y;
          targetRotation = ROTATED_IMAGES_STAGE_1.includes(index) ? 15 : 0;
          targetOpacity = 0.9;
          break;
        case 4:
          // Stage 4: Final organized positions
          targetX = 0;
          targetY = 0;
          targetRotation = 0;
          targetOpacity = 1;
          break;
        default:
          return;
      }

      // Animate each property discretely with smooth easing
      animate(imageAnimations[index].x, targetX, {
        duration: 1.2,
        ease: "easeInOut",
      });
      animate(imageAnimations[index].y, targetY, {
        duration: 1.2,
        ease: "easeInOut",
      });
      animate(imageAnimations[index].rotation, targetRotation, {
        duration: 1.2,
        ease: "easeInOut",
      });
      animate(imageAnimations[index].opacity, targetOpacity, {
        duration: 0.8,
        ease: "easeInOut",
      });
    });
  };

  // Initialize to Stage 1 when transforms are ready
  useEffect(() => {
    if (imageTransforms.length > 0) {
      // Set initial values immediately without animation
      images.forEach((_, index) => {
        const transforms = imageTransforms[index];
        if (transforms) {
          imageAnimations[index].x.set(transforms.x);
          imageAnimations[index].y.set(transforms.y);
          imageAnimations[index].rotation.set(transforms.rotation);
          imageAnimations[index].opacity.set(0.7);
        }
      });
    }
  }, [imageTransforms]);

  // Text animation function
  const animateTextIn = () => {
    // Animate heading in first
    animate(textAnimations.heading.y, 0, {
      duration: 0.8,
      ease: "easeOut",
    });
    animate(textAnimations.heading.opacity, 1, {
      duration: 0.8,
      ease: "easeOut",
    });

    // Animate subheading with slight delay
    setTimeout(() => {
      animate(textAnimations.subheading.y, 0, {
        duration: 0.8,
        ease: "easeOut",
      });
      animate(textAnimations.subheading.opacity, 1, {
        duration: 0.8,
        ease: "easeOut",
      });
    }, 200);

    // Animate button with more delay
    setTimeout(() => {
      animate(textAnimations.button.y, 0, {
        duration: 0.8,
        ease: "easeOut",
      });
      animate(textAnimations.button.opacity, 1, {
        duration: 0.8,
        ease: "easeOut",
      });
    }, 400);
  };

  // Text animation out function for reversibility
  const animateTextOut = () => {
    // Animate all text elements out simultaneously (faster exit)
    animate(textAnimations.heading.y, -100, {
      duration: 0.6,
      ease: "easeIn",
    });
    animate(textAnimations.heading.opacity, 0, {
      duration: 0.6,
      ease: "easeIn",
    });

    animate(textAnimations.subheading.y, -80, {
      duration: 0.6,
      ease: "easeIn",
    });
    animate(textAnimations.subheading.opacity, 0, {
      duration: 0.6,
      ease: "easeIn",
    });

    animate(textAnimations.button.y, -60, {
      duration: 0.6,
      ease: "easeIn",
    });
    animate(textAnimations.button.opacity, 0, {
      duration: 0.6,
      ease: "easeIn",
    });
  };

  return {
    imageAnimations,
    textAnimations,
    isReady: imageTransforms.length > 0,
  };
};
