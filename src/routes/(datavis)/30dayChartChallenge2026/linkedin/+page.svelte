<script lang="ts">
  import angularPng from "$lib/assets/logos/angular.png?url";
  import linkedinPng from "$lib/assets/logos/linkedin.png?url";
  import reactPng from "$lib/assets/logos/react.png?url";
  import vuePng from "$lib/assets/logos/vue.png?url";
  import { flip } from "svelte/animate";
  import { sineInOut } from "svelte/easing";
  import { remoteResults, results } from "./data";

  const logoMap: Record<string, string> = {
    a: angularPng,
    r: reactPng,
    v: vuePng,
    z: linkedinPng,
  };

  let sort = $state<"index" | "type">("type");

  const sorted = $derived(() => resortData(results, sort));
  const remoteSorted = $derived(() => resortData(remoteResults, sort));

  function resort() {
    sort = sort === "index" ? "type" : "index";
  }

  function resortData(data: typeof remoteResults, type: "index" | "type") {
    return type === "index"
      ? data
      : [...data].sort(
          (a, b) => a.c.localeCompare(b.c) || a.i.localeCompare(b.i),
        );
  }
</script>

<svelte:head>
  <title>LinkedIn job search</title>
</svelte:head>

<section>
  <div class="page">
    <h1>LinkedIn job search</h1>
    <h4>30-day Chart Challenge 2026 - day 2: comparisons, pictogram</h4>
    <div class="intro">
      How many relevant job postings did you find?<br /> As an Angular
      developer, I feel quite overwhelmed <br />by the number of irrelevant
      results and promoted posts.
    </div>
    <button onclick={resort}>
      Sort by {sort === "index" ? "type" : "index"}
    </button>
    <div class="charts">
      <div>
        <h3>All types of location</h3>
        <div class="vis">
          {#each sorted() as res, i (res.i)}
            <div
              animate:flip={{
                duration: 1_000 + Math.random() * 1_000,
                delay: Math.random() * 2_00 + i * 1_0,
                easing: sineInOut,
              }}
            >
              {#if res.c === "a"}
                <img src={angularPng} alt="Angular" />
              {:else}
                <!-- else if content here -->
                <div class="trash">
                  🙈
                  <img src={logoMap[res.c]} alt={logoMap[res.c]} />
                </div>
              {/if}
            </div>
          {/each}
        </div>
        <p>
          <b>{sorted().filter((a) => a.c === "a").length}</b> out of 100
        </p>
      </div>
      <div>
        <h3>Remote positions only</h3>

        <div class="vis">
          {#each remoteSorted() as res, i (res.i)}
            <div
              animate:flip={{
                duration: 1_000 + Math.random() * 1_000,
                delay: Math.random() * 2_00 + i * 1_0,
                easing: sineInOut,
              }}
            >
              {#if res.c === "a"}
                <img src={angularPng} alt="Angular" />
              {:else}
                <!-- else if content here -->
                <div class="trash">
                  🙈
                  <img src={logoMap[res.c]} alt={logoMap[res.c]} />
                </div>
              {/if}
            </div>
          {/each}
        </div>
        <p>
          <b>{remoteSorted().filter((a) => a.c === "a").length}</b> out of 100
        </p>
      </div>
    </div>
    <div class="notes">
      <ul>
        <li>
          <div><img alt="Angular logo" src={angularPng} /></div>
          <span> angular position</span>
        </li>
        <li>
          <div>🙈</div>
          <span>non-angular position</span>
        </li>
        <li>
          <div><img alt="React logo" src={reactPng} /></div>
          <span> react position</span>
        </li>
        <li>
          <div><img alt="Vue.js logo" src={vuePng} /></div>
          <span> vue.js and others</span>
        </li>
        <li>
          <div><img alt="LinkedIn logo" src={linkedinPng} /></div>
          <span>irrelevant promo</span>
        </li>
      </ul>
    </div>
    <div class="notes">
      Data source : linkedIn job search results for "angular", "mid-senior
      level" in "EMEA", "past week".<br />
      Results from the first few pages, sorted by relevance.
    </div>
  </div>
</section>

<style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
  }
  .charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10rem;
  }
  .intro {
    margin: 1em;
    text-align: center;
  }
  .trash,
  img {
    display: block;
    align-self: center;
    width: 2rem;
    text-align: center;
    position: relative;
  }
  .trash {
    font-size: 1.5em;
  }

  .trash > img {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 1rem;
    height: 1rem;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 1));
  }

  h3,
  p {
    width: 100%;
    text-align: center;
  }
  .vis {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(10, 3em);
    grid-auto-rows: 3em;
    justify-content: center;
    align-items: center;
  }

  .notes {
    text-align: center;
    width: 50vw;
    ul {
      zoom: 0.8;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      > div {
        height: 2rem;
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    img {
      display: inline-block;
      margin-bottom: 0.25rem;
    }
  }
</style>
