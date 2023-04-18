<script lang="ts">
    import * as d3 from 'd3';
    import * as topojson from 'topojson-client';
    import { onMount } from 'svelte';
    import europe from '../../assets/europe.json';
    import royalFamily from '../../assets/data_peparation/family.json';
    import type { FamilyMember } from '../../assets/royals/family.model';

    const land = topojson.feature(europe, europe);
    const graticule = d3.geoGraticule10();
    const outline: d3.GeoSphere = { type: 'Sphere' };
    let canvas: HTMLCanvasElement;

    let width: number, height: number;

    function fixDpi() {
        //get CSS height
        //the + prefix casts it to an integer
        //the slice method gets rid of "px"
        let style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
        //get CSS width
        let style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
        //scale the canvas
        canvas.setAttribute('height', `${style_height}`);
        canvas.setAttribute('width', `${style_width}`);
    }

    const createMap = () => {
        fixDpi();
        const projection = d3.geoTransverseMercator();
        const view = canvas.getBoundingClientRect();
        [width, height] = [view.width, view.height];

        const getHeight = () => {
            const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
            const dy = Math.ceil(y1 - y0),
                l = Math.min(Math.ceil(x1 - x0), dy);
            //projection.scale((2*projection.scale() * (l - 1)) / l).precision(0.2);
            projection
                .fitExtent(
                    [
                        [0, 0],
                        [width, height],
                    ],
                    {
                        type: 'FeatureCollection',
                        features: europe.features.filter((f) => f.properties.name !== 'Russia'),
                    }
                )
                .scale(1400)
                .translate([width * 0.3, height * 2.16]);

            return dy;
        };
        height = getHeight();

        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        const path = d3.geoPath(projection, context);
        context.save();
        context.beginPath();
        path(outline);
        context.clip();
        context.fillStyle = '#fff';
        context.fillRect(0, 0, width, height);
        context.beginPath(), path(graticule), (context.strokeStyle = '#ccc'), context.stroke();
        europe.features.forEach((f) => {
            context.beginPath(), path(f.geometry), (context.fillStyle = '#000'), context.fill();
        });
        context.restore();

        context.beginPath(), path(outline), (context.strokeStyle = '#000'), context.stroke();

        return { context, projection };
    };

    function connectLine(
        context: CanvasRenderingContext2D,
        projection: d3.GeoProjection,
        coordinates: { lat: number; lng: number }[],
        width: number
    ) {
        const path = d3.geoPath(projection, context);
        const link: d3.GeoGeometryObjects = {
            type: 'LineString',
            coordinates: coordinates.map((c) => [c.lng, c.lat]),
        };
        context.lineWidth = width;
        context.beginPath(), path(link), context.strokeStyle = `red`, context.stroke();
    }
    function traverseFamilyMember(
        context: CanvasRenderingContext2D,
        projection: d3.GeoProjection,
        familyMember: FamilyMember,
        level: number = 6
    ) {
        level--;
        if (!familyMember.birthplace || !familyMember.birthplace.lat) return;
        if (familyMember.father?.birthplace) {
            connectLine(context, projection, [familyMember.birthplace, familyMember.father.birthplace], level);
            traverseFamilyMember(context, projection, familyMember.father, level);
        }
        if (familyMember.mother?.birthplace) {
            connectLine(context, projection, [familyMember.birthplace, familyMember.mother.birthplace], level);
            traverseFamilyMember(context, projection, familyMember.mother, level);
        }
    }

    onMount(() => {
        let { context, projection } = createMap();
        traverseFamilyMember(context, projection, royalFamily as FamilyMember);
    });
</script>

<svelte:head>
    <title>Check those mountains</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <div class="page">
        <canvas bind:this={canvas} />
        <div class="notes">
            <div>
                <h1>EU Tourism 2022</h1>
                <div>
                    This chart compares foreign tourist arrivals during the year and compares it to country population;
                </div>
                <br />
                <div>Second part highlights the season period in each country</div>
            </div>
            <div class="comments">
                <div>
                    data source - EuroStat:
                    <ul>
                        <li>
                            <a
                                href="https://ec.europa.eu/eurostat/databrowser/view/TOUR_OCC_ARM__custom_5792777/default/table?lang=en"
                                ><i>Arrivals at tourist accommodation establishments - monthly data</i></a
                            >
                        </li>
                        <li>
                            <a href="https://ec.europa.eu/eurostat/databrowser/view/TPS00001/default/table?lang=en">
                                <i>Population on 1 January</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    canvas {
        width: 90vmin;
        height: 90vmin;
    }
</style>
