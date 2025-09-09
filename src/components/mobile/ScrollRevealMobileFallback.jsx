import React from "react";
import { MobileGalleryStack } from "./MobileGalleryStack";
import { MobileTestimonialCards } from "./MobileTestimonialCards";

/**
 * Fallback component for ScrollRevealMobile when Framer Motion fails
 * Uses CSS animations instead of motion values for maximum compatibility
 */
function ScrollRevealMobileFallback({
  children,
  bgImage,
  leftImage,
  rightImage,
  leftText = "Internship",
  rightText = "Volunteer",
  leftTestimonial = "Find it all here — workshops, internships, and job openings that kick-start your career.",
  leftTestimonialAuthor = "Sarah M.",
  rightTestimonial = "Volunteering here was incredibly rewarding. Highly recommend!",
  rightTestimonialAuthor = "John D.",
  rightTestimonialSlideshow = false,
  rightTestimonials = [],
  screenSize,
}) {
  return (
    <div className="relative w-full h-[100vh]">
      <div className="sticky top-[50px] mt-[50px] h-screen flex flex-col items-center px-4 py-8 overflow-hidden">
        <div className="flex items-center justify-center w-full h-1/2">
          <MobileGalleryStack
            centerImage={bgImage}
            leftImage={leftImage}
            rightImage={rightImage}
            centerChildren={children}
            leftText={leftText}
            rightText={rightText}
            isVisible={1} // Always visible for fallback
            rotationProgress={0} // No rotation in fallback
            screenSize={screenSize}
          />
        </div>

        <div className="w-full justify-center flex items-start pt-4">
          <MobileTestimonialCards
            leftTestimonial={leftTestimonial}
            leftTestimonialAuthor={leftTestimonialAuthor}
            rightTestimonial={rightTestimonial}
            rightTestimonialAuthor={rightTestimonialAuthor}
            rightTestimonialSlideshow={rightTestimonialSlideshow}
            rightTestimonials={rightTestimonials}
            isVisible={1} // Always visible for fallback
            screenSize={screenSize}
          />
        </div>
      </div>
    </div>
  );
}

export default ScrollRevealMobileFallback;
