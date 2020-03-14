const fs = require('fs');
const path = require('path');

const confirmedCasesPath = path.join(__dirname, '..', 'COVID-19', 'csse_covid_19_data', 'csse_covid_19_time_series', 'time_series_19-covid-Confirmed.csv');
const deathCasesPath = path.join(__dirname, '..', 'COVID-19', 'csse_covid_19_data', 'csse_covid_19_time_series', 'time_series_19-covid-Deaths.csv');
const recoveredCasesPath = path.join(__dirname, '..', 'COVID-19', 'csse_covid_19_data', 'csse_covid_19_time_series', 'time_series_19-covid-Recovered.csv');

const readable = fs.createReadStream(
  confirmedCasesPath, {encoding: 'utf8'});

async function logChunks(readable) {
  for await (const chunk of readable) {
    console.log(chunk);
  }
}
logChunks(readable);