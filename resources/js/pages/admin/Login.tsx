import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Seo } from '@/components/Seo';
import { Logo } from '@/components/brand/Logo';
import { NeuralCanvas } from '@/components/fx/NeuralCanvas';
import { Button, Orbits } from '@/components/ui';

/** Admin login screen. Authentication (Sanctum) is wired up in the backend phase. */
export default function Login() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 900));
        setLoading(false);
        toast.info('Admin panel is coming in the next phase.');
    };

    return (
        <div className="relative grid min-h-screen overflow-hidden lg:grid-cols-[1.1fr_1fr]">
            <Seo title="Admin Login" />
            {/* brand side */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#120f33] via-ink-950 to-ink-950 lg:block">
                <NeuralCanvas />
                <Orbits className="top-1/2 left-1/2 w-[760px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/30 blur-[120px]" />
                <div className="relative flex h-full flex-col justify-between p-12">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <div>
                        <h1 className="font-display text-6xl leading-[0.95] text-white xl:text-7xl">
                            Society <span className="text-aurora italic">control room.</span>
                        </h1>
                        <p className="mt-6 max-w-md text-ink-200">Manage CMEs, events, news, awareness programmes, media and member profiles — all in one place.</p>
                    </div>
                    <p className="flex items-center gap-2 text-sm text-ink-400">
                        <ShieldCheck className="h-4 w-4 text-synapse" /> Restricted to authorised administrators
                    </p>
                </div>
            </div>

            {/* form side */}
            <div className="relative grid place-items-center px-4 py-16">
                <div className="absolute inset-0 grid-lines lg:hidden" />
                <motion.form
                    onSubmit={submit}
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-md"
                >
                    <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> Back to website
                    </Link>
                    <div className="lg:hidden">
                        <Logo />
                    </div>
                    <h2 className="mt-8 font-display text-5xl text-white">Welcome back</h2>
                    <p className="mt-2 text-ink-300">Sign in to the BHS admin panel.</p>

                    <div className="mt-10 space-y-4">
                        <label className="relative block">
                            <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-400" />
                            <input required type="email" placeholder="admin@bdheadachesociety.org" className="input-lux pl-11" autoComplete="username" />
                        </label>
                        <label className="relative block">
                            <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-400" />
                            <input required type={show ? 'text' : 'password'} placeholder="Password" className="input-lux px-11" autoComplete="current-password" />
                            <button type="button" onClick={() => setShow(!show)} className="absolute top-1/2 right-4 -translate-y-1/2 text-ink-400 hover:text-white" aria-label="Toggle password">
                                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </label>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-ink-300">
                                <input type="checkbox" className="accent-synapse" /> Remember me
                            </label>
                            <a href="#" className="text-synapse">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <Button type="submit" size="lg" className="mt-8 w-full justify-center" disabled={loading}>
                        {loading ? 'Signing in…' : 'Sign in'}
                    </Button>
                </motion.form>
            </div>
        </div>
    );
}
