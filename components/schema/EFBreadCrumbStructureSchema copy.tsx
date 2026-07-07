import { efBreadCrumbStructureSchema } from "@/schemas/efBreadCrumbStructureSchema";

export const EFBreadCrumbStructureSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(efBreadCrumbStructureSchema) }} />
    );
};