import Link from "next/link";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  Clock,
  Hammer,
  Headphones,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-50">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-300">
              <Hammer className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold">Tookang</p>
              <p className="text-xs text-zinc-400">Marketplace for trusted trades</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full border border-white/10 px-3 py-1 text-zinc-300">
              MVP Preview
            </span>
            <Link
              className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950"
              href="/jobs/new"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-12">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-sm text-emerald-300">
              <Sparkles className="h-4 w-4" />
              <span>End-to-end hiring, escrow, and reviews</span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Book verified tukang or mandor crews with confidence.
            </h1>
            <p className="text-lg text-zinc-300">
              Tookang connects homeowners with vetted solo tukang and mandor-led crews.
              Compare bids, lock escrow, and track progress in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950"
                href="/jobs/new"
              >
                Post a Job
              </Link>
              <Link
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
                href="/jobs"
              >
                Join as Tukang
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Verified profiles", value: "1,240+" },
                { label: "Average rating", value: "4.8/5" },
                { label: "Escrow protected", value: "Rp 2.4B" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6">
            <div className="flex items-center justify-between text-sm text-zinc-300">
              <span>Live jobs</span>
              <span className="rounded-full border border-white/10 px-2 py-1">Nearby</span>
            </div>
            {[
              {
                title: "Kitchen plumbing repair",
                location: "Denpasar, Bali",
                budget: "Rp 850k - 1.2M",
                status: "Inspection required",
              },
              {
                title: "Office electrical rewiring",
                location: "Surabaya",
                budget: "Rp 4.5M - 6.2M",
                status: "Crew recommended",
              },
              {
                title: "Bathroom renovation",
                location: "Jakarta Selatan",
                budget: "Rp 9M - 12M",
                status: "Solo or crew",
              },
            ].map((job) => (
              <div
                key={job.title}
                className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold">{job.title}</p>
                    <p className="text-xs text-zinc-400">{job.location}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-emerald-300">
                    {job.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-zinc-300">
                  <span>{job.budget}</span>
                  <button className="rounded-full border border-white/15 px-3 py-1 text-xs">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Verified Profiles",
              body: "KTP/NIB checks, tiered verification, and dispute protection.",
              icon: <BadgeCheck className="h-5 w-5" />,
            },
            {
              title: "Escrow & Milestones",
              body: "Inspection-only escrow, full escrow release, and material payouts.",
              icon: <Wallet className="h-5 w-5" />,
            },
            {
              title: "AI Job Assistant",
              body: "Auto-classify jobs, price guidance, and multilingual summaries.",
              icon: <Sparkles className="h-5 w-5" />,
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">How Tookang Works</h2>
              <p className="text-sm text-zinc-300">
                Transparent workflow for homeowners, solo tukang, and mandor crews.
              </p>
            </div>
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Post a job",
                  body: "Share scope, photos, and budget range.",
                  icon: <Briefcase className="h-4 w-4" />,
                },
                {
                  title: "Receive bids",
                  body: "Solo or crew bids with inspection option.",
                  icon: <Clock className="h-4 w-4" />,
                },
                {
                  title: "Secure escrow",
                  body: "Protect both sides with staged payments.",
                  icon: <ShieldCheck className="h-4 w-4" />,
                },
                {
                  title: "Rate the work",
                  body: "Build trust with verified reviews.",
                  icon: <Star className="h-4 w-4" />,
                },
              ].map((step) => (
                <div key={step.title} className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
                  <div className="flex items-center gap-3 text-emerald-300">
                    {step.icon}
                    <p className="text-sm font-semibold">{step.title}</p>
                  </div>
                  <p className="mt-2 text-xs text-zinc-400">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/15 via-transparent to-transparent p-6">
            <div className="flex items-center gap-3 text-emerald-300">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">Mandor & Crew</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold">Manage your crew like a pro.</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Assign members, track internal scores, and surface crew-ready jobs instantly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-zinc-300">
              {["Crew availability", "Internal scores", "Shared wallet", "Dispute center"].map(
                (item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1">
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-emerald-300">
              <Headphones className="h-4 w-4" />
              <span className="text-sm">Support</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold">We stay on the job with you.</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Real-time chat, multi-language translation, and verified dispute workflows.
            </p>
            <div className="mt-5 grid gap-3 text-sm text-zinc-200">
              {[
                { label: "Avg response time", value: "5 minutes" },
                { label: "Dispute resolution", value: "≤ 48 hours" },
                { label: "Project completion rate", value: "96%" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-950/60 px-4 py-2"
                >
                  <span>{row.label}</span>
                  <span className="font-semibold text-emerald-300">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Ready to see Tookang in action?</h2>
              <p className="text-sm text-zinc-300">
                This preview is wired to the backend scaffolding you’ve built. The next step is
                connecting onboarding, job posting, and escrow actions.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950">
                  Continue to Phase 9
                </button>
                <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold">
                  View Admin Ops
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              {[
                { label: "Escrow funded jobs", value: "142" },
                { label: "Active crews", value: "312" },
                { label: "AI price checks", value: "8,104" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                  <p className="text-xs text-zinc-400">{item.label}</p>
                  <p className="text-2xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Tookang. Built for trusted workmanship.</span>
          <div className="flex flex-wrap gap-4 text-xs">
            {["Privacy", "Terms", "Support"].map((item) => (
              <span key={item} className="cursor-pointer hover:text-zinc-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
