import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/cn';

/* ────────────────────────────────────────────────────────────────────────────
 * Procedural holographic brain: a point cloud sampled along cortical folds,
 * with a scanning plane, firing neural pulses and faint synaptic links.
 * No model files — the anatomy is generated at runtime.
 * ──────────────────────────────────────────────────────────────────────────── */

// Deterministic PRNG so the brain looks the same on every load.
function mulberry32(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Smooth interference field; its zero-crossings trace winding lines that read as sulci. */
const folds = (x: number, y: number, z: number) =>
    Math.sin(x * 6 + Math.sin(z * 4.2) * 2.0 + Math.sin(y * 3) * 0.8) * Math.sin(y * 6.8 + Math.sin(x * 4.5) * 1.7) +
    Math.sin(z * 7.5 + Math.sin(y * 3.8) * 2.4 + x * 1.5) * 0.7;

function buildBrain(count: number) {
    const rand = mulberry32(7);
    const positions: number[] = [];
    const normals: number[] = [];
    const tones: number[] = []; // 0..1 colour position (back → front)
    const ridges: number[] = []; // 1 on gyri, ~0 in sulci
    const sizes: number[] = [];

    const push = (p: [number, number, number], n: [number, number, number], tone: number, ridge: number, size: number) => {
        positions.push(...p);
        normals.push(...n);
        tones.push(tone);
        ridges.push(ridge);
        sizes.push(size);
    };

    const randomUnit = () => {
        const u = rand() * 2 - 1;
        const t = rand() * Math.PI * 2;
        const s = Math.sqrt(1 - u * u);
        return [s * Math.cos(t), u, s * Math.sin(t)] as const;
    };

    // Cerebral hemispheres
    let placed = 0;
    const cortex = Math.floor(count * 0.82);
    while (placed < cortex) {
        const side = rand() < 0.5 ? -1 : 1;
        let [ux, uy, uz] = randomUnit();
        const lateral = ux * side; // > 0 on the outer surface
        if (lateral < 0) ux *= 0.42; // flat medial wall → longitudinal fissure
        if (uy < -0.35) uy = -0.35 + (uy + 0.35) * 0.45; // flatter base
        const frontBulge = uz > 0 ? 1.04 : 1;
        let x = side * 0.27 + ux * 0.58;
        let y = 0.08 + uy * 0.66;
        let z = uz * 0.98 * frontBulge;
        if (uy < 0 && Math.abs(uz) < 0.5) y -= 0.08 * (1 - Math.abs(uz) * 2); // temporal lobe droop

        // Anatomical landmarks on the outer surface
        let landmark = 0;
        if (lateral > 0.25) {
            const sylvian = -0.12 + (0.45 - z) * 0.32; // lateral fissure, rising towards the back
            if (z > -0.45 && z < 0.55) landmark = Math.max(landmark, 1 - Math.abs(y - sylvian) / 0.06);
        }
        if (y > 0.05) {
            const central = -0.04 + (0.74 - y) * 0.36; // central sulcus, running down and forward
            landmark = Math.max(landmark, 1 - Math.abs(z - central) / 0.045);
        }
        if (landmark > 0.45 && rand() < 0.92) continue; // open the fissures

        const f = folds(x, y, z);
        const sulcus = 1 - Math.min(1, Math.abs(f) / 0.3);
        if (sulcus > 0.3 && rand() < 0.9) continue; // thin the grooves so gyri stand out
        const d = 1 - sulcus * 0.05 + Math.min(1, Math.abs(f)) * 0.03;
        x = side * 0.27 + (x - side * 0.27) * d;
        y = 0.08 + (y - 0.08) * d;
        z *= d;

        const ridge = Math.max(0.12, 1 - sulcus * 0.9 - Math.max(0, landmark) * 0.6);
        push([x, y, z], [ux, uy, uz], (z + 1) / 2, ridge, 0.6 + rand() * 0.55);
        placed++;
    }

    // Cerebellum (finely striated)
    const cere = Math.floor(count * 0.12);
    for (let i = 0; i < cere; ) {
        const [ux, uy, uz] = randomUnit();
        const y = -0.5 + uy * 0.24;
        const band = Math.abs(Math.sin(y * 75));
        if (rand() > 0.25 + 0.75 * band) continue;
        push([ux * 0.5, y, -0.7 + uz * 0.32], [ux, uy, uz], 0.95, 0.3 + band * 0.7, 0.4 + rand() * 0.4);
        i++;
    }

    // Brain stem
    const stem = count - placed - cere;
    for (let i = 0; i < stem; i++) {
        const t = rand();
        const a = rand() * Math.PI * 2;
        const r = 0.13 - t * 0.03;
        push([Math.cos(a) * r, -0.32 - t * 0.78, -0.32 - t * 0.12 + Math.sin(a) * r * 0.8], [Math.cos(a), 0, Math.sin(a)], 0.2, 0.7, 0.4 + rand() * 0.4);
    }

    const f32 = (a: number[]) => new Float32Array(a);
    return { positions: f32(positions), normals: f32(normals), tones: f32(tones), ridges: f32(ridges), sizes: f32(sizes) };
}

function buildSynapses(positions: Float32Array, links: number) {
    const rand = mulberry32(11);
    const n = positions.length / 3;
    const out: number[] = [];
    let tries = 0;
    while (out.length / 6 < links && tries < links * 40) {
        tries++;
        const a = Math.floor(rand() * n);
        const b = Math.floor(rand() * n);
        const dx = positions[a * 3] - positions[b * 3];
        const dy = positions[a * 3 + 1] - positions[b * 3 + 1];
        const dz = positions[a * 3 + 2] - positions[b * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d > 0.05 && d < 0.22) out.push(...positions.subarray(a * 3, a * 3 + 3), ...positions.subarray(b * 3, b * 3 + 3));
    }
    return new Float32Array(out);
}

const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uScanY;
    uniform float uPixelRatio;
    uniform vec3 uPulses[4];
    attribute vec3 aNormal;
    attribute float aTone;
    attribute float aRidge;
    attribute float aSize;
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
        vec3 cyan = vec3(0.21, 0.89, 0.95);
        vec3 iris = vec3(0.55, 0.48, 1.0);
        vec3 aura = vec3(0.94, 0.39, 0.77);
        vec3 base = aTone < 0.5 ? mix(aura, iris, aTone * 2.0) : mix(iris, cyan, (aTone - 0.5) * 2.0);

        vec4 mv = modelViewMatrix * vec4(position, 1.0);

        // rim light: surfaces seen edge-on glow, giving a crisp silhouette
        vec3 n = normalize(normalMatrix * aNormal);
        float rim = pow(1.0 - abs(dot(n, normalize(-mv.xyz))), 2.2);

        // neural pulses expanding from firing sites
        float fire = 0.0;
        for (int i = 0; i < 4; i++) {
            float age = fract(uTime * 0.3 + float(i) * 0.25);
            float ring = 1.0 - smoothstep(0.0, 0.05, abs(distance(position, uPulses[i]) - age * 1.3));
            fire += ring * (1.0 - age);
        }

        float scan = 1.0 - smoothstep(0.0, 0.025, abs(position.y - uScanY));
        float shimmer = 0.9 + 0.1 * sin(uTime * 2.0 + position.x * 12.0 + position.z * 9.0);

        float ridge = aRidge * aRidge;
        float light = (0.12 + ridge * 0.95 + rim * 0.8) * shimmer;
        vColor = base * light + vec3(1.0) * (rim * aRidge * 0.22 + fire * 0.7) + cyan * scan * 0.7;
        vAlpha = clamp(0.15 + ridge * 0.75 + rim * 0.5 + fire * 0.5 + scan * 0.35, 0.0, 1.0);

        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPixelRatio * (1.0 + fire * 1.2 + scan * 0.6) * (7.5 / -mv.z);
    }
