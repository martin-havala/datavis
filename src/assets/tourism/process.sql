/*

sources: 

arrivals: https://ec.europa.eu/eurostat/databrowser/view/TOUR_OCC_ARM__custom_5792777/default/table?lang=en
tourism: https://ec.europa.eu/eurostat/databrowser/view/TOUR_OCC_NIM__custom_5791912/default/table?lang=en
population : https://ec.europa.eu/eurostat/databrowser/view/TPS00001/default/table?lang=en

import


sqlite3 EU_travel.db
sqlite3 EU_travel.db < ./process.sql
sqlite3 -header -json ./EU_travel.db < ./arrivals.sql > arrivals.json
sqlite3 -header -json ./EU_travel.db < ./tourists.sql > tourists.json

*/
.mode csv
DROP TABLE tourism;
DROP TABLE arrivals;
DROP TABLE population;
.import EU_tourism.csv tourism
.import EU_arrivals.csv arrivals
.import EU_population.csv population



DROP TABLE my_arrivals;
DROP TABLE my_tourism;
CREATE TABLE my_tourism AS 
    SELECT unit, geo,TIME_PERIOD, SUM(OBS_VALUE) as OBS_VALUE 
    FROM tourism 
    WHERE c_resid = 'FOR' AND unit = 'NR' and nace_r2='I551-I553' AND length(geo)=2
    GROUP BY unit, geo, TIME_PERIOD;

CREATE TABLE my_arrivals  AS SELECT unit, geo,TIME_PERIOD, SUM(OBS_VALUE) as OBS_VALUE 
    FROM arrivals 
    WHERE c_resid = 'FOR' AND unit = 'NR' and nace_r2='I551-I553' AND length(geo)=2
    GROUP BY unit, geo, TIME_PERIOD;
/*

 */