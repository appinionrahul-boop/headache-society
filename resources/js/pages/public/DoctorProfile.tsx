import { ArrowLeft, ArrowUpRight, BadgeCheck, BookOpen, Building2, GraduationCap, Mail, Microscope, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { NeuralCanvas } from '@/components/fx/NeuralCanvas';
import { CountUp, Reveal, SplitWords, SpotlightCard, Tilt } from '@/components/fx/motion';
import { DoctorCard } from '@/components/sections/shared';
import { Avatar, Button, PaperSection, Pill } from '@/components/ui';
import { committeeTerm, doctors, findDoctor, type Doctor } from '@/data/people';
import NotFound from './NotFound';

function Portrait({ doctor, hue }: { doctor: Doctor; hue: number }) {
    if (!doctor.photo) return <Avatar name={doctor.name} hue={hue} className="w-48 text-lg sm:w-64" />;
    return (
        <Tilt max={6} className="w-64 sm:w-80">
            <div className="theme-navy ring-aurora relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_25%,#1a4c80,#121735_55%,#021e40)] shadow-[0_40px_120px_-30px_rgba(248,184,31,0.55)]">
                <div className="absolute inset-0 grid-lines opacity-60" />
                <div className="absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-synapse/25 blur-3xl" />
                <img src={doctor.photo} alt={`Portrait of ${doctor.name}`} className="relative aspect-[4/5] w-full object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/90 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                    <span className="glass rounded-full px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.2em] text-white uppercase">{doctor.ecPosition}</span>
                    <span className="font-display text-sm text-white/60 italic">BHS</span>
                </div>
            </div>
        </Tilt>
    );
}

function Section({ icon: Icon, title, children, className }: { icon: typeof BookOpen; title: string; children: ReactNode; className?: string }) {
    return (
        <Reveal className={className}>
            <div className="ring-aurora h-full rounded-[2rem] bg-ink-900/60 p-7 sm:p-10">
                <h2 className="flex items-center gap-3 eyebrow">
                    <Icon className="h-4 w-4 text-synapse" /> {title}
                </h2>
                <div className="mt-7">{children}</div>
            </div>
        </Reveal>
    );
}

