# JS-HORIZONS

[![npm (scoped)](https://img.shields.io/npm/v/@zachfejes/js-horizons.svg)](https://github.com/zachfejes/js-horizons) 
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://github.com/zachfejes/js-horizons)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/zachfejes/js-horizons)


Welcome to JS-HORIZONS! This is an wrapper library for the JPL HORIZONS database, which provides incredible data on all major (and a ton of minor) bodies in our solar system!

> Note: This is a living project, and as such it'll be going through a lot of updates and tweaks. If you have any suggestions or are interested in collaborating on this project, shoot me a message!

## I Like Space! What Does This Thing Do?

I'll let the team that built the JPL Horizons database give an intro:

> The JPL HORIZONS on-line solar system data and ephemeris computation service provides access to key solar system data and flexible production of highly accurate ephemerides for solar system objects ( 932222 asteroids, 3608 comets, 209 planetary satellites, 8 planets, the Sun, L1, L2, select spacecraft, and system barycenters ). 
>
> HORIZONS is provided by the Solar System Dynamics Group of the Jet Propulsion Laboratory.

That's a lot of info!

Simply put, the Horizons database lets you look up information on Planets, Moons, Asteroids, Comets, and Spacecraft in our Solar System. Information like the physical properties of the object, it's motion/orbit, what it looks like, where it is, a whole lot of really interesting and useful data!

If you know exactly what you're looking for, this package will help you quickly and efficiently retrieve information about it.

If you don't know how to uniquely specify what you're looking for, no worries! The system will instead respond with a list of options, to help you narrow down your search.

This package can currently be used to query the JPL Horizons database for information about any major body in our solar system, as well as a large subset of minor bodies (Moons). The data queried will be converted into predictably-structured JSON.

As the Horizons database has many data sources with many different styles of notation, I can not yet guarentee that every value will be parsed perfectly. For this reason, I've also included the original text response of the JPL Horizons service in the response JSON.


## Install

```
    $ npm install @zachfejes/js-horizons
```

## Usage

```
    const { Horizons } = require("@zachfejes/js-horizons");

    const horizons = new Horizons();

    horizons.initialize((error, response) => {
        ...
        // acquire space data, then do stuff with it!
        ...
    });
```


## Current Limitations

The majority of (non-moon) minor bodies in the solar system are not yet supported by this package. Their data structures are usually quite different than those of the major bodies, and I'm currently dedicating a branch to parsing their data into a predictable JSON object like those currently supported. This way, in future, the package will be more easily integrated into your applications.


## How to Use It


### The Horizon Object

The `Horizon` object represents a connection to the JPL Horizon database, and is the key object you will use to leverage its capabilities. I've described its public methods below.

**Horizon.initialize(cb)**

Initializes the object's connection to the JPL Horizons database. Takes a callback function `cb` as a parameter, which is triggered on the `ready` state of the underlying telnet client.

**Horizon.close(cb)**

Attempts to end the telnet client's connection to the database. Takes a callback function `cb` as a parameter, which is triggered once the session ends.

**Horizon.isConnected()**

Checks the internal connection state of telnet. Returns `true` if it has been initialized and is running, and `false` otherwise.

**Horizon.search(queryTerm, cb)**

Searches the JPL Horizons database for the object provided in the `queryTerm` parameter. Takes a callback function `cb` as a second parameter, which is triggered when the database is finished sending back its buffered response. The `cb` function is passed two parameters: `error`, and `response`. `response` will be a JSON object containing details about the `queryTerm`.


### Usage Examples

#### Initializing the Connection

In order to access the database, you must first initialize a connection to it. I've simplified this process by wrapping the Telnet client (used to connect and query the database) in a simple helper function.

In your application, you must require/import the `Horizons` object from this package, and initialize an instance of that object before you can use it. You can do this as follows:

```
    const { Horizons } = require("@zachfejes/js-horizons");

    const horizons = new Horizons();

    horizons.initialize((error, response) => {
        ...
        // acquire space data, then do stuff with it!
        ...
    });
```

#### Searching for Information about a Planet

To retrieve planetary and orbital information, we will need to initialize our connection to the Horizons database, and then use the `search` method with an appropriate `queryTerm`. In this example, we're going to look up information on Jupiter.


```
    const { Horizons } = require("@zachfejes/js-horizons");

    const horizons = new Horizons();
    horizons.initialize((error, response) => {
        horizons.search("Jupiter", (error, response) => {
            console.log(response);
            horizons.close();
        });
    });

    /* console output
        [{ 
            id: '5',
            name: 'Jupiter Barycenter',
            designation: undefined,
            iau: undefined 
        },
        { 
            id: '599',
            name: 'Jupiter',
            designation: undefined,
            iau: undefined 
        }]
    */
```

But wait - that's not information about Jupiter, that's just a list of Jupiter related things!

Good catch. What happened here is that our query wasn't unique enough. The search term `Jupiter` could refer to the planet, or to the Barycenter of Jupiter and all of its moons.

In our case, we just want info on the planet jupiter, and we can see from the response that it's unique ID is `599`, so let's `search` for that instead.

```
    const { Horizons } = require("@zachfejes/js-horizons");

    const horizons = new Horizons();
    horizons.initialize((error, response) => {
        horizons.search("Jupiter", (error, response) => {
            console.log(response);
            horizons.close();
        });
    });

    /* console output
        [{ 
            id: undefined,
            name: 'Jupiter',
            'Mean Radius': { 
                raw: 'Vol. Mean Radius (km) = 69911+-6', 
                value: '69911',
                magnitude: undefined,
                error: '6',
                units: 'km' 
            },
            Density: { 
                raw: 'Density (g/cm^3)       =   1.326',
                value: '1.326',
                magnitude: undefined,
                error: undefined,
                units: 'g/cm^3' 
            },
            Mass: { 
                raw: 'Mass x10^24 (kg)      = 1898.13+-.19',
                value: '1898.13',
                magnitude: '10^24',
                error: '.19',
                units: 'kg' 
            },
            'Sidereal Rotational Period': { 
                raw: 'Sid. rot. period (III)= 9h 55m 29.71 s',
                value: '9h 55m 29.71 s',
                magnitude: undefined,
                error: undefined,
                units: 'mixed' 
            },
            'Sidereal Rotational Rate': { 
                raw: 'Sid. rot. rate (rad/s) =  0.00017585',
                value: '0.00017585',
                magnitude: undefined,
                error: undefined,
                units: 'rad/s' 
            },

            ...

            'Atmospheric Temperature (1 bar)': { 
                raw: 'Atmos. temp. (1 bar)  = 165+-5',
                value: '165',
                magnitude: undefined,
                error: '5',
                units: 'K' 
            },
            'Mean Daily Motion': { 
                raw: 'Mean daily motion     = 0.0831294',
                value: '0.0831294',
                magnitude: undefined,
                error: undefined,
                units: 'deg/d' 
            }
        }]
    */
```

That's a lot better. There's a lot more data retrieved than what I showed above, but I didn't want the page scrolling to get too long. At this end of this page I've included a full list of all attributes which this package can currently parse and return for a given body.


## Planned Features

* Promisify the calls, so that the methods work with async/await
* Fully support all minor bodies
* Support the generation of ephemerids for any body


## More Details

### Unique Identifiers

If you're like me and you'd rather get exactly what you're looking for without multiple queries, I have a handy reference for you. There is a system to the unique IDs the space industry uses for objects in our solar system, and it's pretty easy to learn.

Major body IDs always have three digits. The first digit indicates its order outward from the Sun. The second and third digits indicate whether it is a planet, or a moon. If it's a planet, the second and third digit are always `99`. If it's a moon, the second and third digit are between `01` and `98` inclusive. Let's look at an example:

3xx = Third planet from the sun
x99 = The planet itself
399 = Earth

In another example:

3xx = Third planet from the sun
x01 = The first object discovered orbiting that planet
301 = The Moon

Once you get used to this system, it's actually pretty easy to query what you're looking for. Here's a table of the planets and some common moons just to get you started.

> Remember: You can always look up the object by name if you don't know the unique ID. The response will *give* you the unique IDs for all objects matching your query!

| ID  | Object          |
|-----|-----------------|
| 10  | The Sun (Sol)   |
| 199 | Mercury         |
| 299 | Venus           |
| 399 | Earth           |
| 301 | The Moon (Luna) |
| 499 | Mars            |
| 599 | Jupiter         |
| 501 | Io              |
| 502 | Europa          |
| 699 | Saturn          |
| 606 | Titan           |
| 799 | Uranus          |
| 899 | Neptune         |


### Data Structure

All data retrieved for a body follows the same basic data structure.

```
    'Attribute Name': { 
        raw: 'Original Extracted Text from TelNet',
        value: 'Numerical, stripped of all units and magnitudes',
        magnitude: 'String, Magnitude off the value',
        error: 'Numerical value, to be applied before magnitude',
        units: 'String, Units of measure' 
    }

    Example from Jupiter's data...

    Mass: { 
        raw: 'Mass x10^24 (kg)      = 1898.13+-.19',
        value: '1898.13',
        magnitude: '10^24',
        error: '.19',
        units: 'kg' 
    },

```

The full list of properties currently supported by this npm package are as follows:

* Mean Radius
* Equatorial Radius
* Polar Radius
* Density
* Mass
* Volume
* Sidereal Rotational Period
* Sidereal Rotational Rate
* Sidereal Orbital Period
* Orbital Period
* Mean Sidereal Day
* Mean Solar Day
* Equatorial Gravity
* Polar Gravity
* Orbital Gravity
* Geometric Albedo
* Potential Love
* GM
* GM 1-sigma
* Mass Ratio
* Atmospheric Pressure
* Mass of Atmosphere
* Maximum Angular Diameter
* Mean Temperature
* Visual Magnitude
* Visual Magnitude (Opposition)
* Obliquity to Orbit
* Hill's Sphere Radius
* Orbit Speed
* Escape Velocity
* Solar Constant
* Maximum Planetary IR
* Minimum Planetary IR
* Polar Axis
* Flattening
* J2
* Moment of Inertia
* Core Radius
* Fluid Core Radius
* Inner Core Radius
* Rocky Core Mass
* Atmospheric Temperature (1 bar)
* Magnetic Moment
* Mean Daily Motion
* Semi-major Axis
* Eccentricity
* Inclination
* Roche Limit (Ice)
* Epoch
* Perihelion Distance
* Perihelion Julian Date
* Longitude of the Ascending Node
* Argument of Periheliion
* Mean Anomaly
* Mean Motion
