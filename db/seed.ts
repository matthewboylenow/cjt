import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { hash } from "bcryptjs";
import {
  admins,
  solutions,
  testimonials,
  pageContent,
} from "./schema";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  console.log("🌱 Starting seed...");

  // Admin
  const existingAdmins = await db.select().from(admins).limit(1);
  if (existingAdmins.length === 0) {
    const passwordHash = await hash(process.env.ADMIN_PASSWORD!, 12);
    await db.insert(admins).values({
      name: process.env.ADMIN_NAME!,
      email: process.env.ADMIN_EMAIL!,
      passwordHash,
    });
    console.log("✅ Admin created:", process.env.ADMIN_EMAIL);
  } else {
    console.log("⏭️  Admin already exists, skipping.");
  }

  // Solutions
  const existingSolutions = await db.select().from(solutions).limit(1);
  if (existingSolutions.length === 0) {
    const solutionData = [
      {
        heading: "Network & Infrastructure Management",
        body: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Are you looking to set up new computers? A new server? Data migrations? Hardware upgrades? Need your entire network reconfigured? From all the above issues to everything in-between, we will work with you to quickly diagnose problems and make cost-effective recommendations to help you meet your professional goals.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "We'll also manage your existing network to maximize uptime, ensure all of your software is updated with the latest security patches and handle any hardware malfunctions quickly.",
                },
              ],
            },
          ],
        },
        imageUrl: "/images/solution-network.svg",
        sortOrder: 0,
        isActive: true,
      },
      {
        heading: "Structured & Network Cabling",
        body: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Is your company expanding? Moving to a new location? Are you having connectivity issues and dropped connections? We can assist you in diagramming, laying and running structured and network cabling for all of your communications needs, including data, video surveillance, telephony and video conferencing.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "We can also help diagnose any issues with your existing cabling, making sure you're running at peak performance.",
                },
              ],
            },
          ],
        },
        imageUrl: "/images/solution-cabling.svg",
        sortOrder: 1,
        isActive: true,
      },
      {
        heading: "Managed Services - Amazon Web Services (AWS)",
        body: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "With Amazon Web Services, you're able to harness the power of the cloud in your local office. AWS can help your business through cloud backup services, servers-in-the-cloud and even your entire company's computer workstations in-the-cloud for on-demand access anywhere, at any time.",
                },
              ],
            },
          ],
        },
        imageUrl: "/images/solution-aws.svg",
        sortOrder: 2,
        isActive: true,
      },
      {
        heading: "Microsoft 365 Management",
        body: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Are you experiencing email downtime? Deliverability issues? Confusing hoops to jump through to add more inbox storage? Through Microsoft Office 365, we can take the headache out of email and get you and your company on a reliable, easy-to-use email service.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Say goodbye to all of the headaches of dealing with troublesome email and delivery issues.",
                },
              ],
            },
          ],
        },
        imageUrl: "/images/solution-microsoft365.svg",
        sortOrder: 3,
        isActive: true,
      },
      {
        heading: "Website Design & Development",
        body: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Are you frustrated that your website isn't generating you leads? Are leads slipping through the cracks? We've partnered with Adventii Media, a NJ-based website design and development agency that works with medium- and enterprise-level businesses to showcase your brand's online presence, converting your visitors into customers and brand advocates.",
                },
              ],
            },
          ],
        },
        imageUrl: "/images/solution-webdesign.svg",
        sortOrder: 4,
        isActive: true,
      },
      {
        heading: "Social Media & Digital Marketing",
        body: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "From strategic content creation and campaign management to data-driven advertising and performance tracking, our social media and digital marketing expert, Makayla, can build experiences that empower your brand's digital presence.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Through a thoughtful blend of creative storytelling and analytics-driven strategies, Makayla captures attention, drives meaningful engagement and supports sustainable growth with measurable results.",
                },
              ],
            },
          ],
        },
        imageUrl: "/images/solution-marketing.svg",
        sortOrder: 5,
        isActive: true,
      },
    ];

    await db.insert(solutions).values(solutionData);
    console.log("✅ 6 solutions seeded.");
  } else {
    console.log("⏭️  Solutions already exist, skipping.");
  }

  // Testimonials
  const existingTestimonials = await db.select().from(testimonials).limit(1);
  if (existingTestimonials.length === 0) {
    await db.insert(testimonials).values([
      {
        quote:
          "As a start-up company in 2005, we put our trust in CJ Technology to set up our firm with systems that were financially responsible to our cash flow, but equally responsible to our technology requirements and growth potential. CJT has responded to all of our needs over the years and have become our only source for technology.",
        authorName: "Steve Mellett",
        companyName: "Vericon Construction",
        sortOrder: 0,
        isActive: true,
      },
      {
        quote:
          "We were in need of a server and network upgrade and hired CJ Technology to take care of everything for us, including working with our software vendor for our specialized software. I couldn't ask for a smoother transition along with excellent monthly support.",
        authorName: "Steven Freeman",
        companyName: "Iselin Fire Department",
        sortOrder: 1,
        isActive: true,
      },
      {
        quote:
          "We were in need of a website overhaul and hired CJ Technology. They were able to deliver us excellent feedback and mock designs of what our website would look like and once we approved it, they were able to build us a great website.",
        authorName: "Pete Fiorini",
        companyName: "Percario Law",
        sortOrder: 2,
        isActive: true,
      },
    ]);
    console.log("✅ 3 testimonials seeded.");
  } else {
    console.log("⏭️  Testimonials already exist, skipping.");
  }

  // Our Story page
  const existingPage = await db
    .select()
    .from(pageContent)
    .where(eq(pageContent.pageSlug, "our-story"))
    .limit(1);
  if (existingPage.length === 0) {
    await db.insert(pageContent).values({
      pageSlug: "our-story",
      content: {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Our Story" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "CJ Technology is an IT consulting and solutions provider that brings together industry-leading service at a competitive price. Our bottom line is to deliver solutions that meet your unique business requirements. Our services range from PC network support, voice, AV and IT product sales.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "President of CJ Technology, Joe Kreher, has been in the IT industry since 2000. He started his consulting company in 2005 and has been growing since.",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Our Team" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "It is our belief that a company is only as good as the people who represent it. Our team is made up of experienced and educated IT personnel with diverse skill sets.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "All of our specialized teams spend time reviewing each client's particular business situation to identify possible improvements and recommendations. Because of this, a diverse and highly skilled team will look at your business needs from varying perspectives.",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Our Promise To You" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Whether you're a new or existing customer of ours, you already know that we provide you with top of the line, dependable service. We know not everything in your business or in life runs smoothly, and we pride ourselves on meeting every customer's need, no matter how big or small.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Whether you need a box of toner delivered overnight, or a full network or website overhaul, we are ready and capable to meet your needs.",
              },
            ],
          },
        ],
      },
    });
    console.log("✅ Our Story page content seeded.");
  } else {
    console.log("⏭️  Our Story content already exists, skipping.");
  }

  console.log("🌱 Seed complete!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
