import React from "react"
import { motion } from "framer-motion"

export const SideCard = ({ 
  image, 
  text, 
  width, 
  height, 
  xOffset, 
  yOffset = 0,
  opacity, 
  dimensions, 
  textScale = 1,
  shrinkProgress = 0,
  zIndex = 20 
}) => {
  const textY = shrinkProgress
  // console.log(textY);
  
  
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        translateX: "-50%",
        translateY: "-50%",
        width,
        height,
        x: xOffset,
        y: yOffset,
        opacity,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex,
      }}
      className={`rounded-2xl shadow-lg overflow-hidden text-white flex items-end justify-center`}
    >
      <div className="absolute inset-0 bg-black/20" />
      <motion.div 
        style={{ 
          scale: textScale,
          y: textY
        }}
        className={`relative z-10 ${dimensions.padding} text-center w-full`}
      >
        <h3 className={`${dimensions.textSize} font-bold`}>{text}</h3>
      </motion.div>
    </motion.div>
  )
}