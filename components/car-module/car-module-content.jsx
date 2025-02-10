import { fetchData } from "@/lib/fetch";
import CarModuleInteractiveWrapper from "./car-module-interactive-wrapper";

export default async function CarModuleContent({
  brandSlug,
  modelSlug,
  variantSlug,
  variantsData,
}) {
  const [
    headerData,
    variantColorsData,
    keySpecsData,
    descriptionData,
    specificationData,
    similarVariantsData,
    pricingData,
    galleryData,
    faqData,
  ] = await Promise.all([
    fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),

    fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/colors`),
    fetchData(
      `/brands/${brandSlug}/${modelSlug}/${variantSlug}/key-highlights`
    ),
    fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/description`),
    fetchData(
      `/brands/${brandSlug}/${modelSlug}/${variantSlug}/specifications`
    ),
    fetchData(
      `/brands/${brandSlug}/${modelSlug}/${variantSlug}?similarVariants=true`
    ),
    fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/price`),
    fetchData(`/brands/${brandSlug}/${modelSlug}/gallery`),
    fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/faq`),
  ]);

  const headerDetails = headerData?.variant_detail[0];

  return (
    <CarModuleInteractiveWrapper
      brandSlug={brandSlug}
      modelSlug={modelSlug}
      variantSlug={variantSlug}
      variantsData={variantsData}
      headerDetails={headerDetails}
      pricingData={pricingData}
      variantColorsData={variantColorsData}
      keySpecsData={keySpecsData}
      descriptionData={descriptionData}
      specificationData={specificationData}
      galleryData={galleryData}
      similarVariantsData={similarVariantsData}
      faqData={faqData}
    />
  );
}
