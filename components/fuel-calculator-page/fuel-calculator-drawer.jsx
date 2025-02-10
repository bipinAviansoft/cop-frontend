"use client";
import React, { useState } from "react";
import Image from "next/image";
import FromToImg from "@/public/images/from_to.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Button from "../ui/button";

export default function FuelCalculatorDrawer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="relative overflow-hidden order-2 lg:order-1 p-4 pt-0 lg:p-0">
        {/* Trigger Button */}
        <div onClick={() => setIsOpen(true)} className="absolute top-[50px] -left-2 text-left bg-primary-lighter rounded-full w-10 h-10 items-center justify-center hidden lg:flex z-0 cursor-pointer">
          <i className="bx bxs-right-arrow text-2xl text-white"></i>
        </div>

        {/* Drawer */}
        <div className={`relative top-0 left-0 p-5 sm:p-8 xl:p-12 max-w-full lg:max-w-[600px] w-full lg:w-[90%] h-auto lg:h-[calc(100vh-120px)] 2xl:h-[calc(100vh-90px)] flex flex-col bg-[#fafafa] transform transition-transform rounded-3xl lg:rounded-none ${isOpen ? "translate-x-0" : "-translate-x-[110%]"}`}>
          {/* Close Button */}
          <div onClick={() => setIsOpen(false)} className="absolute top-[50px] -right-[15px] bg-primary-lighter rounded-full w-10 h-10 items-center justify-center hidden lg:flex cursor-pointer">
            <i className="bx bxs-right-arrow bx-flip-horizontal text-2xl text-white"></i>
          </div>

          {/* Drawer Header */}
          <div className="mb-5">
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-2">Fuel Calculator</h2>
            <p className="text-sm lg:text-base text-gray-600">Plan your travel effectively by estimating the fuel costs of your trips.</p>
          </div>

          {/* Drawer Content */}
          <div className="overflow-auto h-full flex flex-col">
            <div className="flex gap-3 lg:gap-5 items-start">
              <Image src={FromToImg} alt="" className="w-8 md:w-10 mt-1 md:mt-0" />
              <div className="w-full flex flex-col gap-3 sm:gap-4 lg:gap-5 ">
                <div className="grid w-full items-center gap-2">
                  <Input type="text" placeholder="Starting Point" className="bg-white border-[1px] border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Input type="text" placeholder="End Point" className="bg-white border-[1px] border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
                <div className="flex w-max bg-primary-lighter text-xs md:text-sm py-1 px-2 text-white rounded-md">Distance: 282 KM</div>
                <div className="grid grid-cols-2 w-full gap-2 items-end">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="name" className="text-sm lg:text-base font-normal">
                      Vehicle Mileage
                    </Label>
                    <Input type="text" placeholder="Enter Vehicle Mileage" className="bg-white border-[1px] border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0" />
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Input type="text" placeholder="KM/L" value="KM/L" className="bg-white border-[1px] border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 w-full gap-2 items-end">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="name" className="text-sm lg:text-base font-normal">
                      Fuel Type
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full bg-white focus:ring-0 focus:ring-offset-0 h-[40px] sm:h-[45px] border-[1px] border-gray-200">
                        <SelectValue placeholder="Select Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Petrol">Petrol</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="CNG">CNG</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="name" className="text-sm lg:text-base font-normal">
                      Fuel Price (₹)
                    </Label>
                    <Input type="number" placeholder="Fuel Price" value="94.3" className="bg-white border-[1px] border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0" />
                  </div>
                </div>
                <div className="flex w-max text-xs md:text-sm bg-primary-lighter py-1 px-2 text-white rounded-md">Current Price: 94.29 ₹/L</div>
                <div>
                  <Button animated variant="primary-gradient" className="px-3 py-2 md:px-5 md:py-2 bg-primary-darker text-sm md:text-base font-medium">
                    Calculate Fuel <i className="bx bx-right-arrow-alt text-xl ml-1"></i>
                  </Button>
                </div>
              </div>
            </div>

            {/* Fuel Calculator Result */}
            <div className="flex flex-col gap-3 mt-8">
              <h3 className="text-2xl xl:text-3xl font-semibold ld:font-medium w-full text-center text-primary-lighter">Total Fuel Consumption</h3>
              <div className="grid w-full text-center gap-1">
                <Label htmlFor="name" className="text-base font-normal text-primary-lighter">
                  Volume
                </Label>
                <h4 className="text-xl font-semibold w-full bg-[#0177aa50] rounded-md py-2 px-1">20.14 Liter</h4>
              </div>
              <div className="grid w-full text-center gap-1">
                <Label htmlFor="name" className="text-base font-normal text-primary-lighter">
                  Price
                </Label>
                <h4 className="text-xl font-semibold w-full bg-[#0177aa50] rounded-md py-2 px-1">₹ 1899.27</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
