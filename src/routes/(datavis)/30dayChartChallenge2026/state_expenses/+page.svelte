<script lang="ts">
  import expensesFile from "$lib/assets/state_expenses_2024.csv?url";
  import {
    autoType,
    axisBottom,
    csvParse,
    scaleBand,
    scaleLinear,
    scaleOrdinal,
    schemeTableau10,
    select,
    stack as stackKeys,
  } from "d3";

  import { onMount } from "svelte";

  let expenses = $state<
    {
      year: number;
      common_expenses: number;
      wages_tariffs: number;
      goods_services: number;
      transfers: number;
      interest_payments: number;
      capital_expenses: number;
    }[]
  >([]);

  let absoluteValues = $state(false);

  const keys = [
    "Current expenses",
    "Wages",
    "Goods and services",
    "Regular transfers",
    "Interest payments",
    "Capital expenditure",
  ];

  onMount(() => {
    fetch(expensesFile)
      .then((res) => res.text())
      .then((res) => csvParse(res, autoType))
      .then((data) => {
        expenses = data.map((d: any) => {
          const total =
            d["Current expenses"] +
            d["Wages"] +
            d["Goods and services"] +
            d["Regular transfers"] +
            d["Interest payments"] +
            d["Capital expenditure"];
          return {
            year: d.year,
            "Current expenses": d["Current expenses"] / total,
            Wages: d["Wages"] / total,
            "Goods and services": d["Goods and services"] / total,
            "Regular transfers": d["Regular transfers"] / total,
            "Interest payments": d["Interest payments"] / total,
            "Capital expenditure": d["Capital expenditure"] / total,

            "Current expenses_abs": d["Current expenses"],
            Wages_abs: d["Wages"],
            "Goods and services_abs": d["Goods and services"],
            "Regular transfers_abs": d["Regular transfers"],
            "Interest payments_abs": d["Interest payments"],
            "Capital expenditure_abs": d["Capital expenditure"],
            total,
          };
        });
        // draw chart after data is ready
        drawMosaic();
      });
  });

  let chartContainer: HTMLDivElement | null = null;
  let svg: any = null;

  function drawMosaic() {
    if (!chartContainer) return;
    // clear
    select(chartContainer).selectAll("*").remove();

    if (!expenses || expenses.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 40, left: 160 };
    const width =
      Math.min(900, chartContainer.clientWidth || 900) -
      margin.left -
      margin.right;
    const height = 620 - margin.top - margin.bottom;

    svg = select(chartContainer)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = scaleBand()
      .domain(expenses.map((d) => String(d.year)))
      .range([0, width])
      .padding(0.0);

    const stack = stackKeys().keys(keys)(expenses as any);

    const y = scaleLinear().domain([0, 1]).range([height, 0]);

    const color = scaleOrdinal<string>()
      .domain(keys)
      .range(schemeTableau10 as string[]);

    // series groups
    svg
      .selectAll(".serie")
      .data(stack)
      .enter()
      .append("g")
      .attr("class", "serie")
      .attr("fill", (d: any) => color(d.key))
      .selectAll("rect")
      .data((d: any) => d)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(String(d.data.year)) || 0)
      .attr("y", (d: any) => y(d[1]))
      .attr("height", (d: any) => Math.max(0, y(d[0]) - y(d[1])))
      .attr("width", x.bandwidth())
      .attr("stroke", "var(--bg-color, #202022)")
      .attr("stroke-width", 4)
      .on("mouseenter", function (event: any, d: any) {
        const key = (select(this.parentNode as HTMLElement).datum() as any).key;
        const value = d.data[key];

        tooltip
          .style("opacity", 1)
          .html(
            `${key}<br/>${(value * 100).toFixed(1)}%<br/>${d.data[key + "_abs"].toLocaleString()} mil EUR`,
          )
          .style("left", event.pageX + 8 + "px")
          .style("top", event.pageY + 8 + "px");
      })
      .on("mouseleave", () => tooltip.style("opacity", 0));

    // axes
    const xAxis = axisBottom(x as any);

    const xSvg = svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);
    xSvg.selectAll("text").style("text-anchor", "center");
    xSvg.selectAll("line").remove();
    xSvg.selectAll("path").remove();

    // legend
    const legend = svg
      .selectAll(".legend")
      .data(stack.map(([a]) => a))
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d) => `translate(${-8},${y((d[0] + d[1]) / 2)})`)

      .append("text")
      .text((d, i) => keys[i])
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "central")
      .style("font-size", "12px");

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
  }

  $effect(() => {
    if (expenses.length > 0) {
      const stack = stackKeys().keys(keys)(expenses as any);
      svg.selectAll(".serie").data(stack);
    }
  });
</script>

<svelte:head>
  <title>Government expenses of Slovakia</title>
</svelte:head>

<section>
  <div class="page">
    <h1>Government expenses of Slovakia</h1>

    <p style="text-align:center; line-height: 1.8em;">
      <b>30-day Chart Challenge 2026</b>
      <br />
      <i> day 3: comparisons - mosaic</i>
    </p>

    <div class="charts" bind:this={chartContainer}></div>

    <div>
      Data source: <a href="https://www.cenastatu.sk"> www.cenastatu.sk </a>
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
