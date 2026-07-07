import { taaBreadCrumbStructureSchema } from "@/schemas/taaBreadCrumbStructureSchema";

export const TAABreadCrumbStructureSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(taaBreadCrumbStructureSchema) }} />
    );
};