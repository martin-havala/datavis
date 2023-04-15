import * as d3 from 'd3';
import { MOOD_IMAGE, type CurrData } from '$lib/model';
import { debug } from 'svelte/internal';

export function analyseData(data: CurrData[]): {
    data: any;
    moodImg: MOOD_IMAGE;
    lines: any[][];
    skyline: any[];
} {
    const [min, max] = d3.extent([...data.map((d: CurrData) => d.priceUsd), 0]);
    const blur = Math.ceil(data.length / 23);
    const blurredData: CurrData[] = [];
    for (let i = blur; i < data.length; i++) {
        blurredData.push({
            date: data[i].date,
            priceUsd: data.slice(i - blur, i).reduce((ac, v, i) => ac + (i * +v.priceUsd) / blur, 0),
            time: data[i].time,
        });
    }
    const hills = [data.slice(0, blur)];
    blurredData.reduce(
        (ac, v, i) => {
            if (i === blurredData.length - 1) {
                hills.push(data.slice(ac.startIndex + blur));
            }
            if (v.priceUsd > blurredData[i > 0 ? i - 1 : i].priceUsd) {
                if (!ac.growing && i - ac.startIndex > blur) {
                    hills.push(data.slice(ac.startIndex + blur, i + blur));

                    return {
                        startIndex: i,
                        peakIndex: i,
                        peakValue: Number.MIN_SAFE_INTEGER,
                        growing: true,
                    };
                }
                if (v.priceUsd > ac.peakValue) {
                    return {
                        ...ac,
                        peakIndex: i,
                        peakValue: v.priceUsd,
                        growing: true,
                    };
                }
            }
            return {
                ...ac,
                growing: false,
            };
        },
        {
            startIndex: 0,
            peakIndex: 0,
            peakValue: Number.MIN_SAFE_INTEGER,
            growing: true,
        }
    );
    const lastSegment = hills[hills.length - 1];

    const moodImg =
        data[0].priceUsd < data[data.length - 1].priceUsd
            ? data[data.length - lastSegment.length ?? 1].priceUsd < lastSegment[lastSegment.length - 1].priceUsd
                ? MOOD_IMAGE.HAPPY
                : MOOD_IMAGE.DISAPPOINTED
            : MOOD_IMAGE.SAD;

    const points: CurrData[] = [];
    hills.forEach((h) => {
        const min = d3.minIndex(h.map((h) => h.priceUsd));
        const max = d3.maxIndex(h.map((h) => h.priceUsd));
        min > max ? points.push(h[max], h[min]) : points.push(h[min], h[max]);
    });

    const optimizedPoints: object = points.reduce((ac, p, i) => {
        if (i === 0 || i > points.length - 2) {
            return { ...ac, [p.date]: p };
        }
        if (
            (p.priceUsd > points[i - 1].priceUsd && p.priceUsd > points[i + 1].priceUsd) ||
            (p.priceUsd < points[i - 1].priceUsd && p.priceUsd < points[i + 1].priceUsd)
        ) {
            return { ...ac, [p.date]: p };
        }
        return ac;
    }, {});

    const res: CurrData[][] = [[]];
    const skyline: CurrData[] = [];
    let buf: CurrData[] = [];

    data.forEach((p, i) => {
        if ((!!(optimizedPoints as any)[`${p.date}`] && buf.length) || i == data.length - 1) {
            buf.push(p);
            let buf2: CurrData[] = [];
            if (buf[0].priceUsd > p.priceUsd) {
                const downLine = Math.floor(Math.random() * buf.length * 0.7);
                buf2 = buf.slice(0, downLine).map((p, i) => ({
                    date: new Date(p.date.getTime() + buf[buf.length - 1].date.getTime() - buf[0].date.getTime()),
                    priceUsd: p.priceUsd + buf[buf.length - 1].priceUsd - buf[0].priceUsd,
                    time: 0,
                }));
            }
            const skylinePart = buf.filter((p, i) => (i == 0 || i == buf.length - 1 ? 1 : Math.random() > 0.6));
            res.push([...skylinePart, ...buf2]);
            skyline.push(...skylinePart);
            buf = [];
        }
        buf.push(p);
    });
    return { data, moodImg, lines: [...res], skyline };
}

export function renderData(
    svg: SVGElement,
    xScale: d3.xScale,
    yScale: d3.yScale,
    line: d3.line,
    { data, lines, skyline }: { data: CurrData[]; lines: CurrData[][]; skyline: CurrData[] }
) {
    const plot = d3.select(svg).selectChild('#plot');
    const hills = d3.select(svg).selectChild('#hills');
    const hills2 = d3.select(svg).selectChild('#hills2');
    const [minV, maxV] = d3.extent([...data.map((d) => d.priceUsd), 0]);
    const [minD, maxD] = d3.extent([...data.map((d) => d.date)]);

    xScale.domain([minD, maxD]);
    yScale.domain([minV, maxV]);
    renderHills(line, xScale, yScale, hills, lines, skyline);
    renderHills(line, xScale, yScale, hills2, lines, skyline);
    renderPlot(line, plot, data);
}

function renderHills(
    line: d3.line,
    xScale: d3.xScale,
    yScale: d3.yScale,
    hills: d3.Selection,
    lines: d3.Selection,
    skyline: CurrData[]
) {
    hills
        .selectAll('path.skyline')
        .data([skyline], (p) => p.date)
        .join(
            (enter) => {
                const res = enter.append('path').attr('class', 'enter skyline');
                setTimeout(() => {
                    res.attr('class', 'entered skyline');
                }, 1);
                return res;
            },
            (update) => update.attr('class', 'update skyline'),
            (exit) => {
                exit.attr('class', 'exit skyline');
                setTimeout(() => exit.remove(), 400);
            }
        )
        .attr('d', (d) =>
            line([
                [xScale.invert(0), yScale.invert(270)],
                ...d.map((p) => [p.date, p.priceUsd]),
                [xScale.invert(300), yScale.invert(270)],
            ])
        )
        .attr('stroke-width', (d, i) => (lines.length * 2 - i) / lines.length);

    hills
        .selectAll('path.peaks')
        .data(lines, (p) => p.date)
        .join(
            (enter) => {
                const res = enter.append('path').attr('class', 'enter peaks');
                setTimeout(() => {
                    res.attr('class', 'entered peaks');
                }, 1);
                return res;
            },
            (update) => update.attr('class', 'update peaks'),
            (exit) => {
                exit.attr('class', 'exit ');
                setTimeout(() => exit.remove(), 400);
            }
        )
        .attr('d', (d) => line(d.map((p) => [p.date, p.priceUsd])))
        .attr('stroke-width', (d, i) => (lines.length * 3 - i) / lines.length);
}

export function renderPlot(line, plot, data) {
    plot.selectAll('path.currency')
        .data([data])
        .join(
            (enter) => {
                const res = enter.append('path').attr('class', 'enter currency');
                setTimeout(() => {
                    res.attr('class', 'entered currency');
                }, 1);
                return res;
            },
            (update) => update.attr('class', 'update currency'),
            (exit) => {
                exit.attr('class', 'exit currency');
                setTimeout(() => exit.remove(), 400);
            }
        )
        .attr('d', (d) => line(d.map((p) => [p.date, p.priceUsd])));
}
