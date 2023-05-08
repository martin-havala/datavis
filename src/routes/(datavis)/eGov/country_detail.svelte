<script lang="ts">
    import { Level } from '$lib/assets/eGov/e_gov.metadata';
    import eGovMeta from '$lib/assets/eGov/e_gov.metadata.json';
    import {
        COLOR_SCALE,
        EGOV_COLS,
        EGOV_COL_INFO_CELLS,
        EGOV_COL_LABELS,
        type eGov,
    } from '$lib/assets/eGov/e_gov.model';
    import { fade } from 'svelte/transition';
    import DisruptiveTechnology from './disruptive_technology.svelte';
    import TechBuildType from './tech_build_type.svelte';

    export let row: eGov | null;

    $: mainCols = EGOV_COLS.map((col) => ({ col, year: row ? row[col] : null }))
        .filter((r) => r.year)
        .sort((a, b) => (a.year < b.year ? -1 : 1));
</script>

<section>
    {#key row}
        <div class="wrapper" transition:fade|local={{ duration: 400 }}>
            {#if !!row}
                <h2>
                    {row.Economy || row.Code}
                </h2>
                <div class="columns">
                    <div class="leftCol">
                        {#each mainCols as col, index}
                            <span class="column__year">
                                {#if !index || mainCols[index - 1].year !== col.year}
                                    {col.year}
                                {/if}
                            </span>
                            <div
                                class="column__circle softType{row[EGOV_COL_INFO_CELLS[col.col]?.type]}"
                                style="background: {COLOR_SCALE[EGOV_COLS.findIndex((c) => c == col.col)]};"
                            />
                            {EGOV_COL_LABELS[col.col]}
                            {#if !!row[EGOV_COL_INFO_CELLS[col.col].url]}
                                <a
                                    href={row[EGOV_COL_INFO_CELLS[col.col].url]}
                                    title={row[EGOV_COL_INFO_CELLS[col.col].name]}
                                    target="_blank">↗</a
                                >
                            {/if}

                            <br />
                        {/each}
                    </div>
                    {#if row.Economy}
                        <div class="rightCol">
                            <ul style="padding:0">
                                <li title={eGovMeta.GTMI} class={row.Grp}><b>GMTI</b>{row.GTMI.toFixed(3)}</li>
                                &nbsp;
                                <li title={eGovMeta.CGSI} class={row.GT1}><b>CGSI</b>{row.CGSI.toFixed(3)}</li>
                                <li title={eGovMeta.PSDI} class={row.GT2}><b>PSDI</b>{row.PSDI.toFixed(3)}</li>
                                <li title={eGovMeta.DCEI} class={row.GT3}><b>DCEI</b>{row.DCEI.toFixed(3)}</li>
                                <li title={eGovMeta.GTEI} class={row.GT4}><b>GTEI</b>{row.GTEI.toFixed(3)}</li>
                            </ul>

                            <p>
                                Country income group: {Level[row.Level]} income
                            </p>

                            <DisruptiveTechnology bind:areas={row['I-17.4']} />
                            <TechBuildType {row} />
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    {/key}
</section>

<style lang="scss">
    section {
        width: 100%;
        position: relative;
    }
    .wrapper {
        position: absolute;
        width: 100%;
    }
    .columns {
        text-align: left;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .level {
        display: inline-block;
    }
    .column__circle {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 8px;
    }
    .column__year {
        display: inline-block;
        width: 5ex;
    }
    a {
        text-decoration: none;
    }
    li {
        display: inline-flex;
        width: 3em;
        height: 3em;
        padding: 1ex;
        text-align: center;
        color: black;
        align-items: center;
        justify-items: center;
        flex-direction: column;
        &.A {
            background: blue;
            color: white;
        }
        &.B {
            background: green;
            color: white;
        }
        &.C {
            background: orange;
        }
        &.D {
            background: yellow;
        }
    }
</style>
