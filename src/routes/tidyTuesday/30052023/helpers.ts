import { line, curveCatmullRom } from 'd3';

export const catmulRomLine = line<[number, number] | GeoJSON.Position>()
    .curve(curveCatmullRom)
    .x((d) => d[0])
    .y((d) => d[1]);

export const simpleLine = line<[number, number] | GeoJSON.Position>()
    .x((d) => d[0])
    .y((d) => d[1]);

export const fieldData = [
    { x: 99, y: 800 },
    { x: 138, y: 900 },
    { x: 164, y: 711 },
    { x: 174, y: 653 },
    { x: 167, y: 591 },
    { x: 142, y: 529 },
    { x: 99, y: 500 },
    { x: 39, y: 470 },
    { x: -35, y: 382 },
    { x: -124, y: 359 },
    { x: -224, y: 679 },
];

export function polarLine(center: GeoJSON.Position, angleDeg: number) {
    const angle = angleDeg * (Math.PI / 180);
    const x = center[0] + 5000 * Math.cos(angle);
    const y = center[1] - 5000 * Math.sin(angle);
    return [center, [x, y]] as [GeoJSON.Position, GeoJSON.Position];
}

export function lineIntersection(
    [[a, b], [c, d]]: [GeoJSON.Position, GeoJSON.Position],
    [[p, q], [r, s]]: [GeoJSON.Position, GeoJSON.Position]
): null | GeoJSON.Position {
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return null;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;

        if (0 < lambda && lambda < 1 && 0 < gamma && gamma < 1) {
            return [a + (c - a) * lambda, b + (d - b) * lambda];
        }
        return null;
    }
}

export function contourIntersection(contour: GeoJSON.Position[], centerPoint: GeoJSON.Position, angle: number = 0) {
    const crossLine = polarLine(centerPoint, angle);

    for (let i = 0; i < contour.length - 1; i++) {
        const simpleLine: [GeoJSON.Position, GeoJSON.Position] = [contour[i], contour[i + 1]];
        const position = lineIntersection(crossLine, simpleLine);
        if (position) {
            return position;
        }
    }
    return null;
}
