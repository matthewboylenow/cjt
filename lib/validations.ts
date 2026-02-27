import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.email("Valid email required"),
  phone: z.string().max(50).optional().or(z.literal("")),
  companyName: z.string().max(255).optional().or(z.literal("")),
  companySize: z.enum(["", "1-10", "10-25", "26-50", "51+"]).optional(),
  itFrustration: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
