// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

// import type { PageLoad } from './$types';
// import culture_ratio from '$lib/assets/culture/cult_emp_reg_tabular.tsv?url';
// import d3 from 'd3';

// export const load = (({ params }) => {
//     const regions: { [id: string]: number } = {};
//     const max = {
//         PC_EMP: {
//             2014: 0,
//             2015: 0,
//             2016: 0,
//             2017: 0,
//             2018: 0,
//             2019: 0,
//             2020: 0,
//             2021: 0,
//         },
//         THS_PER: {
//             2014: 0,
//             2015: 0,
//             2016: 0,
//             2017: 0,
//             2018: 0,
//             2019: 0,
//             2020: 0,
//             2021: 0,
//         },
//     };

//     d3.tsv(culture_ratio).then((srcData) =>
//         srcData.reduce((a, d) => {
//             const head = d['freq,unit,geo\\TIME_PERIOD']?.split(',') as [string, string, string];

//             regions[head[2]] = 1;

//             const years = {
//                 2014: +d['2014 '].replace(/[a-z]+/, ''),
//                 2015: +d['2015 '].replace(/[a-z]+/, ''),
//                 2016: +d['2016 '].replace(/[a-z]+/, ''),
//                 2017: +d['2017 '].replace(/[a-z]+/, ''),
//                 2018: +d['2018 '].replace(/[a-z]+/, ''),
//                 2019: +d['2019 '].replace(/[a-z]+/, ''),
//                 2020: +d['2020 '].replace(/[a-z]+/, ''),
//                 2021: +d['2021 '].replace(/[a-z]+/, ''),
//             };

//             max[head[1]][2014] = Math.max(max[head[1]][2014], isNaN(years[2014]) ? 0 : years[2014]);
//             max[head[1]][2015] = Math.max(max[head[1]][2015], isNaN(years[2015]) ? 0 : years[2015]);
//             max[head[1]][2016] = Math.max(max[head[1]][2016], isNaN(years[2016]) ? 0 : years[2016]);
//             max[head[1]][2017] = Math.max(max[head[1]][2017], isNaN(years[2017]) ? 0 : years[2017]);
//             max[head[1]][2018] = Math.max(max[head[1]][2018], isNaN(years[2018]) ? 0 : years[2018]);
//             max[head[1]][2019] = Math.max(max[head[1]][2019], isNaN(years[2019]) ? 0 : years[2019]);
//             max[head[1]][2020] = Math.max(max[head[1]][2020], isNaN(years[2020]) ? 0 : years[2020]);
//             max[head[1]][2021] = Math.max(max[head[1]][2021], isNaN(years[2021]) ? 0 : years[2021]);
//             return a[head[2]]
//                 ? {
//                       ...a,
//                       [head[2]]: {
//                           ...a[head[2]],
//                           [head[1]]: {
//                               ...years,
//                           },
//                       },
//                   }
//                 : {
//                       ...a,
//                       [head[2]]: {
//                           [head[1]]: {
//                               ...years,
//                           },
//                       },
//                   };
//         }, {} as { (k: string): { (k: string): dataT } })
//     );
// }) satisfies PageLoad;
