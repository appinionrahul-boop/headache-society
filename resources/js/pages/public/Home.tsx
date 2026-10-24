import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Award, Play } from 'lucide-react';
import { lazy, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { LogoMark } from '@/components/brand/Logo';
import { NeuralCanvas } from '@/components/fx/NeuralCanvas';
import { CountUp, Magnetic, Marquee, Parallax, Reveal, ScrollLitText, SplitWords, SpotlightCard } from '@/components/fx/motion';
import { Countdown, DoctorCard, EventRow, MembershipCategories } from '@/components/sections/shared';
import { Button, Eyebrow, Orbits, PaperSection, Pill, PlaceholderArt, SectionHeading } from '@/components/ui';
import { iconMap } from '@/components/ui/icons';
import { eventTypes, upcomingEvents } from '@/data/events';
import { gallery, news } from '@/data/media';
import { committeeTerm, executiveCommittee } from '@/data/people';
import { activities, awarenessTopics, bangladeshChallenges, milestones, mission, priorities, principles, site, vision } from '@/data/site';
import { formatDate } from '@/lib/format';

const NeuralBrain = lazy(() => import('@/components/fx/NeuralBrain'));
import { cn } from '@/lib/cn';

export default function Home() {
    return (
        <>
            <Seo />
            <Hero />
            <Ticker />
            <Statement />
            <MissionVision />
            <Activities />
            <Challenges />
            <NextEvent />
            <Journey />
            <Committee />
            <GalleryPreview />
            <Membership />
            <Priorities />
            <Newsroom />
            <FinalCta />
        </>
    );
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const orbY = useTransform(scrollYProgress, [0, 1], [0, -160]);

    return (
        <section ref={ref} className="theme-navy relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink-950">
            <div className="absolute inset-0 grid-lines" />
            <NeuralCanvas />

            {/* holographic brain inside the migraine-aura orb */}
            <motion.div style={{ y: orbY }} className="pointer-events-none absolute top-[14%] -right-[38%] h-[80vmin] w-[80vmin] opacity-50 sm:top-[8%] sm:right-[-12%] sm:opacity-80 lg:-right-[2%] lg:opacity-100">
                <div className="absolute inset-[6%] animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#dd9933,#f8b81f,#ff8a3d,#ffc600,#dd9933)] opacity-20 blur-[110px]" />
                <div className="absolute inset-[16%] rounded-full bg-ink-950/85 blur-3xl" />
                <Orbits className="inset-0 h-full w-full" />
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 2, ease: [0.16, 1, 0.3, 1] }} className="absolute -inset-[8%]">
                    <Suspense fallback={null}>
                        <NeuralBrain />
                    </Suspense>
                </motion.div>

                {/* HUD annotations */}
                {[
                    { label: 'Cortical activity', value: 'Live', pos: 'top-[8%] right-[14%]', delay: 2.4 },
                    { label: 'Visual cortex', value: 'Aura mapping', pos: 'top-[60%] right-[12%]', delay: 2.7 },
                    { label: 'Trigeminal pathway', value: 'Signal tracing', pos: 'bottom-[10%] left-[22%]', delay: 3 },
                ].map((h) => (
                    <motion.div
                        key={h.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: h.delay, duration: 0.8 }}
                        className={cn('absolute hidden items-center gap-3 xl:flex', h.pos)}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-synapse" />
                            <span className="relative h-2 w-2 rounded-full bg-synapse" />
                        </span>
                        <span className="glass rounded-xl px-3 py-2">
                            <span className="block font-mono text-[0.58rem] tracking-[0.2em] text-ink-300 uppercase">{h.label}</span>
                            <span className="block text-xs text-white">{h.value}</span>
                        </span>
                    </motion.div>
                ))}
            </motion.div>
            <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-synapse/10 blur-[140px]" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#ffffff]" />

            <motion.div style={{ y, opacity, scale }} className="relative container-x pt-32 pb-12 lg:pb-40">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}>
                    <span className="glass inline-flex items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-sm text-ink-100">
                        <span className="rounded-full bg-gradient-to-r from-synapse to-iris px-2.5 py-0.5 text-xs font-bold text-ink-950">IHS</span>
                        Affiliate Member Society representing Bangladesh
                    </span>
                </motion.div>

                <h1 className="mt-8 font-display text-[3.6rem] leading-[0.92] tracking-tight text-white sm:text-[6rem] lg:text-[8.5rem]">
                    <SplitWords text="Beyond the pain," delay={1} />
                    <br />
                    <SplitWords text="towards clarity." delay={1.25} wordClass={() => 'italic text-aurora pr-2'} />
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 1.7, duration: 1.2 }}
                    className="mt-8 max-w-xl text-lg leading-relaxed text-ink-200 sm:text-xl"
                >
                    The Bangladesh Headache Society advances headache medicine through education, research, collaboration and evidence-based care — for every
                    person living with headache disorders.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 1 }} className="mt-10 flex flex-wrap items-center gap-4">
                    <Magnetic>
                        <Button to="/membership/apply" size="lg">
                            Become a member
                        </Button>
                    </Magnetic>
                    <Button to="/events" variant="ghost" size="lg">
                        Explore programmes
                    </Button>
                </motion.div>
            </motion.div>

            {/* stats bar */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 pb-8 lg:absolute lg:inset-x-0 lg:bottom-6 lg:pb-0"
            >
                <div className="container-x">
                    <div className="glass grid grid-cols-2 divide-white/10 rounded-3xl sm:grid-cols-4 sm:divide-x">
                        {[
                            { value: <CountUp to={site.founded} duration={1.6} plain />, label: 'Established' },
                            { value: <CountUp to={site.members} suffix="+" />, label: 'Members' },
                            { value: 'IHS', label: 'Affiliate society' },
                            { value: <CountUp to={6} />, label: 'Pillars of work' },
                        ].map((s, i) => (
                            <div key={i} className="px-5 py-4 sm:px-8 sm:py-5">
                                <div className="font-display text-3xl text-white sm:text-4xl">{s.value}</div>
                                <div className="eyebrow mt-1 !text-[0.62rem]">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="absolute right-6 bottom-36 hidden flex-col items-center gap-3 text-ink-400 lg:flex"
            >
                <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
                <ArrowDown className="h-4 w-4" />
            </motion.div>
        </section>
    );
}

/* ───────────────────────────── Ticker ───────────────────────────── */

function Ticker() {
    const words = ['CME Programmes', 'Clinical Research', 'Public Awareness', 'IHS Collaboration', 'Headache Clinics', 'Young Physicians', 'Evidence-based Care'];
    return (
        <div className="relative border-y border-white/[0.06] bg-ink-950 py-6">
            <Marquee>
                {words.map((w) => (
                    <span key={w} className="flex items-center gap-12 font-display text-3xl whitespace-nowrap text-white/70 italic sm:text-4xl">
                        {w}
                        <span className="text-xl text-aurora not-italic">✦</span>
                    </span>
                ))}
            </Marquee>
        </div>
    );
}

/* ───────────────────────────── Statement ───────────────────────────── */

function Statement() {
    return (
        <section className="relative py-32 sm:py-44">
            <div className="container-x grid gap-16 lg:grid-cols-[1fr_340px] lg:items-end">
                <div>
                    <Reveal>
                        <Eyebrow>Our declaration</Eyebrow>
                    </Reveal>
                    <ScrollLitText
                        className="mt-8 font-display text-[2.1rem] leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[4.2rem]"
                        text="BHS shall serve the people of *Bangladesh* by advancing scientific knowledge, professional education, *evidence-based* clinical care, research and public awareness in headache medicine — while maintaining *internationally* *recognised* standards."
                    />
                </div>
                <Reveal delay={0.2}>
                    <SpotlightCard className="p-7">
                        <Award className="h-8 w-8 text-gold" />
                        <p className="mt-5 font-display text-2xl leading-snug text-white">Recognised by the International Headache Society</p>
                        <p className="mt-3 text-sm leading-relaxed text-ink-300">BHS is the IHS Affiliate Member Society representing Bangladesh on the global stage.</p>
                        <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-synapse">
                            Our story <ArrowRight className="h-4 w-4" />
                        </Link>
                    </SpotlightCard>
                </Reveal>
            </div>
        </section>
    );
}

/* ───────────────────────────── Mission & Vision (editorial paper) ───────────────────────────── */

function MissionVision() {
    return (
        <section id="mission" className="relative overflow-hidden rounded-t-[2.5rem] bg-paper text-paper-ink sm:rounded-t-[4rem]">
            <div className="absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-iris/25 blur-[120px]" />
            <div className="absolute bottom-0 -left-20 h-[380px] w-[380px] rounded-full bg-gold/30 blur-[120px]" />
            <div className="relative container-x py-28 sm:py-36">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <h2 className="font-display text-[3rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                        <SplitWords text="Purpose," />
                        <br />
                        <SplitWords text="made precise." delay={0.15} wordClass={() => 'italic text-iris-deep'} />
                    </h2>
                    <Reveal>
                        <p className="max-w-sm text-paper-ink/70">Two statements guide every programme, partnership and publication of the Society.</p>
                    </Reveal>
                </div>

                <div className="mt-20 grid gap-6 lg:grid-cols-2">
                    {[
                        { k: 'Mission', n: '01', text: mission },
                        { k: 'Vision', n: '02', text: vision },
                    ].map((m, i) => (
                        <Reveal key={m.k} delay={i * 0.15}>
                            <div className="group relative h-full overflow-hidden rounded-[2rem] border border-paper-ink/10 bg-[#ffffff]/60 p-8 backdrop-blur transition-colors duration-700 hover:bg-paper-ink sm:p-12">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs tracking-[0.25em] text-paper-ink/50 uppercase transition-colors group-hover:text-[#ffffff]/50">{m.k}</span>
                                    <span className="font-display text-5xl text-paper-ink/15 italic transition-colors group-hover:text-[#ffffff]/20">{m.n}</span>
                                </div>
                                <p className="mt-10 font-display text-3xl leading-[1.15] transition-colors group-hover:text-[#ffffff] sm:text-[2.2rem]">“{m.text}”</p>
                                <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-gradient-to-br from-synapse to-aura opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-50" />
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {principles.map((p, i) => (
                        <Reveal key={p.title} delay={0.1 + i * 0.08}>
                            <div className="h-full rounded-[1.5rem] border border-paper-ink/10 p-6">
                                <span className="font-mono text-xs text-iris-deep">0{i + 1}</span>
                                <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-paper-ink/65">{p.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────────── Activities bento ───────────────────────────── */

function Activities() {
    const spans = ['sm:col-span-2 lg:row-span-2', '', '', '', '', ''];
    return (
        <section className="relative rounded-t-[2.5rem] bg-ink-950 py-28 sm:-mt-16 sm:rounded-t-[4rem] sm:py-36">
            <div className="container-x">
                <SectionHeading eyebrow="What we do" title="Six pillars of" accent="headache medicine." text="From the lecture hall to the village courtyard — BHS organises and supports work across education, research and public life." />
                <div className="mt-16 grid auto-rows-[minmax(240px,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {activities.map((a, i) => {
                        const Icon = iconMap[a.icon];
                        const big = i === 0;
                        return (
                            <Reveal key={a.title} delay={i * 0.07} className={cn(spans[i])}>
                                <SpotlightCard className="h-full p-7 sm:p-8">
                                    {big && <NeuralCanvas density={0.5} className="opacity-50" />}
                                    <div className="relative flex h-full flex-col">
                                        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-synapse/20 via-iris/20 to-aura/20 ring-1 ring-white/10">
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="mt-auto pt-10">
                                            <span className="font-mono text-xs text-ink-400">0{i + 1}</span>
                                            <h3 className={cn('mt-2 font-display leading-tight text-white', big ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl')}>{a.title}</h3>
                                            <p className={cn('mt-3 leading-relaxed text-ink-300', big ? 'max-w-md text-lg' : 'text-sm')}>{a.text}</p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────────── Bangladesh challenges ───────────────────────────── */

function Challenges() {
    const half = Math.ceil(bangladeshChallenges.length / 2);
    const rows = [bangladeshChallenges.slice(0, half), bangladeshChallenges.slice(half)];
    return (
        <section className="relative overflow-hidden py-28 sm:py-36">
            <div className="absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aura/10 blur-[160px]" />
            <div className="relative container-x">
                <SectionHeading
                    align="center"
                    eyebrow="Why it matters"
                    title="The challenge in"
                    accent="Bangladesh."
                    text="The Society focuses on the realities of headache care in Bangladesh — from underdiagnosis and analgesic overuse to access beyond major cities."
                />
            </div>
            <div className="relative mt-16 space-y-4">
                {rows.map((row, ri) => (
                    <Marquee key={ri} reverse={ri === 1} gap="gap-4 pr-4">
                        {row.map((c) => (
                            <span key={c} className="glass flex shrink-0 items-center gap-3 rounded-full px-6 py-4 text-lg whitespace-nowrap text-ink-100">
                                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-synapse to-aura" />
                                {c}
                            </span>
                        ))}
                    </Marquee>
                ))}
            </div>
            <div className="relative container-x mt-16">
                <Reveal>
                    <div className="ring-aurora flex flex-col gap-6 rounded-[2rem] bg-ink-900/60 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="eyebrow">Public awareness</p>
                            <p className="mt-3 font-display text-3xl text-white sm:text-4xl">Know your headache.</p>
                        </div>
                        <div className="flex flex-wrap gap-2 lg:max-w-2xl lg:justify-end">
                            {awarenessTopics.map((t) => (
                                <Pill key={t} color="#ff8a3d">
                                    {t}
                                </Pill>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ───────────────────────────── Next event + upcoming list ───────────────────────────── */

function NextEvent() {
    const upcoming = upcomingEvents();
    const next = upcoming[0];
    if (!next) return null;
    const type = eventTypes[next.type];
    return (
        <section className="relative overflow-hidden py-28 sm:py-36">
            <div className="absolute top-1/3 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-iris/10 blur-[160px]" />
            <div className="relative container-x">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeading eyebrow="Events & activities" title="What’s" accent="next." />
                    <Reveal>
                        <Button to="/events?view=calendar" variant="ghost">
                            Annual calendar
                        </Button>
                    </Reveal>
                </div>

                <Reveal className="mt-14">
                    <div className="ring-aurora relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
                        <NeuralCanvas density={0.35} className="opacity-40" />
                        <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <Pill color={type.color}>{type.label}</Pill>
                                    <Pill>Next up</Pill>
                                </div>
                                <h3 className="mt-6 font-display text-4xl leading-[1.02] text-white sm:text-6xl">{next.title}</h3>
                                <p className="mt-5 max-w-lg text-ink-200">{next.summary}</p>
                                <p className="mt-6 font-mono text-sm text-ink-300">
                                    {formatDate(next.date, 'dddd, D MMMM YYYY')} · {next.venue}, {next.city}
                                </p>
                                <Button to={`/events/${next.slug}`} className="mt-8">
                                    View event
                                </Button>
                            </div>
                            <div>
                                <p className="eyebrow mb-4">Begins in</p>
                                <Countdown target={next.date} />
                            </div>
                        </div>
                    </div>
                </Reveal>

                <div className="mt-10">
                    {upcoming.slice(1, 5).map((e, i) => (
                        <Reveal key={e.slug} delay={i * 0.06}>
                            <EventRow event={e} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────────── Journey — pinned horizontal scroll ───────────────────────────── */

function Journey() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-62%']);
    const line = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <section ref={ref} className="relative h-[300vh] bg-ink-950">
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
                <div className="container-x">
                    <SectionHeading eyebrow="Our journey" title="A young society," accent="moving fast." />
                </div>
                <div className="relative mt-14">
                    <div className="absolute top-[7px] right-0 left-0 h-px bg-white/10">
                        <motion.div style={{ width: line }} className="h-full bg-gradient-to-r from-synapse via-iris to-aura" />
                    </div>
                    <motion.div style={{ x }} className="flex w-max gap-8 pl-4 sm:pl-10 lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]">
                        {[...milestones, { year: 'Next', title: 'National headache network', text: 'Conferences, specialised clinics, registries and multicentre research — the road ahead.' }].map((m, i) => (
                            <div key={i} className="w-[78vw] max-w-[440px] shrink-0">
                                <span className="relative block h-4 w-4 rounded-full border-2 border-synapse bg-ink-950 shadow-[0_0_20px_#dd9933]" />
                                <div className="mt-8 font-display text-6xl text-aurora italic sm:text-8xl">{m.year}</div>
                                <h3 className="mt-4 font-display text-3xl text-white">{m.title}</h3>
                                <p className="mt-3 max-w-sm leading-relaxed text-ink-300">{m.text}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────────── Executive Committee — draggable rail ───────────────────────────── */

function Committee() {
    const rail = useRef<HTMLDivElement>(null);
    return (
        <PaperSection className="py-28 sm:py-36">
            <div className="container-x flex flex-wrap items-end justify-between gap-6">
                <SectionHeading eyebrow={`Executive Committee ${committeeTerm}`} title="The minds" accent="behind the mission." />
                <Reveal>
                    <Button to="/committee" variant="ghost">
                        Meet the full committee
                    </Button>
                </Reveal>
            </div>
            <div ref={rail} className="mt-14 cursor-grab overflow-hidden active:cursor-grabbing">
                <motion.div drag="x" dragConstraints={rail} className="flex w-max gap-5 px-4 sm:px-10 lg:px-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]">
                    {executiveCommittee.slice(0, 12).map((d, i) => (
                        <div key={d.slug} className="w-64 shrink-0">
                            <DoctorCard doctor={d} index={i} />
                        </div>
                    ))}
                </motion.div>
            </div>
            <p className="container-x mt-6 eyebrow !text-ink-400">← Drag to explore →</p>
        </PaperSection>
    );
}

/* ───────────────────────────── Gallery preview — parallax columns ───────────────────────────── */

function GalleryPreview() {
    const cols = [gallery.slice(0, 3), gallery.slice(3, 6), gallery.slice(6, 9)];
    return (
        <section className="relative overflow-hidden py-28 sm:py-36">
            <div className="container-x grid gap-16 lg:grid-cols-[380px_1fr]">
                <div className="lg:sticky lg:top-32 lg:self-start">
                    <SectionHeading eyebrow="Media gallery" title="Moments that" accent="move medicine." text="Photos and films from CME programmes, awareness campaigns and society meetings." />
                    <Reveal delay={0.3}>
                        <Button to="/gallery" className="mt-10">
                            Open gallery
                        </Button>
                    </Reveal>
                </div>
                <div className="grid h-[640px] grid-cols-2 gap-4 overflow-hidden [mask-image:linear-gradient(transparent,black_10%,black_90%,transparent)] sm:h-[820px] sm:grid-cols-3">
                    {cols.map((col, ci) => (
                        <Parallax key={ci} offset={ci === 1 ? -120 : 120} className={cn('flex flex-col gap-4', ci === 2 && 'hidden sm:flex')}>
                            {col.map((g) => (
                                <Link to="/gallery" key={g.id} className="group relative overflow-hidden rounded-3xl">
                                    <PlaceholderArt hue={g.hue} seed={g.id} className={cn('transition-transform duration-1000 ease-out-expo group-hover:scale-110', g.span === 'tall' ? 'aspect-[3/4.4]' : 'aspect-[4/5]')} />
                                    {g.kind === 'video' && (
                                        <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full glass">
                                            <Play className="h-5 w-5 fill-white text-white" />
                                        </span>
                                    )}
                                    <span className="absolute inset-x-4 bottom-4 translate-y-3 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{g.title}</span>
                                </Link>
                            ))}
                        </Parallax>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────────── Membership ───────────────────────────── */

function Membership() {
    return (
        <section className="relative py-28 sm:py-36">
            <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="container-x">
                <SectionHeading
                    align="center"
                    eyebrow="Membership"
                    title="Join"
                    accent={`${site.members} clinicians.`}
                    text="Membership is open to eligible medical professionals with an interest in headache medicine, as defined by the BHS Constitution."
                />
                <div className="mx-auto mt-16 max-w-5xl">
                    <MembershipCategories compact />
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────────── Priorities ───────────────────────────── */

function Priorities() {
    return (
        <section className="relative py-28 sm:py-36">
            <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
                <div className="lg:sticky lg:top-32 lg:self-start">
                    <SectionHeading eyebrow="Future priorities" title="The road" accent="ahead." text="Where the Society is heading over the coming years." />
                </div>
                <ol>
                    {priorities.map((p, i) => (
                        <Reveal as="li" key={p} delay={i * 0.05}>
                            <div className="group relative flex gap-6 border-b border-white/[0.08] py-7 sm:gap-10">
                                <span className="font-display text-5xl text-white/15 italic transition-colors duration-500 group-hover:text-aurora sm:text-6xl">{String(i + 1).padStart(2, '0')}</span>
                                <p className="self-center text-lg leading-relaxed text-ink-100 transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">{p}</p>
                                <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-gradient-to-r from-synapse via-iris to-aura transition-all duration-700 ease-out-expo group-hover:w-full" />
                            </div>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}

/* ───────────────────────────── News ───────────────────────────── */

function Newsroom() {
    return (
        <PaperSection className="py-28 sm:py-36">
            <div className="container-x">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeading eyebrow="Newsroom" title="Latest from" accent="the Society." />
                    <Reveal>
                        <Button to="/news" variant="ghost">
                            All news
                        </Button>
                    </Reveal>
                </div>
                <div className="mt-14 grid gap-5 md:grid-cols-3">
                    {news.map((n, i) => (
                        <Reveal key={n.slug} delay={i * 0.1}>
                            <Link to="/news" className="group block h-full">
                                <SpotlightCard className="flex h-full flex-col p-7">
                                    <div className="flex items-center justify-between">
                                        <Pill color="#dd9933">{n.tag}</Pill>
                                        <span className="font-mono text-xs text-ink-400">{formatDate(n.date)}</span>
                                    </div>
                                    <h3 className="mt-8 font-display text-2xl leading-snug text-white sm:text-3xl">{n.title}</h3>
                                    <p className="mt-4 text-sm leading-relaxed text-ink-300">{n.excerpt}</p>
                                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-white">
                                        Read more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </span>
                                </SpotlightCard>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </PaperSection>
    );
}

/* ───────────────────────────── Final CTA ───────────────────────────── */

function FinalCta() {
    return (
        <section className="relative py-20 sm:py-28">
            <div className="container-x">
                <div className="theme-navy ring-aurora relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0d3561] via-ink-900 to-ink-950 px-6 py-24 text-center sm:px-16 sm:py-32">
                    <Orbits className="top-1/2 left-1/2 w-[900px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/30 blur-[100px]" />
                    <div className="relative">
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                            <LogoMark className="mx-auto h-20 w-20" />
                        </motion.div>
                        <h2 className="mx-auto mt-8 max-w-4xl font-display text-5xl leading-[0.98] text-white sm:text-7xl lg:text-8xl">
                            <SplitWords text="Shape the future of" />{' '}
                            <SplitWords text="headache care." delay={0.2} wordClass={() => 'italic text-aurora'} />
                        </h2>
                        <Reveal delay={0.3}>
                            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-200">Learn, research and lead with Bangladesh’s community of headache medicine professionals.</p>
                        </Reveal>
                        <Reveal delay={0.45} className="mt-10 flex flex-wrap justify-center gap-4">
                            <Magnetic>
                                <Button to="/membership/apply" size="lg">
                                    Apply for membership
                                </Button>
                            </Magnetic>
                            <Button to="/contact" variant="ghost" size="lg">
                                Contact the Society
                            </Button>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
