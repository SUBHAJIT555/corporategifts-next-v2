import { Star } from "lucide-react";
import { FcGoogle } from "@/components/icons";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJO7SOrsRpXz4RIm-KxaoNZzQ";

export default function GoogleRatingStatic() {
  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm transition-colors sm:text-base"
      aria-label="Rated on Google — view our Google reviews"
    >
      <FcGoogle className="size-4 shrink-0 sm:size-[18px]" />
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="size-3.5 fill-amber-400 text-amber-400 sm:size-4"
            strokeWidth={1.75}
          />
        ))}
      </span>
      <span className="font-semibold text-ink group-hover:text-body">
        Rated on Google
      </span>
    </a>
  );
}
