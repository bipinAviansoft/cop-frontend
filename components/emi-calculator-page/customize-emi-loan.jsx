"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Button from "../ui/button";
import { useState } from "react";
import CarSelectionModal from "../layout/modals/car-selection-modal";
import { useRouter } from "next/navigation";
import ExploreBrandCard from "../ui/explore-brand-card";

export default function CustomizeEmiSection({
  brandModelsData,
  brandSlug,
  modelSlug,
  variantSlug,
  variantData,
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dpAmt, setDpAmt] = useState(
    variantData ? variantData.ex_showroom_price * 0.05 : 0
  );
  const [loanAmt, setLoanAmt] = useState(
    variantData ? variantData.ex_showroom_price - dpAmt : 500000
  );
  const [roi, setRoi] = useState(9);
  const [period, setPeriod] = useState(60);

  const onSelectVariant = (variant) => {
    router.replace(`/emi-calculator/${variant.slug}`);
  };

  const handleDpAmtChange = (e) => {
    const value = Number(e.target.value);
    const carPrice = variantData.ex_showroom_price;

    if (isNaN(value)) {
      setDpAmt(0.05 * carPrice);
      setLoanAmt(0.95 * carPrice);
    } else if (value > 0.95 * carPrice) {
      setDpAmt(0.95 * carPrice);
      setLoanAmt(0.05 * carPrice);
    } else if (value < 0) {
      setDpAmt(0);
      setLoanAmt(carPrice);
    } else {
      setDpAmt(value);
      setLoanAmt(carPrice - value);
    }
  };

  const handleRoiChange = (e) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      setRoi(9);
    } else if (value > 20) {
      setRoi(20);
    } else if (value < 1) {
      setRoi(1);
    } else {
      setRoi(value);
    }
  };

  const handlePeriodChange = (e) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      setPeriod(60);
    } else if (value > 120) {
      setPeriod(120);
    } else if (value < 1) {
      setPeriod(1);
    } else {
      setPeriod(value);
    }
  };

  const handleLoanAmtChange = (e) => {
    const value = e.target.value;

    if (isNaN(value)) {
      setLoanAmt(500000);
    } else if (value > 1e8) {
      setLoanAmt(1e8);
    } else if (value < 0) {
      setLoanAmt(0);
    } else {
      setLoanAmt(value);
    }
  };

  const monthlyRoi = roi / 100 / 12;
  const emi =
    (loanAmt * monthlyRoi * Math.pow(1 + monthlyRoi, period)) /
    (Math.pow(1 + monthlyRoi, period) - 1);
  const totalPayableAmount = emi * period;
  const totalInterest = totalPayableAmount - loanAmt;

  const chartData = [
    { type: "interest", amount: totalInterest, fill: "#0177aa" },
    { type: "principal", amount: loanAmt, fill: "#808080" },
  ];

  const chartConfig = {
    interest: {
      label: "Interest ",
      color: "#0177aa",
    },
    principal: {
      label: "Prinicpal ",
      color: "#808080",
    },
  };

  return (
    <>
      <CarSelectionModal
        isOpen={isModalOpen}
        brandModelsData={brandModelsData}
        onOpenChange={() => setIsModalOpen(false)}
        onSelectVariant={onSelectVariant}
      />
      {brandSlug && modelSlug && variantSlug && (
        <div className="w-full lg:w-2/3">
          <ExploreBrandCard model={variantData} singlePrice />
        </div>
      )}
      <Button
        className="px-4 py-2 text-base bg-white text-theme-black flex justify-between items-center min-w-52"
        onClick={() => setIsModalOpen(true)}
      >
        {brandSlug && modelSlug && variantSlug && variantData ? (
          variantData?.name
        ) : (
          <>
            Select Your Car <i className="bx bx-chevron-down"></i>
          </>
        )}
      </Button>
      <div className="bg-white mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6 xl:col-span-7 space-y-8 p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              Customize Car Loan EMI
            </h3>
            {variantData?.ex_showroom_price && (
              <div>
                <Label
                  htmlFor="loanamount"
                  className="text-lg font-medium text-[#222222] mb-2 block"
                >
                  Down Payment ₹
                </Label>
                <Input
                  type="number"
                  id="loanamount"
                  placeholder="Enter Loan Amount Value"
                  value={dpAmt}
                  onChange={handleDpAmtChange}
                  className="w-[300px] h-11 text-center text-lg text-black p-2 focus-visible:ring-0 focus-within:outline-none focus-within:shadow-none focus-within:ring-offset-2-0 focus-visible:ring-offset-20 "
                />
                <Slider
                  value={[dpAmt]}
                  onValueChange={setDpAmt}
                  min={0}
                  max={variantData.ex_showroom_price * 0.95}
                  step={1000}
                  className="mt-5 w-full"
                  rangeClassName="bg-primary-gradient"
                  trackClassname="h-[4px]"
                />
              </div>
            )}
            <div>
              <Label
                htmlFor="loanamount"
                className="text-lg font-medium text-[#222222] mb-2 block"
              >
                Loan Amount ₹
              </Label>
              <Input
                type="number"
                id="loanamount"
                value={loanAmt}
                onChange={handleLoanAmtChange}
                readOnly={brandSlug ? true : false}
                placeholder="Enter Loan Amount Value"
                className="w-[300px] h-11 text-center text-lg text-black p-2 focus-visible:ring-0 focus-within:outline-none focus-within:shadow-none focus-within:ring-offset-2-0 focus-visible:ring-offset-20 "
              />
              {!variantData && (
                <Slider
                  value={[loanAmt]}
                  onValueChange={(value) => setLoanAmt(value[0])}
                   min={0}
                  max={1e8}
                  step={1e5}
                  className="mt-5 w-full"
                  rangeClassName="bg-primary-gradient"
                  trackClassname="h-[4px]"
                />
              )}
            </div>
            <div>
              <Label
                htmlFor="loanamount"
                className="text-lg font-medium text-[#222222] mb-2 block"
              >
                Interest Rate %
              </Label>
              <Input
                type="number"
                value={roi}
                onChange={handleRoiChange}
                id="loanamount"
                placeholder="Interest Rate"
                className="w-[300px] h-11 text-center text-lg text-black p-2"
              />
              <Slider
                value={[roi]}
                onValueChange={setRoi}
                min={1}
                max={20}
                step={0.1}
                className="mt-5 w-full"
                rangeClassName="bg-primary-gradient"
                trackClassname="h-[4px]"
              />
            </div>
            <div>
              <Label
                htmlFor="loanamount"
                className="text-lg font-medium text-[#222222] mb-2 block"
              >
                Loan Period (Months)
              </Label>
              <Input
                type="number"
                id="loanamount"
                value={period}
                onChange={handlePeriodChange}
                placeholder="Loan Period Months"
                className="w-[300px] h-11 text-center text-lg text-black p-2 focus-visible:ring-0 focus-within:outline-none focus-within:shadow-none focus-within:ring-offset-2-0 focus-visible:ring-offset-20 "
              />
              <Slider
                value={[period]}
                onValueChange={setPeriod}
                min={1}
                max={120}
                step={1}
                className="mt-5 w-full"
                rangeClassName="bg-primary-gradient"
                trackClassname="h-[4px]"
              />
            </div>
          </div>
          <div className="lg:col-span-6 xl:col-span-5 pt-[70px] md:pt-[100px] p-8">
            <div className="bg-[#f6f2f2] p-2 md:p-4 rounded-xl flex flex-col justify-between h-full">
              <div className="flex gap-5">
                <div className="w-full">
                  <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mb-1">
                    ₹{" "}
                    {emi.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium mb-1">
                    EMI for {period} Months
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium mb-1">
                    ({Math.floor(period / 12)} Years {period % 12} Months)
                  </p>
                </div>
                <Card className="!bg-transparent w-full border-none shadow-none mt-[-100px] md:mt-[-150px]">
                  <CardContent className="!p-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square w-[200px] md:w-[250px] xl:w-[300px] max-h-[200px] md:max-h-[250px] xl:max-h-[300px]"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent
                              formatter={(value, name, item, index) => {
                                const fillColor = item?.payload?.fill;
                                return (
                                  <div className="flex items-center gap-x-4">
                                    <div
                                      className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                      style={{ backgroundColor: fillColor }}
                                    />
                                    <span className="capitalize">{name}: </span>
                                    <span>
                                      ₹{" "}
                                      {value.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                      })}
                                    </span>
                                  </div>
                                );
                              }}
                            />
                          }
                        />
                        <Pie data={chartData} dataKey="amount" nameKey="type" />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm sm:text-base md:text-lg text-black font-medium flex items-start md:items-center gap-2">
                    <span className="w-3 h-3 md:w-5 md:h-5 mt-[3px] md:mt-0 rounded-full bg-[#656363] block"></span>{" "}
                    Principal Amount
                  </h5>
                  <h4 className="text-sm sm:text-base md:text-lg text-black font-semibold">
                    ₹{" "}
                    {loanAmt.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </h4>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm sm:text-base md:text-lg text-black font-medium flex items-start md:items-center gap-2">
                    <span className="w-3 h-3 md:w-5 md:h-5 mt-[3px] md:mt-0 rounded-full bg-[#0177aa] block"></span>{" "}
                    Total Interest Payable
                  </h5>
                  <h4 className="text-sm sm:text-base md:text-lg text-black font-semibold">
                    ₹{" "}
                    {totalInterest.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </h4>
                </div>
                <div className="flex items-center justify-between p-[6px_3px] md:p-[10px_5px] bg-[rgba(217,217,217,0.4)] float-right w-[calc(100%-20px)] md:w-[calc(100%-28px)]">
                  <h5 className="text-sm sm:text-base md:text-lg text-black font-medium flex items-start md:items-center gap-2">
                    Total Amount Payable
                  </h5>
                  <h4 className="text-sm sm:text-base md:text-lg text-black font-semibold">
                    ₹{" "}
                    {totalPayableAmount.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
