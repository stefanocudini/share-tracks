SHARE TRACKS
============

What
------

Embed and Share GPX tracks, using Leaflet

Usage
------

1) upload the folder of this project in your server having PHP installed.
2) add new gpx files in `./gpxs/` folder and browse the page `share-tracks/index.html`
3) like the [demo page](https://opengeo.tech/maps/share-tracks/) select the track in *Map Embedder* see below.

Screenshots
------
Map Embedder tool:

![embedded maps](https://raw.github.com/stefanocudini/share-tracks/master/images/embed-map.png)

share page in Mobile device:

![mobile display](https://raw.github.com/stefanocudini/share-tracks/master/images/mobile-map.png)


Features
------

* mobile compatible
* centering map on track in one click
* share map url
* automatic elevation chart
* download gpx file in one click
* select base map between many different layers
* embedding map to third-party web sites

TODO
------
* modular structure extensible with plugins leaflet
* improve embedding system
* customize menu with JSON param

Where
------

**Source code:**

https://github.com/stefanocudini/share-tracks

**Demo:**

https://opengeo.tech/maps/share-tracks/

https://www.ammappalitalia.it/

Included Libraries
------

Writing this web app would be much harder it it weren't for those libraries:

* [Leaflet](https://github.com/Leaflet/Leaflet)
* [Leaflet.Elevation](https://github.com/MrMufflon/Leaflet.Elevation)
* [Leaflet-GPX](https://github.com/mpetazzoni/leaflet-gpx)
* [Leaflet-plugins](https://github.com/shramov/leaflet-plugins)
