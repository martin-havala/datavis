<script lang="ts">
  import { base } from "$app/paths";
  import "$lib/styles/calendar.css";
  import { flip } from "svelte/animate";
  import { sineInOut } from "svelte/easing";
  const weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const dayMap: { [k: number]: string } = {
    9: "tourism",
    11: "food_consumption",
    13: "director_ratings",
    16: "royals",
    17: "directors",
    19: "land_use",
    20: "new_tool",
    23: "kanagawa",
    25: "population",
    29: "16personalities",
    30: "eGov",
  };

  const dayNames: { [k: number]: string } = {
    9: "Tourism",
    11: "Food Consumption",
    13: "Director ratings",
    16: "Royals",
    17: "Directors",
    19: "Land Use",
    20: "Writing",
    23: "Kanagawa",
    25: "Population",
    29: "16 personalities",
    30: "Data Governance",
  };

  // Render as a real April 2023 calendar (April has 30 days)
  const year = 2023;
  const month = 3; // April (0-based)
  const firstDay = new Date(year, month, 1).getDay();
  // adjust so weeks start on Monday (Monday=0)
  const firstDayAdjusted = (firstDay + 6) % 7;
  const slots: { day: number | null; name: string | null; index: number }[] =
    Array.from({ length: firstDayAdjusted + 30 }, (_, i) =>
      i < firstDayAdjusted
        ? { index: i, day: null, name: null }
        : { index: i, day: i - firstDayAdjusted + 1, name: null },
    );

  const days = slots
    .map((d, i) => ({
      ...d,
      name: d.day ? dayNames[d.day] : null,
    }))
    .sort((a, b) => (a.name ? (b.name ? 0 : -1) : 1))
    .filter((d) => d.day !== null);

  let asCalendar = $state(true);
  let displayArray = $derived(() => (asCalendar ? slots : days));
</script>

<svelte:head>
  <title>30 Day Chart Challenge — 2023</title>
</svelte:head>

<section class="page calendar">
  <h1>30 Day Chart Challenge — 2023</h1>
  <p style="text-align:center; line-height: 1.8em;">
    <b>30-day Chart Challenge 2026</b>
    <br />
    <i> day 1: comparisons - part-to-whole</i>
  </p>
  <p class="lead">
    A little look back into my journey through the 30 Day Chart Challenge 2023.<br
    />
    I was not able to complete all the days, but I learned a lot along the way.
  </p>

  <button
    on:click={() => (asCalendar = !asCalendar)}
    class="toggle-view"
    style="margin-bottom: 2em;"
  >
    Toggle calendar / waffle view
  </button>

  <div class="calendar">
    <div class="weekdays">
      {#each weekdays as w}
        <div class="wd {asCalendar ? '' : 'transparent'}">{w}</div>
      {/each}
    </div>

    <div class="grid {asCalendar ? '' : 'show-empty'}">
      {#each displayArray() as s, i (s.index)}
        <div
          animate:flip={{
            duration: 1_000 + Math.random() * 1_000,
            delay: Math.random() * 2_00 + i * 1_0,
            easing: sineInOut,
          }}
        >
          {#if s.day === null}
            <div class="cell empty"></div>
          {:else if s.day && dayMap[s.day]}
            <a
              class="cell"
              href="{base}/30dayChartChallenge2023/{dayMap[s.day]}"
            >
              <div class="daynum">{s.day}</div>
              <div class="meta">{dayNames[s.day]}</div>
            </a>
          {:else}
            <div class="cell placeholder">
              <div class="daynum">{s.day}</div>
              <div class="meta">{s.name}</div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
