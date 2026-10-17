import { BadgeCheck, ClipboardList, FileUp, ShieldCheck } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { CountUp, Reveal, SpotlightCard } from '@/components/fx/motion';
import { MembershipCategories } from '@/components/sections/shared';
import { Button, PageHero, PaperSection, SectionHeading } from '@/components/ui';
import { eligibility, site } from '@/data/site';

const steps = [
    { Icon: ClipboardList, title: 'Fill the form', text: 'Share your personal details, BMDC registration and current position.' },
    { Icon: FileUp, title: 'Upload CV & photo', text: 'Attach your CV, a short biography and a recent photograph.' },
    { Icon: ShieldCheck, title: 'EC review', text: 'The Executive Committee reviews and approves your application.' },
    { Icon: BadgeCheck, title: 'Welcome aboard', text: 'Your profile joins the doctor directory and member programmes.' },
];

export default function Membership() {
    return (
        <>
            <Seo title="Membership" />
            <PageHero eyebrow="Membership" title="Belong to a" accent="growing movement." text="Membership is open to eligible medical professionals with an interest in headache medicine.">
                <div className="mt-10 flex flex-wrap items-center gap-8">
                    <Button to="/membership/apply" size="lg">
                        Apply online
                    </Button>
                    <div>
                        <div className="font-display text-5xl text-white">
                            <CountUp to={site.members} />
                        </div>
                        <div className="eyebrow">Members and counting</div>
                    </div>
                </div>
            </PageHero>

            <section className="py-16 sm:py-24">
                <div className="container-x">
                    <SectionHeading eyebrow="Categories" title="Choose your" accent="membership." />
                    <div className="mt-14">
                        <MembershipCategories compact />
                    </div>
                </div>
            </section>

            <PaperSection className="py-16 sm:py-24">
                <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
                    <SectionHeading eyebrow="Eligibility" title="Who can" accent="join?" text="Membership is open according to category, as defined by the Society." />
                    <ul className="space-y-4">
                        {eligibility.map((e, i) => (
                            <Reveal as="li" key={e} delay={i * 0.08}>
                                <SpotlightCard className="flex gap-5 p-6">
                                    <span className="font-display text-4xl text-white/20 italic">0{i + 1}</span>
                                    <p className="self-center text-lg text-ink-100">{e}</p>
                                </SpotlightCard>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </PaperSection>

            <section className="py-16 sm:py-24">
                <div className="container-x">
                    <SectionHeading align="center" eyebrow="How it works" title="Four steps to" accent="membership." />
                    <div className="relative mt-16 grid gap-5 md:grid-cols-4">
                        <div className="absolute top-10 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-synapse via-iris to-aura md:block" />
                        {steps.map(({ Icon, title, text }, i) => (
                            <Reveal key={title} delay={i * 0.1} className="relative text-center">
                                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ink-950 ring-1 ring-white/15">
                                    <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-synapse/25 to-aura/25">
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <span className="mt-5 block font-mono text-xs text-synapse">STEP 0{i + 1}</span>
                                <h3 className="mt-2 font-display text-2xl text-white">{title}</h3>
                                <p className="mt-2 text-sm text-ink-300">{text}</p>
                            </Reveal>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <Button to="/membership/apply" size="lg">
                            Start your application
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
