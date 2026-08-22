import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoMark from "../assets/whstl-logo-mark.svg";
import heroHit from "../assets/hero-hit.jpg";

/* ============================================================
   REAL BRAND LINKS — pulled from whatnot.com/user/whstl_sports
   ============================================================ */
const WHATNOT_SHOP_URL = "https://www.whatnot.com/user/whstl_sports/shop";
const DISCORD_URL = "https://discord.gg/em978zuFfy";
const INSTAGRAM_URL = "https://www.instagram.com/whstl_sports";
const TIKTOK_URL = "https://www.tiktok.com/@whstl_sports";

/* ============================================================
   EDIT ME — Upcoming shows
   Whatnot has no public schedule feed, so this list is filled in
   by hand from your Whatnot "Shows" tab. Each show needs either
   `live: true` (currently streaming) or a `startsAt` ISO datetime
   (used to drive the countdown + "Notify me" card).
   ============================================================ */
type Show = {
  title: string;
  meta: string;
  live?: boolean;
  startsAt?: string; // ISO string, e.g. "2026-08-23T20:00:00-04:00"
  url: string;
};

const SHOWS: Show[] = [
  {
    title: "Select World Cup Hobby Box",
    meta: "Random Team",
    startsAt: "2026-08-23T19:00:00-04:00",
    url: "https://www.whatnot.com/user/whstl_sports/shop",
  },
  // { title: "Prizm World Cup Group Break", meta: "12 spots · Sponsor slots", startsAt: "2026-08-24T19:00:00-04:00", url: WHATNOT_SHOP_URL },
];

/* ============================================================
   EDIT ME — Recent posts
   Instagram/TikTok/YouTube don't offer a free public feed either,
   so these are filled in by hand too. Add a link to the post and
   (optional) a thumbnail in src/assets.
   ============================================================ */
type Post = {
  platform: "Instagram" | "TikTok" | "YouTube";
  caption: string;
  url: string;
};

const POSTS: Post[] = [
  // { platform: "Instagram", caption: "Last night's group break recap", url: INSTAGRAM_URL },
  // { platform: "TikTok", caption: "Big hit reaction clip", url: TIKTOK_URL },
  // { platform: "YouTube", caption: "Full break replay", url: "https://youtube.com/@whstl_sports" },
];

/* ============================================================
   EDIT ME — Contact
   ============================================================ */
const CONTACT_EMAIL = "hello@whstlsports.com";

