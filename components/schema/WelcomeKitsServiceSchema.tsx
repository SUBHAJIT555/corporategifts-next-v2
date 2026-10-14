import { welcomeKitsServiceSchema } from "@/schemas/welcomeKitsServiceSchema";

export const WelcomeKitsServiceSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(welcomeKitsServiceSchema),
      }}
    />
  );
};
