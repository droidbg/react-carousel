import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Card from "./Card";

const CardSlider = ({
  slides,
  linkTo = "/",
}: {
  slides: {
    title: string;
    category: string;
    gradient: string;
  }[];
  linkTo?: string;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

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
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-pink-50 to-transparent dark:from-neutral-900"></div>
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-pink-50 to-transparent dark:from-neutral-900"></div>

      <div className="relative flex h-full w-full">
        <div
          className="absolute top-25 left-10 z-15 cursor-pointer rounded-md border border-pink-400 text-5xl opacity-20 shadow-2xl shadow-pink-300 backdrop-blur-3xl hover:opacity-100 dark:border-pink-100 dark:bg-neutral-900 dark:shadow-white"
          onClick={prevSlide}
        >
          <FaAngleLeft />
        </div>

        <div
          ref={sliderRef}
          className="no-scrollbar flex h-full cursor-pointer gap-8 overflow-x-scroll scroll-smooth p-6 px-16"
        >
          {slides.map((card, index) => (
            <a key={index} href={linkTo}>
              <Card key={card.title + index} {...card} />
            </a>
          ))}
        </div>

        <div
          className="absolute top-25 right-10 z-15 cursor-pointer rounded-md border border-pink-400 text-5xl opacity-20 shadow-2xl backdrop-blur-3xl hover:opacity-100 dark:border-amber-300 dark:bg-neutral-900 dark:shadow-amber-400"
          onClick={nextSlide}
        >
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
