"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const overlay = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        overlay
          ? "border-transparent bg-transparent"
          : "border-b border-forest/10 bg-background/95 backdrop-blur-md"
      }`}
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-6 lg:gap-4 lg:px-8 lg:py-5">
        <Link
          href="/"
          className={`justify-self-start font-serif text-lg font-semibold tracking-wide ${
            overlay ? "text-white" : "text-forest"
          }`}
        >
          Expo City Hills
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                overlay
                  ? "text-white/85 hover:text-white"
                  : "text-foreground/70 hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/#register"
            className={`btn-editorial hidden lg:inline-flex ${
              overlay
                ? "btn-editorial-bordered"
                : "btn-editorial-primary"
            }`}
          >
            Register Your Interest
          </Link>
          <button
            type="button"
            className={`p-2 lg:hidden ${overlay ? "text-white" : "text-forest"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-forest/10 bg-background/98 backdrop-blur-md lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="label-caps text-foreground/70 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#register" className="btn-editorial btn-editorial-primary w-full">
                  Register Your Interest
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
