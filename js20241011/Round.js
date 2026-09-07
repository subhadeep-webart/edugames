class Round{
	constructor (inputString){console.log("RR.NEW  " + inputString);
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
		console.log("Round init " + this.inputString);
		if (this.inputString != undefined) {
			this.inputString = deComma(this.inputString);
			console.log("round after decomma  " + this.inputString);
			this.breakOutData(this.inputString)
		}else{
			alert("Sorry!! There was a problem downloading that Round.");
		}
	}

	listTheRound(){
		console.log("ROUND.breakOutData=  " + this.buf)
	}

	getRoundDataArr(){
		return this.roundDataArr
	}

	getTheQuestion(){
		return this.question;
	}


	getGameType(){console.log("getGameType  " +  this.gameType);
		return this.gameType;
	}

	getAParm(str){console.log("round.get Parm  " +  str);
		return this.rndMap.get(str);
	}
	getSerNbr(){console.log("getSerNbr  " );
		return this.serNbr;
	}

	breakOutData(inputString){console.log("ROUND.breakOutData  " +  inputString);
		let xx = inputString.indexOf("|");//Problem with an added | to the end
		console.log(" indexOf( | = " +  xx);
		if(xx > 0){
			inputString	= inputString.replace("|","");
		}
		console.log("AAA.breakOutData  " +  inputString);

		let n = 0
		const llen = inputString.length;
		console.log("llen= " +  llen);

		for(let i = llen-3 ;i > 0;i--){
			//console.log(n + "   --" + inputString.charAt(i) + "--");
			if(inputString.charAt(i) != ","){
				break;
			}
			n++;
		}
		console.log("n= " +  n);

		inputString = inputString.substring(0,llen-n);

		console.log("ZZZ.breakOutData  " +  inputString);

		this.arr = inputString.split(",");

		for(let i = 0 ;i < this.arr.length;i++){
			this.buf+= i + " " + this.arr[i] + "\n"
			 console.log(i + "  *  " +  this.arr[i]);
		}
		this.serNbr = this.arr[1];
		//console.log("this.serNbr  " +  this.serNbr )
		this.gameType = this.serNbr.charAt(3);
		//console.log("this.gameType  " +  this.gameType )
		this.authors = this.arr[11];
		this.title = this.arr[16];
		this.question = this.arr[17];
		this.parms = this.arr[19];
		this.setParms(this.parms)
		this.roundDataArr = this.arr.slice(20);

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