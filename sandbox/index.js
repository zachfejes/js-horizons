const Horizons = require("../index");

const horizons = new Horizons();
horizons.initialize((error, response) => {
    horizons.search("io", (error, response) => {
        console.log("response");
        console.log(response);
        horizons.close();
    });
});
