import { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | CJ Technology",
  description:
    "Get in touch with CJ Technology for IT consulting, network management, cloud services, and more. Serving New Jersey businesses since 2005.",
};

export default function ContactPage() {
  return <ContactContent />;
}
