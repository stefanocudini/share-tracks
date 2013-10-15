
var map = new L.Map('map', {attributionControl: false});
	//osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
  	//gpxLayer = new L.LayerGroup(),
	//var osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var osmLayer = new L.TileLayer('http://localhost/maps/osm-tile-cacher/tmsfake.php?{z}/{x}/{y}.png'),
	cycleLayer = new L.TileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png');
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

gpxLayer
	.on("loaded", function(e) {
		zoomGpx(e.target);
	})
	.on("addline",function(e){
		eleLayer.addData(e.line);
	});

map.addLayer(gpxLayer);

map.addControl(new L.Control.Layers({
	"Google Satellite": gooSatLayer,
	"Openstreetmap": osmLayer,
	"OSM Rilievo": cycleLayer
	},{"GPX track": gpxLayer},{position:'topright'}) );


var gpxzoom = L.DomUtil.get('gpxzoom');
L.DomEvent
	.disableClickPropagation(gpxzoom)
	.addListener(gpxzoom, 'click', function() {
		zoomGpx( gpxLayer );
	},this);


