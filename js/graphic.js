// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

// É executado cada vez que a página é carregada
document.addEventListener('DOMContentLoaded', function () {
	$("body").css({ height: $(window).height() })
	
	$(bg.SitesData).each(function(){
		var site = $(this)[0]['domain'].split("/")[2];

    	$("#dump").append("<div class='card'>" +
    							"<h4 style='text-align:center;'>" +
	    								$(this)[0]['title'] +
    							"</h4>" +    		
    							"<h3 style='text-align:center;'>" +
	    							"<a href='" + $(this)[0]['domain'] + "' target='_new'>" +
	    								"<b>" + site + "</b>" +
    								"</a>" +
    							"</h3>" +
								"<ul>" +
	    							"<li>" +
	    								"<span class='badge badge-info'>" +
	    									"Imagen(s): " + $(this)[0]['img'] +
    									"</span>" +
									"</li>" + 
	    							"<li>" +
	    								"<span class='badge badge-info'>" +
	    									"Paragrafo(s): " + $(this)[0]['p'] + 
    									"</span>" +
									"</li>" +
	    							"<li>" +
	    								"<span class='badge badge-info'>" +
	    									"Tabela(s): " + $(this)[0]['table'] + 
    									"</span>" +
									"</li>" +									
	    						"</ul>" +
	    						"<div>" +
	    							"<img src='/pic/img.png' title='"+ $(this)[0]['img'] +"' style='width:"+ $(this)[0]['img'] +"%' />" +
	    							"<img src='/pic/table.png' title='"+ $(this)[0]['table'] +"' style='width:"+ $(this)[0]['table'] +"%' />" +
	    							"<img src='/pic/p.png' title='"+ $(this)[0]['p'] +"' style='width:"+ $(this)[0]['p'] +"%' />" +
	    						"</div>" +
    						"</div>");
	});

});