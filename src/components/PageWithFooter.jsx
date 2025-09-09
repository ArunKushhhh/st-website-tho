import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import FooterMobile from './FooterMobile';

export default function PageWithFooter({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen width is less than 768px
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <>
      {children}
      {isMobile ? <FooterMobile /> : <Footer />}
    </>
  );
}