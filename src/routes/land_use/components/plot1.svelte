<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import landUseUrl from '../../../assets/land_use/land_use.csv?url';
    import {
        LAND_USE_KEYS,
        LandUseLabels,
        LandUseUnits,
        type LandUsePlot,
    } from '../../../assets/land_use/land_use.model';

    // set the dimensions and margins of the graph
    let margin = { top: 0, right: 0, bottom: 10, left: 25 },
        width = 540 - margin.left - margin.right,
        height = 380 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svgElem: SVGElement;
    let svg: d3.Selection<SVGGElement, unknown, any, any>;
    let xScaleSelection: d3.Selection<SVGGElement, unknown, any, any>;
    let yScaleSelection: d3.Selection<SVGGElement, unknown, any, any>;
    let xScale: d3.ScaleLinear<number, number>;
    let yScale: d3.ScaleLinear<number, number>;

    const preparePlot = (): void => {
        svg = d3
            .select(svgElem)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        xScale = d3.scaleLinear().range([0, width]);

        xScaleSelection = svg
            .append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(xScale).tickFormat((d) => `${d}`));

        yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
        yScaleSelection = svg
            .append('g')
            .call(d3.axisLeft(yScale).tickFormat((t) => `${t}%`))
            .attr('class', 'yScale');
        yScaleSelection
            .append('g')
            .call(
                d3
                    .axisLeft(yScale)
                    .tickSize(-width)
                    .tickFormat((d) => '')
            )
            .style('opacity', '.1');
    };

    const line = (max: number) =>
        d3
            .line()
            .x((p) => xScale(p[0]))
            .y((p) => yScale((100 * p[1]) / max));
    const makeLine = (svg: d3.Selection<SVGGElement, unknown, any, any>, dt: LandUsePlot) => {
        const localYScale = d3.scaleLinear().domain([0, dt.max]).range([height, 0]).nice(2);
        const localYScaleSelection = svg
            .append('g')
            .call(d3.axisLeft(localYScale))
            .attr('class', `yScale ${dt.key}`)
            .style('opacity', '0');
        const lineGroup = svg.append('g').selectAll('.line').data([dt.values]).join('g');
        localYScaleSelection
            .append('text')
            .text(LandUseUnits[dt.key])
            .attr('text-anchor', 'end')
            .attr('x', 0)
            .attr('y', -15);

        localYScaleSelection
            .append('g')
            .call(
                d3
                    .axisLeft(localYScale)
                    .tickSize(-width)
                    .tickFormat((d) => '')
            )
            .style('opacity', '.1');

        lineGroup.append('path').attr('d', line(dt.today)).attr('id', dt.key).attr('class', `plotline ${dt.key}`);

        const stroke = lineGroup
            .append('path')
            .attr('d', line(dt.today))
            .attr('class', `plotline selector ${dt.key}`)
            .style('opacity', '0')
            .style('stroke-width', '10px')

            .on('mouseover', () => {
                localYScaleSelection.style('opacity', '1');
                yScaleSelection.style('opacity', '0');
                stroke.style('opacity', '.2');
            })
            .on('mouseout', () => {
                localYScaleSelection.style('opacity', '0');
                yScaleSelection.style('opacity', '1');
                stroke.style('opacity', '0');
            });
    };

    const processLandUse = (landUse: { [key: string]: LandUsePlot }) => {
        Object.keys(landUse)
            .filter((k) => !k.includes('PC') && k != 'populationDensity')
            .forEach((key) => {
                makeLine(svg, landUse[key]);
            });
    };
    onMount(() => {
        // get the data
        d3.csv(landUseUrl).then((landUse) => {
            const res: { [key: string]: LandUsePlot } = {};
            landUse.forEach((lu) => {
                LAND_USE_KEYS.forEach((key) => {
                    const realKEy = LandUseLabels[key];
                    const value = !!lu[realKEy] && parseFloat(lu[realKEy] as string);
                    const year = +(lu?.Year ?? 0);
                    if (value) {
                        if (res[key]) {
                            res[key].values?.push([year, value]);
                            res[key].max = Math.max(value, res[key].max);
                            res[key].today = value;
                        } else {
                            res[key] = { key, values: [[year, value]], max: value, today: value };
                        }
                    }
                });
            });
            preparePlot();

            xScale.domain([+(landUse[0]?.Year ?? 0), +(landUse[landUse.length - 1]?.Year ?? 0)]);
            xScaleSelection.call(d3.axisBottom(xScale).tickFormat((d) => `${d}`));
            processLandUse(res);
        });
    });
</script>

<g bind:this={svgElem} />
