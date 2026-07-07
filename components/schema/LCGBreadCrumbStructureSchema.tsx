import { lcgBreadCrumbStructureSchema } from "@/schemas/lcgBreadCrumbStructureSchema";

export const LCGBreadCrumbStructureSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lcgBreadCrumbStructureSchema) }} />
    );
};