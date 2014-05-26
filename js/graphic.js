// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

// É executado cada vez que a página é carregada
document.addEventListener('DOMContentLoaded', function () {
	$("body").css({ height: $(window).height() })
	
	$(bg.SitesData).each(function(){
		var site 	= $(this)[0]['domain'].split("/")[2];

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
	    								"<span class='btnlbl'>" +
	    									"<img src='/pic/img.svg' style='width:15%' />&nbsp;" +
	    									"Imagen(s): " + this.img +
    									"</span>" +
									"</li>" + 
	    							"<li>" +
	    								"<span class='btnlbl'>" +
	    									"<img src='/pic/p.svg' style='width:15%' />&nbsp;" +
	    									"Paragrafo(s): " + this.p + 
    									"</span>" +
									"</li>" +
									"<li>" +
	    								"<span class='btnlbl'>" +
	    									"<img src='/pic/a.svg' style='width:15%' />&nbsp;" +
	    									"Link(s): " + this.a + 
    									"</span>" +
									"</li>" +
	    							"<li>" +
	    								"<span class='btnlbl'>" +
	    									"<img src='/pic/table.svg' style='width:15%' />&nbsp;" +
	    									"Tabela(s): " + this.table + 
    									"</span>" +
									"</li>" +									
	    						"</ul>" +
	    						"<div style='float: left; width: 100%; height 100px; border: 1px solid #C7C7C7;'>" +
	    							"<div>" +
	    								"<img src='/pic/img.svg' title='"+ this.img +" Tags IMG encontradas no site' style='width:"+ this.img +"%' />" +
    								"</div>" +
    								"<div>" +
	    								"<img src='/pic/p.svg' title='"+ this.p +" Tags P encontradas no site' style='width:"+ this.p +"%' />" +
	    							"</div>" +
    								"<div>" +
	    								"<img src='/pic/a.svg' title='"+ this.a +" Links encontrados no site' style='width:"+ this.a +"%' />" +
	    							"</div>" +
    								"<div>" +
	    								"<img src='/pic/table.svg' title='"+ this.table +" Tags TABLE encontradas no site' style='width:"+ this.table +"%' />" +
    								"</div>" +
	    						"</div>" +
    						"</div>");
	});

});