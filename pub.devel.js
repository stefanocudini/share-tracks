
var minZoom = 6,	//se fa troppo poco zoom deve caricare troppi marker!!
	centerStart = new L.LatLng(42.243594, 12.502849),	//Soratte
	gooLayer = new L.Google(),
	osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
  	gpxLayer = new L.LayerGroup(),
	map = new L.Map('map', {center: centerStart, attributionControl: false, zoomControl: true});
 
map.addLayer(gooLayer);

var track = new L.GPX(gpxfile, {async: true}).on("loaded", function(e) {
				map.fitBounds(e.target.getBounds());//zoom schermo intero
			});
	
map.addLayer(track);


