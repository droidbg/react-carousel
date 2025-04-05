import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Card from "./Card";

import "./index.css";
import { assignedGradients } from "./constants/gradient";

const CardSlider = ({
  slides,
}: {
  slides: { title: string; category: string }[];
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handles scrolling left
  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  // Handles scrolling right
  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-[98vw] overflow-hidden">
      {/* Left Gradient Overlay */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-pink-50 to-transparent "></div>

      {/* Right Gradient Overlay */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-pink-50 to-transparent "></div>

      {/* Carousel Container */}
      <div className="relative flex h-full w-full">
        {/* Left Arrow */}
        <div
          className="absolute top-25 left-10 z-15 cursor-pointer rounded-md border border-pink-400 text-5xl opacity-20 shadow-2xl shadow-pink-300 backdrop-blur-3xl hover:opacity-100  
         "
          onClick={prevSlide}
        >
          <FaAngleLeft />
        </div>

        {/* Slides Wrapper */}
        <div
          ref={sliderRef}
          className="no-scrollbar flex h-full cursor-pointer gap-8 overflow-x-scroll scroll-smooth p-6 px-16"
        >
          {slides.map((card, index) => (
            <div key={index}>
              <Card
                key={card.title + index}
                {...card}
                gradient={assignedGradients[index % assignedGradients.length]}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <div
          className="absolute top-25 right-10 z-15 cursor-pointer rounded-md border border-pink-400 text-5xl opacity-20 shadow-2xl backdrop-blur-3xl hover:opacity-100 "
          onClick={nextSlide}
        >
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
