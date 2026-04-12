<script lang="ts">
  import { axisBottom, extent, scaleLog, scaleSqrt, select } from "d3";
  import { onMount } from "svelte";
  import type { CountrySize } from "./model";

  /** @type {import('./$types').PageProps} */
  let { data } = $props() as {
    data: {
      countrySizes: CountrySize[];
    };
  };

  let chartContainer: HTMLDivElement | null = null;
  const interCirclePadding = 3;
  const axisPadding = 3;

  onMount(() => {
    const sorted = data.countrySizes.sort((a, b) => b.size - a.size);

    const width = 1200;
    const height = 600;
    const marginRight = 40;
    const marginLeft = 40;
    const marginBottom = 40;

    const scaleX = scaleLog()
      .domain(extent(data.countrySizes.map((d) => d.size)) as [number, number])
      .range([marginLeft, width - marginRight])
      .nice();

    const radiusScale = scaleSqrt()
      .domain(extent(data.countrySizes.map((d) => d.size)) as [number, number])
      .range([3, 18]);
    const svg = select(chartContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(axisBottom(scaleX).tickSizeOuter(0).ticks(3))

      .append("text")
      .attr("x", width - 15)
      .attr("y", 16)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#333")
      .text("km2");

    function drawSwarm() {
      const g = svg.append("g");

      const baseline = height - marginBottom;

      const countries = g
        .selectAll(".country")
        .data(
          dodge(sorted, {
            radius: (d: CountrySize) => radiusScale(d.size) * 2,
            x: (d: CountrySize) => scaleX(d.size),
          }),
        )

        .join("g")
        .attr("class", "country")
        .attr(
          "transform",
          (d: any) => `translate(${d.x}, ${baseline - d.y - axisPadding})`,
        );

      countries
        .append("circle")
        .attr("r", (d) => d.r)
        .attr("class", (d) => (d.data.size > 3_000_000 ? "major" : ""))
        .on("mouseenter", (event: MouseEvent, datum: any) => {
          const data = datum.data as CountrySize;
          tooltip
            .style("opacity", 1)
            .html(
              `<b>${data.country}</b><br/>
                <b>${data.size.toLocaleString()}</b> km2 <br/>
                `,
            )
            .style("left", event.pageX + 8 + "px")
            .style("top", event.pageY + 8 + "px");
        })
        .on("mouseleave", () => {
          tooltip.style("opacity", 0);
        });

      countries
        .filter((d) => d.data.size > 3_000_000)
        .append("text")
        .attr("class", "label")
        .style("font-size", (d) => (d.data.size > 10_000_000 ? 13 : 10))
        .text((d) => d.data.code);
    }

    drawSwarm();

    // tooltip
    const tooltip = select(chartContainer)
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "rgba(0,0,0,0.8)")
      .style("color", "#fff")
      .style("padding", "6px 8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("opacity", 0);

    return svg.node();
  });

  const dodge = (
    data: any[],
    {
      radius,
      x,
    }: { radius: (x: CountrySize) => number; x: (a: CountrySize) => number },
  ) => {
    const circles: {
      x: number;
      y: number;
      r: number;
      next?: any;
      data: CountrySize;
    }[] = data
      .map((d) => ({ x: x(d), y: radius(d), r: radius(d), data: d }))
      .sort((a, b) => a.x - b.x);

    const epsilon = 1e-3;
    let head: any = null,
      tail: any = null;

    // Returns true if circle ⟨x,y⟩ with radius r intersects any circle in the queue.
    function intersects(xp: number, yp: number, rp: number) {
      let a = head;
      while (a) {
        const dx = a.x - xp;
        const dy = a.y - yp;
        const rr = a.r + rp + interCirclePadding;
        if (rr * rr - epsilon > dx * dx + dy * dy) {
          return true;
        }
        a = a.next;
      }
      return false;
    }

    // Place each circle sequentially.
    for (const b of circles) {
      // Remove circles from the queue that can’t intersect the new circle b.
      while (head && head.x < b.x - (b.r + (head.r || 0) + interCirclePadding))
        head = head.next;

      // Start at baseline (center above baseline by its radius).
      // Choose the minimum non-intersecting tangent above the baseline.
      if (intersects(b.x, b.y, b.r)) {
        let a = head;
        b.y = Infinity;
        do {
          const dx = a.x - b.x;
          const rr = (a.r + b.r + interCirclePadding) ** 2 - dx * dx;
          if (rr > 0) {
            const y1 = a.y + Math.sqrt(rr);
            const y2 = a.y - Math.sqrt(rr);
            if (
              y1 >= b.r + interCirclePadding &&
              y1 < b.y &&
              !intersects(b.x, y1, b.r)
            )
              b.y = y1;
            if (
              y2 >= b.r + interCirclePadding &&
              y2 < b.y &&
              !intersects(b.x, y2, b.r)
            )
              b.y = y2;
          }
          a = a.next;
        } while (a);
      }

      // Add b to the queue.
      b.next = null;

      if (head === null) head = tail = b;
      else tail = tail!.next = b;
    }
    return circles;
  };
</script>

<svelte:head>
  <title>Countries by size (2022)</title>
</svelte:head>

<section>
  <div class="page">
    <div class="content">
      <h1>Countries by size (2022)</h1>

      <p class="desc">
        <b>30-day Chart Challenge 2026</b>
        <br />
        <i> day 12: distributions - theme: Flowing data</i>
      </p>

      <div class="charts" bind:this={chartContainer}></div>

      <div style="text-align: center; margin-bottom:2em">
        Data source:
        <a href="https://data.worldbank.org/indicator/AG.LND.TOTL.K2">
          World Bank Group
        </a>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .page {
    background: #ddd;
    color: #111;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 90vh;
    align-items: center;

    .content {
      width: 1200px;
      position: relative;
      margin: 3em;
      overflow: visible;
    }
    h1 {
      font-family: "Gotham SSm A", "Gotham SSm B", Montserrat, "Gill Sans",
        "Century Gothic", ui-sans-serif, sans-serif;
      font-weight: normal;
      position: absolute;
      top: 50px;
      left: 50px;
      margin: 0;
      padding: 1em 0;
    }

    .desc {
      position: absolute;
      top: 100px;
      left: 50px;
      line-height: 1.8em;
    }

    a {
      color: #111;
    }
    :global(circle) {
      fill: #555;
    }

    :global(circle.major) {
      fill: rgb(205, 172, 89);
    }
    :global(.label) {
      fill: #fafafa;
      pointer-events: none;
      text-anchor: middle;
      dominant-baseline: middle;
      font-size: 7pt;
    }
  }
</style>
