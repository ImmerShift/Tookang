import Link from "next/link";
import { Bell, Briefcase, Hammer, MapPin, Search, ShieldCheck, Star, Users } from "lucide-react";

const services = [
  { label: "AC Repair", icon: "❄️" },
  { label: "Plumbing", icon: "🔧" },
  { label: "Electrical", icon: "⚡" },
  { label: "Cleaning", icon: "🧼" },
];

const soloPros = [
  { name: "Wayan P.", specialty: "Master Plumber", rating: 4.9 },
  { name: "Made S.", specialty: "Electrician", rating: 4.8 },
];

const crews = [
  { name: "Bali Build Crew", verified: true, teamCount: "4+", location: "Canggu" },
  { name: "Eco Bali Cleaners", verified: true, teamCount: "12+", location: "Ubud" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#191C1D]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A237E]/10 text-[#000666]">
              <Hammer className="h-5 w-5" />
            </div>
            <div>
              <p className="font-[var(--font-display)] text-xl font-semibold text-[#000666]">
                Tookang
              </p>
              <p className="text-xs text-[#454652]">The digital concierge for home services</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs text-[#454652] shadow-[0_8px_24px_rgba(25,28,29,0.08)]">
              <MapPin className="h-3.5 w-3.5 text-[#AC332A]" />
              Canggu, Bali
            </span>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#000666] shadow-[0_8px_24px_rgba(25,28,29,0.08)]">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-[32px] bg-white px-6 py-6 shadow-[0_24px_60px_rgba(25,28,29,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#AC332A]">
                Welcome back
              </p>
              <h1 className="mt-3 font-[var(--font-display)] text-4xl font-semibold text-[#000666]">
                Find trusted tukang and crews in minutes.
              </h1>
              <p className="mt-3 text-sm text-[#454652]">
                Compare verified professionals, lock escrow payments, and stay in control from
                first chat to finish photo.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  className="rounded-full bg-[#000666] px-5 py-3 text-sm font-semibold text-white"
                  href="/jobs/new"
                >
                  Post a Job
                </Link>
                <Link
                  className="rounded-full bg-[#FFDCC3] px-5 py-3 text-sm font-semibold text-[#000666]"
                  href="/jobs"
                >
                  Explore Active Jobs
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] bg-[#F3F4F5] px-6 py-5">
              <div className="flex items-center gap-3 rounded-[20px] bg-white px-4 py-3 shadow-[0_12px_32px_rgba(25,28,29,0.12)]">
                <Search className="h-4 w-4 text-[#454652]" />
                <input
                  className="w-full bg-transparent text-sm text-[#191C1D] outline-none"
                  placeholder="Describe your problem..."
                />
                <button className="rounded-full bg-[#000666] px-4 py-2 text-xs font-semibold text-white">
                  Search
                </button>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-[#454652]">
                <span className="font-semibold text-[#000666]">Services</span>
                <Link className="text-[#AC332A]" href="/jobs">
                  See All
                </Link>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {services.map((service) => (
                  <div
                    key={service.label}
                    className="flex flex-col items-center gap-2 rounded-[24px] bg-white px-3 py-4 text-center text-xs text-[#454652]"
                  >
                    <span className="text-xl">{service.icon}</span>
                    <span className="font-semibold text-[#000666]">{service.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[32px] bg-[#F3F4F5] px-6 py-6">
              <div className="flex items-center justify-between text-xs text-[#454652]">
                <span className="font-semibold text-[#000666]">Top Rated Solo Craftsmen</span>
                <span className="text-[#AC332A]">Exceptional independent pros</span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {soloPros.map((pro) => (
                  <div key={pro.name} className="rounded-[26px] bg-white px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#FFDCC3]" />
                      <div>
                        <p className="text-sm font-semibold text-[#000666]">{pro.name}</p>
                        <p className="text-xs text-[#454652]">{pro.specialty}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#454652]">
                      <Star className="h-3.5 w-3.5 text-[#AC332A]" />
                      <span className="font-semibold text-[#000666]">{pro.rating}</span>
                      <span>Top rated</span>
                    </div>
                    <span className="mt-3 inline-flex rounded-full bg-[#1A237E]/10 px-3 py-1 text-[10px] font-semibold text-[#1A237E]">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] bg-[#F3F4F5] px-6 py-6">
              <div className="flex items-center justify-between text-xs text-[#454652]">
                <span className="font-semibold text-[#000666]">Verified Trade Crews</span>
                <span>Licensed agencies for large projects</span>
              </div>
              <div className="mt-4 grid gap-4">
                {crews.map((crew) => (
                  <div key={crew.name} className="rounded-[26px] bg-white px-5 py-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#000666]">{crew.name}</p>
                        <p className="text-xs text-[#454652]">{crew.location}</p>
                      </div>
                      {crew.verified && (
                        <span className="rounded-full bg-[#DFF4E7] px-3 py-1 text-[10px] font-semibold text-[#1A7F37]">
                          NIB Verified
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-[#454652]">
                      <span>Assigned team</span>
                      <span className="font-semibold text-[#000666]">{crew.teamCount}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#454652]">
                        <Users className="h-3.5 w-3.5 text-[#000666]" />
                        <span>Trusted crew</span>
                      </div>
                      <button className="rounded-full bg-[#AC332A] px-4 py-2 text-xs font-semibold text-white">
                        Book Crew
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Secure Escrow",
              body: "Staged payments release when the job is confirmed.",
              icon: <ShieldCheck className="h-5 w-5" />,
            },
            {
              title: "Verified Profiles",
              body: "KTP/NIB checks and tiered trust scores.",
              icon: <Briefcase className="h-5 w-5" />,
            },
            {
              title: "Transparent Ratings",
              body: "Honest reviews for solo pros and crew agencies.",
              icon: <Star className="h-5 w-5" />,
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] bg-white px-6 py-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1A237E]/10 text-[#1A237E]">
                {item.icon}
              </div>
              <h3 className="mt-4 font-[var(--font-display)] text-lg font-semibold text-[#000666]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#454652]">{item.body}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
