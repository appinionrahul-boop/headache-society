import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number; phase: number };
type Pulse = { a: number; b: number; t: number; speed: number; color: string };

const COLORS = ['#36e3f2', '#8b7bff', '#f064c4', '#e9c784'];

/**
 * A living neural field: drifting neurons, synaptic links and signal pulses
 * that travel between them. Reacts to the cursor and pauses off-screen.
 */
export function NeuralCanvas({ className, density = 1 }: { className?: string; density?: number }) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current!;
        const ctx = canvas.getContext('2d')!;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let w = 0;
        let h = 0;
        let dpr = 1;
        let nodes: Node[] = [];
        let pulses: Pulse[] = [];
        let raf = 0;
        let visible = true;
        const mouse = { x: -9999, y: -9999, active: false };

        const linkDist = () => Math.min(170, Math.max(110, w / 9));

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.round(Math.min(150, (w * h) / 9000) * density);
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.6 + 0.6,
                hue: Math.floor(Math.random() * COLORS.length),
                phase: Math.random() * Math.PI * 2,
            }));
            pulses = [];
        };

        const spawnPulse = () => {
            const a = Math.floor(Math.random() * nodes.length);
            const na = nodes[a];
            if (!na) return;
            const d = linkDist();
            let best = -1;
            for (let i = 0; i < nodes.length; i++) {
                if (i === a) continue;
                const dx = nodes[i].x - na.x;
                const dy = nodes[i].y - na.y;
                const dist = Math.hypot(dx, dy);
                if (dist < d && dist > 30 && Math.random() > 0.4) {
                    best = i;
                    break;
                }
            }
            if (best >= 0) {
                pulses.push({ a, b: best, t: 0, speed: 0.008 + Math.random() * 0.014, color: COLORS[Math.floor(Math.random() * 3)] });
            }
        };

        let time = 0;
        const draw = () => {
            time += 0.016;
            ctx.clearRect(0, 0, w, h);
            const d = linkDist();

            for (const n of nodes) {
                if (!reduced) {
                    n.x += n.vx;
                    n.y += n.vy;
                }
                if (n.x < -20) n.x = w + 20;
                if (n.x > w + 20) n.x = -20;
                if (n.y < -20) n.y = h + 20;
                if (n.y > h + 20) n.y = -20;

                if (mouse.active) {
                    const dx = mouse.x - n.x;
                    const dy = mouse.y - n.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 220 && dist > 1) {
                        const f = (1 - dist / 220) * 0.6;
                        n.x += (dx / dist) * f;
                        n.y += (dy / dist) * f;
                    }
                }
            }

            // synaptic links
            ctx.lineWidth = 0.7;
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = dx * dx + dy * dy;
                    if (dist < d * d) {
                        const alpha = (1 - Math.sqrt(dist) / d) * 0.22;
                        ctx.strokeStyle = `rgba(139,123,255,${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            // links to cursor
            if (mouse.active) {
                for (const n of nodes) {
                    const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);
                    if (dist < 180) {
                        ctx.strokeStyle = `rgba(54,227,242,${(1 - dist / 180) * 0.45})`;
                        ctx.beginPath();
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(n.x, n.y);
                        ctx.stroke();
                    }
                }
            }

            // neurons
            for (const n of nodes) {
                const glow = 0.55 + Math.sin(time * 1.6 + n.phase) * 0.45;
                ctx.fillStyle = COLORS[n.hue];
                ctx.globalAlpha = 0.35 + glow * 0.55;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            // signal pulses
            if (!reduced && Math.random() < 0.18 && pulses.length < 40) spawnPulse();
            pulses = pulses.filter((p) => p.t <= 1);
            for (const p of pulses) {
                p.t += p.speed;
                const a = nodes[p.a];
                const b = nodes[p.b];
                if (!a || !b) continue;
                const x = a.x + (b.x - a.x) * p.t;
                const y = a.y + (b.y - a.y) * p.t;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, 10);
                grad.addColorStop(0, p.color);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(x, y, 1.4, 0, Math.PI * 2);
                ctx.fill();
            }

            if (visible) raf = requestAnimationFrame(draw);
        };

        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = mouse.y > 0 && mouse.y < rect.height;
        };
        const onLeave = () => (mouse.active = false);

        const io = new IntersectionObserver(([entry]) => {
            const was = visible;
            visible = entry.isIntersecting;
            if (visible && !was) raf = requestAnimationFrame(draw);
        });

        resize();
        io.observe(canvas);
        raf = requestAnimationFrame(draw);
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
        };
    }, [density]);

    return <canvas ref={ref} className={cn('absolute inset-0 h-full w-full', className)} aria-hidden />;
}
