// JavaScript source code


/* Route player-facing notices through the shared themed dialog
   (js-ui/tsd-modal.js) rather than the browser's native alert(), falling
   back to alert() if that UI layer is absent. Each call site here returns
   immediately afterwards, so alert()'s blocking is not relied upon. */
function tsdSubSetNotice(title, body) {
	if (window.TSDModal && typeof TSDModal.alert === "function") {
		TSDModal.alert({ title: title, message: body, icon: "help" });
	} else {
		alert(body);
	}
}

class SubSet{

	constructor (input){console.log("SubSet.NEW  " +  input);
		this.input = input;
		this.instructions;
		this.initialRndArr;
		this.rndsToBePlayed;
		this.inst;
		this.newSetSerNbr;
		this.nbrRndsToPlay ;
		this.sortBy;
		this.selectBy;
		this.zoneBreakDown;
		this.listOfRndsToPlay = [];
        this.breakOutData(this.input);
	}


	returntestData(){
		return "ABC";

	}

	//PRA1_1799,2024.06.25,PRA1_1799;Set;10;9.0;1000;Test/;QuartersGet3From10,,AvgGrade=9.0 Points=1000 
	//TotalRounds=10 SubSets=1 SubSetRnds=10 WebPages=0 Instructions=0 Commands=0 Comments=0 ,AbTe;;;;,
	//gPRA1_55 ,,Fu2,Set;PRA1_1798;10;9.0;1000;-;Test/;10BtypeQuarters;:ZoneBreakDown=3.:NbrRndsToPlay=3;0

	init(){console.log("|||| SubSet.init \n " + this.input + "\n\n" );
		this.breakOutData(this.input);
	}

	/*
	PRA1_1777,2024.05.05,PRA1_1777;Set;6;9.166667;600;;2010Oct14,,AvgGrade=9.166667 Points=600 TotalRounds=6 SubSets=0 SubSetRnds=0 WebPages=0 Instructions=0 Commands=0 Comments=0 ,AbTe;;;;,gPRA1_80 ,,Fu2,
	Rnd;AA.Uen00002;1;9;100;0;Test/Unscramble;Unscramble the following [No Sort] Single-Screen 3 Zones;,
	Rnd;AA.Uen00013;1;10;100;0;Leaders/Military;Complete the Names of The Military Leaders or Spies.;,
	Rnd;AA.Uen00014;1;9;100;0;Authors;Equate the Author with the Work.;,
	Rnd;AA.Uen00015;1;9;100;0;Authors;Complete the Names of Famous Authors;,
	Rnd;AA.Uen00016;1;9;100;0;Books/Quotes;Complete the Quotes from Poems and Books.;,
	Rnd;AA.Uen00017;1;9;100;0;Bible/Sayings;Complete the Bible sayings.;
	*/

