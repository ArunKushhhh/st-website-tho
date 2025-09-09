import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import "./index.css";
import { preloadImages } from "./utils/preloadImages";
import stlogoWebp from "./assets/Whitelogo.webp";
import img271 from "./assets/stApp/image 271.svg";
import img2712 from "./assets/stApp/image 2712.svg";
import img272 from "./assets/stApp/image 272.svg";
import img273 from "./assets/stApp/image 273.svg";
import img274 from "./assets/stApp/image 274.svg";
import sticker1 from "./assets/StBeast/sticker1.png";
import sticker2 from "./assets/StBeast/sticker2.png";
import splash1 from "./assets/splashscreen/Rectangle 3463918.svg";
import splash2 from "./assets/splashscreen/Rectangle 3463928.svg";
import stcarebg from "./assets/stcarebg.webp";
import redLogo from "./assets/Red logo.webp";
import whoWeAreBanner from "./assets/whoweare/banner.svg";
import whoWeAreFrame from "./assets/whoweare/Frame 2147223304.svg";
import st2_l12 from "./assets/st2/l12.webp";
import st2_lb11 from "./assets/st2/lb11.webp";
import st2_lt11 from "./assets/st2/lt11.webp";
import st2_m1 from "./assets/st2/m1.webp";
import st2_r12 from "./assets/st2/r12.webp";
import st2_rb11 from "./assets/st2/rb11.webp";
import st2_rt11 from "./assets/st2/rt11.webp";
import st2_education12 from "./assets/st2/education12.jpeg";
import jobOpening from "./assets/jobOpening.webp";
import volunteer from "./assets/volunteer.webp";
import internship from "./assets/internship.webp";
import stcare_banner from "./assets/StCare/banner.svg";
import stbeast_banner from "./assets/StBeast/banner.svg";
import brands_robot from "./assets/BrandsSection/image 269.svg";
import brands_iphone from "./assets/BrandsSection/iPhone.svg";
import brands_center from "./assets/BrandsSection/center.svg";
import brands_1 from "./assets/BrandsSection/1.webp";
import brands_left1st from "./assets/BrandsSection/left1st.webp";
import brands_left1st1 from "./assets/BrandsSection/left1st1.webp";
import brands_left2nd from "./assets/BrandsSection/left2nd.webp";
import brands_leftLower1st from "./assets/BrandsSection/leftLower1st.webp";
import brands_meeting from "./assets/BrandsSection/meeting.webp";
import brands_ouroffering2 from "./assets/BrandsSection/ouroffering2.png";
import brands_ourofferings1 from "./assets/BrandsSection/ourofferings1.png";
import brands_right2nd from "./assets/BrandsSection/right2nd.webp";
import brands_rightUpper1st from "./assets/BrandsSection/rightUpper1st.webp";

import About from "./pages/About";
import TermsConditions from "./pages/TermsConditions";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import BrandsIntroPage from "./Brands/BrandsIntroPage";
import StudentApp from "./Student/StudentApp";
import StudentLayout from "./Student/StudentLayout";
import StudentSchool from "./Student/StudentSchool";
import StudentEvents from "./Student/StudentEvents";
import StudentOpportunities from "./Student/StudentOpportunities";
import StudentBeast from "./Student/StudentBeast";
import StudentCare from "./Student/StudentCare";
import WhoweAre from "./Student/WhoWeAre";
import Header from "./components/Header";
import BrandsLayout from "./Brands/BrandsLayout";
import useStore from "./utils/store";

function App() {
  const { showSplash, setShowSplash } = useStore();

  useEffect(() => {
    // Only preload student images when on root route and splash is active
    const shouldPreload = true;
    if (!shouldPreload) return;

    // Timing policy for splash
    const MIN_DURATION = 3000; // minimum visible time (ms)
    const MAX_DURATION = 5000; // hard fallback (ms)

    // record start time so both preloader and SplashScreen callback can reference it
    startTimeRef.current = Date.now();

    // Build list of images to preload (local assets + representative remote images)
    const urls = [
      // Logos
      stlogoWebp,
      redLogo,

      // stApp / App images
      img271,
      img2712,
      img272,
      img273,
      img274,

      // Beast stickers & banners
      sticker1,
      sticker2,
      stbeast_banner,

      // Brands images
      brands_robot,
      brands_iphone,
      brands_center,
      // BrandsSection gallery
      brands_1,
      brands_left1st,
      brands_left1st1,
      brands_left2nd,
      brands_leftLower1st,
      brands_meeting,
      brands_ouroffering2,
      brands_ourofferings1,
      brands_right2nd,
      brands_rightUpper1st,

      // Splashscreen svgs
      splash1,
      splash2,

      // Who we are
      whoWeAreBanner,
      whoWeAreFrame,

      // Student care
      stcarebg,
      stcare_banner,

      // Student school (st2)
      st2_l12,
      st2_lb11,
      st2_lt11,
      st2_m1,
      st2_r12,
      st2_rb11,
      st2_rt11,
      st2_education12,

      // Opportunities images
      jobOpening,
      volunteer,
      internship,

      // Remote images used in StudentIntroPage
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1464822759844-d150baec0494?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1433477155337-9aea4e790195?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1441260038675-7329ab4cc264?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506142445379-d9bd755d76a2?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c99a?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?auto=format&fit=crop&w=400&q=80",
    ];

    let cancelled = false;
    const maxTimeoutId = setTimeout(() => {
      if (!cancelled) setShowSplash(false);
    }, MAX_DURATION);

    // when preload finishes, hide splash but enforce MIN_DURATION
    const finishHandler = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = MIN_DURATION - elapsed;
      if (remaining <= 0) {
        clearTimeout(maxTimeoutId);
        setShowSplash(false);
      } else {
        // wait remaining time but never exceed MAX_DURATION (maxTimeout will still fire)
        const minTimeout = setTimeout(() => {
          clearTimeout(maxTimeoutId);
          if (!cancelled) setShowSplash(false);
        }, remaining);

        // ensure we clear this timeout on unmount
        cleanupTimeoutsRef.current.push(minTimeout);
      }
    };

    preloadImages(urls, (progress) => {
      // optional: could update a progress bar here
    })
      .then(() => {
        if (!cancelled) finishHandler();
      })
      .catch(() => {
        if (!cancelled) finishHandler();
      });

    return () => {
      cancelled = true;
      clearTimeout(maxTimeoutId);
      // clear any queued min-timeouts
      cleanupTimeoutsRef.current.forEach((id) => clearTimeout(id));
      cleanupTimeoutsRef.current = [];
    };
  }, [setShowSplash]);

  // ensure SplashScreen onTransitionComplete respects min duration
  const startTimeRef = useRef(Date.now());
  const cleanupTimeoutsRef = useRef([]);

  const handleSplashTransitionComplete = () => {
    const MIN_DURATION = 3000;
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = MIN_DURATION - elapsed;
    if (remaining <= 0) {
      setShowSplash(false);
    } else {
      const t = setTimeout(() => setShowSplash(false), remaining);
      cleanupTimeoutsRef.current.push(t);
    }
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onTransitionComplete={() => setShowSplash(false)} />
      ) : (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<StudentLayout />} />
            <Route path="/school" element={<StudentSchool />} />
            <Route path="/app" element={<StudentApp />} />
            <Route path="/opportunities" element={<StudentOpportunities />} />
            <Route path="/events" element={<StudentEvents />} />
            <Route path="/beasts" element={<StudentBeast />} />
            <Route path="/care" element={<StudentCare />} />
            <Route path="/us" element={<WhoweAre />} />
            <Route path="/brands" element={<BrandsLayout />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<TermsConditions />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
