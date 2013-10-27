<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
<title></title> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
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
#sizes label {
	display: inline-block;
	vertical-align: bottom;
	padding: 2px;
	color: #fff;
	border: 2px solid #fff;
	background: #ccc;
}
#sizes input { visibility: hidden;}
#sizes label.selected-size {
	border-color: #d00;
	color: #d00;
}
#sizes .size1 { width: 70px; height:50px; }
#sizes .size2 { width: 100px; height:70px; }
#sizes .size3 { width: 130px; height:90px; }

</style>
</head>

<body>
<div id="content">
	<label>Track file: </label>
	<select id="gpxfile">
	<?
		foreach(glob('./gpxs/*.gpx') as $f)
			echo '<option value="'.$f.'">'.basename($f).'</option>'."\n";
	?>
	</select>
	<br /><br />
	<div id="sizes">
		<label class="size1"><span>350&nbsp;x&nbsp;250</span><input type="radio" data-width="350" data-height="250" /></label>
		<label class="size2"><span>640&nbsp;x&nbsp;360</span><input type="radio" data-width="640" data-height="360" /></label>
		<label class="size3"><span>700&nbsp;x&nbsp;480</span><input type="radio" data-width="700" data-height="480" /></label>
	</div>
	<br />
	<textarea cols="34" rows="5"></textarea>
</div>

<iframe src="./?gpxs/chia.fosso.gpx" frameborder="0" width="350" height="250"></iframe>

<script src="/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript">
$(function() {

	var iframeSizes = {w:350, h:250};

	$("#sizes :radio").on('click', function(e) {
        var selected = $(this);
        selected.parent().addClass("selected-size").siblings().removeClass("selected-size");
        iframeSizes.w = selected.data("width");
        iframeSizes.h = selected.data("height");
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
	var w = iframeSizes.w,
		h = iframeSizes.h;
		z = 16,
		lat = 42.466865,
		lon = 12.26337,
		lay = 'OSM',
		file = $('#gpxfile').val(),
		params = 'index.php?'+file,//+'#zoom='+z+'&lat='+lat+'&lon='+lon+'&layer='+lay,
		url = window.location.protocol+'//'+window.location.host+'/'+window.location.pathname,
		url = url.substring(0, url.lastIndexOf('/') + 1) + params,
		iframeHtml = '<iframe frameborder="0" width="'+ w +'" height="'+ h +'" src="'+ url +'"></iframe>';

	$("textarea").text(iframeHtml);
	$('iframe').replaceWith($(iframeHtml));
}

});
</script>
</body>
</html>
