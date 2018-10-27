const allDatumLabels = require("./allDatumLabels");
const datatypes = allDatumLabels.datatypes;

const TYPE_ERROR_STRING = new TypeError("The searchData parameter must be a string.");

const REGEX_MULTIPLE_BODIES_FOUND = /[\*]*[\n|\r\n]\sMultiple/;
const REGEX_SINGLE_BODY_FOUND = /[\*]*[A-Za-z0-9\s\n\r:;+\-.,'=()~!@#$%^&*\/\"]*(PHYSICAL PROPERTIES|PHYSICAL DATA)/;

const REGEX_DATA_EXTRACTOR = /(?<=\=[\s]*[\~]*[\+]*[\-]*[\s]*)[0-9\.\/x]*/g
const REGEX_MAGNITUDE_EXTRACTOR = /10\^[0-9]*/g
const REGEX_ERROR_EXTRACTOR = /(?<=\+\-[\s]*)[0-9\.]*/g;
const REGEX_NAME_EXTRACTOR = /(?<=Revised: [A-Za-z]* [0-9]{1,2}\, [0-9]{2,4}[\s]{2,})[A-Za-z0-9\\\/\-\(\)\,]+( \/ \([A-Za-z0-9]*\))?/gi;
const REGEX_ID_EXTRACTOR = / /g;

module.exports = function parseSearchData(searchData) {
    if(typeof searchData !== "string") {
        throw TYPE_ERROR_STRING;
    }

    let dataLine;
    let dataArray = [];
    let parsedData = [];
    let i = 0;

    if(searchData.match(REGEX_SINGLE_BODY_FOUND)) {
        console.log("We have uniquely specified a body");
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
                let { value, magnitude, error, units } = parseRawData(raw);

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
    else if(searchData.match(REGEX_MULTIPLE_BODIES_FOUND)) {
        console.log(`We have found multiple bodies that match the query`);

        dataArray = searchData.split(/[\*]{2,}/)[1].split(/[\n|\r\n]/); //extract table data
        dataArray = dataArray.filter((line) => line.trim() !== "");

        let startIndex = dataArray.findIndex((line) => line.match(/[\-]{2,}/));
        startIndex++;
        let endIndex = dataArray.findIndex((line) => line.includes("Number of matches"));
        dataArray = dataArray.slice(startIndex, endIndex);
        
        let brokenString = [];
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
    else {
        console.log("The data is of an unknown structure, and could not be parsed");
    }
}

function parseRawData(raw) {
    let value, magnitude, units, error;

    value = raw.match(REGEX_DATA_EXTRACTOR);
    value = value && value.find(x => x);

    magnitude = raw.match(REGEX_MAGNITUDE_EXTRACTOR);
    magnitude = magnitude && magnitude.find(x => x);

    error = raw.match(REGEX_ERROR_EXTRACTOR);
    error = error && error.find(x => x);

    //TODO: create units extractor regex and pass it as units

    return ({ value, magnitude, units, error });
}


function parsePhysicalDataLine(line) {
    let brokenLine = line.split(/[\s]*\(|\)[\s]*\=[\s]*|\)[\s]*|[\s]+[\=\+\-]*[\s]+/);

    return({
        name: (brokenLine[0] && brokenLine[0].replace(/[\s]*/g, "")) || undefined,
        units: brokenLine[1] || undefined,
        value: brokenLine[2] || undefined,
        error: brokenLine[4] || undefined,
    });
}

function parseOrbitalDataLine(line) {
    let brokenLine = line.split(/[\s]*\((?=[A-Za-z])|\)[\s]*\=[\s]*|[\s]{2,}|\=[\s]*/);

    return({
        name: (brokenLine[0] && brokenLine[0].replace(/\,\s[A-Za-z]{1}|\-|\s/g, "")) || undefined,
        units: brokenLine[1] || undefined,
        value: brokenLine[2] || undefined,
        error: brokenLine[3] || undefined
    });
}