// Current (transitional) Executive Committee, approved by the Society of Neurologists of Bangladesh
// on 22 September 2026. Spellings to be verified against the signed SNB notice.
// Designations, institutions, photos and CVs will be added through the CMS.

export type Doctor = {
    slug: string;
    name: string;
    ecPosition?: string;
    group: 'officer' | 'member' | 'advisor';
    designation?: string;
    institution?: string;
    bio?: string;
    photo?: string;
    qualifications?: { degree: string; institution?: string }[];
    career?: { year: string; text: string }[];
    interests?: string[];
    memberships?: string[];
    publications?: { title: string; journal: string; year: string; role: 'Principal author' | 'Co-author' }[];
    publicationStats?: { total: number; principal: number; international: number };
};

// Professional profiles (from CVs). Personal contact details are intentionally not published.
const profiles: Record<string, Partial<Doctor>> = {
    'prof-dr-rafiqul-islam': {
        photo: '/images/committee/rafiqul-islam.webp',
        designation: 'Professor of Pharmacology',
        institution: 'National Institute of Neurosciences & Hospital (NINS), Dhaka',
        bio: 'Prof. Dr. Rafiqul Islam is Professor of Pharmacology at the National Institute of Neurosciences & Hospital (NINS), Dhaka. Trained in both neurology and pharmacology, Prof. Islam holds an MD in Neurology from Dhaka Medical College and a PhD in Medicine from Kyorin University School of Medicine, Japan. Research interests span tension-type headache and its endocrine associations, migraine as a risk factor for stroke, and membrane drug transporters — with 22 peer-reviewed publications in national and international journals.',
        qualifications: [
            { degree: 'PhD (Medicine)', institution: 'Kyorin University School of Medicine, Japan' },
            { degree: 'MD (Neurology)', institution: 'Dhaka Medical College' },
            { degree: 'M.Phil (Pharmacology)', institution: 'University of Dhaka' },
            { degree: 'M.Phil (Nutrition)', institution: 'University of Dhaka' },
            { degree: 'MBBS', institution: 'Rangpur Medical College' },
        ],
        career: [
            { year: '2025', text: 'Professor of Pharmacology, NINS, Dhaka' },
            { year: '2020', text: 'Associate Professor of Pharmacology, NINS, Dhaka' },
            { year: '2017', text: 'Assistant Professor of Pharmacology, NINS, Dhaka' },
            { year: '2012', text: 'Joined the National Institute of Neurosciences & Hospital, Dhaka' },
            { year: '1997', text: 'Joined Bangladesh Health Service — served at Upazila Health Complex, Louhajang and the National Institute of Diseases of the Chest & Hospital, Dhaka' },
        ],
        interests: ['Tension-type headache', 'Migraine & stroke risk', 'Neuropharmacology', 'Drug transporters', 'Clinical neurology'],
        memberships: [
            'Bangladesh Headache Society (BHS)',
            'Society of Neurologists of Bangladesh (SNB)',
            'Bangladesh Medical Association (BMA)',
            'American Academy of Neurology (AAN)',
            'American College of Physicians (ACP)',
            'The Japanese Pharmacological Society',
            'Japanese Society of Nephrology',
            'Japanese Society of Toxicology',
            'Kyorin Medical Society, Japan',
        ],
        publicationStats: { total: 22, principal: 7, international: 2 },
        publications: [
            { title: 'Status of Thyroid Hormones among Chronic Tension-Type Headache Patients', journal: 'Journal of National Institute of Neurosciences Bangladesh, 8(2)', year: '2022', role: 'Principal author' },
            { title: 'Role of Migraine as a Risk Factor of Ischemic Stroke in Young Women', journal: 'Journal of National Institute of Neurosciences Bangladesh, 8(2)', year: '2022', role: 'Co-author' },
            { title: 'Relationship of Hypothyroidism with Chronic Tension-Type Headache', journal: 'Journal of National Institute of Neurosciences Bangladesh, 8(1)', year: '2022', role: 'Principal author' },
            { title: 'Association of Hypothyroidism with Infrequent Tension-Type Headache', journal: 'Journal of National Institute of Neurosciences Bangladesh, 7(1)', year: '2021', role: 'Principal author' },
            { title: 'Mouse Organic Anion Transporter 2 (mOat2) Mediates the Transport of the Short-Chain Fatty Acid Propionate', journal: 'Journal of Pharmacological Sciences, 106: 525–528', year: '2008', role: 'Principal author' },
            { title: 'Role of Mouse Organic Anion Transporter 2 (mOat2) as a Basolateral Prostaglandin E2 Transporter', journal: 'Journal of Pharmacological Sciences, 103: 48–55', year: '2007', role: 'Principal author' },
        ],
    },
    'prof-dr-kazi-abdullah-al-mamun': {
        photo: '/images/committee/kazi-abdullah-al-mamun.webp',
        designation: 'Professor & Head, Department of Neurology',
        institution: 'East West Medical College',
        bio: 'Prof. Dr. Kazi Abdullah Al Mamun is Professor and Head of the Department of Neurology at East West Medical College. A neurologist with fellowship training in medicine, Prof. Mamun serves as Joint Secretary of the Bangladesh Headache Society.',
        qualifications: [{ degree: 'MD (Neurology)' }, { degree: 'FCPS (Medicine)' }],
        interests: ['Clinical neurology', 'Headache medicine', 'Medical education'],
    },
    'dr-mohammad-saifullah-ahtesam': {
        photo: '/images/committee/saifullah-ahtesam.webp',
        designation: 'Assistant Professor, Clinical Neurology',
        institution: 'National Institute of Neurosciences & Hospital (NINS), Dhaka',
        bio: 'Dr. Mohammad Saifullah Ahtesam is Assistant Professor of Clinical Neurology at the National Institute of Neurosciences & Hospital (NINS), Dhaka, and serves as Office Secretary of the Bangladesh Headache Society.',
        qualifications: [{ degree: 'MD (Neurology)' }, { degree: 'MBBS' }],
    },
    'prof-dr-amit-wazib': {
        photo: '/images/committee/amit-wazib.webp',
        designation: 'Professor, Department of Medicine',
        institution: 'Bangladesh Medical College',
        bio: 'Prof. Dr. Amit Wazib is Professor in the Department of Medicine at Bangladesh Medical College. Holding both FCPS (Medicine) and MD (Neurology), Prof. Wazib serves as Publication Secretary of the Bangladesh Headache Society.',
        qualifications: [{ degree: 'MD (Neurology)' }, { degree: 'FCPS (Medicine)' }],
    },
};

