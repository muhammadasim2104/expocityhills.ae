import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  variant?: "light" | "dark";
  href?: string;
  className?: string;
};

export default function SiteLogo({
  variant = "dark",
  href = "/",
  className = "",
}: SiteLogoProps) {
  const src =
    variant === "light" ? "/brand/logo-hills-white.png" : "/brand/logo-hills-dark.png";

  const content = (
    <Image
      src={src}
      alt="Expo City Hills"
      width={263}
      height={124}
      className={`h-12 w-auto shrink-0 sm:h-14 ${className}`}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0" aria-label="Expo City Hills — Home">
        {content}
      </Link>
    );
  }

  return content;
}
