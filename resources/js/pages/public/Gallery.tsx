import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Seo } from '@/components/Seo';
import { PageHero, PaperSection, PlaceholderArt } from '@/components/ui';
import { albums, gallery } from '@/data/media';
import { cn } from '@/lib/cn';

export default function Gallery() {
    const [album, setAlbum] = useState('All');
    const [active, setActive] = useState<number | null>(null);
    const items = gallery.filter((g) => album === 'All' || g.album === album);
    const current = active !== null ? items[active] : null;

    useEffect(() => {
        if (active === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActive(null);
            if (e.key === 'ArrowRight') setActive((a) => (a === null ? a : (a + 1) % items.length));
            if (e.key === 'ArrowLeft') setActive((a) => (a === null ? a : (a - 1 + items.length) % items.length));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active, items.length]);

    return (
        <>
            <Seo title="Media Gallery" />
            <PageHero eyebrow="Media gallery" title="Moments that" accent="move medicine." text="Event photos, videos and media highlights from across the Society’s programmes." />

            <PaperSection className="py-20 sm:py-28">
                <div className="container-x">
                    <div className="glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
                        {albums.map((a) => (
                            <button key={a} onClick={() => setAlbum(a)} className={cn('relative shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors', album === a ? 'text-ink-950' : 'text-ink-200 hover:text-white')}>
                                {album === a && <motion.span layoutId="album" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                                <span className="relative">{a}</span>
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
                        <AnimatePresence mode="popLayout">
                            {items.map((g, i) => (
                                <motion.button
                                    layout
                                    key={g.id}
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.92 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => setActive(i)}
                                    className={cn('group relative overflow-hidden rounded-3xl text-left', g.span === 'tall' && 'row-span-2', g.span === 'wide' && 'col-span-2')}
                                >
                                    <motion.div layoutId={`media-${g.id}`} className="absolute inset-0">
                                        <PlaceholderArt hue={g.hue} seed={g.id} className="h-full w-full transition-transform duration-1000 ease-out-expo group-hover:scale-110" />
                                    </motion.div>
                                    {g.kind === 'video' && (
                                        <span className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full glass transition-transform duration-500 group-hover:scale-110">
                                            <Play className="h-6 w-6 fill-white text-white" />
                                        </span>
                                    )}
                                    <span className="absolute inset-x-5 bottom-5">
                                        <span className="eyebrow !text-[0.6rem] !text-white/60">{g.album}</span>
                                        <span className="mt-1 block font-display text-xl leading-tight text-white">{g.title}</span>
                                    </span>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    <p className="mt-8 text-center text-sm text-ink-400">Artwork shown is placeholder — real photos & videos are uploaded through the admin panel.</p>
                </div>
            </PaperSection>

            <AnimatePresence>
                {current && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] grid place-items-center bg-ink-950/90 p-4 backdrop-blur-xl" onClick={() => setActive(null)}>
                        <motion.div layoutId={`media-${current.id}`} className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
                            <PlaceholderArt hue={current.hue} seed={current.id} className="h-full w-full" />
                            {current.kind === 'video' && (
                                <span className="absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full glass">
                                    <Play className="h-8 w-8 fill-white text-white" />
                                </span>
                            )}
                            <div className="absolute inset-x-6 bottom-6">
                                <p className="eyebrow !text-white/60">{current.album}</p>
                                <p className="font-display text-3xl text-white">{current.title}</p>
                            </div>
                        </motion.div>
                        <button onClick={() => setActive(null)} className="absolute top-6 right-6 grid h-12 w-12 place-items-center rounded-full glass" aria-label="Close">
                            <X className="h-5 w-5" />
                        </button>
                        <button
                            onClick={(e) => (e.stopPropagation(), setActive(((active ?? 0) - 1 + items.length) % items.length))}
                            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full glass sm:left-8"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button onClick={(e) => (e.stopPropagation(), setActive(((active ?? 0) + 1) % items.length))} className="absolute right-4 grid h-12 w-12 place-items-center rounded-full glass sm:right-8" aria-label="Next">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
