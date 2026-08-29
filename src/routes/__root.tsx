import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Behaviours, CookieBanner, Footer, Grain, Nav, Preloader, ScrollProgress } from "@/components/Chrome";

function NotFoundComponent() {
  return (
    <section className="section bg-bloom bloom-warm" style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
      <div className="narrow center-block">
        <p className="eyebrow">Page not found</p>
        <h1 style={{ fontSize: "clamp(3rem,12vw,7rem)" }}>404</h1>
        <p className="lede" style={{ maxWidth: "40ch" }}>
          This one is off the wall. The page you were after has moved, or it never existed.
        </p>
        <Link className="btn btn--yellow" to="/">
          Back home
          <span className="btn__ico" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <section className="section" style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
      <div className="narrow center-block">
        <h1 style={{ fontSize: "clamp(2rem,6vw,3rem)" }}>This page didn’t load.</h1>
        <p className="lede" style={{ maxWidth: "42ch" }}>
          Something went wrong on our end. Try again, or head back home.
        </p>
        <div className="hero__cta">
          <button
            className="btn"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <a className="btn btn--ghost" href="/">
            Go home
          </a>
        </div>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Artdosis · Art that makes people feel human again" },
      {
        name: "description",
        content: "Artdosis is a Melbourne creative studio working with murals, live art, music and inclusive experiences.",
      },
      { name: "theme-color", content: "#F7F2EA" },
      { name: "author", content: "Artdosis" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600;700;800&family=Roboto:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500;600&family=Caveat:wght@500;600&family=Instrument+Serif:ital@0;1&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Grain />
      <ScrollProgress />
      <Preloader />
      <Nav />
      <main id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <Behaviours />
    </QueryClientProvider>
  );
}
