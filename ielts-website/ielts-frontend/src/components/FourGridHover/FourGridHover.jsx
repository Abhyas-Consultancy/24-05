import { useState } from 'react';
import './FourGridHover.css';

function FourGridHover({ contents }) {
  const defaultIndex = contents.length - 1;
  const [hoveredIndex, setHoveredIndex] = useState(defaultIndex);

  return (
    // Add overflow-x-auto and flex-nowrap for mobile
    <div className="max-w-[1200px] m-auto h-[350px] transition-all duration-300 mt-[80px]
      overflow-x-auto
      scrollbar-hide
      overflow-visible flex-wrap
      flex flex-nowrap"
    >
      {contents.map((content, index) => {
        const isHovered = hoveredIndex === index;
        const isOther = hoveredIndex !== null && hoveredIndex !== index;

        // On mobile, use smaller widths, on desktop your original widths
        // Use Tailwind responsive prefixes sm: for desktop
        const widthClass = isHovered
          ? 'w-[200px] sm:w-[500px]'
          : isOther
          ? 'w-[133px] sm:w-[233px]'
          : 'w-[150px] sm:w-[250px]';

        return (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(defaultIndex)}
            className={`bg-brandRed text-brandCream h-full ${widthClass} flex items-center justify-center relative overflow-hidden transition-all duration-300 flex-shrink-0`}
          >
            <div className="relative z-10 w-full h-full">
              {/* Default vertical title (centered) */}
              <div
                className={`flex items-center justify-center h-full transition-opacity duration-300 ${
                  isHovered ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <h3 className="text-2xl sm:text-4xl font-extrabold [writing-mode:vertical-lr] transform rotate-180">
                  {content.title}
                </h3>
              </div>

              {/* Hover state: horizontal title above description */}
              {isHovered && (
                <h3 className="absolute top-12 left-6 text-2xl sm:text-4xl font-extrabold text-brandRed z-20">
                  {content.title}
                </h3>
              )}

              {/* Description: vertically center, left aligned */}
              <p
                className={`absolute inset-0 px-4 pt-6 sm:px-6 transition-all duration-300 ${
                  isHovered
                    ? 'opacity-100 flex items-center justify-start text-left bg-brandCream text-brandRed'
                    : 'opacity-0 bg-brandRed text-brandCream'
                }`}
              >
                {content.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FourGridHover;
