const Horizons = require("../index");

describe("should fail", () => {
    test("if trying to search without initializing", () => {
        let horizons = new Horizons();
        
        const ERROR_NOT_CONNECTED = new Error("Horizons is not connected. You must initialize it before making a request.");

        expect(() => { horizons.search("test", () => {}); })
            .toThrow(ERROR_NOT_CONNECTED[0]);

        if(horizons.isConnected()) {
            horizons.close();
        }
    });
});

test('can create an object and initialize it with a connection to JPL HORIZONS', (done) => {
    let horizons = new Horizons();
    expect(horizons.isConnected()).toBe(false);

    let callback = (error, data) => {
        expect(horizons.isConnected()).toBe(true);
        horizons.close(() => {
            done();
        })
    }

    horizons.initialize(callback);
});

test('can search for a body and retrieve a list of suggestions', (done) => {
    let horizons = new Horizons();

    expectedValues = [
        "Mars Barycenter", 
        "Mars", 
        "Mars Orbiter Mission (MOM)", 
        "Mars Express (spacecraft)",
        "Mars Odyssey (spacecraft)",
        "Mars Reconnaissance Orbiter",
        "Mars Science Laboratory",
        "ExoMars TGO (spacecraft)"
    ];

    let callback = (error, data) => {
        horizons.close(() => {
            done();
        })
    }

    horizons.initialize((error, response) => {
        horizons.search("mars", (error, response) => {
            
            for(let i = 0; i < expectedValues.length; i++) {
                expect(response.includes(expectedValues[i])).toEqual(true);
            }

            horizons.close(() => {
                done();
            })
        });
    });
})