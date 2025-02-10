"use client";

import { cn } from "@/lib/utils";
/* import Slider from "react-slick"; */
import Button from "../ui/button";
import SimilarCarCard from "./similar-car-card";
/* import { useState } from "react"; */
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import { CarModuleComparisonContext } from "@/contexts/car-module-comparison-context";
import { useContext } from "react";

/* const NavigationBtn = ({ direction, onClick, disabled }) => {
  return (
    <Button
      variant="icon"
      className={cn(
        "p-1 bg-stone-600 text-white rounded-full text-lg absolute top-1/2 -translate-y-1/2 z-20",
        {
          "left-0 -translate-x-1/2": direction === "left",
          "right-0 translate-x-1/2": direction === "right",
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {direction === "left" ? (
        <i className="bx bxs-chevron-left"></i>
      ) : (
        <i className="bx bxs-chevron-right"></i>
      )}
    </Button>
  );
};

export default function SimilarCarsCarousel({ variants }) {
  const noOfSlide = variants.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <NavigationBtn direction="left" disabled={currentSlide === 0} />,
    nextArrow: (
      <NavigationBtn
        direction="right"
        disabled={currentSlide === noOfSlide - 3}
      />
    ),
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div>
      <Slider {...settings}>
        {variants.map((variant) => (
          <SimilarCarCard key={variant.id} variantData={variant} />
        ))}
      </Slider>
    </div>
  );
} */

export default function SimilarCarsCarousel({ variants }) {
  const { cars: carsSelectedForComparison } = useContext(
    CarModuleComparisonContext
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="relative select-none">
      <div className="overflow-hidden cursor-grab" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-3 lg:-ml-4">
          {variants.map((variant) => {
            const isSelectedForComparison = carsSelectedForComparison.filter(
              (car) => {
                return car.full_slug === variant.full_slug;
              }
            ).length;

            return (
              <div
                className="flex-[0_0_100%] lg:flex-[0_0_50%] xl:flex-[0_0_33.33%] min-w-0 pl-3 lg:pl-4"
                key={variant.id}
              >
                <SimilarCarCard
                  checkedForComparison={isSelectedForComparison}
                  variantData={variant}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Button
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className={cn(
          "p-1 bg-stone-600 text-white rounded-full text-lg absolute top-1/2 -translate-y-1/2 z-20 left-0 -translate-x-1/2"
        )}
      >
        <i className="bx bxs-chevron-left"></i>
      </Button>
      <Button
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className={cn(
          "p-1 bg-stone-600 text-white rounded-full text-lg absolute top-1/2 -translate-y-1/2 z-20 right-0 translate-x-1/2"
        )}
      >
        <i className="bx bxs-chevron-right"></i>
      </Button>
    </section>
  );
}
