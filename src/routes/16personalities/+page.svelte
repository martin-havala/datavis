<script lang="ts">
    import { list, i18n } from '$lib/assets/16personalities/personalities';
    import * as d3 from 'd3';
    import { text } from 'svelte/internal';

    const measures: { [id: string]: number } = { ...list };
    const keys = Object.keys(measures);
    const starts: { [id: string]: number } = {};
    let start = 0;
    let selectedKey: string;
    keys.forEach((key) => {
        starts[key] = start;
        start = start + measures[key];
    });

    Object.keys(list).forEach((key) => {
        key.split('').forEach((l) => {
            measures[l] = +((measures[l] ?? 0) + measures[key]).toFixed(1);
        });
    });

    const arc = (start: number, end: number) =>
        d3.arc()({
            innerRadius: 100,
            outerRadius: 200,
            startAngle: (start / 100) * (Math.PI * 2),
            endAngle: (end / 100) * (Math.PI * 2),
        });
    const labelPosition = (angle: number, r: number) => d3.pointRadial((angle / 100) * (Math.PI * 2), r);

    const highlight = (grp: string, enable: boolean = true) => {
        return (e: Event) => {
            selectedKey = enable ? grp : '';
            document
                .querySelectorAll(`.${grp}`)
                .forEach((e) => (enable ? e.classList.add('selected') : e.classList.remove('selected')));
        };
    };
</script>

<section>
    <div class="page">
        <h1>16 Personalities distribution</h1>

        <svg width="500" height="700" xmlns="http://www.w3.org/2000/svg" class="personalities">
            <defs>
                <pattern id="I" x="0" y="0" width="1000" height="5" patternUnits="userSpaceOnUse">
                    <path d="M0,1 H1000" style="stroke:var(--foreground); stroke-width:1" />
                </pattern>
                <pattern
                    id="N"
                    x="0"
                    y="0"
                    width="1000"
                    height="7"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                >
                    <path d="M0,1 H1000" style="stroke:var(--foreground); stroke-width:1" />
                </pattern>
                <pattern
                    id="F"
                    x="0"
                    y="0"
                    width="1000"
                    height="5"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(90)"
                >
                    <path d="M0,1 H1000" style="stroke:var(--foreground); stroke-width:1" />
                </pattern>
                <pattern
                    id="P"
                    x="0"
                    y="0"
                    width="1000"
                    height="7"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(135)"
                >
                    <path d="M0,1 H1000" style="stroke:var(--foreground); stroke-width:1" />
                </pattern>
            </defs>
            <g transform="translate(250,250)">
                {#each Object.keys(list) as key}
                    <g class="personality">
                        {#each key.split('') as letter}
                            <path d={arc(starts[key], starts[key] + measures[key])} class={letter} />
                        {/each}
                        <path
                            on:mouseover={highlight(key)}
                            on:focus={highlight(key)}
                            on:mouseout={highlight(key, false)}
                            on:blur={highlight(key, false)}
                            d={arc(starts[key], starts[key] + measures[key])}
                            class={key}
                            fill="#00000001"
                        />
                        <text
                            class="label"
                            transform="translate({labelPosition((starts[key] + starts[key] + measures[key]) / 2, 220)})"
                        >
                            {key}
                        </text>
                    </g>
                {/each}
                {#if selectedKey}
                    <text class="label" y="-10">{i18n[selectedKey] ?? selectedKey}</text>
                    <text class="label" y="10">{measures[selectedKey]}%</text>
                {/if}
            </g>
            <g class="legend" transform="translate(0,500)">
                {#each ['I', 'N', 'F', 'P', 'E', 'S', 'T', 'J'] as key, index}
                    <g
                        transform="translate({12.5 + (index % 4) * 125},{Math.floor(index / 4) * 100})"
                        on:mouseover={highlight(key)}
                        on:focus={highlight(key)}
                        on:mouseout={highlight(key, false)}
                        on:blur={highlight(key, false)}
                        ><rect class={key} y="0" width="100" height="100" />
                        <text class="bgText" x="50" y="50">{key}</text>
                        <text x="50" y="50">{key}</text>
                    </g>
                {/each}
            </g>
        </svg>

        <div class="notes">
            Data Source: <a href="https://personalitymax.com/personality-types/population-gender/" target="_blank">
                personalitymax.com
            </a>
        </div>
    </div>
</section>

<style lang="scss">
    .page,
    .notes {
        display: block;
        flex-direction: column;
        text-align: center;
        overflow: auto;
    }

    .personalities {
        --foreground: white;
        --background: #202022;
        .personality {
            fill-opacity: 0.9;
            cursor: pointer;
            &:hover {
                fill-opacity: 1;
                --foreground: #202022;
                --background: white;
            }
            :global(path) {
                stroke: var(--foreground);
            }
        }
        :global(.selected) {
            fill-opacity: 0.7;
            fill: var(--foreground) !important;
            stroke: var(--background) !important;
        }
        :global(.I) {
            fill: url(#I) transparent;
        }
        :global(.E) {
            fill: url(#E) transparent;
        }
        :global(.N) {
            fill: url(#N) transparent;
        }
        :global(.S) {
            fill: url(#S) transparent;
        }
        :global(.F) {
            fill: url(#F) transparent;
        }
        :global(.T) {
            fill: url(#T) transparent;
        }
        :global(.P) {
            fill: url(#P) transparent;
        }
        :global(.J) {
            fill: url(#J) transparent;
        }
        .legend {
            cursor: pointer;
            text {
                fill: var(--foreground);
                font-size: 50pt;
                text-anchor: middle;
                dominant-baseline: central;
            }
            .bgText {
                stroke: var(--background);
                stroke-width: 10px;
            }
            rect {
                stroke: var(--foreground);
            }
        }
        .label {
            dominant-baseline: central;
            text-anchor: middle;
        }
    }
</style>
