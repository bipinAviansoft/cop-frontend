"use client";

import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import Button from "../ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export default function LatestAutomotiveNews({ blogs }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" }, [
    Autoplay({ delay: 7000 }),
  ]);

  const {
    onNextButtonClick,
    onPrevButtonClick,
    nextBtnDisabled,
    prevBtnDisabled,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      {/* header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl lg:text-2xl text-black font-bold">
          Latest Automotive News
        </h2>
        <div className="flex items-center gap-x-2">
          <Button
            animated
            className="uppercase text-xs md:text-sm lg:text-base tracking-wider h-auto"
          >
            Explore
          </Button>
          <div className="hidden md:flex items-center gap-x-2">
            <Button
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="size-10 flex justify-center items-center text-2xl h-auto"
            >
              <i className="bx bx-left-arrow-alt"></i>
            </Button>
            <Button
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="size-10 flex justify-center items-center text-2xl h-auto"
            >
              <i className="bx bx-right-arrow-alt"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* carousel */}
      <div ref={emblaRef} className="overflow-hidden select-none">
        <ul className="flex touch-pan-y touch-pinch-zoom cursor-grab -ml-4">
          {blogs?.map((news) => {
            const { ID, news_image, brand, post_date, post_title } = news;
            const { url } = news_image;
            const { name: author, image: authorImgUrl } = brand["0"];
            return (
              <li
                key={ID}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] pl-4 py-3 flex flex-col"
              >
                <Link
                  href="/"
                  className="grow p-4 rounded-xl bg-[#fafafa] flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-x-2">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={authorImgUrl}
                          alt={author}
                          fill
                          sizes="32px"
                        />
                      </div>
                      <span className="text-sm font-medium">{author}</span>
                    </div>
                    <span className="text-xs text-gray-darker">
                      {formatDistanceToNow(new Date(post_date), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="relative w-full aspect-5/3 rounded-lg overflow-hidden mb-4">
                    <Image
                      className="object-cover"
                      src={url}
                      alt={`Image provided by ${author} for this news`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>
                  <h4 className="text-lg font-semibold line-clamp-2 mb-2">
                    {post_title}
                  </h4>
                  <Button className="bg-[#e8effc] text-primary-darker rounded-full text-sm h-auto self-start mt-auto">
                    Read More <i className="bx bx-chevron-right text-xl"></i>
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
