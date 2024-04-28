
window.onload = ()=>{
	if(window.location.href.includes("zerodha")){
		
		
		let myInterval ;
		let priceChangeTypeCloseAll,cnt ;
		
		FindListing();
		
		function FindListing(){
			let listing = document.querySelectorAll('.list-flat li');
			if(listing.length>1){
				listing.forEach((item)=>{
					item.addEventListener('click',(e)=>{
						clearInterval(myInterval);
						findListNumber();
					});
				});
				// STEP 1
				findListNumber();
				addStyling();
				// addMovableDiv();
				addMarketDiv();
				document.body.style.overflow = "none";
			}
			else {
				setTimeout(FindListing,10);
			}

		}
		
		function findListNumber(){
			let listItem = document.querySelector(".item.selected");
			if(listItem!=null){
				// STEP 2
				checkohlc();
			} else {
				setTimeout(findListNumber,10);
			}
		}
		
		// STEP 3
		function checkohlc(){
			priceChangeTypeCloseAll = document.querySelectorAll(".price-change-type-close-all");
			// console.log(priceChangeTypeCloseAll);
			if(priceChangeTypeCloseAll.length==0){
				setTimeout(()=>{
					checkohlc();
				},10);
			}
			else{
				console.log(" Found length priceChangeTypeCloseAll",priceChangeTypeCloseAll.length);
				// STEP 4
				sleep();
			}
		}
		
		// STEP 5
		function sleep(){
			if(priceChangeTypeCloseAll.length){
				let cntOHCL = 0;
				
				// STEP 6
				openOneByOne();
				function openOneByOne(){
					let item = priceChangeTypeCloseAll[cntOHCL];
					item.dispatchEvent(new MouseEvent('mouseenter',{'view':window,'bubbles':true,'cancelabel':true}));
					console.log("Here are the hover buttons on site ", item);
					
					// STEP 7
					findbutton();
					function findbutton(){
						let buttonOutline  = item.parentElement.querySelector(".button-outline");
						if(buttonOutline){
							if(cntOHCL==priceChangeTypeCloseAll.length-1){
								item.parentElement.querySelector(".button-outline").click();
								console.log("Done Opening all market depths");
								
								// STEP 8
								doIt();
							}
							else {
								console.log(buttonOutline,cntOHCL,priceChangeTypeCloseAll.length-1);
								item.parentElement.querySelector(".button-outline").click();
								cntOHCL++;
								openOneByOne();
							}
						}
						else {
							setTimeout(findbutton,10);
						}
					}
				}
			}
		}
		
		// STEP 9
		function doIt(){
			myInterval =  setInterval(()=>{
				fetchIndices();
				/* console.log("fetch "); */
			},1000); 
		}
		
		
	}
}

function fetchIndices(){
	console.log("fetch 2");
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
	
	if(stocks!=null){
		if(stocks){
			stocks.forEach((index,i)=>{
				if(index!=null){
					let Index = index.querySelector(".symbol").innerText;
					let Value = index.querySelector(".last-price").innerText;
					let priceabsolute = index.querySelector(".dim .price-absolute").innerText;
					let pricepercentage = index.querySelector(".dim .price-percentage").innerText;
					let openToday = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(1) .value:nth-child(1)");
					let high = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(1) .value:nth-child(2)");
					let low = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(2) .value:nth-child(1)");
					let prevClose = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(2) .value:nth-child(2)");
				
					
					let volume = index.parentElement.querySelector(".market-depth .ohlc .row:nth-child(3) .value");
					//if(buy!=null && sell!=null){
						texts.push({
							"form":"stock",
							"index":Index.trim(),
							"value":Value.trim(),
							"absoluteprice":priceabsolute.trim(),
							"percent":pricepercentage.replaceAll(/[()%]/g," ").trim(),
							"volume" : parseInt(volume.innerText.replaceAll(/[,]/g,"").trim())
						});
					//}
				}
			}); 
		}
	}
	
	/* console.log("Populate data",texts[0].value); */
	
	populateDataOnPage(texts);
	
}

let countTime = 0,prevVolume=0,changeInVolume=0, nf_three = 0,nb_three=0;;
function populateDataOnPage(data){
	
	let indexes = data.slice(0,2);
	let stocks = data.slice(2);
	
	let indexesData= "";
	let stocksData= "";
	let advancedDeclineData= "";
	let advanced = [];
	let decline = [];
	let silent = [];
	
	let buyAll = 0, bullish=0, sellAll = 0, bearish=0, neutral=0;
	
	let volume = 0;
	
	indexes.forEach((item)=>{
		let color = getColor(item.percent);
		
		if(item.form=="index"){
			indexesData +=` <tr style="font-weight: 700;background-color:${color};" id="${item.index.replaceAll(" ","")}">
								<td>${item.index}</td>
								<td id="value">${item.value}</td>
								<td>${item.percent}%</td>
								<td>${item.absoluteprice}</td>
							<tr> `;
		}
		
	});
	
	stocks.forEach((item)=>{
		let color = getColor(item.percent);
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
		}
	});
	
	advanced = mergeSort(advanced);
	decline = mergeSort(decline);
	
	let sorted = [...advanced,...silent,...decline.reverse()];
	
	sorted.forEach((item)=>{
		let color = getColor(item.percent);
		
		let sp = (item.buy-item.sell)<0?"bg-danger":"bg-success";
		volume+=item.volume;
		
							
								
		advancedDeclineData +=` <div title="${item.percent}%" style="font-weight: 700;background-color:${color};" class="text-center card col-md-2">
									${(item.index.substring(0,6))}
									<br>${item.value}
									<br>${item.absoluteprice} (${item.percent}%)
								</div>` ;
	});
	
	/* console.log("Advance Decline",advanced.length); */
	document.querySelector("#advanced").innerHTML = advanced.length;
	document.querySelector("#decline").innerHTML = decline.length;
	
	
}






















