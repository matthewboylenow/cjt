import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CJ Technology",
  description:
    "IT consulting and solutions provider serving mid-size and enterprise businesses since 2005.",
  url: "https://cjtechnology.com",
  email: "info@cjtechnology.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iselin",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  foundingDate: "2005",
  founder: {
    "@type": "Person",
    name: "Joe Kreher",
  },
  serviceArea: {
    "@type": "State",
    name: "New Jersey",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
