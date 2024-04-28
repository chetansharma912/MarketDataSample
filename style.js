function addStyling(){
let styles = 
`
#AdvanceDeclineIndicator {
	position: absolute;
	display: block;
	top: 0px;
	right: 10px;
	background : white;
	z-index: 9999999;
	overflow:auto;
	font-size: 50px;
	border: 5px solid black;
	span {
		padding :20px;
	}
	table {
		margin:0px;
	}
}
#myDivHere{
	position: absolute;
	background-color: black;
	top: 0px;
	z-index: 999999999;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	justify-content: center;
	display: flex;
	align-items: center;
	color:white;
	cursor : pointer;

}
#marketDiv{
	position: absolute;
    border: 1px solid black;
    background-color: white;
    top: 0px !important;
    left: 0px;
    z-index: 999999999;
    width: 700px;
    height: 95%;
    overflow: auto;
    justify-content: center;
    display: flex;
    align-items: center;
	display:none;
	border-radius: 10px;
	table{
		font-size:12px;
		font-weight:700;
		text-align:center;
	}
	.slider{
		display:flex;
		position:relative;
		width:100%;
		height:10px;
	}
	.bars{
		display:inline-block;
		width:50%;
	}
	.tick{
		position:absolute;
		width:2px;
		height:20px;
		background:black;
		bottom: -6px;
	}
	.LC{
		left:0;
		.text{
			bottom: -15px;
			left: 0%;
			position: absolute;
		}
	}
	.UC{
		right:0;
		.text{
			bottom: -15px;
			right: 0%;
			position: absolute;
		}
	}
	.open,.close,.prevClose,.low,.high{
		left:50%;
		.text{
			bottom: -15px;
			right: -10px;
			position: absolute;
			margin: auto;
		}
	}
	.green{
		background:green;
	}
	.red{
		background:red;
	}
	.card{
		font-size: 8px;
		padding: 10px;
		margin: 2px;
		cursor:pointer;
		font-weight:800 !important;
	}
	#stocksrows{
		display:none;
	}
	#stocksrows,#advancedDeclineData{
		justify-content: center;
	}
	#OrderFlow td{
		padding:0px !important;
	}
}


`;
	let myStyleHere = document.createElement("style");
	myStyleHere.innerHTML= styles;
	document.body.appendChild(myStyleHere);
	
	let bootstrapLinkHere = document.createElement("style");
	bootstrapLinkHere.innerHTML = getBootstrap();
	document.body.appendChild(bootstrapLinkHere);
	
}