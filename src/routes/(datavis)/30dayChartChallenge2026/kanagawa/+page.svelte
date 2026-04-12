<script lang="ts">
  import rawData from "$lib/assets/kanagawa/kanagawa.json";
  import { type KanakawaRow } from "$lib/assets/kanagawa/kanagawa.model";
  import { onMount } from "svelte";

  import { interpolateViridis, select } from "d3";
  import dayjs from "dayjs";

  let margin = { top: 20, right: 0, bottom: 20, left: 0 },
    width = 1600 - margin.left - margin.right,
    height = 540 - margin.top - margin.bottom;

  let svgElem: SVGGElement = $state()!;
  let legendSVG: SVGGElement = $state()!;
  let svg: d3.Selection<SVGGElement, unknown, any, any>;
  let tileSize: number = $state(10);

  onMount(() => {
    // get the data

    let phaseCounter = 0;
    let newMoonCounter = 29;
    let data: KanakawaRow[] = [...rawData];
    let quaters = 0;
    data.reverse().forEach((row) => {
      if (!!row.phase) {
        phaseCounter = 0;
        quaters++;
        if (row.phase == "New Moon") {
          newMoonCounter = 0;
        }
      }

      row.phaseCountdown = newMoonCounter;
      row.phaseCounter = quaters;
      row.quarterCountdown = phaseCounter;

      const lastDate = data
        .toReversed()
        .findLast((d) => !!d.phase && d.time < row.time);

      row.moonweekIndex = dayjs(row.time)
        .startOf("d")
        .diff(
          lastDate ? lastDate.time : dayjs(data.at(-1)?.time).startOf("d"),
          "d",
        );

      newMoonCounter++;
      phaseCounter++;
    });

    quaters++;
    data.reverse();
    svg = select(svgElem)
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right},${height + margin.top + margin.bottom}`,
      )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const dataSelection = svg.append("g").selectAll("moonCells").data(data);

    const extent = [0, Math.ceil(Math.max(...data.map((r) => r.height ?? 0)))];

    const color = (val: number | null) =>
      interpolateViridis(((val ?? 0) - extent[0]) / (extent[1] - extent[0]));

    // add color legend for height
    const legendWidth = 12;
    const legendHeight = Math.min(80, width * 0.18);
    const legendX = 350;
    const legendY = 0;

    // ensure defs exists on the root svg
    const svgLegend = select(legendSVG);
    let defs = svgLegend.append("defs");

    const gradId = "kanagawa-height-gradient";
    // remove existing gradient if present
    defs.select("#" + gradId).remove();
    const grad = defs
      .append("linearGradient")
      .attr("id", gradId)
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "100%")
      .attr("y2", "0%");

    const stops = 10;
    for (let i = 0; i <= stops; i++) {
      grad
        .append("stop")
        .attr("offset", `${(i / stops) * 100}%`)
        .attr("stop-color", interpolateViridis(i / stops));
    }

    // draw legend group in the main group so it scales with viewBox
    svgLegend
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${legendX},${legendY})`)
      .call((g) => {
        g.append("rect")
          .attr("width", legendWidth)
          .attr("height", legendHeight)
          .attr("fill", `url(#${gradId})`)
          .attr("stroke", "#6663")
          .attr("rx", 3);

        g.append("text")
          .attr("x", legendWidth + 6)
          .attr("y", legendHeight + 6)
          .attr("font-size", 11)
          .attr("fill", "#ddd")
          .text(extent[0].toFixed(2));

        g.append("text")
          .attr("x", legendWidth + 6)
          .attr("y", 6)
          .attr("font-size", 11)
          .attr("fill", "#ddd")
          .attr("text-anchor", "start")
          .text(extent[1].toFixed(2));

        g.append("text")
          .attr("x", legendWidth + 12)
          .attr("y", legendHeight / 2 + 6)
          .attr("font-size", 12)
          .attr("fill", "#ddd")
          .attr("text-anchor", "start")
          .text("Wave height [m]");
      });
    tileSize = width / (quaters + 1);
    const tileCenter = tileSize / 2 - 1.5;
    const grp = dataSelection
      .join("g")
      .attr("class", "day")
      .attr(
        "transform",
        (d) =>
          `translate(${width - tileSize - tileSize * (d.phaseCounter ?? 0)}, ${
            tileSize * 8 - tileSize * (d.quarterCountdown ?? 0)
          })`,
      );

    grp
      .append("g")
      .attr("class", "arrow")
      .attr(
        "style",
        (_, i) =>
          `animation-delay: ${Math.random() * 1000}ms; 
          animation-duration: ${1000 + Math.random() * 2000}ms`,
      )
      .attr("transform-origin", (d) => `${tileCenter} ${tileCenter}`)
      .append("path")
      .attr("d", `M ${tileCenter},-2 ${tileCenter + 9},9 ${tileCenter - 9},9 z`)
      .attr("transform", (d) => `rotate(${d.direction}) translate(0, 1)`)
      .attr("transform-origin", (d) => `${tileCenter} ${tileCenter}`)
      .attr("fill", (d) => color(d.height))
      .attr("stroke", (d) => color(d.height))
      .append("title")
      .text((d) => d.direction)
      .attr("y", 18);

    grp
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", tileSize)
      .attr("height", tileSize)
      .attr("opacity", 0.00001);

    grp
      .append("circle")
      .attr("class", "circle-background")
      .attr("cx", tileCenter)
      .attr("cy", tileCenter)
      .attr("r", tileCenter - 5)
      .attr("transform", (d) => `rotate(${d.direction})`)
      .attr("transform-origin", (d) => `${tileCenter} ${tileCenter}`);

    grp
      .append("circle")
      .attr("class", "circle-day")
      .attr("cx", tileCenter)
      .attr("cy", tileCenter)
      .attr("r", tileCenter - 4)
      .attr("fill", (d) => color(d.height))
      .attr("stroke", (d) => color((d.height ?? 0) * 0.9));

    grp
      .append("text")
      .attr("class", "tileText")
      .text((d) => d.height)
      .attr("font-size", 11)
      .attr("dominant-baseline", "middle")
      .attr("y", tileCenter + 2)
      .attr("x", tileCenter)
      .attr("fill", (d) => color(d.height));

    grp
      .append("text")
      .attr("class", "dateText")
      .text((d) => {
        const date = new Date(d.time);
        return date.getDate();
      })
      .attr("font-size", 8)
      .attr("dominant-baseline", "middle")
      .attr("y", tileCenter - 9)
      .attr("x", tileCenter)
      .attr("fill", (d) => color(d.height));

    const moonSelection = svg
      .append("g")
      .selectAll("phaseCells")
      .data(data.filter((f) => f.phase))
      .enter()
      .append("g")
      .attr("transform", (d) => {
        return `translate(${width - tileSize - tileSize * (d.phaseCounter ?? 0)}, ${-tileSize / 2})`;
      });
    const moon = moonSelection
      .append("text")
      .attr("font-size", tileSize * 0.8)
      .attr("text-anchor", "middle")
      .attr("height", tileSize)
      .attr("y", tileSize * 10.5)
      .attr("x", tileCenter)
      .text((d) => {
        switch (d.phase) {
          case "New Moon":
            return "🌑";
          case "First Quarter":
            return "🌓";
          case "Full Moon":
            return "🌕";
          case "Last Quarter":
            return "🌗";
        }
        return "";
      });

    moonSelection
      .append("text")
      .text((d) =>
        new Date(d.time).toLocaleDateString("en", { dateStyle: "short" }),
      )
      .attr("y", tileSize * 11)
      .attr("x", tileSize / 2 - 2)
      .attr("font-size", 9)
      //   .attr("transform", "rotate(90)")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("transform-origin", (d) => `${tileSize / 2} ${tileSize * 2.5}`);
  });
