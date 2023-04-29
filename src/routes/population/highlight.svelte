<script lang="ts">
    import type { PopulationPosition } from '$lib/assets/population/population.model';
    import * as d3 from 'd3';

    const chartHeight = 680;
    const chartHeightCenter = chartHeight - 130;
    const chartWidth = 200;

    const year = (y: number) => {
        return Math.floor((y - 2030) / 10);
    };
    export let highlight: PopulationPosition;
    const factor = 0.1;
    $: ratio = highlight?.PopTotal_Medium[year(2100)] / highlight?.PopTotal_2020;
    $: density = Math.round(highlight?.PopDensity_Medium[year(2100)]);
    $: density20 = Math.round(highlight?.PopDensity_2020);
    $: mfRatio = (highlight?.PopMale_Medium[year(2100)] / highlight?.PopFemale_Medium[year(2100)]).toFixed(3);
    $: mfRatio20 = (highlight?.PopMale_2020 / highlight?.PopFemale_2020).toFixed(3);
    $: mediumLine = d3
        .line()
        .x((d) => d[0])
        .y((d) => d[1])([
        [0, chartHeightCenter],
        ...highlight?.PopTotal_Medium.map((p, i) => [
            ((i + 1) / 8) * chartWidth,
            chartHeightCenter - chartHeight * factor * (p / highlight?.PopTotal_2020 - 1),
        ]),
    ] as [number, number][]);

    $: projection = d3
        .line()
        .x((d) => d[0])
        .y((d) => d[1])([
        [0, chartHeightCenter],
        ...highlight?.PopTotal_High.map((p, i) => [
            ((i + 1) / 8) * chartWidth,
            chartHeightCenter - chartHeight * factor * (p / highlight?.PopTotal_2020 - 1),
        ]),

        ...[
            [0, chartHeightCenter],
            ...highlight?.PopTotal_Low.map((p, i) => [
                ((i + 1) / 8) * chartWidth,
                chartHeightCenter - chartHeight * factor * (p / highlight?.PopTotal_2020 - 1),
            ]),
        ].reverse(),
    ] as [number, number][]);
    $: projectionStroke = d3
        .line()
        .defined((d) => !!d)
        .x((d) => d[0])
        .y((d) => d[1])([
        [0, chartHeightCenter],
        ...highlight?.PopTotal_High.map((p, i) => [
            ((i + 1) / 8) * chartWidth,
            chartHeightCenter - chartHeight * factor * (p / highlight?.PopTotal_2020 - 1),
        ]),
        null,
        ...[
            [0, chartHeightCenter],
            ...highlight?.PopTotal_Low.map((p, i) => [
                ((i + 1) / 8) * chartWidth,
                chartHeightCenter - chartHeight * factor * (p / highlight?.PopTotal_2020 - 1),
            ]),
        ].reverse(),
    ] as [number, number][]);

    $: positions = {
        lowValue: d3.format('.2s')(highlight.PopTotal_Low[year(2100)] * 1000),
        low:
            chartHeightCenter * 1.01 -
            chartHeight * factor * (highlight.PopTotal_Low[year(2100)] / highlight?.PopTotal_2020 - 1),
        mediumValue: d3.format('.2s')(highlight.PopTotal_Medium[year(2100)] * 1000),
        medium:
            chartHeightCenter -
            chartHeight * factor * (highlight.PopTotal_Medium[year(2100)] / highlight?.PopTotal_2020 - 1),
        highValue: d3.format('.2s')(highlight.PopTotal_High[year(2100)] * 1000),
        high:
            chartHeightCenter * 0.99 -
            chartHeight * factor * (highlight.PopTotal_High[year(2100)] / highlight?.PopTotal_2020 - 1),
    };
</script>

<svg
    class="highlight"
    width={chartWidth}
    height={chartHeight}
    viewBox="0,0,{chartWidth},{chartHeight}"
    style="width:{chartWidth}px;height:{chartHeight}px;"
>
    <g class="cntry {highlight.region} {highlight.subRegion}">
        <path class="range" d={projection} />
        <path class="rangeStroke" d={projectionStroke} />
        <path d="M{chartWidth},{chartHeightCenter},H0 " style="stroke:white; stroke-dasharray:2 2;" />
        <path d="M0,{chartHeightCenter + 7},v-7 M{chartWidth},{chartHeightCenter + 7},v-7 " style="stroke:white;" />
        <path class="medium thick" d={mediumLine} />
        <text class="xAxis start" y={chartHeightCenter + 7}>2020</text>
        <text class="xAxis end" x={chartWidth} y={chartHeightCenter + 7}>2100</text>

        <g transform="translate({chartWidth + 10},0)">
            <text class="position" y={positions.high}>{positions.highValue} (high)</text>
            <text class="position" y={positions.medium}>{positions.mediumValue} (medium)</text>
            <text class="position" y={positions.low}>{positions.lowValue} (low)</text>
        </g>

        {#if highlight}
            <g transform="translate(0,{chartHeightCenter + 40})">
                <rect class="bgr {highlight.region} {highlight.subRegion}" width="20" height="20" x="10" y="0" />
                <text class="countryName" x="35" y="10">
                    {highlight.Location}
                </text>
                <text class="changeValue" x="35" y="30">
                    Population change: {Math.sign(ratio - 1) > 0 ? '+' : ''}{Math.round(100 * ratio - 100)}%
                </text>
                <text class="changeValue" x="35" y="50">
                    Population density per km²: {density20} → {density}
                </text>
                <text class="changeValue" x="35" y="70">
                    Male / Female ratio: {mfRatio20} → {mfRatio}
                </text>
                <text class="changeValue" x="135" y="86" style="font-size: 0.5em">
                    *scenarios for medium fertility
                </text>
            </g>
        {/if}
    </g>
</svg>

<style lang="scss">
    .highlight {
        pointer-events: none;
        position: absolute;
        bottom: 0;
        left: 0;
        min-width: 400px;
        min-height: 300px;
        .thick {
            stroke-width: 2;
            opacity: 1;
            mix-blend-mode: normal;
            stroke: white;
        }
    }
    text {
        text-anchor: start;
        dominant-baseline: baseline;
    }
    .rangeStroke {
        stroke: white;
        stroke-opacity: 0.6;
        stroke-dasharray: 1 2;
        fill: none;
    }
    .countryName,
    .position {
        text-anchor: start;
        dominant-baseline: middle !important;
    }
    .position,
    .xAxis {
        font-size: 0.6em;
        dominant-baseline: hanging;
    }
    .xAxis.end {
        text-anchor: end;
    }
</style>
