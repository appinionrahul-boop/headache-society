import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Facebook, Linkedin, Youtube } from '@/components/brand/Social';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { LogoMark } from '@/components/brand/Logo';
import { Marquee } from '@/components/fx/motion';
import { site } from '@/data/site';

const columns = [
    {
        title: 'Society',
        links: [
            { to: '/about', label: 'About BHS' },
            { to: '/about#mission', label: 'Mission & Vision' },
            { to: '/about#governance', label: 'Governance' },
            { to: '/committee', label: 'Executive Committee' },
        ],
    },
    {
        title: 'Programmes',
        links: [
            { to: '/events', label: 'Events & CME' },
            { to: '/events?view=calendar', label: 'Annual Calendar' },
            { to: '/gallery', label: 'Media Gallery' },
            { to: '/news', label: 'News' },
        ],
    },
    {
        title: 'Members',
        links: [
            { to: '/membership', label: 'Membership' },
            { to: '/membership/apply', label: 'Apply Online' },
            { to: '/admin/login', label: 'Admin Login' },
        ],
    },
];

export function Footer() {
    return (
        <footer className="theme-navy relative overflow-hidden border-t border-white/[0.06] bg-ink-950 pt-20">
            <div className="absolute bottom-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 translate-y-1/2 rounded-full bg-iris/15 blur-[140px]" />

            <div className="relative container-x">
                <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <LogoMark className="h-12 w-12" />
                            <span className="font-display text-2xl text-white">{site.name}</span>
                        </div>
                        <p className="mt-6 max-w-sm leading-relaxed text-ink-300">
                            Affiliate Member Society of the International Headache Society, representing Bangladesh. Advancing education, research and evidence-based headache care since {site.founded}.
                        </p>
                        <ul className="mt-8 space-y-3 text-sm text-ink-200">
                            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-synapse" />{site.address}</li>
                            <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-synapse" />{site.email}</li>
                            <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-synapse" />{site.phone}</li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                        {columns.map((c) => (
                            <div key={c.title}>
                                <h4 className="eyebrow">{c.title}</h4>
                                <ul className="mt-5 space-y-3">
                                    {c.links.map((l) => (
                                        <li key={l.to}>
                                            <Link to={l.to} className="group inline-flex items-center gap-1 text-ink-100 transition-colors hover:text-white">
                                                <span className="bg-gradient-to-r from-synapse to-iris bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                                                    {l.label}
                                                </span>
                                                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Marquee className="relative mt-20 select-none">
                <span className="flex items-center gap-12 font-display text-[18vw] leading-none whitespace-nowrap text-white/[0.04] lg:text-[12rem]">
                    Bangladesh Headache Society <span className="text-aurora opacity-30">✦</span>
                </span>
            </Marquee>

            <div className="relative container-x flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] py-8 text-sm text-ink-400 sm:flex-row">
                <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
                <div className="flex gap-2">
                    {[
                        { href: site.socials.facebook, Icon: Facebook, label: 'Facebook' },
                        { href: site.socials.youtube, Icon: Youtube, label: 'YouTube' },
                        { href: site.socials.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                    ].map(({ href, Icon, label }) => (
                        <motion.a key={label} href={href} aria-label={label} whileHover={{ y: -3 }} className="grid h-10 w-10 place-items-center rounded-full glass text-ink-200 hover:text-white">
                            <Icon className="h-4 w-4" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
