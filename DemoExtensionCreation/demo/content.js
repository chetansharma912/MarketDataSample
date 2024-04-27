

let count=0;
setInterval(()=>{
	count++;
	console.log(count);
	
	chrome.runtime.sendMessage({method: "found", key: count}, function(response) {
	  console.log(response.data);
	});
	
	
	
},1000);