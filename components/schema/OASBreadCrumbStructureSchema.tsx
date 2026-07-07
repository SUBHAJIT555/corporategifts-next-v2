import { oasBreadCrumbStructureSchema } from "@/schemas/oasBreadCrumbStructureSchema";

export const OASBreadCrumbStructureSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(oasBreadCrumbStructureSchema) }} />
    );
};