<script lang="ts">
  let { tsvData } = $props() as { tsvData: Record<string, any>[] };
</script>

<table>
  {#if tsvData && Object.keys(tsvData).length}
    <thead>
      <tr>
        {#each Object.keys(tsvData[0]) as key}
          <td>{key}</td>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each tsvData as row}
        <tr>
          {#each Object.keys(row) as key}
            <td>{row[key]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  {/if}
</table>
