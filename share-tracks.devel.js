
var map = new L.Map('map', {attributionControl: false});
	//osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
  	//gpxLayer = new L.LayerGroup(),
	//var osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var osmLayer = new L.TileLayer('http://localhost/maps/osm-tile-cacher/tmsfake.php?{z}/{x}/{y}.png'),
	cycleLayer = new L.TileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'),
	demLayer = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png'),
	bwLayer = new L.TileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'),
	grayLayer = new L.TileLayer('http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'),
	gooSatLayer = new L.Google();

map.addLayer(gooSatLayer);

function zoomGpx(gpxline) {
	map.fitBounds(gpxline.getBounds());	//zoom estensioni del gpx
}

var eleLayer = L.control.elevation({position:'bottomright'});
eleLayer.addTo(map);

var gpxLayer = new L.GPX(gpxfile, {
		async: true,
		marker_options: {
			startIconUrl: 'leaflet-gpx/pin-icon-start.png',
			endIconUrl: 'leaflet-gpx/pin-icon-end.png',
			shadowUrl: 'leaflet-gpx/pin-shadow.png'
		}
	});

var controlLayers = new L.Control.Layers({
	"Satellite": gooSatLayer,
	"OSM": osmLayer,
	"OSM Gray": grayLayer,	
	"OSM Paths": cycleLayer,
	"Terrain": demLayer,
	"Print": bwLayer	
},{"GPX track": gpxLayer},{position:'topright'});

var controlPermalink = new L.Control.Permalink({text: 'Permalink', layers: controlLayers});
var textPermalink = L.DomUtil.get('textshare');

L.DomEvent.addListener(textPermalink, 'click', textPermalink.select );

map.addControl(controlLayers);

var gpxzoom = L.DomUtil.get('gpxzoom');
L.DomEvent
	.disableClickPropagation(gpxzoom)
	.addListener(gpxzoom, 'click', function() {
		zoomGpx( gpxLayer );
	},this);

gpxLayer
	.on("loaded", function(e) {
		zoomGpx(e.target);

		map.addControl(controlPermalink);
		textPermalink.value = controlPermalink._href.href;
		map.on('moveend', function(e) {
			textPermalink.value = controlPermalink._href.href;
		});
	})
	.on("addline",function(e){
		eleLayer.addData(e.line);
	});

map.addLayer(gpxLayer);

