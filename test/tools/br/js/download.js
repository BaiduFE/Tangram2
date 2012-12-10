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
				var count1, count2;
				top.apicontent = "";
				var win = e.target.contentWindow;
				win.postMessage(fid.split("_")[3],"*");
				win.postMessage("apiCount","*");
				window.onmessage = function(e){
					if(e.data.length == 2){
						top.apicontent = e.data[0];
						top.count2 = e.data[1];
					}
					else{
						top.count1 = e.data;
					}
					
					if(fid.split("_")[3] == "5"){
						run('baidu.dom.each');
						$('#id_rerun').html('baidu.dom.each');
						
					}
				}
			});
			top.flag = false;
		}
	});