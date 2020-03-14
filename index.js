const fs = require('fs');
const path = require('path');

/**
 * Time Series Data
 * Current Format:
 *   Province/State, Country/Region, Lat, Long, DATES ...
 */
const confirmedCasesPath = path.join(__dirname, '..', 'COVID-19', 'csse_covid_19_data', 'csse_covid_19_time_series', 'time_series_19-covid-Confirmed.csv');
const deathCasesPath = path.join(__dirname, '..', 'COVID-19', 'csse_covid_19_data', 'csse_covid_19_time_series', 'time_series_19-covid-Deaths.csv');
const recoveredCasesPath = path.join(__dirname, '..', 'COVID-19', 'csse_covid_19_data', 'csse_covid_19_time_series', 'time_series_19-covid-Recovered.csv');
const timeSeriesSources = [
    {
        name: 'COVID Confirmed Time Series',
        outputName: 'covid-confirmed-series',
        path: confirmedCasesPath,
        description: 'Data source from John Hopkins repo. Confirmed cases time series.'
    },
    {
        name: 'COVID Deaths Time Series',
        outputName: 'covid-deaths-series',
        path: deathCasesPath,
        description: 'Data source from John Hopkins repo. Death cases time series.'
    },
    {
        name: 'COVID Recovered Time Series',
        outputName: 'covid-recovered-series',
        path: recoveredCasesPath,
        description: 'Data source from John Hopkins repo. Recovered cases time series.'
    },
];

/**
 * Process the CSV readable passed and return an array of the headers and a table of the data.
 * @param {readable} csvReadable 
 * @returns {{'headers': Array<String>, 'data': Array<Array<String>>}}
 */
async function processCSV(csvReadable) {
    let allData = '';
    for await (const chunk of csvReadable) {
        allData = allData.concat(chunk);
    }

    // Process Data into a table (note this is currently in memory, consider moving to processing in chunks.
    const rows = allData.split('\n');
    const headers = rows[0].split(",");
    const data = rows.slice(1);
    const splitData = data.map((row) => row.split(","))

    return {
        'headers': headers,
        'data': splitData,
    };
}

/**
 * Writes the passed JSON object to a file at the path specified.
 * Note: As of now, the directory must already exist. This could be updated in the future.
 * @param {String} fileDescription Short description used for error logging.
 * @param {*} jsonObj The JSON object to write to a file.
 * @param {*} filePath  Path to store the file.
 */
function writeJsonFile(fileDescription, jsonObj, filePath) {
    const stringifiedJson = JSON.stringify(jsonObj);
    fs.writeFile(filePath, stringifiedJson, 'utf8', function (err) {
        if (err) {
            console.log(`Error while saving JSON file for -- ${fileDescription}`);
            return console.log(err);
        }
        console.log(`${fileDescription} -- updated JSON file saved.`);
    });
}

/**
 * Process the time series files into Objects. 
 * 
 * Note: these time series only diff by a single day for each update, so rows could be 
 * updated by just updating with new days in the future.
 * @param {Array<{name: String, path: String, description: String}>} timeSeries  The Time Series source object describing the series being processed.
 */
async function processTimeSeries(timeSeries) {
    for (const series of timeSeries) {
        const timeSeriesObj = {};

        const seriesReadable = fs.createReadStream(series.path, {encoding: 'utf8'});
        const {headers, data} = await processCSV(seriesReadable);

        for (const row of data) {
            const rowObj = {};
            for (const [i, entry] of row.entries()) {
                rowObj[headers[i]] = entry;
            }
            const title = rowObj['Province/State'] ? `${rowObj['Country/Region']} - ${rowObj['Province/State']}` : rowObj['Country/Region'];
            timeSeriesObj[title] = rowObj;
        }
        const jsonPath = path.join(__dirname, 'data', `${series.outputName}.json`);
        writeJsonFile(series.name, timeSeriesObj, jsonPath);
    }
}
processTimeSeries(timeSeriesSources);