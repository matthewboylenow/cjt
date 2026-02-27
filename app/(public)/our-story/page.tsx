import { Metadata } from "next";
import { OurStoryContent } from "./OurStoryContent";

export const metadata: Metadata = {
  title: "Our Story | CJ Technology",
  description:
    "CJ Technology is an IT consulting and solutions provider bringing together industry-leading service at a competitive price. In business since 2005, serving New Jersey businesses.",
};

export default function OurStoryPage() {
  return <OurStoryContent />;
}
