import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-warm px-6">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-bronze mb-4">
          404
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-[-0.02em] mb-4">
          Page not found
        </h1>
        <p className="text-text-secondary mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-brand-cyan px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-cyan-dark hover:shadow-lg hover:-translate-y-0.5"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
