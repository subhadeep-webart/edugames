// JavaScript source code

class Settings{
	constructor (){//console.log("Settings "  );
	 this.speed = 5;
	 this.speedMap;
	 this.colFacMap;
	 this.txtSizeMap;
	 this.playerSpeed = [];
	 this.maxPoints = 100.0;
	 this.p0Time = [];
	 this.p1Time = [];
	this.ptArr = []
	this.init();
	}

	init() {
		//this.createSpeedMap();
		//this.createRowFacMap();
		this.createTxtSizeMap();
		//this.createColFacMap();
	}

	deletePtTblXX(){console.log("Setting  deletePtTbl " );
		const el = document.getElementById("ptTbl");
		if(el != null){
			el.remove();
		}
	}


	//Note: This will be upgraded in time



	setPlayerSpeedFacsXX(pNbr, speedLev) {
		console.log("setSpeeds pNbr=  " + pNbr + " speedLev=  " + speedLev);


		this.playerSpeed[pNbr] = speedLev;
	}

	getPointsForThisPlayXX(butNbr) {


		return this.ptArr[butNbr-1]
	}


	getTimeXX(pNbr,nbrBut){console.log("|||Settings getTime pNbr= " + pNbr + " nbrBut = "  + nbrBut)		
		if(pNbr == 0) {
			return this.p0Time[nbrBut-1];
		}else{
			return this.p1Time[nbrBut-1];
		}
	}

	fillBoxesXX(totalButs, gameType, rows) {//Moved to bidButs
		console.log("fillBoxes totalButs=  " + totalButs + " gameType  " + gameType + " rows  " + rows);
		 this.p0Time = [];
		 this.p1Time = [];
		 this.ptArr = [];
		const speed0 = this.playerSpeed[0];
		const speed1 = this.playerSpeed[1];

		//<input type='button' style="background-color: blue; color: white"  class='but2Player' onclick='makeBid(L:1 )' value=1 id='trgNbrL1' >
		
		const sameSpeedForEachPlayer = (speed0 == speed1);//<tr>

		let buf = '\n<table border="1" style="font-size: 8px"; id="ptTbl" width="100%">\n<tr><td><table border="1" width = "100%" ><tr> <td class="TmPtHeader"><p class="timePts">Item Count</p></td></tr><tr> <td class="TmPtHeader"><p class="timePts">Points</p></td>';
	
		if(sameSpeedForEachPlayer){
			buf +="<tr class='timePts'><td> <p class='timePts'>Time</p></td></table>";
		}else{
			buf+="<td class='TmPtHeader'>Blue Time</td>";
			buf+="<td class='TmPtHeader'>Red Time</td></table>";
		}
		//buf+="</tr>";		
		const x = Number(1/(totalButs * totalButs))
		for (let i = 1;i<= totalButs ;i++){
			const points= (Number(x * i * i * this.maxPoints)) ;
			this.ptArr.push(Math.round(points));

			const speed0 = Number(this.getTheTime(0,gameType,i,rows))
			const speed1 = Number(this.getTheTime(1,gameType,i,rows))
			buf += `\n<td><table border="1" id="tbl${i}" width="100%"><tr class="TmPtHeader"><td id="b${i}"><p class="timePts">${i}</p></td></tr><tr class="TmPtHeader"><td id="p${i}"><p class="timePts">${points.toFixed(0)} Pts</p></td></tr>`;
			
			if(sameSpeedForEachPlayer){
				this.p0Time.push(speed0);
				this.p1Time.push(speed0);
				buf += `<tr class="TmPtHeader" ><td id="t${i}"><p class="timePts">${speed0.toFixed(0)} Sec</p> </td></tr>`;
			}else{
				this.p0Time.push(speed0);
				this.p1Time.push(speed1);
				buf += `<tr class="TmPtHeader"><td id="t${i}">${speed0.toFixed(0) } Sec</td></tr>`;
				buf += `<tr class="TmPtHeader"><td id="tt${i}">${speed1.toFixed(0) } Sec</td>`;//</tr>
			}			
			buf+="</table></td>";
		}
		buf+="</tr></table></tr>"

		const el = document.getElementById("ptAndTimeInsrtPt");
		//console.log(buf);
		el.innerHTML = buf;
	}

//ptAndTimeInsrtPt

	getGameTypeSpeedFacXX(gameType,cols){//console.log("Settings getGameTypeSpFac gameType=  " + gameType  + "  cols "  + cols)
		switch (gameType){
			case "B":
				return 0.5;
			case "P":
				return 0.6;
				break;
			case "M":
				return this.colFacMap.get("2");
				break;
			case "Q":
				return 1.5;
				break;
			case "U":
				return this.colFacMap.get(cols);
				break;
			case "E":
				return 1.25;
				break;
			default:
				//console.log("this is Default")
				return 1.0;
		}
				//if(db)console.log("this is bottom o fgetGameTypeSpeedFac ")
	}


	createColFacMapXX() {
		console.log("Settings createColFacMap() "  )
		const arr = ['1-1.25','2-1.25','3-1.5','4-1.75','5-2'];
		this.colFacMap= new Map();
		for(let j = 0;j <arr.length;j++){
			const newArr = arr[j].split("-");
			this.colFacMap.set(newArr[0],newArr[1]);
		}
	}

	createSpeedMapXX(){//console.log("Settings createSpeedMap "  );// 1 is fastest, 10 slowests
		const arr = ['1-3','2-3.5','3-4','4-4.5','5-5','6-5.5','7-6','8-6.5','9-7','10-7.5'];
		this.speedMap= new Map();
		for(let j = 0;j <arr.length;j++){
			const newArr = arr[j].split("-");
			this.speedMap.set(newArr[0],newArr[1]);
		}
	}

	createTxtSizeMap(){console.log("Settings createTxtSizeMap "  );// 1 is fastest, 10 slowests
		const arr = ['1-3','2-3.5','3-4','4-4.5','5-5','6-5.5','7-6','8-6.5','9-7','10-7.5'];

		this.speedMap= new Map();
		for(let j = 0;j <arr.length;j++){
			const newArr = arr[j].split("-");
			this.speedMap.set(newArr[0],newArr[1]);
		}
	}
	getTheTimeXX(pNbr,gameType,nbrBut,rows){//console.log("|||Settings getTime pNbr= "  + pNbr +  "  gameType= " + gameType  +  " nbrBut=  "+ nbrBut +  " rows=  "+ rows)
		let time = 0.0;
		const gameTypeFac = this.getGameTypeSpeedFac(gameType,rows);
		//console.log("gameTypeFac=  " + gameTypeFac );
		const playerTimePerBut = this.speedMap.get(this.playerSpeed[pNbr]);
		//console.log("playerTimePerBut=  " + playerTimePerBut );
		time+= nbrBut * playerTimePerBut * gameTypeFac;
		//console.log("time=  " + time );
		if(rows != undefined){
			const n = Number(this.colFacMap.get(rows));
			//console.log("n=  " + n );
			time*=n;
		}
		//console.log(" setting time=  " + time );
		return time;
	}

}