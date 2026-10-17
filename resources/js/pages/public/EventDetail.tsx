import { ArrowLeft, CalendarDays, CalendarPlus, Clock, MapPin, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Seo } from '@/components/Seo';
import { NeuralCanvas } from '@/components/fx/NeuralCanvas';
import { Reveal, SplitWords } from '@/components/fx/motion';
import { Countdown, EventCard } from '@/components/sections/shared';
import { Button, PaperSection, Pill, PlaceholderArt } from '@/components/ui';
import { eventTypes, events, findEvent } from '@/data/events';
import { formatDate } from '@/lib/format';
import NotFound from './NotFound';

export default function EventDetail() {
    const { slug = '' } = useParams();
    const event = findEvent(slug);
    if (!event) return <NotFound />;
    const type = eventTypes[event.type];
    const related = events.filter((e) => e.slug !== event.slug && e.status === 'upcoming').slice(0, 3);

    const share = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Event link copied');
        } catch {
            toast.error('Could not copy link');
        }
    };

    return (
        <>
            <Seo title={event.title} description={event.summary} />
            <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44">
                <NeuralCanvas density={0.4} className="opacity-50" />
                <div className="absolute -top-20 left-1/3 h-[500px] w-[700px] rounded-full blur-[150px]" style={{ background: `${type.color}25` }} />
                <div className="relative container-x">
                    <Link to="/events" className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> All events
                    </Link>
                    <div className="mt-8 flex flex-wrap gap-2">
                        <Pill color={type.color}>{type.label}</Pill>
                        <Pill>{event.status === 'upcoming' ? 'Upcoming' : 'Past event'}</Pill>
                        {event.sample && <Pill className="!text-gold">Sample content</Pill>}
                    </div>
                    <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] text-white sm:text-7xl">
                        <SplitWords text={event.title} />
                    </h1>
                </div>
            </section>

            <PaperSection className="py-20 sm:py-28">
                <div className="container-x grid gap-12 lg:grid-cols-[1fr_380px]">
                    <div>
                        <Reveal>
                            <PlaceholderArt hue={[...event.slug].length * 9} seed={3} label="Event cover — upload via CMS" className="aspect-[16/8] rounded-[2rem]" />
                        </Reveal>
                        <div className="mt-12 space-y-6">
                            <Reveal>
                                <p className="font-display text-3xl leading-snug text-white">{event.summary}</p>
                            </Reveal>
                            {(event.body ?? ['Full programme, speakers and registration details will be published here.']).map((p, i) => (
                                <Reveal key={i} delay={i * 0.05}>
                                    <p className="text-lg leading-relaxed text-ink-200">{p}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                        <Reveal className="ring-aurora rounded-[2rem] bg-ink-900/70 p-7">
                            <ul className="space-y-5 text-ink-100">
                                <li className="flex gap-4">
                                    <CalendarDays className="h-5 w-5 shrink-0 text-synapse" />
                                    {formatDate(event.date, 'dddd, D MMMM YYYY')}
                                </li>
                                {event.time && (
                                    <li className="flex gap-4">
                                        <Clock className="h-5 w-5 shrink-0 text-synapse" />
                                        {event.time}
                                    </li>
                                )}
                                <li className="flex gap-4">
                                    <MapPin className="h-5 w-5 shrink-0 text-synapse" />
                                    {event.venue}, {event.city}
                                </li>
                            </ul>
                            {event.status === 'upcoming' && (
                                <div className="mt-8">
                                    <p className="eyebrow mb-3">Starts in</p>
                                    <Countdown target={event.date} />
                                </div>
                            )}
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button onClick={() => toast.success('Added to your calendar (demo)')} icon={false}>
                                    <span className="flex items-center gap-2">
                                        <CalendarPlus className="h-4 w-4" /> Add to calendar
                                    </span>
                                </Button>
                                <Button variant="ghost" onClick={share} icon={false}>
                                    <span className="flex items-center gap-2">
                                        <Share2 className="h-4 w-4" /> Share
                                    </span>
                                </Button>
                            </div>
                        </Reveal>
                    </aside>
                </div>
            </PaperSection>

            {related.length > 0 && (
                <section className="pb-28">
                    <div className="container-x">
                        <h2 className="font-display text-4xl text-white sm:text-5xl">
                            More <span className="text-aurora italic">events</span>
                        </h2>
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((e, i) => (
                                <EventCard key={e.slug} event={e} index={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
