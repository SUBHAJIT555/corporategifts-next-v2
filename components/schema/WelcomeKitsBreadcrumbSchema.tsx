import { welcomeKitsBreadcrumbSchema } from "@/schemas/welcomeKitsBreadcrumbSchema";

export const WelcomeKitsBreadcrumbSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(welcomeKitsBreadcrumbSchema),
      }}
    />
  );
};
