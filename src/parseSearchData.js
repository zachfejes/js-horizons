const allDatumLabels = require("./allDatumLabels");
const datatypes = allDatumLabels.datatypes;

const TYPE_ERROR_STRING = new TypeError("The searchData parameter must be a string.");

const REGEX_MULTIPLE_BODIES_FOUND = /[\*]*[\n|\r\n]\sMultiple/;
const REGEX_SINGLE_BODY_FOUND = /[\*]*[A-Za-z0-9\s\n\r:;+\-.,'=()~!@#$%^&*\/\"]*(PHYSICAL PROPERTIES|PHYSICAL DATA|physical parameters)/;

const REGEX_DATA_EXTRACTOR = /(?<=\=[\s]*[\~]*(\+\-)*[\s]*)(Synchronous|(\-|\+)?[0-9\.\/x]*)/g
const REGEX_MAGNITUDE_EXTRACTOR = /10\^[0-9]*/g
const REGEX_ERROR_EXTRACTOR = /(?<=\+\-[\s]*)[0-9\.]*/g;
const REGEX_ALT_ERROR_EXTRACTOR = /(?<=[0-9\.]+\([0-9]+\+\-)[0-9]*/g;
const REGEX_ALT_ERROR_DIGIT_EXTRACTOR = /(?<=[0-9\.]+\()[0-9]*/g;
const REGEX_NAME_EXTRACTOR = /(?<=Revised: [A-Za-z]* [0-9]{1,2}\, [0-9]{2,4}[\s]{2,})[A-Za-z0-9\\\/\-\(\)\,]+( \/ \([A-Za-z0-9]*\))?/gi;
const REGEX_SOLAR_DATA_EXTRACTOR = /[\s]{2,}[0-9\.]+[\s]{2,}[0-9\.]+[\s]{2,}[0-9\.]+/g
const REGEX_GM_SIGMA_EXTRACTOR = /(?<=\+\-[\s]*)[0-9\.]+/g;
const REGEX_TIME_DATA_EXTRACTOR = /(?<=\=[\s]*[\~]*[\s]*)([0-9\.\/x]+[\s]*[ydhms]([\s]|$))+/g

const IRDatatypes = [
    "Solar Constant",
    "Maximum Planetary IR",
    "Minimum Planetary IR"
];

const timeDatatypes = [
    "Sidereal Orbital Period",
    "Sidereal Rotational Period",
    "Orbital Period",
    "Mean Solar Day"
];

module.exports = function parseSearchData(searchData) {
    if(typeof searchData !== "string") {
        throw TYPE_ERROR_STRING;
    }

    let dataArray = [];
    let parsedData = [];

    if(searchData.match(REGEX_SINGLE_BODY_FOUND)) {
        return parseSingleBody(searchData);
    }
    else if(searchData.match(REGEX_MULTIPLE_BODIES_FOUND)) {
        return parseMultipleBodies(searchData);
    }
    else {
        console.log("The data is of an unknown structure, and could not be parsed. Returning original string.");
        dataArray = searchData.split(/\*{10,}/g);
        parsedData.push(dataArray[1].trim());
        return(parsedData);
    }
}

function parseSingleBody(searchData) {
    console.log("We have uniquely specified a body");
    let parsedData = [];
    let name = searchData.match(REGEX_NAME_EXTRACTOR);
    name = name && name[0] && name[0].trim();

    parsedData.push({
        id: undefined,
        name: name
    });

    datatypes.forEach(datum => {
        raw = searchData.match(datum.regex);
        raw = raw && raw[0] && raw[0].trim();

        if(raw) {
            var { value, magnitude, error, units } = parseRawData(raw, datum);

            parsedData[0][datum.label] = {
                raw,
                value,
                magnitude,
                error,
                units: units || datum.units
            }
        }
    });

    return parsedData;
}

function parseMultipleBodies(searchData) {
    console.log(`We have found multiple bodies that match the query`);
    let dataArray = [];
    let parsedData = [];
    let startIndex, endIndex, brokenString, i;

    dataArray = searchData.split(/[\*]{2,}/)[1].split(/[\n|\r\n]/); //extract table data
    dataArray = dataArray.filter((line) => line.trim() !== "");

    startIndex = dataArray.findIndex((line) => line.match(/[\-]{2,}/));
    startIndex++;
    endIndex = dataArray.findIndex((line) => line.includes("Number of matches"));
    dataArray = dataArray.slice(startIndex, endIndex);
    
    brokenString = [];
    for(i = 0; i < dataArray.length; i++) {
        dataArray[i] = dataArray[i].trim();
        brokenString = dataArray[i].split(/(?<!\s)[\s]{2}|[\s]{2}(?!\s)/g);

        parsedData.push({
            id: brokenString[0],
            name: brokenString[1],
            designation: brokenString[2] && brokenString[2].trim() !== "" ? brokenString[2] : undefined,
            iau: brokenString[3] && brokenString[3].trim() !== "" ? brokenString[3] : undefined
        });
    }

    return(parsedData);
}

function parseRawData(raw, datum) {
    let value, magnitude, units, error;

    value = findValue(raw, datum) || undefined;
    error = findError(raw, datum) || undefined;
    units = findUnits(raw, datum) || undefined;
    magnitude = findMagnitude(raw) || undefined;

    return ({ value, magnitude, units, error });
}

function findValue(raw, datum) {
    let value, _value, altError, lastDigit;

    if(IRDatatypes.indexOf(datum.label) > -1) {
        _value = raw.match(REGEX_SOLAR_DATA_EXTRACTOR);
        _value = _value && _value[0];
        _value = _value && _value.trim() && _value.split(/[\s]{2,}/).filter(x => x);
        value = {
            Perihelion: _value[0],
            Aphelion: _value[1],
            Mean: _value[2]
        };
    }
    else if(datum.label === "GM 1-sigma") {
        value = raw.match(REGEX_GM_SIGMA_EXTRACTOR);
        value = value && value.find(x => x);
    }
    else if(datum.label === "Mean Solar Day" && raw.indexOf("hrs") > -1) {
        value = raw.match(REGEX_DATA_EXTRACTOR);
        value = value && value.find(x => x);
    }
    else if (timeDatatypes.indexOf(datum.label) > -1) {
        value = raw.match(REGEX_TIME_DATA_EXTRACTOR);
        value = value && value.find(x => x);
    }
    else {
        value = raw.match(REGEX_DATA_EXTRACTOR);
        value = value && value.find(x => x);
    }

    altError = raw.match(REGEX_ALT_ERROR_EXTRACTOR);
    altError = altError && altError.find(x => x);

    if(altError) {
        lastDigit = raw.match(REGEX_ALT_ERROR_DIGIT_EXTRACTOR);
        lastDigit = lastDigit && lastDigit.find(x => x !== undefined && x !== '');

        value = value.toString() + lastDigit.toString();
    }

    return value;
}

function findError(raw, datum) {
    let error, altError, value;

    if(datum.label === "GM 1-sigma") {
        return undefined;
    }

    error = raw.match(REGEX_ERROR_EXTRACTOR);
    error = error && error.find(x => x);
    altError = raw.match(REGEX_ALT_ERROR_EXTRACTOR);
    altError = altError && altError.find(x => x);

    if(altError) {
        value = raw.match(REGEX_DATA_EXTRACTOR);
        value = value && value.find(x => x)
        value = value && value.replace(/[0-9]/g, "0");
        error = value.toString() + altError.toString();
    }

    return error;
}

function findUnits(raw, datum) {
    let units;

    if(datum.label === "Mean Solar Day" && raw.indexOf("hrs") > -1) {
        units = "h";
    }
    else if (timeDatatypes.indexOf(datum.label) > -1) {
        units = "mixed";
    }

    return units;
}

function findMagnitude(raw) {
    let magnitude = raw.match(REGEX_MAGNITUDE_EXTRACTOR);
    return magnitude && magnitude.find(x => x);
}