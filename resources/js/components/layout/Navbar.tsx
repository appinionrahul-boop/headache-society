import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui';
import { cn } from '@/lib/cn';
import { site } from '@/data/site';

export const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/committee', label: 'Committee' },
    { to: '/events', label: 'Events' },
    { to: '/gallery', label: 'Media' },
    { to: '/membership', label: 'Membership' },
];

const mobileLinks = [{ to: '/', label: 'Home' }, ...navLinks, { to: '/news', label: 'News' }, { to: '/contact', label: 'Contact' }];

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useMotionValueEvent(scrollY, 'change', (y) => {
        const prev = scrollY.getPrevious() ?? 0;
        setHidden(y > prev && y > 240);
        setScrolled(y > 30);
    });

    useEffect(() => setOpen(false), [location.pathname]);
    useEffect(() => {
        document.documentElement.style.overflow = open ? 'hidden' : '';
    }, [open]);

    return (
        <>
            <motion.header
                animate={{ y: hidden && !open ? -120 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-x-0 top-0 z-50 pt-4"
            >
                <div className="container-x">
                    <div
                        className={cn(
                            'flex items-center justify-between rounded-full py-2 pr-2 pl-4 transition-all duration-700',
                            scrolled ? 'glass !bg-ink-950/80 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]' : 'border border-transparent',
                        )}
                    >
                        <Link to="/" aria-label={`${site.name} home`}>
                            <Logo />
                        </Link>

                        <nav className="hidden items-center gap-1 lg:flex">
                            {navLinks.map((l) => (
                                <NavLink key={l.to} to={l.to} className="relative rounded-full px-4 py-2 text-sm font-medium text-ink-200 transition-colors hover:text-white">
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                                            )}
                                            <span className={cn('relative', isActive && 'text-white')}>{l.label}</span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <Link to="/contact" className="hidden rounded-full px-4 py-2 text-sm text-ink-200 hover:text-white xl:block">
                                Contact
                            </Link>
                            <Button to="/membership/apply" className="hidden sm:inline-flex">
                                Join BHS
                            </Button>
                            <button
                                onClick={() => setOpen((o) => !o)}
                                className="grid h-11 w-11 place-items-center rounded-full glass text-white lg:hidden"
                                aria-label={open ? 'Close menu' : 'Open menu'}
                                aria-expanded={open}
                            >
                                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at 92% 4%)' }}
                        animate={{ clipPath: 'circle(150% at 92% 4%)' }}
                        exit={{ clipPath: 'circle(0% at 92% 4%)' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-40 overflow-y-auto bg-ink-950/95 backdrop-blur-xl lg:hidden"
                    >
                        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-iris/30 blur-[120px]" />
                        <nav className="relative container-x flex min-h-full flex-col justify-center gap-1 py-28">
                            {mobileLinks.map((l, i) => (
                                <motion.div key={l.to} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                    <NavLink
                                        to={l.to}
                                        end={l.to === '/'}
                                        className={({ isActive }) => cn('flex items-baseline gap-4 py-1.5 font-display text-4xl sm:text-5xl', isActive ? 'text-aurora italic' : 'text-white/85')}
                                    >
                                        <span className="w-6 font-mono text-xs text-ink-400">{String(i + 1).padStart(2, '0')}</span>
                                        {l.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-10">
                                <Button to="/membership/apply" size="lg">
                                    Become a member
                                </Button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
