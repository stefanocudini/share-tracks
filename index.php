<?php

$bdir = './traces/';

$gpxfile = '';
if( trim($_SERVER['QUERY_STRING']) and file_exists($bdir.basename($_SERVER['QUERY_STRING'])) )
	$gpxfile = $bdir.basename($_SERVER['QUERY_STRING']);

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
	<title>Traccia Gpx: <?php echo basename($gpxfile); ?></title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" href="http://leaflet.cloudmade.com/dist/leaflet.css" />
	<style type="text/css">
		@import url('style.css');
	</style>
</head>

<body>
<?
if(!$gpxfile):
	?>
	<div id="tracklist">
	<h3>Tracce gpx:</h3><?
	$d = opendir($bdir);
	while($f = readdir($d))
	{
		if($f{0}=='.' or strtolower(substr($f,-4))!='.gpx') continue;
		?><a href="?<?=$f?>"><?=$f?></a><br /><?
	}
	closedir($d);
	?></div><?
else:	
?>	
<div id="map_wrap">
	<div id="list">
		<a href="<?=$gpxfile?>"><?=basename($gpxfile)?></a>
		<a id="gpxzoom"><span>zoom</span></a>
		<a id="gpxdown" href="<?=$gpxfile?>"><span>download</span></a>
	</div>
	<div id="map"></div>	
</div>
<div id="copy">powered by Stefano Cudini&nbsp;&nbsp;&nbsp;</div>
<!--script src="/js/jquery-1.7.2.min.js"></script-->
<script src="http://leaflet.cloudmade.com/dist/leaflet.js"></script>
<script src="http://maps.google.com/maps/api/js?v=3.2&sensor=false"></script>
<script src="/maps/leaflet-plugins/layer/tile/Google.js"></script>
<script src="/maps/leaflet-plugins/layer/vector/GPX.js"></script>
<script>
var gpxfile = "<?=$gpxfile?>";
</script>
<script src="pub.devel.js"></script>
<?
endif;
?>
<script type="text/javascript" src="/labs.analytics.js"></script>
</body>
</html>

