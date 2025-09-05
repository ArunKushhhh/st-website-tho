import { motion } from 'framer-motion';
export const AnimatedCard = ({ 
  bgImage, 
  width, 
  height, 
  y, 
  textScale, 
  dimensions, 
  children, 
  zIndex = 30 
}) => (
  <motion.div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      translateX: "-50%",
      translateY: "-50%",
      width,
      height,
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      y,
      zIndex,
    }}
    className={`relative rounded-2xl shadow-xl overflow-hidden text-white flex items-end justify-center`}
  >
    <div className="absolute inset-0 bg-black/20" />
    <motion.div 
      style={{ scale: textScale }} 
      className={`relative ${dimensions.padding} text-center w-full z-40`}
    >
      {children}
    </motion.div>
  </motion.div>
)