<script lang="ts">
    import { base } from '$app/paths';
    import { CV_HOBBIES, TECH_GRPS } from './cv.model';
    export let selectedTech: string | null = null;

    $: allTechs =
        !!selectedTech && TECH_GRPS[selectedTech] ? [...TECH_GRPS[selectedTech], selectedTech] : [selectedTech];
</script>

<h1>Hobbies</h1>
{#each CV_HOBBIES as hobby}
    <span class={allTechs.filter((t) => hobby.tech.includes(t || '-')).length > 0 ? 'selected' : ''}>
        {#if hobby.link}
            <a href={base + hobby.link}>{hobby.group}</a>
        {:else}
            {hobby.group}
        {/if}
    </span>
{/each}

<style lang="scss">
    span + span {
        &:before {
            padding: 0 2ex;
            content: '-';
        }
    }
    span {
        opacity: 0.7;
        &.selected {
            opacity: 1 !important;
            text-shadow: 0 0 10px #fff6;
            color: var(--active-color);
            transition: all 0.2s ease-in-out;
            a {
                color: currentColor;
            }
        }
    }
</style>
