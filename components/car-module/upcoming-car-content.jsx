import { fetchData } from "@/lib/fetch";

export default async function UpcomingCarContent({
  upcomingCarData,
  slug,
  brandSlug,
}) {
  const carBrandsResponse = await fetchData("/brands?models=true");
  const carBrand = carBrandsResponse?.find(
    (data) => data.slug == `/${brandSlug}`
  );

  const carModelsResponse = await fetchData("/upcoming-cars/models");

  // Fetch all pages of car models
  let carModelsData = [];
  const totalPages = carModelsResponse?.pagination?.totalPages || 1;

  for (let page = 1; page <= totalPages; page++) {
    const carModelsResponsePage = await fetchData(
      `/upcoming-cars/models?page=${page}`
    );
    carModelsData = [...carModelsData, ...carModelsResponsePage?.data];
  }

  // Find the car model based on the slug from all the pages
  const carDetail = carModelsData.find((data) => data.slug == slug);

  const imagePathFun = (path) => {
    let pathName = "";
    switch (path) {
      case "Battery Capacity":
        pathName = "/images/upcoming-specs/Battery.svg";
        break;
      case "Engine":
        pathName = "/images/upcoming-specs/Engine.png";
        break;

      case "Fuel":
        pathName = "/images/upcoming-specs/Fuel.png";
        break;

      case "Driving Range":
        pathName = "/images/upcoming-specs/Range.png";
        break;

      case "Power":
        pathName = "/images/upcoming-specs/Evpower.svg";
        break;

      case "Transmission":
        pathName = "/images/upcoming-specs/Transmission.png";
        break;

      case "Charging Time":
        pathName = "/images/upcoming-specs/Charging.svg";
        break;

      case "Mileage":
        pathName = "/images/upcoming-specs/Mileage.png";
        break;

      default:
        break;
    }

    return pathName;
  };

  return (
    <>
      <div className="sticky z-[9] top-0 border border-[#d9d9d9] bg-[#ffffff] shadow-[0_5px_39px_0_rgba(0,0,0,.08)] py-[10px]">
        <div className="max-w-[1400px] mx-auto px-[15px]">
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="w-auto max-w-[60px] md:max-w-[90px]">
              <img src={carBrand?.brand_logo} alt={brandSlug} />
            </div>
            <div>
              <h1 className="text-sm md:text-[22px] leading-[20px] md:leading-[30px] font-[700] md:mb-[5px]">
                {carDetail?.name}
              </h1>
              <p className="text-xs md:text-[16px] font-[400] leading-[24px]">
                Starting from ₹ {(carDetail?.min_price / 100000).toFixed(2)}{" "}
                Lakh*
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="">
        <img
          className="w-full h-[calc(100vh-250px)] min-h-[300px] object-cover "
          src={carDetail?.model_image}
          alt={carDetail?.image_alt}
          title={carDetail?.image_title}
        />
      </section>
      <div className="w-full max-w-[915px] mx-auto relative top-[-70px] md:top-[-100px]">
        <h3
          className="text-sm md:text-[20px] leading-[27px] mb-[-5px] ml-[20px] font-[600] inline-block py-[5px] px-[30px] bg-[#ffffff]"
          style={{ clipPath: "polygon(10% 0%,90% 0%,100% 100%,0% 100%)" }}
        >
          Overview
        </h3>
        <div className="border border-[#d2d2d5] bg-[#ffffff]">
          <ul className="p-[10px] flex flex-wrap gap-[10px]">
            {upcomingCarData.map((item, index) => {
              return Object.entries(item).map(([key, value]) => (
                <li
                  key={index}
                  className="flex-[0_0_calc(50%-5px)] sm:flex-[0_0_calc(33.33%-7px)] lg:flex-[1_0_0%] border border-[#d2d2d5] py-[15px] px-[5px] text-center"
                >
                  <img
                    src={imagePathFun(key)}
                    className="w-[38px] h-[38px] object-contain mb-[8px] mx-auto"
                    alt="Batter Capacity logo"
                  />
                  <p className="text-[13px] leading-[22px] text-[#656363] mb-[5px] capitalize font-[500]">
                    {key}
                  </p>
                  <p className="text-[14px] leading-[22px] text-[#222222] font-[600]">
                    {value} {key === "Battery Capacity" ? "kWh" : ""}{" "}
                    {key === "Engine" ? "cc" : ""}{" "}
                    {key === "Mileage" ? "kmpl" : ""}{" "}
                    {key === "Driving Range" ? "km/C" : ""}{" "}
                    {key === "Charging Time" ? "hrs" : ""}{" "}
                    {key === "Power" ? "bhp" : ""}
                  </p>
                </li>
              ));
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
