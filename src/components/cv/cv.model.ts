import { onlyUnique } from '$lib/utils/array';

export const SELECTED_TECH = 'selectedTech';
export const CV_JOBS = [
    {
        employee: 'ERNI (Slovakia) s.r.o.',
        location: 'Bratislava',
        parttime: '32h',
        interval: [2019, 2022],
        tasks: 'analysis and development of Web-Apps, UI design',
        tech: [
            'Angular',
            'Angular Material',
            'RxJs',
            'Sass',
            'Jest',
            'Spectator',
            'Storybook',
            'Attlasian BB+C+J',
            'D3.js',
        ],
    },
    {
        employee: 'Slovak National Gallery',
        location: 'Bratislava',
        interval: [2019, 2020],
        parttime: '8h+',
        tasks: 'development of webumenia.sk and occasional micropages',
        tech: ['VueJS', 'NuxtJS', 'Laravel', 'PHPUnit', 'JIRA', 'Confluence', 'Git'],
    },

    {
        employee: 'AI Maps s.r.o.',
        location: 'Bratislava',
        interval: [2016, 2018],
        tasks: 'analysis and development of web-apps, UX analysis',
        tech: [
            'AngularJS',
            'Angular',
            'Angular Material',
            'TypeScript',
            'Less',
            'Leaflet',
            'Karma',
            'Jasmine',
            'Attlasian BB+C+J',
        ],
    },

    {
        employee: 'Bonum s.r.o',
        location: 'Bratislava',
        interval: [2012, 2016],
        tasks: 'development of internal system for production management customer support, custom design and automation of report generation',
        tech: ['Java2EE', 'IBM DB2', 'HTML', 'JavaScript', 'jQuery', 'CSS', 'JasperReports'],
    },

    {
        employee: 'Accenture Technology Solutions Slovakia s.r.o.',
        location: 'Bratislava',
        interval: [2010, 2012],
        tasks: '1st and 2nd line support',
        tech: ['OpenCMS', 'RHEL', 'Apache Tomcat'],
    },
];

export const CV_HOBBIES = [
    {
        group: 'Datavis',
        link: '/datavis',
        interval: [2022],
        tasks: 'tiny web for datavis',
        tech: ['Svelte', 'SvelteKit', 'D3.js', 'Sass', 'Python', 'Git', 'SQL'],
    },
    {
        link: '/hobbies/tech',
        group: 'Emerging FE Tech',
        interval: [2021],
        tasks: 'CheeseCake by Mona',
        tech: ['Svelte', 'SvelteKit', 'D3.js', 'Sass', 'Git'],
    },
    {
        group: 'Graphic Design',
        interval: [2018, 2019],
        tasks: 'Handbook for BSK',
        tech: ['Adobe Illustrator', 'Adobe InDesign'],
    },
];
export const CV_TECH = CV_JOBS.reduce((a, j) => [...a, ...j.tech], [] as string[]).reduce(
    (a, j) => (a.includes(j) ? a : [...a, j]),
    [] as string[]
);

const techs = [
    { name: 'HTML / CSS / JS', group: 0 },
    { name: 'TypeScript', group: 0 },
    { name: 'AngularJS', group: 0 },
    { name: 'Angular', group: 0 },
    { name: 'Angular Material', group: 0 },
    { name: 'RxJs', group: 0 },
    { name: 'Less / SASS', group: 0 },
    { name: 'D3.js', group: 0 },
    { name: 'Svelte + SvelteKit', group: 0 },
    { name: 'VueJS + NuxtJS', group: 0 },
    { name: 'SVG', group: 0 },
    { name: 'Java', group: 1 },
    { name: 'SQL', group: 1 },
    { name: 'Unit Testing', group: 2 },
    { name: 'BitBucket + Jira + Conflucence', group: 2 },
    { name: 'Git', group: 2 },
    { name: 'Python', group: 2 },
];

export const TECH_GRPS: { [tech: string]: string[] } = {
    HTML: ['Angular', 'AngularJS', 'jQuery', 'Svelte', 'VueJS', 'D3.js'],
    CSS: ['VueJS', 'D3.js', 'HTML', 'Sass', 'Less'],
    JavaScript: ['Angular', 'AngularJS', 'jQuery', 'Svelte', 'VueJS', 'D3.js'],
    'HTML / CSS / JS': [
        'Angular',
        'AngularJS',
        'D3.js',
        'HTML',
        'jQuery',
        'Less',
        'Sass',
        'Svelte',
        'VueJS',
        'NuxtJS',
    ],
    TypeScript: ['Angular', 'AngularJS', 'VueJS', 'NuxtJS', 'Svelte', 'SvelteKit'],
    'Unit Testing': ['Karma', 'Jest', 'Spectator', 'Jasmine', 'PHPUnit'],
    RxJS: ['Angular'],
    'Svelte + SvelteKit': ['Svelte', 'SvelteKit'],
    'Less / SASS': ['Less', 'Sass'],
    'VueJS + NuxtJS': ['VueJS', 'NuxtJS', 'Vue'],
    NgRx: ['Angular'],
    SVG: ['SVG', 'D3.js'],
    Angular: ['Angular', 'Angular Material'],
    BitBucket: ['Attlasian BB+C+J'],
    Jira: ['Attlasian BB+C+J'],
    Conflucence: ['Attlasian BB+C+J'],
    'BitBucket + Jira + Conflucence': ['Attlasian BB+C+J'],
    Git: ['Attlasian BB+C+J'],
    Java: ['Java', 'Java2EE', 'JasperReports'],
    SQL: ['SQL', 'IBM DB2'],
};

const year = new Date().getUTCFullYear();
let hlp = [];
{
    const reducer = (jobs: { tech: string[]; interval: number[] }[], tech: string) => {
        return jobs.reduce((years, job) => {
            const allTechs = TECH_GRPS[tech] ? [...TECH_GRPS[tech], tech] : [tech];
            if (job.tech.filter((j) => allTechs.includes(j)).length > 0) {
                return [
                    ...Array((job.interval[1] ?? year) - job.interval[0])
                        .fill(0)
                        .map((_, i) => i + job.interval[0] + 1),
                    ...years,
                ]
                    .sort()
                    .filter(onlyUnique);
            }
            return years;
        }, [] as number[]);
    };

    const TECH_YEARS = techs.map((tech) => reducer(CV_JOBS, tech.name));
    const HOBBY_YEARS = techs.map((tech) => reducer(CV_HOBBIES, tech.name));
    hlp = techs.map(({ name, group }, i) => ({
        name,
        group,
        workYears: TECH_YEARS[i].length + HOBBY_YEARS[i].filter((h) => !TECH_YEARS[i].includes(h)).length,
        hobbyYears: HOBBY_YEARS[i].filter((h) => !TECH_YEARS[i].includes(h)).length,
        lastWorkUsed: Math.max(...TECH_YEARS[i], 0),
        lastUsed: Math.max(...TECH_YEARS[i], ...HOBBY_YEARS[i], 0),
    }));
}

export const TECHS = hlp.sort((a, b) => {
    if (a.group != b.group) return a.group > b.group ? 1 : -1;
    if (a.name != b.name) return a.name > b.name ? 1 : -1;
    return 0;
});

export const TECH_GRP_NAMES = [
    { shrt: 'FE', lng: 'front-end' },
    { shrt: 'BE', lng: 'back-end' },
    { shrt: 'DEV', lng: 'development' },
];
