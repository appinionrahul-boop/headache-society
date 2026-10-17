export type EventType = 'cme' | 'awareness' | 'regional' | 'special' | 'meeting';

export type SocietyEvent = {
    slug: string;
    title: string;
    type: EventType;
    date: string; // ISO yyyy-mm-dd
    time?: string;
    venue: string;
    city: string;
    summary: string;
    body?: string[];
    status: 'upcoming' | 'past';
    sample?: boolean; // placeholder content for the demo
};

export const eventTypes: Record<EventType, { label: string; color: string }> = {
    cme: { label: 'CME Programme', color: '#36e3f2' },
    awareness: { label: 'Public Awareness', color: '#f064c4' },
    regional: { label: 'Regional Event', color: '#8b7bff' },
    special: { label: 'Special Day', color: '#e9c784' },
    meeting: { label: 'Society Meeting', color: '#7ee2a8' },
};

export const events: SocietyEvent[] = [
    {
        slug: 'ec-meeting-future-action-plan',
        title: 'Executive Committee Meeting — Future Action Plan',
        type: 'meeting',
        date: '2026-10-07',
        time: '10:00 AM',
        venue: 'National Institute of Neurosciences & Hospital (NINS)',
        city: 'Dhaka',
        summary: 'The newly formed Executive Committee meets to discuss the future action plan, programmes and activities of the Society.',
        body: [
            'A meeting will be held to discuss the future action plan, programs, and activities of the Bangladesh Headache Society.',
            'All members of the newly formed Executive Committee are cordially requested to attend and actively participate by sharing their valuable suggestions, opinions and recommendations for the future development and effective functioning of the Society.',
            'Agenda: Collaboration with the International Headache Society (IHS) · Membership expansion · Public awareness & mass population outreach · Fundraising & financial support · Planning the BHS inaugural ceremony · Future planning & action points · Any other business.',
        ],
        status: 'past',
    },
    {
        slug: 'bhs-inaugural-ceremony',
        title: 'BHS Inaugural Ceremony',
        type: 'meeting',
        date: '2026-12-12',
        venue: 'Venue to be announced',
        city: 'Dhaka',
        summary: 'The formal inauguration of the Bangladesh Headache Society with national and international guests.',
        status: 'upcoming',
        sample: true,
    },
    {
        slug: 'cme-migraine-in-primary-care',
        title: 'CME: Migraine in Primary Care',
        type: 'cme',
        date: '2026-11-14',
        time: '9:30 AM',
        venue: 'NINS Auditorium',
        city: 'Dhaka',
        summary: 'Diagnosis, acute treatment and prevention of migraine for general practitioners and physicians.',
        status: 'upcoming',
        sample: true,
    },
    {
        slug: 'regional-cme-chattogram',
        title: 'Regional CME — Chattogram',
        type: 'regional',
        date: '2026-11-28',
        venue: 'Chattogram Medical College',
        city: 'Chattogram',
        summary: 'Taking headache education beyond Dhaka: a full-day regional programme for clinicians in Chattogram division.',
        status: 'upcoming',
        sample: true,
    },
    {
        slug: 'awareness-headache-is-not-just-a-headache',
        title: '“Not Just a Headache” Community Awareness Walk',
        type: 'awareness',
        date: '2027-01-17',
        venue: 'Central Shaheed Minar',
        city: 'Dhaka',
        summary: 'Public awareness walk and free headache counselling booths, with materials in Bangla and English.',
        status: 'upcoming',
        sample: true,
    },
    {
        slug: 'regional-workshop-rajshahi',
        title: 'Headache Clinic Workshop — Rajshahi',
        type: 'regional',
        date: '2027-02-20',
        venue: 'Rajshahi Medical College',
        city: 'Rajshahi',
        summary: 'Hands-on workshop on setting up a headache clinic in a district hospital.',
        status: 'upcoming',
        sample: true,
    },
    {
        slug: 'cme-medication-overuse-headache',
        title: 'CME: Medication-Overuse Headache',
        type: 'cme',
        date: '2027-03-13',
        venue: 'BSMMU Convention Centre',
        city: 'Dhaka',
        summary: 'Recognising and managing medication-overuse headache — a growing problem in Bangladesh.',
        status: 'upcoming',
        sample: true,
    },
    {
        slug: 'world-brain-day',
        title: 'World Brain Day',
        type: 'special',
        date: '2027-07-22',
        venue: 'Nationwide',
        city: 'Bangladesh',
        summary: 'Joining the global neurology community to raise awareness of brain health and headache disorders.',
        status: 'upcoming',
    },
    {
        slug: 'mastering-migraine-management-2022',
        title: 'Mastering Migraine Management',
        type: 'cme',
        date: '2022-08-20',
        venue: 'In collaboration with the International Headache Society',
        city: 'Dhaka',
        summary: 'The flagship early initiative of BHS, organised in collaboration with the International Headache Society (IHS).',
        status: 'past',
    },
];

export const agenda = [
    'Collaboration with International Headache Society (IHS)',
    'Membership Expansion',
    'Public Awareness & Mass Population Outreach',
    'Fundraising & Financial Support',
    'Plan Inaugural Ceremony for BHS',
    'Future Planning & Action Points',
    'Any Other Business (AOB)',
];

export const findEvent = (slug: string) => events.find((e) => e.slug === slug);

export const upcomingEvents = () =>
    [...events].filter((e) => e.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date));
