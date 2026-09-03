import Link from "next/link";
import { footerLinks, navLinks, siteConfig } from "@/lib/data";
import { discoveryFiles } from "@/lib/site-discovery";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-forest/10 bg-forest-dark text-accent-light">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-serif text-xl font-semibold text-white">
              Expo City Hills
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Low-rise eco-luxury residences in Expo Hills district, Expo City
              Dubai — pre-launch by Dubai South Properties.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {[...navLinks, ...footerLinks].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="label-caps text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-white/50">
            {siteConfig.disclaimer}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/40">
            <Link href={discoveryFiles.sitemap} className="hover:text-white/70">
              Sitemap
            </Link>
            <Link href={discoveryFiles.llms} className="hover:text-white/70">
              LLMs.txt
            </Link>
          </p>
          <p className="mt-4 label-caps text-white/35">
            © {new Date().getFullYear()} expocityhills.ae
          </p>
        </div>
      </div>
    </footer>
  );
}
