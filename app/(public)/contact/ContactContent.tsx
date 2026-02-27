"use client";

import { useState } from "react";
import { PageHero } from "@/components/public/PageHero";
import { FadeIn } from "@/components/public/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

const companySizes = [
  { value: "", label: "Select company size" },
  { value: "1-10", label: "1–10 employees" },
  { value: "10-25", label: "10–25 employees" },
  { value: "26-50", label: "26–50 employees" },
  { value: "51+", label: "51+ employees" },
];

const itFrustrations = [
  "Network/computer downtime",
  "Inconsistent backups",
  "Malware/ransomware issues",
  "Cabling/connection issues",
  "Company email",
  "Website",
  "Other",
];

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companySize: "",
    itFrustration: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Please enter a valid email";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        companySize: "",
        itFrustration: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const inputClasses = (fieldName: string) =>
    `w-full rounded-lg border ${
      errors[fieldName]
        ? "border-red-500 focus:ring-red-500"
        : "border-surface-mist-dark focus:ring-brand-navy"
    } bg-white px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:border-transparent transition-all`;

  return (
    <>
      <PageHero
        overline="Get In Touch"
        title="Contact Us"
        subtitle="Curious? Fill out the form below and tell us a little bit about yourself and your business. We'll be in touch shortly after!"
      />

      <section className="py-20 lg:py-28 bg-surface-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <FadeIn direction="left" className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-12 text-center shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-brand-navy mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-text-secondary">
                      Thank you for reaching out. We&apos;ll get back to you
                      shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-brand-cyan font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-8 md:p-10 shadow-sm space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className={inputClasses("name")}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className={inputClasses("email")}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          className={inputClasses("phone")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                          className={inputClasses("companyName")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Company Size
                        </label>
                        <select
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleChange}
                          className={inputClasses("companySize")}
                        >
                          {companySizes.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Biggest IT Frustration
                        </label>
                        <select
                          name="itFrustration"
                          value={formData.itFrustration}
                          onChange={handleChange}
                          className={inputClasses("itFrustration")}
                        >
                          <option value="">Select an option</option>
                          {itFrustrations.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Tell us about your company
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describe your IT needs, challenges, or questions..."
                        className={inputClasses("message")}
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full sm:w-auto rounded-lg bg-brand-cyan px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-brand-cyan-light hover:shadow-lg hover:shadow-brand-cyan/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                      >
                        {status === "submitting" ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </button>

                      {status === "error" && (
                        <p className="mt-3 text-sm text-red-500">
                          Something went wrong. Please try again or call us
                          directly.
                        </p>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </FadeIn>

            <FadeIn direction="right" delay={0.2} className="lg:col-span-2">
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-brand-navy mb-6">
                    Call Us
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
                        Toll Free
                      </p>
                      <a
                        href="tel:8772275435"
                        className="text-lg font-semibold text-brand-navy hover:text-brand-cyan transition-colors"
                      >
                        877.227.5435
                      </a>
                    </div>
                    <div className="flex gap-8">
                      <div>
                        <a
                          href="tel:7327505077"
                          className="text-text-secondary hover:text-brand-cyan transition-colors"
                        >
                          732.750.5077
                        </a>
                      </div>
                      <div>
                        <a
                          href="tel:7327508820"
                          className="text-text-secondary hover:text-brand-cyan transition-colors"
                        >
                          732.750.8820
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-brand-navy mb-4">
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@cjtechnology.com"
                    className="text-brand-cyan font-medium hover:underline"
                  >
                    info@cjtechnology.com
                  </a>
                </div>

                <div className="bg-brand-navy rounded-2xl p-8 text-white">
                  <h3 className="font-heading text-lg font-bold mb-4">
                    Why Choose CJT?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "In business since 2005",
                      "Industry-leading customer service",
                      "Solutions for your unique needs",
                      "Based in New Jersey",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
