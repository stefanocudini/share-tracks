
var traceStyle = new OpenLayers.StyleMap({
    "default": new OpenLayers.Style(null, {
        rules: [
            new OpenLayers.Rule({
                symbolizer: {
                    "Point": {
                        pointRadius: 5,
                        //graphicName: "square",
                        fillColor: "white",
                        fillOpacity: 0.25,
                        strokeWidth: 3,
                        strokeOpacity: 1,
                        strokeColor: "#3333ff"
                    },
                    "Line": {
                        strokeWidth: 3,
                        strokeOpacity: 1,
                        strokeColor: "#6666ff"
                    },
                    "Polygon": {
                        strokeWidth: 3,
                        strokeOpacity: 1,
                        fillColor: "#9999ff",
                        strokeColor: "#6666ff"
                    }
                }
            })
        ]
    }),
    "select": new OpenLayers.Style(null, {
        rules: [
            new OpenLayers.Rule({
                symbolizer: {
                    "Point": {
                        pointRadius: 5,
                        //graphicName: "square",
                        fillColor: "white",
                        fillOpacity: 0.25,
                        strokeWidth: 2,
                        strokeOpacity: 1,
                        strokeColor: "#ff00ff"
                    },
                    "Line": {
                        strokeWidth: 3,
                        strokeOpacity: 1,
                        strokeColor: "#ff00ff"
                    },
                    "Polygon": {
                        strokeWidth: 2,
                        strokeOpacity: 1,
                        fillColor: "#ff00ff",
                        strokeColor: "#ff00ff"
                    }
                }
            })
        ]
    }),
    "temporary": new OpenLayers.Style(null, {
        rules: [
            new OpenLayers.Rule({
                symbolizer: {
                    "Point": {
                        graphicName: "square",
                        pointRadius: 5,
                        fillColor: "white",
                        fillOpacity: 0.25,
                        strokeWidth: 2,
                        strokeColor: "#0000ff"
                    },
                    "Line": {
                        strokeWidth: 3,
                        strokeOpacity: 1,
                        strokeColor: "#0000ff"
                    },
                    "Polygon": {
                        strokeWidth: 2,
                        strokeOpacity: 1,
                        strokeColor: "#0000ff",
                        fillColor: "#0000ff"
                    }
                }
            })
        ]
    })
});

var gpxStyle = new OpenLayers.StyleMap({  
    "default": new OpenLayers.Style({
                strokeColor: "#ff00ff",
                strokeWidth: 3,
                fillColor: "#ff00ff",
                pointerEvents: "visiblePainted"
    }),
    "select": new OpenLayers.Style({
                strokeColor: "#00ff00",
                strokeWidth: 3,
                fillColor: "#00ff00",
                pointRadius: 6,
                pointerEvents: "visiblePainted"
    })
});

