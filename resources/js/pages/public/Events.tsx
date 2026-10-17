import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Reveal } from '@/components/fx/motion';
import { EventCard, EventRow } from '@/components/sections/shared';
import { PageHero, PaperSection, Pill } from '@/components/ui';
import { eventTypes, events, type EventType, type SocietyEvent } from '@/data/events';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/format';

type View = 'grid' | 'list' | 'calendar';

export default function Events() {
    const [params, setParams] = useSearchParams();
    const view = (params.get('view') as View) || 'grid';
    const [filter, setFilter] = useState<EventType | 'all'>('all');
    const [when, setWhen] = useState<'upcoming' | 'past'>('upcoming');

    const filtered = useMemo(
        () =>
            events
                .filter((e) => filter === 'all' || e.type === filter)
                .filter((e) => view === 'calendar' || e.status === when)
                .sort((a, b) => (when === 'past' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date))),
        [filter, when, view],
    );

    const setView = (v: View) => setParams(v === 'grid' ? {} : { view: v }, { replace: true });

    return (
        <>
            <Seo title="Events & Activities" />
            <PageHero
                eyebrow="Events & Activities"
                title="Learn, gather,"
                accent="raise awareness."
                text="CME programmes, public awareness initiatives, regional events beyond Dhaka and special days — all in one place."
            />

            <PaperSection className="py-20 sm:py-28">
                <div className="container-x">
                    {/* toolbar */}
                    <div className="sticky top-3 z-30 -mx-2 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-ink-950/80 px-2 py-2 backdrop-blur-xl">
                        <div className="glass flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
                            {(['all', ...Object.keys(eventTypes)] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setFilter(t as EventType | 'all')}
                                    className={cn('relative shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors', filter === t ? 'text-ink-950' : 'text-ink-200 hover:text-white')}
                                >
                                    {filter === t && <motion.span layoutId="ev-filter" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                                    <span className="relative">{t === 'all' ? 'All' : eventTypes[t as EventType].label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            {view !== 'calendar' && (
                                <div className="glass flex rounded-full p-1.5">
                                    {(['upcoming', 'past'] as const).map((w) => (
                                        <button key={w} onClick={() => setWhen(w)} className={cn('rounded-full px-4 py-2 text-sm capitalize transition-colors', when === w ? 'bg-white/10 text-white' : 'text-ink-300')}>
                                            {w}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div className="glass flex rounded-full p-1.5">
                                {(
                                    [
                                        ['grid', LayoutGrid],
                                        ['list', List],
                                        ['calendar', CalendarDays],
                                    ] as const
                                ).map(([v, Icon]) => (
                                    <button key={v} onClick={() => setView(v)} aria-label={`${v} view`} className={cn('grid h-9 w-9 place-items-center rounded-full transition-colors', view === v ? 'bg-white text-ink-950' : 'text-ink-300 hover:text-white')}>
                                        <Icon className="h-4 w-4" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div key={`${view}-${filter}-${when}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="mt-10">
                            {view === 'calendar' ? (
                                <YearCalendar events={filtered} />
                            ) : filtered.length === 0 ? (
                                <p className="py-24 text-center text-ink-300">No {when} events in this category yet.</p>
                            ) : view === 'grid' ? (
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {filtered.map((e, i) => (
                                        <EventCard key={e.slug} event={e} index={i} />
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    {filtered.map((e) => (
                                        <EventRow key={e.slug} event={e} />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </PaperSection>
        </>
    );
}

/* ───────────── Interactive annual calendar ───────────── */

function YearCalendar({ events }: { events: SocietyEvent[] }) {
    const [year, setYear] = useState(() => {
        const next = events.find((e) => e.status === 'upcoming');
        return next ? dayjs(next.date).year() : dayjs().year();
    });
    const [selected, setSelected] = useState<string | null>(null);
    const byDate = useMemo(() => {
        const m = new Map<string, SocietyEvent[]>();
        events.forEach((e) => m.set(e.date, [...(m.get(e.date) ?? []), e]));
        return m;
    }, [events]);
    const yearEvents = events.filter((e) => dayjs(e.date).year() === year).sort((a, b) => a.date.localeCompare(b.date));
    const today = dayjs().format('YYYY-MM-DD');
    const shown = selected ? (byDate.get(selected) ?? []) : yearEvents;

    return (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="ring-aurora rounded-[2rem] bg-ink-900/60 p-5 sm:p-8">
                <div className="flex items-center justify-between">
                    <button onClick={() => (setYear(year - 1), setSelected(null))} className="grid h-11 w-11 place-items-center rounded-full glass" aria-label="Previous year">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <AnimatePresence mode="wait">
                        <motion.h2 key={year} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="font-display text-5xl text-white sm:text-6xl">
                            {year}
                        </motion.h2>
                    </AnimatePresence>
                    <button onClick={() => (setYear(year + 1), setSelected(null))} className="grid h-11 w-11 place-items-center rounded-full glass" aria-label="Next year">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 12 }).map((_, m) => {
                        const first = dayjs(new Date(year, m, 1));
                        const offset = (first.day() + 6) % 7; // Monday-first
                        const days = first.daysInMonth();
                        return (
                            <div key={m}>
                                <h3 className="mb-3 font-display text-xl text-white">{first.format('MMMM')}</h3>
                                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[0.65rem] text-ink-400">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                        <span key={i}>{d}</span>
                                    ))}
                                    {Array.from({ length: offset }).map((_, i) => (
                                        <span key={`o${i}`} />
                                    ))}
                                    {Array.from({ length: days }).map((_, d) => {
                                        const iso = first.date(d + 1).format('YYYY-MM-DD');
                                        const evs = byDate.get(iso);
                                        const color = evs ? eventTypes[evs[0].type].color : undefined;
                                        return (
                                            <button
                                                key={iso}
                                                disabled={!evs}
                                                onClick={() => setSelected(selected === iso ? null : iso)}
                                                className={cn(
                                                    'relative grid aspect-square place-items-center rounded-lg text-[0.72rem] transition-all',
                                                    evs ? 'font-bold text-[#05070f] hover:scale-110' : 'text-ink-300',
                                                    iso === today && !evs && 'ring-1 ring-white/30',
                                                    selected === iso && 'scale-110 ring-2 ring-white',
                                                )}
                                                style={evs ? { background: color, boxShadow: `0 0 18px ${color}88` } : undefined}
                                                title={evs?.map((e) => e.title).join(', ')}
                                            >
                                                {d + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                    {Object.values(eventTypes).map((t) => (
                        <Pill key={t.label} color={t.color}>
                            {t.label}
                        </Pill>
                    ))}
                </div>
            </div>

            <aside className="lg:sticky lg:top-44 lg:self-start">
                <div className="flex items-center justify-between">
                    <h3 className="eyebrow">{selected ? formatDate(selected, 'D MMMM YYYY') : `All events in ${year}`}</h3>
                    {selected && (
                        <button onClick={() => setSelected(null)} className="text-xs text-synapse">
                            Clear
                        </button>
                    )}
                </div>
                <div className="mt-4 space-y-3">
                    {shown.length === 0 && <p className="text-ink-400">No events scheduled.</p>}
                    {shown.map((e, i) => (
                        <Reveal key={e.slug} delay={i * 0.05}>
                            <Link to={`/events/${e.slug}`} className="group glass flex gap-4 rounded-2xl p-4 transition-colors hover:bg-white/10">
                                <span className="w-1 shrink-0 rounded-full" style={{ background: eventTypes[e.type].color }} />
                                <div>
                                    <p className="font-mono text-xs text-ink-300">{formatDate(e.date, 'ddd, D MMM')}</p>
                                    <p className="mt-1 font-display text-lg leading-snug text-white">{e.title}</p>
                                    <p className="text-xs text-ink-400">{e.city}</p>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </aside>
        </div>
    );
}
