import "./HomePageHeaderImage.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image1 from "../../assets/images/Header.png";
import Image2 from "../../assets/images/HeaderImage.png";
import Image3 from "../../assets/images/Header.png";

const images = [Image1, Image2, Image3];

function HomePageHeaderImage() {
  const text = "IELTS Preparation";
  const [showImages, setShowImages] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowImages(true), text.length * 150 + 500);
    const cycleTimer = setTimeout(() => {
      setShowImages(false);
      setCycle((prev) => prev + 1);
    }, text.length * 150 + images.length * 3000 + 500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(cycleTimer);
    };
  }, [cycle]);

  useEffect(() => {
    if (showImages) {
      const imageCycle = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(imageCycle);
    }
  }, [showImages]);

  return (
    <div
      className="relative w-full max-w-screen-lg mx-auto overflow-hidden rounded-lg"
      style={{ height: "400px" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {!showImages && (
          <div className="flex gap-1 text-8xl font-bold text-brandRed">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.15,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        )}

        {showImages && (
          <AnimatePresence mode="wait">
            <motion.img
              key={imageIndex}
              src={images[imageIndex]}
              alt={`Slide ${imageIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 1,
              }}
            />
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default HomePageHeaderImage;