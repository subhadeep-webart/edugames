// JavaScript source code

class PlayerLineUp{
	constructor (cp){
		this.cp = cp;
		this.players = [];
		this.color = ["blue","red","purple","green"];//blue= BFC4FF, red =FF7B80 green= A9FFA9 purple = FF00FF
		this.altColor = ["SkyBlue","Salmon","Violet","Lime"];
		this.HTMLColor = ["Blue","Red","Purple","Green"];//for the HTML
		this.pNbr = 0;
		this.colorMap;
		this.firstPlayerNbr =0;
		this.playerTF;
		this.pLtr =[]
		this.pNameL;
		this.pNameR;
		this.pMax = 0;////	           console.log("  "  );  Salmon Orange Magenta Lime SkyBlue		
		this.rndPlusScore = [];
		this.rndNegScore = [];
		this.setPlusScore = [];
		this.setNegScore = [];
		this.setScore =[];

	}

	setPlayerNames(regData){console.log("setPlayerNames.  " +  regData.length  + "   " + regData)
		//const regData = data.split(",");
		const playerLeft = new Player(regData[0],regData[4],regData[2],"blue","SkyBlue","Blue","0");
		const playerRight = new Player(regData[1],regData[5],regData[3],"red","Salmon","Red","1");
		this.players.push(playerLeft);
		this.players.push(playerRight);
		console.log("p 0  " +  this.players[0].getInfo());
		console.log("p 1  " +  this.players[1].getInfo());

	}



	init(){
		console.log("PlayerLineUp init() "  );//this.parmMap.set(twoParts[0],twoParts[1]);
		this.playerTF = document.getElementById("playerName");//this.players
	}

	helloWorld(){console.log("Interface.helloWorld" );
		
		//this.testA();
	}

	 mapData(startData){console.log("sp.startSet()  " +  mapData);
		 let temp = null;
		 let setSerNbr = null;
		 const arr = startData.split(",");
		 [temp,setSerNbr] = arr.shift().split("="); 
        for(let i = 0 ;i < arr.length;i++){
            const x = arr.shift().split("=");
			this.x[0] = x[1];
        }
    }


	getPlayerArr(){console.log("plu getPlayerArr" );
		return [this.pNameL,this.pNameR];
	}

	createDisplayLine(){
		for(let i = 0 ;i < pCnt;i++){

		}
	}

	getWinner(){console.log("plu getTotals  " +  this.players[0].score + "   " + this.players[1].score);
		let buf = "The winner of this Set is "
		const score0 = this.players[0].getSetScore();
		const score1 = this.players[1].getSetScore();
		if(score0 > score1){
			buf+= this.players[0].name + " with a score of " + score0 + " and the looser is " + this.players[1].name ;
			buf+= " with a score of " + score1;
		}else{
			buf+= this.players[1].name + " with a score of " + score1 +  " and the looser is " + this.players[0].name ;
 			buf+= " with a score of " + score0;
		}
		console.log("buf= " + buf);
		return buf;
	}



	addToScore(pNbr,n){console.log("plu addToRndScore  "  + pNbr + "   " + n);
		this.players[pNbr].addToRndScore(n);
		this.players[pNbr].addToSetScore(n);
		if(n > 0){
			this.rndPlusScore[pNbr]+= Number(n) ;

		}else{
			this.rndNegScore[pNbr]+= Number(n);

		}
	}

	addRndScoreToSet(){console.log("plu.addRndScoreToSet"  );
		const arr = [];
		arr.push(this.rndPlusScore[0])
		arr.push(this.rndNegScore[0])
		arr.push(this.rndPlusScore[1])
		arr.push(this.rndNegScore[1])
		this.setScore.push(arr);		
	}

	 zeroRndScores(){console.log("plu.zeroRndScores" );
		this.rndPlusScore[0] = 0;
		this.rndPlusScore[1] = 0;
		this.rndNegScore[0] = 0;
		this.rndNegScore[1] = 0;
    }

	 zeroSetScores(){console.log("Interface.zeroSetScores" );
		this.setScore = [];
     }

	 readOutRndScore(){console.log("plu.readOutRndScore" );
		let buf = "Player   Points WON   Points LOST  On this Round. \n";
		buf+=       "Blue         " + this.rndPlusScore[0] + "              " + this.rndNegScore[0] + "\n";
		buf+=       "Red          " + this.rndPlusScore[1] + "              " + this.rndNegScore[1] + "\n";
		console.log("buf  \n" +  buf);
	 }

