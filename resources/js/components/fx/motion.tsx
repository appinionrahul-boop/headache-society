import { animate, motion, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react';
import { cn } from '@/lib/cn';

const ease = [0.16, 1, 0.3, 1] as const;

/** Fade + rise + un-blur when scrolled into view. */
export function Reveal({
    children,
    delay = 0,
    y = 28,
    className,
    as = 'div',
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
    as?: 'div' | 'li' | 'section' | 'span';
}) {
    const Comp = motion[as];
    return (
        <Comp
            className={className}
            initial={{ opacity: 0, y, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease, delay }}
        >
            {children}
        </Comp>
    );
}

/** Headline that rises word-by-word from behind a mask. */
export function SplitWords({ text, className, delay = 0, wordClass }: { text: string; className?: string; delay?: number; wordClass?: (word: string, i: number) => string | undefined }) {
    const words = text.split(' ');
    return (
        <span className={className} aria-label={text}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
                    <motion.span
                        className={cn('inline-block', wordClass?.(word, i))}
                        initial={{ y: '110%', rotate: 4 }}
                        whileInView={{ y: '0%', rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease, delay: delay + i * 0.06 }}
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 && ' '}
                </span>
            ))}
        </span>
    );
}

/** Paragraph whose words light up as you scroll through it. */
export function ScrollLitText({ text, className }: { text: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
    const words = text.split(' ');
    return (
        <p ref={ref} className={className}>
            {words.map((word, i) => {
                const start = i / words.length;
                return <LitWord key={i} word={word} range={[start, start + 1 / words.length]} progress={scrollYProgress} />;
            })}
        </p>
    );
}

function LitWord({ word, range, progress }: { word: string; range: [number, number]; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
    const opacity = useTransform(progress, range, [0.14, 1]);
    const highlight = word.startsWith('*');
    const clean = word.replace(/\*/g, '');
    return (
        <motion.span style={{ opacity }} className={cn('inline', highlight && 'font-display italic text-aurora')}>
            {clean}{' '}
        </motion.span>
    );
}

/** Animated number that counts up once visible. */
export function CountUp({ to, duration = 2.2, suffix = '', plain = false, className }: { to: number; duration?: number; suffix?: string; plain?: boolean; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, to, { duration, ease, onUpdate: (v) => setValue(Math.round(v)) });
        return () => controls.stop();
    }, [inView, to, duration]);
    return (
        <span ref={ref} className={className}>
            {plain ? value : value.toLocaleString('en-US')}
            {suffix}
        </span>
    );
}

/** Element that leans towards the cursor. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
    const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    return (
        <motion.div className={cn('inline-block', className)} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={() => (x.set(0), y.set(0))}>
            {children}
        </motion.div>
    );
}

/** Card with a cursor-following spotlight and gradient hairline. */
export function SpotlightCard({ children, className, color = 'rgba(139,123,255,0.18)' }: { children: ReactNode; className?: string; color?: string }) {
    const mx = useMotionValue(-400);
    const my = useMotionValue(-400);
    const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${color}, transparent 65%)`;
    return (
        <div
            className={cn('group ring-aurora relative overflow-hidden rounded-3xl bg-ink-900/60', className)}
            onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set(e.clientX - r.left);
                my.set(e.clientY - r.top);
            }}
            onPointerLeave={() => (mx.set(-400), my.set(-400))}
        >
            <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: bg }} />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

/** 3D tilt on hover. */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
    const rx = useSpring(0, { stiffness: 160, damping: 16 });
    const ry = useSpring(0, { stiffness: 160, damping: 16 });
    return (
        <motion.div
            className={className}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
            onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
                rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
            }}
            onPointerLeave={() => (rx.set(0), ry.set(0))}
        >
            {children}
        </motion.div>
    );
}

/** Infinite horizontal ticker. */
export function Marquee({ children, className, reverse = false, gap = 'gap-12 pr-12' }: { children: ReactNode; className?: string; reverse?: boolean; gap?: string }) {
    return (
        <div className={cn('flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]', className)}>
            <div className={cn('flex shrink-0 animate-marquee', gap, reverse && '[animation-direction:reverse]')}>
                {children}
                {children}
            </div>
        </div>
    );
}

/** Thin aurora bar showing page scroll progress. */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
    return (
        <motion.div
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-synapse via-iris to-aura"
        />
    );
}

/** Soft glow that trails the cursor on desktop. */
export function CursorAura() {
    const x = useMotionValue(-500);
    const y = useMotionValue(-500);
    const sx = useSpring(x, { stiffness: 90, damping: 20 });
    const sy = useSpring(y, { stiffness: 90, damping: 20 });
    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        const move = (e: PointerEvent) => (x.set(e.clientX - 250), y.set(e.clientY - 250));
        window.addEventListener('pointermove', move, { passive: true });
        return () => window.removeEventListener('pointermove', move);
    }, [x, y]);
    return (
        <motion.div
            aria-hidden
            style={{ x: sx, y: sy }}
            className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,123,255,0.10),transparent_65%)] md:block"
        />
    );
}

/** Parallax wrapper: moves children at a different rate to scroll. */
export function Parallax({ children, offset = 80, className }: { children: ReactNode; offset?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}
