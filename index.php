<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
	<title>SHARE GPX TRACKS</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" href="http://leaflet.cloudmade.com/dist/leaflet.css" />
	<link rel="stylesheet" href="leaflet-elevation/dist/Leaflet.Elevation-0.0.1.css" />
	<link rel="stylesheet" href="share-tracks.css" />
</head>

<body>
<div id="map_wrap" style="display:none">
	<div id="map"></div>	
</div>
<div id="tracklist">
	<h1>SHARE GPX TRACKS</h1><br /><br />
	<div style="display:inline-block">
		<iframe src="http://ghbtns.com/github-btn.html?user=stefanocudini&amp;repo=share-tracks&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="104px" height="20px"></iframe>
	</div>	
	<hr />	
	<?php

	foreach(glob('./gpxs/*.gpx') as $f)
		echo '<a href="?'.$f.'">'.basename($f).'</a><br />'."\n";

	?>
<div id="copy">
	<a href="http://labs.easyblog.it/">Labs</a> &bull; <a href="http://labs.easyblog.it/stefano-cudini/">Stefano Cudini</a>
</div>
<a href="https://github.com/stefanocudini/share-tracks"><img id="ribbon" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
</div>
<script src="http://leaflet.cloudmade.com/dist/leaflet.js"></script>
<script src="http://maps.google.com/maps/api/js?v=3.2&amp;sensor=false"></script>
<script src="leaflet-plugins/layer/tile/Google.js"></script>
<script src="leaflet-gpx/gpx.js"></script>
<script src="leaflet-plugins/control/Permalink.js"></script>
<script src="leaflet-plugins/control/Permalink.Layer.js"></script>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="leaflet-elevation/dist/Leaflet.Elevation-0.0.1.min.js"></script>
<script src="share-tracks.devel.js"></script>

<script type="text/javascript" src="/labs-common.js"></script>
</body>
</html>

