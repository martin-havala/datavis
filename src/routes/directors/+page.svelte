
<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import movie_nodes from '../../lib/assets/network/nodes.json';
    import movie_links from '../../lib/assets/network/links.json';
    import directors from '../../lib/assets/network/directors.json';
    import type { Node, Link, ForceModel } from '../../lib/assets/network/network.model';

    // set the dimensions and margins of the graph
    const size = 2000;

    // append the svg object to the body of the page
    let svgElem: SVGElement;
    let svg: d3.Selection<SVGGElement, unknown, any, any>;
    onMount(() => {
        // get the data

        svg = d3
            .select(svgElem)
            .attr('width', size)
            .attr('height', size)
            .attr('viewBox', [-size / 2, -size / 2, size, size])
            .append('g');

            const zoomHandler = (event: d3.D3ZoomEvent<Element, any>) => {
            svg.attr('transform', event.transform.toString());
        };
        const zoom = d3.zoom().scaleExtent([.1, 10]).on('zoom', zoomHandler);

        d3.select(svgElem).call(zoom);
        makeSinglePlot(movie_nodes,movie_links);
    });

    function makeSinglePlot(movie_nodes:Node[], movie_links:Link[]) {

        const nodes = d3.map(movie_nodes, (b, index) => ({ id: movie_nodes[index].id, count:b.count  }));
        const links = d3.map(movie_links, (b, i) => ({ source: b.source, target: b.target, origin: b }));

        const forceNode = d3.forceManyBody();
        const forceLink = d3.forceLink(links).id(({ index }) => movie_nodes[index as number].id);
         forceLink.distance(d => {
            return Math.max(d.source.count,50)
        });

        const color = d3.scaleSequential().domain([1,20]).interpolator(d3.interpolateViridis);
        const simulation = d3
            .forceSimulation(nodes)
            .force('link', forceLink)
            .force('charge', forceNode)
            .force('center', d3.forceCenter(0,0))
            .stop();
            

        const link = svg
            .append('g')
            .attr('stroke', '#555')
            .attr('stroke-opacity', '.6')
            .attr('stroke-linecap', 'round')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke-width', (d) => 2 + d.origin.count)
        link.append('title').text( (d) => `${d.origin.count}` )

        const node = svg
            .append('g')
            .attr('stroke-width','10')
            .attr('stroke-opacity','.1')
            .attr('paint-order','stroke fill')
            .selectAll('a')
            .data(nodes)
            .join('a')
            .attr('xlink:href', d=>`https://imdb.com/name/${d.id}`)
            .attr('xlink:title', "Check author at imdb.com")
            .append('circle')
            .attr('fill', (d) => color(d.count))
            .attr('stroke',(d) => color(d.count))
            .attr('r', (d) => 2 + Math.sqrt(d.count))
            .join('title').text( (d) => d.count);

        node.call(drag(simulation));
        node.append('title')
            .text((d) => `${directors[d.id]?.primaryName ?? d.id} - ${d.count} colaborations`);

        function ticked() {
            link.attr('x1', (d: any) => d.source.x)
                .attr('y1', (d: any) => d.source.y)
                .attr('x2', (d: any) => d.target.x)
                .attr('y2', (d: any) => d.target.y);
            node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
        }

        simulation.on('tick', ticked).restart();
        setTimeout(() => {
        simulation.stop()

    }, 5000);
    let tmt:NodeJS.Timeout;
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
                tmt = setTimeout(()=> simulation.stop(), 5_000)
            }

            return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
        }
    }
</script>

<svelte:head>
    <title>Movie Director Collaborations</title>
</svelte:head>

<section>
    
    <div class="page">
        <div class='svgContainer'>
            <svg bind:this={svgElem}  xmlns:xlink="http://www.w3.org/1999/xlink"/>
        </div>
        <div class="notes">
            <div>
                <h1>Director colaborations </h1>
                <div>
                    Many films were directed by more than one director, let's take a look at the top coworking directors at once.
                      Each director here has collaborated with other director at least on 10 films.
                </div>
                <div class="comments">
                    data source: <a href="https://www.imdb.com/interfaces/" target="about:blank">IMDB</a>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .svgContainer{
        position: fixed;
        top:0;
        left:0;
        height:100vh;
        width:100vw;
    }
    svg {
        width: 120vw;
        height: 120vh;
    }
</style>
