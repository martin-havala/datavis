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
            'Typescript',
            'Sass',
            'Jest',
            'Spectator',
            'Git',
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
        tech: ['VueJS', 'Nuxt JS', 'Laravel', 'PHPUnit', 'JIRA', 'Confluence', 'Git'],
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
            'Typescript',
            'Less',
            'Leaflet',
            'Karma',
            'Jasmine',
            'Git',
            'Attlasian BB+C+J',
        ],
    },

    {
        employee: 'Bonum s.r.o',
        location: 'Bratislava',
        interval: [2012, 2016],
        tasks: 'development of internal system for production management customer support, custom design and automation of report generation',
        tech: ['Java2EE', 'IBM DB2', 'HTML', 'Javascript', 'jQuery', 'CSS', 'JasperReports'],
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
        tech: ['Svelte', 'SvelteKit', 'D3.js', 'Sass', 'Python', 'Git'],
    },
    {
        link: '/hobbies/tech',
        group: 'Emerging FE Tech',
        interval: [2021, 2022],
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

export const TECHS = [
    { tech: 'HTML', prax: 11 },
    { tech: 'CSS', prax: 11 },
    { tech: 'Javascript', prax: 8 },
    { tech: 'AngularJS', prax: 2 },
    { tech: 'Angular', prax: 5 },
    { tech: 'Angular Material', prax: 4 },
    { tech: 'Unit Testing', prax: 4 },
    { tech: 'NgRx', prax: 2 },
    { tech: 'Less / SASS', prax: 4 },
    { tech: 'D3.js', prax: 2 },
    { tech: 'Git', prax: 2 },
    { tech: 'BitBucket + Jira + Conflucence', prax: 5 },
    { tech: 'Svelte + SvelteKit', prax: 1 },
    { tech: 'VueJS + NuxtJS', prax: 2 },
    { tech: 'Python', prax: 2 },
    { tech: 'SVG', prax: 4 },
    { tech: 'Java', prax: 4 },
    { tech: 'SQL', prax: 4 },
];

export const TECH_GRPS: { [tech: string]: string[] } = {
    HTML: ['Angular', 'AngularJS', 'jQuery', 'Svelte', 'VueJS', 'D3.js'],
    CSS: ['Angular', 'AngularJS', 'jQuery', 'Svelte', 'VueJS', 'D3.js'],
    Javascript: ['Angular', 'AngularJS', 'jQuery', 'Svelte', 'VueJS', 'D3.js'],
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
    Java: ['Java', 'Java2EE', 'JasperReports'],
    SQL: ['SQL', 'IBM DB2'],
};

const year = new Date().getUTCFullYear();

const TECH_YEARS = TECHS.map((tech) =>
    CV_JOBS.reduce((years, job) => {
        const allTechs = TECH_GRPS[tech.tech] ? [...TECH_GRPS[tech.tech], tech.tech] : [tech.tech];
        if (job.tech.filter((j) => allTechs.includes(j)).length > 0) {
            return [
                ...Array((job.interval[1] ?? year) - job.interval[0])
                    .fill(0)
                    .map((_, i) => i + job.interval[0]),
                ...years,
            ]
                .sort()
                .filter(onlyUnique);
        }
        return years;
    }, [] as number[])
);
const HOBBY_YEARS = TECHS.map((tech) =>
    CV_HOBBIES.reduce((years, job) => {
        const allTechs = TECH_GRPS[tech.tech] ? [...TECH_GRPS[tech.tech], tech.tech] : [tech.tech];
        if (job.tech.filter((j) => allTechs.includes(j)).length > 0) {
            return [
                ...Array((job.interval[1] ?? year) - job.interval[0])
                    .fill(0)
                    .map((_, i) => i + job.interval[0]),
                ...years,
            ]
                .sort()
                .filter(onlyUnique);
        }
        return years;
    }, [] as number[])
);
export const TECH_YEARS_SQUARES = TECHS.map((_, i) => [
    ...TECH_YEARS[i].map((_) => '◼'),
    ...HOBBY_YEARS[i].filter((h) => !TECH_YEARS[i].includes(h)).map((_) => '◻'),
]);
