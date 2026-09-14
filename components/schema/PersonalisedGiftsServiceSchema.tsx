import { personalisedGiftsServiceSchema } from "@/schemas/personalisedGiftsServiceSchema";

export const PersonalisedGiftsServiceSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personalisedGiftsServiceSchema),
      }}
    />
  );
};
