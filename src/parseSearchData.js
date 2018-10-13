const TYPE_ERROR_STRING = new TypeError("The searchData parameter must be a string.");

const REGEX_MULTIPLE_BODIES_FOUND = /[\*]*[\n|\r\n]\sMultiple/;
const REGEX_SINGLE_BODY_FOUND = /[\*]*[A-Za-z0-9\s\n\r:;+\-.,'=()~!@#$%^&*\/\"]*PHYSICAL DATA/;

module.exports = function parseSearchData(searchData) {
    if(typeof searchData !== "string") {
        throw TYPE_ERROR_STRING;
    }

    if(searchData.match(REGEX_SINGLE_BODY_FOUND)) {
        console.log("We have uniquely specified a body");
    }

    if(searchData.match(REGEX_MULTIPLE_BODIES_FOUND)) {
        console.log(`We have found multiple bodies that match the query`);
    }

}