import React from "react";
import ScrollReveal2 from "../components/desktop/ScrollReveal2";
import St2MobileGallery from "../components/desktop/St2MobileGallery";
import { useScreenSize } from "../hooks/useScreenSize";

// Import images from st2 folder
import l12 from "../assets/st2/l12.webp";
import lb11 from "../assets/st2/lb11.webp";
import lt11 from "../assets/st2/lt11.webp";
import m1 from "../assets/st2/m1.webp";
import r12 from "../assets/st2/r12.webp";
import rb11 from "../assets/st2/rb11.webp";
import rt11 from "../assets/st2/rt11.webp";
import education12 from "../assets/st2/education12.jpeg";

function StAnimation2() {
  const screenSize = useScreenSize();
  const isMobile = screenSize.width < 768; 

  // Arrange all 7 images based on naming convention: 11=furthermost, 12=closer to middle
  // From left to right: furthermost left, left closer, middle, right closer, furthermost right
  const galleryImages = [lt11, lb11, l12, m1, r12, rb11, rt11];
  const mobileGalleryImages = [
    education12,
    lt11,
    lb11,
    l12,
    m1,
    r12,
    rb11,
    rt11,
  ];

  return (
    <div id="school" className="w-full h-full flex items-center overflow-x-clip justify-center">
      {isMobile ? (
        <St2MobileGallery images={mobileGalleryImages} />
      ) : (
        <ScrollReveal2 images={galleryImages} />
      )}
    </div>
  );
}

export default StAnimation2;
