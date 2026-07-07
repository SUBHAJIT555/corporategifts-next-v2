import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/components/ui/testimonial";
import { TestimonialSpotlight } from "@/components/ui/testimonial-spotlight";

export type TestimonialType = {
  authorAvatar: string;
  authorName: string;
  authorTagline: string;
  url?: string;
  quote: string;
};

export function TestimonialList({
  direction,
  data,
}: {
  direction?: "right" | "left";
  data: TestimonialType[];
}) {
  return (
    <Marquee>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />

      <MarqueeContent direction={direction}>
        {data.map((item) => (
          <MarqueeItem
            key={`${item.authorName}-${item.quote.slice(0, 24)}`}
            className="mx-1 h-full w-xs"
          >
            {item.url ? (
              <a
                className="block h-full"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TestimonialSpotlight className="h-full">
                  <TestimonialItem {...item} />
                </TestimonialSpotlight>
              </a>
            ) : (
              <TestimonialSpotlight className="h-full">
                <TestimonialItem {...item} />
              </TestimonialSpotlight>
            )}
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  );
}

function TestimonialItem({
  authorAvatar,
  authorName,
  authorTagline,
  quote,
}: TestimonialType) {
  return (
    <Testimonial>
      <TestimonialQuote className="min-h-14">
        <p>{quote}</p>
      </TestimonialQuote>

      <TestimonialAuthor>
        <TestimonialAvatar>
          <TestimonialAvatarImg src={authorAvatar} alt={authorName} />
          <TestimonialAvatarRing />
        </TestimonialAvatar>

        <TestimonialAuthorName>{authorName}</TestimonialAuthorName>
        <TestimonialAuthorTagline>{authorTagline}</TestimonialAuthorTagline>
      </TestimonialAuthor>
    </Testimonial>
  );
}
