// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

// Carregando a API de Feeds do Google -->> 
//			https://developers.google.com/feed/v1/devguide
//			https://code.google.com/apis/ajax/playground/#load_feed
google.load("feeds", "1");

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
							"<a href='http://" + site + "' title='" + $(this)[0]['domain'] + "' target='_new'>" +
								"<b>" + site + "</b>" +
							"</a>" +
						"</h3>" +
						"<h5 style='text-align:center;'>" +
							"Feed: " +
							"<a href='" + $(this)[0]['domain'] + "' title='" + $(this)[0]['domain'] + "' target='_new'>" +
								$(this)[0]['domain'].substring(0,30) + "..." +
							"</a>" +
						"</h5>" +						
						"<ul>";

		for (i in $(this)[0].tag){
			var tag = "";
			var style = "";

			i.length > 20 ? tag = i.substring(0,20) + "..." : tag = i;

			if ($(this)[0].tag[i] > 1){
				tag		= $(this)[0].tag[i] + " " + tag;
				style 	= "; color: #FFFFFF; font-size: 13px; ";
			} else {
				style	= "; color: #C7C7C7;";
			}

			str+= 			"<li>" +
								"<span data-tag='" + i + "' data-domain='" + $(this)[0]['domain'] + "' " +
										" class='badge badge-info' title='" + i + "' " +
										" style='cursor: pointer; " + style + "''>" +
									tag + 
								"</span>" +
							"</li>";
		}
			str+= 		"</ul>" +
					"</div>";

		$("#dump").append(str);
	});

});

// Click na tag
$(document).delegate("span[data-tag]", "click", function(){
	var domain 	= $(this).data("domain");
	var tag 	= $(this).data("tag");

	$(bg.FeedsData).each(function(){
		if ($(this)[0]['domain'] == domain){
			showFeedFilter(domain, tag);

			return false;
		}
	})
});

// Mostra o Load preto com branco na tela
function showLoad(text) {
    if ($('#_fullscr').size() < 1) {
        var div = document.createElement("div");
        div.id = '_fullscr';
        div.innerHTML = "&nbsp;";
        document.body.appendChild(div);

        $('#_fullscr').css({
            left: '0px',
            top: '0px',
            width: '100%',
            position: 'absolute',
            zIndex: '1000',
            display: 'none',
            opacity: '0.80',
            filters: 'alpha(opacity=80)',
            MozOpacity: '0.80',
            backgroundColor: '#000',
            height: $(document).height()
        });
    }

    if ($('#_window').size() < 1) {
        var div = document.createElement("div");
        div.id = '_window';
        div.innerHTML = text;
        document.body.appendChild(div);

        $('#_window').css({
            border: '3px solid #666666',
            padding: '30px',
            backgroundColor: '#FFF',
            '-webkit-border-radius': '15px',
            '-moz-border-radius': '15px',
            color: '#000',
            zIndex: '1001',
            display: 'none',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            position: 'absolute',
            width: '50%'
        });
    } else {
    	$("#_window").html(text);
    }

    $('#_fullscr, #_window').fadeIn('fast', function() {
    	$("#_window").css({ left: "25%" });
    });

    return false;
}

// Quando é clicado no fundo preto ele "some"
$(document).delegate("#_fullscr", "click", function(){
	$("#_fullscr, #_window").fadeOut({}, function(){ 
		$(this).remove();
	});

	return false;
})

// Função que mostra o popup com os itens do RSS da tag especificada
function showFeedFilter(domain, tag) {
	var feed = new google.feeds.Feed(domain);
	feed.setNumEntries(99);
	var html = "";

	feed.load(function(result) {
		if (!result.error) {
			for (var i = 0; i < result.feed.entries.length; i++) {
				var entry = result.feed.entries[i];
				if (entry.categories.indexOf(tag) != -1){
      				html+= 	"<h3>" + 
      							"<a href='" + entry.link + "' title='" + entry.link + "' target='_new'>" + 
      								entry.title +
  								"</a>" +
  							"</h3>" +
      						"<p>" + entry.content + "</p>";

      				for(var j = 0; j < entry.categories.length; j++){
      					html+=	"<span class='label' style='margin: 5px;'>" + 
      								entry.categories[j] + 
  								"</span>";
  					}

  					html+= 	"<span class='label label-info'>" +
  								entry.publishedDate +
  							"</span>" +
							"<hr />";
      			}
			}

			showLoad(html);
		}
	});
}