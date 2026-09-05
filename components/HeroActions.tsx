import Link from "next/link";
import RegisterButton from "@/components/RegisterButton";

export default function HeroActions({
  exploreText = "Explore Expo City Hills",
  exploreHref = "/#about",
}: {
  exploreText?: string;
  exploreHref?: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <RegisterButton className="btn-editorial btn-editorial-bordered">
        Register Your Interest
      </RegisterButton>
      <Link href={exploreHref} className="btn-editorial btn-editorial-bordered">
        {exploreText}
      </Link>
    </div>
  );
}
