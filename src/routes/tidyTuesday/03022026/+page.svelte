<script lang="ts">
  import { extent, scaleLinear } from "d3";
  import type { EdiblePlant } from "./model";

  interface Props {
    /** @type {import('./$types').PageData} */
    data: { ediblePlants: EdiblePlant[] };
  }

  let div: HTMLElement | undefined = $state();
  let { data }: Props = $props();
  const d = data;
  console.log(d);
  const scales: Record<keyof EdiblePlant, any> = {
    days_germination: scaleLinear(
      extent(
        data.ediblePlants
          .map((d) => d.days_germination)
          .flat()
          .filter(Boolean),
      ) as number[],
      [0, 100],
    ),
    days_harvest: scaleLinear(
      extent(
        data.ediblePlants
          .map((d) => d.days_harvest)
          .flat()
          .filter(Boolean),
      ) as number[],
      [0, 100],
    ),
    preferred_ph: scaleLinear([0, 14], [0, 100]),
  };
</script>

<section>
  <div bind:this={div}>
    <table>
      <colgroup>
        <col style="width: auto" />
        <col style="width: 100px" />
        <col style="width: 100px" />
        <col style="width: 250px" />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>Common Name</th>
          <th>Harvest/Germination</th>
          <th>Ph</th>
          <th>Sunlight</th>
          <th>water</th>
        </tr>
      </thead>
      <tbody>
        {#each data.ediblePlants as plant}
          <tr>
            <td>
              {plant.common_name}
            </td>

            <td>
              <svg viewBox="-5 0 110 10" width="110" height="10">
                {#each plant.days_harvest as day}
                  <circle
                    cx={scales.days_harvest(day)}
                    cy={5}
                    r={3}
                    fill="green"
                  />
                {/each}
                {#if plant.days_harvest?.length > 1}
                  <line
                    x1={scales.days_harvest(plant.days_harvest[0])}
                    y1={5}
                    x2={scales.days_harvest(plant.days_harvest[1])}
                    y2={5}
                    stroke="green"
                    stroke-width={0.5}
                  />
                {/if}

                {#each plant.days_germination as day}
                  <circle
                    cx={scales.days_germination(day)}
                    cy={5}
                    r={3}
                    fill="pink"
                  />
                {/each}
                {#if plant.days_germination?.length > 1}
                  <line
                    x1={scales.days_germination(plant.days_germination[0])}
                    y1={5}
                    x2={scales.days_germination(plant.days_germination[1])}
                    y2={5}
                    stroke="pink"
                    stroke-width={0.5}
                  />
                {/if}
              </svg>
            </td>
            <td>
              <svg viewBox="-5 0 110 10" width="110" height="10">
                <line
                  x1={scales.preferred_ph(0)}
                  y1={5}
                  x2={scales.preferred_ph(14)}
                  y2={5}
                  stroke="orange"
                  stroke-width={0.5}
                ></line>
                {#each plant.preferred_ph ?? [] as ph}
                  <circle
                    cx={scales.preferred_ph(ph)}
                    cy={5}
                    r={3}
                    fill="orange"
                  />
                {/each}

                {#if plant.preferred_ph?.length ?? 0 > 1}
                  <line
                    x1={scales.preferred_ph(plant.preferred_ph?.[0])}
                    y1={5}
                    x2={scales.preferred_ph(plant.preferred_ph?.[1])}
                    y2={5}
                    stroke="orange"
                    stroke-width={0.5}
                  />
                  {#each [0, 4, 7, 10, 14] as tick}
                    <line
                      x1={scales.preferred_ph(tick)}
                      y1={3}
                      x2={scales.preferred_ph(tick)}
                      y2={7}
                      stroke="orange"
                      stroke-width={0.5}
                    />
                  {/each}
                {/if}
              </svg>
            </td>
            <td>
              {plant.sunlight.join(" - ")}
            </td>
            <td>
              {plant.water}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <!-- 
  <svg
    width="800"
    height="800"
    viewBox="0 0 800 800"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
  </svg> -->
</section>

<style global lang="scss">
  tr:hover {
    background-color: #333;
  }
  // svg {
  //   width: 100vmin;
  //   height: 80vmin;
  //   overflow: auto;
  //   left: 50%;
  //   transform: translateX(-50%);
  // }
</style>
