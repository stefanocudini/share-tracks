<?

$bdir = './traces/';

$gpxfile = ( isset($_GET['gpx']) and 
             file_exists($bdir.basename($_GET['gpx'])) ) ? $bdir.basename($_GET['gpx']) : '';
$tit = basename($gpxfile);
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
	<title>Archivio Gpx: <?=$tit?></title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<style type="text/css">
		@import url('/maps/openlayers/theme/default/style.css');
		@import url('style.css');
	</style>
</head>

<body>
<h1>Archivio Gpx</h1>
<div id="map_wrap">
	<div id="map"></div>
	<div id="coords"></div>
</div>
<div id="copy">powered by Stefano Cudini&nbsp;&nbsp;&nbsp;</div>	
<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script src="/maps/openlayers/OpenLayers.js"></script>
<script src="/jquery-1.4.2.min.js"></script>
<script>
var gpxfile = "<?=$gpxfile?>";
</script>
<script src="pub.devel.js"></script>

</body>
</html>

