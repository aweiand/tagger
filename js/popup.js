// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function () {
	$('#myTab a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	});

	FavoriteDomains();
	FavoriteFeeds();
})

// Botão de Gerar Informações
$(document).delegate("#CollectInfo", "click", function(){
	bg.SitesData = [];
	var domains = [];

	$("#listSite li input").each(function(){
		site = $.trim($(this).val());
		if (site != "" && site.length > 5){
			domains.push(site);

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
					arraySite['a']		= $(result).find('a').length;
					arraySite['img']	= $(result).find('img').length;
					arraySite['table']	= $(result).find('table').length;

					chrome.runtime.sendMessage({action: "addSitesData", site: arraySite});
				}
			})
		}
	}).promise().done(function(){
	    // Storage com as últimas URL's que o usuário consultou
        chrome.storage.sync.set({
            domains: domains
        });

		bg.getGraphics();
	});
});

// Botão para coletar os feeds
$(document).delegate("#CollectFeed", "click", function(){
	bg.FeedsData = [];
	var arr = [];
	var feeds = [];

	$("#listFeed li input").each(function(){
		site = $.trim($(this).val());
		if (site != "" && site.length > 5){
			feeds.push(site);

			$.ajax({
			   url: site,
			   async: false,
			   type : "POST",
			   dataType : "xml",
			   success: function(result){
			   		var arraySite = { tag: {} };
			   		arraySite['domain'] = site;
			   		arraySite['feed'] 	= $(result);
			   		arraySite['title'] 	= $(result).find('channel').find("title").first().text();

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
			})
		}
	}).promise().done(function(){
	    // Storage com as últimas URL's que o usuário consultou
        chrome.storage.sync.set({
            feeds: feeds
        });
		bg.getFeedGraphics();
	});
})

// Botão para adicionar um site na lista
$(document).delegate("#btnAddSite", "click", function(){
	$(this).parent("li").parent("ul").append(	'<li>' +
							'<input type="text" name="link" placeholder="Digite o Link" value="" />' +
							'&nbsp;<button class="btn btn-mini btn-danger" id="btnRmSite" title="Remover">' +
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

function FavoriteDomains(){
 	chrome.storage.sync.get({domains: 'red'}, function(val){
 		if (val.domains.length >= 1){
 			$("#listSite li").each(function(){ 
 				$(this).hasClass("first") ? null : $(this).remove();
 			});

	 		for (var l in val['domains']){
				$("#listSite").append(	'<li>' +
											'<input type="text" name="link" placeholder="Digite o Link" value="' + val['domains'][l] + '" />' +
											'&nbsp;<button class="btn btn-mini btn-danger" id="btnRmSite" title="Remover">' +
												'<i class="icon-remove"></i>' +
											'</button>' +
										'</li>');	
			}
		}
	})
}

function FavoriteFeeds(){
 	chrome.storage.sync.get({feeds: 'red'}, function(val){
 		if (val.feeds.length >= 1){
 			$("#listFeed li").each(function(){ 
 				$(this).hasClass("first") ? null : $(this).remove();
 			});

	 		for (var l in val['feeds']){
				$("#listFeed").append(	'<li>' +
											'<input type="text" name="link" placeholder="Digite o Link" value="' + val['feeds'][l] + '" />' +
											'&nbsp;<button class="btn btn-mini btn-danger" id="btnRmSite" title="Remover">' +
												'<i class="icon-remove"></i>' +
											'</button>' +
										'</li>');	
			}
		}
	})
}