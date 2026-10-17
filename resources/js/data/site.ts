// Static content for the demo. Each export will later be replaced by an API call to the CMS.
// Governance content is summarised from the BHS Constitution; the Constitution itself is not published.

export const site = {
    name: 'Bangladesh Headache Society',
    short: 'BHS',
    tagline: 'Advancing headache medicine in Bangladesh',
    founded: 2022,
    members: 418,
    email: 'info@bdheadachesociety.org',
    phone: '+880 1XXX-XXXXXX',
    address: 'National Institute of Neurosciences & Hospital (NINS), Sher-e-Bangla Nagar, Dhaka 1207, Bangladesh',
    socials: {
        facebook: '#',
        youtube: '#',
        linkedin: '#',
    },
};

export const status = 'A non-political, non-profit, professional and scientific society for the advancement of headache medicine and headache-related sciences in Bangladesh.';

export const mission =
    'To advance headache medicine in Bangladesh through education, research, collaboration and evidence-based clinical practice, improving the care of people living with headache disorders.';

export const vision =
    'To improve the prevention, diagnosis, treatment, rehabilitation, research and overall quality of life of people living with headache disorders in Bangladesh through internationally aligned, evidence-based and locally appropriate practice.';

/** What the mission integrates (Constitution, Part II). */
export const missionPillars = [
    'International scientific standards',
    'Bangladesh-specific healthcare needs',
    'Education & professional development',
    'Clinical research',
    'Public awareness',
    'Multidisciplinary collaboration',
    'Equitable & affordable headache care',
    'National & international collaboration',
];

export const declaration =
    'BHS shall serve the people of Bangladesh by advancing scientific knowledge, professional education, evidence-based clinical care, research and public awareness in headache medicine, while maintaining internationally recognised standards and an active professional relationship with the International Headache Society.';

export const history = [
    'The Bangladesh Headache Society (BHS) was established in 2022 to promote education, research, professional development and evidence-based care in headache medicine in Bangladesh.',
    'BHS has developed academic collaboration with national and international organisations. Its major early initiative was the “Mastering Migraine Management” programme in August 2022, organised in collaboration with the International Headache Society (IHS).',
    'BHS is recognised by the International Headache Society as the Affiliate Member Society representing Bangladesh.',
];

export const milestones = [
    { year: '2022', title: 'Society founded', text: 'BHS is established to champion headache medicine across Bangladesh.' },
    { year: 'Aug 2022', title: 'Mastering Migraine Management', text: 'Flagship programme organised in collaboration with the International Headache Society.' },
    { year: 'IHS', title: 'Affiliate Member Society', text: 'Recognised by the IHS as the affiliate society representing Bangladesh.' },
    { year: 'Sep 2026', title: 'Executive Committee approved', text: 'The current Executive Committee is approved by the Society of Neurologists of Bangladesh (SNB).' },
];

export const activities = [
    { icon: 'Presentation', title: 'Seminars, CME & Workshops', text: 'Scientific seminars, continuing medical education and hands-on workshops in headache medicine.' },
    { icon: 'GraduationCap', title: 'Professional Education', text: 'Structured professional and postgraduate education for clinicians.' },
    { icon: 'Microscope', title: 'Clinical Research', text: 'Clinical and epidemiological research on headache disorders in Bangladesh.' },
    { icon: 'Globe', title: 'Global Collaboration', text: 'Partnerships with national and international headache organisations.' },
    { icon: 'Sparkles', title: 'Young Physicians', text: 'Educational programmes for medical students and young physicians.' },
    { icon: 'Megaphone', title: 'Public Awareness', text: 'Community awareness programmes on headache disorders across Bangladesh.' },
] as const;

/** Objectives (Constitution, Part II §6). */
export const objectives = [
    {
        title: 'Clinical care',
        items: [
            'Promote evidence-based diagnosis and management of headache disorders.',
            'Improve recognition of migraine, tension-type, cluster and medication-overuse headache, trigeminal autonomic cephalalgias and secondary headaches.',
            'Promote appropriate use of modern acute, preventive, procedural and non-pharmacological therapies.',
            'Encourage headache clinics and multidisciplinary headache services throughout Bangladesh.',
        ],
    },
    {
        title: 'Education & training',
        items: [
            'Organise CME programmes, conferences, workshops, webinars and scientific meetings.',
            'Promote headache education for neurologists, physicians, residents, students, nurses and allied professionals.',
            'Develop Bangladesh-relevant educational materials aligned with international standards.',
            'Encourage training and the development of qualified headache specialists.',
        ],
    },
    {
        title: 'Research',
        items: [
            'Promote clinical, epidemiological, translational and basic research.',
            'Establish national headache registries and research databases where permissible.',
            'Encourage multicentre research across hospitals and academic institutions.',
            'Collaborate with international headache research organisations.',
        ],
    },
    {
        title: 'International collaboration',
        items: [
            'Maintain affiliation with the International Headache Society.',
            'Encourage BHS members to hold individual IHS membership.',
            'Support Bangladeshi professionals at international meetings and programmes.',
            'Share relevant IHS scientific developments with members in Bangladesh.',
        ],
    },
];

