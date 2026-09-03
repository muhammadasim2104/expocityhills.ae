import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-4xl text-forest">Page Not Found</h1>
      <p className="mt-4 text-sm text-foreground/60">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="btn-editorial btn-editorial-primary mt-8">
        Return to Expo City Hills 1
      </Link>
    </section>
  );
}
