<script lang="ts">
  import { resolve } from "$app/paths";

  import "$lib/styles/calendar.css";
  const weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // mappings for existing pages (add if you have some)
  const dayAliases: { [k: number]: string } = {
    1: "2023",
    2: "linkedin",
    3: "state_expenses",
    4: "state_expenses2",
    6: "press_freedom",
    7: "parallels",
    9: "wage",
  };
  const dayNames: { [k: number]: string } = {
    1: "2023",
    2: "LinkedIn",
    3: "State Expenses",
    4: "State Expenses (part 2)",
    6: "Press freedom",
    7: "Parallel coordinates",
    9: "Wage arrival",
  };

  // Render as a real April 2026 calendar (April has 30 days)
  const year = 2026;
  const month = 3; // April (0-based)
  const firstDay = new Date(year, month, 1).getDay();
  const firstDayAdjusted = (firstDay + 6) % 7; // Monday-first
  const slots: (number | null)[] = Array.from(
    { length: firstDayAdjusted + 30 },
    (_, i) => (i < firstDayAdjusted ? null : i - firstDayAdjusted + 1),
  );
</script>

<svelte:head>
  <title>30 Day Chart Challenge 2026</title>
</svelte:head>

<section class="page calendar">
  <h1>30 Day Chart Challenge — 2026</h1>
  <p class="lead">
    A place to collect my daily charts for the 30 Day Chart Challenge 2026.
  </p>

  <div class="calendar">
    <div class="weekdays">
      {#each weekdays as w}
        <div class="wd">{w}</div>
      {/each}
    </div>

    <div class="grid">
      {#each slots as s}
        {#if s === null}
          <div class="cell empty"></div>
        {:else if dayNames[s]}
          <a
            class="cell"
            href={`${resolve(`/(datavis)/30dayChartChallenge2026`)}/${dayAliases[s]}`}
          >
            <div class="daynum">{s}</div>
            <div class="meta">{dayNames[s]}</div>
          </a>
        {:else}
          <div class="cell placeholder">
            <div class="daynum">{s}</div>
            <div class="meta"></div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>
