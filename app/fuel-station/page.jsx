import FuelStationsCards from "@/components/fuel-stations/fuel-stations-cards";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "fuel-station" };

  const data = await fetchMetaData(bodyData);

  return data;
}

export default async function FuelStationsPage() {
  const cities = await fetchData("/fuel-station/cities");

  return (
    <div className="bg-[#f6f2f2]">
      <section className="container py-8 lg:py-12 space-y-4 md:space-y-6 lg:space-y-8">
        <h1 className="text-2xl md:text-2xl font-bold">Find Fuel Stations</h1>
        <FuelStationsCards cities={cities} />
      </section>
    </div>
  );
}
