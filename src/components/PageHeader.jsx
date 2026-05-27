import { Link } from "react-router-dom";

const pageNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

function SmartLink({ href, className, children }) {
  const isRoute = href.startsWith("/") && !href.includes("#");
  if (isRoute) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function PageHeader({
  active = "Home",
  subtitle = "Available Worldwide",
  ctaLabel = "Hire Me",
  ctaHref = "/contact",
}) {
  return (
    <header className="fixed left-3 right-3 top-4 z-50 mx-auto max-w-7xl rounded-full border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-2xl sm:left-6 sm:right-6">
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime-300 text-sm font-black text-black">
            JF
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black leading-none">
              Janrenzo Facto
            </p>
            <p className="mt-1 truncate text-[10px] uppercase tracking-[0.18em] text-white/35">
              {subtitle}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-white/65 md:flex">
          {pageNavItems.map((item) => (
            <SmartLink
              key={item.label}
              href={item.href}
              className={
                item.label === active
                  ? "text-lime-300"
                  : "transition hover:text-white"
              }
            >
              {item.label}
            </SmartLink>
          ))}
        </nav>

        <SmartLink
          href={ctaHref}
          className="hidden rounded-full bg-lime-300 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-white sm:inline-flex"
        >
          {ctaLabel}
        </SmartLink>

        <details className="group relative md:hidden">
          <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-black uppercase tracking-[0.08em] text-white [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:block">x</span>
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.75rem)] z-[999] w-[min(82vw,320px)] rounded-[1.75rem] border border-white/10 bg-black/95 p-3 shadow-2xl backdrop-blur-2xl">
            <div className="grid gap-2">
              {pageNavItems.map((item) => (
                <SmartLink
                  key={item.label}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.14em] transition hover:bg-white/10 ${
                    item.label === active
                      ? "text-lime-300"
                      : "text-white/70 hover:text-lime-300"
                  }`}
                >
                  {item.label}
                </SmartLink>
              ))}
              <SmartLink
                href={ctaHref}
                className="mt-2 rounded-full bg-lime-300 px-4 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-black"
              >
                {ctaLabel}
              </SmartLink>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
