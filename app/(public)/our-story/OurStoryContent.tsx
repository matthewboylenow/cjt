"use client";

import { PageHero } from "@/components/public/PageHero";
import { FadeIn } from "@/components/public/FadeIn";
import { CTABand } from "@/components/public/sections/CTABand";

const sections = [
  {
    title: "Our Story",
    paragraphs: [
      "CJ Technology is an IT consulting and solutions provider that brings together industry-leading service at a competitive price. Our bottom line is to deliver solutions that meet your unique business requirements. Our services range from PC network support, voice, AV and IT product sales.",
      "President of CJ Technology, Joe Kreher, has been in the IT industry since 2000. He started his consulting company in 2005 and has been growing since.",
    ],
  },
  {
    title: "Our Team",
    paragraphs: [
      "It is our belief that a company is only as good as the people who represent it. Our team is made up of experienced and educated IT personnel with diverse skill sets.",
      "All of our specialized teams spend time reviewing each client's particular business situation to identify possible improvements and recommendations. Because of this, a diverse and highly skilled team will look at your business needs from varying perspectives.",
    ],
  },
  {
    title: "Our Promise To You",
    paragraphs: [
      "Whether you're a new or existing customer of ours, you already know that we provide you with top of the line, dependable service. We know not everything in your business or in life runs smoothly, and we pride ourselves on meeting every customer's need, no matter how big or small.",
      "Whether you need a box of toner delivered overnight, or a full network or website overhaul, we are ready and capable to meet your needs.",
    ],
  },
];

export function OurStoryContent() {
  return (
    <>
      <PageHero
        overline="Who We Are"
        title="Our Story"
        subtitle="Industry-leading IT service at a competitive price since 2005."
      />

      <section className="py-20 lg:py-28 bg-surface-warm">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {sections.map((section, index) => (
            <FadeIn key={section.title} delay={index * 0.1}>
              <div className={index > 0 ? "mt-16" : ""}>
                {index > 0 && (
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-surface-mist" />
                    <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                    <div className="h-px flex-1 bg-surface-mist" />
                  </div>
                )}

                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy tracking-[-0.01em] mb-6">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-lg text-text-secondary leading-relaxed mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.3}>
            <blockquote className="mt-16 border-l-4 border-brand-cyan pl-6 py-2">
              <p className="text-xl italic text-brand-navy font-heading">
                &ldquo;We pride ourselves on meeting every customer&apos;s need,
                no matter how big or small.&rdquo;
              </p>
              <cite className="block mt-3 text-sm text-text-secondary not-italic">
                CJ Technology
              </cite>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      <CTABand />
    </>
  );
}
