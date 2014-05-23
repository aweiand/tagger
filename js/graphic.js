// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

// É executado cada vez que a página é carregada
document.addEventListener('DOMContentLoaded', function () {
	$("body").css({ height: $(window).height() })
	
	$(bg.SitesData).each(function(){
		var site 	= $(this)[0]['domain'].split("/")[2];
		var tot 	= (this.img + this.p + this.table) / 100;
		var lImg 	= this.img * 10 * tot;
		var lP 		= this.p * 10 * tot;
		var lTable 	= this.table * 10 * tot;

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
	    									"Imagen(s): " + this.img +
    									"</span>" +
									"</li>" + 
	    							"<li>" +
	    								"<span class='badge badge-info'>" +
	    									"Paragrafo(s): " + this.p + 
    									"</span>" +
									"</li>" +
	    							"<li>" +
	    								"<span class='badge badge-info'>" +
	    									"Tabela(s): " + this.table + 
    									"</span>" +
									"</li>" +									
	    						"</ul>" +
	    						"<div style='float: left; width: 100%; height 100px;'>" +
	    							"<img src='/pic/img.svg' title='"+ this.img +" Tags IMG encontradas no site' style='width:"+ lImg +"%' />" +
	    							"<img src='/pic/p.svg' title='"+ this.p +" Tags P encontradas no site' style='width:"+ lP +"%' />" +
	    							"<img src='/pic/table.svg' title='"+ this.table +" Tags TABLE encontradas no site' style='width:"+ lTable +"%' />" +
	    						"</div>" +
    						"</div>");
	});

});