import { eadBreadCrumbStructureSchema } from "@/schemas/eadBreadCrumbStructureSchema";

export const EADBreadCrumbStructureSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eadBreadCrumbStructureSchema) }} />
    );
};