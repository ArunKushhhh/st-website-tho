import { RANDOM_LIMITS } from '../constants/st2Constants'

/**
 * Generates random transform values for images
 * @param {number} count - Number of images to generate transforms for
 * @returns {Array} Array of transform objects with x, y, and rotation properties
 */
export const generateRandomTransforms = (count) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * (RANDOM_LIMITS.x.max - RANDOM_LIMITS.x.min) + RANDOM_LIMITS.x.min,
    y: Math.random() * (RANDOM_LIMITS.y.max - RANDOM_LIMITS.y.min) + RANDOM_LIMITS.y.min,
    rotation: Math.random() * (RANDOM_LIMITS.rotation.max - RANDOM_LIMITS.rotation.min) + RANDOM_LIMITS.rotation.min
  }))
}

/**
 * Creates animation keyframes for a specific image through all stages
 * @param {number} index - Image index
 * @param {Object} initialTransform - Initial random transform
 * @param {Array} stage1Shifts - Stage 1 position shifts  
 * @param {Array} stage2Shifts - Stage 2 position shifts
 * @param {Array} rotatedIndices - Indices of images that get rotated in stage 1
 * @returns {Object} Animation keyframes for x, y, rotation
 */
export const createAnimationKeyframes = (index, initialTransform, stage1Shifts, stage2Shifts, rotatedIndices) => {
  return {
    x: [
      initialTransform.x,      // Stage 1: Initial random position
      stage1Shifts[index].x,   // Stage 2: Slightly shifted position
      0                        // Stage 3: Final organized position (center)
    ],
    y: [
      initialTransform.y,      // Stage 1: Initial random position
      stage1Shifts[index].y,   // Stage 2: Slightly shifted position  
      0                        // Stage 3: Final organized position (center)
    ],
    rotation: [
      initialTransform.rotation,                    // Stage 1: Initial random rotation
      rotatedIndices.includes(index) ? 15 : 0,     // Stage 2: Some specific images rotated
      0                                             // Stage 3: No rotation (organized)
    ]
  }
}
