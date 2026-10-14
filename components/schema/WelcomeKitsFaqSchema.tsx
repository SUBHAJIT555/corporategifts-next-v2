import { welcomeKitsFaqSchema } from "@/schemas/welcomeKitsFaqSchema";

export const WelcomeKitsFaqSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(welcomeKitsFaqSchema),
      }}
    />
  );
};
