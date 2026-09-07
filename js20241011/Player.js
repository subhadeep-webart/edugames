// JavaScript source code

class Player{//#P
	constructor (name,gradeLev,zip ,color,altColor,capColor,nbr){console.log(" new Player  " + name)
		this.name =name;
		this.gradeLev = gradeLev;
		this.zip = zip;
		this.color = color;
		this.altColor = altColor;
		this.capColor = capColor;
		this.nbr = nbr ;
		this.score = 0.0;
		this.rndScore = 0.0;
		this.setScore = 0.0;
		this.log = [];
	}

	getInfo(){
		let buf = "";
		buf+= "\n name=     " + this.name;
		buf+= "\n gradeLev= " + this.gradeLev
		buf+= "\n zip=      " + this.zip;
		buf+= "\n color=    " + this.color;
		buf+= "\n altColor=    " + this.altColor;
		buf+= "\n capColor=    " + this.capColor;
		buf+= "\n nbr=      " + this.nbr;
		return buf;
	}

	addToRndScore(amt) {
		//console.log("addToRndScore  " + amt + "    " + this.name)
		const amtX = Number(amt);
		this.rndScore += amtX;
	}

	addToSetScore(amt) {
		//console.log("addToSetScore  " + amt + "    " + this.name )
		this.setScore+=Number(amt);
	}

	getRndScore(amt) {
		//console.log("getRndScore  " + "    " + this.name )
		return Number(this.rndScore);
	}

	getSetScore(amt) {
		//console.log("getSetScore  " + "    " + this.name )
		return Number(this.setScore);
	}

	zeroRndScore() {
		//console.log("zeroRndScore  " + "    " + this.name )
		this.rndScore = 0.0;
	}

	zeroSetScore() {
		//console.log("zeroSetScore  " + "    " + this.name )
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
