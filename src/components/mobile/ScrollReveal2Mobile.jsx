import React, { useEffect, useRef, useState } from 'react'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'

const ScrollReveal2Mobile = ({ images }) => {
  const containerRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)
  
  // Generate random positions and rotations for each image
  const [imageTransforms, setImageTransforms] = useState([])
  
  useEffect(() => {
    // Generate random transforms for each image (smaller values for mobile)
    const transforms = images.map(() => ({
      x: Math.random() * 100 - 50, // Random x position between -50 and 50
      y: Math.random() * 100 - 50, // Random y position between -50 and 50
      rotation: Math.random() * 60 - 30 // Random rotation between -30 and 30 degrees
    }))
    setImageTransforms(transforms)
  }, [images])

  useScrollAnimations(containerRef, () => {
    setIsRevealed(true)
  })

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen flex items-center justify-center overflow-hidden relative px-4"
    >
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="relative h-32 w-full">
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className={`
                w-full h-full object-cover rounded-lg shadow-lg
                transition-all duration-1000 ease-out
                ${isRevealed 
                  ? 'transform-none opacity-100' 
                  : 'opacity-70'
                }
              `}
              style={!isRevealed ? {
                transform: `translate(${imageTransforms[index]?.x || 0}px, ${imageTransforms[index]?.y || 0}px) rotate(${imageTransforms[index]?.rotation || 0}deg)`
              } : {}}
            />
          </div>
        ))}
        {/* Center image for the 5th one */}
        {images[4] && (
          <div className="col-span-2 relative h-32 w-full max-w-xs mx-auto">
            <img
              src={images[4]}
              alt="Gallery image 5"
              className={`
                w-full h-full object-cover rounded-lg shadow-lg
                transition-all duration-1000 ease-out
                ${isRevealed 
                  ? 'transform-none opacity-100' 
                  : 'opacity-70'
                }
              `}
              style={!isRevealed ? {
                transform: `translate(${imageTransforms[4]?.x || 0}px, ${imageTransforms[4]?.y || 0}px) rotate(${imageTransforms[4]?.rotation || 0}deg)`
              } : {}}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ScrollReveal2Mobile
