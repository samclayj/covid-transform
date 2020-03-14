const fs = require('fs');

var path = require('path');

const confirmedCasesPath = path.join(__dirname, '..', 'COVID-19', 'csse_covid_19_data', 'csse_covid_19_time_series', 'time_series_19-covid-Confirmed.csv');
const deathCasesPath = path.join(__dirname, '..', 'COVID-19', 'csse_covid_19_data', 'csse_covid_19_time_series', 'time_series_19-covid-Deaths.csv');
const recoveredCasesPath = path.join(__dirname, '..', 'COVID-19', 'csse_covid_19_data', 'csse_covid_19_time_series', 'time_series_19-covid-Recovered.csv');

fs.readFile(csvPath, (err, data) => {
    if (err) throw err;
    console.log(data);
}, 'utf8');