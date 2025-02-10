"use client";

import CarModuleHeader from "@/components/car-module/car-module-header";
import Description from "@/components/car-module/description";
import KeySpecs from "@/components/car-module/key-specs";
import Specifications from "@/components/car-module/specifications";
import Variants from "@/components/car-module/variants";
import CarModuleComparisonContextProvider from "@/contexts/car-module-comparison-context";
import GalleryTabs from "./car-gallery-tabs";
import VariantColorCarousel from "./car-variant-color-carousel";
import ComparisonDrawer from "./comparison-drawer";
import FaqSection from "./faq-section";
import PriceAlert from "./price-alert";
import Pricing from "./pricing";
import RatingsAndReviews from "./ratings-and-reviews";
import SimilarVariantsSection from "./similar-variants-section";
import { useInView } from "react-intersection-observer";
import ScrollToMarginElement from "../ui/scroll-to-margin-element";

export default function CarModuleInteractiveWrapper({
  brandSlug,
  modelSlug,
  variantSlug,
  variantsData,
  headerDetails,
  pricingData,
  variantColorsData,
  keySpecsData,
  descriptionData,
  specificationData,
  galleryData,
  similarVariantsData,
  faqData,
}) {
  const { ref: overviewRef, inView: isOverviewInView } = useInView({
    threshold: 0.6,
  });
  const { ref: detailRef, inView: isDetailInView } = useInView({
    threshold: 0.6,
  });
  const { ref: galleryRef, inView: isGalleryInView } = useInView({
    threshold: 0.4,
  });
  const { ref: compareRef, inView: isCompareInView } = useInView({
    threshold: 0.6,
  });
  const { ref: faqRef, inView: isFaqInView } = useInView({
    threshold: 0.6,
  });

  const refsInView = {
    isOverviewInView,
    isDetailInView,
    isGalleryInView,
    isCompareInView,
    isFaqInView,
  };

  console.log('similarVariantsData ddd: ', similarVariantsData);
  

  const exshowroomPrice = pricingData[0]
    ? pricingData[0]["Ex-showroom Price"]
    : "N/A";
  const isPriceAlertSet = pricingData[0]
    ? Boolean(pricingData[0]["set_price_alert"])
    : false;

  return (
    <CarModuleComparisonContextProvider>
      <ComparisonDrawer
        variants={variantsData?.variants}
        selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
      />
      <CarModuleHeader
        headerDetails={headerDetails}
        price={exshowroomPrice}
        refsInView={refsInView}
      />
      <div className="container py-4 grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-6">
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-y-4 xl:gap-y-6">
          <VariantColorCarousel
            variantColorsData={variantColorsData}
            selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
            ref={overviewRef}
          />
          <div className="block lg:hidden bg-white py-4 px-3 rounded-md">
            <Variants
              variantsData={variantsData}
              selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
            />
          </div>

          <KeySpecs keySpecsData={keySpecsData} />
          <Description descriptionData={descriptionData} />
          <Specifications
            ref={detailRef}
            specsData={specificationData}
            headerData={headerDetails}
          />

          {/* Gallery section  */}
          <GalleryTabs galleryData={galleryData} ref={galleryRef} />
        </div>
        <div className="col-span-1 mt-6">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white py-4 px-3 rounded-md hidden lg:flex flex-col gap-y-4">
              <Variants
                variantsData={variantsData}
                selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
              />
              <span className="hidden lg:inline-block">
                <Pricing
                  pricing={pricingData[0]}
                  brand={brandSlug}
                  model={modelSlug}
                  selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
                />
              </span>
            </div>
            <div className="lg:hidden bg-white py-4 px-3 rounded-md">
              <Pricing
                pricing={pricingData[0]}
                brand={brandSlug}
                model={modelSlug}
                selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
              />
            </div>
            <PriceAlert
              isPriceAlertSet={isPriceAlertSet}
              brand={brandSlug}
              model={modelSlug}
            />
          </div>
        </div>
      </div>

      {similarVariantsData?.similar_variants?.length > 0 && (
        <>
          <ScrollToMarginElement id="compare" />
          <div className="bg-white" ref={compareRef}>
            <SimilarVariantsSection
              selectedVariant={headerDetails}
              similarVariants={similarVariantsData?.similar_variants}
            />
          </div>
        </>
      )}

      <RatingsAndReviews brandSlug={brandSlug} modelSlug={modelSlug} />

      {/* Faq Section */}
      <ScrollToMarginElement id="faq" />
      <section ref={faqRef} className="container py-10 lg:py-14 xl:py-20">
        <FaqSection
          faqData={faqData}
          brandSlug={brandSlug}
          modelSlug={modelSlug}
          variantSlug={variantSlug}
        />
      </section>
    </CarModuleComparisonContextProvider>
  );
}
