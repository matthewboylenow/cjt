import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/images/CJ Technology Logo 2026.png"
                alt="CJ Technology"
                width={180}
                height={42}
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              IT consulting and solutions provider serving mid-size and
              enterprise businesses since 2005.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/40 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/40 mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <span className="text-white/40 text-xs block mb-1">
                  Toll Free
                </span>
                <a
                  href="tel:8772275435"
                  className="hover:text-white transition-colors"
                >
                  877.227.5435
                </a>
              </li>
              <li>
                <a
                  href="tel:7327505077"
                  className="hover:text-white transition-colors"
                >
                  732.750.5077
                </a>
              </li>
              <li>
                <a
                  href="tel:7327508820"
                  className="hover:text-white transition-colors"
                >
                  732.750.8820
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cjtechnology.com"
                  className="hover:text-white transition-colors"
                >
                  info@cjtechnology.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <p className="text-xs text-white/30 leading-relaxed">
            Please Note: We are not affiliated with anything related to Walmart
            orders or any type of merchandise online. You need to get in touch
            with CJ-Technology.com at email{" "}
            <a
              href="mailto:cjtechnology01@gmail.com"
              className="underline hover:text-white/50 transition-colors"
            >
              cjtechnology01@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <p className="text-xs text-white/20 text-center">
            &copy; {new Date().getFullYear()} CJ Technology. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
