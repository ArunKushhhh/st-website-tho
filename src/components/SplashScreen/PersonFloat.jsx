import { motion } from "framer-motion";

const PersonFloat = ({ peopleImages }) => {
  const radius = 200; 

  return (
    <div className="relative w-screen h-screen overflow-visible">
      {peopleImages.map((src, i) => {

        const angle = (i / peopleImages.length) * 2 * Math.PI;
        const x = radius * Math.cos(angle); 
        const y = radius * Math.sin(angle);

        return (
          <motion.img
            key={i}
            src={src}
            alt={`Person ${i + 1}`}
            className="absolute w-16 h-16 object-contain z-10"
            initial={{ x, y, opacity: 1, scale: 1 }}
            animate={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              duration: 4 + i * 0.2,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};
