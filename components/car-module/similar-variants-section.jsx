import SimilarCarCard from "./similar-car-card";
import SimilarCarsCarousel from "./similar-cars-carousel";

export default function SimilarVariantsSection({
  selectedVariant,
  similarVariants,
}) {

  return (
    <>
      <div
        className="my-[50px]"
        style={{ background: "linear-gradient(90deg,#f6f2f2 20%,#fff 100%)" }}
      >
        <div className="bg-white p-[10px]">
          <div className="container">
            <h4 className="font-semibold text-md lg:text-[20px] lg:leading-[32px] text-[#222222] uppercase ">
              Compare
            </h4>
          </div>
        </div>
        <div className="container px-4 py-3 md:py-4 lg:py-6 rounded-md">
          <div className="relative flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
            <div className="md:col-span-1">
              <SimilarCarCard variantData={selectedVariant} isSelectedCar />
            </div>
            <span className="flex md:hidden justify-center items-center absolute top-1/2 -translate-y-1/2 left-4 bg-theme-black size-12 rounded-full text-white text-lg font-semibold text-center z-10">
              <span>VS</span>
            </span>
            <div className="md:col-span-1 lg:col-span-2 xl:col-span-3">
              <SimilarCarsCarousel variants={similarVariants} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
