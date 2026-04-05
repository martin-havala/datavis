<script lang="ts">
  import { base } from "$app/paths";
  import "$lib/styles/calendar.css";
  const days: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
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
  const slots: (number | null)[] = Array.from(
    { length: firstDayAdjusted + 30 },
    (_, i) => (i < firstDayAdjusted ? null : i - firstDayAdjusted + 1),
  );
</script>

<section class="page calendar">
  <h1>30 Day Chart Challenge — 2023</h1>
  <p class="lead">My entries for the 30 Day Chart Challenge 2023.</p>

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
        {:else if dayMap[s]}
          <a class="cell" href="{base}/30dayChartChallenge2023/{dayMap[s]}">
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
