<?php foreach(glob('./gpxs/*.gpx') as $f): ?>
	<li><a href="map.html?<?=$f?>"><?=basename($f)?></a></li>
<?php endforeach; ?>