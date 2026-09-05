"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RegisterButton from "@/components/RegisterButton";
import { navLinks } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const isBuildingPage = pathname.startsWith("/expo-city-hills-");
  const overlay = (isHome || isBuildingPage) && !scrolled && !menuOpen;

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
        overlay ? "border-transparent bg-transparent" : "border-b border-forest/10 bg-background/95 backdrop-blur-md"
      }`}
    >
      <div className="site-container relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-4 lg:gap-4 lg:py-5">
        <Link
          href="/"
          className={`justify-self-start font-serif text-lg font-semibold tracking-wide ${overlay ? "text-white" : "text-forest"}`}
        >
          Expo City Hills
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                overlay ? "text-white/85 hover:text-white" : "text-foreground/70 hover:text-forest"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <RegisterButton
            className={`btn-editorial hidden lg:inline-flex ${
              overlay ? "btn-editorial-bordered" : "btn-editorial-primary"
            }`}
          >
            Register Your Interest
          </RegisterButton>
          <button
            type="button"
            className={`p-2 lg:hidden ${overlay ? "text-white" : "text-forest"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-forest/10 bg-background/98 backdrop-blur-md lg:hidden">
          <nav className="site-container py-6" aria-label="Mobile">
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="label-caps text-foreground/70 hover:text-forest">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <RegisterButton className="btn-editorial btn-editorial-primary w-full">
                  Register Your Interest
                </RegisterButton>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
