import { Seo } from '@/components/Seo';
import { NeuralCanvas } from '@/components/fx/NeuralCanvas';
import { Button, Orbits } from '@/components/ui';

export default function NotFound() {
    return (
        <section className="relative grid min-h-screen place-items-center overflow-hidden px-4 text-center">
            <Seo title="Page not found" />
            <NeuralCanvas density={0.6} className="opacity-60" />
            <Orbits className="top-1/2 left-1/2 w-[700px] -translate-x-1/2 -translate-y-1/2" />
            <div className="relative">
                <p className="font-display text-[9rem] leading-none text-aurora italic sm:text-[14rem]">404</p>
                <p className="mt-2 font-display text-3xl text-white">This pathway leads nowhere.</p>
                <p className="mt-3 text-ink-300">The page you’re looking for has moved or never existed.</p>
                <Button to="/" className="mt-10">
                    Return home
                </Button>
            </div>
        </section>
    );
}
