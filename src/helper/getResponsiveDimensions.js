export const getResponsiveDimensions = (screenSize) => {
  const vw = screenSize.width
  const vh = screenSize.height
  
  const safeViewportWidth = vw - 32 

  if (vw <= 480) {
    const maxCardWidth = Math.min(safeViewportWidth / 3.2, 100) 
    return {
      initialWidth: Math.max(maxCardWidth, 80),
      expandedWidth: Math.max(maxCardWidth * 1.2, 95),
      initialHeight: Math.min(100, vh * 0.12),
      expandedHeight: Math.min(250, vh * 0.35),
      gap: 8,
      textSize: 'text-lg',
      padding: 'px-2 pb-6'
    }
  } else if (vw <= 768) {
    const maxCardWidth = Math.min(safeViewportWidth / 3.5, 140)
    return {
      initialWidth: Math.max(maxCardWidth, 120),
      expandedWidth: Math.max(maxCardWidth * 1.3, 150),
      initialHeight: Math.min(120, vh * 0.15),
      expandedHeight: Math.min(350, vh * 0.75),
      gap: 12,
      textSize: 'text-2xl',
      padding: 'px-3 pb-8'
    }
  } else if (vw <= 1024) {
    const maxCardWidth = Math.min(safeViewportWidth / 3.8, 300)
    return {
      initialWidth: Math.max(maxCardWidth, 200),
      expandedWidth: Math.max(maxCardWidth * 1.15, 200),
      initialHeight: 250,
      expandedHeight: Math.min(380, vh * 0.55),
      gap: 16,
      textSize: 'text-2xl',
      padding: 'px-4 pb-10'
    }
  } else if (vw <= 1440) {
    const maxCardWidth = Math.min(safeViewportWidth / 4, 350)
    return {
      initialWidth: Math.max(maxCardWidth, 280),
      expandedWidth: Math.max(maxCardWidth * 1.2, 320),
      initialHeight: 150,
      expandedHeight: Math.min(450, vh * 0.65),
      gap: 18,
      textSize: 'text-4xl',
      padding: 'px-5 pb-11'
    }
  } else {
    const maxCardWidth = Math.min(safeViewportWidth / 4.2, 420)
    return {
      initialWidth: Math.max(maxCardWidth, 320),
      expandedWidth: Math.max(maxCardWidth * 1.15, 380),
      initialHeight: 150,
      expandedHeight: 450,
      gap: 20,
      textSize: 'text-4xl',
      padding: 'px-6 pb-12'
    }
  }
}