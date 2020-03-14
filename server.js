const express = require('express')
const path = require('path');

const app = express()
const port = 3000

const confirmedCasesPath = path.join(__dirname, 'data', 'covid-confirmed-series.json');
const deathCasesPath = path.join(__dirname, 'data', 'covid-deaths-series.json');
const recoveredCasesPath = path.join(__dirname, 'data', 'covid-recovered-series.json');

app.get('/series/confirmed', (req, res) => res.sendFile(confirmedCasesPath));
app.get('/series/deaths', (req, res) => res.send(deathCasesPath));
app.get('/series/recovered', (req, res) => res.send(recoveredCasesPath));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
