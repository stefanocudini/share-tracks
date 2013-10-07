
var map = new L.Map('map', {attributionControl: false});
	//osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
  	//gpxLayer = new L.LayerGroup(),
var track;
 
map.addLayer(new L.Google());

function zoomGpx(gpxline) {
	map.fitBounds(gpxline.getBounds());	//zoom estensioni del gpx
}

var eleLayer = L.control.elevation();
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
		 console.log(e);
		eleLayer.addData(e.line);
	});

map.addLayer(gpxLayer);

var gpxzoom = L.DomUtil.get('gpxzoom');
L.DomEvent
	.disableClickPropagation(gpxzoom)
	.addListener(gpxzoom, 'click', function() {
		zoomGpx( gpxLayer );
	},this);

