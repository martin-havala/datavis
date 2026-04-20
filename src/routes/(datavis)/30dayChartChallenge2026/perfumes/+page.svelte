<script lang="ts">
  import {
    arc,
    chord,
    descending,
    format,
    interpolateSpectral,
    range,
    ribbon,
    scaleBand,
    select,
    sum,
    tickStep,
  } from "d3";
  import { onMount } from "svelte";
  import type { Perfume } from "./model";

  let { data } = $props() as {
    data: {
      // perfumes: Perfume[];
      trade: { values: number[][]; tones: number[][]; countries: string[] };
    };
  };

  const mode: "values" | "tones" = "values";
  let chartContainer!: HTMLDivElement;

  function groupTicks(d: any, step: any) {
    const k = (d.endAngle - d.startAngle) / d.value;
    return range(0, d.value, step).map((value) => {
      return { value: value, angle: value * k + d.startAngle };
    });
  }

  onMount(() => {
    // let rawData = $state(data.perfumes);
    // console.log(rawData.slice(0, 10));

    // console.log(
    //   "Base_Notes: ",
    //   new Set(data.perfumes.map((p) => p.Base_Notes).flat()).size,
    // );
    // console.log(
    //   "Middle_Notes: ",
    //   new Set(data.perfumes.map((p) => p.Middle_Notes).flat()).size,
    // );
    // console.log(
    //   "Top_Notes: ",
    //   new Set(data.perfumes.map((p) => p.Top_Notes).flat()).size,
    // );

    // console.log(
    //   "All notes: ",
    //   new Set([
    //     ...data.perfumes.map((p) => p.Base_Notes).flat(),
    //     ...data.perfumes.map((p) => p.Middle_Notes).flat(),
    //     ...data.perfumes.map((p) => p.Top_Notes).flat(),
    //   ]).size,
    // );

    // console.log(new Set(data.perfumes.map((p) => p.Main_Accords).flat()));

    const width = 2_000;
    const height = width;

    const outerRadius = Math.min(width, height) * 0.5 - 120;
    const innerRadius = outerRadius - 11;
    const tickStepVal = tickStep(0, sum(data.trade[mode].flat()), 20);
    const formatValue = format(",.2r");
    const formatValue2 = format(",.4r");

    const chordGenerator = chord()
      .padAngle(7 / innerRadius)
      .sortSubgroups(descending)
      .sortChords(descending);
    const arcGenerator = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const ribbonGenerator = ribbon()
      .radius(innerRadius - 7)
      .padAngle(5.0 / innerRadius);

    const countryScale = scaleBand(data.trade.countries, [0, 1]);
    const color = (country: string) =>
      country === "Other"
        ? "#777"
        : interpolateSpectral(countryScale(country) ?? 0);

    const svg = select(chartContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const chords = chordGenerator(data.trade[mode]);
    const group = svg.append("g").selectAll().data(chords.groups).join("g");

    group
      .append("path")
      .attr("fill", (d) => color(data.trade.countries[d.index]))
      .attr("d", (d) => arcGenerator(d as any))
      .attr("stroke", (d) => color(data.trade.countries[d.index]))
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");

    group
      .append("title")
      .text(
        (d) => `${data.trade.countries[d.index]}\n${formatValue2(d.value)}`,
      );

    const groupTick = group
      .append("g")
      .selectAll()
      .data((d) => groupTicks(d, tickStepVal))
      .join("g")
      .attr(
        "transform",
        (d) =>
          `rotate(${(d.angle * 180) / Math.PI - 90}) translate(${outerRadius},0)`,
      );

    groupTick
      .append("line")
      .attr("stroke", "currentColor")
      .attr("stroke-width", ".5")
      .attr("x2", 6);

    groupTick
      .append("text")
      .attr("x", 8)
      .attr("dy", "0.35em")
      .attr("font-size", "19")
      .attr("transform", (d) =>
        d.angle > Math.PI ? "rotate(180) translate(-16)" : null,
      )
      .attr("text-anchor", (d) => (d.angle > Math.PI ? "end" : null))
      .text((d) => formatValue(d.value));

    group
      .select("text")

      .text(function (d) {
        return (this as any).getAttribute("text-anchor") === "end"
          ? `↑ ${data.trade.countries[d.index]}`
          : `${data.trade.countries[d.index]} ↓`;
      });

    svg
      .append("g")
      .selectAll("path")
      .data(chords)
      .join("path")
      .attr("class", "ribbons")
      .attr("fill", (d) => color(data.trade.countries[d.source.index]))
      .attr("d", ribbonGenerator as any)
      .append("title")
      .text(
        (d) =>
          `${data.trade.countries[d.source.index]} → ${data.trade.countries[d.target.index]} : ${formatValue2(d.source.value)}${
            d.source.index === d.target.index
              ? ""
              : `\n${data.trade.countries[d.target.index]} → ${data.trade.countries[d.source.index]} : ${formatValue2(d.target.value)}`
          }`,
      );
  });
</script>

<section>
  <div class="page">
    <h1>Perfumes</h1>

    <p style="text-align:center; line-height: 1.8em;">
      <b>30-day Chart Challenge 2026</b>
      <br />
      <i> day 14: relationships - trade</i>
    </p>
    <p style="max-width:50%; text-align:center">
      Biggest exporters of perfumes (by value in USD) for 2024
    </p>
    <div
      bind:this={chartContainer}
      style="text-align:center; line-height: 1.8em;"
    ></div>
    <div style="text-align: center; margin-bottom:2em">
      Data source: <a
        href="https://oec.world/en/profile/hs/perfumes?selector1699id=usdOption#bespoke-title-929"
      >
        oec.world
      </a>
    </div>
  </div>
</section>

<style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    :global(svg) {
      max-width: 80vmin;
      max-height: 80vmin;
    }

    :global(.ribbons) {
      mix-blend-mode: screen;
      fill-opacity: 0.8;
    }
  }
</style>
