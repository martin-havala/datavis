<script lang="ts">
    import eGovURL from '$lib/assets/eGov/e_gov.csv?url';
    import { COLOR_SCALE, EGOV_COLS, EGOV_COL_LABELS, type eGov } from '$lib/assets/eGov/e_gov.model';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import CountryDetail from './country_detail.svelte';

    let margin = { top: 10, right: 60, bottom: 0, left: 79 },
        width = 1000 - margin.left - margin.right,
        height = 3500 - margin.top - margin.bottom;

    let selectedCountry: eGov | null = null;
    let svgElem: SVGGElement;
    let svgXElem: SVGGElement;
    let svgSelection: d3.Selection<SVGGElement, unknown, any, any>;
    let data: eGov[] = [];

    onMount(() => {
        const chartBeginYear = 1970;
        // get the data
        d3.csv(eGovURL, d3.autoType).then((resData) => {
            data = (resData as eGov[]).filter((a) => a['Year'] == 2022);
            const xScale = d3.scaleLinear([chartBeginYear, 2025], [0, width]);

            const world = EGOV_COLS.reduce(
                (a, key) => ({ ...a, [key]: d3.median(data.map((d) => d[key])) }),
                {} as eGov
            );
            world['Code'] = 'World median';
            world['GTMI'] = d3.median(data.map((d) => d['GTMI']));
            world['GT1'] = data.map((d) => d['GT1']).sort()[Math.floor(data.length / 2)];
            world['Level'] = data.map((d) => d['Level']).sort()[Math.floor(data.length / 2)];
            data.push(world);
            data.forEach((d) => {
                [d.begin, d.end] = d3.extent(EGOV_COLS.map((key) => +d[key]).filter(Boolean)) as [number, number];
                const reduced = EGOV_COLS.reduce((a, c) => {
                    const year = +d[c];
                    if (a[year]) {
                        a[year].push(c);
                        return a;
                    } else return { ...a, [year]: [c] };
                }, {} as { [i: number]: string[] });
                d.grouped = Object.keys(reduced)
                    .map((key) => ({ year: +key, values: reduced[key] }))
                    .filter((d) => !isNaN(+d.year));
            });

            data.sort((a, b) => (a['Code'] == 'World median' || a['GTMI'] > b['GTMI'] ? -1 : 1));
            svgSelection = d3
                .select(svgElem)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            const legend = d3
                .select('.svgLegend svg')
                .selectAll('legend')
                .data(EGOV_COLS.sort((a, b) => (data[0][a] > data[0][b] ? 1 : -1)))
                .join('g')
                .attr('transform', (d, i) => `translate(10,${20 + i * 20})`);

            legend
                .append('circle')
                .attr('cx', 10)
                .attr('cy', -4)
                .attr('r', 4)
                .attr('fill', (d, i) => COLOR_SCALE[i])
                .attr('stroke', (d, i) => COLOR_SCALE[i]);
            legend
                .append('text')
                .attr('x', 20)
                .text((d) => `${EGOV_COL_LABELS[d]} `);

            d3.select(svgXElem)
                .attr('width', width + margin.left + margin.right)
                .attr('height', 25)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',5)')
                .call(d3.axisBottom(xScale).tickFormat((d) => `${d}`))
                .selectAll('text')
                .style('text-anchor', 'middle');

            const yScale = d3
                .scaleBand()
                .domain(data.map((d) => d['Code']))
                .range([0, height])
                .paddingOuter(0);

            const centerY = yScale.bandwidth() / 2;

            // create a tooltip
            var tooltip = d3.select('#tooltip').style('position', 'absolute').style('visibility', 'hidden');

            const countries = svgSelection
                .selectAll('country')
                .data(data)
                .join('g')
                .attr('class', (d) => `country ${d['Code']} ${d['Level']} maturityGroup${d['Grp']}`)
                .attr('transform', (d) => `translate(0,${yScale(d['Code'])})`)
                .style('animation-duration', (d, i) => `${i * 10}ms`)
                .on('click', (e, d) => {
                    selectedCountry &&
                        document.querySelector(`g.${selectedCountry.Code}`)?.classList.remove('selected');
                    selectedCountry = d;
                    document.querySelector(`g.${selectedCountry?.Code}`)?.classList.add('selected');
                });

            countries
                .append('rect')
                .attr('class', 'line background')
                .attr('width', width + 15)
                .attr('height', centerY * 2)
                .attr('fill-opacity', '.01')
                .attr('opacity', 0);
            countries
                .append('line')
                .attr('class', 'label line')
                .attr('x1', (d) => 0)
                .attr('x2', (d) => width + 15)
                .attr('y1', centerY)
                .attr('y2', centerY)
                .attr('stroke', '#444')
                .attr('stroke-width', '1');
            countries
                .append('line')
                .attr('class', 'progress line')
                .attr('x1', (d) => Math.max(0, xScale(d.begin)))
                .attr('x2', (d) => xScale(d.end))
                .attr('y1', centerY)
                .attr('y2', centerY)
                .attr('animation-duration', `${Math.random() * 2}s`)
                .on('mouseover', () => tooltip.style('visibility', 'visible'))
                .on('mousemove', (event, d) => {
                    const level = d['GT1'];
                    tooltip.html(`Maturity level: <b>${level}</b>`);
                    tooltip.style('top', event.pageY + 20 + 'px').style('left', event.pageX + -30 + 'px');
                })
                .on('mouseout', () => tooltip.style('visibility', 'hidden'));

            const arc = (startAngle: number, endAngle: number) =>
                d3.arc()({
                    innerRadius: 0,
                    outerRadius: 5,
                    startAngle,
                    endAngle,
                });

            countries
                .selectAll('g')
                .data((d) => d.grouped)
                .join('g')
                .attr('class', 'line_radial')
                .attr('transform', (d) => `translate(${xScale(+d.year)}, ${centerY})`)
                .attr('transform-origin', (d) => `${xScale(+d.year)} ${centerY}`)
                .on('mouseover', () => tooltip.style('visibility', 'visible'))
                .on('mousemove', (event, d) => {
                    tooltip.html(
                        `<b>${d.year}</b>` +
                            d.values
                                .map((v) => `<br/>${EGOV_COL_LABELS[v]}`)
                                .sort()
                                .join('')
                    );
                    tooltip.style('top', event.pageY + 20 + 'px').style('left', event.pageX + -30 + 'px');
                })
                .on('mouseout', () => tooltip.style('visibility', 'hidden'))
                .selectAll('path')
                .data((d) =>
                    d.values.map((value, index) => {
                        return { year: d.year, value, index, count: d.values.length };
                    })
                )
                .join('path')
                .filter((d) => d.year > chartBeginYear)
                .attr('transform', (d) => `scale(${1 + d.count / 8})`)
                .attr('d', (d) => arc((d.index / d.count) * 2 * Math.PI, ((1 + d.index) / d.count) * 2 * Math.PI))
                .style('fill', (d) => COLOR_SCALE[EGOV_COLS.findIndex((c) => c == d.value)]);

            const indices = countries
                .append('g')
                .attr('class', 'indices')
                .attr('transform', `translate(${width + 20},${centerY})`);
            indices.append('text').text((d) => d['GTMI']?.toFixed(3));
            countries
                .append('text')
                .attr('class', 'label')
                .attr('x', -10)
                .attr('y', centerY)
                .text((d) => d.Code)
                .append('title')
                .text((d) => d.Economy);
        });
    });
