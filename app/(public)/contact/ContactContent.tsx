"use client";

import { useState } from "react";
import { FadeIn } from "@/components/public/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

const companySizes = [
  { value: "", label: "Select company size" },
  { value: "1-10", label: "1\u201310 employees" },
  { value: "10-25", label: "10\u201325 employees" },
  { value: "26-50", label: "26\u201350 employees" },
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
      {/* Custom Contact Hero — warm, friendly */}
      <section className="relative py-28 lg:py-36 bg-surface-warm overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn direction="left">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-bronze mb-4">
              Let&apos;s Talk
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-[1.1] tracking-[-0.02em] max-w-2xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-xl leading-relaxed">
              Fill out the form below or give us a call. We typically respond
              within one business day.
            </p>
            <a
              href="tel:8772275435"
              className="inline-block mt-6 font-heading text-3xl md:text-4xl font-bold text-brand-navy hover:text-brand-cyan transition-colors"
            >
              877.227.5435
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Strip + Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Contact info strip */}
          <FadeIn className="mb-12">
            <div className="bg-brand-navy rounded-xl px-8 py-5 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-white">
              <a href="tel:8772275435" className="flex items-center gap-3 hover:text-brand-cyan transition-colors">
                <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-medium">877.227.5435</span>
              </a>
              <a href="mailto:info@cjtechnology.com" className="flex items-center gap-3 hover:text-brand-cyan transition-colors">
                <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">info@cjtechnology.com</span>
              </a>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">Iselin, NJ</span>
              </div>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface-warm rounded-2xl p-12 text-center shadow-sm"
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
                    className="bg-surface-warm rounded-2xl p-8 md:p-10 shadow-sm space-y-6"
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
                          "Send It Over"
                        )}
                      </button>

                      <p className="mt-3 text-sm text-text-muted">
                        We typically respond within one business day.
                      </p>

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
          </div>
        </div>
      </section>
    </>
  );
}
