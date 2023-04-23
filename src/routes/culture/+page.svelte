<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import europe from '../../lib/assets/NUTS_RG_60M_2021_4326.json';
    import culture_ratio from '$lib/assets/culture/cult_emp_reg_tabular.tsv?url';

    const graticule = d3.geoGraticule10();
    const outline: d3.GeoSphere = { type: 'Sphere' };
    let svg: SVGElement;
    let mapDiv: HTMLDivElement;
    let notesDiv: HTMLDivElement;
    let svgSelection: d3.Selection<SVGElement, unknown, any, any>;
    let mapDivSelection: d3.Selection<HTMLDivElement, unknown, any, any>;
    let path: d3.GeoPath;
    let projection: d3.GeoProjection;
    let zoomGroup: d3.Selection<SVGGElement, unknown, any, any>;

    let width: number, height: number;
    let overlayMultiplier: number = 1;
    let overlayOffset: number = 1;

    const zoomHandler = (event: d3.D3ZoomEvent<Element, any>) => {
        zoomGroup.attr('transform', event.transform.toString());
        d3.select(mapDiv).style(
            'transform',
            `translate(${event.transform.x}px,${event.transform.y}px) scale(${event.transform.k})`
        );
    };

    const createMap = () => {
        const view = svg.getBoundingClientRect();
        [width, height] = [view.width, view.height];
        svgSelection = d3.select(svg);
        const zoom = d3.zoom().on('zoom', zoomHandler);
        zoomGroup = svgSelection.call(zoom).append('g');
        zoomGroup
            .append('rect')
            .attr('width', width * overlayMultiplier)
            .attr('height', width * overlayMultiplier)
            .attr('transform', `translate(-${width * overlayOffset},-${height * overlayOffset})`)
            .style('fill', 'none')
            .style('pointer-events', 'all');

        projection = d3
            .geoMercator()
            // .scale(700)
            .fitSize(
                [width, height],

                {
                    type: 'FeatureCollection',
                    features: europe.features.filter((r) => ['ES6', 'NO07', 'ES70'].includes(r.properties.NUTS_ID)),
                }
            )
            .center([0, 0]);

        path = d3.geoPath(projection);

        // render map
        zoomGroup
            .append('g')
            .selectAll('path')
            .data(europe.features.filter((r) => r.properties.LEVL_CODE == 0))
            .join('path')
            .attr('d', path)
            .attr('fill', (d) => {
                switch (d.properties.LEVL_CODE) {
                    case 2:
                        return '#555';
                    default:
                        return 'transparent';
                }
            })
            .attr('stroke', '#999')
            .attr('stroke-width', 0.2)
            .append('title')
            .text((d) => d.properties.NUTS_NAME);

        return { svg, projection };
    };

    function loadData() {
        interface dataT {
            '2014 ': number;
            '2015 ': number;
            '2016 ': number;
            '2017 ': number;
            '2018 ': number;
            '2019 ': number;
            '2020 ': number;
            '2021 ': number;
        }

        const regions = {};
        const max = {
            PC_EMP: {
                2014: 0,
                2015: 0,
                2016: 0,
                2017: 0,
                2018: 0,
                2019: 0,
                2020: 0,
                2021: 0,
            },
            THS_PER: {
                2014: 0,
                2015: 0,
                2016: 0,
                2017: 0,
                2018: 0,
                2019: 0,
                2020: 0,
                2021: 0,
            },
        };
        const activeYear = 2021;
        d3.tsv(culture_ratio).then((srcData) => {
            const data = srcData.reduce((a, d) => {
                const head = d['freq,unit,geo\\TIME_PERIOD']?.split(',') as [string, string, string];
                regions[head[2]] = 1;

                const years = {
                    2014: +d['2014 '].replace(/[a-z]+/, ''),
                    2015: +d['2015 '].replace(/[a-z]+/, ''),
                    2016: +d['2016 '].replace(/[a-z]+/, ''),
                    2017: +d['2017 '].replace(/[a-z]+/, ''),
                    2018: +d['2018 '].replace(/[a-z]+/, ''),
                    2019: +d['2019 '].replace(/[a-z]+/, ''),
                    2020: +d['2020 '].replace(/[a-z]+/, ''),
                    2021: +d['2021 '].replace(/[a-z]+/, ''),
                };

                max[head[1]][2014] = Math.max(max[head[1]][2014], isNaN(years[2014]) ? 0 : years[2014]);
                max[head[1]][2015] = Math.max(max[head[1]][2015], isNaN(years[2015]) ? 0 : years[2015]);
                max[head[1]][2016] = Math.max(max[head[1]][2016], isNaN(years[2016]) ? 0 : years[2016]);
                max[head[1]][2017] = Math.max(max[head[1]][2017], isNaN(years[2017]) ? 0 : years[2017]);
                max[head[1]][2018] = Math.max(max[head[1]][2018], isNaN(years[2018]) ? 0 : years[2018]);
                max[head[1]][2019] = Math.max(max[head[1]][2019], isNaN(years[2019]) ? 0 : years[2019]);
                max[head[1]][2020] = Math.max(max[head[1]][2020], isNaN(years[2020]) ? 0 : years[2020]);
                max[head[1]][2021] = Math.max(max[head[1]][2021], isNaN(years[2021]) ? 0 : years[2021]);
                return a[head[2]]
                    ? {
                          ...a,
                          [head[2]]: {
                              ...a[head[2]],
                              [head[1]]: {
                                  ...years,
                              },
                          },
                      }
                    : {
                          ...a,
                          [head[2]]: {
                              [head[1]]: {
                                  ...years,
                              },
                          },
                      };
            }, {} as { (k: string): { (k: string): dataT } });

            svgSelection
                .selectAll('clipPath')
                .data(europe.features.filter((r) => r.properties.LEVL_CODE == 0))
                .join('clip-path')
                .attr('id', (r) => `clip${r.properties.NUTS_ID}`)
                .append('path')
                .attr('d', path)
                .attr('stroke', 'purple')
                .attr('stroke-width', '4');

            const dataRegions = zoomGroup
                .append('g')
                .selectAll('regions')
                .data(
                    europe.features
                        .sort((a, b) => (a.properties.LEVL_CODE > b.properties.LEVL_CODE ? 1 : -1))
                        .filter((r) => regions[r.properties.NUTS_ID])
                )
                .join('g');
            dataRegions
                .append('path')
                .attr('d', path)
                .attr('id', (r) => `${r.properties.NUTS_ID}`)
                .attr('fill', (d) => {
                    try {
                        return data[d.id]['PC_EMP'][activeYear]
                            ? d3.interpolateTurbo(data[d.id]['PC_EMP'][activeYear] / max['PC_EMP'][activeYear])
                            : 'transparent';
                    } catch (e) {
                        return 'black';
                    }
                })
                .attr('stroke-width', (d) => (d.properties.LEVL_CODE == 0 ? '2' : 0))
                .attr('stroke', '#444')
                // .attr('clip-path', (r) => `url(#clip${r.properties.NUTS_ID.substring(0, 2)})`)
                // .style('--webkit-clip-path', (r) => `url(#clip${r.properties.NUTS_ID.substring(0, 2)})`)
                // .style('clip-path', (r) => `url(#clip${r.properties.NUTS_ID.substring(0, 2)})`)
                .append('title')
                .text((d) => d.properties.NUTS_NAME);

            zoomGroup
                .append('g')
                .selectAll('path')
                .data(europe.features.filter((r) => r.properties.LEVL_CODE == 0))
                .join('path')
                .attr('d', path)
                .attr('stroke', '#202022')
                .attr('stroke-width', '.5')
                .attr('pointer-events', 'none')
                .attr('fill', 'transparent');

            const legend = svgSelection.append('g');
            const legendTicks = legend
                .selectAll('g')
                .data(
                    Array(101)
                        .fill(1)
                        .map((_, i) => i / 100)
                )
                .join('g')
                .attr('transform', (d) => `translate(40,${height - 40 - d * 300})`);

            legend
                .append('text')
                .attr('x', 45)
                .attr('y', [height - 70 - 300])
                .attr('dominant-baseline', 'central')
                .attr('font-size', '.8em')
                .text('Percentage of total employment')
                .attr('fill', 'white');
            legendTicks
                .append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', (d) => ((d * 20) % 10 == 0 ? 40 : 30))
                .attr('height', 3)
                .attr('fill', (d) => d3.interpolateTurbo(d));
            legendTicks
                .append('text')
                .attr('x', 45)
                .attr('y', 0)
                .attr('dominant-baseline', 'central')
                .attr('font-size', '.8em')
                .text((d) => ((d * 20) % 10 == 0 ? `${max['PC_EMP'][activeYear] * d}%` : ''))
                .attr('fill', 'white');
        });
    }

    onMount(() => {
        loadData();
        createMap();
    });
</script>

<svelte:head>
    <title>EU cultural employment</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <div class="page">
        <svg bind:this={svg} xmlns:xlink="http://www.w3.org/1999/xlink" />
        <div class="notes" bind:this={notesDiv}>
            <div>
                <h1>Culture employment</h1>
                Slightly weird dataset on how much people work in culture compared to local employment level. Does this say
                anything? Not really.
            </div>
            <div class="comments">
                <div>
                    data source - <a
                        href="https://ec.europa.eu/eurostat/databrowser/view/CULT_EMP_REG/default/table?lang=en&category=cult.cult_emp"
                        >Eurostat</a
                    >
                </div>
            </div>
        </div>
    </div>
    <div class="bottom_right">© EuroGeographics for the administrative boundaries</div>
</section>

<style lang="scss">
    .notes {
        width: 50ex;
        margin: 0;
        z-index: 1;
        user-select: none;
        pointer-events: none;
    }
    .bottom_right {
        text-align: right;
        position: absolute;
        bottom: 1em;
        right: 1em;
        font-size: 0.7em;
    }
    svg {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 0;
    }
</style>
