import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { NeuralCanvas } from '@/components/fx/NeuralCanvas';
import { Reveal, SplitWords } from '@/components/fx/motion';
import { initials } from '@/data/people';

type ButtonProps = {
    to?: string;
    href?: string;
    variant?: 'primary' | 'ghost' | 'gold';
    size?: 'md' | 'lg';
    icon?: boolean;
    className?: string;
    children: ReactNode;
} & Omit<ComponentProps<'button'>, 'className' | 'children'>;

export function Button({ to, href, variant = 'primary', size = 'md', icon = true, className, children, ...rest }: ButtonProps) {
    const classes = cn(
        'group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-tight transition-all duration-500 ease-out-expo active:scale-[0.97]',
        size === 'lg' ? 'px-7 py-4 text-[0.95rem]' : 'px-5 py-3 text-sm',
        variant === 'primary' &&
            'bg-[#dd9933] text-[#ffffff] shadow-[0_20px_50px_-12px_rgba(221,153,51,0.55)] hover:bg-[#021e40] hover:shadow-[0_24px_70px_-10px_rgba(2,30,64,0.45)]',
        variant === 'ghost' && 'glass text-white hover:bg-white/10',
        variant === 'gold' &&
            'bg-gradient-to-b from-[#fff1d0] via-gold to-gold-deep text-ink-950 shadow-[0_20px_50px_-15px_rgba(255,198,0,0.7)]',
        className,
    );
    const inner = (
        <>
            {variant === 'primary' && (
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-synapse/0 via-synapse/40 to-iris/0 transition-transform duration-1000 ease-out-expo group-hover:translate-x-full" />
            )}
            <span className="relative">{children}</span>
            {icon && (
                <span className="relative grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-ink-950/10">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-4 group-hover:-translate-y-4" />
                    <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
            )}
        </>
    );
    if (to) return <Link to={to} className={classes}>{inner}</Link>;
    if (href) return <a href={href} className={classes} target="_blank" rel="noreferrer">{inner}</a>;
    return <button className={classes} {...rest}>{inner}</button>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <span className={cn('eyebrow inline-flex items-center gap-3', className)}>
            <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-synapse" />
                <span className="relative h-2 w-2 rounded-full bg-synapse" />
            </span>
            {children}
        </span>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    accent,
    text,
    align = 'left',
    className,
}: {
    eyebrow: string;
    title: string;
    accent?: string;
    text?: string;
    align?: 'left' | 'center';
    className?: string;
}) {
    return (
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
            <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="mt-5 font-display text-[2.6rem] leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
                <SplitWords text={title} />
                {accent && (
                    <>
                        {' '}
                        <SplitWords text={accent} delay={0.2} wordClass={() => 'italic text-aurora'} />
                    </>
                )}
            </h2>
            {text && (
                <Reveal delay={0.2}>
                    <p className={cn('mt-6 max-w-2xl text-lg leading-relaxed text-ink-200', align === 'center' && 'mx-auto')}>{text}</p>
                </Reveal>
            )}
        </div>
    );
}

/** Hero banner used at the top of inner pages. */
export function PageHero({ eyebrow, title, accent, text, children }: { eyebrow: string; title: string; accent?: string; text?: string; children?: ReactNode }) {
    return (
        <section className="theme-navy relative overflow-hidden bg-ink-950 pt-40 pb-20 sm:pt-48 sm:pb-28">
            <div className="absolute inset-0 grid-lines" />
            <NeuralCanvas density={0.45} className="opacity-60" />
            <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-iris/20 blur-[140px]" />
            <div className="relative container-x">
                <Reveal>
                    <Eyebrow>{eyebrow}</Eyebrow>
                </Reveal>
                <h1 className="mt-6 max-w-5xl font-display text-[3.2rem] leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[6.5rem]">
                    <SplitWords text={title} />
                    {accent && (
                        <>
                            {' '}
                            <SplitWords text={accent} delay={0.25} wordClass={() => 'italic text-aurora'} />
                        </>
                    )}
                </h1>
                {text && (
                    <Reveal delay={0.3}>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-xl">{text}</p>
                    </Reveal>
                )}
                {children && <Reveal delay={0.4}>{children}</Reveal>}
            </div>
        </section>
    );
}

