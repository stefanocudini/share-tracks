(function() {

var gpxfile = L.UrlUtil.query();//defined in leaflet-plugins/control/Permalink.js

if(gpxfile=='')
{
	L.DomUtil.get('map_wrap').style.display = 'none';
	L.DomUtil.get('tracklist').style.display = 'block';
	return false;
}
else
{
	L.DomUtil.get('map_wrap').style.display = 'block';
	L.DomUtil.get('tracklist').style.display = 'none';
}

var map = new L.Map('map', {zoom:10, center: [0,0], attributionControl: false}),
	osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
	cycleLayer = new L.TileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'),
	demLayer = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png'),
	bwLayer = new L.TileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'),
	grayLayer = new L.TileLayer('http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'),
	gooSatLayer = new L.Google();

map.addLayer(osmLayer);

var eleLayer = L.control.elevation({
	width: 320,
	height: 150,
	position: 'bottomright',
	collapsed: true
});
eleLayer.addTo(map);

var gpxLayer = new L.GPX(gpxfile, {
		async: true,
		marker_options: {
			startIconUrl: 'leaflet-gpx/pin-icon-start.png',
			endIconUrl: 'leaflet-gpx/pin-icon-end.png',
			shadowUrl: 'leaflet-gpx/pin-shadow.png'
		}
	});

function zoomGpx(gpxline) {
	var bb = gpxline.getBounds();
	//controlPermalink._update({zoom: map.getBoundsZoom(bb), lat: bb.getCenter().lat, lon: bb.getCenter().lng});
	controlPermalink._set_center({params: {zoom: map.getBoundsZoom(bb), lat: bb.getCenter().lat, lon: bb.getCenter().lng}});
}

var controlLayers = new L.Control.Layers({
	"Satellite": gooSatLayer,
	"OSM": osmLayer,
	"OSM_paths": cycleLayer,
	"OSM_gray": grayLayer,	
	"Terrain": demLayer,
	"Print": bwLayer	
},{"GPX track": gpxLayer},{position:'topright'});

var controlFitZoom = (function() {
		var control = new L.Control({position:'topleft'});
		control.onAdd = function(map) {
					var azoom = L.DomUtil.create('a','gpxzoom');
					azoom.title = "Zoom to track";
					L.DomEvent
						.disableClickPropagation(azoom)
						.addListener(azoom, 'click', function() {
							zoomGpx( gpxLayer );
						},azoom);
					return azoom;
				};
		return control;
	}());

var controlDownload = (function() {
		var control = new L.Control({position:'topleft'});
		control.onAdd = function(map) {
					var adown = L.DomUtil.create('a','gpxdown');
					adown.href = gpxfile;
					adown.title = "Download GPX file";
					return adown;
				};
		return control;
	}());

map.addControl(controlLayers);

var controlPermalink = new L.Control.Permalink({text: 'Permalink', layers: controlLayers});
map.addControl(controlPermalink);

window.controlPermalink = controlPermalink;
controlPermalink._href.innerHTML = '';


function selectInput() {
	var start = 0,
		end = this.value.length;
	if (this.createTextRange) {
		var selRange = this.createTextRange();
		selRange.collapse(true);
		selRange.moveStart('character', start);
		selRange.moveEnd('character', end);
		selRange.select();
	}
	else if(this.setSelectionRange) {
		this.setSelectionRange(start, end);
	}
	else if(this.selectionStart) {
		this.selectionStart = start;
		this.selectionEnd = end;
	}	
}
var textPermalink = L.DomUtil.create('input', 'textshare', controlPermalink._container );
textPermalink.type = 'text';
textPermalink.size = '32';
textPermalink.value = '';
L.DomEvent.addListener(textPermalink, 'click', selectInput, textPermalink);
L.DomEvent
	.disableClickPropagation(controlPermalink._container)
	.addListener(controlPermalink._container, 'click', function() {
		textPermalink.style.display = 'block';
	});
controlPermalink.on('update', function(e) {
	textPermalink.value = controlPermalink._href.href;
});
map
.on('moveend', function(e) {
	textPermalink.value = controlPermalink._href.href;
})
.on('click', function(e) {
	textPermalink.style.display = 'none';
});

map.addControl(controlFitZoom);
map.addControl(controlDownload);

gpxLayer
.on("loaded", function(e) {
	if( L.UrlUtil.hash() == '')
		zoomGpx(e.target);
})
.on("addline",function(e){
	eleLayer.addData(e.line);
});

map.addLayer(gpxLayer);

})();
