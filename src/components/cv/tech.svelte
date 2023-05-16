<script lang="ts">
    import { TECHS } from './cv.model';
    export let selectedTech: string | null = null;
    const year = new Date().getUTCFullYear() - 2;
</script>

<section>
    <h1>Technologies</h1>
    {#each TECHS as tech, index}
        {#if index != 0 && tech.group != TECHS[index - 1].group}
            <hr />
        {/if}

        <div class="tech" on:mouseenter={() => (selectedTech = tech.name)} on:mouseleave={() => (selectedTech = null)}>
            <!-- <span class="prefix" title={TECH_GRP_NAMES[tech.group].lng}>{TECH_GRP_NAMES[tech.group].shrt}</span> -->
            <span class="name" style="opacity: {1 - (year - (tech.lastWorkUsed || tech.lastUsed)) / 10}"
                >{tech.name}</span
            >
            <span class="spacer" />
            <span
                class="years"
                title={`Practiced for ${tech.workYears} years, last used in ${Math.max(
                    tech.lastWorkUsed,
                    tech.lastUsed
                )}`}
            >
                <span style="opacity: {1 - (year - (tech.lastWorkUsed || tech.lastUsed)) / 10}"
                    >{Array(tech.workYears - tech.hobbyYears)
                        .fill('░')
                        .join('')}</span
                ><span style="opacity: {1 - (year - tech.lastUsed) / 10}"
                    >{Array(tech.hobbyYears).fill('▒').join('')}</span
                >
            </span>
        </div>
    {/each}
    <div class="legend">
        <span style="font-size:.9em;">* approx. usage</span>
    </div>
</section>

<style lang="scss">
    section {
        width: 100%;
    }
    .tech {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        justify-items: space-between;
        align-items: flex-start;
        flex-wrap: nowrap;
        cursor: pointer;
        line-height: 1.5em;

        &:hover {
            color: var(--active-color);
            transition: color 0.1s ease-in-out;
        }
        .name {
            flex: 1 1 auto;

            white-space: nowrap;
        }
        .spacer {
            display: block;
            flex: 1 1 auto;
            margin: 0.7em 0.5em 0.8em;
            width: 100%;
            opacity: 0.2;
            overflow: hidden;
            border-bottom: dotted 1px currentColor;
        }
    }
    hr {
        height: 1em;
        border: none;
    }
    // .prefix {
    //     width: 2.3em;
    //     height: 2em;
    //     line-height: 2em;
    //     text-align: center;
    //     font-size: 0.7em;
    //     // background: var(--fg-color);
    //     // color: var(--bg-color);
    //     border-radius: 3px;
    // }
    .years {
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1 0 auto;
        letter-spacing: 1.05ex;
        font-size: 1.2em;
    }
    .legend {
        text-align: right;
    }
</style>
