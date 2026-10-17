import { ArrowUpRight, Calendar, Check, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, SpotlightCard, Tilt } from '@/components/fx/motion';
import { Avatar, Button, PlaceholderArt, Pill } from '@/components/ui';
import { eventTypes, type SocietyEvent } from '@/data/events';
import type { Doctor } from '@/data/people';
import { memberRights, membershipCategories } from '@/data/site';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/format';

export function useCountdown(target: string) {
    const calc = () => Math.max(0, new Date(target).getTime() - Date.now());
    const [ms, setMs] = useState(calc);
    useEffect(() => {
        const id = setInterval(() => setMs(calc()), 1000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);
    return {
        days: Math.floor(ms / 86_400_000),
        hours: Math.floor((ms / 3_600_000) % 24),
        minutes: Math.floor((ms / 60_000) % 60),
        seconds: Math.floor((ms / 1000) % 60),
    };
}

export function Countdown({ target, className }: { target: string; className?: string }) {
    const t = useCountdown(target);
    return (
        <div className={cn('grid grid-cols-4 gap-2 sm:gap-3', className)}>
            {(['days', 'hours', 'minutes', 'seconds'] as const).map((k) => (
                <div key={k} className="glass rounded-2xl px-2 py-4 text-center">
                    <div className="relative h-10 overflow-hidden font-display text-4xl text-white tabular-nums sm:h-12 sm:text-5xl">
                        <motion.span key={t[k]} initial={{ y: '-100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="block">
                            {String(t[k]).padStart(2, '0')}
                        </motion.span>
                    </div>
                    <div className="mt-1 eyebrow !text-[0.6rem]">{k}</div>
                </div>
            ))}
        </div>
    );
}

const hueFor = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

export function EventCard({ event, index = 0 }: { event: SocietyEvent; index?: number }) {
    const type = eventTypes[event.type];
    return (
        <Reveal delay={index * 0.08} className="h-full">
            <Link to={`/events/${event.slug}`} className="group block h-full">
                <SpotlightCard className="flex h-full flex-col">
                    <div className="relative">
                        <PlaceholderArt hue={hueFor(event.slug)} seed={index + 2} className="aspect-[16/10] transition-transform duration-1000 ease-out-expo group-hover:scale-105" />
                        <div className="absolute top-4 left-4 flex gap-2">
                            <Pill color={type.color}>{type.label}</Pill>
                        </div>
                        <div className="absolute right-4 bottom-4 rounded-2xl glass px-3 py-2 text-center">
                            <div className="font-display text-3xl leading-none text-white">{formatDate(event.date, 'DD')}</div>
                            <div className="eyebrow mt-1 !text-[0.6rem] !text-white/80">{formatDate(event.date, 'MMM YY')}</div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-2xl leading-tight text-white">{event.title}</h3>
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-300">{event.summary}</p>
                        <div className="mt-auto flex items-center justify-between pt-6 text-xs text-ink-300">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-synapse" />
                                {event.city}
                            </span>
                            <span className="flex items-center gap-1 text-white opacity-60 transition-all group-hover:gap-2 group-hover:opacity-100">
                                Details <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                        </div>
                    </div>
                </SpotlightCard>
            </Link>
        </Reveal>
    );
}

export function EventRow({ event }: { event: SocietyEvent }) {
    const type = eventTypes[event.type];
    return (
        <Link
            to={`/events/${event.slug}`}
            className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-white/[0.07] py-6 transition-colors sm:gap-8"
        >
            <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-iris/10 to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
            <div className="w-16 text-center sm:w-20">
                <div className="font-display text-4xl leading-none text-white sm:text-5xl">{formatDate(event.date, 'DD')}</div>
                <div className="eyebrow mt-1 !text-[0.6rem]">{formatDate(event.date, 'MMM YYYY')}</div>
            </div>
            <div className="min-w-0">
                <Pill color={type.color}>{type.label}</Pill>
                <h3 className="mt-2 truncate font-display text-xl text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">{event.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-300">
                    <Calendar className="h-3.5 w-3.5" /> {event.time ? `${event.time} · ` : ''}
                    {event.venue}, {event.city}
                </p>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-synapse group-hover:bg-synapse group-hover:text-ink-950">
                <ArrowUpRight className="h-5 w-5" />
            </span>
        </Link>
    );
}

export function DoctorCard({ doctor, index = 0 }: { doctor: Doctor; index?: number }) {
    return (
        <Tilt className="h-full">
            <Link to={`/doctors/${doctor.slug}`} className="group block h-full">
                <SpotlightCard className="h-full p-6 text-center">
                    <Avatar name={doctor.name} photo={doctor.photo} hue={(index * 47) % 360} className="mx-auto w-28 text-sm transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                    {doctor.ecPosition && <div className="mt-5 eyebrow !text-[0.62rem] !text-gold">{doctor.ecPosition}</div>}
                    <h3 className="mt-2 font-display text-xl leading-tight text-white">{doctor.name}</h3>
                    {doctor.designation && <p className="mt-1 text-sm text-ink-300">{doctor.designation}</p>}
                    {doctor.institution && <p className="text-sm text-ink-400">{doctor.institution}</p>}
                </SpotlightCard>
            </Link>
        </Tilt>
    );
}

export const categorySlug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '');

export function MembershipCategories({ compact = false }: { compact?: boolean }) {
    const featured = membershipCategories.filter((c) => c.featured);
    const others = membershipCategories.filter((c) => !c.featured);
    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2">
                {featured.map((c, i) => {
                    const gold = i === 0;
                    return (
                        <Reveal key={c.name} delay={i * 0.12}>
                            <div className={cn('ring-aurora relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-10', gold ? 'bg-gradient-to-b from-[#1b1640] to-ink-900' : 'bg-ink-900/60')}>
                                {gold && <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold/25 blur-[90px]" />}
                                <div className="relative">
                                    <h3 className="eyebrow !text-ink-200">Membership category</h3>
                                    <p className={cn('mt-6 font-display text-5xl leading-none sm:text-6xl', gold ? 'text-gold' : 'text-white')}>{c.name}</p>
                                    <p className="mt-4 max-w-sm text-ink-300">{c.text}</p>
                                    <ul className="mt-8 space-y-3.5">
                                        {memberRights.map((r) => (
                                            <li key={r} className="flex items-start gap-3 text-ink-100">
                                                <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full', gold ? 'bg-gold/20 text-gold' : 'bg-synapse/15 text-synapse')}>
                                                    <Check className="h-3 w-3" />
                                                </span>
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button to={`/membership/apply?category=${categorySlug(c.name)}`} variant={gold ? 'gold' : 'ghost'} size="lg" className="mt-10">
                                        Apply now
                                    </Button>
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
            {!compact && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {others.map((c, i) => (
                        <Reveal key={c.name} delay={i * 0.06}>
                            <SpotlightCard className="h-full p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-display text-2xl text-white">{c.name}</h3>
                                    <Pill color={c.apply ? '#36e3f2' : '#e9c784'}>{c.apply ? 'Open' : 'By conferral'}</Pill>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-ink-300">{c.text}</p>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            )}
        </div>
    );
}
