import { cn } from "@/lib/utils";
import Image from "next/image";

/* const LINKS = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "details",
    label: "Details",
  },
  {
    id: "gallery",
    label: "Gallery",
  },
  {
    id: "compare",
    label: "Compare",
  },
  {
    id: "faq",
    label: "FAQ's",
  },
]; */

export default function CarModuleHeader({ headerDetails, price, refsInView }) {
  const { brand_name, model_name, variant_name, brand_logo } = headerDetails;
  const {
    isOverviewInView,
    isDetailInView,
    isGalleryInView,
    isCompareInView,
    isFaqInView,
  } = refsInView;

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-40">
      <div className="container flex flex-col lg:flex-row lg:justify-between">
        <div className="flex gap-x-3 items-center py-2">
          <div className="relative w-20 lg:w-24 aspect-[10/7]">
            <Image
              src={brand_logo}
              fill
              className="object-cover object-center"
              alt={brand_name}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <h1 className="font-bold lg:text-xl">
              {brand_name} {model_name} {variant_name}
            </h1>
            {/* <h2 className="text-xs lg:text-base font-semibold">
              
            </h2> */}
          </div>
          {price && (
            <div className="lg:hidden bg-[#e9f0f2] p-2 rounded-md shrink-0 flex flex-col items-end">
              <p className="text-sm font-semibold">
                ₹ {price.toLocaleString("en-IN")}
              </p>
              <p className="text-xs flex items-center gap-x-1">
                <span className="underline underline-offset-2">
                  Ex-showroom price
                </span>{" "}
                <i className="bx bx-info-circle"></i>
              </p>
            </div>
          )}
        </div>

        <div className="text-sm md:text-base font-medium lg:font-semibold text-center text-gray-500 lg:self-end">
          <ul className="flex gap-x-2 lg:gap-x-6 flex-wrap">
            <li className="me-2">
              <button
                onClick={() => scrollToSection("overview")}
                className={cn(
                  "inline-block py-0.5 lg:py-2.5 border-b-[3px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300",
                  isOverviewInView
                    ? "text-primary-lighter border-b-[3px] border-primary-lighter"
                    : ""
                )}
              >
                Overview
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => scrollToSection("detail")}
                className={cn(
                  "inline-block py-0.5 lg:py-2.5 border-b-[3px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300",
                  isDetailInView
                    ? "text-primary-lighter border-b-[3px] border-primary-lighter"
                    : ""
                )}
              >
                Detail
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => scrollToSection("gallery")}
                className={cn(
                  "inline-block py-0.5 lg:py-2.5 border-b-[3px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300",
                  isGalleryInView
                    ? "text-primary-lighter border-b-[3px] border-primary-lighter"
                    : ""
                )}
              >
                Gallery
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => scrollToSection("compare")}
                className={cn(
                  "inline-block py-0.5 lg:py-2.5 border-b-[3px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300",
                  isCompareInView
                    ? "text-primary-lighter border-b-[3px] border-primary-lighter"
                    : ""
                )}
              >
                Compare
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => scrollToSection("faq")}
                className={cn(
                  "inline-block py-0.5 lg:py-2.5 border-b-[3px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300",
                  isFaqInView
                    ? "text-primary-lighter border-b-[3px] border-primary-lighter"
                    : ""
                )}
              >
                FAQ&apos;s
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
