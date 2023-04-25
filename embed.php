<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
<title></title> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<link rel="stylesheet" href="share-tracks.css" />
<style>
/*	@import url('style.css'); */
textarea {
	margin: 0;
}
#content,
iframe {
	float: left;
	margin: 1em;
}
#sizes label,
#tiles label {
	display: inline-block;
	vertical-align: bottom;
	padding: 2px;
	margin: 2px;
	color: #fff;
	border: 3px solid #fff;
	background: #cdb;
	cursor: pointer;
}
#sizes input,
#tiles input { visibility: hidden; margin-left: -18px}
#sizes label.selected,
#tiles label.selected {
	border-color: #d00;
	color: #d00;
}
#sizes .size1 { width: 70px; height:50px; }
#sizes .size2 { width: 100px; height:70px; }
#sizes .size3 { width: 130px; height:90px; }

</style>
<link rel="stylesheet" href="//unpkg.com/github-fork-ribbon-css@0.2.3/gh-fork-ribbon.css"></head>

<body>
<div id="content">
	<label>Track: </label>
	<select id="gpxfile">
	<?
		foreach(glob('./gpxs/*.gpx') as $f)
			echo '<option value="'.$f.'">'.basename($f).'</option>'."\n";
	?>
	</select>
	<br /><br />
	<div id="sizes">
		<label class="size1"><span>350&nbsp;x&nbsp;250</span><input name="size" type="radio" data-width="350" data-height="250" /></label>
		<label class="size2"><span>640&nbsp;x&nbsp;360</span><input name="size" type="radio" data-width="640" data-height="360" /></label>
		<label class="size3"><span>700&nbsp;x&nbsp;480</span><input name="size" type="radio" data-width="700" data-height="480" /></label>
	</div>
	<br />
	<div id="tiles">
		<label class="tile1"><span>OSM</span><input name="tile" type="radio" value="OSM" /></label>
		<label class="tile2"><span>Paths</span><input name="tile" type="radio" value="Paths" /></label>
		<label class="tile3"><span>Gray</span><input name="tile" type="radio" value="Gray" /></label>
		<label class="tile4"><span>Sat</span><input name="tile" type="radio" value="Satellite" /></label>
		<label class="tile5"><span>Terrain</span><input name="tile" type="radio" value="Terrain" /></label>
		<label class="tile6"><span>Print</span><input name="tile" type="radio" value="Print" /></label>
	</div>
	<br />
	<textarea cols="41" rows="5"></textarea>
	<br />
	<input id="iframeurl" type="text" valud="" size="42" />	
</div>

<iframe src="map.html?gpxs/chia.fosso.gpx" frameborder="0" width="350" height="250"></iframe>

<a href="https://github.com/stefanocudini/share-tracks" class="github-fork-ribbon" data-ribbon="Fork me on GitHub">Github</a>

<script src="//unpkg.com/jquery@3.3.1/dist/jquery.js"></script>
<script type="text/javascript">
$(function() {

	var iframeOpts = {w: 350, h: 250, lay: 'OSM'};

	$("#sizes :radio").on('click', function(e) {
		var selected = $(this);
		selected.parent().addClass("selected").siblings().removeClass("selected");
		iframeOpts.w = selected.data("width");
		iframeOpts.h = selected.data("height");
		createIframe();
	});

	$("#tiles :radio").on('click', function(e) {
		var selected = $(this);
		selected.parent().addClass("selected").siblings().removeClass("selected");
		iframeOpts.lay = selected.val();
		createIframe();
	});	

	$('#gpxfile').on('change', createIframe);

	$('textarea').on('click', function(e) {
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
	});

function createIframe() {
	var w = iframeOpts.w,
		h = iframeOpts.h;
		/*z = 16,
		lat = 42.466865,
		lon = 12.26337,*/
		lay = iframeOpts.lay,
		file = $('#gpxfile').val(),
		params = 'map.html?'+file,//+'#layer='+lay, only layer parameter don't work in L.Permalink
		url = window.location.protocol+'//'+window.location.host+'/'+window.location.pathname,
		url = url.substring(0, url.lastIndexOf('/') + 1) + params,
		iframeHtml = '<iframe frameborder="0" width="'+ w +'" height="'+ h +'" src="'+ url +'"></iframe>';

	console.log(url);

	$('#iframeurl').val(url);
	$('textarea').text( iframeHtml );
	$('iframe').replaceWith( $(iframeHtml) );
}

});
</script>
</body>
</html>
