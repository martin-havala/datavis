<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import tradeUrl from '$lib/assets/trade/trades2020.csv?url';
    import countries from '$lib/assets/trade/countries2020.json';
    import world from '$lib/assets/world.json';
    import type { Trade } from '$lib/assets/trade/trade.model';

    // set the dimensions and margins of the graph
    const size = 2000;

    // append the svg object to the body of the page
    let svgElem: SVGElement;
    let svg: d3.Selection<SVGGElement, unknown, any, any>;
    onMount(() => {
        // get the data

        d3.csv(tradeUrl, d3.autoType).then((data) => {
            svg = d3
                .select(svgElem)
                .attr('width', size)
                .attr('height', size)
                .attr('viewBox', [-size / 2, -size / 2, size, size])
                .append('g');

            const zoomHandler = (event: d3.D3ZoomEvent<Element, any>) => {
                svg.attr('transform', event.transform.toString());
            };
            const zoom = d3.zoom().scaleExtent([0.1, 10]).on('zoom', zoomHandler);

            d3.select(svgElem).call(zoom);
            makeSinglePlot(
                countries,
                (data as Trade[]).filter((d) => d.Weight > 5_00000)
            );
        });
    });

    function makeSinglePlot(trade_nodes: string[], trade_links: Trade[]) {
        const nodesMap = trade_nodes.reduce((a, c, i) => ({ ...a, [c]: i }), {} as { [i: string]: number });
        const nodes = d3.map(trade_nodes, (name, id) => {
            const w = world.features.find((f) => f.properties.iso_a3 == name);
            return {
                id: id,
                name,
                x: +(w?.properties?.label_x ?? '') * 100,
                y: -+(w?.properties?.label_y ?? '') * 100,
                total: 0,
            };
        });
        const links = d3.map(trade_links, (origin, i) => ({
            source: nodesMap[origin.Exporter],
            target: nodesMap[origin.Importer],
            origin,
        }));

        links.forEach((l) => {
            const node = nodes[nodesMap[l.origin.Exporter]];
            node.total = node.total + l.origin.Weight;
        });
        const forceLink = d3.forceLink(links).id((n) => nodes[n.index ?? 0].id);
        forceLink.strength((d) => {
            return 1 / Math.log(d.origin.Value);
        });

        console.log(nodes);
        const simulation = d3
            .forceSimulation(nodes as d3.SimulationNodeDatum[])
            .force('charge', d3.forceManyBody().strength(0))
            .force(
                'collide',
                d3.forceCollide().radius(50)
            )
            .force('link', forceLink)
            .force('center', d3.forceCenter(0, 0))
            .stop();

        const link = svg
            .append('g')
            .attr('stroke', '#555')
            .attr('stroke-opacity', '.6')
            .attr('stroke-linecap', 'round')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke-width', 4);
        link.append('title').text((d) => `${d.origin.Weight}`);

        const node = svg
            .append('g')
            .attr('stroke-width', '10')
            .attr('stroke-opacity', '.1')
            .attr('paint-order', 'stroke fill')
            .selectAll('.point')
            .data(nodes)
            .join('g')
            .attr('class', 'point')
            .attr('fill', 'red')
            .attr('font-size', 50)

            .append('text')
            .attr('r', '10');
        node.text((d) => d.name); //.append('title')

        node.call(drag(simulation));

        function ticked() {
            link.attr('x1', (d: any) => d.source.x)
                .attr('y1', (d: any) => d.source.y)
                .attr('x2', (d: any) => d.target.x)
                .attr('y2', (d: any) => d.target.y);
            node.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
        }

        for (let i = 0; i < 200; i++) {
            simulation.tick();
        }
        ticked();
        simulation.alphaTarget(1);
        // simulation.on('tick', ticked).restart();
        // setTimeout(() => {
        //     simulation.stop();
        // }, 5000);
        let tmt: NodeJS.Timeout;
        function drag(simulation: d3.Simulation<any, any>) {
            // todo
            function dragstarted(event: d3.D3DragEvent<any, any, any>) {
                !!tmt && clearTimeout(tmt);
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event: d3.D3DragEvent<any, any, any>) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event: d3.D3DragEvent<any, any, any>) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
                tmt = setTimeout(() => simulation.stop(), 5_000);
            }

            return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
        }
    }
</script>

<svelte:head>
    <title>World trade 2020</title>
</svelte:head>

<section>
    <div class="page">
        <div class="svgContainer">
            <svg bind:this={svgElem} xmlns:xlink="http://www.w3.org/1999/xlink" />
        </div>
        <div class="notes">
            <div>
                <h1>World Trade 2020</h1>

                <div class="comments">
                    data source: <a href="https://www.imdb.com/interfaces/" target="about:blank">IMDB</a>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .svgContainer {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
    }
    svg {
        width: 120vw;
        height: 120vh;
    }
</style>
