import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);

    // Log additional debugging info
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b8001f] to-[#7a0015] text-white p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Oops! Something went wrong
            </h1>
            <p className="mb-4 text-gray-200">
              We're experiencing technical difficulties.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-[#b8001f] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Reload Page
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm bg-black/20 p-2 rounded">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs bg-black/40 p-2 rounded mt-2 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
