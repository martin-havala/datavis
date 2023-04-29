import world from './world.json';
const fs = require('fs');

const res = world.features.map((f) => ({
    ISO3_code: f.properties.iso_a3,
    name: f.properties.name_en,
    labelX: f.properties.label_x,
    labelY: f.properties.label_y,
}));

fs.writeFileSync('worldLabels.json', JSON.stringify(res, null, 4));