</script>

<svelte:head>
    <title>Data Governance Maturity Indicators</title>
</svelte:head>

<section>
    <div class="page">
        <div id="tooltip" />
        <div class="chart">
            <div class="mainChartWrap">
                <svg width="100%" height="15" class="topLegend">
                    <text x={margin.left - 10} y={10}>Country</text>
                    <text x={width + margin.left + 40} y={10}>GTMI</text>
                </svg>
                <svg bind:this={svgElem} />
            </div>
            <div class="description">
                <h1>Data Governance<br /> Maturity Indicators</h1>
                <i> The State of GovTech Foundational Blocks in 198 economies </i>
                <br />
                <div class="svgLegend">
                    Legend
                    <svg width="300" height="350">
                        <g class="maturityGroupA">
                            <line class="progress line" x1="10" x2="25" y1="325" y2="325" />
                        </g>
                        <text x="30" y="329">Digital Governance Maturity</text>
                    </svg>

                    <div>
                        Data source: <a
                            href="https://datacatalog.worldbank.org/search/dataset/0037889/govtech-dataset"
                            target="_blank"
                        >
                            THE WORLD BANK
                        </a>
                    </div>
                </div>
            </div>
            <svg bind:this={svgXElem} class="svgX" />
            <div class="countryDetailWrap">
                <CountryDetail bind:row={selectedCountry} />
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    .chart {
        position: relative;
        display: grid;
        grid-template-areas:
            'legend chart'
            'legend axis'
            'legend detail';
        grid-auto-columns: 350px auto;
        grid-auto-rows: 42vh 25px auto;
        animation: fadeIn 1s ease-in-out;
        cursor: pointer;
        height: calc(100vh - var(--headerHeight, 2em));
    }

    .mainChartWrap {
        grid-area: chart;
        text-align: left;
        height: 42vh;
        overflow-x: hidden;
    }
    .svgX {
        grid-area: axis;
        position: sticky;
        bottom: 0;
        background: #202022;
    }
    .description {
        text-align: left;
        min-width: 300px;
        margin: 1em;
        grid-area: legend !important;
        .svgLegend {
            margin-top: 6ex;
        }
        svg {
            margin: 0 0 6ex 0;
        }
    }
    .countryDetailWrap {
        grid-area: detail;
        overflow-x: hidden;
        height: 100%;
    }

    .page {
        width: auto;
        overflow-x: auto;
        overflow-y: auto;
        display: block;
        :global(.country:hover),
        :global(.country.selected) {
            :global(rect) {
                animation: fadeIn 0.2s ease-out;
                animation-fill-mode: forwards;
            }
            :global(text) {
                dominant-baseline: central;
                font-weight: bold;
                font-size: 0.8em;
            }
            :global(.label.line) {
                stroke-width: 2;
            }
            :global(.line_radial path) {
                animation: scalePlus 0.2s ease-out;
                animation-fill-mode: forwards;
            }
            :global(.line.background) {
                fill-opacity: 1;
            }
            :global(.line.progress) {
                stroke: #bbb;
            }
        }

        :global(.L .line.background) {
            fill: #433;
            fill-opacity: 0.6;
        }

        :global(.LM .line.background) {
            fill: #343;
        }

        :global(.UM .line.background) {
            fill: #545;
        }

        :global(.H .line.background) {
            fill: #335;
        }

        :global(.progress.line) {
            stroke: #445;
            stroke-dasharray: 100%;
            // animation: strokeDashoffset 2s ease-in;
            // animation-fill-mode: freeze;
        }
        :global(.maturityGroupD .progress.line) {
            opacity: 0.5;
            stroke-width: 4;
        }
        :global(.maturityGroupC .progress.line) {
            opacity: 0.65;
            stroke-width: 4;
        }
        :global(.maturityGroupB .progress.line) {
            opacity: 0.75;
            stroke-width: 5;
        }
        :global(.maturityGroupA .progress.line) {
            opacity: 1;
            stroke-width: 5;
        }

        :global(.indices text) {
            dominant-baseline: central;
            font-size: 0.6em;
        }
        :global(.label) {
            dominant-baseline: central;
            font-size: 0.6em;
            text-anchor: end;
        }
        :global(.legend) {
            dominant-baseline: central;
            font-size: 0.6em;
        }
        :global(.country) {
            animation: fadeIn 2s ease-in-out;
            animation-fill-mode: freeze;
        }

        #tooltip {
            background: #202022;
            border-radius: 2px;
            padding: 0.2ex 1ex;
            z-index: 100;
            font-size: 1em;
        }
    }
    .topLegend {
        position: sticky;
        top: 0px;
        background-color: #202022;
        padding-top: 20px;
        font-size: 0.7em;
        grid-area: chart;
    }
    .topLegend:first-child {
        text-anchor: end;
    }
    .topLegend:last-child {
        text-anchor: start;
    }
</style>
