const Horizons = require("../index");

const horizons = new Horizons();
horizons.initialize((error, response) => {
    horizons.search("301", (error, response) => {
        console.log(response);
        horizons.close();
    });
});
