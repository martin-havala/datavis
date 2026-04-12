<script lang="ts">
  import {
    axisBottom,
    axisLeft,
    extent,
    interpolateRainbow,
    scaleBand,
    scaleLog,
    select,
  } from "d3";
  import { onMount } from "svelte";

  import type { PesticidesAndLand } from "./model";
  export let data: { use: PesticidesAndLand[] };

  console.log("landUse", data.use);

  let svgElement: SVGSVGElement | null = null;
  const margins = { left: 120, right: 20, top: 20, bottom: 20 };
  const width = 1000;
  const height = 600;

  onMount(() => {
    if (!svgElement) return;

    const scaleX = scaleLog()
      .domain(extent(data.use.map((a) => a.land_ag_ha)) as [number, number])
      .range([margins.left, width - margins.right])
      .nice();

    const countryScale = scaleBand(
      data.use.map((d) => d.country),
      [0, 1],
    );

    const scaleY = scaleLog()
      .domain(extent(data.use.map((a) => a.pesticides_t)) as [number, number])
      .range([height - margins.bottom, margins.top])
      .nice();

    const color = (country: string) =>
      interpolateRainbow(countryScale(country)!);

    const svg = select(svgElement)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margins.bottom})`)
      .call(axisBottom(scaleX).tickSizeOuter(0).ticks(5));

    // y axis
    svg
      .append("g")
      .attr("transform", `translate(${margins.left},0)`)
      .call((g) => g.call(axisBottom as any));

    svg
      .append("g")
      .attr("transform", `translate(${margins.left},0)`)
      .call((g) => g.call((d) => {}));

    // proper y axis using axisLeft
    svg
      .append("g")
      .attr("transform", `translate(${margins.left},0)`)
      .call((g) => g.call(axisLeft(scaleY)));

    // tooltip container (HTML) appended to the charts wrapper
    const tooltip = select(svgElement.parentElement as any)
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "rgba(0,0,0,0.8)")
      .style("color", "#aaa")
      .style("padding", "6px 8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("opacity", "0");

    // plot points with interactive tooltip
    svg
      .append("g")
      .selectAll("circle")
      .data(data.use)
      .join("circle")
      .attr("cx", (d: PesticidesAndLand) => scaleX(d.land_ag_ha))
      .attr("cy", (d: PesticidesAndLand) => scaleY(d.pesticides_t))
      .attr("fill", (d) => color(d.country))
      .attr("r", (d) => (d.year < 2020 ? 12 : 6))
      .attr("opacity", (d) => (d.year < 2020 ? 0.5 : 1))
      .on("mouseenter", function (event: any, d: PesticidesAndLand) {
        tooltip
          .html(
            `<strong>${d.country}</strong><br/>Land: ${d.land_ag_ha.toLocaleString()} ha<br/>Pesticides: ${d.pesticides_t.toLocaleString()} t<br/>Year: ${d.year}`,
          )
          .style("opacity", "1");
      })
      .on("mousemove", function (event: any) {
        const [px, py] = [event.pageX + 12, event.pageY + 12];
        tooltip.style("left", px + "px").style("top", py + "px");
      })
      .on("mouseleave", function () {
        tooltip.style("opacity", "0");
      });
  });
</script>

<svelte:head>
  <title>RSF World Press Freedom Index</title>
</svelte:head>

<section>
  <div class="page">
    <h1>OECD countries fertilizer use</h1>

    <p style="text-align:center; line-height: 1.8em;">
      <b>30-day Chart Challenge 2026</b>
      <br />
      <i> day 15: Relationships - correlation</i>
    </p>
    <p style="max-width:50%; text-align:center"></p>

    <div class="charts">
      <svg bind:this={svgElement}></svg>
    </div>

    <div style="text-align: center; margin-bottom:2em">
      Data source: <a href="https://www.oecd.org/en/data/datasets/oecd-DE.html">
        OECD
      </a>
    </div>
  </div>
</section>

<style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    a {
      color: #aaa;
    }
    :global(text) {
      fill: #aaa;
    }

    :global(.domain),
    :global(path),
    :global(line) {
      stroke: #aaa;
    }
  }
</style>
