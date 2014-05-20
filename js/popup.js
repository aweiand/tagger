// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function () {
	$('#myTab a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	})
})

// Botão de Gerar Informações
$(document).delegate("#CollectInfo", "click", function(){
	$("#listSite li input").each(function(){
		site = $.trim($(this).val());

		$.ajax({
			url: site,
			type: 'post',
			dataType: "html",
			async: false,
			success: function(result){
				var arraySite = {};

				// arraySite['dataraw'] = result;
				arraySite['domain'] = site;
				arraySite['title']	= result.match("<title>(.*?)</title>")[1];
				// arraySite['icon']	= getFavicon($(result)) ? getFavicon($(result)) : result.match("<link rel=\"shortcut.*? href=\"(.*?.ico)")[1]+".ico";

				arraySite['p']		= $(result).find('p').length;
				arraySite['img']	= $(result).find('img').length;
				arraySite['table']	= $(result).find('table').length;

				chrome.runtime.sendMessage({action: "addSitesData", site: arraySite});
			}
		});
	}).promise().done(function(){
		bg.getGraphics();
	});
});

// Botão para coletar os feeds
$(document).delegate("#CollectFeed", "click", function(){
	var arr = [];

	$("#listFeed li input").each(function(){
		site = $.trim($(this).val());

		$.ajax({
		   url: site,
		   async: false,
		   type : "POST",
		   dataType : "xml",
		   success: function(result){
		   		var arraySite = { tag: {} };
		   		arraySite['domain'] = site;
		   		arraySite['feed'] 	= $(result);
		   		arraySite['title'] 	= $(result).find('channel').children().find("title").first().text();

               $(result).find('channel').children().each(function() {
		        	var cat = $(this).find("category");
 		        	$(cat).each(function(){
                     	if ($(this)[0].innerHTML != ""){
							arraySite['tag'][$(this)[0].innerHTML] == null ? arraySite['tag'][$(this)[0].innerHTML] = 1 : arraySite['tag'][$(this)[0].innerHTML]++;
		        		}
		        	})
		        });

		        bg.mergeSiteFeed(arraySite);
		   }
		});
	}).promise().done(function(){
		bg.getFeedGraphics();
	});
})

// Botão para adicionar um site na lista
$(document).delegate("#btnAddSite", "click", function(){
	$(this).parent("li").parent("ul").append(	'<li>' +
							'<input type="text" name="link" placeholder="Digite o Link" value="" />' +
							'&nbsp;<button class="btn btn-mini btn-danger" id="btnRmSite">' +
								'<i class="icon-remove"></i>' +
							'</button>' +
						'</li>');
});

// Botão para remover um site
$(document).delegate("#btnRmSite", "click", function(){
	$(this).parent("li").remove();
})

// Função para tentar extrair o icone da página
function getFavicon(doc){
    var favicon = undefined;

    $(doc).find("link").each(function(){
        if(($(this).attr("rel") == "icon") || ($(this).attr("rel") == "shortcut icon")){
            return ($(this).attr("href"));
        }
    })
}