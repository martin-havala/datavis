<script lang="ts">
    import { base } from '$app/paths';
    import { I_17_4 } from '$lib/assets/eGov/e_gov.metadata';

    export let areas: string | number | undefined;
    $: focusAreas = `${areas ?? ''}`?.split(',') || [];
</script>

<svelte:head>
    <link rel="stylesheet" href="{base}fonts/eGovFont.css" />
</svelte:head>
{#if areas}
    <section>
        Government Disruptive Technology focus:
        <div>
            {#each focusAreas as area}
                <i title={I_17_4[+area]}>{area}</i>
            {/each}
        </div>
    </section>
{/if}

<style lang="scss">
    i {
        /* use !important to prevent issues with browser extensions that change fonts */
        font-family: 'eGovFont' !important;
        font-size: 48px;
        font-style: normal;
    }
</style>
