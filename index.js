var Telnet = require("telnet-client");

const HORIZONS_URL = "horizons.jpl.nasa.gov";
const HORIZONS_PORT = 6775;
const HORIZONS_PROMPT = "Horizons> ";

var params = {
    host: HORIZONS_URL,
    port: HORIZONS_PORT,
    shellPrompt: HORIZONS_PROMPT,
    timeout: 10000,
    initialLFCR: true
  }

module.exports = class Horizons {
    constructor() {
        this._session = new Telnet();
        this._connected = false;
        this._stringBuffer = "";

        this._session.on('ready', (prompt) => {
            console.log(prompt);
            this._connected = true;
        });

        this._session.on('connect', () => {
            console.log(`Connecting to ${HORIZONS_URL}:${HORIZONS_PORT}...`);
            this._connected = true;
        });

        this._session.on('data', (buffer) => {
            this._stringBuffer += buffer.toString();
        });

        this._session.on('timeout', () => {
            console.log("Socket timeout!");
            this._session.end();
        });

        this._session.on('error', (error) => {
            console.log("Error: ", error);
        })

        this._session.on('close', () => {
            console.log("Connection closed");
            this._connected = false;
        });
    }

    initialize(cb) {
        this._session.on('ready', (prompt) => {
            cb(null, prompt);
        });

        this._session.connect(params);
    }

    close(cb) {
        this._session.end();
        cb && cb();
    }

    isConnected() {
        return this._connected;
    }

    search(input, cb) {
        if(!this._connected) {
            throw new Error("Horizons is not connected. You must initialize it before making a request.");
        }

        this._stringBuffer = "";

        this._session.on('data', (buffer) => {
            //this._stringBuffer += buffer.toString();

            if(buffer.toString().match(HORIZONS_PROMPT) || buffer.toString().match("<cr>: ")) {
                cb(null, this._stringBuffer);
            }
        });

        this._session.send(`${input}\r\n`);
    }
}