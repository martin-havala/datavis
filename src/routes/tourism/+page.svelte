<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import allArrivals from '$lib/assets/tourism/arrivals.json';
    import countries from '$lib/assets/tourism/countries.json';

    // set the dimensions and margins of the graph
    let margin = { top: 30, right: 50, bottom: 10, left: 80 },
        width = 1000 - margin.left - margin.right,
        height = 780 - margin.top - margin.bottom;
    const arrivals = allArrivals.filter((a) => a.year == '2022');

    const arrivalsGroupped = d3
        .stack()
        .keys(['m01', 'm02', 'm03', 'm04', 'm05', 'm06', 'm07', 'm08', 'm09', 'm10', 'm11', 'm12'])(arrivals);
    const maxPopulation = d3.max(arrivals.map((c) => +c.population));
    const maxCount = d3.max(arrivals.map((c) => +c.total));

    const chart1Height = height * 0.55;
    const chart1Margin = height * 0.03;
    const chart2Height = height * 0.35;
    // append the svg object to the body of the page
    let svgElem: SVGElement;
    let svg;
    onMount(() => {
        // get the data

        svg = d3
            .select(svgElem)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        const xScale = d3
            .scaleBand()
            .range([0, width])
            .domain(
                arrivals.map(function (d) {
                    return d.geo;
                })
            );
        xScale.padding(1);

        svg.append('g')
            .attr('transform', 'translate(0,' + chart1Height + ')')
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('text-anchor', 'middle')
            .append('title')
            .text((d) => countries[d]);

        const topLegend = svg
            .append('g')
            .attr('class', 'topLegend')
            .attr('transform', 'translate(0,' + -10 + ')');

        topLegend
            .append('text')
            .attr('transform', 'translate(-50,' + -10 + ')')
            .text('#people (milions)')
            .style('font-size', '12');

        topLegend
            .append('circle')
            .attr('r', '5')
            .style('fill', '#fefe8e')
            .attr('stroke', 'black')
            .attr('transform', 'translate(90,' + -15 + ')');

        topLegend
            .append('text')
            .attr('transform', 'translate(100,' + -10 + ')')
            .text('Population')
            .style('font-size', '12');

        topLegend
            .append('circle')
            .attr('r', '5')
            .style('fill', '#f84')
            .attr('stroke', 'black')
            .attr('transform', 'translate(190,' + -15 + ')');

        topLegend
            .append('text')
            .attr('transform', 'translate(200,' + -10 + ')')
            .text('Population bellow arrival count')
            .style('font-size', '12');

        topLegend
            .append('text')
            .attr('transform', 'translate(500,' + -10 + ')')
            .text('Number of arrivals (by months)')
            .style('font-size', '12');

        for (let i = 0; i < 12; i++) {
            topLegend
                .append('line')
                .attr('transform', 'translate(430,' + -20 + ')')
                .attr('x1', i * 5)
                .attr('x2', i * 5)
                .attr('y1', 0)
                .attr('y2', 10)
                .attr('dominant-baseline', 'middle')
                .style('stroke', `rgb(${155 + i * 8},${155 + i * 8},${256 - i * 22})`);
        }

        let y = d3
            .scaleLinear()
            .domain([0, Math.max(maxPopulation, maxCount)])
            .range([chart1Height, 0])
            .nice();

        svg.append('g').call(d3.axisLeft(y).tickFormat((n) => n / 1000000));
        svg.append('g').attr('opacity', '.2').call(d3.axisLeft(y).tickSize(-width, 0).tickFormat(''));

        // // Lines2
        svg.append('g')
            .selectAll('lines_months')
            .data(arrivals)
            .join('line')
            .attr('x1', function (d) {
                return xScale(d.geo);
            })
            .attr('x2', function (d) {
                return xScale(d.geo);
            })
            .attr('y1', function (d) {
                return y((d.average ?? 0) * 12);
            })
            .attr('display', function (d) {
                return y(d.average) ? 'block' : 'none';
            })
            .attr('y2', chart1Height)
            .attr('stroke', 'grey');

        // Circles2
        svg.append('g')
            .selectAll('visitors')
            .data(arrivalsGroupped)
            .join('g')
            .selectAll('line')
            .data((d, i) => {
                return d.map((n) => ({ ...n, index: i }));
            })
            .join('line')
            .attr('x1', (d) => {
                return xScale(d.data.geo) - 4;
            })
            .attr('x2', (d) => {
                return xScale(d.data.geo) + 4;
            })
            .attr('y1', (d) => {
                return y(d[1] ?? 0);
            })
            .attr('y2', (d) => {
                return y(d[1] ?? 0);
            })
            // .attr('display', (d) => (y2(d.average) ? 'block' : 'none'))
            .attr('r', '3')
            .style('stroke', (d) => {
                return `rgb(${155 + d.index * 8},${155 + d.index * 8},${256 - d.index * 22})`;
            })
            .attr('stroke', 'black')
            .attr('stroke-width', '1pt');

        // Lines
        svg.append('g')
            .attr('class', 'lines')
            .selectAll('lines')
            .data(arrivals)
            .join('line')
            .attr('x1', function (d) {
                return xScale(d.geo);
            })
            .attr('x2', function (d) {
                return xScale(d.geo);
            })
            .attr('y1', function (d) {
                return y(d.population);
            })
            .attr('y2', y(0))
            .attr('stroke', '#fefe8e')
            .attr('opacity', '.4')
            .attr('stroke-width', '1px');

        // Circles
        svg.append('g')
            .attr('class', 'circles')
            .selectAll('mycircle')
            .data(arrivals)
            .join((enter) => {
                enter
                    .append('circle')
                    .attr('cx', function (d) {
                        return xScale(d.geo);
                    })
                    .attr('cy', function (d) {
                        return y(d.population);
                    })

                    .attr('r', '5')
                    .style('fill', (d) => (d.population < d.total ? '#f84' : '#fefe8e'))
                    .attr('stroke', 'black')
                    .append('title')
                    .text((d) => d.population);
                // enter
                //     .append('text')
                //     .attr('x', function (d) {
                //         return xScale(d.geo);
                //     })
                //     .attr('y', function (d) {
                //         return y(d.population) - 15;
                //     })
                //     .text('🔥')
                //     .attr('font-size', '25')
                //     .attr('text-anchor', 'middle')

                //     .filter((d) => +d.population > d.total)
                //     .remove();
            });

        /////////////////
        // CHART 2

        let yScale2 = d3
            .scaleLinear()
            .domain([0, 12])
            .range([chart1Height + chart1Margin, chart1Height + chart1Margin + chart2Height]);

        svg.append('g')
            .call(
                d3
                    .axisLeft(yScale2)
                    .tickFormat((d) => (d > 0 ? d : ''))
                    .tickSize(0)
            )
            .selectAll('text')
            .attr('transform', 'translate(0,-13)');

        const step = xScale.step();
        const step_2 = step / 2;

        function monthValue(d) {
            return d.data[`m${('0' + (d.index + 1)).slice(-2)}`];
        }
        // waffles
        svg.append('g')
            .selectAll('waffles')
            .data(arrivalsGroupped)
            .join((enter) => {
                enter
                    .selectAll('rect')
                    .data((d, i) => {
                        return d.map((n) => ({ ...n, index: i }));
                    })
                    .join('rect')
                    .attr('x', (d) => {
                        return xScale(d.data.geo) - step_2;
                    })

                    .attr('y', (d) => {
                        return yScale2(d.index);
                    })

                    .attr('width', `${step}`)
                    .attr('height', `${chart2Height / 12}`)
                    .style('fill', (d) => {
                        const value = monthValue(d);
                        let intensity = value / d.data.average;
                        if (intensity > 1) {
                            return `rgb(${50 + intensity * 60},${50 + intensity * 60},${50 + intensity * 10})`;
                        }
                        return `rgb(${50 + (1 - intensity) * 70},50,50)`;
                    })
                    .attr('stroke', 'black')
                    .append('title')
                    .text((d) => {
                        return monthValue(d);
                    });
                // enter
                //     .selectAll('text')
                //     .data((d, i, e) => {
                //         return d.map((n) => ({ ...n, index: i }));
                //     })
                //     .join('text')
                //     .attr('transform', (d) => {
                //         return `translate(${xScale(d.data.geo)},${yScale2(d.index) + step - 4})`;
                //     })
                //     .style('fill', 'black')
                //     .attr('text-anchor', 'middle')
                //     .text((d) => {
                //         const value = monthValue(d);
                //         let intensity = Math.floor(value / d.data.average);
                //         return intensity > 1 ? `×${intensity}` : '';
                //     });
            });

        const legend = svg.append('g').attr('transform', `translate(0, ${height - 40})`);
        const l1 = legend.append('g');
        const l2 = legend.append('g').attr('transform', `translate(0,25)`);
        l1.append('rect')
            .attr('width', `${step}`)
            .attr('height', `${chart2Height / 12}`)
            .attr('fill', 'rgba(130,50,50)');
        l1.append('text')
            .text('below year average ')
            .attr('transform', `translate(${step * 1.6},17)`)
            .style('font-size', '12');
        l2.append('rect')
            .attr('width', `${step}`)
            .attr('height', `${chart2Height / 12}`)
            .attr('fill', '#cece60');
        l2.append('text')
            .text('above year average')
            .attr('transform', `translate(${step * 1.6},17)`)
            .style('font-size', '12');
        // const l3 = legend.append('g').attr('transform', `translate(200,25)`);
        // l3.append('rect')
        //     .attr('width', `${step}`)
        //     .attr('height', `${chart2Height / 12}`)
        //     .attr('fill', '#cece60');
        // l3.append('text')
        //     .text('x2')
        //     .attr('transform', `translate(${chart2Height / 12 - step_2}, ${step - 4})`)
        //     .attr('text-anchor', 'middle')
        //     .attr('fill', 'black');
        // l3.append('text')
        //     .text('how many times above')
        //     .attr('transform', `translate(${step * 1.6},17)`);
    });
</script>

<svelte:head>
    <title>Tourism in EU</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <div class="page">
        <svg bind:this={svgElem} />
        <div class="notes">
            <div>
                <h1>EU Tourism 2022</h1>
                <div>
                    This chart compares foreign tourist arrivals during the year and compares it to country population;
                </div>
                <br />
                <div>Second part highlights the season period in each country</div>
            </div>
            <div class="comments">
                <div>
                    data source - EuroStat:
                    <ul>
                        <li>
                            <a
                                href="https://ec.europa.eu/eurostat/databrowser/view/TOUR_OCC_ARM__custom_5792777/default/table?lang=en"
                                ><i>Arrivals at tourist accommodation establishments - monthly data</i></a
                            >
                        </li>
                        <li>
                            <a href="https://ec.europa.eu/eurostat/databrowser/view/TPS00001/default/table?lang=en">
                                <i>Population on 1 January</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
