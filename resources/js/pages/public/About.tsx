import { Award, BookOpenCheck, Check, FlaskConical, Globe, Landmark, Stethoscope, Users } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { CountUp, Marquee, Reveal, SpotlightCard } from '@/components/fx/motion';
import { Button, PageHero, PaperSection, Pill, SectionHeading } from '@/components/ui';
import {
    bangladeshChallenges,
    declaration,
    disciplines,
    governance,
    history,
    milestones,
    mission,
    missionPillars,
    objectives,
    principles,
    priorities,
    scientificStandards,
    site,
    status,
    vision,
} from '@/data/site';

const objectiveIcons = [Stethoscope, BookOpenCheck, FlaskConical, Globe];

export default function About() {
    return (
        <>
            <Seo title="About" description={mission} />
            <PageHero eyebrow="About the Society" title="Built by clinicians," accent="for Bangladesh." text={status} />

            {/* History */}
            <PaperSection className="py-20 sm:py-28">
                <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr]">
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <SectionHeading eyebrow="History" title="Our" accent="story." />
                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <Reveal>
                                <SpotlightCard className="p-6">
                                    <Users className="h-6 w-6 text-synapse" />
                                    <div className="mt-6 font-display text-5xl text-white">
                                        <CountUp to={site.members} />
                                    </div>
                                    <div className="eyebrow mt-1">Current members</div>
                                </SpotlightCard>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <SpotlightCard className="p-6">
                                    <Award className="h-6 w-6 text-gold" />
                                    <div className="mt-6 font-display text-5xl text-white">IHS</div>
                                    <div className="eyebrow mt-1">Affiliate member</div>
                                </SpotlightCard>
                            </Reveal>
                        </div>
                    </div>
                    <div className="space-y-8">
                        {history.map((p, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <p className={i === 0 ? 'font-display text-3xl leading-snug text-white sm:text-4xl' : 'text-lg leading-relaxed text-ink-200'}>{p}</p>
                            </Reveal>
                        ))}
                        <ol className="relative mt-14 space-y-4">
                            {/* timeline spine */}
                            <span className="absolute top-3 bottom-3 left-[11px] w-px bg-gradient-to-b from-synapse via-iris to-aura opacity-40" aria-hidden />
                            {milestones.map((m, i) => (
                                <li key={m.title} className="relative grid grid-cols-[24px_1fr] gap-5">
                                    <span className="relative z-10 mt-6 grid h-6 w-6 place-items-center rounded-full bg-ink-950 ring-1 ring-synapse/50">
                                        <span className="h-2.5 w-2.5 rounded-full bg-synapse shadow-[0_0_12px_#dd9933]" />
                                    </span>
                                    <Reveal delay={i * 0.08}>
                                        <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors duration-500 hover:border-white/15 hover:bg-white/[0.04] sm:p-6">
                                            <span className="inline-block rounded-full bg-synapse/10 px-3 py-1 font-mono text-xs tracking-wider text-synapse ring-1 ring-synapse/20">{m.year}</span>
                                            <h3 className="mt-3 font-display text-2xl text-white sm:text-[1.7rem]">{m.title}</h3>
                                            <p className="mt-1.5 leading-relaxed text-ink-300">{m.text}</p>
                                        </div>
                                    </Reveal>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </PaperSection>

            {/* Mission & Vision */}
            <section id="mission" className="py-20 sm:py-28">
                <div className="container-x">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {[
                            { label: 'Our Mission', text: mission, glow: 'bg-synapse/25' },
                            { label: 'Our Vision', text: vision, glow: 'bg-aura/25' },
                        ].map((m, i) => (
                            <Reveal key={m.label} delay={i * 0.12}>
                                <div className="ring-aurora relative h-full overflow-hidden rounded-[2rem] bg-ink-900/70 p-8 sm:p-12">
                                    <div className={`absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[90px] ${m.glow}`} />
                                    <span className="eyebrow relative">{m.label}</span>
                                    <p className="relative mt-8 font-display text-3xl leading-[1.15] text-white sm:text-[2.3rem]">{m.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal className="mt-6">
                        <div className="ring-aurora rounded-[2rem] bg-ink-900/50 p-8 sm:p-10">
                            <p className="eyebrow">Our mission integrates</p>
                            <div className="mt-6 flex flex-wrap gap-2.5">
                                {missionPillars.map((p) => (
                                    <span key={p} className="glass rounded-full px-4 py-2 text-sm text-ink-100">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Declaration */}
            <section className="py-16 sm:py-24">
                <div className="container-x">
                    <Reveal>
                        <figure className="mx-auto max-w-5xl text-center">
                            <span className="font-display text-8xl leading-none text-aurora">“</span>
                            <blockquote className="-mt-6 font-display text-3xl leading-snug text-white sm:text-5xl">{declaration}</blockquote>
                            <figcaption className="mt-8 eyebrow">Declaration of principles</figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            {/* Objectives */}
            <PaperSection className="py-20 sm:py-28">
                <div className="container-x">
                    <SectionHeading eyebrow="Objectives" title="What the Society" accent="sets out to do." />
                    <div className="mt-14 grid gap-5 md:grid-cols-2">
                        {objectives.map((o, i) => {
                            const Icon = objectiveIcons[i];
                            return (
                                <Reveal key={o.title} delay={i * 0.08}>
                                    <SpotlightCard className="h-full p-8">
                                        <div className="flex items-center gap-4">
                                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-synapse/20 to-aura/20 ring-1 ring-white/10">
                                                <Icon className="h-5 w-5 text-white" />
                                            </span>
                                            <h3 className="font-display text-3xl text-white">{o.title}</h3>
                                        </div>
                                        <ul className="mt-6 space-y-3">
                                            {o.items.map((it) => (
                                                <li key={it} className="flex gap-3 text-ink-200">
                                                    <Check className="mt-1 h-4 w-4 shrink-0 text-synapse" />
                                                    {it}
                                                </li>
                                            ))}
                                        </ul>
                                    </SpotlightCard>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </PaperSection>

            {/* Bangladesh challenges */}
            <section className="py-20 sm:py-28">
                <div className="container-x">
                    <SectionHeading eyebrow="Bangladesh-specific priorities" title="Focused on" accent="local realities." />
                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {bangladeshChallenges.map((c, i) => (
                            <Reveal key={c} delay={(i % 3) * 0.06}>
                                <div className="flex h-full items-center gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/20">
                                    <span className="font-display text-3xl text-white/20 italic">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-ink-100">{c}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="py-20 sm:py-28">
                <div className="container-x">
                    <SectionHeading eyebrow="Ethics" title="What we" accent="stand for." />
                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {principles.map((p, i) => (
                            <Reveal key={p.title} delay={i * 0.08}>
                                <SpotlightCard className="h-full p-7">
                                    <span className="font-display text-6xl text-white/10 italic">0{i + 1}</span>
                                    <h3 className="mt-6 font-display text-2xl text-white">{p.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-ink-300">{p.text}</p>
                                </SpotlightCard>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Governance */}
            <PaperSection id="governance" className="py-20 sm:py-28">
                <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
                    <div>
                        <SectionHeading eyebrow="Governance" title="How BHS is" accent="governed." text="A non-political, non-profit society operating under the laws of Bangladesh, aligned with the International Headache Society." />
                        <Reveal delay={0.2} className="ring-aurora mt-10 rounded-3xl bg-ink-900/60 p-7">
                            <p className="flex items-center gap-2 eyebrow">
                                <Landmark className="h-4 w-4 text-gold" /> Scientific standards
                            </p>
                            <ul className="mt-5 space-y-3">
                                {scientificStandards.map((s) => (
                                    <li key={s} className="flex gap-3 text-ink-100">
                                        <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                    <div className="space-y-4">
                        {governance.map((g, i) => (
                            <Reveal key={g.title} delay={i * 0.08}>
                                <SpotlightCard className="flex gap-6 p-7">
                                    <span className="font-display text-5xl text-white/15 italic">{i + 1}</span>
                                    <div>
                                        <h3 className="font-display text-2xl text-white">{g.title}</h3>
                                        <p className="mt-2 leading-relaxed text-ink-300">{g.text}</p>
                                    </div>
                                </SpotlightCard>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </PaperSection>

            {/* Multidisciplinary */}
            <section className="py-16 sm:py-24">
                <div className="container-x">
                    <SectionHeading align="center" eyebrow="Multidisciplinary" title="Headache care is a" accent="team effort." />
                </div>
                <Marquee className="mt-12" gap="gap-3 pr-3">
                    {disciplines.map((d) => (
                        <Pill key={d} color="#f8b81f" className="!px-5 !py-2.5 !text-[0.72rem]">
                            {d}
                        </Pill>
                    ))}
                </Marquee>
            </section>

            {/* Priorities */}
            <section className="py-20 sm:py-28">
                <div className="container-x">
                    <div className="theme-navy ring-aurora relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0d3561] to-ink-950 p-8 sm:p-14">
                        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-iris/30 blur-[120px]" />
                        <SectionHeading eyebrow="Future priorities" title="BHS" accent="aims to…" />
                        <ul className="relative mt-12 grid gap-x-10 gap-y-5 md:grid-cols-2">
                            {priorities.map((p, i) => (
                                <Reveal as="li" key={p} delay={i * 0.06} className="flex gap-4">
                                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-synapse/15 text-synapse">
                                        <Check className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="text-lg text-ink-100">{p}</span>
                                </Reveal>
                            ))}
                        </ul>
                        <div className="relative mt-12 flex flex-wrap gap-4">
                            <Button to="/committee">Executive Committee</Button>
                            <Button to="/membership" variant="ghost">
                                Membership
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
