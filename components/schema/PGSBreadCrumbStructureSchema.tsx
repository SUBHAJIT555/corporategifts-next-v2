import { pgsBreadCrumbStructureSchema } from "@/schemas/pgsBreadCrumbStructureSchema";

export const PGSBreadCrumbStructureSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pgsBreadCrumbStructureSchema) }} />
    );
};