<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import europe from '$lib/assets/europe.json';
    import royalFamily from '$lib/assets/royals/royals.json';
    import type { FamilyMember } from '$lib/assets/data_peparation/src/family.model';

    const graticule = d3.geoGraticule10();
    const outline: d3.GeoSphere = { type: 'Sphere' };
    let svg: SVGElement;
    let mapDiv: HTMLDivElement;
    let listDiv: HTMLDivElement;
    let svgSelection: d3.Selection<SVGElement, unknown, any, any>;
    let mapDivSelection: d3.Selection<HTMLDivElement, unknown, any, any>;
    let path: d3.GeoPath;
    let projection: d3.GeoProjection;
    let zoomGroup: d3.Selection<SVGGElement, unknown, any, any>;

    let width: number, height: number;
    let overlayMultiplier: number = 1;
    let overlayOffset: number = 1;

    const zoomHandler = (event: d3.D3ZoomEvent<Element, any>) => {
        zoomGroup.attr('transform', event.transform.toString());
        d3.select(mapDiv).style(
            'transform',
            `translate(${event.transform.x}px,${event.transform.y}px) scale(${event.transform.k})`
        );
    };

    const createMap = () => {
        const view = svg.getBoundingClientRect();
        [width, height] = [view.width, view.height];
        svgSelection = d3.select(svg);
        const zoom = d3.zoom().scaleExtent([1, 20]).on('zoom', zoomHandler);
        zoomGroup = svgSelection.call(zoom).append('g');
        zoomGroup
            .append('rect')
            .attr('width', width * overlayMultiplier)
            .attr('height', width * overlayMultiplier)
            .attr('transform', `translate(-${width * overlayOffset},-${height * overlayOffset})`)
            .style('fill', 'none')
            .style('pointer-events', 'all');

        projection = d3
            .geoMercator()
            .center([11, 51])
            .scale(1000)
            .translate([width / 2, height / 2]);

        path = d3.geoPath(projection);

        // render map
        zoomGroup
            .append('g')
            .selectAll('path')
            .data(europe.features)
            .join('path')
            .attr('d', path)
            .attr('fill', '#555')
            .attr('stroke', '#999')
            .attr('stroke-width', 0.5);

        return { svg, projection };
    };

    function connectLine(coordinates: { lat: number; lng: number }[], width: number) {
        console.log(coordinates);
        const link: d3.GeoGeometryObjects = {
            type: 'LineString',
            coordinates: coordinates.map((c) => [c.lng, c.lat]),
        };
        zoomGroup
            .append('g')
            .selectAll('path')
            .data([link])
            .join('path')
            .attr('d', path)
            .attr('class', (d, i) => `family-link`)
            .style('stroke-width', `${width}`);
    }
    function traverseFamilyMember(
        familyMember: FamilyMember,
        parentList: d3.Selection<HTMLLIElement | HTMLDivElement, unknown, null, any>,
        level: number = 6
    ) {
        level--;
        if (!familyMember.birthplace || !familyMember.birthplace.lat) return;
        mapDivSelection = d3.select(mapDiv).append('div');
        mapDivSelection
            .selectAll('members')
            .data([familyMember])
            .join('div')
            .attr('class', 'family-member')
            .attr('style', (d: FamilyMember) => {
                const bg = d.imgSrc ? `background-image:url("https:${d.imgSrc}");` : '';
                return `transform: translate(${projection([d.birthplace?.lng, d.birthplace?.lat])?.join('px,')}px);
                ${bg}`;
            })
            .attr('title', familyMember.name);

        const selection = parentList.append('ul');
        const li = selection.selectAll('li').data([familyMember]).join('li').attr('class', 'family-member-list');

        li.append('span')
            .text((d) => (d.father || d.morher ? '▶' : null))
            .on('click', (e: MouseEvent) => {
                (e.currentTarget as HTMLElement).parentElement?.classList.toggle('inactive');
            });
        li.append('a').attr('href', `https://en.wikipedia.com${familyMember.url}`).text(`${familyMember.name}`);

        if (familyMember.father?.birthplace) {
            connectLine([familyMember.birthplace, familyMember.father.birthplace], level);
            traverseFamilyMember(familyMember.father, li, level);
        }
        if (familyMember.mother?.birthplace) {
            connectLine([familyMember.birthplace, familyMember.mother.birthplace], level);
            traverseFamilyMember(familyMember.mother, li, level);
        }
    }

    onMount(() => {
        createMap();
        traverseFamilyMember(royalFamily as FamilyMember, d3.select(listDiv));
    });
</script>

<svelte:head>
    <title>Queen Elizabeth 2 genealogy tree</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <div class="page">
        <div class="map">
            <svg bind:this={svg}>
                <defs>
                    <marker id="arrow" markerWidth="2" markerHeight="2" viewBox="-2 -2 4 4" orient="auto">
                        <path d="M-2,-2 L2,0 -2,2 z" style="fill: var(--line-color);" />
                    </marker>
                </defs>
            </svg>
            <div class="mapDiv" bind:this={mapDiv} />
        </div>

        <div class="notes">
            <div>
                <h1>Elizabeth 2</h1>
                Have you ever wondered where each queens predecesor was born?
            </div>
            <div class="comments">
                <div>data source - Wikipedia</div>
            </div>
            <div class="list" bind:this={listDiv} />
        </div>
    </div>
</section>

<style lang="scss">
    .page {
        display: grid;
        grid-template-areas: 'notes plot';
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
    }
    svg {
        grid-area: plot;
    }
    .notes,
    .comments {
        max-width: 50em;
        margin: 1em auto;
        text-align: left;
        padding: 2ex;
    }
    .notes {
        grid-area: notes;
        display: flex;
        flex-direction: column;
        padding-top: 2em;
        overflow: auto;
    }
    .list {
        max-height: 100%;
        overflow: auto;
    }

    svg {
        width: 100%;
        height: 100%;
        --line-color: pink;
    }
    .map {
        width: 60vw;
        height: 100vh;
        position: relative;
        overflow: hidden;
    }
    .mapDiv {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        right: 0;
        bottom: 0;
        pointer-events: none;
        transform-origin: 0 0;
    }
    :global(.notes > ul) {
        padding-left: 1em;
    }
    :global(.family-link) {
        fill: transparent;
        stroke: var(--line-color);
    }
    :global(.family-member) {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 1.5em;
        height: 1.5em;
        margin: -1em 0 0 -1em;
        background-size: cover;
        background-position: top center;
        border-radius: 100%;
    }
    :global(ul) {
        padding-left: 1em;
    }
    /* Style the caret/arrow */
    :global(li) {
        cursor: pointer;
        user-select: none; /* Prevent text selection */
    }

    /* Create the caret/arrow with a unicode, and style it */
    :global(li span) {
        display: inline-block;
        margin-right: 6px;
        transform: rotate(90deg);
    }

    /* Rotate the caret/arrow icon when clicked on (using JavaScript) */
    :global(li.inactive span) {
        transform: rotate(0deg);
    }

    /* Hide the nested list */
    :global(li.inactive ul) {
        display: none;
    }
</style>
