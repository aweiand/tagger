// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function () {
	$("body").css({ height: $(window).height() })
	
	$(bg.SitesData).each(function(){
    	$("#dump").append("<div class='card'>" +
								"<ul>" +
	    							"<li>Dominio: <b>" + $(this)[0]['domain'] + "</b></li>" +
	    							"<li>Img: " + $(this)[0]['img'] + "</li>" + 
	    							"<li>Table: " + $(this)[0]['table'] + "</li>" + 
	    							"<li>P: " + $(this)[0]['p'] + "</li>" + 
	    						"</ul>" +
    						"</div>");
	});
});