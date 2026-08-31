

class Rnd{
	constructor (input){
		this.input = input;
		this.rndMap;
		this.serNbr;
		this.altQuestion;
		this.title;
		this.points;
		this.time;
		this.grade;
		this.rnds=[];
		this.init();
		this.gameType;
		this.buf;
		this.question;
	}
	init(){
		this.breakOutData(this.input);
	}

	getTheQuestion() {
		return this.question;
	}

	display(){
		console.log("Display for rnd " + this.serNbr + "  \n " +  this.buf + "\n");
	}

	getGameType(){
		return this.gameType;
	}

	breakOutData(input){console.log("rnd.breakOutData  " +  input);//theRndMenu
		 const arr = input.split(";");
        for(let i = 0 ;i < arr.length;i++){
			this.buf+= i + " " + arr[i] + "\n"
		}
		 this.serNbr = arr[1];
		 this.gameType = this.serNbr.charAt(3);
		 this.grade = arr[3];
		 this.points = arr[4];
		 this.title = arr[5];
		 this.altQuestion = arr[6];
		 this.question = arr[6];
	}
	getAltQuestion(){console.log("rnd.getAltQuestion " );//theRndMenu
		return this.altQuestion;
	}

	getPoints(){
		return this.points;
	}

	getSerNbr(){
		return this.serNbr;
	}

}
