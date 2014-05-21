// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

var fill   = d3.scale.category20();
var locale = $("body")[0];

// Carregando a API de Feeds do Google -->> 
//			https://developers.google.com/feed/v1/devguide
//			https://code.google.com/apis/ajax/playground/#load_feed
google.load("feeds", "1");

// É executado cada vez que a página é carregada
document.addEventListener('DOMContentLoaded', function () {
	$("body").css({ height: $(window).height() });
	var nombre = 0;

	$(bg.FeedsData).each(function(){
		var site = this.domain.split("/")[2];

    	var str = "<div class='card' id='" + nombre + "' data-domain='" + this.domain + "'>" +
						"<h4 style='text-align:center;'>" +
								this.title +
						"</h4>" +    		
						"<h3 style='text-align:center;'>" +
							"<a href='http://" + site + "' title='" + this.domain + "' target='_new'>" +
								"<b>" + site + "</b>" +
							"</a>" +
						"</h3>" +
						"<h5 style='text-align:center;'>" +
							"Feed: " +
							"<a href='" + this.domain + "' title='" + this.domain + "' target='_new'>" +
								this.domain.substring(0,30) + "..." +
							"</a>" +
						"</h5>" +
						"<h5 style='text-align: center; width: 100%; cursor: pointer;' class='label label-info expand'>Clique para expandir os resultados</h5>" +				
						"<ul style='display: none;'>";

		for (i in this.tag){
			var tag = "";
			var style = "";

			i.length > 20 ? tag = i.substring(0,20) + "..." : tag = i;

			if (this.tag[i] > 1){
				tag		= this.tag[i] + " " + tag;
				style 	= "; color: #FFFFFF; font-size: 13px; ";
			} else {
				style	= "; color: #C7C7C7;";
			}

			str+= 			"<li>" +
								"<span data-tag='" + i + "' data-domain='" + this.domain + "' " +
										" class='badge badge-info' title='" + i + "' " +
										" style='cursor: pointer; " + style + "''>" +
									tag + 
								"</span>" +
							"</li>";
		}
			str+= 		"</ul>" +
					"</div>";

		$("#dump").append(str);

		locale = $("#"+nombre+">h5")[0];
		d3.layout.cloud().size([300, 300])
			.words(mapFeedObj(this.tag))
			.padding(5)
			.rotate(function() { return ~~(Math.random() * 2) * 90; })
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();		

		nombre++;
	});

});

// Click na tag
$(document).delegate("span[data-tag]", "click", function(){
	var domain 	= $(this).closest('div').data("domain");
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

$(document).delegate(".expand", "click", function(){
	$(this).next("ul").slideToggle();
	$("body").css({ height: $(window).height() });
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

// Função da biblioteca D3.js para criar a tag cloud
function draw(words) {
	d3.select(locale).append("svg")
	    .attr("width", 300)
	    .attr("height", 300)
		.append("g")
		.attr("transform", "translate(150,150)")
		.selectAll("text")
		.data(words)
		.enter().append("text")
		.style("font-size", function(d) { return d.size + "px"; })
		.style("font-family", "Impact")
		.style("cursor", "pointer")
		.style("fill", function(d, i) { return fill(i); })
		.attr("text-anchor", "middle")
		.attr("transform", function(d) {
	  		return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	    })
	    .text(function(d) { return d.text; })
		.on("click", function(tag) {
			var domain 	= $(this).closest("svg").closest(".card").data("domain");
			$(bg.FeedsData).each(function(){
				if (this.domain == domain){
					showFeedFilter(domain, tag.text);
				}
			})
		})
}

// Função para mapear os Feeds que estão em um objeto em um Array
function mapFeedObj(tags){
	var arr2 = [];

	for (k in tags){
		arr2.push({
			text: k,
			size: (10 + tags[k])
		});
	}

	return arr2;
}