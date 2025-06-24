import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import "./JourneyCardCrousel.css";

const journeySteps = [
  {
    header: "IELTS Preparation",
    text: "We offer reading, listening, writing and speaking classes for a brighter future. This course will help you navigate the journey from dream to PR in your dream company."
  },
  {
    header: "Take Exam",
    text: "We prepare you to excel in your exams with confidence and clarity, setting the foundation for your success abroad."
  },
  {
    header: "College",
    text: "Get admission to top colleges with our expert guidance and application support for a smooth transition."
  },
  {
    header: "Bag a Job",
    text: "Secure your dream job with our career assistance and professional training."
  },
  {
    header: "PR",
    text: "Achieve Permanent Residency with our comprehensive support and application strategies."
  }
];

const JourneyCardCrousel = ({ stepIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(stepIndex);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = journeySteps.length - 1;
    } else if (newIndex >= journeySteps.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeIndex, paused]);

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="outerJourneyCard">
        <div className="bg-brandRed text-brandCream innerJourneyCard">
        <p className="text-brandCream xl:text-3xl text-2xl font-extrabold">
            {journeySteps[activeIndex].header}
          </p>
          <p className="text-brandCream text-base mt-[8px]">
            {journeySteps[activeIndex].text}
          </p>
      </div>

      {/* Navigation Buttons and Indicators */}
      <div className="navigation-container">
        <button onClick={() => updateIndex(activeIndex - 1)} className="prev-btn">
          &larr;
        </button>

        <div className="dots-container">
          {journeySteps.map((_, index) => (
            <div
              key={index}
              className={`dot ${activeIndex === index ? "active-dot" : ""}`}
              onClick={() => updateIndex(index)}
            >
              <div
                className="dot-progress"
                style={{
                  width: activeIndex === index ? "100%" : "0%",
                  transition: activeIndex === index ? "width 3s linear" : "none"
                }}
              />
            </div>
          ))}
        </div>

        <button onClick={() => updateIndex(activeIndex + 1)} className="next-btn">
          &rarr;
        </button>
      </div>
      </div>
    </div>
  );
};

export default JourneyCardCrousel;