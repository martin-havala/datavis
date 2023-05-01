<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import eGovURL from '$lib/assets/eGov/e_gov.csv?url';
    import type { eGov } from '$lib/assets/eGov/e_gov.model';

    let margin = { top: 0, right: 60, bottom: 0, left: 50 },
        width = 1000 - margin.left - margin.right,
        height = 2200 - margin.top - margin.bottom;

    let svgElem: SVGGElement;
    let svgXElem: SVGGElement;
    let svgSelection: d3.Selection<SVGGElement, unknown, any, any>;
    let data: eGov[] = [];
    const yCols = [
        'UN e-Gov Dev Index_DG Yr', // E-Gov strategy was launched
        'GovTech_GT since', // Year of establishing GovTech Institution
        'Financial Management Information System_Op Yr', // TS/FMIS became operational
        'Tax Administration_TMIS Yr', // Tax admin system became operational
        'Customs Administration_CMIS Yr', // Customs administration became operational
        'e-Filing_eFil Yr', // E-Filing administration became operational
        'e-Payment_ePay Yr', // E-Payment became operational
        'Digital Signature_Dsign Yr', // E-Payment is being used
    ];
    const yColLabels = {
        'GovTech_GT since': 'Establishing GovTech Institution',
        'UN e-Gov Dev Index_DG Yr': 'E-Gov strategy launch',
        'Financial Management Information System_Op Yr': 'Financial Management IS',
        'Tax Administration_TMIS Yr': 'Tax admin system',
        'Customs Administration_CMIS Yr': 'Customs administration',
        'e-Filing_eFil Yr': 'E-Filing',
        'e-Payment_ePay Yr': 'E-Payment',
        'Digital Signature_Dsign Yr': 'E-Payment',
    };

    const maturityLevels = {
        A: 'Optimized / Sustained',
        B: 'Proactive / Operational',
        C: 'Reactive / Discovery',
        D: 'Basic / Nascent',
    };
    const colorScale = d3.schemeTableau10;

    onMount(() => {
        // get the data
        d3.csv(eGovURL, d3.autoType).then((resData) => {
            data = resData as eGov[];

            const world = yCols.reduce((a, key) => ({ ...a, [key]: d3.median(data.map((d) => d[key])) }), {} as eGov);
            world['DG Systems & Services_Code'] = 'World';
            world['GTMI > Expert opinion for weights_GTMI'] = d3.median(
                data.map((d) => d['GTMI > Expert opinion for weights_GTMI'])
            );
            world['Data Governance Maturity_Grp'] = data.map((d) => d['Data Governance Maturity_Grp']).sort()[
                Math.floor(data.length / 2)
            ];
            world['Country Data_Level'] = data.map((d) => d['Country Data_Level']).sort()[Math.floor(data.length / 2)];
            data.push(world);
            data.forEach((d) => {
                [d.begin, d.end] = d3.extent(yCols.map((key) => d[key]).filter(Boolean));
            });

            data.sort((a, b) =>
                a['DG Systems & Services_Code'] == 'World' ||
                a['GTMI > Expert opinion for weights_GTMI'] > b['GTMI > Expert opinion for weights_GTMI']
                    ? -1
                    : 1
            );
            svgSelection = d3
                .select(svgElem)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            const xScale = d3.scaleLinear([1975, 2020], [0, width]);
            const legend = d3
                .select('.svgLegend svg')
                .selectAll('legend')
                .data(yCols)
                .join('g')
                .attr('transform', (d, i) => `translate(10,${20 + i * 20})`);

            legend
                .append('circle')
                .attr('cx', 10)
                .attr('cy', -4)
                .attr('r', 4)
                .attr('fill', (d, i) => colorScale[i])
                .attr('stroke', (d, i) => colorScale[i]);
            legend
                .append('text')
                .attr('x', 20)
                .text((d) => `${yColLabels[d]} `);

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
                .domain(data.map((d) => d['DG Systems & Services_Code']))
                .range([0, height])
                .paddingOuter(0);

            const centerY = yScale.bandwidth() / 2;

            // create a tooltip
            var tooltip = d3.select('#tooltip').style('position', 'absolute').style('visibility', 'hidden');

            const countries = svgSelection
                .selectAll('country')
                .data(data)
                .join('g')
                .attr(
                    'class',
                    (d) =>
                        `country ${d['DG Systems & Services_Code']} ${d['Country Data_Level']} maturityGroup${d['Data Governance Maturity_Grp']}`
                )
                .attr('transform', (d) => `translate(0,${yScale(d['DG Systems & Services_Code'])})`);

            countries
                .append('rect')
                .attr('class', 'line background')
                .attr('x', -1 - 10)
                .attr('width', width + 30)
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
                .on('mouseover', () => tooltip.style('visibility', 'visible'))
                .on('mousemove', (event, d) => {
                    const level = d['Data Governance Maturity_Grp'];
                    tooltip.html(`Maturity level: <b>${level}</b> <br/>(${maturityLevels[level]})`);
                    tooltip.style('top', event.pageY + 20 + 'px').style('left', event.pageX + -30 + 'px');
                })
                .on('mouseout', () => tooltip.style('visibility', 'hidden'));

            yCols.forEach((key: string, i: number) => {
                countries
                    .append('circle')
                    .filter((d) => !!d[key] && !isNaN(d[key]))
                    .attr('cx', (d) => xScale(d[key]) + i * 2 - yCols.length)
                    .attr('cy', (d) => centerY)
                    .attr('r', 4)
                    .attr('fill', (d) => colorScale[i])
                    .attr('stroke', (d) => colorScale[i])
                    .on('mouseover', () => tooltip.style('visibility', 'visible'))
                    .on('mousemove', (event, d) => {
                        tooltip.text(`${yColLabels[key]}: ${d[key]}`);
                        tooltip.style('top', event.pageY + 20 + 'px').style('left', event.pageX + -30 + 'px');
                    })
                    .on('mouseout', () => tooltip.style('visibility', 'hidden'));
            });

            const indices = countries
                .append('g')
                .attr('class', 'indices')
                .attr('transform', `translate(${width + 20},${centerY})`);
            indices.append('text').text((d) => d['GTMI > Expert opinion for weights_GTMI']?.toFixed(3));
            countries
                .append('text')
                .attr('class', 'label')
                .attr('x', -10)
                .attr('y', centerY)
                .text((d) => d['DG Systems & Services_Code']);
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
                <svg width="100%" height="20" class="topLegend">
                    <text x={margin.left - 10} y={10}>Country</text>
                    <text x={width + margin.left + 50} y={10}>GTMI</text>
                </svg>
                <svg bind:this={svgElem} />
            </div>
            <div class="svgLegend">
                <h1>Data Governance<br /> Maturity Indicators</h1>
                <i> The State of GovTech Foundational Blocks in 198 economies </i>
                <br />

                <svg width="400" height="200">
                    <g class="maturityGroupA">
                        <line class="progress line" x1="10" x2="25" y1="185" y2="185" />
                    </g>
                    <text x="30" y="190">Digital Governance Maturity</text>
                </svg>

                <div>
                    Data source: <a
                        href="https://datacatalog.worldbank.org/search/dataset/0050602/Data-Governance-Maturity-Indicators"
                        target="_blank"
                    >
                        THE WORLD BANK
                    </a>
                </div>
                <br />
            </div>
            <svg bind:this={svgXElem} class="svgX" />
        </div>
    </div>
</section>

<style lang="scss">
    .chart {
        position: relative;
        display: grid;
        grid-template-areas:
            'legend chart'
            'legend axis';
        cursor: pointer;
    }
    .mainChartWrap {
        grid-area: chart;
        height: 95vh;
        overflow: scroll;
        overflow-x: hidden;
    }
    .svgX {
        grid-area: axis;
        position: sticky;
        bottom: 0;
        background: #202022;
    }
    .svgLegend {
        grid-area: legend !important;
        svg {
            margin: 6ex 0;
        }
    }
    .page {
        width: auto;
        overflow-x: auto;
        overflow-y: auto;
        display: block;
        :global(.country:hover) {
            :global(rect) {
                opacity: 1;
            }
            :global(text) {
                dominant-baseline: central;
                font-weight: bold;
                font-size: 0.8em;
            }
            :global(.label.line) {
                stroke-width: 2;
            }
            :global(circle) {
                stroke-width: 6;
            }
            :global(.line.background) {
                fill-opacity: 1;
            }
            :global(.line.progress) {
                stroke: #bbb;
            }
        }

        :global(.LIC .line.background) {
            fill: #222;
        }

        :global(.LMIC .line.background) {
            fill: #333;
        }

        :global(.UMIC .line.background) {
            fill: #444;
        }

        :global(.HIC .line.background) {
            fill: #555;
        }

        :global(.progress.line) {
            stroke: #445;
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

        #tooltip {
            background: #202022;
            border-radius: 2px;
            padding: 0.2ex 1ex;
            z-index: 100;
            font-size: 1.5ex;
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
