import { contactSchema } from "@/schemas/contactSchema";

export const ContactSchema = () => {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
    );
};