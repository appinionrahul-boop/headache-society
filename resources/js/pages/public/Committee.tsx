import { BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Reveal } from '@/components/fx/motion';
import { DoctorCard } from '@/components/sections/shared';
import { Avatar, Button, PageHero, PaperSection } from '@/components/ui';
import { agenda } from '@/data/events';
import { advisors, committeeApproved, committeeTerm, executiveMembers, officers } from '@/data/people';
import type { Doctor } from '@/data/people';

function Group({ title, people, offset }: { title: string; people: Doctor[]; offset: number }) {
    return (
        <>
            <div className="mt-20 flex items-center gap-4">
                <h3 className="eyebrow">{title}</h3>
                <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                <span className="font-mono text-xs text-ink-400">{people.length}</span>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {people.map((d, i) => (
                    <Reveal key={d.slug} delay={(i % 4) * 0.06}>
                        <DoctorCard doctor={d} index={i + offset} />
                    </Reveal>
                ))}
            </div>
        </>
    );
}

export default function Committee() {
    const [president, ...rest] = officers;

    return (
        <>
            <Seo title="Executive Committee" />
            <PageHero
                eyebrow={`Executive Committee ${committeeTerm}`}
                title="Leadership with"
                accent="purpose."
                text="The current Executive Committee leads the Society’s programmes, membership growth and international collaboration."
            >
                <p className="mt-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-ink-100">
                    <BadgeCheck className="h-4 w-4 text-synapse" /> Approved by the Society of Neurologists of Bangladesh (SNB) · {committeeApproved}
                </p>
            </PageHero>

            <PaperSection className="py-16 sm:py-24">
                <div className="container-x">
                    {president && (
                        <Reveal>
                            <Link
                                to={`/doctors/${president.slug}`}
                                className="group ring-aurora relative grid overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#ffffff] via-[#f3f7fb] to-[#e3edf6] p-8 shadow-[0_30px_80px_-40px_rgba(196,127,31,0.45)] sm:p-12 md:grid-cols-[auto_1fr] md:items-center md:gap-14"
                            >
                                <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#f8b81f]/20 blur-[120px]" />
                                <Avatar name={president.name} photo={president.photo} hue={40} className="relative w-44 text-lg transition-transform duration-700 group-hover:scale-105 sm:w-56" />
                                <div className="relative mt-8 md:mt-0">
                                    <span className="eyebrow !text-gold">{president.ecPosition}</span>
                                    <h2 className="mt-3 font-display text-4xl text-white sm:text-6xl">{president.name}</h2>
                                    <p className="mt-6 max-w-2xl leading-relaxed text-ink-300">
                                        Provides overall leadership, presides over General Body and Executive Committee meetings, and represents the Society nationally and internationally.
                                    </p>
                                </div>
                            </Link>
                        </Reveal>
                    )}

                    <Group title="Office bearers" people={rest} offset={1} />
                    <Group title="Executive members" people={executiveMembers} offset={9} />
                    <Group title="Advisors" people={advisors} offset={17} />
                </div>
            </PaperSection>

            <section className="py-20 sm:py-28">
                <div className="container-x">
                    <div className="ring-aurora grid gap-10 rounded-[2.5rem] bg-ink-900/60 p-8 sm:p-12 lg:grid-cols-[1fr_1.3fr]">
                        <div>
                            <span className="eyebrow">EC activities</span>
                            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
                                Current <span className="text-aurora italic">agenda</span>
                            </h2>
                            <p className="mt-4 text-ink-300">Discussed at the EC meeting on 7 October 2026, National Institute of Neurosciences & Hospital (NINS), Dhaka.</p>
                            <Button to="/events/ec-meeting-future-action-plan" variant="ghost" className="mt-8">
                                Meeting details
                            </Button>
                        </div>
                        <ol className="space-y-1">
                            {agenda.map((a, i) => (
                                <Reveal as="li" key={a} delay={i * 0.05} className="flex items-center gap-5 border-b border-white/[0.06] py-4">
                                    <span className="font-display text-3xl text-white/20 italic">{i + 1}</span>
                                    <span className="text-lg text-ink-100">{a}</span>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>
        </>
    );
}
