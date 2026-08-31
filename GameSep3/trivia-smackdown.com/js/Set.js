

class Set{
	constructor (input,cp){console.log("Set.NEW  " +  input);
		this.input = input;
		this.cp = cp;
		this.setMap;
		this.rndArr = [];
		this.codes;
		this.authors;
		this.init();
		this.inputArr;
		this.buf;
		this.sets = null;//for subsets we replace as needed
		this.serNbr;
		this.rndBeingPlayed;
	}

	init(){//console.log("|||| Set.init \n " + this.input + "\n\n" );
		this.breakOutData(this.input);
		this.advanceToRndNbr();
		//console.log(this.listRnds);
		//console.log(this.listjustRndSerNbrs());//listItemsInArr(theArr,text,strtChar,endChar,print){
	}

	advanceToRndNbr() { console.log("Set.advanceToRndNbr " );
		const strtNbr = Number(document.getElementById("strtNbr").value)

		//this.listRnds("before")
		for (let i = 0; i < strtNbr; i++) {
			//console.log("--- " + this.rndArr[i]);
			this.rndArr.shift();
			//console.log("+++" + this.rndArr[i]);
		}
		//this.listRnds("after")
	}


	getNextRnd(from){console.log("Set.getNextRnd Top " +  this.rndArr.length + " from " + from);
		listItemsInArr(this.rndArr,"getNextRnd",0,20,true);
		const serNbr = this.getSerNbr();
		if(this.getSerNbr() == 0){
			console.log("No SerNbr()  ")
			return ""
		}else if(this.rndArr.length == 0){
			return null;//The end of the set
		}else{
			//console.log("AAASet.getNextRnd  " +  this.rndArr.length  );
			const rndOrSet = this.rndArr.shift();
			listItemsInArr(this.rndArr,"getNextRnd",0,20,true);

			console.log("rndOrSet=  " +  rndOrSet);
			const rndOrSetArr = rndOrSet.split(";");
			const type = rndOrSetArr[0];
			const rndSerNbr = rndOrSetArr[1];
			console.log("type=  --" + type + "--" + rndSerNbr )
			if(type ==  "Rnd"){
				this.rndBeingPlayed = rndSerNbr;
				console.log("set.return " + rndSerNbr)
				cp.itf.displaySerNbr(rndSerNbr);
				return rndSerNbr;
			}
			if(type == "Set"){
				if(onNet){
					console.log("Set.Set  " );
					fetch('/edugames.com/cgi-bin/GetRounds.pl?' + serNbr)     
					.then(response => response.text())
					.then(data => {
					console.log("Set.data= " + data);
					const subSet = new SubSet(rndOrSet);
					subSet.init();
					const dataX = subSet.returnRndsToBePlayed();
					console.log("*****  ***  **subSet.dataX = " + dataX)
					for(let i = 0 ;i < dataX.length;i++){
						this.rndArr.unshift(dataX[i]);
					}
					console.log("BBB******this.rndArr " +  this.rndArr);
					//Place the Rnds from the set at the front of the arr
					return this.getNextRnd("online thisset");
					;
					});
				}else{//Off net  
					//console.log("AAA******this.rndArr= " +  this.rndArr + " \\");
					const subSet = new SubSet(rndOrSet);
					subSet.init();
					const data = subSet.returnRndsToBePlayed();
					//console.log("*****  ***  **subSet.data = " + data)
					for(let i = 0 ;i < data.length;i++){
						this.rndArr.unshift(data[i]);
					}
					//console.log("BBB******this.rndArr " +  this.rndArr);
					//Place the Rnds from the set at the front of the arr
					console.log(" ***AA ");
					//cp.startRnd();
					console.log(" ***bbb ");
					return this.getNextRnd("offLine this set");
					//this.procASubSet(data);
				}
			}else if(type == "Cmt"){
				//console.log("Set.Comment   " + aRnd[7]);
			}else if(type == "Wpg"){
				//console.log("Set.Get Web Page   " + aRnd[6]);
			}

		}
	}



	getTypeOfNextRnd(){console.log("set.getTypeOfNextRnd  " + this.serNbr);
		const nxtRnd = this.rndArr[0];
		//console.log("set.nxtRnd  " + nxtRnd);
		const type = nxtRnd.charAt(7);
		return type;
	}

	getTypeOfThisRnd(){console.log("set.getTypeOfNextRnd  " + this.serNbr);

		//console.log("this.rndBeingPlayed == " + this.rndBeingPlayed + " ===");

		const type = this.rndBeingPlayed.charAt(7);
		return type;		 
	}

	getRndBeingPlayed(){console.log("set.getRndBeingPlayed  " + this.serNbr);
		return this.rndBeingPlayed;
	}

	getSerNbr(){
		return this.serNbr;
	}

	getAuthors(){
		return this.authors;
	}

	getNbrOfRemRnds(){
		return this.rndArr.length;
	}

	listRnds(txt){console.log("Set listRnds  " + this.serNbr);
		let buf = txt + ": A list of rnds\n\n";
	    for(let i = 0 ;i < this.rndArr.length;i++){
			buf+= i + "  " + this.rndArr[i]+ "\n"
		}
		console.log(" " + buf);
		return buf;
	}

	listjustRndSerNbrs(){console.log("listjustRndSerNbrs " + this.serNbr);
		const buf = "";
	     for(let i = 0 ;i < this.rndArr.length;i++){
			buf+= this.rndArr[i].substring(0,24) + "\n";
		}

		 return buf;
	}