`;

const fragmentShader = /* glsl */ `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float glow = pow(1.0 - d * 2.0, 1.8);
        gl_FragColor = vec4(vColor, glow * vAlpha);
    }
`;

export default function NeuralBrain({ className }: { className?: string }) {
    const mount = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = mount.current!;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const small = window.innerWidth < 768;

        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
        const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
        renderer.setPixelRatio(pixelRatio);
        renderer.setClearColor(0x000000, 0);
        el.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
        camera.position.set(0, 0.1, 4.9);

        const brain = new THREE.Group();
        brain.rotation.set(0.18, -1.2, 0);
        scene.add(brain);

        // Points
        const { positions, normals, tones, ridges, sizes } = buildBrain(small ? 20000 : 44000);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aNormal', new THREE.BufferAttribute(normals, 3));
        geometry.setAttribute('aTone', new THREE.BufferAttribute(tones, 1));
        geometry.setAttribute('aRidge', new THREE.BufferAttribute(ridges, 1));
        geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        geometry.center();

        const pulseSites = Array.from({ length: 4 }, (_, i) => {
            const idx = Math.floor(((i * 0.23 + 0.11) % 1) * (positions.length / 3));
            return new THREE.Vector3().fromArray(geometry.attributes.position.array as Float32Array, idx * 3);
        });

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uTime: { value: 0 },
                uScanY: { value: 0 },
                uPixelRatio: { value: pixelRatio },
                uPulses: { value: pulseSites },
            },
        });
        const points = new THREE.Points(geometry, material);
        brain.add(points);

        // Synapses
        const centered = geometry.attributes.position.array as Float32Array;
        const linkGeo = new THREE.BufferGeometry();
        linkGeo.setAttribute('position', new THREE.BufferAttribute(buildSynapses(centered, small ? 300 : 700), 3));
        const linkMat = new THREE.LineBasicMaterial({ color: 0x8b7bff, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending, depthWrite: false });
        brain.add(new THREE.LineSegments(linkGeo, linkMat));

        // Scanner ring
        const ringGeo = new THREE.RingGeometry(1.1, 1.108, 160);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x36e3f2, transparent: true, opacity: 0.35, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        brain.add(ring);

        // Orbiting halo of particles
        const haloCount = 600;
        const halo = new Float32Array(haloCount * 3);
        const hr = mulberry32(3);
        for (let i = 0; i < haloCount; i++) {
            const a = hr() * Math.PI * 2;
            const r = 1.45 + hr() * 0.35;
            halo[i * 3] = Math.cos(a) * r;
            halo[i * 3 + 1] = (hr() - 0.5) * 0.12;
            halo[i * 3 + 2] = Math.sin(a) * r;
        }
        const haloGeo = new THREE.BufferGeometry();
        haloGeo.setAttribute('position', new THREE.BufferAttribute(halo, 3));
        const haloMat = new THREE.PointsMaterial({ color: 0xe9c784, size: 0.012, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false });
        const haloPts = new THREE.Points(haloGeo, haloMat);
        haloPts.rotation.set(0.35, 0, 0.18);
        scene.add(haloPts);

        // Sizing
        const resize = () => {
            const { clientWidth: w, clientHeight: h } = el;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        // Interaction
        const target = { x: 0, y: 0 };
        const onMove = (e: PointerEvent) => {
            target.x = (e.clientX / window.innerWidth - 0.5) * 0.9;
            target.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
        };
        window.addEventListener('pointermove', onMove, { passive: true });

        // Loop
        let raf = 0;
        let visible = true;
        const clock = new THREE.Clock();
        let spin = -1.2;
        const tick = () => {
            const t = clock.getElapsedTime();
            if (!reduced) {
                spin += 0.0018;
                material.uniforms.uTime.value = t;
                const scanY = Math.sin(t * 0.7) * 0.75;
                material.uniforms.uScanY.value = scanY;
                ring.position.y = scanY;
                ringMat.opacity = 0.08 + (1 - Math.abs(scanY) / 0.75) * 0.14;
                haloPts.rotation.y = t * 0.08;
                // re-seed a pulse site periodically
                const slot = Math.floor(t * 0.35 * 4) % 4;
                if (Math.random() < 0.02) {
                    const idx = Math.floor(Math.random() * (centered.length / 3));
                    pulseSites[slot].fromArray(centered, idx * 3);
                }
            }
            brain.rotation.y += (spin + target.x - brain.rotation.y) * 0.05;
            brain.rotation.x += (0.18 + target.y - brain.rotation.x) * 0.05;
            brain.position.y = Math.sin(t * 0.8) * 0.04;
            renderer.render(scene, camera);
            if (visible) raf = requestAnimationFrame(tick);
        };
        const io = new IntersectionObserver(([entry]) => {
            const was = visible;
            visible = entry.isIntersecting;
            if (visible && !was) raf = requestAnimationFrame(tick);
        });
        io.observe(el);
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            window.removeEventListener('pointermove', onMove);
            [geometry, linkGeo, ringGeo, haloGeo].forEach((g) => g.dispose());
            [material, linkMat, ringMat, haloMat].forEach((m) => m.dispose());
            renderer.dispose();
            el.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mount} className={cn('absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full', className)} aria-hidden />;
}
