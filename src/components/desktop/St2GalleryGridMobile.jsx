import React from "react";
import { ArrowRight } from "lucide-react";

const St2GalleryGridMobile = ({ images, showButtons }) => {
  // Add one more image to make total of 8 images
  const allImages = [...images].slice(0, 8);

  return (
    <div
      className={`w-full relative px-4 pb-8 transform transition-all duration-400 ${
        showButtons ? "mt-0" : "-mt-8"
      }`}
    >
      {/* Simple Heading Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-black mb-4">
          Discover career paths you never know!
        </h1>
        <p className="text-sm font-medium text-gray-700 leading-relaxed mb-2">
          Workshops that don't bore. Webinars with no-zoom fatigue.
        </p>
        <p className="text-sm font-medium text-gray-700 leading-relaxed">
          Courses that actually upskill. Dive into learning with vibe
        </p>
      </div>

      {/* Simple 2x4 Image Grid (2 rows, 4 columns) */}

      <div className="flex justify-center">
        <div className="grid grid-cols-2 grid-rows-4 gap-2 mb-8">
          {allImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square max-h-[19vh] overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className=" w-full h-full object-cover"
                onError={(e) => {
                  console.warn(`Failed to load image: ${image}`);
                  e.target.style.backgroundColor = "#f3f4f6";
                  e.target.style.border = "2px dashed #d1d5db";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Simple Explore Button */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-red-700 to-red-950 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-lg shadow-lg mx-auto">
          Explore
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default St2GalleryGridMobile;
