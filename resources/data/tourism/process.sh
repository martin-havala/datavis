#!/bin/sh

#  sources: 

#  arrivals: https://ec.europa.eu/eurostat/databrowser/view/TOUR_OCC_ARM__custom_5792777/default/table?lang=en
#  tourism: https://ec.europa.eu/eurostat/databrowser/view/TOUR_OCC_NIM__custom_5791912/default/table?lang=en
#  population : https://ec.europa.eu/eurostat/databrowser/view/TPS00001/default/table?lang=en

sqlite3 EU_travel.db < ./process.sql
sqlite3 -header -json ./EU_travel.db < ./arrivals.sql > arrivals.json
sqlite3 -header -json ./EU_travel.db < ./tourists.sql > tourists.json