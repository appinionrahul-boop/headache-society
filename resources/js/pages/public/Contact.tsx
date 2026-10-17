import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Seo } from '@/components/Seo';
import { Reveal, SpotlightCard } from '@/components/fx/motion';
import { Button, PageHero, PaperSection } from '@/components/ui';
import { site } from '@/data/site';

export default function Contact() {
    const [sending, setSending] = useState(false);
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setSending(true);
        await new Promise((r) => setTimeout(r, 900)); // will POST to /api/v1/contact
        setSending(false);
        form.reset();
        toast.success('Message sent — we’ll be in touch soon.');
    };

    return (
        <>
            <Seo title="Contact" />
            <PageHero eyebrow="Contact" title="Let’s" accent="talk." text="Questions about membership, programmes or partnerships? Reach out to the Society secretariat." />
            <PaperSection className="py-20 sm:py-28">
                <div className="container-x grid gap-6 lg:grid-cols-[1fr_1.3fr]">
                    <div className="space-y-5">
                        {[
                            { Icon: MapPin, k: 'Office', v: site.address },
                            { Icon: Mail, k: 'Email', v: site.email },
                            { Icon: Phone, k: 'Phone', v: site.phone },
                        ].map(({ Icon, k, v }, i) => (
                            <Reveal key={k} delay={i * 0.08}>
                                <SpotlightCard className="flex gap-5 p-6">
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-synapse/20 to-iris/20 text-white">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <span>
                                        <span className="eyebrow block">{k}</span>
                                        <span className="mt-1 block text-ink-100">{v}</span>
                                    </span>
                                </SpotlightCard>
                            </Reveal>
                        ))}
                        <Reveal delay={0.3} className="overflow-hidden rounded-3xl ring-1 ring-white/10">
                            <iframe
                                title="Map"
                                src="https://www.google.com/maps?q=National+Institute+of+Neurosciences+and+Hospital+Dhaka&output=embed"
                                className="h-72 w-full"
                                loading="lazy"
                            />
                        </Reveal>
                    </div>

                    <Reveal delay={0.1}>
                        <form onSubmit={submit} className="ring-aurora grid gap-5 rounded-[2rem] bg-ink-900/60 p-8 sm:grid-cols-2 sm:p-10">
                            <h2 className="font-display text-4xl text-white sm:col-span-2">Send a message</h2>
                            <input required name="name" placeholder="Your name" className="input-lux" />
                            <input required name="email" type="email" placeholder="Email address" className="input-lux" />
                            <select name="topic" className="input-lux sm:col-span-2" defaultValue="Membership">
                                {['Membership', 'Events & CME', 'Partnership', 'Media', 'Other'].map((t) => (
                                    <option key={t} className="bg-ink-900">
                                        {t}
                                    </option>
                                ))}
                            </select>
                            <textarea required name="message" rows={6} placeholder="How can we help?" className="input-lux resize-none sm:col-span-2" />
                            <div className="sm:col-span-2">
                                <Button type="submit" disabled={sending} icon={false} size="lg">
                                    <span className="flex items-center gap-2">
                                        <Send className="h-4 w-4" /> {sending ? 'Sending…' : 'Send message'}
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </Reveal>
                </div>
            </PaperSection>
        </>
    );
}
