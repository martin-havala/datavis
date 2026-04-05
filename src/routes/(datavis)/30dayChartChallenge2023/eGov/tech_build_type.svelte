<script lang="ts">
  import { I_5_8 } from "$lib/assets/eGov/e_gov.metadata";
  import {
    EGOV_COLS,
    EGOV_COL_INFO_CELLS,
    type eGov,
  } from "$lib/assets/eGov/e_gov.model";

  interface Props {
    row: eGov;
  }

  let { row }: Props = $props();
  let cols = $derived(
    (row &&
      EGOV_COLS.reduce(
        (a, col) => {
          const typeCol = EGOV_COL_INFO_CELLS[col].type;
          if (typeCol != undefined) {
            a[(row as any)[typeCol]] = (a[(row as any)[typeCol]] || 0) + 1;
          }
          return a;
        },
        {} as { [i: string]: number },
      )) ||
      {},
  );
  const types = Object.keys(I_5_8);
</script>

<div>
  e-Gov software by types:
  <ul>
    {#each Object.keys(cols) as colType}
      <li>{I_5_8[+colType]}: {cols[colType]}</li>
    {/each}
  </ul>
</div>
