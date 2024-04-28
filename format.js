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