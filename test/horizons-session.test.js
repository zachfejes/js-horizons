const Horizons = require("../index");

test('can create an object and initialize it with a connection to JPL HORIZONS', (done) => {
    let session = new Horizons();
    expect(session.isConnected()).toBe(false);

    let callback = (error, data) => {
        expect(session.isConnected()).toBe(true);
        session.close(() => {
            done();
        })
    }

    session.initialize(callback);
});

test('can search for a body and retrieve a list of suggestions', (done) => {
    let session = new Horizons();

    let callback = (error, data) => {
        session.close(() => {
            done();
        })
    }

    session.initialize(() => {
        session.search("mars", callback);
    })
})