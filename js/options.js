// Variavel que armazena a Background.js
var bg = chrome.extension.getBackgroundPage();

// É executado cada vez que a página é carregada
document.addEventListener('DOMContentLoaded', function () {
	$("body").css({ height: $(window).height() })

 	chrome.storage.sync.get({domains: 'red'}, function(val){
 		for (var l in val['domains']){
			$("#links").append("<li>" + 
									"<input type='text' value='"+ val['domains'][l] + "' />" +
									'&nbsp;<button class="btn btn-mini btn-danger" id="btnRmSite" title="Remover">' +
										'<i class="icon-remove"></i>' +
									'</button>' +									
								"</li>");
		}
	})

 	chrome.storage.sync.get({feeds: 'red'}, function(val){
 		for (var l in val['feeds']){
			$("#feeds").append("<li>" + 
									"<input type='text' value='"+ val['feeds'][l] + "' />" +
									'&nbsp;<button class="btn btn-mini btn-danger" id="btnRmSite" title="Remover">' +
										'<i class="icon-remove"></i>' +
									'</button>' +									
								"</li>");
		}
	})

 	$(document).delegate("#btnSaveDomain", "click", function(){
 		var domains = [];

 		$("#links li input").each(function(){
 			domains.push($(this).val());
 		})

        chrome.storage.sync.set({
            domains: domains
        });

        alert("Salvo!");
 	})

 	$(document).delegate("#btnSaveFeed", "click", function(){
 		var feeds = [];

 		$("#feeds li input").each(function(){
 			feeds.push($(this).val());
 		})

        chrome.storage.sync.set({
            feeds: feeds
        });

        alert("Salvo!");
 	})

 	$(document).delegate("#btnRmSite", "click", function(){
 		$(this).parent("li").remove();
 	})

 	$(document).delegate("#btnAddSite", "click", function(){
 		$(this).parent("li").append("<li>" + 
										"<input type='text' value='http://www.example.com' style='background-color: rgb(255, 255, 178)' />" +
										'&nbsp;<button class="btn btn-mini btn-danger" id="btnRmSite" title="Remover">' +
											'<i class="icon-remove"></i>' +
										'</button>' +
									"</li>");
 	})

});