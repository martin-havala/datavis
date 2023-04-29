const fs = require('fs');

const world = require('./world.json');

const res = world.features.map((f) => ({
    ISO3_code: f.properties.iso_a3,
    name: f.properties.name_en,
    labelX: f.properties.label_x,
    labelY: f.properties.label_y,
}));

const svg = world.features
    .map(
        (f) => `
{
    
    <text 
    x="${f.properties.label_x * 50}"  y="${-f.properties.label_y * 50}">${f.properties.iso_a3}</text>
    
    
}`
    )
    .join('');

fs.writeFileSync('worldLabels.json', JSON.stringify(res, null, 4));
fs.writeFileSync('worldLabels.svg', `<svg >${svg}</svg>`);