	async breakOutData(input) {//Set;PRA1_1778;6;9.166667;600;-;;TSD6UgamesTest;:ZoneBreakDown=1.:NbrRndsToPlay=1;2
		let newSet = null
        console.log("BB---SubSet.breakOutData = " + input);
		const arr = input.split(";");
		const subSetSerNbr = arr[1];
		console.log("CC--SubSet.breakOutData subSetSerNbr =" + subSetSerNbr);
		const instructions = arr[8];
		console.log("DD--SubSet.breakOutData instructions =" + instructions);
		//this.mapInst(instructions);

		if (onNet) {
			const url = 'https://www.edugames.com/cgi-bin/GetASetTSD.pl?' + subSetSerNbr;
			console.log("url = " + url);
			await fetch(url)
				.then(response => response.text())
				.then(data => {
					if (data != null) {
						console.log("CP.fetch data=  " + data.substring(0, 24));

						newSet = new Set(data,true);
						newSet.listRnds("||FromSubSet");
						this.listOfRndsToPlay = this.getRndsToPlay(instructions, newSet.rndArr);
						console.log("EEEEE= \n  " + this.listOfRndsToPlay);
						return this.listOfRndsToPlay;
					} else {
						tsdSubSetNotice("Download Failed", "Something went wrong and the Set could not be downloaded.");
						return;
					}
				});

		} else {//If offline, use data from my computer
			console.log("else ");
			const data = this.sets.getData(setSerNbr)
			newSet = new Set(data)
			this.displayStartButton();
			return newSet;
		}

		//const newSet = new Set(subSetSerNbr);
		//console.log("DD---SubSet.breakOutData newSet \n " + newSet.returnAllRnds());

        return;


		input = deComma(input);
		console.log("BB---SubSet.breakOutData \n " + input);
		this.inputArr = input.split(",");
		console.log("this.inputArr \n " + this.inputArr);
		this.instructions = this.inputArr.shift();
		console.log("this.instructions = " + this.instructions);

		this.setInstArr= this.instructions.split(";");
		for (let i = 0; i < this.setInstArr.length;i++){
			console.log(i + "  --- " + this.setInstArr[i]  );//:ZoneBreakDown=3.:NbrRndsToPlay=3
		}
		this.inst = this.setInstArr[8];

		this.mapInst(this.inst);//Set;PRA1_1777;6;9.166667;600;-;;2010Oct14;:ZoneBreakDown=1.:NbrRndsToPlay=1;1,
		//this.newSetSerNbr = this.setInstArr[1];
		console.log("---SubSet.instruct= " + this.inst);//
		this.rndSerNbrArr = [];
		let jnk = "";
		let serNbr =""
		for (let i = 9; i < this.inputArr.length; i++){
			[jnk, serNbr] = this.inputArr[i].split(";");
			this.rndSerNbrArr.push(serNbr);
			console.log(i + "  **** " + serNbr  );//:ZoneBreakDown=3.:NbrRndsToPlay=3
		}

		//this.initialRndArr = this.returnAllRnds(this.newSetSerNbr)
		//console.log("---SubSet.initialRndArrAAA " + this.initialRndArr  );
		this.rndsToBePlayed = this.getRndsToPlay(this.inst, this.rndSerNbrArr);
		console.log("---SubSet.this.rndsToBePlayed " + this.rndsToBePlayed);
		return this.rndsToBePlayed;
	}

	returnRndsToBePlayed(){console.log("---SubSet. returnRndsToBePlayed = " +  this.rndsToBePlayed)
		return this.rndsToBePlayed;
	}

	returnAllRnds(setSerNbr){console.log("---SubSet. returnAllRnds "  + setSerNbr)
		let outPutArr = [];
		const setRnds = [];

        if (!onNet) {//for testing locally
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
        const theRnd = new Rnd();
		constrndArr = thtRnd.getRndsToPlay();




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
		console.log("nbrRndsToPlay " + nbrRndsToPlay + " sortBy " + this.sortBy + " selectBy" + this.selectBy + " zoneBreakDown " + this.zoneBreakDown);
	}

	//SubSet.getRndsToPlay inst= :ZoneBreakDown=1.:NbrRndsToPlay=1 
	//newSetRndArr = AA.Uen00002,AA.Uen00013,AA.Uen00014,AA.Uen00015,AA.Uen00016,AA.Uen00017

	getRndsToPlay(inst, newSetRndArr) {
		console.log("SubSet.getRndsToPlay inst= " + inst + " newSetRndArr=  " + newSetRndArr);
		listItemsInArr(newSetRndArr,"*top*",0,40,true);
		let returnArr = [];
		const instMap = new Map();
		const instArr = inst.split(":")
		listItemsInArr(instArr,"*instArr* ",0,40,true);

		for (let i = 0; i < instArr.length; i++){
			console.log("instArr[i]= " + instArr[i])
			if (instArr[i] == "") continue;
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
			if(headerComment != ""){//Put the comment back in front
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
			if(headerComment != ""){//Put the comment back in front
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

