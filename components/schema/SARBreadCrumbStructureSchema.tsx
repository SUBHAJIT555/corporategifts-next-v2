import { sarBreadCrumbStructureSchema } from "@/schemas/sarBreadCrumbStructureSchema";

export const SARBreadCrumbStructureSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sarBreadCrumbStructureSchema) }} />
    );
};