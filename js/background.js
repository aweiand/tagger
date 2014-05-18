var SitesData = [];
var FeedsData = [];

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	switch(msg.action){
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

function mergeSiteFeed(msg){
    var existe = FeedsData.map(function(e) { return e.domain; }).indexOf(msg.domain);

    if (existe != -1){
        FeedsData.splice(existe, 1);
        FeedsData.push(msg);
    } else {
        FeedsData.push(msg);
    }
}

function getGraphics() {
    chrome.tabs.create({'url': chrome.extension.getURL('/html/graphics.html')}, function(){

    });
}

function getFeedGraphics(){
    chrome.tabs.create({'url': chrome.extension.getURL('/html/feeds.html')}, function(){

    });   
}