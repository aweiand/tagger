var SitesData = [];

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	switch(msg.action){
		case 'addSitesData': {
        	SitesData.push(msg.site);
    	}; break;

		case 'logSitesData': {
	        console.log(SitesData);
	    }; break;
	}
});