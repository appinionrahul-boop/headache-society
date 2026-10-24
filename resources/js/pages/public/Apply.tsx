import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, Check, FileText, ImageUp, UploadCloud } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { Seo } from '@/components/Seo';
import { NeuralCanvas } from '@/components/fx/NeuralCanvas';
import { Button, Eyebrow } from '@/components/ui';
import { categorySlug } from '@/components/sections/shared';
import { membershipCategories } from '@/data/site';

const openCategories = membershipCategories.filter((c) => c.apply);
const categoryValues = openCategories.map((c) => categorySlug(c.name));
import { cn } from '@/lib/cn';

const fileList = z.custom<FileList>().refine((f) => f instanceof FileList && f.length > 0, 'Please attach a file');

const schema = z.object({
    name: z.string().min(3, 'Enter your full name'),
    email: z.string().email('Enter a valid email'),
    phone: z.string().min(10, 'Enter a valid phone number'),
    bmdc: z.string().min(3, 'BMDC registration number is required'),
    qualifications: z.string().min(2, 'List your qualifications'),
    designation: z.string().min(2, 'Enter your present designation'),
    institution: z.string().min(2, 'Enter your institution'),
    status: z.enum(['Practising', 'Postgraduate trainee', 'Academic', 'Other']),
    bio: z.string().min(40, 'Please write at least a few sentences (40+ characters)'),
    cv: fileList,
    photo: fileList,
    category: z.string().refine((v) => categoryValues.includes(v), 'Please choose a membership category'),
    agree: z.literal(true, { message: 'Please confirm the declaration' }),
});

type FormValues = z.infer<typeof schema>;

const steps: { title: string; fields: FieldPath<FormValues>[] }[] = [
    { title: 'Personal', fields: ['name', 'email', 'phone'] },
    { title: 'Professional', fields: ['bmdc', 'qualifications', 'designation', 'institution', 'status'] },
    { title: 'Biography & CV', fields: ['bio', 'cv', 'photo'] },
    { title: 'Membership', fields: ['category', 'agree'] },
];

