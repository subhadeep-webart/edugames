// JavaScript source code


class SubSet{

	constructor (input){console.log("SubSet.NEW  " +  input);
		this.input = input;
		this.initialRndArr;
		this.rndsToBePlayed;
		this.inst;
		this.newSetSerNbr;
		this.nbrRndsToPlay ;
		this.sortBy;
		this.selectBy;
		this.zoneBreakDown;
	}





	//PRA1_1799,2024.06.25,PRA1_1799;Set;10;9.0;1000;Test/;QuartersGet3From10,,AvgGrade=9.0 Points=1000 
	//TotalRounds=10 SubSets=1 SubSetRnds=10 WebPages=0 Instructions=0 Commands=0 Comments=0 ,AbTe;;;;,
	//gPRA1_55 ,,Fu2,Set;PRA1_1798;10;9.0;1000;-;Test/;10BtypeQuarters;:ZoneBreakDown=3.:NbrRndsToPlay=3;0

	init(){console.log("|||| SubSet.init \n " + this.input + "\n\n" );
		this.breakOutData(this.input);
	}


	breakOutData(input){console.log("---SubSet.breakOutData \n " + input  );
		this.arr = input.split(";")
		for(let i = 0 ;i < this.arr.length;i++){
			console.log(i + "  --- " + this.arr[i]  );//:ZoneBreakDown=3.:NbrRndsToPlay=3
		}

		this.inst = this.arr[8];
		this.mapInst(this.inst);
		this.newSetSerNbr = this.arr[1];


		for(let i = 0 ;i < this.arr.length;i++){
			console.log(i + "  **** " + this.arr[i]  );//:ZoneBreakDown=3.:NbrRndsToPlay=3
		}


		console.log("---SubSet.instruct= " + this.inst );//

		this.initialRndArr = this.returnAllRnds(this.newSetSerNbr)

		console.log("---SubSet.initialRndArrAAA " + this.initialRndArr  );

		this.rndsToBePlayed = this.getRndsToPlay(this.inst,this.initialRndArr);


		console.log("---SubSet.this.rndsToBePlayed " + this.rndsToBePlayed  );

	}

	returnRndsToBePlayed(){console.log("---SubSet. returnRndsToBePlayed = " +  this.rndsToBePlayed)
		return this.rndsToBePlayed;
	}

	returnAllRnds(setSerNbr){console.log("---SubSet. returnAllRnds "  + setSerNbr)
		let outPutArr = [];
		const setRnds = [];
		if(!onNet){
			const sets = new Sets();
			const setData = sets.getData(setSerNbr);
			const arr = setData.split(",");
			for(let i = 9 ;i < arr.length;i++){
				setRnds.push(arr[i]);
				console.log(i + "  --- " + arr[i]  );//:ZoneBreakDown=3.:NbrRndsToPlay=3
				if(arr[i] != undefined){
					const tempArr = arr[i].split(";");
					if(this.sortBy == "Difficulty"){
						outPutArr.push(tempArr[1]+";"+ tempArr[3]);//The rndSerNbr and the grade
					}else{
						outPutArr.push("Rnd;" + tempArr[1]);
					}
				}
			}
		}
		console.log("---SubSet. outPutArr AA "  + outPutArr)

		if(this.sortBy == "Difficulty"){
			const tmpArr = this.sortRndsBydifficulty(outPutArr);
			outPutArr = tmpArr;
		}
		console.log("---SubSet. outPutArr BB "  + outPutArr)
		return outPutArr;
	}

	stripOutRnds(data){console.log("---SubSet. stripOutRnds " );
		const arr = data.split(",");
		this.initialRndArr = [];
		for(let i = 9 ;i < arr.length;i++){
			//console.log(i + "  --- " + arr[i]  );//:ZoneBreakDown=3.:NbrRndsToPlay=3
			const tempArr = arr[i].split(";");
			this.initialRndArr.push(tempArr[1]);
		}
		console.log("---SubSet. this.initialRndArr " + this.initialRndArr);

	}

	mapInst(inst){console.log("---SubSet.mapIns " + inst);
		const instMap = new Map();
		const instArr = inst.split(":")
	    for(let i = 0 ;i < instArr.length;i++){
			const arrA = instArr[i].split("=") 
			instMap.set(arrA[0],arrA[1]);
			console.log(arrA[0] +"  - " + arrA[1]);
		}
		this.nbrRndsToPlay = instMap.get("NbrRndsToPlay");
		this.sortBy        = instMap.get("SortBy");
		this.selectBy      = instMap.get("SelectBy");
		this.zoneBreakDown = instMap.get("ZoneBreakDown")

	}

