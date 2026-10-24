import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Reveal } from '@/components/fx/motion';
import { PageHero, PaperSection, Pill, PlaceholderArt } from '@/components/ui';
import { news } from '@/data/media';
import { formatDate } from '@/lib/format';

export default function News() {
    const [lead, ...rest] = news;
    return (
        <>
            <Seo title="News" />
            <PageHero eyebrow="Newsroom" title="Society" accent="updates." text="Announcements, programme reports and milestones from the Bangladesh Headache Society." />
            <PaperSection className="py-20 sm:py-28">
                <div className="container-x">
                    {lead && (
                        <Reveal>
                            <article className="group ring-aurora grid overflow-hidden rounded-[2rem] bg-ink-900/60 lg:grid-cols-2">
                                <PlaceholderArt hue={260} seed={4} className="aspect-[16/10] lg:aspect-auto" />
                                <div className="p-8 sm:p-12">
                                    <div className="flex items-center gap-3">
                                        <Pill color="#dd9933">{lead.tag}</Pill>
                                        <span className="font-mono text-xs text-ink-400">{formatDate(lead.date)}</span>
                                    </div>
                                    <h2 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">{lead.title}</h2>
                                    <p className="mt-5 text-lg text-ink-200">{lead.excerpt}</p>
                                    <span className="mt-8 inline-flex items-center gap-2 font-semibold text-synapse">
                                        Read story <ArrowUpRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </article>
                        </Reveal>
                    )}
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {rest.map((n, i) => (
                            <Reveal key={n.slug} delay={i * 0.1}>
                                <article className="ring-aurora h-full rounded-[2rem] bg-ink-900/60 p-8">
                                    <div className="flex items-center gap-3">
                                        <Pill color="#f8b81f">{n.tag}</Pill>
                                        <span className="font-mono text-xs text-ink-400">{formatDate(n.date)}</span>
                                    </div>
                                    <h3 className="mt-6 font-display text-3xl leading-tight text-white">{n.title}</h3>
                                    <p className="mt-4 text-ink-300">{n.excerpt}</p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </PaperSection>
        </>
    );
}
