<?

$bdir = './traces/';

$gpxfile = ( isset($_GET['gpx']) and 
             file_exists($bdir.basename($_GET['gpx'])) ) ? $bdir.basename($_GET['gpx']) : '';


?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
	<title>Traccia Gpx: <?=basename($gpxfile)?></title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" href="http://leaflet.cloudmade.com/dist/leaflet.css" />
	<style type="text/css">
		@import url('style.css');
	</style>
</head>

<body>
<div id="map_wrap">
	<div id="map"></div>
	<div id="list">
		<a href="<?=$gpxfile?>"><?=basename($gpxfile)?></a>
		<a id="gpxzoom"><span>zoom</span></a>
		<a id="gpxdown" href="<?=$gpxfile?>"><span>download</span></a>
	</div>
</div>
<div id="copy">powered by Stefano Cudini&nbsp;&nbsp;&nbsp;</div>
<!--script src="/jquery-1.7.2.min.js"></script-->
<script src="http://leaflet.cloudmade.com/dist/leaflet.js"></script>
<script src="http://maps.google.com/maps/api/js?v=3.2&sensor=false"></script>
<script src="/maps/leaflet-plugins/layer/tile/Google.js"></script>
<script src="/maps/leaflet-plugins/layer/vector/GPX.js"></script>
<script>
var gpxfile = "<?=$gpxfile?>";
</script>
<script src="pub.devel.js"></script>

</body>
</html>

