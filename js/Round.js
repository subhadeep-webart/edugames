class Round{
	constructor(inputString) {//console.log("Round.NEW  " + inputString);//serNbrOfRndInPlay
		this.inputString = inputString;
		this.serNbr;
		this.rndMap;
		this.rndArr=[];
		this.codes;
		this.authors;
		this.gameType;
		this.roundDataArr;
		this.authors;
		this.title;
		this.question;
		this.parms;
		this.buf;
		this.init();
	}

	init() {
		//console.log("Round init " + this.inputString);
		if (this.inputString != undefined) {
			this.inputString = deComma(this.inputString);
			this.breakOutData(this.inputString);
		}else{
			alert("Sorry!! There was a problem downloading that Round.");
		}
	}

	getInput() {
        return this.inputString;
	}

	listTheRound(){
		console.log("ROUND.breakOutData=  " + this.buf)//Created in breakout
	}

	getRoundDataArr(){
		return this.roundDataArr
	}
	getPointsForThisRound(){
		return 100;//This is to be modified later

	}

	getTheQuestion() {//console.log("round.getTheQuestion()  " );
		return this.question;
	}


	getGameType(){//console.log("getGameType  " +  this.gameType);
		return this.gameType;
	}

	getAParm(str){//console.log("round.get Parm  " +  str);
		return this.rndMap.get(str);
	}
	getSerNbr(){console.log("getSerNbr  " );
		return this.serNbr;
	}

	breakOutData(inputString){console.log("XXXROUND.breakOutData top " +  inputString);
		const deBug = true;
		let xx = inputString.indexOf("|");//Problem with an added | to the end
		//console.log(" indexOf( | = " +  xx);
		if(xx > 0){
			inputString	= inputString.replace("|","");
		}
		//console.log("AAA.breakOutData middleA " +  inputString);

		let n = 0
		const llen = inputString.length;
		//if(deBug)console.log("llen= " +  llen);

		for(let i = llen-3 ;i > 0;i--){
			//console.log(n + "   --" + inputString.charAt(i) + "--");
			if(inputString.charAt(i) != ","){
				break;
			}
			n++;
		}

		inputString = inputString.substring(0,llen-n);

		//if(deBug)console.log("ZZZ.breakOutData  " +  inputString);

		this.arr = inputString.split(",");

		
		this.arr.shift();//Remove the first element
        //this.arr.shift();//Remove the second element

		serNbrOfRndInPlay = this.arr[1];//Global needed elsewhere

		for(let i = 0 ;i < this.arr.length;i++){
			this.buf+= i + " " + this.arr[i] + "\n"
			 //if(deBug)console.log(i + "  *  " +  this.arr[i]);
		}
		//this.serNbr = this.arr[1];

		console.log("***********serNbrOfRndInPlay  " + serNbrOfRndInPlay)
		this.gameType = serNbrOfRndInPlay.charAt(3);
		console.log("***********his.gameType  " + this.gameType )
		//if(deBug)console.log("this.gameType  " +  this.gameType )
		this.authors = this.arr[11];
		this.title = this.arr[16];
		this.question = this.arr[17];
		this.parms = this.arr[19];
		this.setParms(this.parms)
		this.roundDataArr = this.arr.slice(20);
		//console.log("XXXROUND.breakOutData Bottom " );
	}

	setParms(parms){console.log("round.set.Parm  " +  parms);
		this.rndMap = new Map();
		let x = "";let y =""
		const parmArr = parms.split(" ");
        for(let i = 0 ;i < parmArr.length;i++){
			[x,y] = parmArr[i].split("=");
			 //console.log(x + "   ^^  " +  y)
			this.rndMap.set(x,y);
		}
	}
}