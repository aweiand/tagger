// Array que armazena dados do formulário de análise de sites
var SitesData = [];

// Array que armazena dados do formulário de análise de feeds/rss
var FeedsData = [];

// Recebendo mensagens trocadas com as páginas
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	switch(msg.action){
        //Adicionando dados dos sites no array global
		case 'addSitesData': {
			var existe = SitesData.map(function(e) { return e.domain; }).indexOf(msg.site.domain);

			if (existe != -1){
				SitesData.splice(existe, 1);
        		SitesData.push(msg.site);
        	} else {
        		SitesData.push(msg.site);
        	}
    	}; break;
	}
});

// Função para unir os dados advindos do processamento dos feeds/rss e armazenando no array global
function mergeSiteFeed(msg){
    var existe = FeedsData.map(function(e) { return e.domain; }).indexOf(msg.domain);

    if (existe != -1){
        FeedsData.splice(existe, 1);
        FeedsData.push(msg);
    } else {
        FeedsData.push(msg);
    }
}

// Função para criar a aba de visualização das informações dos sites
function getGraphics() {
    chrome.tabs.create({'url': chrome.extension.getURL('/html/graphics.html')}, function(){

    });
}

// Função para criar a aba de visualização das informações dos feeds/rss
function getFeedGraphics(){
    chrome.tabs.create({'url': chrome.extension.getURL('/html/feeds.html')}, function(){

    });   
}