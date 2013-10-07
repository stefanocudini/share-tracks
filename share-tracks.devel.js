
var map = new L.Map('map', {attributionControl: false});
	//osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
  	//gpxLayer = new L.LayerGroup(),
var track;
 
map.addLayer(new L.Google());

function zoomGpx(gpxline) {
	map.fitBounds(gpxline.getBounds());	//zoom estensioni del gpx
}

var eleLayer = L.control.elevation().addTo(map);

var gpxLayer = new L.GPX(gpxfile, {
		async: true
		// marker_options: {
		// 	startIconUrl: './lib/leaflet-gpx/pin-icon-start.png',
		// 	endIconUrl: './lib/leaflet-gpx/pin-icon-end.png',
		// 	shadowUrl: './lib/leaflet-gpx/pin-shadow.png'
		// }
	}).on("loaded", function(e) {
		zoomGpx(e.target);
	}).on("addline",function(e){
		eleLayer.addData(e.line);
	});

map.addLayer(gpxLayer);

var gpxzoom = L.DomUtil.get('gpxzoom');
L.DomEvent
	.disableClickPropagation(gpxzoom)
	.addListener(gpxzoom, 'click', function() {
		zoomGpx( gpxLayer );
	},this);

