import { useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion"

export const useScrollAnimations = (scrollYProgress, dimensions) => {
 // Current values are too compressed - expand these ranges
const expandEnd = 0.3           // Change from 0.2 to 0.3
const emergeStart = 0.35        // Change from 0.22 to 0.35
const emergeEnd = 0.5           // Change from 0.3 to 0.5
const holdStart = 0.5
const holdEnd = 0.55            // Change from 0.32 to 0.55
const shrinkStart = 0.55        // Change from 0.32 to 0.55
const shrinkEnd = 0.7           // Change from 0.4 to 0.7
const settledEnd = 0.75         // Change from 0.5 to 0.75
const testimonialStart = 0.6    // Change from 0.42 to 0.6
const testimonialEnd = 0.75     // Change from 0.5 to 0.75
const finalHoldStart = 0.75     // Change from 0.5 to 0.75
const finalHoldEnd = 0.9        // Change from 0.94 to 0.9
const releaseStart = 0.95       // Keep at 0.97 or change to 0.95
  
  // Example for height animation - add more keyframes
const heightRaw = useTransform(
    scrollYProgress,
    [0, 0.1, expandEnd, settledEnd, finalHoldEnd, releaseStart, 1],
    [dimensions.initialHeight, dimensions.initialHeight, dimensions.expandedHeight, dimensions.expandedHeight, dimensions.expandedHeight, dimensions.expandedHeight, dimensions.expandedHeight]
)
  const height = useSpring(heightRaw, { stiffness: 100, damping: 35, mass: 1.2 })

  const widthRaw = useTransform(
    scrollYProgress,
    [0, expandEnd, settledEnd, finalHoldEnd, releaseStart, 1],
    [dimensions.initialWidth, dimensions.expandedWidth, dimensions.expandedWidth, dimensions.expandedWidth, dimensions.expandedWidth, dimensions.expandedWidth]
  )
  const width = useSpring(widthRaw, { stiffness: 100, damping: 35, mass: 1.2 })

  const sideProg = useTransform(scrollYProgress, [emergeStart, emergeEnd], [0, 1])
  const shrinkProg = useTransform(scrollYProgress, [shrinkStart, shrinkEnd], [0, 1])
  const shrinkProgSpring = useSpring(shrinkProg, { stiffness: 100, damping: 35, mass: 1.2 })
  
  const sideOffsetLeft = useTransform([sideProg, widthRaw, shrinkProg], ([p, w, shrink]) => {
    const baseOffset = -(w + dimensions.gap) * p
    const additionalGap = shrink * 2
    return baseOffset - additionalGap
  })
  const sideOffsetRight = useTransform([sideProg, widthRaw, shrinkProg], ([p, w, shrink]) => {
    const baseOffset = (w + dimensions.gap) * p
    const additionalGap = shrink * 2
    return baseOffset + additionalGap
  })
  
  const sideOpacity = useTransform(sideProg, [0, 0.5, 1], [0, 0.8, 1])
  
  const sideWidthRaw = useTransform([shrinkProg, widthRaw], ([shrink, w]) => w - (shrink * 2))
  const sideWidth = useSpring(sideWidthRaw, { stiffness: 100, damping: 35, mass: 1.2 })
  
  const sideHeightRaw = useTransform([shrinkProg, heightRaw], ([shrink, h]) => h * (1 - shrink * 0.5))
  const sideHeight = useSpring(sideHeightRaw, { stiffness: 100, damping: 35, mass: 1.2 })

  const leftCardY = useTransform([shrinkProg, heightRaw, sideHeightRaw], ([shrink, mainH, sideH]) => {
    return -shrink * ((mainH - sideH) / 2)
  })
  const leftCardYSpring = useSpring(leftCardY, { stiffness: 100, damping: 35, mass: 1.2 })

  const rightCardY = useTransform([shrinkProg, heightRaw, sideHeightRaw], ([shrink, mainH, sideH]) => {
    return shrink * ((mainH - sideH) / 2)
  })
  const rightCardYSpring = useSpring(rightCardY, { stiffness: 100, damping: 35, mass: 1.2 })

  const sideOffsetLeftSpring = useSpring(sideOffsetLeft, { stiffness: 100, damping: 35, mass: 1.2 })
  const sideOffsetRightSpring = useSpring(sideOffsetRight, { stiffness: 100, damping: 35, mass: 1.2 })

  const textMoveProg = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
  const centerToBottom = useTransform([textMoveProg, height], ([p, h]) => p * (h / 2 - 48))
  const textScaleRaw = useTransform(scrollYProgress, [0, expandEnd], [0.7, 1])
  const textScale = useSpring(textScaleRaw, { stiffness: 100, damping: 35, mass: 1.2 })

  const releaseY = useTransform(scrollYProgress, [releaseStart, 1], ["0%", "-65%"])
  const y = useSpring(releaseY, { stiffness: 100, damping: 35, mass: 1.2 })

  const sideTextScale = useTransform(shrinkProg, [0, 1], [1, 0.8])
  const sideTextScaleSpring = useSpring(sideTextScale, { stiffness: 100, damping: 35, mass: 1.2 })

  // Testimonial animations
  const testimonialProg = useTransform(scrollYProgress, [testimonialStart, testimonialEnd], [0, 1])
  const testimonialProgSpring = useSpring(testimonialProg, { stiffness: 100, damping: 35, mass: 1.2 })
  
  // Testimonial dimensions - smaller than side cards to create gaps
  const testimonialHeightRaw = useTransform([shrinkProg, heightRaw], ([shrink, h]) => {
    const baseHeight = h * (1 - shrink * 0.5) // Same as side cards initially
    return baseHeight - 20 // Reduce by 20px to create gaps
  })
  const testimonialHeight = useSpring(testimonialHeightRaw, { stiffness: 100, damping: 35, mass: 1.2 })
  
  // Left testimonial - appears from below, aligns with CENTER box bottom
  const leftTestimonialY = useTransform([testimonialProg, heightRaw, testimonialHeightRaw], ([p, centerH, testimonialH]) => {
    const centerBoxBottom = centerH / 2 // Bottom edge of center box
    const finalY = centerBoxBottom - testimonialH / 2 // Align testimonial bottom with center bottom
    const startY = finalY + 150 // Start well below
    return startY - (p * (startY - finalY))
  })
  const leftTestimonialYSpring = useSpring(leftTestimonialY, { stiffness: 100, damping: 35, mass: 1.2 })
  
  // Right testimonial - appears from above, aligns with CENTER box top
  const rightTestimonialY = useTransform([testimonialProg, heightRaw, testimonialHeightRaw], ([p, centerH, testimonialH]) => {
    const centerBoxTop = -centerH / 2 // Top edge of center box
    const finalY = centerBoxTop + testimonialH / 2 // Align testimonial top with center top
    const startY = finalY - 150 // Start well above
    return startY + (p * (finalY - startY))
  })
  const rightTestimonialYSpring = useSpring(rightTestimonialY, { stiffness: 100, damping: 35, mass: 1.2 })
  
  const testimonialOpacity = useTransform(testimonialProg, [0, 0.3, 1], [0, 0.5, 1])
  const testimonialOpacitySpring = useSpring(testimonialOpacity, { stiffness: 100, damping: 35, mass: 1.2 })

  return {
    height,
    width,
    sideOffsetLeft: sideOffsetLeftSpring,
    sideOffsetRight: sideOffsetRightSpring,
    sideOpacity,
    textScale,
    y,
    sideWidth,
    sideHeight,
    leftCardY: leftCardYSpring,
    rightCardY: rightCardYSpring,
    sideTextScale: sideTextScaleSpring,
    shrinkProgress: shrinkProgSpring,
    // Testimonial animations
    testimonialHeight,
    leftTestimonialY: leftTestimonialYSpring,
    rightTestimonialY: rightTestimonialYSpring,
    testimonialOpacity: testimonialOpacitySpring,
    testimonialProgress: testimonialProgSpring
  }
}