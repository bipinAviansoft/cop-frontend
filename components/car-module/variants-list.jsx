import { cn, formatCarPrice } from "@/lib/utils";
import Link from "next/link";

export default function VariantsList({ variants, selectedVariantSlug }) {
  return (
    <ul className="flex flex-col gap-y-2">
      {variants.map((variant) => {
        const {
          brand_name,
          model_name,
          variant_name,
          ex_showroom_price,
          feature_values,
          fuel_type,
          slug,
        } = variant;

        const formattedPrice = !isNaN(ex_showroom_price)
          ? formatCarPrice(ex_showroom_price)
          : ex_showroom_price;

        return (
          <li
            key={slug}
            className={cn("bg-[#F6F2F2] rounded-md", {
              "bg-theme-black text-white": slug === selectedVariantSlug,
            })}
          >
            <Link
              href={`/${slug}`}
              className="px-3 py-2 lg:px-4 lg:py-3 flex items-center justify-between gap-x-8"
            >
              <div className="space-y-1">
                <h3 className="text-sm lg:text-base font-semibold">
                  {model_name} {variant_name}
                </h3>
                <p className="text-xs">{feature_values}</p>
              </div>
              <p className="text-sm lg:text-base font-semibold shrink-0">
                {!isNaN(ex_showroom_price)
                  ? `₹ ${formattedPrice.price} ${formattedPrice.unit}`
                  : ex_showroom_price}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
