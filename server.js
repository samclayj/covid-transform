const express = require('express')
const path = require('path');

const app = express()
const port = 3000

const confirmedCasesPath = path.join(__dirname, 'data', 'covid-confirmed-series.json');
const deathCasesPath = path.join(__dirname, 'data', 'covid-deaths-series.json');
const recoveredCasesPath = path.join(__dirname, 'data', 'covid-recovered-series.json');

/**
 * Handlers for the time series files.
 */
app.get('/series/confirmed', (req, res) => {
    console.log('Processing request for confirmed cases time series.');
    res.sendFile(confirmedCasesPath)
});

app.get('/series/deaths', (req, res) => {
    console.log('Processing request for deaths time series.');
    res.sendFile(deathCasesPath)
});

app.get('/series/recovered', (req, res) => {
    console.log('Processing request for recovered time series.');
    res.sendFile(recoveredCasesPath)
});

app.listen(port, () => console.log(`Listening on ${port}...`));
