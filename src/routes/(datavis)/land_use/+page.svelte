<script lang="ts">
    import Plot1 from './components/plot1.svelte';
    import Plot2 from './components/plot2.svelte';
    import Labels from './components/labels.svelte';
    import People from './components/people.svelte';
    import Land from './components/land.svelte';
</script>

<svelte:head>
    <title>Land use and population</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <div class="page">
        <h1>Land use and population</h1>
        <svg viewBox="0 0 1400 1000" class="svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <g transform="translate(100,100)">
                <Plot1 />
            </g>
            <g transform="translate(700,100)">
                <Plot2 />
            </g>
            <Labels />
            <People />
            <Land />
        </svg>
        <hr style="margin-top:10em" />
        <div class="notes">
            <div class="comments">
                <div>
                    data sources:
                    <ul>
                        <li>
                            <a href="https://ourworldindata.org/land-use"
                                >Land use: https://ourworldindata.org/land-use</a
                            >
                        </li>
                        <li>
                            <a href="https://www.worldometers.info/world-population/world-population-by-year"
                                >Population: https://www.worldometers.info/world-population/world-population-by-year</a
                            >
                        </li>
                        <li>
                            <a href="https://ourworldindata.org/fertilizers"
                                >Fertilizers: https://ourworldindata.org/fertilizers</a
                            >
                        </li>
                        <li>
                            <a href="https://ourworldindata.org/grapher/arable-land-pin"
                                >Arable land size for a fixed size crop:
                                https://ourworldindata.org/grapher/arable-land-pin</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    .page {
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        display: block;
        h1 {
            text-align: center;
            margin-bottom: 0;
        }
        :global(.yScale),
        :global(.selector) {
            transition: opacity 400ms ease-in-out;
        }
        :global(.yScale text),
        :global(text) {
            fill: var(--color, currentColor);
        }

        :global(path) {
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        :global(path.plotline) {
            stroke-width: 2;
            fill: none;
            stroke: var(--color);
        }
        :global(.population) {
            --color: blue;
        }
        :global(.built),
        :global(.builtPC),
        :global(.builtPC) {
            --color: gray;
        }
        :global(.cropland),
        :global(.croplandPC) {
            --color: goldenrod;
        }
        :global(.grazing),
        :global(.grazingPC) {
            --color: olivedrab;
        }
        :global(.arableLand) {
            --color: darkolivegreen;
        }
        :global(.populationDensity) {
            --color: purple;
        }
        :global(.fertilizer),
        :global(.fertilizerPA),
        :global(.fertilizerPC) {
            --color: firebrick;
        }
        :global(text) {
            font-size: 12px;
        }
    }
    .svg {
        width: 100%;
    }
</style>
