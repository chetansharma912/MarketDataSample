

chrome.runtime.onMessage.addListener(function(request,sender,sendReponse){
	if(request.message==="indexes"){
		console.log(request.data);
		chrome.tabs.query({active:true},(tab)=>{
			//console.log(tab,"a");
			chrome.tabs.sendMessage(tab[0].id,{"message":"showdata","data":request.data});
		});
	}
	return true;
	
});



