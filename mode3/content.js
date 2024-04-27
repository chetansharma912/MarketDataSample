
window.onload = ()=>{
	if(window.location.href.includes("zerodha")){
		let priceChangeTypeCloseAll,cnt ;
		findListNumber();
		
		function findListNumber(){
			let listItem = document.querySelector(".item.selected");
			if(listItem!=null){
				if(listItem.innerText=="2"){
					// console.log("2");
					checkohlc("2"); // nifty loaded here
				}
				else if(listItem.innerText=="1"){
					console.log("other tabs"); // bank nifty loaded here
					checkohlc("1"); 
				}
			} else {
				setTimeout(findListNumber,100);
			}
		}
		
		
		function checkohlc(indexing){
			priceChangeTypeCloseAll = document.querySelectorAll(".price-change-type-close-all");
			if(indexing=="2"){
				if(priceChangeTypeCloseAll.length!=50){
					setTimeout(()=>{
						checkohlc(indexing);
					},10);
				}
				else{
					console.log("Nifty Found length priceChangeTypeCloseAll",priceChangeTypeCloseAll.length);
					cnt=0;
					sleep();
				}
			}else if(indexing=="1"){
				if(priceChangeTypeCloseAll.length!=12){
					setTimeout(()=>{
						checkohlc(indexing);
					},10);
				}
				else{
					console.log("Bank nifty Found length priceChangeTypeCloseAll",priceChangeTypeCloseAll.length);
					cnt=0;
					sleep();
				}
			}
		}
		
		function sleep(){
			if(cnt<priceChangeTypeCloseAll.length){
				priceChangeTypeCloseAll[cnt].dispatchEvent(new MouseEvent('mouseenter',{'view':window,'bubbles':true,'cancelabel':true}));
				
				if(priceChangeTypeCloseAll[cnt].parentElement.querySelector(".button-outline")){
					priceChangeTypeCloseAll[cnt].parentElement.querySelector(".button-outline").click();
					if(cnt<priceChangeTypeCloseAll.length){
						cnt++;
						setTimeout(sleep,10);
					}
				}
				else{
					if(cnt<priceChangeTypeCloseAll.length){
						setTimeout(sleep,10);	
					}
					
				}
			}
			if(cnt>=priceChangeTypeCloseAll.length){
				console.log("Opening all market depth and started fetching data",cnt,priceChangeTypeCloseAll.length);
				fetchData();
			}
		}
	}
}


if(window.location.href.includes("data")){
		chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
			if(request.message=="showdata"){
				populateDataOnPage(request.data);
			}
			return true;
		});
}


function fetchData(){
	fetchIndices();
	setTimeout( fetchData ,10);
}



function fetchIndices(){
	let indexes = document.querySelectorAll(".header .instrument-widget");
	
	let texts = [];
	
	if(indexes!=null){
		if(indexes.length){
			indexes.forEach((index)=>{
				if(index!=null){
					let Index = index.querySelector(".tradingsymbol").innerText;
					let Value = index.querySelector(".last-price").innerText;
					let allx = (index.querySelector(".all").innerText).split(" ");
					
				texts.push({
						"form":"index",
						"index":Index.trim(),
						"value":Value.trim(),
						"absoluteprice":allx[0].trim(),
						"percent":allx[1].replaceAll(/[()%]/g," ").trim()
					});
				}
			}); 
		}
	}
	
	
	let stocks = document.querySelectorAll(".instruments .price-change-type-close-all");
	let marketDepth = document.querySelectorAll(".instruments .market-depth");
	
	if(stocks!=null && marketDepth!=null){
		if(stocks && marketDepth){
			stocks.forEach((index,i)=>{
				if(index!=null && marketDepth[i]!=null){
					let Index = index.querySelector(".symbol").innerText;
					let Value = index.querySelector(".last-price").innerText;
					let priceabsolute = index.querySelector(".dim .price-absolute").innerText;
					let pricepercentage = index.querySelector(".dim .price-percentage").innerText;
					let buy = index.parentElement.querySelector(".market-depth .depth-table .buy tfoot .text-right");
					let sell = index.parentElement.querySelector(".market-depth .depth-table .sell tfoot .text-right");
					let openToday = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(1) .value:nth-child(1)");
					let high = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(1) .value:nth-child(2)");
					let low = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(2) .value:nth-child(1)");
					let prevClose = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(2) .value:nth-child(2)");
					
					
					let volume = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(3) .value");
					if(buy!=null && sell!=null){
						texts.push({
							"form":"stock",
							"index":Index.trim(),
							"value":Value.trim(),
							"absoluteprice":priceabsolute.trim(),
							"percent":pricepercentage.replaceAll(/[()%]/g," ").trim(),
							"buy" : parseInt(buy.innerText.replaceAll(/[,]/g,"").trim()),
							"sell": parseInt(sell.innerText.replaceAll(/[,]/g,"").trim()),
							"volume" : parseInt(volume.innerText.replaceAll(/[,]/g,"").trim())
						});
					}
				}
			}); 
		}
	}
	
	chrome.runtime.sendMessage({"message":"indexes","data":texts},(response)=>{
		//console.log("data sent");
	});
	
}




