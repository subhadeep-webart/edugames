// JavaScript source code

class Player{//#P
	//                                                                         constructor (nbr,name,gradeLev,zip,speedFac,color,altColor,capColor){console.log(" new Player  " + name + "   "  + playLev )
	constructor (playerInfo,color,altColor,capColor,nbr){console.log(" new Player  " + playerInfo + "  " + color)
		this.color = color;
		this.altColor = altColor;
		this.capColor = capColor;
		this.nbr = 0 ;
		this.zipCode = ""
		this.score = 0.0;
		this.rndScore = 0.0;
		this.setScore = 0.0;
		this.log = [];
		this.arr = new Array(4);
		this.procPlayerInfo(playerInfo)
	}

	procPlayerInfo(playerInfo){console.log("procPlayerInfo   "  +  " playerInfo=  " + playerInfo )
		const arr = playerInfo.split(";");
		this.nbr = arr[0];
		this.name = arr[1];
		this.zipCode = arr[2];
		this.gradeLev = arr[3];
		this.speedLev = arr[4];
		bidButs.setPlayerSpeedFacs(this.nbr, this.speedLev);
        this.timeForGameLND = bidButs.getTimeForGameLND(this.speedLev);
		//console.log(this.getInfo())
	}


	getInfo(){
		let buf = "";
		buf+= "\n name=     " + this.name;
		buf+= "\n gradeLev= " + this.gradeLev
		buf+= "\n zipCode = " + this.zipCode;
		buf+= "\n color=    " + this.color;
		buf+= "\n altColor=    " + this.altColor;
		buf+= "\n capColor=    " + this.capColor;
		buf+= "\n nbr=      " + this.nbr;
		buf+= "\n speedLev=      " + this.speedLev;
		return buf;
	}

	clearRndScore() {//console.log("P.clearRndScore()  " + this.name);
		this.rndScore = 0;
	}

	addToRndScore(amt) {console.log("$ $P.addToRndScore  " + amt + "    " + this.name);
		const amtX = Number(amt);
		this.rndScore += amtX;
	}

	addToSetScore(amt) {console.log("PPPP.addToSetScore  " + amt + "    " + this.name);
console.log("this.SetScore= " + this.setScore);
		this.setScore += Number(amt);
console.log("this.SetScore= " + this.setScore);
		//this.displayLog()
	}

	getRndScore() {//console.log("PgetRndScore  " + "    " + this.name + "  " + this.rndScore)
		return Number(this.rndScore);
	}

	getSetScore(amt) {//console.log("P.getSetScore  " + "    " + this.name + "   " + this.setScore)
		return Number(this.setScore);
	}

	zeroRndScore() {
		//console.log("P.zeroRndScore  " + "    " + this.name  )
		this.rndScore = 0.0;
	}

	zeroSetScore() {
		//console.log("P.zeroSetScore  " + "    " + this.name )
		this.setScore = 0.0;
	}

	getName(){
		return this.name;
	}

	getScore(){
		return this.score;
	}

	displayLog(){
      console.log("Game Log: " +  this.log );

	}
	
	logScore(score){//serNbrQuestionScore
		this.log.push(serNbrQuestionScore);
	}

	getStatus(){
		const buf = `There `;
	}

	sumScoreToDate(){
		const str = `${this.name} = ${getScore()} `;
		return str;
	}

}
