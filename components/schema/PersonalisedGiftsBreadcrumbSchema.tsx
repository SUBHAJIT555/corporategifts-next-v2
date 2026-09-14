import { personalisedGiftsBreadcrumbSchema } from "@/schemas/personalisedGiftsBreadcrumbSchema";

export const PersonalisedGiftsBreadcrumbSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personalisedGiftsBreadcrumbSchema),
      }}
    />
  );
};
