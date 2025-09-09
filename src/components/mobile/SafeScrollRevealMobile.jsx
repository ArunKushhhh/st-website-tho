import React, { useState, useEffect } from "react";
import ScrollRevealMobile from "./ScrollRevealMobile";
import ScrollRevealMobileFallback from "./ScrollRevealMobileFallback";

/**
 * Safe wrapper for ScrollRevealMobile that handles hydration errors gracefully
 */
function SafeScrollRevealMobile(props) {
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset error state when key props change
  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [props.bgImage, props.leftImage, props.rightImage, hasError]);

  const handleError = (error) => {
    console.error("ScrollRevealMobile error:", error);
    setHasError(true);
  };

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // Show fallback component if error occurred
  if (hasError) {
    console.warn("ScrollRevealMobile failed, using fallback component");
    return <ScrollRevealMobileFallback {...props} />;
  }

  // Render main component with proper error handling
  return (
    <ErrorBoundary onError={handleError} fallback={<ScrollRevealMobileFallback {...props} />}>
      <ScrollRevealMobile {...props} />
    </ErrorBoundary>
  );
}

/**
 * Error boundary component to catch rendering errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default SafeScrollRevealMobile;