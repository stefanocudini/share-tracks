<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="https://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
	<title>SHARE GPX TRACKS</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<link rel="stylesheet" href="share-tracks.css" />
</head>

<body>
<div id="tracklist">
	<h1>SHARE GPX TRACKS</h1>
	<p>
		The simple way to share your paths in the rest of the web.<br />
		<iframe src="https://ghbtns.com/github-btn.html?user=stefanocudini&amp;repo=share-tracks&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="104px" height="20px"></iframe>
		<br />
		Other useful stuff for <a href="https://opengeo.tech/maps/">Web Mapping...</a>
	</p>
	<button id="load" href="#">Load Tracks</button>
	<ul id="gpxs">
	</ul>
	<br />
	<h4>Features</h4>
	<ul>
		<li><a href="embed.php">Maps Embedder</a></li>
		<li>Support Mobile Devices:<br />
		<img src="images/mobile-map.png" />
		</li>
	</ul>
	<div id="copy">
		<a href="https://opengeo.tech/">Opengeo.tech</a> &bull; <a rel="author" href="https://opengeo.tech/stefano-cudini/">Stefano Cudini</a>
	</div>
	<a href="https://github.com/stefanocudini/share-tracks"><img id="ribbon" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
</div>
<script src="/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript">
$('#load').on('click',function() {

 	$('#gpxs').load('./gpxs.php')
});
</script>
<script src="/labs-common.js"></script>
</body>
</html>

