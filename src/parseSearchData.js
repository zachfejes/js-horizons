const TYPE_ERROR_STRING = new TypeError("The searchData parameter must be a string.");

const REGEX_MULTIPLE_BODIES_FOUND = /[\*]*[\n|\r\n]\sMultiple/;
const REGEX_SINGLE_BODY_FOUND = /[\*]*[A-Za-z0-9\s\n\r:;+\-.,'=()~!@#$%^&*\/\"]*PHYSICAL DATA/;

module.exports = function parseSearchData(searchData) {
    if(typeof searchData !== "string") {
        throw TYPE_ERROR_STRING;
    }

    let dataArray = [];
    let parsedData = [];
    let i = 0;

    if(searchData.match(REGEX_SINGLE_BODY_FOUND)) {
        console.log("We have uniquely specified a body");
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