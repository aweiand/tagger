

// Botão de Gerar Informações
$(document).delegate("#CollectInfo", "click", function(){
	var lista = $("#SitesList").text().split(";");

	$(lista).each(function(site){
		site = $.trim(lista[site]);

		$.ajax({
			url: site,
			dataType: "html",
			success: function(result){
				var arraySite = {};

				arraySite['domain'] = site;
				arraySite['dataraw'] = result;

				arraySite['p']		= $(result).find('p').length;
				arraySite['img']	= $(result).find('img').length;
				arraySite['table']	= $(result).find('table').length;

				chrome.runtime.sendMessage({action: "addSitesData", site: arraySite});
			}
		});
	});
});

// Botão de Log
$(document).delegate("#log", "click", function(){
	chrome.runtime.sendMessage({ action: "logSitesData" });
});
