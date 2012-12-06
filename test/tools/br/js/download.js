$(document).ready(
	function() {
		if (location.href.search("[?&,]download=[0-9]") > 0) {
			var fid = "id_frame_" + location.search.match(/download=[0-9]/)[0].split("=").join("_");
			var url = "http://tangram2.offline.bae.baidu.com/download#custom";
			$("#id_download_button").css("display", "");
			$('#id_downloadarea').empty().append(
					'<iframe id="' + fid + '" src="' + url
							+ '" class="downloadframe"></iframe>');
			window.$("#" + fid).one('load', function(e) {
				top.apicontent = "";
				var win = e.target.contentWindow;
				win.postMessage(fid.split("_")[3],"*");
				window.onmessage = function(e){
					top.apicontent = e.data;
				}
			});
			top.flag = false;
		}
	});