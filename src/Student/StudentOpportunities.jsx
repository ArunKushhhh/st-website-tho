import React from "react";
import ScrollReveal from "../components/desktop/ScrollReveal";
import SafeScrollRevealMobile from "../components/mobile/SafeScrollRevealMobile";
import { useScreenSize } from "../hooks/useScreenSize";

import jobOpening from "../assets/jobOpening.webp";
import volunteer from "../assets/volunteer.webp";
import internship from "../assets/internship.webp";

function StAnimation1() {
  const { width } = useScreenSize();
  const isMobile = width < 768;

  const slideshowTestimonials = [
    {
      text: "Volunteering here was life-changing. Made amazing connections and learned so much!",
      author: "Subham Kumar",
      profilePic:
        "https://res.cloudinary.com/dpazarvil/image/upload/v1750668160/assets/dggewxo2cajqdjazoem1.jpg",
    },
    {
      text: "The community here is incredible. Everyone is so supportive and welcoming!",
      author: "Rajat Sharma",
      profilePic:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      text: "Best volunteering experience I've ever had. Highly recommend to everyone!",
      author: "Raj Patel",
      profilePic:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      text: "Great opportunities to make a real difference while building valuable skills.",
      author: "Anita Singh",
      profilePic:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const sharedProps = {
    bgImage: jobOpening,
    leftImage: internship,
    rightImage: volunteer,
    leftText: "Internship",
    rightText: "Volunteer",
    leftTestimonial:
      "Find it all here — workshops, internships, and job openings that kick-start your career. Get real-world exposure, build skills, and land roles that turn effort into pride and recognition.",
    leftTestimonialAuthor: "",
    rightTestimonial:
      "Volunteering here was life-changing. Made amazing connections and learned so much!",
    rightTestimonialAuthor: "- Subham Kumar",
    rightTestimonialSlideshow: true,
    rightTestimonials: slideshowTestimonials,
  };

  return (
    <div id="opportunities" className="flex flex-col w-full pb-20">
      {isMobile ? (
        <SafeScrollRevealMobile {...sharedProps}>
          <h2 className="text-lg font-bold md:text-xl">Job Opening</h2>
        </SafeScrollRevealMobile>
      ) : (
        <ScrollReveal {...sharedProps}>
          <h2 className="text-xl font-bold md:text-2xl lg:text-4xl">
            Job Opening
          </h2>
        </ScrollReveal>
      )}
    </div>
  );
}

export default StAnimation1;
