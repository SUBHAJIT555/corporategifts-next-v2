import { aboutSchema } from "@/schemas/aboutSchema";

export const AboutSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
    );
};