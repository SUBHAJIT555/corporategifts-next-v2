import { batBreadCrumbStructureSchema } from "@/schemas/batBreadCrumbStructureSchema";

export const BATBreadCrumbStructureSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(batBreadCrumbStructureSchema) }} />
    );
};