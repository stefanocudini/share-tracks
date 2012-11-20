// Copyright (c) 2012, Rogier Steehouder. See the LICENSE file.

(function (root) {
	root.GPX = {
		_wpt_name: 'Unnamed waypoint',
		_wpt_opts: {},
		_trk_name: 'Unnamed track',
		_trk_opts: {color: '#00f', weight: 5, opacity: 0.75},
		_rte_name: 'Unnamed route',
		_rte_opts: {color: '#f00', weight: 5, opacity: 0.75},

		getText: function (node) {
			if (typeof node.textContent != 'undefined') return node.textContent;
			if (typeof node.innerText != 'undefined') return node.innerText;
			if (node.nodeType == 3) return node.data;
			var result = '';
			node = node.firstChild;
			while (node) {
				result += GPX.getText(node)
				node = node.nextSibling;
			}
			return result;
		},

		parsewpt: function (wpt) {
			var name = wpt.getElementsByTagName('name');
			if (name.length > 0) { name = GPX.getText(name[0]); } else { name = GPX._wpt_name; }

			var p = new L.LatLng(parseFloat(wpt.getAttribute('lat')), parseFloat(wpt.getAttribute('lon')));
			var m = new L.Marker(p, GPX._wpt_opts);
			m.bindPopup('<p>' + name + '</p>');

			return {type: 'wpt', name: name, layer: m, bounds: new L.LatLngBounds(p, p)};
		},

		parsetrk: function (trk) {
			var name = trk.getElementsByTagName('name');
			if (name.length > 0) { name = GPX.getText(name[0]); } else { name = GPX._trk_name; }

			var trklayer = new L.LayerGroup();
			var trkbounds = new L.LatLngBounds();

			var node = trk.firstChild;
			while (node) {
				if (node.nodeName.toLowerCase() == 'trkseg') {
					parr = [];
					trkpts = node.getElementsByTagName('trkpt');
					for (var i = 0, l = trkpts.length; i < l; i++) {
						var trkpt = trkpts[i];
						var p = new L.LatLng(parseFloat(trkpt.getAttribute('lat')), parseFloat(trkpt.getAttribute('lon')));
						parr.push(p);
						trkbounds.extend(p);
					}
					var seg = new L.Polyline(parr, GPX._trk_opts);
					seg.bindPopup('<p>' + name + '</p>');
					trklayer.addLayer(seg);
				}
				node = node.nextSibling;
			}

			return {type: 'trk', name: name, layer: trklayer, bounds: trkbounds};
		},

		parserte: function (rte) {
			var name = rte.getElementsByTagName('name');
			if (name.length > 0) { name = GPX.getText(name[0]); } else { name = GPX._rte_name; }

			var rtebounds = new L.LatLngBounds();

			parr = [];
			rtepts = node.getElementsByTagName('rtept');
			for (var i = 0, l = rtepts.length; i < l; i++) {
				var rtept = rtepts[i];
				var p = new L.LatLng(parseFloat(rtept.getAttribute('lat')), parseFloat(rtept.getAttribute('lon')));
				parr.push(p);
				rtebounds.extend(p);
			}
			var rtelayer = new L.Polyline(parr, GPX._rte_opts);
			rtelayer.bindPopup('<p>' + name + '</p>');

			return {type: 'rte', name: name, layer: rtelayer, bounds: rtebounds};
		},

		parsegpx: function (gpxnode) {
			var result = [];

			var item;
			var node = gpxnode.firstChild;
			while (node) {
				item = false;
				if (node.nodeName.toLowerCase() == 'wpt') { item = GPX.parsewpt(node); }
				if (node.nodeName.toLowerCase() == 'trk') { item = GPX.parsetrk(node); }
				if (node.nodeName.toLowerCase() == 'rte') { item = GPX.parserte(node); }
				if (item) { result.push(item); }
				node = node.nextSibling;
			}

			return result;
		},

		map: function (map, xml) {
				var items = this.parsegpx(xml);
				
				var wplayer = new L.LayerGroup();
				var bounds = new L.LatLngBounds();
				var controls = [];

				for (var i = 0, l = items.length; i < l; i++) {
					var item = items[i];
					if (item.type == 'wpt') {
						wplayer.addLayer(item.layer);
						bounds.extend(item.bounds.getCenter());
					}
					if (item.type == 'trk' || item.type == 'rte') {
						controls.push(item);
						map.addLayer(item.layer);
						bounds.extend(item.bounds.getSouthWest());
						bounds.extend(item.bounds.getNorthEast());
					}
				}

				var lcontrol = new L.Control.Layers();
				if (wplayer._layers) {
					lcontrol.addOverlay(wplayer, 'Waypoints');
					map.addLayer(wplayer);
				}
				for (var i = 0, l = controls.length; i < l; i++) {
					lcontrol.addOverlay(controls[i].layer, controls[i].name);
				}
				map.addControl(lcontrol);
				map.fitBounds(bounds);
			//});
		}
	};
}(this));
