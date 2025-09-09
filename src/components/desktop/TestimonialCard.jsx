import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const TestimonialCard = ({
    text,
    author,
    width,
    height,
    xOffset,
    yOffset,
    opacity,
    dimensions,
    zIndex = 15,
    isSlideshow = false,
    testimonials = [],
    profilePic = null
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const defaultTestimonials = [
        {
            text: "Volunteering here was life-changing. Made amazing connections and learned so much!",
            author: "Subham Kumar",
            profilePic: "https://res.cloudinary.com/dpazarvil/image/upload/v1750668160/assets/dggewxo2cajqdjazoem1.jpg"
        },
        {
            text: "The community here is incredible. Everyone is so supportive and welcoming!",
            author: "Priya Sharma",
            profilePic: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face"
        },
        {
            text: "Best volunteering experience I've ever had. Highly recommend to everyone!",
            author: "Raj Patel",
            profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
            text: "Great opportunities to make a real difference while building valuable skills.",
            author: "Anita Singh",
            profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    ]

    const slideshowData = testimonials.length > 0 ? testimonials : defaultTestimonials

    useEffect(() => {
        if (isSlideshow && slideshowData.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    (prevIndex + 1) % slideshowData.length
                )
            }, 3000)

            return () => clearInterval(interval)
        }
    }, [isSlideshow, slideshowData.length])

    const slideVariants = {
        enter: {
            x: 100,
            opacity: 0
        },
        center: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: -100,
            opacity: 0
        }
    }

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
                zIndex,
            }}
            className={`bg-black/84 rounded-xl shadow-lg text-white flex flex-col justify-center items-center border border-gray-700 overflow-hidden`}
        >
            <div className={`p-4 w-full h-full flex flex-col items-center justify-center`}>
                {isSlideshow ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="flex flex-col items-center justify-center text-center w-full"
                        >
                            <div className="flex flex-row items-center gap-3">
                                <div className="w-12 h-12 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden mb-3 border-2 border-gray-400">
                                    <img
                                        src={slideshowData[currentIndex].profilePic}
                                        alt={slideshowData[currentIndex].author}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-300 mb-3">
                                    {slideshowData[currentIndex].author}
                                </p>
                            </div>


                            <p className="text-xs md:text-sm lg:text-base leading-relaxed my-auto italic text-center">
                                "{slideshowData[currentIndex].text}"
                            </p>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <>
                        <p className="text-sm md:text-base lg:text-lg leading-relaxed my-auto italic text-center">
                            "{text}"
                        </p>
                        <p className="text-sm lg:text-xl font-semibold  text-gray-300">
                            {author}
                        </p>
                    </>
                )}

                {/* {isSlideshow && slideshowData.length > 1 && (
                    <div className="flex space-x-2 mt-4">
                        {slideshowData.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-white' : 'bg-gray-500'
                                    }`}
                            />
                        ))}
                    </div>
                )} */}
            </div>
        </motion.div>
    )
}