<script lang="ts">
  import { axisBottom, extent, scaleLinear, select } from "d3";
  import { onMount } from "svelte";

  import type { PressFreedomData } from "./model";

  /** @type {import('./$types').PageProps} */
  let { data } = $props() as {
    data: {
      res2022: Record<string, PressFreedomData>;
      res2025: Record<string, PressFreedomData>;
    };
  };

  let chartContainer: HTMLDivElement | null = null;

  onMount(() => {
    const dataKeys: (keyof PressFreedomData)[] = [
      "Score",
      "Rank",
      "Political Context",
      "Rank_Pol",
      "Economic Context",
      "Rank_Eco",
      "Legal Context",
      "Rank_Leg",
      "Social Context",
      "Rank_Soc",
      "Safety",
      "Rank_Saf",
    ];

    const res: Record<string, Partial<PressFreedomData>> = {};
    Object.keys(data.res2025).map((key) => {
      res[key] = res[key] ?? ({} as Partial<PressFreedomData>);
      res[key].Country_EN = data.res2025[key].Country_EN;
      res[key].ISO = data.res2025[key].ISO;

      dataKeys
        .filter((key) => !key.includes("Rank"))
        .forEach((dataKey) => {
          (res[key] as any)[dataKey] = data.res2022[key]?.[dataKey]
            ? (+data.res2025[key][dataKey] as number) -
              +data.res2022[key][dataKey]
            : undefined;
        });
    });

    const sorted = Object.values(res).sort((a, b) =>
      a.Score ? (b.Score ? a.Score - b.Score : 1) : 1,
    );

    const width = 1600;
    const height = 900;
    const marginRight = 20;
    const marginLeft = 20;
    const marginTop = 20;
    const marginBottom = 20;
    const radius = 4.5;
    const padding = 0;

    const scaleX = scaleLinear()
      .domain([-60, 60])
      .range([marginLeft, width - marginRight])
      .nice();

    const svg = select(chartContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(axisBottom(scaleX).tickSizeOuter(0).ticks(5));
    svg
      .append("line")
      .attr("x1", width / 2)
      .attr("x2", width / 2)
      .attr("y1", marginTop)
      .attr("y2", height - marginBottom)
      .attr("stroke", "#666")
      .attr("stroke-dasharray", "5 5");

    function drawSwarm(property: keyof PressFreedomData, offset: number) {
      const g = svg.append("g");

      g.append("text")
        .text(property)
        .attr("transform", `translate(${width - marginRight}, ${offset - 8})`)
        .attr("font-size", 16)
        .attr("text-anchor", "end");
      g.selectAll()
        .data(
          dodge(sorted, {
            radius: radius * 2 + padding,
            x: (d: any) => scaleX(d[property]),
          }),
        )
        .join("circle")
        .filter((d) => d.x != null && d.y != null)
        .attr("class", (d) => d.data.ISO)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => offset - marginBottom - radius - padding - d.y)
        .attr("r", radius)
        .on(
          "mouseenter",
          (event: MouseEvent, { data }: { data: PressFreedomData }) => {
            console.log(chartContainer?.querySelectorAll(`.${data.ISO}`), data);
            chartContainer
              ?.querySelectorAll(`.${data.ISO}`)
              .entries()
              .forEach((e) => e[1].setAttribute("fill", "red"));
            tooltip
              .style("opacity", 1)
              .html(
                `<b>${data.Country_EN}</b><br/>
                Score change: ${(data.Score as number).toFixed(2)}<br/>
                Economic Context change: ${(data["Economic Context"] as number).toFixed(2)}<br/>
                Legal Context change: ${(data["Legal Context"] as number).toFixed(2)}<br/>
                Political Context: ${(data["Political Context"] as number).toFixed(2)}<br/>
                Safety change: ${(data.Safety as number).toFixed(2)}<br/>
                Social Context: ${(data["Social Context"] as number).toFixed(2)}<br/>
                `,
              )
              .style("left", event.pageX + 8 + "px")
              .style("top", event.pageY + 8 + "px");
          },
        )
        .on("mouseleave", (event: MouseEvent, { data }) => {
          tooltip.style("opacity", 0);
          chartContainer
            ?.querySelectorAll(`.${data.ISO}`)
            .entries()
            .forEach((e) => e[1].setAttribute("fill", "unset"));
        });
    }

    drawSwarm("Score", 100);
    drawSwarm("Economic Context", 250);
    drawSwarm("Legal Context", 400);
    drawSwarm("Political Context", 550);
    drawSwarm("Safety", 680);
    drawSwarm("Social Context", 830);

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

  interface ChainedPoint {
    x: number;
    y: number;
    next: ChainedPoint | null | undefined;
  }

  const dodge = (
    data: any[],
    { radius, x }: { radius: number; x: (a: any) => any },
  ) => {
    const radius2 = radius ** 2;
    const circles: {
      x: number;
      y: number;
      next?: any;
      data: PressFreedomData;
    }[] = data
      .map((d) => ({ x: x(d), y: null as any, data: d }))
      .sort((a, b) => a.x - b.x);
    const epsilon = 1e-3;
    let head: any = null,
      tail = null;

    // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
    function intersects(x: number, y: number) {
      let a = head;
      while (a) {
        if (radius2 - epsilon > (a.x - x) ** 2 + (a.y - y) ** 2) {
          return true;
        }
        a = a.next;
      }
      return false;
    }

    // Place each circle sequentially.
    for (const b of circles) {
      // Remove circles from the queue that can’t intersect the new circle b.
      while (head && head.x < b.x - radius2) head = head.next;

      // Choose the minimum non-intersecting tangent.
      if (intersects(b.x, (b.y = 0))) {
        let a = head;
        b.y = Infinity;
        do {
          let y1 = a.y + Math.sqrt(radius2 - (a.x - b.x) ** 2);
          let y2 = a.y - Math.sqrt(radius2 - (a.x - b.x) ** 2);
          if (Math.abs(y1) < Math.abs(b.y) && !intersects(b.x, y1)) b.y = y1;
          if (Math.abs(y2) < Math.abs(b.y) && !intersects(b.x, y2)) b.y = y2;
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
  <title>RSF World Press Freedom Index</title>
</svelte:head>

<section>
  <div class="page">
    <h1>RSF World Press Freedom Index</h1>

    <p style="text-align:center; line-height: 1.8em;">
      <b>30-day Chart Challenge 2026</b>
      <br />
      <i> day 6: comparisons - Reporters without borders</i>
    </p>
    <p style="max-width:50%; text-align:center">
      Here is a comparison of changes in RSF World Press Freedom Index scores
      between years 2022 and 2025.<br />
      Sadly, in the most countries of the world being a journalist became harder,
      mostly due to political situation.
    </p>

    <div class="charts" bind:this={chartContainer}></div>

    <div>
      Data source: <a href="https://rsf.org/en/index?year=2025">
        https://rsf.org
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
  }
</style>