/** Generated artwork used until real photos are uploaded via the CMS. */
export function PlaceholderArt({ hue = 250, className, label, seed = 1 }: { hue?: number; className?: string; label?: string; seed?: number }) {
    const h2 = (hue + 60) % 360;
    const h3 = (hue + 160) % 360;
    return (
        <div
            className={cn('relative overflow-hidden bg-ink-900', className)}
            style={{
                backgroundImage: `radial-gradient(120% 90% at ${20 + (seed * 17) % 60}% 10%, hsl(${hue} 85% 62% / .55), transparent 55%),
                    radial-gradient(90% 80% at 90% ${60 + (seed * 13) % 40}%, hsl(${h2} 90% 60% / .45), transparent 60%),
                    radial-gradient(70% 60% at 10% 100%, hsl(${h3} 80% 55% / .35), transparent 60%)`,
            }}
        >
            <svg className="absolute inset-0 h-full w-full opacity-40 mix-blend-overlay" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden>
                {Array.from({ length: 9 }).map((_, i) => (
                    <path
                        key={i}
                        d={`M0 ${80 + i * 18} C 100 ${40 + i * 22 + seed * 3}, 220 ${170 + i * 8}, 400 ${60 + i * 20}`}
                        fill="none"
                        stroke="white"
                        strokeWidth="0.8"
                    />
                ))}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
            {label && <span className="absolute bottom-3 left-4 eyebrow !text-[0.6rem] !text-white/60">{label}</span>}
        </div>
    );
}

/** Doctor avatar: photo when available, otherwise monogram on an aura disc. */
export function Avatar({ name, photo, hue = 250, className }: { name: string; photo?: string; hue?: number; className?: string }) {
    return (
        <div className={cn('relative aspect-square overflow-hidden rounded-full p-[1.5px]', className)} style={{ background: `conic-gradient(from ${hue}deg, #dd9933, #f8b81f, #ff8a3d, #ffc600, #dd9933)` }}>
            <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-ink-900">
                {photo ? (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#164577,#0f1330_60%,#021e40)]" />
                        <img src={photo} alt={name} className="relative h-full w-full object-cover object-top" loading="lazy" />
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 20%, hsl(${hue} 80% 60% / .35), transparent 60%)` }} />
                        <span className="relative font-display text-[2.2em] text-white/90 italic">{initials(name)}</span>
                    </>
                )}
            </div>
        </div>
    );
}

export function Pill({ children, color, className }: { children: ReactNode; color?: string; className?: string }) {
    return (
        <span
            className={cn('inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.65rem] tracking-[0.14em] text-ink-100 uppercase', className)}
        >
            {color && <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />}
            {children}
        </span>
    );
}

/** Orbiting rings decoration. */
export function Orbits({ className }: { className?: string }) {
    return (
        <div className={cn('pointer-events-none absolute aspect-square', className)} aria-hidden>
            {[1, 0.78, 0.56, 0.34].map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 m-auto rounded-full border border-white/[0.07]"
                    style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
                    animate={{ rotate: i % 2 ? -360 : 360 }}
                    transition={{ duration: 40 + i * 12, repeat: Infinity, ease: 'linear' }}
                >
                    <span
                        className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ background: ['#dd9933', '#f8b81f', '#ff8a3d', '#ffc600'][i], boxShadow: `0 0 16px ${['#dd9933', '#f8b81f', '#ff8a3d', '#ffc600'][i]}` }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

/** Light editorial panel — content inside automatically switches to the paper palette. */
export function PaperSection({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
    return (
        <section id={id} className={cn('theme-paper relative mx-2 my-4 overflow-clip rounded-[2rem] sm:mx-4 sm:rounded-[3.5rem]', className)}>
            <div className="pointer-events-none absolute -top-48 right-[-8%] h-[560px] w-[560px] rounded-full bg-[#f8b81f]/25 blur-[140px]" aria-hidden />
            <div className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] rounded-full bg-[#ffc600]/30 blur-[140px]" aria-hidden />
            <div className="relative">{children}</div>
        </section>
    );
}
