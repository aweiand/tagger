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
	var html 	= {};
	var i 		= 0;

	$(bg.FeedsData).each(function(){
		if ($(this)[0]['domain'] == domain){
			var feed = $(this)[0]['feed'];

			feed.find('channel').children().each(function() {
				var cat = $(this).find("category");
	        	$(cat).each(function(){
					if ($(this)[0].innerHTML == tag){
						html[i] = "<div>" + $(this).parent("item").html() + "</div>";
						i++;
					}
				})
			});

			montaHTML(html);
			return false;
		}
	})
});

var a;
// Função para montar o HTML do Feed quando clicado na TAG
function montaHTML(objeto){
	var html = "";
	for (i in objeto){
		// html += "<p>" + objeto[i] + "</p><hr />";

		html = $(objeto[i]).text(function(i,f){
    		$(this).children().each(function(){
			    switch ($(this)[0].nodeName){
			    	case "TITLE": {
			        	$(this).replaceWith("<h3>" + $(this)[0].innerHTML + "</h3>")
			        }; break;

			        case "CATEGORY": {
			        	$(this).replaceWith("<span class='badge badge-info'>" + $(this)[0].innerHTML + "</span>")
			        }; break;

			        case "DESCRIPTION": {
			        	$(this).replaceWith("<p>" + $(this)[0].innerHTML + "</p>")
			        }; break;

			        case "PUBDATE": {
			        	$(this).replaceWith("<p class='badge' style='margin: 10px;'>" + $(this)[0].innerHTML + "</p>")
			        }; break;

			        case "LINK": {
			        	$(this).replaceWith($(this)[0].innerHTML + "<br />")
			        }; break;	

			        default : {
			        	$(this).replaceWith($(this)[0].innerHTML + "<br />")
			        }		        
			    }
		   	})
		}).html();

		html += "<hr />";
		a = objeto[i];
	}

	showLoad(html);

	return false;
}


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