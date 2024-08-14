import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground">
          © {new Date().getFullYear()} CTS Lost & Found Platform
        </p>
        <nav>
          <Link
            href="/terms"
            className="text-xs md:text-sm text-muted-foreground hover:text-foreground mr-4"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </div>
  );
}