const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const person = (name: string, group: Doctor['group'], ecPosition?: string): Doctor => ({ slug: slugify(name), name, group, ecPosition, ...profiles[slugify(name)] });

export const doctors: Doctor[] = [
    person('Prof. Dr. Md. Abdul Alim', 'officer', 'President'),
    person('Prof. Dr. Abdul Kader Sheikh', 'officer', 'Vice-President'),
    person('Prof. Dr. Rafiqul Islam', 'officer', 'Secretary General'),
    person('Dr. Nazmul Hoque Munna', 'officer', 'Treasurer'),
    person('Prof. Dr. Kazi Abdullah Al Mamun', 'officer', 'Joint Secretary'),
    person('Prof. Dr. Rashimul Haque', 'officer', 'Organizing Secretary'),
    person('Dr. Md. Rashedul Islam', 'officer', 'Scientific Secretary'),
    person('Prof. Dr. Amit Wazib', 'officer', 'Publication Secretary'),
    person('Dr. Mohammad Saifullah Ahtesam', 'officer', 'Office Secretary'),
    person('Prof. Dr. Kazi Gias Uddin Ahmed', 'member', 'Executive Member'),
    person('Prof. Dr. Shahidul Islam', 'member', 'Executive Member'),
    person('Dr. Md. Kabiruzzaman', 'member', 'Executive Member'),
    person('Prof. Dr. Mostafa Hosen', 'member', 'Executive Member'),
    person('Dr. Muhammad Hasan Uddin', 'member', 'Executive Member'),
    person('Dr. Md. Shahidul Islam', 'member', 'Executive Member'),
    person('Dr. S. M. Abdul Awal', 'member', 'Executive Member'),
    person('Dr. Emranul Huda', 'member', 'Executive Member'),
    person('Prof. Md. Abdul Hannan', 'advisor', 'Advisor'),
    person('Prof. Dr. Shahkawat Hossain', 'advisor', 'Advisor'),
    person('Brig Gen Prof. Dr. Humayun Kabir', 'advisor', 'Advisor'),
    person('Dr. Nirmalendu Bikash Bhowmik', 'advisor', 'Advisor'),
];

export const committeeTerm = '2026';
export const committeeApproved = '22 September 2026';
export const executiveCommittee = doctors.filter((d) => d.group !== 'advisor');
export const officers = doctors.filter((d) => d.group === 'officer');
export const executiveMembers = doctors.filter((d) => d.group === 'member');
export const advisors = doctors.filter((d) => d.group === 'advisor');
export const findDoctor = (slug: string) => doctors.find((d) => d.slug === slug);

const TITLES = new Set(['prof', 'dr', 'md', 'brig', 'gen', 'muhammad']);

export const initials = (name: string) => {
    const words = name
        .split(/\s+/)
        .map((w) => w.replace(/\./g, ''))
        .filter((w) => w && !TITLES.has(w.toLowerCase()));
    const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
    return picked.map((w) => w[0].toUpperCase()).join('');
};
