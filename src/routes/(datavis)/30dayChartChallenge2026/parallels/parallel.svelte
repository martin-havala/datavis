<script lang="ts">
  import { line, select, type ScaleLinear } from "d3";

  let {
    keys,
    stroke,
    title,
    jsonData,
    intersections,
    scales,
  }: {
    title: string;
    stroke: string;
    keys: string[];
    jsonData: Record<string, any>[];
    intersections: [string, string, number][];
    scales: Map<string, ScaleLinear<any, any, never>>;
  } = $props<{
    keys: string[];
    stroke: string;
    title: string;
    intersections: [string, string, number][];
    jsonData: Record<string, any>[];
    scales: Map<string, ScaleLinear<any, any, never>>;
  }>();

  let chartContainer: HTMLDivElement;

  const width = 1000;
  const height = 200;
  const margin = { left: 70, right: 70, top: 70, bottom: 40 };

  const step$ = $derived(() => width / (scales?.size - 1));

  // d3 rendering here
  $effect(() => {
    if (!scales?.get || !jsonData) {
      return;
    }

    chartContainer.querySelector("svg")?.remove();
    const svg = chartContainer.querySelector("svg")
      ? select(chartContainer.querySelector("svg > g"))
      : select(chartContainer)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

    let intersectionsCount = 0;
    keys.forEach((key, i) => {
      const g = svg
        .append("g")
        .attr("class", "scale")
        .attr("transform", `translate(${i * step$()},0)`);

      g.append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "currentColor");

      g.append("text")
        .attr("y", -5)
        .text(scales.get(key)!.domain()[0])
        .style("fill", "white")
        .style("font-size", "10")
        .style("text-anchor", "middle");

      g.append("text")
        .attr("y", height + 12)
        .text(scales.get(key)!.domain()[1])
        .style("fill", "white")
        .style("font-size", "10")
        .style("text-anchor", "middle");

      g.append("text")
        .attr("y", height + 30)
        .text(key)
        .style("fill", "white")
        .style("font-size", "12")
        .style("text-anchor", "middle");

      if (i > 0) {
        const count = intersections.find(
          (int) => int[0] === keys.at(i - 1) && int[1] === key,
        )?.[2];
        intersectionsCount += count ?? 0;

        count &&
          g
            .append("text")
            .attr("x", -step$() / 2)
            .attr("y", height + 12)
            .text(`${count}`)
            .style("fill", "white")
            .style("opacity", ".3")
            .style("font-size", "10")
            .style("text-anchor", "middle");
      }

      const linegen = line<[string, number]>()
        .x((_, i) => i * step$())
        .y(([key, value]) => scales.get(key)?.(value));

      svg
        .append("g")
        .selectAll(".data")
        .data(jsonData.map((row) => keys.map((k) => [k, row[k]])))
        .enter()
        .append("path")
        .attr("d", (d) => linegen(d))
        .attr("stroke", stroke)
        .attr("fill", "none");
    }, new Map<string, any>());

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -30)
      .text(`${title} - ${intersectionsCount} intersections`)
      .style("fill", "white")
      .style("font-size", "14")
      .style("font-weight", "bold")
      .style("text-anchor", "middle");
  });
</script>

<div
  class="charts"
  style="text-align: center;"
  bind:this={chartContainer}
></div>
