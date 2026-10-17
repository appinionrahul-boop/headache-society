import Lenis from 'lenis';

let instance: Lenis | null = null;

export function startLenis() {
    if (instance || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return instance;
    instance = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => {
        instance?.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return instance;
}

export function scrollToTop(immediate = true) {
    if (instance) instance.scrollTo(0, { immediate });
    else window.scrollTo({ top: 0 });
}
