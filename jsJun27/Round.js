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

		inputString = inputString.substring(0, llen - n);
		console.log("ZZZ.breakOutData  " +  inputString);

		this.arr = inputString.split(",");
		console.log("this.arr= 0 " + this.arr[0]);
		console.log("this.arr= 1 " + this.arr[1]);
		console.log("this.arr= 2 " + this.arr[2]);
		console.log("this.arr= 3 " + this.arr[3]);
		console.log("this.arr= 4 " + this.arr[4]);

		const j1 = this.arr.shift();//Required because an added security header from cgi-bin.
		const j2 = this.arr.shift();




		for(let i = 0 ;i < this.arr.length;i++){
			this.buf+= i + " " + this.arr[i] + "\n"
			 console.log(i + "  *  " +  this.arr[i]);
		}

		serNbrOfRndInPlay = this.arr[0];//Global needed elsewhere
		console.log(" serNbrOfRndInPlay  " + serNbrOfRndInPlay);


		//this.serNbr = this.arr[1];

		console.log("***********serNbrOfRndInPlay  " + serNbrOfRndInPlay)
		this.gameType = serNbrOfRndInPlay.charAt(3);
		console.log("***********his.gameType  " + this.gameType )
		//if(deBug)console.log("this.gameType  " +  this.gameType )
		this.authors = this.arr[10];
		this.title = this.arr[15];
		this.question = this.arr[16];
		this.parms = this.arr[18];
		this.setParms(this.parms)
		this.roundDataArr = this.arr.slice(19);
		console.log("XXXROUND.breakOutData Bottom \n" + this.roundDataArr );
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