	procRnds(arr){console.log("procRnds top " + this.serNbr  + "   " + arr);
	     for(let i = 0 ;i < arr.length;i++){
			const aRnd = arr[i];
			console.log("aRnd " + aRnd);			
			const type = aRnd.substring(0,3);
			console.log("type " + type);
			this.rndArr.push(aRnd + " ****  "+ this.serNbr);
			
			if(type == "Set"){ 
				console.log(this.serNbr + "  procRnds just before procSubset " + aRnd);
				this.procSubset(aRnd);
			}else{
				//console.log(this.serNbr + "  procRnds just before push a rnd " + aRnd);
				this.rndArr.push(aRnd + " ****  "+ this.serNbr);
			}
			
	    }
		const txt ="botom of procRnds" + this.serNbr

		listItemsInArr(this.rndArr,txt,0,30,true)//const xx = [arr[3], i];
    }

	sortRndsBydifficulty(rndArr){console.log("sortRndsBydifficulty  " + rndArr.length);//Difficulty is school grade
		const sortLst = []
	    for(let i = 0 ;i < rndArr.length;i++){
			const arr = rndArr[i].split(";")//Rnd;AA.Uen00002;1;9;100;0;Test/Unscramble;Unscramble
			sortLst.push((arr[3] * 1000).toFixed(0) + "." + i);
		}
		sortLst.sort((a, b) => a - b);
		const secondArr = []
	    for(let i = 0 ;i < sortLst.length;i++){
			const n = "" + sortLst[i];
			const tempArr = n.split(".")
			secondArr[i] = rndArr[tempArr[1]];
		}

		listItemsInArr(secondArr,"** sortRndsBydifficulty bottom *",0,40,true);

		return secondArr;
	}


	//Set  PRA1_1778   6    9.166667 600 :SortBy=Random:ZoneBreakDown=2.0.1.:NbrRndsToPlay=3:SelectBy=RandomOrder                                6
	getSetInst(inst,newSetRndArr){console.log("Set.getSetIns  " + inst);
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
		console.log( "AAA***************************"	+	this.serNbr);				
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
			this.rndArr.sort(() => Math.random() - 0.5);//sort that chunk
			returnArr = returnArr.slice(0,nbrToReturn)

			console.log( " aa returnArr.length=  "  + returnArr.length)
			if(headerComment != ""){//Put he comment back in front
				returnArr.unshift(headerComment);
			}
			console.log( " bb returnArr.length=  "  + returnArr.length)
			return returnArr;
		}

		console.log( "BBB****************************"	+	this.serNbr);

		//We have mutiple zones and will continue
		const zoneCountArr = zoneBreakDown.split(".")
		nbrOfZones = zoneArr.length;
		console.log( "nbrOfZones ="	+	nbrOfZones)
		const nbrOfRnds = returnArr.length;
		console.log( "nbrOfRnds ="	+	nbrOfRnds)
		const nbrOfRndPerZone = nbrOfRnds/nbrOfZones;
		console.log( "nbrOfRndPerZone ="	+	nbrOfRndPerZone);
		const finalArr = [];
		let pointer = 0;
		for(let i = 0 ;i < nbrOfZones;i++){
			const nbrInThisArr = zoneArr[i];
			console.log( "nbrInThisArr ="	+	nbrInThisArr)
			console.log( "pointer ="	+	pointer + "   " + (pointer + nbrOfRndPerZone))
			const tempArr = returnArr.slice(pointer,pointer + nbrOfRndPerZone);//Take a chunk
			//console.log(nbrInThisArr + "  aaatempArr ="	+	tempArr);
			tempArr.sort(() => Math.random() - 0.5);//sort that chunk
			//console.log( "bbbtempArr ="	+	tempArr);
			for(let j = 0 ;j < nbrInThisArr;j++){//take the first n number for the chenk
				finalArr.push(tempArr.shift())
			}
			const txt  = i + " finalArr " + this.serNbr 
			listItemsInArr(finalArr,txt,0,50,true)
			pointer+=nbrOfRndPerZone;
		}
		if(headerComment != ""){//Put he comment back in front
			finalArr.unshift(headerComment);
		}
		return finalArr;
	}






	breakOutStats(imput4){console.log("breakOutStats  " + imput4 );
		this.setMap= new Map();
		const arrParm = imput4.split(" ");
		let name = "";
		let item = "";
        for(let i = 0 ;i < arrParm.length;i++){
			[name,item] = arrParm[i].split("=");
			this.setMap.set(name,item);
		}
	}

	displayAll(){
		console.log("Set.getNextRnd  " +  this.buf);
	}

	breakOutData(input){console.log("Set.breakOutData  " + input );//1796 1797 
		const tempArr = input.split(",");
		for(let i = 0 ;i < tempArr.length;i++){
			console.log(i + " || " + tempArr[i] );//
		}

		//breakOutTextByComma(input,"breakOutData",true);
		//this.inputArr  = input.split(",")
		this.serNbr = tempArr[0];
		this.creationDate = tempArr[1];
		this.setData = tempArr[2];
		//3 is blank;
		console.log("this.inputArr[4]= " + tempArr[4])		
		this.breakOutStats(tempArr[4])
		this.codes = tempArr[5];
		this.authors = tempArr[6];
		//7 and 8 are blank and future use
		//the rnds start at 9
		//this.procRnds(this.inputArr.slice(9));

		for(let i = 9 ;i < tempArr.length;i++){
			this.rndArr.push(tempArr[i]);//We don't need more than the type and serNbr'
		}
		listItemsInArr(this.rndArr,"BottomOFBreakOut",0,20,true)
		cp.startRnd(this.rndArr[0],this.serNbr);		
	}

	


}

