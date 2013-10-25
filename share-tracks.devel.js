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
	L.DomUtil.get('gpxname').innerHTML = gpxfile.replace( /.*\//, "" ).replace( /.*\\/, "" );//basename
	L.DomUtil.get('gpxdown').href = gpxfile;
}

var map = new L.Map('map', {zoom:10, center: [0,0], attributionControl: false}),
	osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
	cycleLayer = new L.TileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'),
	demLayer = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png'),
	bwLayer = new L.TileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'),
	grayLayer = new L.TileLayer('http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'),
	gooSatLayer = new L.Google();

map.addLayer(gooSatLayer);

var eleLayer = L.control.elevation({
	width: 400,
	height: 150,
	position:'bottomright',
	collapsed:true
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

var controlLayers = new L.Control.Layers({
	"Satellite": gooSatLayer,
	"OSM": osmLayer,
	"OSM_paths": cycleLayer,
	"OSM_gray": grayLayer,	
	"Terrain": demLayer,
	"Print": bwLayer	
},{"GPX track": gpxLayer},{position:'topright'});
map.addControl(controlLayers);

var controlPermalink = new L.Control.Permalink({text: 'Permalink', layers: controlLayers});
map.addControl(controlPermalink);

controlPermalink.on('update',function(e) {
	permalinkLoaded = true;
	textPermalink.value = controlPermalink._href.href;
});

var textPermalink = L.DomUtil.get('textshare');
L.DomEvent.addListener(textPermalink, 'click', textPermalink.select );

function zoomGpx(gpxline) {
	var bb = gpxline.getBounds();
	//controlPermalink._update({zoom: map.getBoundsZoom(bb), lat: bb.getCenter().lat, lon: bb.getCenter().lng});
	controlPermalink._set_center({params: {zoom: map.getBoundsZoom(bb), lat: bb.getCenter().lat, lon: bb.getCenter().lng}});
}

map.on('moveend', function(e) {
	textPermalink.value = controlPermalink._href.href;
});

var gpxzoom = L.DomUtil.get('gpxzoom');
L.DomEvent
	.disableClickPropagation(gpxzoom)
	.addListener(gpxzoom, 'click', function() {
		zoomGpx( gpxLayer );
	},this);

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
