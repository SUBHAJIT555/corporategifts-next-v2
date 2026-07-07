import { aaaBreadCrumbStructureSchema } from "@/schemas/aaaBreadCrumbStructureSchema";

export const AAABreadCrumbStructureSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aaaBreadCrumbStructureSchema) }} />
    );
};