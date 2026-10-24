import { useId } from 'react';
import { cn } from '@/lib/cn';

/** BHS mark: a brain — organic cortical folds on the left, neural circuitry on the right. */
export function LogoMark({ className }: { className?: string }) {
    const id = useId();
    const g = `url(#${id}g)`;
    return (
        <svg viewBox="0 0 48 48" className={cn('h-10 w-10', className)} aria-hidden>
            <defs>
                <linearGradient id={`${id}g`} x1="6" y1="8" x2="42" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#dd9933" />
                    <stop offset=".5" stopColor="#f8b81f" />
                    <stop offset="1" stopColor="#ff8a3d" />
                </linearGradient>
                <radialGradient id={`${id}r`} cx="50%" cy="50%" r="50%">
                    <stop stopColor="#f8b81f" stopOpacity=".35" />
                    <stop offset="1" stopColor="#f8b81f" stopOpacity="0" />
                </radialGradient>
            </defs>
            <circle cx="24" cy="24" r="23" fill={`url(#${id}r)`} />
            <g fill="none" stroke={g} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 8C18 6.5 13.5 8 12 11.5 8.5 12 6.5 15 7.5 18.5 5 20.5 4.8 24.5 7 27 5.8 30.5 7.5 34 11 35 12 38.5 15.5 40.5 19 39.5 20.5 41 22.5 41 23 40Z" />
                <path d="M25 8C30 6.5 34.5 8 36 11.5 39.5 12 41.5 15 40.5 18.5 43 20.5 43.2 24.5 41 27 42.2 30.5 40.5 34 37 35 36 38.5 32.5 40.5 29 39.5 27.5 41 25.5 41 25 40Z" />
            </g>
            <g fill="none" stroke={g} strokeWidth="1.5" strokeLinecap="round" opacity=".9">
                <path d="M12 11.5c2 1.6 4.6 1.6 6.2 0" />
                <path d="M7.5 18.5c2.6.5 4.5 2.6 4.5 5" />
                <path d="M17.5 16.5c-2.3 2.6-1.4 5.8 1.8 6.4" />
                <path d="M7 27c2.6-.5 5 .6 6 3" />
                <path d="M16.5 27.5c1.4 2.6 3.8 3.2 6 2.4" />
                <path d="M11 35c2-1.6 4.6-1.2 6 1" />
            </g>
            <g fill="none" stroke="#dd9933" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M25 14h4l2-2.2" />
                <path d="M25 19.5h8l3.2-3.4" />
                <path d="M25 25.5h7l3.4 3.4h2.4" />
                <path d="M25 32.5h3.5l3 3.2" />
            </g>
            <g fill="#ffc600">
                <circle cx="31.3" cy="11.5" r="1.4" />
                <circle cx="36.5" cy="15.8" r="1.4" />
                <circle cx="38.2" cy="28.9" r="1.4" />
                <circle cx="31.8" cy="35.8" r="1.4" />
            </g>
        </svg>
    );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
    return (
        <span className={cn('flex items-center gap-3', className)}>
            <LogoMark />
            {!compact && (
                <span className="leading-none">
                    <span className="block font-display text-[1.35rem] tracking-tight text-white">Bangladesh</span>
                    <span className="mt-1 block font-mono text-[0.6rem] tracking-[0.32em] text-ink-300 uppercase">
                        Headache Society
                    </span>
                </span>
            )}
        </span>
    );
}
