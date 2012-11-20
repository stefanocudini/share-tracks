

$('#loader em')
.ajaxStart(function() {
	$(this).show();
})
.ajaxStop(function() {
	$(this).hide();
});

var gpxStyle = new OpenLayers.StyleMap({  
    "default": new OpenLayers.Style({
                strokeColor: "#ee00ee",
                strokeWidth: 3,
                fillColor: "#ff0000",
                pointRadius: 5,
                //label: "${name}",
                //labelXOffset: "0",
                //labelYOffset: "15",
                //fontWeight: "bold",
                //fontSize: "16px",
                //fontColor: "#ff0000",
                pointerEvents: "visiblePainted"
    })
});

$(function() {

var wgs84 = new OpenLayers.Projection("EPSG:4326"),
	mercator =  new OpenLayers.Projection("EPSG:900913");

var lon = 12.451196,
	lat = 42.374583,
	zoom = 15;
	
	var map = new OpenLayers.Map({
	     units: 'm',
			div: "map",
			projection: mercator,
			displayProjection: wgs84
			//allOverlays: true
		});

//	var osmLayer = new OpenLayers.Layer.OSM("OpenStreetMap");
//	map.addLayers([osmLayer]);
	var goosatLayer = new OpenLayers.Layer.Google("Google Satellite",
		{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22, sphericalMercator: true, attribution:false}
	);
	/*var goostreetLayer = new OpenLayers.Layer.Google("Google Strade",
		{type: google.maps.MapTypeId.ROADMAP, numZoomLevels: 22, sphericalMercator: true, attribution:false, visibility:false}
	);//*/
	OpenLayers.Projection.addTransform("EPSG:4326", "EPSG:3857", OpenLayers.Layer.SphericalMercator.projectForward);
	OpenLayers.Projection.addTransform("EPSG:3857", "EPSG:4326", OpenLayers.Layer.SphericalMercator.projectInverse);
	var aliasproj = new OpenLayers.Projection("EPSG:3857");
	goosatLayer.projection = aliasproj;
	//goostreetLayer.projection = aliasproj;
	map.addLayers([goosatLayer]);
	//map.addLayers([goostreetLayer]);
	map.events.register('moveend', null, function() {
		$('.olLayerGoogleCopyright').hide();	//leva sto cazzo di copyright di google
	});//*/
	
	var traceLayer = new OpenLayers.Layer.Vector('Tracce Gpx', {styleMap: gpxStyle, displayInLayerSwitcher:false});//layer per disegnare tracce
	map.addLayers([traceLayer]);
	
	function onPointSelect(feature) {

		var content='';
		for(d in feature.attributes)
			content += '<b>'+d+'</b> '+feature.attributes[d] +'<br>';
	
		if(!feature.popup)  //crea il popup dentro alla feature una sola volta
		{
			var popup = new OpenLayers.Popup('popdati',
							   feature.geometry.getBounds().getCenterLonLat(),
							   new OpenLayers.Size(70,80),
							   content,
							   true,
							   null);
			popup.setBackgroundColor('#eeffee');
			popup.setBorder('2px solid #00aa00');
			popup.setOpacity(0.8);
			popup.autoSize = true;
			popup.panMapIfOutOfView = true;
			//popup.keepInMap = true;
			feature.popup = popup;  //assegna il popup al punto
			map.addPopup(feature.popup, true);  //true: chiude tutti gli altri prima di aprire un popup
		}
		feature.popup.show();
	}
	
	var gpxFormat = new OpenLayers.Format.GPX({internalProjection: mercator, externalProjection: wgs84});
	
	//map.addControls(new OpenLayers.Control.MousePosition());
	map.addControl(new OpenLayers.Control.Navigation({autoActivate:true}));
	//map.addControl(new OpenLayers.Control.PanZoomBar());
	//var layersControl = new OpenLayers.Control.LayerSwitcher({div: OpenLayers.Util.getElement('layerswitcher'), ascending:false, roundedCorner:false});
	//map.addControl(layersControl);
	//map.addControl(new OpenLayers.Control.ScaleLine({geodesic:true}));
	//map.addControl(new OpenLayers.Control.OverviewMap());

	map.setCenter( new OpenLayers.LonLat(lon, lat).transform( wgs84, map.getProjectionObject()) );  //centro iniziale
	map.zoomTo(zoom);
		
	if(gpxfile)
	{
		var lgpx = new OpenLayers.Layer.GML(gpxfile, gpxfile, {
				format: OpenLayers.Format.GPX,
				styleMap: gpxStyle,
				projection: wgs84
		});
		lgpx.events.on({'loadend': function() {		//autozoom sulle tracce aperte
				
				for(f in lgpx.features)
				{
					var F = lgpx.features[f];
					var g = F.geometry.clone();
					delete F.attributes.name;
					if(F.geometry.CLASS_NAME=='OpenLayers.Geometry.Point')
						F.attributes.coordinate = g.transform(map.getProjectionObject(),wgs84).toShortString();
					F.attributes.file = '<a href="'+gpxfile+'">'+gpxfile+'</a>';
				}
				lgpx.redraw();
				var pointSelect = new OpenLayers.Control.SelectFeature([lgpx], {hover:true, onSelect: onPointSelect });
				map.addControl(pointSelect);
				pointSelect.activate();
				map.zoomToExtent(lgpx.getDataExtent());
			}
	 	});
		map.addLayer(lgpx);
	}
	else
	{
		map.setCenter( new OpenLayers.LonLat(lon, lat).transform( wgs84, map.getProjectionObject()) );  //centro iniziale
		map.zoomTo(zoom);
	}
});		
