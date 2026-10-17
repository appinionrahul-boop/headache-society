// Gallery & news placeholders. Photos/videos will be uploaded through the admin panel.

export type GalleryItem = {
    id: number;
    title: string;
    album: string;
    kind: 'photo' | 'video';
    hue: number; // drives the generated placeholder artwork until real photos arrive
    span?: 'tall' | 'wide';
};

export const albums = ['All', 'CME Programmes', 'Awareness', 'Meetings', 'Regional'];

export const gallery: GalleryItem[] = [
    { id: 1, title: 'Mastering Migraine Management, 2022', album: 'CME Programmes', kind: 'photo', hue: 250, span: 'wide' },
    { id: 2, title: 'Executive Committee meeting at NINS', album: 'Meetings', kind: 'photo', hue: 190 },
    { id: 3, title: 'Community awareness session', album: 'Awareness', kind: 'photo', hue: 320, span: 'tall' },
    { id: 4, title: 'Workshop highlights', album: 'CME Programmes', kind: 'video', hue: 210 },
    { id: 5, title: 'Regional programme, Chattogram', album: 'Regional', kind: 'photo', hue: 280 },
    { id: 6, title: 'Panel discussion', album: 'CME Programmes', kind: 'photo', hue: 170, span: 'tall' },
    { id: 7, title: 'Awareness walk', album: 'Awareness', kind: 'video', hue: 340, span: 'wide' },
    { id: 8, title: 'Guest lecture', album: 'Meetings', kind: 'photo', hue: 230 },
    { id: 9, title: 'Hands-on clinic workshop', album: 'Regional', kind: 'photo', hue: 200 },
];

export type NewsItem = { slug: string; title: string; date: string; excerpt: string; tag: string };

export const news: NewsItem[] = [
    {
        slug: 'new-executive-committee-meets',
        title: 'Newly formed Executive Committee meets to chart the future',
        date: '2026-10-07',
        tag: 'Society',
        excerpt: 'Members of the new EC met at NINS, Dhaka to discuss IHS collaboration, membership expansion, public outreach and the inaugural ceremony.',
    },
    {
        slug: 'bhs-reaches-418-members',
        title: 'BHS membership grows to 418 clinicians',
        date: '2026-09-01',
        tag: 'Membership',
        excerpt: 'Neurologists, physicians and young doctors from across Bangladesh have joined the Society.',
    },
    {
        slug: 'ihs-affiliate-member-society',
        title: 'Recognised as the IHS Affiliate Member Society for Bangladesh',
        date: '2026-06-15',
        tag: 'International',
        excerpt: 'The International Headache Society recognises BHS as the affiliate society representing Bangladesh.',
    },
];
