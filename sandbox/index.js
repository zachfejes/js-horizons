const Horizons = require("../index");

const horizons = new Horizons();
horizons.initialize((error, response) => {
    horizons.search("599", (error, response) => {
        console.log("***  DATA RETRIEVED  ***");
        console.log(response);
        console.log("***  \DATA RETRIEVED  ***");
        horizons.close();
    });
});
