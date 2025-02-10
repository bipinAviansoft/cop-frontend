import Image from "next/image";
import BannerImg from "@/public/images/fuel-calculator.png";

export default function FuelBanner() {
  return (
    <div className="p-4 lg:p-3 xl:p-16 order-1 lg:order-2">
      <Image src={BannerImg} alt="" className="w-auto mb-4" />
      <h3 className="text-xl lg:text-2xl xl:text-3xl w-full text-primary-lighter font-bold mb-2">
        Know your fuel costs{" "}
        <span className="text-black"> before you go! </span>
      </h3>
      <p className="text-sm lg:text-base font-normal text-gray-500">
        Wondering how much fuel you will require for your next trip? Find it out
        at convenience with our FUEL CALCULATOR just by entering few details to
        get an estimate of fuel consumption.
      </p>
    </div>
  );
}
