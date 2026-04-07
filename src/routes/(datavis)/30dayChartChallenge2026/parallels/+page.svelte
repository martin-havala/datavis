<script lang="ts">
  import {
    autoType,
    csvParse,
    extent,
    scaleLinear,
    type ScaleLinear,
  } from "d3";
  import Parallel from "./parallel.svelte";

  let { data } = $props() as {
    data: { inputTsv: string };
  };

  let rawData = $state(data.inputTsv);
  let optimalKeys = $state<string[]>([]);

  let jsonData$: () => Record<string, any>[] = $derived(
    () =>
      Array.from<Record<string, any>>(
        csvParse<Record<string, any>, string>(rawData, autoType),
      ) ?? [],
  );

  let scales$ = $derived(() => {
    const data = jsonData$();
    const scales = Object.keys(data.at(0) ?? {}).reduce((scales, key) => {
      if (Number.isFinite(jsonData$().at(0)?.[key])) {
        const ext = extent([...data.map((r) => r[key])]).reverse();

        scales.set(
          key,
          scaleLinear(
            typeof ext[0] === "number" ? ext : [0, 1],
            [0, 200],
          ).nice(),
        );
      }
      return scales;
    }, new Map<string, ScaleLinear<any, any>>());

    return scales;
  });

  let intersections$ = $derived(() => {
    const data = jsonData$();

    const res: [string, string, number][] = [];
    Object.keys(data.at(0) ?? {}).forEach((key, i) => {
      Object.keys(data.at(0)!).forEach((key2, i2) => {
        if (i2 <= i) {
          return;
        }

        const count = data.reduce((count, row, i) => {
          data.forEach((row2, i2) => {
            if (
              i2 > i &&
              ((row[key] > row2[key] && row[key2] < row2[key2]) ||
                (row[key] < row2[key] && row[key2] > row2[key2]))
            ) {
              count++;
            }
          });
          return count;
        }, 0);

        res.push([key, key2, count]);
        res.push([key2, key, count]);
      });
    });
    return res;
  });

  //calculations
  $effect(() => {
    const intersections = intersections$();
    const data = jsonData$();
    if (data.length < 1) {
      return;
    }
    const keys = Object.keys(data.at(0)!);

    function combine(
      keys: string[],
      currentKey: string,
      usedKeys: string[],
    ): { keys: string[]; count: number }[] {
      // When all keys have been used, return the full sequence and zero additional crossings
      if (usedKeys.length === keys.length) {
        return [
          {
            keys: [...usedKeys],
            count: 0,
          },
        ];
      }

      const results: { keys: string[]; count: number }[] = [];

      for (const nextKey of keys) {
        if (usedKeys.includes(nextKey)) continue;

        // crossings between currentKey -> nextKey
        const pairCount =
          intersections.find(
            ([a, b]) => a === currentKey && b === nextKey,
          )?.[2] ?? 0;

        const tails = combine(keys, nextKey, [...usedKeys, nextKey]);
        for (const tail of tails) {
          // accumulate pair count plus tail's crossings
          results.push({ keys: tail.keys, count: pairCount + tail.count });
        }
      }

      return results;
    }

    const results = keys
      .map((key) => combine(keys, key, [key]))
      .flat()
      .filter((a) => a.keys.at(0) === keys[0])
      .sort((a, b) => a.count - b.count);

    optimalKeys = results.at(0)?.keys ?? [];
  });
</script>

<section>
  <div class="page">
    <h1>Untangle parallel chart</h1>

    <p style="text-align:center; line-height: 1.8em;">
      <b>30-day Chart Challenge 2026</b>
      <br />
      <i> day 7: distributions - multiscale</i>
    </p>
    <p style="max-width:50%; text-align:center">
      Can we optimize number's of crossing lines within parallel coordinates?
    </p>

    <fieldset>
      <legend>CSV data</legend>
      <textarea cols="150" rows="10" bind:value={rawData}> </textarea>
    </fieldset>

    <Parallel
      keys={Object.keys(jsonData$().at(0)!)}
      jsonData={jsonData$()}
      title={"Original"}
      stroke={"#fbb"}
      intersections={intersections$()}
      scales={scales$()}
    ></Parallel>

    <Parallel
      keys={optimalKeys ?? []}
      jsonData={jsonData$()}
      title={"Optimized"}
      stroke={"#afc"}
      scales={scales$()}
      intersections={intersections$()}
    ></Parallel>

    <!-- <pre>
      {#each intersections$() as row}{row[0]}-{row[1]}: {row[2]}
      {/each}
    </pre> -->
    <!-- <Table tsvData={jsonData()} />-->
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

  textarea {
    padding: 0;
    margin: 0;
  }
</style>