/** Bangladesh-specific priorities (Constitution, §6.4). */
export const bangladeshChallenges = [
    'High burden of migraine and other headache disorders',
    'Underdiagnosis and undertreatment',
    'Inappropriate analgesic use and medication-overuse headache',
    'Affordability and availability of evidence-based medicines',
    'Shortage of trained headache specialists',
    'Limited access to specialised care outside major cities',
    'Headache care in women, including pregnancy',
    'Headache in children and adolescents',
    'Occupational and educational disability',
    'Mental health and associated comorbidities',
    'Disability and loss of productivity',
    'Public awareness and healthcare-seeking behaviour',
];

export const priorities = [
    'Establish regular national headache conferences and educational programmes.',
    'Promote specialised headache services and headache clinics.',
    'Develop national research networks, registries and multicentre studies.',
    'Encourage young professionals to pursue headache medicine and research.',
    'Expand patient and public awareness in Bangla and English.',
    'Strengthen collaboration with the IHS and international headache organisations.',
];

/** Professional ethics (Constitution, Part XIII). */
export const principles = [
    { title: 'Patient welfare', text: 'Patient welfare and scientific integrity take precedence over every other interest.' },
    { title: 'Scientific integrity', text: 'Programmes and guidance grounded in evidence and accepted research standards.' },
    { title: 'Independence', text: 'Sponsors never control scientific content or conclusions; support is disclosed transparently.' },
    { title: 'Transparency', text: 'Open governance, disclosed conflicts of interest and accountable records.' },
];

/** Scientific standards BHS aligns with (Constitution, §18). */
export const scientificStandards = [
    'International Classification of Headache Disorders (ICHD)',
    'IHS recommendations and guidelines',
    'Internationally accepted evidence-based clinical practice',
    'Accepted standards of clinical research',
    'Bangladesh national laws and regulatory requirements',
];

/** Public awareness themes (Constitution, §35). */
export const awarenessTopics = [
    'Migraine',
    'Headache red flags',
    'Appropriate use of analgesics',
    'Medication-overuse headache',
    'When to seek urgent care',
    'Headache-related disability',
    'Availability of treatment',
];

/** Disciplines BHS collaborates with (Constitution, §37). */
export const disciplines = [
    'Neurologists',
    'Medicine specialists',
    'Neurosurgeons',
    'Psychiatrists',
    'Pain specialists',
    'Ophthalmologists',
    'ENT specialists',
    'Paediatricians',
    'Obstetricians & gynaecologists',
    'Dentists / maxillofacial',
    'Physiotherapists',
    'Psychologists',
    'Nurses',
    'Pharmacists',
    'Researchers',
];

/** Membership categories (Constitution, §7). `apply` marks categories open to online application. */
export const membershipCategories = [
    { name: 'Life Member', text: 'Lifelong membership with full voting rights.', apply: true, featured: true },
    { name: 'Ordinary / Annual Member', text: 'Annual membership for eligible healthcare professionals.', apply: true, featured: true },
    { name: 'Trainee / Resident Member', text: 'For residents and postgraduate trainees in related disciplines.', apply: true },
    { name: 'Associate Member', text: 'For allied professionals and researchers engaged in headache care.', apply: true },
    { name: 'International / Overseas Member', text: 'For professionals practising outside Bangladesh.', apply: true },
    { name: 'Founder Member', text: 'Members who founded the Society.', apply: false },
    { name: 'Honorary Member', text: 'Conferred in recognition of distinguished contribution.', apply: false },
    { name: 'Institutional Associate', text: 'Institutional or corporate association, where appropriate.', apply: false },
];

export const eligibility = [
    'Open to appropriately qualified healthcare professionals, researchers and academics engaged in headache medicine or related disciplines.',
    'Medical and scientific members should hold professional qualifications recognised in Bangladesh or their jurisdiction.',
    'Applications are submitted in the prescribed form.',
    'The Executive Committee reviews and approves membership applications.',
];

export const memberRights = [
    'Attend General Body meetings',
    'Vote and stand for election',
    'Participate in scientific activities',
    'Propose resolutions',
    'Access Society programmes and benefits',
];

/** Governance structure (Constitution, Parts IV–V, IX). */
export const governance = [
    { title: 'General Body', text: 'The supreme policy-making body — elects the Executive Committee, approves major policies, annual reports and amendments.' },
    { title: 'Executive Committee', text: 'Leads the Society between General Body meetings and may form subcommittees and working groups.' },
    { title: 'Democratic elections', text: 'Executive Committees are elected through a transparent process, ordinarily for a three-year term.' },
    { title: 'IHS Representative', text: 'An eligible BHS member, in good standing with the IHS, represents the Society on the IHS Advisory Council.' },
];
