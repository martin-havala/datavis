<script lang="ts">
  import { axisBottom, extent, matcher, rank, scaleLinear, select } from "d3";
  import { onMount } from "svelte";

  const data = {
    bonum: [6, 14],
    accenture: [23, 27],
    aimaps: [12, 30],
    superscale: [14, 291],
    smarthead: [22, 151],
  };

  let { data: bankData } = $props() as {
    data: {
      wages: { diff: number; partner: string }[];
    };
  };

  console.log(bankData.wages);
  const scaleX = scaleLinear(
    extent(bankData.wages.map((a) => a.diff)) as number[],
    [220, 780],
  ).nice();

  let svg!: SVGElement;
  onMount(() => {
    const svgSelection = select(svg);
    svgSelection
      .append("g")
      .attr("transform", `translate(0,${560})`)
      .call(axisBottom(scaleX).tickSizeOuter(0).ticks(5));

    const ranks = rank(bankData.wages.map((a) => a.diff));
    const maxRank = Math.max(...ranks);

    const grp = svgSelection
      .selectAll(".dates")
      .data(bankData.wages)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${scaleX(d.diff)},555) `)
      .attr("class", "dates");

    grp
      .append("rect")
      .attr("width", 2)
      .attr("fill", (d) => (d.diff === 151 ? "orange" : "currentColor"))
      .attr("height", (d, i) => 50 - 40 * (ranks[i] / maxRank))
      .attr("y", (d, i) => +40 * (ranks[i] / maxRank) - 50)
      .attr("rx", 1)
      .attr("ry", 1);
    grp
      .filter((a) => a.diff === 151)
      .append("text")
      .text("still waiting!")
      .style("fill", "orange")
      .style("text-anchor", "start")
      .attr("y", "-15")
      .attr("font-size", "12");

    svgSelection

      .append("text")
      .text("days after end of the month")
      .style("fill", "currentColor")
      .style("text-anchor", "middle")
      .attr("x", "500")
      .attr("y", "595")
      .attr("font-size", "12");
  });
</script>

<section>
  <div class="page">
    <h1>Waiting for the wage</h1>

    <p style="text-align:center; line-height: 1.8em;">
      <b>30-day Chart Challenge 2026</b>
      <br />
      <i> day 9: distributions - wealth</i>
    </p>
    <p style="max-width:50%; text-align:center">
      How long I had to wait to get my wage / invoice paid?
    </p>

    <svg width="1000" height="600" bind:this={svg}>
      <g transform="translate(250,0)">
        <text
          x="245"
          y={250 - 110 + 4}
          font-size="10"
          text-anchor="end"
          class="worst"
        >
          {data.bonum[1]}
        </text>
        <circle
          cx="250"
          cy="250"
          r="110"
          pathLength="1"
          transform="rotate(-90 250 250)"
          class="worst"
          style="stroke-dasharray: {data.bonum[1] / 365} {1 -
            data.bonum[0] / 365};"
        ></circle>

        <text x="245" y={250 - 120 + 4} font-size="10" text-anchor="end">
          {data.bonum[0]}
        </text>
        <circle
          cx="250"
          cy="250"
          r="120"
          pathLength="1"
          transform="rotate(-90 250 250)"
          style="stroke-dasharray: {data.bonum[0] / 365} {1 -
            data.bonum[0] / 365};"
        ></circle>

        <text
          x="245"
          y={250 - 140 + 4}
          font-size="10"
          text-anchor="end"
          class="worst"
        >
          {data.accenture[1]}
        </text>
        <circle
          cx="250"
          cy="250"
          r="140"
          pathLength="1"
          transform="rotate(-90 250 250)"
          class="worst"
          style="stroke-dasharray: {data.accenture[1] / 365} {1 -
            data.accenture[0] / 365};"
        ></circle>

        <text x="245" y={250 - 150 + 4} font-size="10" text-anchor="end">
          {data.accenture[1]}
        </text>
        <circle
          cx="250"
          cy="250"
          r="150"
          pathLength="1"
          transform="rotate(-90 250 250)"
          style="stroke-dasharray: {data.accenture[0] / 365} {1 -
            data.accenture[0] / 365};"
        ></circle>

        <text
          x="245"
          y={250 - 170 + 4}
          font-size="10"
          text-anchor="end"
          class="worst"
        >
          {data.aimaps[0]}
        </text>
        <circle
          cx="250"
          cy="250"
          r="170"
          pathLength="1"
          transform="rotate(-90 250 250)"
          class="worst"
          style="stroke-dasharray: {data.aimaps[1] / 365} {1 -
            data.aimaps[0] / 365};"
        ></circle>
        <text x="245" y={250 - 180 + 4} font-size="10" text-anchor="end">
          {data.aimaps[1]}
        </text>
        <circle
          cx="250"
          cy="250"
          r="180"
          pathLength="1"
          transform="rotate(-90 250 250)"
          style="stroke-dasharray: {data.aimaps[0] / 365} {1 -
            data.aimaps[0] / 365};"
        ></circle>

        <text
          x="245"
          y={250 - 200 + 4}
          font-size="10"
          text-anchor="end"
          class="worst"
        >
          {data.smarthead[1]}*
        </text>
        <circle
          cx="250"
          cy="250"
          r="200"
          class="worst"
          pathLength="1"
          transform="rotate(-90 250 250)"
          style="stroke-dasharray: {data.smarthead[1] / 365 -
            0.01 -
            0.01 -
            0.01 -
            0.005 -
            0.01 -
            0.0025 -
            0.01 -
            0.00125 -
            0.01 -
            0.0} .01 .01  .01 .005 .01 .0025 .01 .00125 .01 .0 {1 -
            data.smarthead[0] / 365};"
        ></circle>

        <text x="245" y={250 - 210 + 4} font-size="10" text-anchor="end">
          {data.smarthead[0]}
        </text>
        <circle
          cx="250"
          cy="250"
          r="210"
          pathLength="1"
          transform="rotate(-90 250 250)"
          style="stroke-dasharray: {data.smarthead[0] / 365} {1 -
            data.smarthead[0] / 365};"
        ></circle>

        <text
          x="245"
          y={250 - 230 + 4}
          font-size="10"
          text-anchor="end"
          class="worst"
        >
          {data.superscale[1]}
        </text>
        <circle
          cx="250"
          cy="250"
          r="230"
          class="worst"
          pathLength="1"
          transform="rotate(-90 250 250)"
          style="stroke-dasharray: {data.superscale[1] / 365} {1 -
            data.superscale[0] / 365};"
        ></circle>
        <text x="245" y={250 - 240 + 4} font-size="10" text-anchor="end">
          {data.superscale[0]}
        </text>
        <circle
          cx="250"
          cy="250"
          r="240"
          pathLength="1"
          transform="rotate(-90 250 250)"
          style="stroke-dasharray: {data.superscale[0] / 365} {1 -
            data.superscale[0] / 365};"
        ></circle>
      </g>

      <g transform="translate(317,75)">
        <circle r="4" cx="-10" cy="-4" style="fill:green; stroke:none"></circle>
        <text style="font-size:14">Median waiting time</text>
      </g>
      <g transform="translate(317,95)">
        <circle r="4" cx="-10" cy="-4" style="fill:orange; stroke:none"
        ></circle>
        <text style="fill:orange;font-size:14">Longest waiting time</text>
      </g>
    </svg>
  </div>
</section>

<style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  fieldset {
    border-radius: 1em;
  }

  circle {
    stroke: currentColor;
    fill: transparent;
    stroke-linecap: round;
    stroke-width: 7;
    stroke: green;

    &.worst {
      stroke: orange;
    }
  }

  text {
    fill: green;

    &.worst {
      fill: orange;
    }
  }
</style>