function useCountdown(target?: string) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!target) return;
    const targetMs = new Date(target).getTime();
    const tick = () => setRemaining(Math.max(0, targetMs - Date.now()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [target]);

  if (remaining === null) return { hours: "00", minutes: "00" };
  const totalMinutes = Math.floor(remaining / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WHSTL Sports — Live Card Breaks on Whatnot" },
      {
        name: "description",
        content:
          "Join WHSTL Sports on Whatnot for nightly sports card breaks, rare pulls, and the most electric card room in the hobby.",
      },
      {
        property: "og:title",
        content: "WHSTL Sports — Live Card Breaks on Whatnot",
      },
      {
        property: "og:description",
        content:
          "Join WHSTL Sports on Whatnot for nightly sports card breaks, rare pulls, and the most electric card room in the hobby.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const nextShow = SHOWS[0];
  const isLive = nextShow?.live;
  const countdown = useCountdown(nextShow?.live ? undefined : nextShow?.startsAt);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Sticky Live Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img
              src={logoMark}
              alt="WHSTL Sports"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-display text-2xl uppercase">
              WHSTL
            </span>
          </div>
          <div className="hidden gap-8 text-xs font-black uppercase tracking-widest text-muted md:flex">
            <a href="#schedule" className="transition-colors hover:text-primary">
              Schedule
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Vault
            </a>
          </div>
          <a
            href={WHATNOT_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-xs font-black uppercase text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Follow on Whatnot
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-12 pt-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center text-center">
            <div className="animate-slide-up animation-delay-100">
              <span className="mb-6 inline-block rounded-full border border-primary/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                Live Card Breaking Daily
              </span>
              <h1 className="font-display text-7xl uppercase leading-[0.92] md:text-9xl">
                RIP IT. SHIP IT.
                <br />
                GET THE <span className="text-primary">1/1</span>.
              </h1>
            </div>

            <div className="mt-12 flex w-full animate-slide-up flex-col gap-6 animation-delay-200 md:flex-row">
              {/* Featured Break Card — swap in a new photo any time in src/assets */}
              <div className="group flex-1 cursor-pointer rounded-xl border border-border bg-card p-2">
                <div className="relative grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-lg bg-surface-muted">
                  <img
                    src={heroHit}
                    alt="Lionel Messi 2026 Panini Prizm World Cup card, orange wave parallel, in a graded slab"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="flex items-end justify-between p-4">
                  <div className="text-left">
                    <p className="font-mono text-xs text-muted">LAST BIG HIT</p>
                    <h3 className="text-lg font-bold">Messi Prizm Orange Wave</h3>
                  </div>
                </div>
              </div>

              {/* CTA Box — reflects real show status from the SHOWS list above */}
              <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-12 text-center">
                {isLive ? (
                  <>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-widest text-primary">
                        Live Now
                      </span>
                    </div>
                    <h2 className="mb-2 text-center font-display text-4xl uppercase">
                      {nextShow.title}
                    </h2>
                    <p className="mb-8 text-center text-sm text-muted">{nextShow.meta}</p>
                  </>
                ) : nextShow ? (
                  <>
                    <h2 className="mb-2 text-center font-display text-4xl uppercase">
                      Next Show Starts In
                    </h2>
                    <p className="mb-6 text-center text-sm text-muted">{nextShow.title}</p>
                    <div className="mb-8 flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-5xl font-black">{countdown.hours}</div>
                        <div className="text-[10px] uppercase text-muted">Hrs</div>
                      </div>
                      <div className="text-4xl font-black text-primary">:</div>
                      <div className="text-center">
                        <div className="text-5xl font-black">{countdown.minutes}</div>
                        <div className="text-[10px] uppercase text-muted">Mins</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <h2 className="mb-8 text-center font-display text-3xl uppercase">
                    Follow to catch the next show
                  </h2>
                )}
                <a
                  href={nextShow?.url ?? WHATNOT_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-primary w-full max-w-sm rounded-lg bg-primary py-4 text-center font-black uppercase text-primary-foreground transition-all hover:brightness-110"
                >
                  {isLive ? "Jump into the Stream" : "Follow on Whatnot"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Ticker */}
      <div className="w-full overflow-hidden whitespace-nowrap border-y border-border bg-card py-4">
        <div className="animate-ticker inline-block">
          <span className="px-8 text-sm font-black uppercase tracking-widest text-primary">
            1.4K BREAKS SHIPPED
          </span>
          <span className="px-8 text-sm font-black uppercase tracking-widest">
            NEXT DAY SHIPPING
          </span>
          <span className="px-8 text-sm font-black uppercase tracking-widest text-primary">
            4.8 STAR WHATNOT RATING
          </span>
          <span className="px-8 text-sm font-black uppercase tracking-widest">
            HIT THE WHSTL
          </span>
        </div>
        <div className="animate-ticker inline-block">
          <span className="px-8 text-sm font-black uppercase tracking-widest text-primary">
            1.4K BREAKS SHIPPED
          </span>
          <span className="px-8 text-sm font-black uppercase tracking-widest">
            NEXT DAY SHIPPING
          </span>
          <span className="px-8 text-sm font-black uppercase tracking-widest text-primary">
            4.8 STAR WHATNOT RATING
          </span>
          <span className="px-8 text-sm font-black uppercase tracking-widest">
            HIT THE WHSTL
          </span>
        </div>
      </div>

      {/* Upcoming Breaks Schedule */}
      <section id="schedule" className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-5xl uppercase">
            Break Schedule
          </h2>
          <a
            href="https://www.whatnot.com/user/whstl_sports/shows"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-muted pb-1 text-xs font-bold uppercase text-muted transition-colors hover:border-primary hover:text-primary"
          >
            Full Calendar
          </a>
        </div>

        <div className="space-y-4">
          {SHOWS.length === 0 && (
            <div className="rounded-lg border border-dashed border-border bg-card/30 p-12 text-center">
              <p className="text-sm text-muted">
                No shows on the clock right now. Follow on Whatnot to get notified
                the second the next one goes up.
              </p>
              <a
                href={WHATNOT_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-xs font-black uppercase text-primary-foreground"
              >
                Follow on Whatnot
              </a>
            </div>
          )}

          {SHOWS.map((show) => (
            <div
              key={show.title}
              className="group flex flex-col justify-between rounded-lg border border-border bg-card/50 p-6 transition-colors hover:border-primary/50 md:flex-row md:items-center"
            >
              <div className="flex items-center gap-6">
                <div className="font-mono text-primary">
                  {show.live
                    ? "● LIVE"
                    : show.startsAt
                      ? new Date(show.startsAt).toLocaleDateString(undefined, {
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "TBD"}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-muted">
                    {show.meta}
                  </div>
                  <h4 className="text-xl font-bold">{show.title}</h4>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-8 md:mt-0">
                {show.startsAt && !show.live && (
                  <div className="text-right">
                    <div className="text-xs text-muted">TIME</div>
                    <div className="font-bold">
                      {new Date(show.startsAt).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                )}
                <a
                  href={show.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-secondary px-6 py-2 text-xs font-black uppercase text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  {show.live ? "Watch Now" : "Notify Me"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="group flex aspect-square cursor-pointer flex-col justify-between border border-border bg-card p-4 transition-transform hover:scale-[1.02]">
              <div className="font-display text-3xl uppercase leading-none transition-colors group-hover:text-primary">
                Basketball
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted">
                4 Shows Weekly
              </div>
            </div>
            <div className="group flex aspect-square cursor-pointer flex-col justify-between border border-border bg-card p-4 transition-transform hover:scale-[1.02]">
              <div className="font-display text-3xl uppercase leading-none transition-colors group-hover:text-primary">
                Football
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted">
                3 Shows Weekly
              </div>
            </div>
            <div className="group flex aspect-square cursor-pointer flex-col justify-between border border-border bg-card p-4 transition-transform hover:scale-[1.02]">
              <div className="font-display text-3xl uppercase leading-none transition-colors group-hover:text-primary">
                Soccer
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted">
                Seasonal Events
              </div>
            </div>
            <div className="group flex aspect-square cursor-pointer flex-col justify-between border border-border bg-card p-4 transition-transform hover:scale-[1.02]">
              <div className="font-display text-3xl uppercase leading-none transition-colors group-hover:text-primary">
                TCG & Pokemon
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted">
                Nightly Rips
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-5xl uppercase">Recent Posts</h2>
        </div>
        {POSTS.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card/30 p-12 text-center">
            <p className="text-sm text-muted">
              No posts added yet. Drop in your latest Instagram, TikTok, and YouTube
              links above to fill this grid.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {POSTS.map((post, i) => (
              <a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
              >
                <div className="flex aspect-square items-center justify-center bg-surface-muted text-xs font-black uppercase tracking-widest text-muted">
                  {post.platform}
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary">
                    {post.platform}
                  </div>
                  <p className="mt-1 text-sm font-bold">{post.caption}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Why Fans Watch — real, verifiable stats */}
      <section className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex aspect-square flex-col items-center justify-center gap-2 border border-border bg-card p-6 text-center">
              <div className="font-display text-4xl uppercase text-primary md:text-5xl">
                4.8★
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted">
                Whatnot Rating
              </div>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center gap-2 border border-border bg-card p-6 text-center">
              <div className="font-display text-4xl uppercase text-primary md:text-5xl">
                &lt;1 Day
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted">
                Avg Ship Time
              </div>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center gap-2 border border-border bg-card p-6 text-center">
              <div className="font-display text-4xl uppercase text-primary md:text-5xl">
                1.4K+
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted">
                Cards Sold
              </div>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center gap-2 border border-border bg-card p-6 text-center">
              <div className="font-display text-3xl uppercase text-primary md:text-4xl">
                Soccer &amp; Football
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted">
                Our Specialty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="rounded-lg border border-border bg-card/50 p-10 text-center md:p-16">
          <h2 className="font-display text-4xl uppercase">Contact Us</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Sponsorships, consignment, or a question about an order — reach out
            and we'll get back to you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-lg bg-primary px-8 py-3 text-xs font-black uppercase text-primary-foreground transition-transform hover:scale-105"
            >
              Email Us
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-8 py-3 text-xs font-black uppercase text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Message on Discord
            </a>
          </div>
        </div>
      </section>

      {/* Squad / Community */}
      <section id="squad" className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="mb-12 text-center font-display text-4xl uppercase">
          The Squad
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-card/50 p-8 text-center transition-colors hover:border-primary/50"
          >
            <div className="font-display text-2xl uppercase">Discord</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-muted">
              Show alerts &amp; community
            </div>
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-card/50 p-8 text-center transition-colors hover:border-primary/50"
          >
            <div className="font-display text-2xl uppercase">Instagram</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-muted">
              @whstl_sports
            </div>
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-card/50 p-8 text-center transition-colors hover:border-primary/50"
          >
            <div className="font-display text-2xl uppercase">TikTok</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-muted">
              @whstl_sports
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 md:flex-row md:justify-between">
          <div className="font-display text-4xl uppercase">
            WHSTL
          </div>
          <div className="flex gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WHSTL Sports on Instagram"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-primary hover:text-primary-foreground"
            >
              IG
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WHSTL Sports on Discord"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-primary hover:text-primary-foreground"
            >
              DC
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WHSTL Sports on TikTok"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-primary hover:text-primary-foreground"
            >
              TK
            </a>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
            &copy; {new Date().getFullYear()} WHSTL Sports. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden">
        <a
          href={nextShow?.url ?? WHATNOT_SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-black uppercase text-primary-foreground shadow-2xl transition-transform active:scale-95"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary-foreground" />
          </span>
          Catch Next Show
        </a>
      </div>
    </div>
  );
}
