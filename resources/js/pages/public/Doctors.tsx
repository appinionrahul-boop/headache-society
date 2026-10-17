import { AnimatePresence, motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Seo } from '@/components/Seo';
import { DoctorCard } from '@/components/sections/shared';
import { PageHero, PaperSection } from '@/components/ui';
import { doctors, type Doctor } from '@/data/people';

const groups: { value: Doctor['group'] | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'officer', label: 'Office bearers' },
    { value: 'member', label: 'Executive members' },
    { value: 'advisor', label: 'Advisors' },
];

export default function Doctors() {
    const [q, setQ] = useState('');
    const [group, setGroup] = useState<Doctor['group'] | 'all'>('all');

    const list = useMemo(() => {
        const term = q.toLowerCase();
        return doctors.filter((d) => (group === 'all' || d.group === group) && [d.name, d.ecPosition ?? '', d.designation ?? '', d.institution ?? ''].some((f) => f.toLowerCase().includes(term)));
    }, [q, group]);

    return (
        <>
            <Seo title="Doctor Directory" />
            <PageHero eyebrow="Doctor directory" title="Find a" accent="headache specialist." text="Browse participating doctors — their designations, institutions, biographies and CVs." />

            <PaperSection className="py-20 sm:py-28">
                <div className="container-x">
                    <div className="glass sticky top-3 z-30 grid gap-3 rounded-3xl !bg-ink-950/85 p-3 sm:grid-cols-[1fr_240px]">
                        <label className="relative">
                            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-400" />
                            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or role" className="input-lux !rounded-2xl pl-11" />
                        </label>
                        <select value={group} onChange={(e) => setGroup(e.target.value as Doctor['group'] | 'all')} className="input-lux !rounded-2xl" aria-label="Group">
                            {groups.map((g) => (
                                <option key={g.value} value={g.value} className="bg-ink-900">
                                    {g.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <p className="mt-8 eyebrow">{list.length} doctors</p>
                    <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AnimatePresence mode="popLayout">
                            {list.map((d, i) => (
                                <motion.div key={d.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
                                    <DoctorCard doctor={d} index={i} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    {list.length === 0 && <p className="py-20 text-center text-ink-300">No doctors match your search.</p>}
                </div>
            </PaperSection>
        </>
    );
}