export default function Apply() {
    const [params] = useSearchParams();
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [done, setDone] = useState(false);
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { category: categoryValues.includes(params.get('category') ?? '') ? params.get('category')! : categoryValues[0], status: 'Practising' },
        mode: 'onTouched',
    });

    const next = async () => {
        if (await trigger(steps[step].fields)) {
            setDir(1);
            setStep((s) => s + 1);
        }
    };
    const back = () => {
        setDir(-1);
        setStep((s) => s - 1);
    };
    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 1200)); // will POST to /api/v1/membership-applications
        setDone(true);
    };

    const cv = watch('cv');
    const photo = watch('photo');
    const category = watch('category');

    return (
        <>
            <Seo title="Apply for Membership" />
            <section className="relative min-h-screen overflow-hidden pt-36 pb-28 sm:pt-44">
                <NeuralCanvas density={0.4} className="opacity-40" />
                <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-iris/20 blur-[150px]" />
                <div className="relative container-x max-w-4xl">
                    <Eyebrow>Membership application</Eyebrow>
                    <h1 className="mt-5 font-display text-5xl leading-none text-white sm:text-7xl">
                        Join the <span className="text-aurora italic">Society.</span>
                    </h1>

                    <div className="ring-aurora relative mt-12 overflow-hidden rounded-[2rem] bg-ink-900/75 backdrop-blur-xl">
                        {done ? (
                            <Success />
                        ) : (
                            <>
                                {/* progress */}
                                <div className="grid grid-cols-4 border-b border-white/[0.07]">
                                    {steps.map((s, i) => (
                                        <div key={s.title} className="relative px-3 py-5 sm:px-6">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={cn(
                                                        'grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-500',
                                                        i < step ? 'bg-synapse text-ink-950' : i === step ? 'bg-white text-ink-950' : 'bg-white/5 text-ink-400',
                                                    )}
                                                >
                                                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                                                </span>
                                                <span className={cn('hidden text-sm sm:block', i <= step ? 'text-white' : 'text-ink-400')}>{s.title}</span>
                                            </div>
                                            {i === step && <motion.span layoutId="apply-step" className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-synapse to-iris" />}
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10" noValidate>
                                    <AnimatePresence mode="wait" custom={dir}>
                                        <motion.div
                                            key={step}
                                            custom={dir}
                                            initial={{ opacity: 0, x: dir * 40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: dir * -40 }}
                                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                            className="grid gap-5 sm:grid-cols-2"
                                        >
                                            {step === 0 && (
                                                <>
                                                    <Field label="Full name" error={errors.name?.message} full>
                                                        <input {...register('name')} className="input-lux" placeholder="Dr. Full Name" />
                                                    </Field>
                                                    <Field label="Email" error={errors.email?.message}>
                                                        <input {...register('email')} type="email" className="input-lux" placeholder="you@example.com" />
                                                    </Field>
                                                    <Field label="Mobile" error={errors.phone?.message}>
                                                        <input {...register('phone')} className="input-lux" placeholder="+880 1XXX-XXXXXX" />
                                                    </Field>
                                                </>
                                            )}
                                            {step === 1 && (
                                                <>
                                                    <Field label="BMDC registration no." error={errors.bmdc?.message}>
                                                        <input {...register('bmdc')} className="input-lux" placeholder="A-XXXXX" />
                                                    </Field>
                                                    <Field label="Qualifications" error={errors.qualifications?.message}>
                                                        <input {...register('qualifications')} className="input-lux" placeholder="MBBS, FCPS (Medicine), MD (Neurology)" />
                                                    </Field>
                                                    <Field label="Present designation" error={errors.designation?.message}>
                                                        <input {...register('designation')} className="input-lux" placeholder="Assistant Professor, Neurology" />
                                                    </Field>
                                                    <Field label="Institution" error={errors.institution?.message}>
                                                        <input {...register('institution')} className="input-lux" placeholder="Hospital / Medical College" />
                                                    </Field>
                                                    <Field label="Current status" error={errors.status?.message} full>
                                                        <div className="flex flex-wrap gap-2">
                                                            {(['Practising', 'Postgraduate trainee', 'Academic', 'Other'] as const).map((s) => (
                                                                <label key={s} className="cursor-pointer">
                                                                    <input type="radio" value={s} {...register('status')} className="peer sr-only" />
                                                                    <span className="block rounded-full border border-white/10 px-4 py-2 text-sm text-ink-200 transition-all peer-checked:border-synapse peer-checked:bg-synapse/10 peer-checked:text-white">
                                                                        {s}
                                                                    </span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </Field>
                                                </>
                                            )}
                                            {step === 2 && (
                                                <>
                                                    <Field label="Short biography" error={errors.bio?.message} full>
                                                        <textarea {...register('bio')} rows={5} className="input-lux resize-none" placeholder="Your clinical background, interests in headache medicine and research…" />
                                                    </Field>
                                                    <Field label="Curriculum vitae (PDF/DOC)" error={errors.cv?.message as string | undefined}>
                                                        <Dropzone icon={<FileText className="h-6 w-6" />} file={cv?.[0]?.name} hint="PDF or DOC, up to 5 MB">
                                                            <input type="file" accept=".pdf,.doc,.docx" {...register('cv')} className="absolute inset-0 cursor-pointer opacity-0" />
                                                        </Dropzone>
                                                    </Field>
                                                    <Field label="Recent photograph" error={errors.photo?.message as string | undefined}>
                                                        <Dropzone icon={<ImageUp className="h-6 w-6" />} file={photo?.[0]?.name} hint="JPG or PNG, square preferred">
                                                            <input type="file" accept="image/*" {...register('photo')} className="absolute inset-0 cursor-pointer opacity-0" />
                                                        </Dropzone>
                                                    </Field>
                                                </>
                                            )}
                                            {step === 3 && (
                                                <>
                                                    {openCategories.map((p) => {
                                                        const value = categorySlug(p.name);
                                                        return (
                                                            <label key={p.name} className="cursor-pointer">
                                                                <input type="radio" value={value} {...register('category')} className="peer sr-only" />
                                                                <div className={cn('relative h-full rounded-3xl border p-6 transition-all duration-500', category === value ? 'border-synapse bg-synapse/[0.07] shadow-[0_0_40px_-10px_#dd9933]' : 'border-white/10 hover:border-white/25')}>
                                                                    {category === value && (
                                                                        <span className="absolute top-5 right-5 grid h-6 w-6 place-items-center rounded-full bg-synapse text-ink-950">
                                                                            <Check className="h-3.5 w-3.5" />
                                                                        </span>
                                                                    )}
                                                                    <p className="eyebrow">Category</p>
                                                                    <p className="mt-3 font-display text-3xl text-white">{p.name}</p>
                                                                    <p className="mt-2 pr-8 text-sm text-ink-300">{p.text}</p>
                                                                </div>
                                                            </label>
                                                        );
                                                    })}
                                                    <Field error={errors.agree?.message} full>
                                                        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-200">
                                                            <input type="checkbox" {...register('agree')} className="mt-0.5 h-5 w-5 accent-synapse" />I confirm the information provided is accurate and agree to abide by the rules of the Bangladesh Headache Society.
                                                        </label>
                                                    </Field>
                                                </>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="mt-10 flex items-center justify-between border-t border-white/[0.07] pt-6">
                                        {step > 0 ? (
                                            <button type="button" onClick={back} className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
                                                <ArrowLeft className="h-4 w-4" /> Back
                                            </button>
                                        ) : (
                                            <span className="font-mono text-xs text-ink-400">Step 1 of 4</span>
                                        )}
                                        {step < steps.length - 1 ? (
                                            <Button type="button" onClick={next}>
                                                Continue
                                            </Button>
                                        ) : (
                                            <Button type="submit" disabled={isSubmitting} variant="gold">
                                                {isSubmitting ? 'Submitting…' : 'Submit application'}
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

function Field({ label, error, full, children }: { label?: string; error?: string; full?: boolean; children: ReactNode }) {
    return (
        <div className={cn(full && 'sm:col-span-2')}>
            {label && <label className="mb-2 block text-sm font-medium text-ink-100">{label}</label>}
            {children}
            <AnimatePresence>
                {error && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-aura">
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

function Dropzone({ icon, file, hint, children }: { icon: ReactNode; file?: string; hint: string; children: ReactNode }) {
    return (
        <div className={cn('relative flex items-center gap-4 rounded-2xl border border-dashed p-5 transition-colors', file ? 'border-synapse/60 bg-synapse/[0.06]' : 'border-white/15 hover:border-white/30 hover:bg-white/[0.03]')}>
            <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl', file ? 'bg-synapse text-ink-950' : 'bg-white/5 text-ink-200')}>{file ? <Check className="h-6 w-6" /> : icon}</span>
            <span className="min-w-0">
                <span className="block truncate text-sm text-white">{file ?? 'Click or drop to upload'}</span>
                <span className="text-xs text-ink-400">{file ? 'Ready to upload' : hint}</span>
            </span>
            <UploadCloud className="ml-auto h-5 w-5 shrink-0 text-ink-400" />
            {children}
        </div>
    );
}

function Success() {
    return (
        <div className="relative px-6 py-20 text-center sm:py-28">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }} className="relative mx-auto grid h-28 w-28 place-items-center">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-synapse/40" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-synapse to-iris" />
                <svg viewBox="0 0 24 24" className="relative h-12 w-12 text-ink-950">
                    <motion.path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.6 }} />
                </svg>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="mt-10 font-display text-5xl text-white">Application received</h2>
                <p className="mx-auto mt-4 max-w-md text-ink-200">Thank you. The Executive Committee will review your application and contact you by email with the next steps.</p>
                <Button to="/" variant="ghost" className="mt-10">
                    Back to home
                </Button>
            </motion.div>
        </div>
    );
}
