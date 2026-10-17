import { AnimatePresence, motion } from 'motion/react';
import { cloneElement, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { CursorAura, ScrollProgress } from '@/components/fx/motion';
import { scrollToTop, startLenis } from '@/lib/lenis';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

/** Curtain that sweeps across the screen between pages. */
function Curtain() {
    return (
        <>
            <motion.div
                className="pointer-events-none fixed inset-0 z-[80] origin-bottom bg-gradient-to-t from-iris-deep via-ink-900 to-ink-950"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
                className="pointer-events-none fixed inset-0 z-[80] origin-top bg-ink-950"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />
        </>
    );
}

export function PublicLayout() {
    const location = useLocation();
    const outlet = useOutlet();

    useEffect(() => {
        startLenis();
    }, []);

    useEffect(() => {
        if (!location.hash) return;
        const t = setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' }), 900);
        return () => clearTimeout(t);
    }, [location.hash, location.pathname]);

    return (
        <div className="relative min-h-screen">
            <ScrollProgress />
            <CursorAura />
            <div className="grain" aria-hidden />
            <Navbar />
            <AnimatePresence mode="wait" onExitComplete={() => scrollToTop()}>
                <motion.main key={location.pathname} className="relative z-10">
                    <Curtain />
                    {outlet && cloneElement(outlet, { key: location.pathname })}
                </motion.main>
            </AnimatePresence>
            <Footer />
        </div>
    );
}