</script>

<svelte:head>
  <title>Kanagawa sea</title>
</svelte:head>

<section>
  <div class="page">
    <h1>Kanagawa sea waves</h1>

    <p style="text-align:center; line-height: 1.8em;">
      <b>30-day Chart Challenge 2026</b>
      <br />
      <i> day 11: distributions - physical</i>
    </p>
    <p style="max-width:50%; text-align:center">
      Maximum sea wave height & wind direction aligned to lunar calendar.
    </p>
    <svg bind:this={svgElem}>
      <defs>
        <radialGradient id="gradient" cx="50%" cy="10%" r="300%">
          <stop offset="0%" stop-color="#ffff" />
          <stop offset="10%" stop-color="#ffff" />
          <stop offset="100%" stop-color="#00aa" />
        </radialGradient>
      </defs>
    </svg>

    <div style="width: 1000px;">
      <div class="comments" style="max-width: 1000px;">
        <!-- <img
          src={legendSVG}
          class="legend"
          alt="A legend describing chart values"
          /> -->

        <svg
          width="440"
          height="140"
          viewBox="-20 -20 440 140"
          class="legend"
          bind:this={legendSVG}
        >
          <g class="day" style="transform:scale(2)"
            ><g class="arrow" style="animation:none">
              <path
                d="M 19.55263157894737,-2 28.55263157894737,9 10.55263157894737,9 z"
                transform="rotate(60) translate(0, 1)"
                transform-origin="19.55263157894737 19.55263157894737"
                fill="#23888e"
                stroke="#23888e"
              >
              </path>
            </g><rect
              x="0"
              y="0"
              width="42.10526315789474"
              height="42.10526315789474"
              opacity="0.00001"
            ></rect><circle
              class="circle-background"
              cx="19.55263157894737"
              cy="19.55263157894737"
              r="14.55263157894737"
              transform="rotate(60)"
              transform-origin="19.55263157894737 19.55263157894737"
            ></circle><circle
              class="circle-day"
              cx="19.55263157894737"
              cy="19.55263157894737"
              r="15.55263157894737"
              fill="#23888e"
              stroke="#287d8e"
            ></circle><text
              class="tileText"
              font-size="12"
              dominant-baseline="middle"
              y="20.55263157894737"
              x="19.55263157894737"
              fill="#23888e">0.8</text
            >
          </g>
          <text x="100" y="13">Dominant wind direction</text>
          <path d="M80,16 L95,7" stroke-width="1" stroke="currentColor"></path>
          <text x="100" y="70">Wave height [m]</text>
          <path d="M60,50 L95,65" stroke-width="1" stroke="currentColor"></path>
        </svg>
        <div>
          <ul>
            Data sources:
            <li>
              Sea data: <a
                href="https://open-meteo.com/en/docs/marine-weather-api#latitude=35.47&longitude=139.63&daily=wave_height_max,wave_direction_dominant&timezone=Europe%2FBerlin&start_date=2022-08-01&end_date=2023-04-19"
              >
                open-meteo.com
              </a>
            </li>
            <li>
              Moon phases:
              <a
                href="https://aa.usno.navy.mil/calculated/moon/phases?date=2022-08-01&nump=50&format=t&submit=Get+Data"
              >
                <i>U.S. Naval Observatory</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .page {
    width: auto;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    :global(.day:hover .tileText) {
      opacity: 1;
    }

    :global(.day .arrow) {
      animation-name: wiggle;
      animation-duration: 1s;
      animation-fill-mode: forward;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    :global(.tileText),
    :global(.dateText) {
      fill: #ffff;
      text-anchor: middle;
      font-weight: 400;
      pointer-events: none;
      opacity: 0.6;
      transition: opacity 0.15s ease-in-out;
      text-shadow:
        0 0 5px black,
        0 0 5px black;
    }
    :global(.dateText) {
      opacity: 0.4;
    }
    :global {
      .arrow {
        stroke-width: 3;
        stroke-linejoin: round;
      }

      .circle-day {
        stroke-width: 2;
        mix-blend-mode: multiply;
        shape-rendering: geometricPrecision;
      }
      .circle-background {
        fill: url(#gradient);
        stroke: #cccf;
        stroke-width: 2;
      }
    }
  }
  svg {
    width: 98vw;
  }

  .legend {
    float: right;
    width: 50vw;
    max-width: 640px;
  }

  /* Wiggle Animation */
  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(3deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    @keyframes wiggle {
    }
  }
</style>
