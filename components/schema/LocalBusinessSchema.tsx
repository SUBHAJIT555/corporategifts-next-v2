import { localBusinessSchema } from "@/schemas/localBusinessSchema";


export const LocalBusinessSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    );
};