let countTime = 0,prevVolume=0,changeInVolume=0;
function populateDataOnPage(data){
	// console.log(data);
	let indexes = data.slice(0,2);
	let stocks = data.slice(2);
	//console.log(stocks);
	//stocks = mergeSort(stocks);
	//console.log(stocks);
	
	let indexesData= "";
	let stocksData= "";
	let advancedDeclineData= "";
	let advanced = [];
	let decline = [];
	let silent = [];
	
	let buyAll = 0, bullish=0, sellAll = 0, bearish=0, neutral=0;
	
	let volume = 0;
	
	indexes.forEach((item)=>{
		// item.percent = Math.ceil((Math.random()*3)*(parseInt((Math.random()*10))>5?1:-1));
		let color = getColor(item.percent);
		
		if(item.form=="index"){
			indexesData +=` <tr style="font-weight: 700;background-color:${color};" id="${item.index.replaceAll(" ","")}"><td>${item.index}</td><td id="value">${item.value}</td><td>${item.percent}%</td><td>${item.absoluteprice}</td><tr> `;
		}
		
	});
	
	stocks.forEach((item)=>{
		// item.percent = Math.ceil((Math.random()*3)*(parseInt((Math.random()*10))>5?1:-1));
		let color = getColor(item.percent);
		// console.log(item.percent);
		if(item.form=="stock"){
			if(item.absoluteprice<0){
				decline.push(item);
			}
			if(item.absoluteprice>0){
				advanced.push(item);
			}
			if(item.absoluteprice==0){
				silent.push(item);
			}
			let color = getColor(item.percent);
			let sp = (item.buy-item.sell)<0?"bg-danger":"bg-success";
			volume+=item.volume;

			stocksData +=` <div style="font-weight: 700;background-color:${color};" class="text-center card col-md-1">
									${item.index}
									<br>${item.value}
									<br>${item.absoluteprice} (${item.percent}%)
									<span style="display:none;">Buy Orders : ${item.buy} - Sell Orders${item.sell}</span>
									<span class="${sp}">${item.buy-item.sell}</span>
									<span class="${sp}">${item.volume}</span>
								</div> `;
			buyAll += item.buy;
			sellAll += item.sell;
			
			if((item.buy-item.sell)>0){
				bullish++;
			}
			else if((item.buy-item.sell)<0){
				bearish++;
			}
			else{
				neutral++;
			}
			//console.log(item.index,);
		}
	});
	
	advanced = mergeSort(advanced);
	decline = mergeSort(decline);
	//console.log(buyAll,sellAll);
	
	let sorted = [...advanced,...silent,...decline.reverse()];
	
	sorted.forEach((item)=>{
		let color = getColor(item.percent);
		
		let sp = (item.buy-item.sell)<0?"bg-danger":"bg-success";
		volume+=item.volume;
		
		advancedDeclineData +=` <div style="font-weight: 700;background-color:${color};" class="text-center card col-md-1">
									${item.index}
									<br>${item.value}
									<br>${item.absoluteprice} (${item.percent}%)
									<span style="display:none;">Buy Orders : ${item.buy} - Sell Orders${item.sell}</span>
									<span class="${sp}" style="border:1px solid black">${item.buy-item.sell}
									<br>
									${item.volume}</span>
								</div> `;
	});
	
	document.querySelector("#indexrows").innerHTML = indexesData;
	document.querySelector("#stocksrows").innerHTML = stocksData;
	document.querySelector("#advancedDeclineData").innerHTML = advancedDeclineData;
	document.querySelector("#advanced").innerHTML = advanced.length;
	document.querySelector("#decline").innerHTML = decline.length;
	countTime++;
	if(countTime>=10){
		changeInVolume = volume-prevVolume;
		prevVolume=volume;
		countTime=0;
	}
	
	// console.log(countTime);
	document.querySelector("#silent").innerHTML = silent.length;
	document.querySelector("#buy").innerHTML = formatNumbers(buyAll);
	
	document.querySelector("#bullish").innerHTML = bullish;
	document.querySelector("#bearish").innerHTML = bearish;
	document.querySelector("#neutral").innerHTML = neutral;
	
	document.querySelector("#sell").innerHTML = formatNumbers(sellAll);
	document.querySelector("#pending").innerHTML = formatNumbers(buyAll-sellAll);
	document.querySelector("#volume").innerHTML = formatNumbers(volume);
	document.querySelector("#change").innerHTML = formatNumbers(changeInVolume)+" ("+countTime+")";
	
}

function formatNumbers(number){
	let stringX = number.toString();
	return stringX.substring(0,stringX.length-3).replace(/\B(?=(\d{2})+(?!\d))/g,",")+","+stringX.substring(stringX.length-3);
}

function getColor(per){
	let color = "";
	if(per<0){			
		if(per<-3){
			color = "#ab0000";
		}
		else if(per<-2){
			color = "#df0000";
		}
		else if(per<-1){
			color = "#ff4848";
		}
		else if(per<-0.5){
			color = "#ff9191"
		}
		else if(per<-0.2){
			color = "#ffe8e8"
		}
		else if(per<-0.1){
			color = "#f7f6f6"
		}
		else{
			color = "white"
		}
	}
	else if(per>0){
		if(per>3){
			color = "#006b00";
		}
		else if(per>2){
			color = "#008000";
		}
		else if(per>1){
			color = "#00cf00";
		}
		else if(per>0.5){
			color = "#98ff98"
		}
		else if(per>0.2){
			color = "#d9ffd9"
		}
		else if(per>0.1){
			color = "#f3fff3"
		}
		else{
			color = "white"
		}
	}
	else{
		color = "white"
	}
	return color;
}

function mergeSort(arr){
	if(arr.length<=1){
		return arr;
	}
	
	let mid = Math.floor(arr.length/2);
	let left = mergeSort(arr.slice(0,mid));
	let right = mergeSort(arr.slice(mid));
	
	return merge(left,right);
}


function merge(left,right){
	let sorted = [];
	while(left.length && right.length){
		if(left[0].percent>right[0].percent){
			sorted.push(left.shift());
		}
		else{
			sorted.push(right.shift());
		}
	}
	return [...sorted,...left,...right];
}
