export default function DoctorProfile() {
    const { slug = '' } = useParams();
    const doctor = findDoctor(slug);
    if (!doctor) return <NotFound />;
    const index = doctors.indexOf(doctor);
    const hue = (index * 47) % 360;
    const others = doctors.filter((d) => d.slug !== slug && d.group === doctor.group).slice(0, 4);
    const role = doctor.group === 'advisor' ? 'Advisor, Bangladesh Headache Society' : `Executive Committee ${committeeTerm} · Bangladesh Headache Society`;
    const rich = Boolean(doctor.qualifications?.length);

    return (
        <>
            <Seo title={doctor.name} description={doctor.designation ? `${doctor.designation}, ${doctor.institution}` : `${doctor.ecPosition}, Bangladesh Headache Society`} />

            {/* Hero */}
            <section className="theme-navy relative overflow-hidden bg-ink-950 pt-36 pb-16 sm:pt-44 sm:pb-24">
                <NeuralCanvas density={0.4} className="opacity-50" />
                <div className="absolute -top-20 right-0 h-[500px] w-[600px] rounded-full bg-iris/20 blur-[150px]" />
                <div className="relative container-x">
                    <Link to="/committee" className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> Executive Committee
                    </Link>
                    <div className="mt-10 grid gap-12 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
                        <Reveal>
                            <Portrait doctor={doctor} hue={hue} />
                        </Reveal>
                        <div>
                            {doctor.ecPosition && <Pill color="#ffc600">{doctor.ecPosition}</Pill>}
                            <h1 className="mt-5 font-display text-5xl leading-[0.95] text-white sm:text-7xl">
                                <SplitWords text={doctor.name} />
                            </h1>
                            <Reveal delay={0.2}>
                                {doctor.designation && <p className="mt-6 text-xl text-white sm:text-2xl">{doctor.designation}</p>}
                                {doctor.institution && <p className="mt-1 text-lg text-ink-300">{doctor.institution}</p>}
                                {doctor.qualifications && (
                                    <p className="mt-4 font-mono text-sm tracking-wide text-synapse">{doctor.qualifications.map((q) => q.degree.split(' ')[0]).join(' · ')}</p>
                                )}
                                <p className="mt-5 flex items-center gap-2 text-sm text-ink-300">
                                    <BadgeCheck className="h-4 w-4 text-synapse" /> {role}
                                </p>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Button to="/contact" icon={false}>
                                        <span className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" /> Contact via BHS
                                        </span>
                                    </Button>
                                    {doctor.publications && (
                                        <a href="#publications" className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                                            <BookOpen className="h-4 w-4" /> Publications
                                        </a>
                                    )}
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {doctor.publicationStats && (
                        <Reveal delay={0.3} className="mt-14">
                            <div className="glass grid grid-cols-2 divide-white/10 rounded-3xl sm:grid-cols-4 sm:divide-x">
                                {[
                                    { v: doctor.publicationStats.total, l: 'Publications' },
                                    { v: doctor.publicationStats.principal, l: 'As principal author' },
                                    { v: doctor.publicationStats.international, l: 'International papers' },
                                    { v: doctor.qualifications?.length ?? 0, l: 'Postgraduate & medical degrees' },
                                ].map((s) => (
                                    <div key={s.l} className="px-6 py-5">
                                        <div className="font-display text-4xl text-white">
                                            <CountUp to={s.v} duration={1.6} />
                                        </div>
                                        <div className="eyebrow mt-1 !text-[0.6rem]">{s.l}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* Body */}
            <PaperSection className="py-20 sm:py-28">
                <div className="container-x grid gap-6 lg:grid-cols-[1.45fr_1fr]">
                    <Section icon={Users} title="Profile">
                        <p className="font-display text-2xl leading-relaxed text-white sm:text-[1.75rem]">
                            {doctor.bio ?? 'Biography, present designation and professional details will be published here shortly.'}
                        </p>
                        {doctor.interests && (
                            <div className="mt-8 flex flex-wrap gap-2">
                                {doctor.interests.map((i) => (
                                    <Pill key={i} color="#dd9933">
                                        {i}
                                    </Pill>
                                ))}
                            </div>
                        )}
                    </Section>

                    {rich ? (
                        <Section icon={GraduationCap} title="Qualifications">
                            <ul className="space-y-5">
                                {doctor.qualifications!.map((q) => (
                                    <li key={q.degree} className="flex gap-4">
                                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-synapse to-iris shadow-[0_0_12px_#dd9933]" />
                                        <span>
                                            <span className="block font-display text-xl text-white">{q.degree}</span>
                                            {q.institution && <span className="text-sm text-ink-300">{q.institution}</span>}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    ) : (
                        <Section icon={Building2} title="At a glance">
                            <ul className="space-y-4 text-ink-100">
                                <li>
                                    <span className="block text-xs text-ink-400">Role in BHS</span>
                                    {doctor.ecPosition ?? 'Member'}
                                </li>
                                <li>
                                    <span className="block text-xs text-ink-400">Present designation</span>
                                    {doctor.designation ?? 'To be updated'}
                                </li>
                                <li>
                                    <span className="block text-xs text-ink-400">Institution</span>
                                    {doctor.institution ?? 'To be updated'}
                                </li>
                            </ul>
                        </Section>
                    )}

                    {doctor.career && (
                        <Section icon={Building2} title="Career">
                            <ol className="relative space-y-7 border-l border-white/10 pl-7">
                                {doctor.career.map((c) => (
                                    <li key={c.year + c.text} className="relative">
                                        <span className="absolute top-1.5 -left-[33px] h-3 w-3 rounded-full border-2 border-synapse bg-ink-950 shadow-[0_0_12px_#dd9933]" />
                                        <span className="font-mono text-sm text-synapse">{c.year}</span>
                                        <p className="mt-1 text-ink-100">{c.text}</p>
                                    </li>
                                ))}
                            </ol>
                        </Section>
                    )}

                    {doctor.memberships && (
                        <Section icon={Users} title="Professional memberships">
                            <ul className="grid gap-3">
                                {doctor.memberships.map((m) => (
                                    <li key={m} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-ink-100">
                                        <BadgeCheck className="h-4 w-4 shrink-0 text-gold" />
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {doctor.publications && (
                        <div id="publications" className="scroll-mt-28 lg:col-span-2">
                            <Section icon={Microscope} title="Selected publications">
                                <ol className="divide-y divide-white/[0.07]">
                                    {doctor.publications.map((p, i) => (
                                        <li key={p.title} className="group grid gap-3 py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6">
                                            <span className="font-display text-3xl text-white/20 italic">{String(i + 1).padStart(2, '0')}</span>
                                            <div>
                                                <p className="font-display text-xl leading-snug text-white transition-colors group-hover:text-synapse sm:text-2xl">{p.title}</p>
                                                <p className="mt-1 text-sm text-ink-300">{p.journal}</p>
                                            </div>
                                            <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                                                <span className="font-mono text-sm text-ink-200">{p.year}</span>
                                                <Pill color={p.role === 'Principal author' ? '#ffc600' : '#f8b81f'}>{p.role}</Pill>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                                {doctor.publicationStats && (
                                    <p className="mt-6 flex items-center gap-2 text-sm text-ink-400">
                                        <ArrowUpRight className="h-4 w-4" /> Showing {doctor.publications.length} of {doctor.publicationStats.total} peer-reviewed publications.
                                    </p>
                                )}
                            </Section>
                        </div>
                    )}
                </div>
            </PaperSection>

            {others.length > 0 && (
                <section className="pb-28">
                    <div className="container-x">
                        <h2 className="font-display text-4xl text-white">
                            Also on the <span className="text-aurora italic">committee</span>
                        </h2>
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {others.map((d, i) => (
                                <DoctorCard key={d.slug} doctor={d} index={i + 3} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

