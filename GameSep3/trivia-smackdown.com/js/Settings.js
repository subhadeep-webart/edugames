// JavaScript source code

class Settings{
	constructor (){console.log("Settings "  );
	 this.speed = 5;
	 this.speedMap;
	 this.colFacMap;
	 this.txtSizeMap;
	 this.playerSpeed = [];
	 this.maxPoints = 100.0;
	 this.p0Time = [];
	 this.p1Time = [];
	 this.ptArr = []
	}

	init(){
		this.createSpeedMap();
		this.createRowFacMap();
		this.createTxtSizeMap();
	}


	//Note: This will be upgraded in time
	pickWhoGoesFirst(){console.log("Setting  pickWhoGoesFirst  " );
		const x = Math.random();
		if(x < 0.5){
			return [0,plu.players[0].name,"Blue"]
		}else {
			return [1,plu.players[1].name,"Red"]
		}
	}


	setPlayerSpeedFacs(p0,p1){console.log("setSpeeds p0=  "  + p0 +  " p1=  " + p1 );
		this.playerSpeed[0] = p0;
		this.playerSpeed[1] = p1;
	}

	getPointsForThisPlay(butNbr){
		return this.ptArr[butNbr-1]
	}


	getTime(pNbr,nbrBut){console.log("|||Settings getTime pNbr= " + pNbr + " nbrBut = "  + nbrBut)		
		if(pNbr == 0) {
			WhoGoesFirst
			return this.p0Time[nbrBut-1];
		}else{
			return this.p1Time[nbrBut-1];
		}
	}

	fillBoxes(gameType,totalButs,rows ){console.log("fillBoxes totalButs=  "  + totalButs );
		 this.p0Time = [];
		 this.p1Time = [];
		 this.ptArr = [];
		const speed0 = this.playerSpeed[0];
		const speed1 = this.playerSpeed[1];		
		const sameSpeedForEachPlayer = (speed0 == speed1);//<tr>
		let buf = '<table border="1"  width="100%">\n<tr><td><table border="1"  width="100%"><tr> <td>Item Count</td></tr><tr> <td>Points</td>';
	
		if(sameSpeedForEachPlayer){
			buf+="<tr><td>Time</td></table>";
		}else{
			buf+="<td>Blue Time</td>";
			buf+="<td>Red Time</td></table>";
		}
		//buf+="</tr>";		
		const x = Number(1/(totalButs * totalButs))
		for (let i = 1;i<= totalButs ;i++){
			const points= (Number(x * i * i * this.maxPoints)) ;
			this.ptArr.push(Number(points));

			const speed0 = Number(this.getTheTime(0,gameType,i,rows))
			const speed1 = Number(this.getTheTime(1,gameType,i,rows))
			buf+=`\n<td><table border="1" id="tbl${i}" width="100%"><tr><td id="b${i}">${i}</td></tr><tr><td id="p${i}">${points.toFixed(0)} Pts</td></tr>`;
			
			if(sameSpeedForEachPlayer){
				this.p0Time.push(speed0);
				this.p1Time.push(speed0);
				buf+=`<tr><td id="t${i}">${speed0} Sec</td></tr>`;
			}else{
				this.p0Time.push(speed0);
				this.p1Time.push(speed1);
				buf+=`<tr><td id="t${i}">${speed0} Sec</td></tr>`;
				buf+=`<tr><td id="tt${i}">${speed1} Sec</td>`;//</tr>
			}			
			buf+="</table></td>";
		}
		buf+="</tr></table></tr>"

		const el = document.getElementById("ptAndTimeInsrtPt");
		//console.log(buf);
		el.innerHTML = buf;

	}

//ptAndTimeInsrtPt

	getGameTypeSpeedFac(gameType,cols){console.log("Settings getGameTypeSpFac gameType=  " + gameType  + "  cols "  + cols)
		switch (gameType){
			case "B":
				console.log("this is B")
				return 0.5;
			case "P":
				return 0.6;
				break;
			case "M":
				return this.colFacMap(2);
				break;
			case "Q":
				return 1.5;
				break;
			case "U":
				return this.colFacMap(cols);
				break;
			case "E":
				return 1.25;
				break;
			default:
				console.log("this is Default")
				return 1.0;
		}
				console.log("this is bottom")
	}


	createRowFacMap(){console.log("Settings getRemButTime "  )
		const arr = ['1-1.25','2-1.25','3-1.5','4-1.75','5-2'];
		this.colFacMap= new Map();
		for(let j = 0;j <arr.length;j++){
			const newArr = arr[j].split("-");
			this.colFacMap.set(newArr[0],newArr[1]);
		}
	}

	createSpeedMap(){//console.log("Settings createSpeedMap "  );// 1 is fastest, 10 slowests
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
	getTheTime(pNbr,gameType,nbrBut,rows){//console.log("|||Settings getTime pNbr= "  + pNbr +  "  gameType= " + gameType  +  " nbrBut=  "+ nbrBut +  " rows=  "+ rows)
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