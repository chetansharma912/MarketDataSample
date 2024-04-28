/* function addMovableDiv(){
	let isDisplay = false;
	let myDivHere = document.createElement("div");
	myDivHere.innerHTML="MS";
	myDivHere.id="myDivHere";
	myDivHere.addEventListener("click",()=>{
		isDisplay = !isDisplay;
		if(isDisplay){
			document.getElementById("marketDiv").style.display = "block";
		}
		else{
			document.getElementById("marketDiv").style.display = "none";
		}
	});
	document.body.appendChild(myDivHere);
} */

function addMarketDiv(){
let datax = `
<div class="container" style="width: 100%;">
	<div class="row">
		<div id="OrderFlow" class="col-md-5"></div>
		<div class="col-md-7">
			<div class="row">
				<div class="col-md-12">
					<table class="table table-bordered">
						<thead>
							<tr>
								<td>Index</td>
								<td>Value</td>
								<td>Perentage</td>
								<td>Change</td>
							</tr>
						</thead>
						<tbody id="indexrows">
							
						</tbody>
					</table>
					
					<table class="table table-bordered">
						<thead>
							<tr>
								<td>Change in Nifty</td>
								<td>Change in NiftyBank</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="text-center">
									<span id="changeInNifty">xxx</span>
								</td>
								<td class="text-center">
									<span id="changeInNiftyBank">xxx</span>
								</td>
							</tr>
						</tbody>
					</table>
					
					<table class="table table-bordered">
						<thead>
							<tr>
								<td class="">Advance</td>
								<td class="">Decline</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="text-center text-success">
									<span id="advanced">xxx</span>
								</td>
								<td class="text-center text-danger">
									<span id="decline">xxx</span>
								</td>
							</tr>
							<tr>
								<th>Bullish</th>
								<th>Bearish</th>
							</tr>
							
							<tr>
								<td class="text-center">
									<span id="bullish">xxx</span>
								</td>
								</td>
								<td class="text-center">
									<span id="bearish">xxx</span>
								</td>
							</tr>
						</tbody>
					</table>
					
					<!-- <table class="table table-bordered">
						<tr>
							<th>Buyers</th>
							<th>Pending</th>
							<th>Sellers</th>
						</tr>
						
						<tr>
							<td class="text-center ">
								<span id="buy">xxx</span>
							</td>
							<td class="text-center">
								<span id="pending">xxx</span>
							</td>
							<td class="text-center">
								<span id="sell">xxx</span>
							</td>
						</tr>
						
						
					</table> -->
				</div>
					
				<div class="col-md-6">
					
					
					<!-- <table class="table table-bordered">
						<thead>
							<tr>
								<th>Volume</th>
								<th>Change</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="text-center">
									<span id="volume">xxx</span>
								</td>
								<td class="text-center">
									<span id="change">xxx</span>
								</td>
							</tr>
						</tbody>
					</table> -->
				</div>
				
				<div id="stocksrows" class="row">
					
				</div>
				
				<div id="advancedDeclineData" class="row">
					
				</div>
				
				<div class="buySellBar">
					
				</div>
			</div>
		</div>
		
	</div>
</div>


`;
	
	
	
	/* let myDivHere = document.createElement("div");
	myDivHere.innerHTML= datax;
	myDivHere.id="marketDiv";
	document.body.appendChild(myDivHere);
	 */
	
	
	let AdvanceDecline = document.createElement("div");
	AdvanceDecline.innerHTML= `
		<table class="table table-bordered">
			<tbody>
				<tr>
					<td class="text-center text-success">
						<span id="advanced">xxx</span>
					</td>
					<td class="text-center text-danger">
						<span id="decline">xxx</span>
					</td>
				</tr>
			</tbody>
		</table>
	`;
	AdvanceDecline.id="AdvanceDeclineIndicator";
	document.body.appendChild(AdvanceDecline);
}