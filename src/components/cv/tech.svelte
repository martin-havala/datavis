<script lang="ts">
    import { TECHS, TECH_YEARS_SQUARES } from './cv.model';
    export let selectedTech: string | null = null;
</script>

<h1>Technologies</h1>
{#each TECHS as tech, index}
    <div on:mouseenter={() => (selectedTech = tech.tech)} on:mouseleave={() => (selectedTech = null)}>
        {tech.tech}
        <span title={TECH_YEARS_SQUARES[index].length}>{TECH_YEARS_SQUARES[index].join('')}</span>
    </div>
{/each}

<style lang="scss">
    div {
        margin: 1ex 0;
        cursor: pointer;
        &:hover {
            color: var(--active-color);
            transition: color 0.1s ease-in-out;
        }
        &:after {
            content: ' ';
            display: block;
            position: relative;
            width: 100%;
            opacity: 0.2;
            border-bottom: dotted 1px currentColor;
        }
        span {
            float: right;
            font-size: 1.4em;
            line-height: 1em;
        }
    }
</style>
