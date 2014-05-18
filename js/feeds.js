// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

// É executado cada vez que a página é carregada
document.addEventListener('DOMContentLoaded', function () {
	$("body").css({ height: $(window).height() })

	$(bg.FeedsData).each(function(){
		var site = $(this)[0]['domain'].split("/")[2];

    	var str = "<div class='card'>" +
						"<h4 style='text-align:center;'>" +
								$(this)[0]['title'] +
						"</h4>" +    		
						"<h3 style='text-align:center;'>" +
							"<a href='" + $(this)[0]['domain'] + "' target='_new'>" +
								"<b>" + site + "</b>" +
							"</a>" +
						"</h3>" +
						"<ul>";

		for (i in $(this)[0].tag){
			str = 			"<li>" +
								"<span class='badge badge-info'>" +
									"Tag(s): " + i + 
								"</span>" +
							"</li>";
		}
			str = 		"</ul>" +
					"</div>";

		$("#dump").append(str);
	});

});