	evalMutiPlayers(scoreArray,maxPossible){console.log("PLU.evalMutiPlayers  "   + scoreArray);
		const pCnt = scoreArray.length;
		let max = -1;
		let min = 9999;
		let pNbr =0;
		let score= 0;
		let pHiNbr = 0;
		let pLoNbr = 0;
		let tyeCnt = 0;
		const returnArr=[];
		const playerArr =[];
		let bufPlayerScores = "";
		for(let i = 0 ;i < pCnt;i++){
			//[pNbr,score] = scoreArray[i].split(";")
			score =scoreArray[i];
			playerArr.push(this.players[i].name + ":" + score);
			bufPlayerScores+= this.players[i].name + ":" + score + "\n"
			if(score > max){
				max = score;
				pHiNbr = pNbr;
			}
			if(score < min){
				min = score;
				pLoNbr = pNbr;
			}
		}
		//now to determin a tye
		const tyeArray = [];
		for(let i = 0 ;i < pCnt;i++){
			score = scoreArray[i];
			if(score == max){
            console.log(score + " S|||M " +  max);
				tyeArray.push(this.players[i].name);//	           console.log("  "  );
				tyeCnt++;
			}
		}
		let buf = ""
		console.log("tyeCnt  " +tyeCnt );
		if(tyeCnt == 2){
			buf+= "There was a tye between " + tyeArray[0] + " and " + tyeArray[1] +".";
		}else if(tyeCnt == 3){
			buf+= "There was a three way tye between " + tyeArray[0] + " and " + tyeArray[1] + " and " + tyeArray[2]  +".";
		}else if(tyeCnt == 4){
			buf+= "There was a four way tye.";
		}else{
			buf+= "The winner is " + tyeArray[0] + " with " +  max + " correct out of " + maxPossible + ". ";
		}
		if(tyeCnt > 1){
			buf+= "\nEach got " +  max + " right out of " + maxPossible + "."
		}


		returnArr.push(buf);;
		returnArr.push(bufPlayerScores);
		returnArr.push("MaxPossible:" + maxPossible + ",maxRight:" + max + ",minRight:" + min);

		console.log("max=   " + max + "  min= " +  min + " pHiNbr= " + pHiNbr + "  pLoNbr= " + pLoNbr + " tyeCnt= " + tyeCnt  + " winners=   " + tyeArray);  
		return returnArr;
	}
	getHTMLColor(pNbr){console.log("getHTMLColor= ")
		if(pNbr == null)pNbr = this.pNbr;
		return this.HTMLColor[pNbr];
	}

	setFirstPlayer(n){
		this.pNbr = n;
	}

	setPlayerDisplay(n){console.log("  "  );
		if(n == null)n = this.pNbr;
		this.playerTF.value = this.players[n].name;
		this.playerTF.style.backgroundColor = this.players[n].altColor;
	}

	resetNextPlayers(){
		this.players = [];
		this.pNbr = 0;
		this.pMax = 0;////	           console.log("  "  );
	}
	
	
	getInfo(){     console.log("plu.getInfo()  " + this.players.length);
		let buf = "";
		for(let i = 0 ;i < this.pMax;i++){
          console.log("this.players[i]  " + this.players[i].name);
			buf += this.players[i].getInfo();
			buf += "\n\n";
		}
		return buf;//        console.log("plu  = " + );
	}

	getPlayerByNbr(nbr){
		this.pNbr = nbr;
		return this.players[nbr];
	}


	//We dont't always start with the first player
	setFirstPlayerNbr(nbr){       console.log("plu setFirstPlayerNbr = " + nbr);
		this.firstPlayerNbr = nbr;//It could be player 2
		this.pNbr = nbr;
	}

//&&&&
	getNextPlayer(){console.log("AAplu getNextPlayer= "+  "  this.pNbr=  " + this.pNbr + " this.pMax = " + this.pMax);
		if(this.pMax == 1){
			return this.players[0]
		}else{
			this.pNbr++;
			if(this.pNbr == this.pMax){
				this.pNbr = 0;//We go around the loop
			}
			return this.players[this.pNbr];//		console.log("  " + )

		}
	}


	
	isLastPlayer(){
		console.log("plu.isLastPlayer pNbr= " + this.pNbr + " pMax= " + this.pMax)
		if(this.pNbr >= this.pMax){
			return true;
		}else{
			return false;
		}
	}




//                      console.log(" ")

	registerPlayer(dataCSV){console.log("|-|plu.registerPlayer.  " +  dataCSV)
			
			const pArr = dataCSV.split(",")
			pArr.push(this.color[this.pMax]);
			pArr.push(this.altColor[this.pMax]);
			pArr.push(this.HTMLColor[this.pMax])
			console.log("plu.registerPlayer=   " + pArr)
			

			const aPlayer = new Player(pArr);
			this.players.push(aPlayer);
			if(this.pLtr.length == 0){
				this.pNameL = aPlayer.name;
				this.pLtr.push("L")
			}else{
				this.pNameR = aPlayer.name;
				this.pLtr.push("R")
			}

			this.pMax++;
			console.log("this.pMax= " + this.pMax)
			//this.listPlayers()

	}


	listPlayers(){console.log("listPlayers  "  + this.pMax);
		let buf = "List of Players:\n";
		for(let i = 0 ;i < this.pMax;i++){
			buf+= this.players[i].getInfo() + "\n"
		}
         console.log(" " + buf );
	}
	
	
	changePlayer(){
		this.pNbr++;
		if(this.pNbr >this.pMax)this.pNbr = 0; 

	}


	setPNbr(n){
		this.pNbr = n;
	}

	getPlayerUpName(){
		const player= this.players[this.pNbr].name;
	}

	addToPlayerScore(pNbr,points){
		this.players[pNbr].addToScore(Number(points));
	}



	logPlayerScore(pNbr,score){
		this.players[pNbr].logScore(score);

	}

	getPlayerScore(n){
		return this.players[n].score;
	}


	setNextPlayerDisplay(){

	}

	getStatusLine(){
		const nbrOfPlayers = playerArray.length;
		const buf = `The game being played serNbr is ${this.gameSerNbr}.  There are ${nbrOfPlayers} players with scores as follows:`;
		for(let i = 0 ;i < nbrOfPlayers;i++){
			buf+= playerArray[i].getStatus();//          console.log(" = " + );
		}
		return buf;
	}

}
