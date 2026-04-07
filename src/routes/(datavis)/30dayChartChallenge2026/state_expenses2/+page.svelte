<script lang="ts">
  import expensesFile from "$lib/assets/state_expenses_2024.csv?url";
  import {
    autoType,
    axisLeft,
    axisRight,
    csvParse,
    extent,
    scaleLinear,
    scaleOrdinal,
    schemeTableau10,
    select,
  } from "d3";

  import { onMount } from "svelte";

  const keys = [
    "Current expenses",
    "Wages",
    "Goods and services",
    "Regular transfers",
    "Interest payments",
    "Capital expenditure",
  ];

  let expenses$ = $state<
    {
      Year: number;
      [key: string]: number;
    }[]
  >([]);

  let expensesExtent$ = $state<[number, number]>([0, 1]);

  onMount(() => {
    fetch(expensesFile)
      .then((res) => res.text())
      .then((res) => csvParse(res, autoType))
      .then((data) => {
        expenses$ = data.map((d: any) => ({
          Year: d.Year,
          "Current expenses": d["Current expenses"],
          Wages: d["Wages"],
          "Goods and services": d["Goods and services"],
          "Regular transfers": d["Regular transfers"],
          "Interest payments": d["Interest payments"],
          "Capital expenditure": d["Capital expenditure"],
        }));

        if (expenses$.length === 0) return [0, 1];

        expensesExtent$ = extent(
          expenses$
            .map((exp) =>
              keys.reduce((sum, key) => {
                sum.push((exp as any)[key]);
                return sum;
              }, [] as number[]),
            )
            .flat(),
        ) as [number, number];

        // draw chart after data is ready
        drawMosaic();
      });
  });

  let chartContainer: HTMLDivElement | null = null;
  let svg: any = null;

  function drawMosaic() {
    if (!chartContainer || !expenses$) return;
    // clear
    select(chartContainer).selectAll("*").remove();

    if (!expenses$ || expenses$.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 40, left: 20 };
    const width =
      Math.min(900, chartContainer.clientWidth || 900) -
      margin.left -
      margin.right;
    const height = 600 - margin.top - margin.bottom;

    svg = select(chartContainer)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("line")
      .attr("x1", 300)
      .attr("y1", 0)
      .attr("x2", 300)
      .attr("y2", height)
      .attr("stroke", "#aaa");
    svg
      .append("line")
      .attr("y1", 0)
      .attr("x1", 600)
      .attr("x2", 600)
      .attr("y2", height)
      .attr("stroke", "#aaa");

    const axis = scaleLinear()
      .domain(expensesExtent$ as number[])
      .range([height, 0])
      .nice();

    const color = scaleOrdinal<string>()
      .domain(keys)
      .range(schemeTableau10 as string[]);

    const pairs = expenses$.reduce(
      (acc, d, expenseIndex) => {
        if (expenseIndex === 0) return acc;
        const prev = expenses$[expenseIndex - 1];
        keys.forEach((key) => {
          acc.push({
            year0: prev.year,
            year1: d.year,
            key,
            expenseIndex: 2 + expenseIndex,
            value0: prev[key],
            value1: d[key],
          });
        });
        return acc;
      },
      [] as {
        year0: number;
        year1: number;
        key: string;
        expenseIndex: number;
        value0: number;
        value1: number;
      }[],
    );

    pairs.push(
      ...keys.reduce(
        (acc, key) => {
          acc.push({
            year0: expenses$.at(0)!.year,
            year1: expenses$.at(-1)!.year,
            key,
            expenseIndex: 20,
            value0: expenses$.at(0)![key],
            value1: expenses$.at(-1)![key],
          });
          return acc;
        },
        [] as {
          year0: number;
          year1: number;
          key: string;
          expenseIndex: number;
          value0: number;
          value1: number;
        }[],
      ),
    );

    const lineGrps = svg
      .selectAll(".pairs")
      .data([pairs])
      .enter()
      .append("g")
      .attr("class", "pairs")
      .selectAll(".line")
      .data((d: any) => d)
      .enter()
      .append("g")
      .attr("class", "line");

    lineGrps
      .append("line")
      .attr("stroke", (d: any) => color(d.key))
      .attr("x1", 305)
      .attr("y1", (d: any) => axis(d.value0))
      .attr("x2", 595)
      .attr("y2", (d: any) => axis(d.value1))
      .attr("stroke", (d: any) => color(d.key))
      .attr("opacity", 0.0)
      .attr("stroke-width", 20)
      .attr("stroke-linecap", "round")
      .on("mouseenter", function (event: any, data: any) {
        tooltip
          .style("opacity", 1)
          .html(
            `<b>${data.key}</b><br/>
            <table >
            <tr><td>${data.year0}:</td><td style="text-align:right">${data.value0.toLocaleString()} mln EUR</td></tr>
            <tr><td>${data.year1}:</td><td style="text-align:right">${data.value1.toLocaleString()} mln EUR</td></tr>
            </table>
            <i>Change: ${(data.value1 - data.value0).toLocaleString()} mln EUR</i>
            `,
          )
          .style("left", event.pageX + 8 + "px")
          .style("top", event.pageY + 8 + "px");
      })
      .on("mouseleave", () => tooltip.style("opacity", 0));

    lineGrps
      .append("line")
      .attr("class", "stroke")
      .attr("stroke", (d: any) => color(d.key))
      .attr("x1", 305)
      .attr("y1", (d: any) => axis(d.value0))
      .attr("x2", 595)
      .attr("y2", (d: any) => axis(d.value1))
      .attr("stroke", (d: any) => color(d.key))
      .attr("opacity", (d: any) => (d.expenseIndex > 10 ? 1 : 0.05))
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round")
      .attr("pointer-events", "none");

    // axes
    const leftAxis = axisLeft(axis as any).ticks(3);
    const rightAxis = axisRight(axis as any).ticks(3);

    const axisSvg = svg
      .append("g")
      .attr("transform", `translate(300,${0})`)
      .call(leftAxis);
    const axisSvg2 = svg
      .append("g")
      .attr("transform", `translate(600,${0})`)
      .call(rightAxis);

    axisSvg.selectAll("text").style("text-anchor", "center");

    // legend (compact, top-right)
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${Math.max(0, width - 200)},${-8})`);

    svg
      .append("text")
      .attr("transform", `translate(450,0)`)
      .attr("font-size", `10`)
      .attr("text-anchor", `middle`)
      .text("mln EUR");

    keys.forEach((k, i) => {
      const g = legend
        .append("g")
        .attr("transform", `translate(0,${height / 2 + (i - 4) * 16})`);
      g.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", color(k) as string);
      g.append("text")
        .attr("x", 16)
        .attr("y", 10)
        .text(k)
        .style("font-size", "11px")
        .style("fill", "#ddd");
    });

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
      <i> day 4: comparisons - slope</i>
    </p>

    <p style="text-align:center; line-height: 1.8em;">
      The absolute change in government spending in between years.<br />
      Highlighted changes are comparison of 2016 vs. 2024 governmental expenses.
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

    :global(g.line:hover) {
      :global(line.stroke) {
        opacity: 1;
        stroke: white;
      }
    }
  }
</style>
