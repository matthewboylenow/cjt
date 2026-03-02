import { Metadata } from "next";
import { SolutionsContent } from "./SolutionsContent";

export const metadata: Metadata = {
  title: "IT Solutions | CJ Technology",
  description:
    "IT solutions including network management, structured cabling, AWS cloud services, Microsoft 365, website design, and digital marketing. Serving NJ businesses since 2005.",
};

const solutionsData = [
  {
    heading: "Network & Infrastructure Management",
    painLine: "Setup, maintenance, and troubleshooting for your entire network.",
    body: "Are you looking to set up new computers? A new server? Data migrations? Hardware upgrades? Need your entire network reconfigured? From all the above issues to everything in-between, we will work with you to quickly diagnose problems and make cost-effective recommendations to help you meet your professional goals.\n\nWe'll also manage your existing network to maximize uptime, ensure all of your software is updated with the latest security patches and handle any hardware malfunctions quickly.",
    image: "/img/server-maintenance.svg",
  },
  {
    heading: "Structured & Network Cabling",
    painLine: "New runs, troubleshooting, and infrastructure for growing offices.",
    body: "Is your company expanding? Moving to a new location? Are you having connectivity issues and dropped connections? We can assist you in diagramming, laying and running structured and network cabling for all of your communications needs, including data, video surveillance, telephony and video conferencing.\n\nWe can also help diagnose any issues with your existing cabling, making sure you're running at peak performance.",
    image: "/img/connected.svg",
  },
  {
    heading: "Managed Services - Amazon Web Services (AWS)",
    painLine: "Cloud backup, virtual servers, and remote access through AWS.",
    body: "With Amazon Web Services, you're able to harness the power of the cloud in your local office. AWS can help your business through cloud backup services, servers-in-the-cloud and even your entire company's computer workstations in-the-cloud for on-demand access anywhere, at any time.",
    image: "/img/cloud-hosting.svg",
  },
  {
    heading: "Microsoft 365 Management",
    painLine: "Migration, administration, and ongoing support for M365.",
    body: "Are you experiencing email downtime? Deliverability issues? Confusing hoops to jump through to add more inbox storage? Through Microsoft Office 365, we can take the headache out of email and get you and your company on a reliable, easy-to-use email service.\n\nSay goodbye to all of the headaches of dealing with troublesome email and delivery issues.",
    image: "/img/operating-system.svg",
  },
  {
    heading: "Website Design & Development",
    painLine: "Professional websites through our partner agency, Adventii Media.",
    body: "Are you frustrated that your website isn't generating you leads? Are leads slipping through the cracks? We've partnered with Adventii Media, a NJ-based website design and development agency that works with medium- and enterprise-level businesses to showcase your brand's online presence, converting your visitors into customers and brand advocates.",
    image: "/img/programming.svg",
  },
  {
    heading: "Social Media & Digital Marketing",
    painLine: "Content strategy, social media, and digital advertising.",
    body: "From strategic content creation and campaign management to data-driven advertising and performance tracking, our social media and digital marketing expert, Makayla, can build experiences that empower your brand's digital presence.\n\nThrough a thoughtful blend of creative storytelling and analytics-driven strategies, Makayla captures attention, drives meaningful engagement and supports sustainable growth with measurable results.",
    image: "/img/developer-activity.svg",
  },
];

export default function SolutionsPage() {
  return <SolutionsContent solutions={solutionsData} />;
}