	getRndsToPlay(inst,newSetRndArr){console.log("SubSet.getRndsToPlay  " + newSetRndArr);
		//listItemsInArr(newSetRndArr,"*top*",0,40,true);
		let returnArr = [];
		const instMap = new Map();
		const instArr = inst.split(":")
	    for(let i = 0 ;i < instArr.length;i++){
			const arrA = instArr[i].split("=") 
			instMap.set(arrA[0],arrA[1]);
		}
		const nbrRndsToPlay = instMap.get("NbrRndsToPlay");
		const sortBy        = instMap.get("SortBy");
		const selectBy      = instMap.get("SelectBy");
		let headerComment = "";//If the first rnd is a comment, we want to include it
		console.log( " nbrRndsToPlay= " + nbrRndsToPlay + " sortBy=  " + sortBy + " selectBy=  " + selectBy);
		const type = newSetRndArr[0].substring(0,3);

		if(type == "Cmt" || type == "WPg"){
			headerComment =  newSetRndArr[0];
		}		
		for(let i = 0 ;i < newSetRndArr.length;i++){
			if(newSetRndArr[i].substring(0,3) == "Rnd"){
				returnArr.push(newSetRndArr[i]);
			}
		}

		console.log("AA returnArr.length =  " + returnArr.length)
		if(sortBy == "Difficulty"){
			returnArr = this.sortRndsBydifficulty(returnArr);
		}

		let zoneBreakDown = instMap.get("ZoneBreakDown");

		if(zoneBreakDown == undefined){
			if(headerComment != ""){//Put he comment back in front
				returnArr.unshift(headerComment);
			}
			console.log("******* undefined" );
			return returnArr;//All rnds are to be played
		}
		console.log( "AAA***************************"	);				
		let zoneArr =[];
		let nbrOfZones = 1;
		if(zoneBreakDown.slice(-1) == "."){//Get rid of a period at end
			zoneBreakDown = zoneBreakDown.slice(0,-1);
		}
		if(zoneBreakDown.indexOf(".") != -1){//4.2.1
			zoneArr = zoneBreakDown.split(".")
			nbrOfZones = zoneArr.length;
		}		
		if(nbrOfZones == 1){
			console.log("******* only one zone" );
			const nbrToReturn = Number(zoneBreakDown);
			console.log( "  nbrToReturn=  "  + nbrToReturn)
			newSetRndArr.sort(() => Math.random() - 0.5);//sort that chunk
			returnArr = newSetRndArr.slice(0,nbrToReturn)

			console.log( " aa returnArr.length=  "  + returnArr.length)
			if(headerComment != ""){//Put he comment back in front
				returnArr.unshift(headerComment);
			}
			console.log( " bb returnArr.length=  "  + returnArr.length)
			return returnArr;
		}

		console.log( "BBB****************************"	);

		//We have mutiple zones and will continue
		const zoneCountArr = zoneBreakDown.split(".")
		nbrOfZones = zoneArr.length;
		console.log( "nbrOfZones ="	+	nbrOfZones)
		const nbrOfRnds = newSetRndArr.length;
		console.log( "nbrOfRnds ="	+	nbrOfRnds)
		const nbrOfRndPerZone = nbrOfRnds/nbrOfZones;
		console.log( "nbrOfRndPerZone ="	+	nbrOfRndPerZone);
		const finalArr = [];
		let pointer = 0;
		for(let i = 0 ;i < nbrOfZones;i++){
			const nbrInThisArr = zoneArr[i];
			console.log( "nbrInThisArr ="	+	nbrInThisArr)
			console.log( "pointer ="	+	pointer + "   " + (pointer + nbrOfRndPerZone))
			const tempArr = newSetRndArr.slice(pointer,pointer + nbrOfRndPerZone);//Take a chunk
			console.log(nbrInThisArr + "  aaatempArr ="	+	tempArr);
			tempArr.sort(() => Math.random() - 0.5);//sort that chunk
			console.log( "bbbtempArr ="	+	tempArr);
			for(let j = 0 ;j < nbrInThisArr;j++){//take the first n number for the chenk
				finalArr.push(tempArr.shift())
			}
			const txt  = i + " finalArr " + this.serNbr 
			//listItemsInArr(finalArr,txt,0,50,true)
			pointer+=nbrOfRndPerZone;
		}
		if(headerComment != ""){//Put he comment back in front
			finalArr.unshift(headerComment);
		}
		return finalArr;
	}

	sortRndsBydifficulty(rndArr){console.log("sortRndsBydifficulty  " + rndArr.length);//Difficulty is school grade
		const sortLst = []
	    for(let i = 0 ;i < rndArr.length;i++){
		console.log("rndArr[i]  " + rndArr[i])
		const arr = rndArr[i].split(";")//Rnd;AA.Uen00002;1;9;100;0;Test/Unscramble;Unscramble
		console.log("arr[3]  " + arr[3])
			sortLst.push((arr[1] * 1000).toFixed(0) + "." + i);
		}
		console.log("sortLstAAA  " + sortLst)

		sortLst.sort((a, b) => a - b);
		console.log("sortLstBBB  " + sortLst)

		const secondArr = [];
		const thirdArr =[]
	    for(let i = 0 ;i < sortLst.length;i++){
			const n = "" + sortLst[i];
			const tempArr = n.split(".")
			secondArr[i] = rndArr[tempArr[1]];
		}
	    for(let i = 0 ;i < sortLst.length;i++){
			const tmpArrr = secondArr[i].split(";")
			thirdArr.push("Rnd;" + tmpArrr[0]);
		}


		listItemsInArr(thirdArr,"** sortRndsBydifficulty bottom *",0,40,true);

		return thirdArr;
	}

}

