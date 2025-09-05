import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export const MobileTestimonialCards = ({
  leftTestimonial,
  leftTestimonialAuthor,
  leftTestimonialProfile,
  rightTestimonial,
  rightTestimonialAuthor,
  rightTestimonialProfile,
  rightTestimonialSlideshow = false,
  rightTestimonials = [],
  isVisible = false,
  screenSize,
}) => {
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);

  // Add safety check for screenSize
  if (!screenSize || typeof screenSize.width !== "number") {
    return null;
  }

  // Prepare testimonial data
  const getTestimonialData = () => {
    const testimonials = [];
    
    // Add left testimonial
    if (leftTestimonial) {
      testimonials.push({
        text: leftTestimonial,
        author: leftTestimonialAuthor || "Anonymous",
        profilePic: leftTestimonialProfile,
        role: "User"
      });
    }

    // Add right testimonial(s)
    if (rightTestimonialSlideshow && rightTestimonials.length > 0) {
      testimonials.push(...rightTestimonials);
    } else if (rightTestimonial) {
      testimonials.push({
        text: rightTestimonial,
        author: rightTestimonialAuthor || "Anonymous",
        profilePic: rightTestimonialProfile,
        role: "User"
      });
    }

    // If we have less than 3 testimonials, duplicate them to create seamless loop
    if (testimonials.length > 0 && testimonials.length < 3) {
      const originalLength = testimonials.length;
      for (let i = 0; i < Math.ceil(6 / originalLength); i++) {
        testimonials.push(...testimonials.slice(0, originalLength));
      }
    }

    return testimonials;
  };

  const testimonialData = getTestimonialData();

  // Get responsive dimensions
  const getDimensions = () => {
    const vw = screenSize.width;
    
    if (vw <= 520) {
      return {
        cardWidth: 280,
        cardHeight: 160,
        gap: 16,
      };
    } else {
      return {
        cardWidth: 320,
        cardHeight: 160,
        gap: 20,
      };
    }
  };

  const dimensions = getDimensions();

  // Set up marquee animation
  useEffect(() => {
    if (!marqueeInnerRef.current || testimonialData.length === 0) return;

    const marqueeInner = marqueeInnerRef.current;
    const totalWidth = (dimensions.cardWidth + dimensions.gap) * testimonialData.length;
    
    // Set the width of the inner container
    gsap.set(marqueeInner, {
      width: totalWidth * 2, // Double width for seamless loop
    });

    // Create the continuous scrolling animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.set(marqueeInner, { x: 0 })
      .to(marqueeInner, {
        x: -totalWidth,
        duration: testimonialData.length * 8, // Adjust speed here (higher = slower)
        ease: "none"
      });

    return () => {
      tl.kill();
    };
  }, [testimonialData, dimensions, isVisible]);

  // Individual testimonial card component
  const TestimonialCard = ({ testimonial, index }) => (
    <div
      key={`${testimonial.author}-${index}`}
      style={{
        width: dimensions.cardWidth,
        height: dimensions.cardHeight,
        marginRight: dimensions.gap,
      }}
      className="bg-gray-950 rounded-xl p-4 text-white shadow-xl overflow-hidden border border-gray-800 flex-shrink-0"
    >
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
          <img
            src={testimonial.profilePic || "https://via.placeholder.com/40x40/6b7280/ffffff?text=U"}
            alt={testimonial.author}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {testimonial.author}
          </p>
          <p className="text-xs text-gray-400">{testimonial.role}</p>
        </div>
      </div>
      
      {/* Testimonial Text */}
      <p className="text-xs md:text-sm text-gray-200 leading-relaxed line-clamp-4">
        {testimonial.text}
      </p>
    </div>
  );

  if (testimonialData.length === 0) {
    return null;
  }

  return (
    <div 
      ref={marqueeRef}
      className="w-full overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out'
      }}
    >
      <div
        ref={marqueeInnerRef}
        className="flex"
        style={{
          width: 'fit-content'
        }}
      >
        {/* First set of testimonials */}
        {testimonialData.map((testimonial, index) => (
          <TestimonialCard
            key={`first-${index}`}
            testimonial={testimonial}
            index={index}
          />
        ))}
        
        {/* Duplicate set for seamless loop */}
        {testimonialData.map((testimonial, index) => (
          <TestimonialCard
            key={`second-${index}`}
            testimonial={testimonial}
            index={index + testimonialData.length}
          />
        ))}
      </div>
    </div>
  );
};