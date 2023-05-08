<script lang="ts">
    import { I_17_4 } from '$lib/assets/eGov/e_gov.metadata';
    import font from '$lib/assets/eGov/eGovFont.css';

    export let areas: string | number | undefined;
    $: focusAreas = `${areas ?? ''}`?.split(',') || [];
</script>

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
