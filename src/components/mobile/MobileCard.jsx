import React from "react"
import { motion } from "framer-motion"

export const MobileCard = ({ 
    bgImage, 
    children, 
    width = "100%", 
    height = 200,
    delay = 0,
    zIndex = 10,
    scale = 1,
    opacity = 1,
    className = ""
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: opacity }}
            transition={{ 
                duration: 0.4, 
                delay: delay,
                ease: "easeOut"
            }}
            style={{
                width,
                height,
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex,
                scale
            }}
            className={`relative rounded-xl shadow-xl overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 h-full flex items-end justify-center p-4">
                <div className="text-white text-center">
                    {children}
                </div>
            </div>
        </motion.div>
    )
}
