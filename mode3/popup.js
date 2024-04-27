window.onload = ()=>{
	
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.method == "found"){
		  chrome.storage.sync.set({"key":request.key});
			console.log(request.key);
			
			chrome.storage.sync.get("key",function(res) {
				console.log(res[key])
			});
		}
		return true;
	});
	
	
	
	
	
}