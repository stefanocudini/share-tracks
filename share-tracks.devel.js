(function() {

var gpxfile = L.UrlUtil.query();//defined in leaflet-plugins/control/Permalink.js

L.DomUtil.selectText = function() {
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
};

var map = new L.Map('map', {zoom:10, center: [0,0], zoomControl:false, attributionControl: false}),
	osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
	cycleLayer = new L.TileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'),
	demLayer = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png'),
	bwLayer = new L.TileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'),
	grayLayer = new L.TileLayer('http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'),
	satLayer = new L.Google(),
	//bingLayer = new L.BingLayer(APIKEY),//http://www.microsoft.com/maps/create-a-bing-maps-key.aspx
	gpxLayer = new L.GPX(gpxfile, {
		async: true,
		marker_options: {
			startIconUrl: 'leaflet-gpx/pin-icon-start.png',
			endIconUrl: 'leaflet-gpx/pin-icon-end.png',
			shadowUrl: 'leaflet-gpx/pin-shadow.png'
		}
	}),
	baseLayers = {
		"OSM": osmLayer,
		"Paths": cycleLayer,
		"Gray": grayLayer,
		"Satellite": satLayer,		
		"Terrain": demLayer,
		"Print": bwLayer	
	},
	overLayers = {
		"Track": gpxLayer
	};

var controlLayers = new L.Control.Layers(baseLayers, overLayers, {position:'topright'});

var controlPermalink = new L.Control.Permalink({text: 'Permalink', layers: controlLayers});

//window.controlPermalink = controlPermalink; //for debug from embed.php

var controlFitZoom = (function() {
		var control = new L.Control({position:'topleft'});
		control._zoomGpx = function(gpxline) {
				var bb = gpxline.getBounds();
				//controlPermalink._update({zoom: map.getBoundsZoom(bb), lat: bb.getCenter().lat, lon: bb.getCenter().lng});
				controlPermalink._set_center({params: {zoom: map.getBoundsZoom(bb), lat: bb.getCenter().lat, lon: bb.getCenter().lng}});
			};
		control.onAdd = function(map) {
				var azoom = L.DomUtil.create('a','gpxzoom');
				azoom.title = "Zoom to track";
				L.DomEvent
					.disableClickPropagation(azoom)
					.addListener(azoom, 'click', function() {
						control._zoomGpx( gpxLayer );
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
				adown.target = '_blank';
				adown.title = "Download track file";
				return adown;
			};
		return control;
	}());

var controlElevation = new L.Control.Elevation({
	width: 320,
	height: 150,
	position: 'bottomright',
	collapsed: true
});

var controlMenu = L.control.attribution({
		position: 'topleft',
		prefix:
			'<ul class="mapmenu">'+
				'<li><a href="./">Home Site</a></li>'+
				'<li><a href="#">Section</a></li>'+
				'<li><a href="#">Contacts</a></li>'+
			'</ul>'
		});

map.addControl(controlMenu);
map.addControl(L.control.zoom());
map.addControl(controlFitZoom);
map.addControl(controlDownload);
map.addControl(controlLayers);
map.addControl(controlPermalink);
map.addControl(controlElevation);

controlPermalink._text = L.DomUtil.create('input', 'textshare', controlPermalink._container );
controlPermalink._text.type = 'text';
controlPermalink._text.size = '32';
controlPermalink._text.value = controlPermalink._href.href;

L.DomEvent.addListener(controlPermalink._text, 'click', L.DomUtil.selectText);

L.DomEvent
	.disableClickPropagation(controlPermalink._container)
	.addListener(controlPermalink._container, 'click', function() {
		controlPermalink._text.style.display = 'block';
	});

controlPermalink.on('update', function(e) {
	controlPermalink._text.value = controlPermalink._href.href;
});

map.on('moveend', function(e) {
		controlPermalink._text.value = controlPermalink._href.href;
	})
	.on('click', function(e) {
		controlPermalink._text.style.display = 'none';
	});

gpxLayer
	.on("loaded", function(e) {
		if( L.UrlUtil.hash() == '')
			controlFitZoom._zoomGpx(e.target);
		controlPermalink._text.value = controlPermalink._href.href;
	})
	.on("addline",function(e) {
		controlElevation.addData(e.line);
	});

map.addLayer(osmLayer);
map.addLayer(gpxLayer);

})();
