# JS-HORIZONS

[![npm (scoped)](https://img.shields.io/npm/v/@zachfejes/js-horizons.svg)](https://github.com/zachfejes/js-horizons) 
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://github.com/zachfejes/js-horizons)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to JS-HORIZONS! This is an wrapper library for the JPL HORIZONS database, which provides incredible data on all major (and a ton of minor) bodies in our solar system!

This is a living project, and as such it'll be going through a lot of updates and tweaks. If you have any suggestions or are interested in collaborating on this project, shoot me a message!



## Install

```
    $ npm install @zachfejes/js-horizons
```

## Usage

```
    const { Horizons } from "@zachfejes/js-horizons";

    const session = new Horizons();

    session.data.planets;
    //=> ["Mercury", "Venus", "Earth"]
```