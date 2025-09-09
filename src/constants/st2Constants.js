// Animation stages configuration for St2
export const ANIMATION_STAGES = {
  STAGE_1: {
    scrollRange: [0, 0.33],
    description: "Random to less random state"
  },
  STAGE_2: {
    scrollRange: [0.33, 0.66], 
    description: "Almost managed state with shifts"
  },
  STAGE_3: {
    scrollRange: [0.66, 1],
    description: "Final organized state"
  }
}

// Stage 1 positions: slightly shifted from final, only r12 and rb11 rotated
export const STAGE_1_SHIFTS = [
  { x: 30, y: -20 },   // lt11
  { x: -25, y: 35 },   // lb11  
  { x: 40, y: 15 },    // l12
  { x: -15, y: -30 },  // m1
  { x: 25, y: 20 },    // r12
  { x: -35, y: -15 },  // rb11
  { x: 20, y: 25 }     // rt11
]

// Stage 2 positions: vertical shifts and middle left shift
export const STAGE_2_SHIFTS = [
  { x: 0, y: -25 },    // lt11 - shifted up
  { x: 0, y: 30 },     // lb11 - shifted down
  { x: 0, y: -20 },    // l12 - shifted up
  { x: -40, y: 0 },    // m1 - shifted left (middle image)
  { x: 0, y: 25 },     // r12 - shifted down
  { x: 0, y: -15 },    // rb11 - shifted up
  { x: 0, y: 20 }      // rt11 - shifted down
]

// Images that get rotation in stage 1 (r12 and rb11)
export const ROTATED_IMAGES_STAGE_1 = [4, 5] // indices for r12 and rb11

// Random position limits - clustered at bottom with left/right scatter
export const RANDOM_LIMITS = {
  x: { min: -200, max: 200 },  // Keep left/right scatter
  y: { min: 80, max: 200 },    // Cluster at bottom (positive Y = down)
  rotation: { min: -60, max: 60 }  // Keep heavy rotations
}

// Scroll container height
// Scroll height for the animation container - matching St1 pattern
export const SCROLL_HEIGHT = "h-[110vh] lg:h-[125vh]" // Sufficient height for 4-stage animation

// Opacity progression through stages
export const OPACITY_STAGES = [0.7, 0.85, 0.95, 1]
