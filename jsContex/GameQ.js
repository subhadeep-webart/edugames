// JavaScript source code

class GameQ extends Game{
	constructor(round, context) {
		super(round, context);
		this.context = context;
		this.ansRows;
		this.ansCols;
		this.image;
		this.ansMap;
		this.imageWidth;
		this.imageHeight;
		this.ansButIDArray;//we only create this once
		this.ansPending = false;
		this.reqNbrOfRightAns = 0;
		this.rightAnsArray = [];
		this.rightAnsCntSoFar;
		this.butBeingAnswered;
		this.holdOverQArray = [];
		this.ansBoxWidth;
		this.ansBoxHeight;
		this.displayData;
		this.ansType='G';// 'G' = Grid 'T'=TransparentButtons
		this.recArray = [];
		this.nameArray = [];
		this.qHitArr =[];
		this.nbrHit = 0;
		///this.targNbr=0;
		this.rowsHit =[];
		this.rw =[];
		this.qBoxInPlay = null;
		this.ansArr = new Array();
		this.parmMap = new Map();
		this.rightAnswer;
		}

	init(){
		console.log("GameQ.init TOP"  );
		super.init();
		this.insertTable();
		this.getData();
		this.setUpGameSpace();
		this.addEventListnerToQBoxs();
		this.fillQBoxes();
		bidButs.startBidClock();
		console.log("GameQ.init BOTTOM "  +  this.gameInPlay);//bidButs.createButs(this.rows);
	}
	helloWorld(){
		console.log("GameQ.helloWorld" );//               console.log("GameQ "  + );
		super.helloWorld();
	}

	//****this.gameDataArray = The 235 isotope of this element is used in making energy:;;Uranium (U),
	//The Ozone Layer is composed of what element ?;; Oxygen(O), What element shares a name with the closest planet to the sun ?;; Mercury(Hg), What is the most abundant element in the Universe ?;; Hydrogen(H),

	checkPlay(){console.log("##########GameQ.checkPlay TOP this.rw = " +  this.rw + "  targNbr= " + bidButs.topBid);
		stopThePlayClock();
		this.ansPending = false;
		let pf = "passed";
		let results ="";
		const nbr = this.rw.length;
		if(nbr < bidButs.topBid){
			results+= "Too few items clicked."
			pf = "failed";
		}else{
			for (let i = 0;i<this.rw.length;i++){
				if(this.rw[i] == "W"){
					pf = "failed";;
					results+= "At least one was wrong."
					break;
				}
			}
		}		
		//this.resetQBox(this.qBoxInPlay);
		console.log(pf + "  ---  " +  results );
		if(pf == "passed"){
			this.deleteQbox();
			bidButs.reduceButtons(bidButs.topBid);
		}else{
			this.resetQBox();
		}
		this.rw = [];
		this.nbrHit = 0;
		cp.itf.displayPtsThisPlay(pf,results);
	}
	/*
	The Bluebonnet is the state flower of what state that starts with the letter T?;;Texas,
	What state name is a Spanish name of an imaginary island?;;California,
	What state's highest point is Mt. McKinley at 20320 feet?;;Alaska,The Badger State is the nick name of what state?;;
	Wisconsin,The Yucca is the state flower and the Land of Enchantment is the nick name of what state?;;New Mexico,
	The Baseball Hall of Fame is located in what state?;;New York

	*/



	showAnswers() {
		console.log("GameQ showAnswers()  " + this.ansArr);//
		let longestQuestion = 0;
		let buf = ""
		for (let i = 0; i < (this.ansArr.length + 1); i++) {
			const theQ = this.ansArr[i];
			console.log("theQ  " + theQ )
			if (theQ == undefined) continue;
			const ansParts = theQ.split(";");
			const qq = ansParts[0];
			const ref = ansParts[1];
			const ans = ansParts[2];
			buf+= "Question: " + qq;
			if (ref != "") {
                buf += "\n  REF: " + ref;
			}
            buf += "\n  Answer: " + ans + "\n\n";
			
			//const charCnt = theQ.length;
			//if (charCnt > longestQuestion) longestQuestion = charCnt;

			buf+= "\n"
		}

		console.log("GameQ longestQuestion " + longestQuestion);//

		this.displayAnswers(buf);
	}



	cleanPlayArea(){console.log("GameQ cleanUpPlayArea  "  );//
		super.cleanPlayArea();
		const el =document.getElementById("tabl");
		if(el != null)el.remove();
	}

	insertTable(){console.log("GameQ insertTable  "  );//
		let buf = `<table border='2' id='tabl' width='100%'>
		<tr><td><div id='gameQquestionInsertPt'></div></td>
		<td><div id='gameQansInserPt'></div></td></tr>
		</table>`
		GameContext.ui.gamePlayArea.innerHTML = GameContext.ui.gamePlayArea.innerHTML + buf

	}

	reset(){console.log("GqmeQ reset " )

	}

	invertQuestionBox(id){console.log(">>>>>>>>>>invertQuestionBox " + id)
		this.qHitArr.push(id)
		const el = document.getElementById(id);
		el.style.backgroundColor = "black";
		el.style.color = "white";
		el.disabled ="true";
	}

	resetQBox(){console.log("**********resetQBox " + this.qHitArr)
		for (let i = 0;i < this.qHitArr.length; i++){
			const el = document.getElementById(this.qHitArr[i]);
			el.style.background = "#80ff00";
			el.style.color = "black"
			el.disabled = false;
		}
		this.qHitArr= [];
	}

	flashQBox(){console.log("GameQ. flashQBox "  +   this.qBoxInPlay);
		const el = document.getElementById(this.qBoxInPlay);
		el.style = "background-color: yellow";
	}
	
	deleteQbox(){console.log("____________deleteQbox " + this.qHitArr  )
		for (let i = 0;i < this.qHitArr.length; i++){
			const el = document.getElementById(this.qHitArr[i]);
			const parent = el.parentNode;
			parent.removeChild(el);
		}
		this.qHitArr= [];
	}
	
	postQuestion(theAns,butID){console.log("GameQ.postQuestion theAns= " + theAns  + ' butID= ' + butID +  "  ansPending = " + this.ansPending);
		if (biddingInProgress) {
			showNoticeA("BIDDING STILL IN PROGRESS");
			return;
		}
		if (this.gameInPlay == false) {
			cp.itf.postNotice("No game in play.")
			return;
        }

		if(this.ansPending){
			alert("There is a Question pending. You need to answer it first.")
			return;
		}
		this.rightAnswer = theAns;

		this.qBoxInPlay = butID;
		this.invertQuestionBox(butID);
        console.log("butID= " + butID + "  this.rightAnswer= " + this.rightAnswer);
		//const nameOfGridBox = this.ansMap(butID)
		this.butBeingAnswered = this.ansMap.get(butID);

		//this.rightAnsArray = theAns.split(",");
        //this.rightAnswer = this.rightAnsArray[0];
		console.log("GameQ.qHit rightAnsArray= " + this.rightAnswer + " butBeingAnswered= " + this.butBeingAnswered );

		this.ansPending = true;
	}

	procTypeG() {
		console.log("GameQ.procTypeG.this.displayData= " + this.displayData);
		const parms = this.displayData.split(" ");
		console.log("GameQ. parms = " + parms + "   " + parms.length);
		for (let i = 0; i < parms.length; i++) {
			const twoParts = parms[i].split('=');
			this.parmMap.set(twoParts[0], twoParts[1]);//           console.log("  = " +  );
		}
		this.ansRows = this.parmMap.get("Rows");
		this.ansCols = this.parmMap.get("Cols");
		this.image = this.parmMap.get("Image");
		this.answerList = this.parmMap.get("Answers");//Example: Answers=Clinton;Bush;Reagan;Carter;
		this.ansArray = this.answerList.split(";")            //Example:Clinton,Bush,Reagan,Carter,
		console.log("GameQ. this.ansRows= " + this.ansRows + " this.ansCols= " + this.ansCols + " this.image= " + this.image + " this.ansArray= " + this.ansArray);
        //his.getButIDArray is part of Gme class anduses Zero as the lowest number R0C0...
		this.ansButIDArray = this.getButIDArray("GameContext.ui.ansBut", this.ansCols, this.ansRows);//Cols first because we got from left to right
		this.ansMap = new Map();
		const imagArr = [];
		const nameArr = [];
		//This creates the grid map. ansBut0X0 = Clinton

		console.log("this.ansButIDArray.length=  " + this.ansButIDArray.length);

		for (let i = 0; i < this.ansButIDArray.length; i++) {//this.parmMap.set(twoParts[0],twoParts[1]);
			console.log("##**@@ " + this.ansButIDArray[i] + " = " + this.ansArray[i]);
			this.ansMap.set(this.ansButIDArray[i], this.ansArray[i]);
		}

		console.log(" " + this.ansMap.get("ansBut1X1"));

		nameArr.push("image1");
		imagArr.push(this.image);
		this.addAnsImage(imagArr, nameArr);
		const el = document.getElementById('gameQansInserPt');
		//this.imageWidth = el.naturalWidth;
		//this.imageHeight = el.naturalHeight;

		this.imageWidth = el.width;
		this.imageHeight = el.height;

		this.ansBoxWidth = this.imageWidth / this.ansCols;
		this.ansBoxHeight = this.imageHeight / this.ansRows;

		this.getImageDinensions();//For some reason we need to do this outside this function
	}

	getRCFmHit(x, y) {
		console.log(this.picHeight + "  getRCFmHit = " + x + "  " + y + "   " + this.boxHeight + "  this.rows= " + this.rows);
		let rowNbr = 0;
		let colNbr = 0;
		let n = this.ansBoxHeight
		let ansRow = 0
		for (let i = 0; i < this.ansRows; i++) {
			if (y < n) {
				ansRow = i;
				console.log(" ansRow  = " + ansRow);
				break;
			} else {
				n += this.ansBoxHeight;
				console.log(" n  = " + n);
			}
		}
		console.log("*** n = " + n + "  ansRow = " + ansRow);

		let ansCol = 0;
		n = this.ansBoxWidth;
		for (let i = 0; i < this.ansCols; i++) {
			if (x < n) {
				ansCol = i;
				break;
			} else {
				n += this.ansBoxWidth;
			}
		}
		console.log("  ansCol= " + ansCol + "  ansRow= " + ansRow);
		const theRC = "R" + ansRow + "C" + ansCol;
		const theAns = this.ansMap.get(theRC);
		console.log("  ansCol= " + ansCol + "  ansRow= " + ansRow + "  theRC= " + theRC + " theAns= " + theAns);


        console.log("theAns= " + theAns);
		return theRC;
	}

	procAnsTypeG(x, y) {
		console.log("***********procAnsTypeG  x= " + x + ' y= ' + y);
		//this.getRCFmHit(x, y);
		this.nbrHit++;
		if (this.imageWidth == 0) {
			this.getImageDinensions();
		}
		let ansButID = "R";
		for (let i = 0; i <= this.ansRows; i++) {
			const ww = i * this.ansBoxHeight;
			if (ww > y) {
				ansButID += "" + i-1;
				break;
			}
		}
		ansButID += 'C';
		for (let i = 0; i <= this.ansCols; i++) {
			const ww= i * this.ansBoxWidth;
            if (ww > x) {
				ansButID += "" + i -1;
				break;
			}
		}
		const anAns = this.ansMap.get(ansButID);

		console.log(anAns + "  *******|||******** " + this.rightAnswer + "   " + ansButID);

		

		if (anAns == this.rightAnswer) {
			this.rw.push("R")
		} else {
			this.rw.push("W")
		}
		console.log(" this.isTrgNbrReched()=   " + this.isTrgNbrReched() + "  " + this.rw);

		if (this.isTrgNbrReched()) {
			this.checkPlay();
		}


		/*

		const n = this.answerList.indexOf(this.rightAnswer);//           console.log("  = " +  );
		console.log(n + "  anAns= " + anAns + " this.ansArray = " + this.ansArray);
		if(n == -1 ){
			this.rw.push("W")
		}else{
			this.rw.push("R")
		}
		console.log(" this.isTrgNbrReched()=   " + this.isTrgNbrReched() + "  " + this.rw);
		*/
	}

	ansHit(x,y,ans){console.log("!!!!!ansTypr= " + this.ansType + " ansHit x= " + x + " y= " + y, " ans = "+ ans);
		if (biddingInProgress) {
			showNoticeA("BIDDING STILL IN PROGRESS")
		}
		if(this.ansPending == false){
			console.log("cp.itf.playInProgress "  + cp.itf.playInProgress);
			cp.itf.postNotice("You need to click on a Question first.")
		}
		this.ansPending = false;
		console.log(" this.his.ansType   " + this.ansType);
		switch (this.ansType) {
			case 'G':
				this.procAnsTypeG(x,y);
			break;
			case 'T':
				this.procAnsTypeT(x,y);
			break;
			case 'M':
				this.procAnsTypeRM(ans);
			break;
			case 'R':
				this.procAnsTypeRM(x);
			break;
		}
		

	}

	isTrgNbrReched(){console.log("isTrgNbrReched "  +  (this.nbrHit ) + "   " + bidButs.topBid);
		this.ansPending = false;
		if(this.nbrHit >= bidButs.topBid){
			cp.itf.timeFactor = stopThePlayClock();
			return true;
		}else{
			this.flashQBox();
			return false;
		}
	}

	

	procAnsTypeRM(anAnswer){console.log("||||||||procAnsTypeRM "  + anAnswer + "  " + (this.nbrHit + 1 ) + "   " + bidButs.topBid);
		
		const n = this.rightAnsArray.indexOf(anAnswer);
		if(n == -1 ){
			this.rw.push("W");
		}else{
			this.rw.push("R");
		}
		//this.isTrgNbrReched();
		this.nbrHit++
		if(this.isTrgNbrReched()){
			this.checkPlay();
		}
		console.log("procAnsTypeRM bottom this.rw = " + this.rw);				
	}

	

	getData() {
		console.log(onNet + "  *******GameQ.answer Data=  " + this.gameDataArray[0] );
		this.displayData = this.gameDataArray[0];

		console.log("  **this.displayData.charAt(1)=  " + this.displayData.charAt(1))

		if(this.displayData.charAt(1) == "B"){// in case the burton are in a button file}B.AA.Bu.Ge.No.No.US.States.BL.csv
			//if(this.cp.onServer){
			if(onNet){
				console.log(" gameDataArray[0 " + this.gameDataArray[0] );
				const filePath = getTextFilePath(this.gameDataArray[0])
				fetch (filePath, {
					})
					.then(response => response.text())
					.then(data => {
						console.log("data **" + data +"**");
						const pos = data.indexOf("AnswerType=");
						console.log("pos **" + pos +"**")
						this.displayData = data.substring(pos);
						//console.log("displayData =" + this.displayData)

					this.ansType = this.displayData.charAt(11);

					console.log("this.ansType= " +  this.ansType);
		
					console.log("****this.ansType=  -"  + this.ansType +"-");

					switch (this.ansType){
						case 'G':
							this.procTypeG(this.displayData);
							break;		
						case 'M':
							console.log("MMM1" );
							this.procTypeM(this.displayData);
							console.log("MMM2" );
							break;
						case 'R':
							this.procTypeR(this.displayData);
							break;
						case 'T':
							this.procTypeT(this.displayData);
							break;
						}
				   
					})
				.catch(error => console.log('Error fetching data:', error));
				console.log("MXXX" );
			}else{
				console.log("this.cp.rndSerNbr " +  this.cp.rndSerNbr );
				this.displayData = 	this.cp.ansButtons.getData(this.cp.rndSerNbr);
			}
			console.log("XXXXXXXXXXXXX "   );
		}
        console.log("###**#this.displayData= " +  this.displayData);

		this.ansType = this.displayData.charAt(11);//this is where we install the buttons if in line with the Round

        console.log("this.ansType= " +  this.ansType);
		
		console.log("***************.this.ansType= " + this.ansType);
		
		switch (this.ansType){
		case 'G':
			this.procTypeG(this.displayData);
			break;
		case ('T'):
			this.procTypeT(this.displayData);
			break;
		case ('R'):
			this.procTypeR(this.displayData);
			break;		
		case ('M'):
			this.procTypeM(this.displayData);
			break;
}

		
	}


	procTypeR(displayData){console.log("GameQ.procTypeR.displayData= "  + displayData);
		const pos = displayData.indexOf("Answers=");
		const parameters = displayData.substring(0,pos+8);
		console.log(" parameters = " +  parameters);
		const answers = displayData.substring(pos+8 );
		console.log(" answers = " +  answers);
		const ansArray = answers.split(";");
		const aMap = this.mapParms(parameters, "=");
		const ansRows = aMap.get("AnsRows");
		const ansCols = aMap.get("AnsCols");
		console.log(" ansRows = " +  ansRows + " ansCols= " + ansCols);//'gameQImageInsrtPt'
		let buf = "<table  border='5'  width='500px'>";
		for (let i = 0;i < ansRows; i++){
			buf+= "<tr>";
			for (let j = 0;j < ansCols; j++){
			const theAns = ansArray.shift();
				const butID = 'GameContext.ui.ansBut'+ i + 'X' + j;//change to this.qbutIDArray  //<center>'${list[i]}</center>
				//console.log("GameQ.butID  = " + butID);
				buf+= `<td><center><input type="button" onclick="ansHit('${theAns}')" class="butAns" id="${butID}" width='100px' value="  ${theAns}  " ></center></td>`;//id="gameGButInsertPt"
			}
			buf+= "</tr>\n";
		}
		buf+= "</table>";
		//console.log("********buf  = " + buf );
		const el = document.getElementById('gameQansInserPt');
		console.log("el= " + el);
		el.innerHTML = el.innerHTML + buf;
	}

	procTypeT(displayData){console.log("********procTypeT "  + this.displayData);
		
		let pos1 = displayData.indexOf("Image=");
		let pos2 = displayData.indexOf("Answers=");
		this.image = this.displayData.substring(pos1+6,pos2 -1 );
        console.log("GameQ.this.image= "  + this.image);
		this.answers = displayData.substring(pos2+8)
		//console.log("GameQ.this.answers= "  + this.answers );
		const imageArray = [this.image];
		const nameArray = [];
		nameArray.push("image1");
		this.addAnsImage(imageArray,nameArray);
		const answerArray = this.answers.split(";")
		this.ansMap = new Map();
		for(let i = 0;i< answerArray.length;i++){
			const parts = answerArray[i].split(' ');//{H-1black 206075010157 Jordan River
			const part1 = parts.shift();
			const loc = parts.shift();
			const nameX = parts;//What is left.
			const name = String(nameX).replaceAll(',',' ');
			const rec = loc.slice(0,3) + ";" + loc.slice(3,6) + ";" +loc.slice(6,9) + ";" + loc.slice(9,12);
			this.recArray.push(rec);
			this.nameArray.push(name);
            this.ansMap.set(rec, name);
			//console.log(name + " --- " +  rec);//               console.log("GameQ "  + );
		}

	}
//AnswerType=MultipleImages Answers=}P.AA.Pi.Th.Sy.Fl.BritishFlag1776.GE.jpg British;}P.AA.Pi.Th.Sy.Fl.USFlag1776.GE.jpg Colonialists;
		
	procTypeM(){console.log("GameQ.procTypeM.this.displayData= "  + this.displayData);
		//const picArray = [];
		const ansArray = [];
		let pos = this.displayData.indexOf("Answers=");
		let imageList = this.displayData.substring(pos+8);
		
		const n = imageList.length;console.log("n= " + n)

		if(imageList.charAt(n-1) == ";"){
			imageList = imageList.substring(0,n-1);
		}

		let imageAndNameArray = imageList.split(";");

		const nbrOfImages = imageAndNameArray.length;

		let buf = "";

		let but =  "";
		for(let i = 0;i< nbrOfImages;i++){
			const anImageAndName = imageAndNameArray[i];
			if(anImageAndName.length == 0)break;
			pos = anImageAndName.indexOf(" ");
			const theImage =anImageAndName.substring(0,pos);//`name='${theName}'`
			const theName =anImageAndName.substring(pos+1)
			ansArray.push(theName)
			const theImageHTML = getImageFile(theImage,theName);
			buf+= theImageHTML[0];
            console.log("el "  + theImageHTML[0]);
		};

		const el  = document.getElementById('gameQansInserPt')

		console.log("el= " + el)
        console.log("buf= "  + buf );
		
		el.innerHTML = el.innerHTML + buf;

		for(let i = 0;i< ansArray.length;i++){
			const el = document.getElementById(ansArray[i]);
			el.addEventListener('click', function(event) {
				ansHit(ansArray[i],ansArray[i],ansArray[i]);
			});
		}
	}

	addAnsImage(imageArray,nameArray){console.log("|-|-|addAnsImage = " + imageArray  + "  " + nameArray);
		 //         console.log("  = " +  );
		const imagePaths = [];
		for (let i = 0;i < imageArray.length; i++){
			const ip = getImageFile(imageArray[i],nameArray[i]);
			 imagePaths.push(ip);
		}
		const theImageHTML = imagePaths[0][0];
        console.log("***theImageHTML= " + theImageHTML);
		const gameQImageInsrtPt= document.getElementById('gameQansInserPt');
		gameQImageInsrtPt.innerHTML = gameQImageInsrtPt.innerHTML + theImageHTML;
		for (let i = 0;i < imageArray.length; i++){
			const el = document.getElementById(nameArray[i]);
				el.addEventListener('click', function(event) {
        console.log(event.offsetX + " ++++ " + event.offsetY );
				ansHit(event.offsetX,event.offsetY);
			});
		}
	}

	



	mapParms(data,delim){console.log("GameQ.mapParms= "  + data + " delim-" + delim + "-");
		const dataArray = data.split(" ");
		const len = dataArray.length;
		const parmMap = new Map();
		for (let i = 0;i < len; i++){
			const twoParts = dataArray[i].split(delim);
			parmMap.set(twoParts[0],twoParts[1]);//             console.log("  = " +  );
		}
		return parmMap;
	}
	
	getImageDinensions(){//This does not work in the function that inserted the image, so this is a work around
		const el = document.getElementById('image1');
		//this.imageWidth = el.naturalWidth;
		//this.imageHeight = el.naturalHeight;
		this.imageWidth = el.width;
		this.imageHeight = el.height;

		this.ansBoxWidth = this.imageWidth/this.ansCols;
		this.ansBoxHeight = this.imageHeight / this.ansRows;
        console.log(" this.imageWidth = " +  this.imageWidth + ' this.ansBoxWidth ' + this.ansBoxWidth);
        console.log(" this.imageHeight = " +  this.imageHeight + ' this.ansBoxHeigh ' + this.ansBoxHeight);

        return (this.imageWidth + "," + this.imageHeight);

	}


 
	removeMultiAnsQuestions(qArr){console.log("removeMultiAnsQuestions ");//What two presidents saw military action in WWI?;;Truman;Eisenhower, 
		const startLength  = qArr.length;
		const newArr = new Array();
		for (let i = startLength-1;i > 0; i--){
			let qANDa = qArr[i];

			if (qANDa.charAt(qANDa.length - 1) == ";") {//sometime there is a ";" at the end Which president...?;;Ford;
                qANDa = qANDa.slice(0, -1);
			}
			
			const tempArr = qANDa.split(";")
			const len = tempArr.length;

			console.log(len + " A === " + qANDa + "  --" + tempArr[3] + "--");

			if (len == 4 && tempArr[3] == "") {
				const junk = tempArr.pop();
			}
			console.log(len + "B  === " + qANDa + "  --" + tempArr[3] + "--");
			if(len == 3){
				newArr.push(qANDa);
			}
		}
		console.log("removeMultiAnsQuestions from  " +  qArr.length  + " to " +  newArr.length);
		return newArr;
	}
	//     console.log("  = " +   );

	fillQBoxes(){console.log("fillQBoxes  = " + this.gameDataArray.length );
		const theAnswerParm = this.gameDataArray.shift();
		this.gameDataArray = this.removeMultiAnsQuestions(this.gameDataArray);

		console.log("****this.gameDataArray = " + this.gameDataArray);

		const mixedArray = this.utl.mixUpArray(this.gameDataArray);

		for (let i = 0;i < this.rows; i++){
			const butID = 'qBut'+ i + 'X0';//change to this.qbutIDArray
			const el = document.getElementById(butID);
			const aQandA = mixedArray.shift();
			this.ansArr.push(aQandA);
			const qArray = aQandA.split(";");
			const theQ = qArray.shift();
			const theRef = qArray.shift();
			const theAns = qArray;//What we have left is/are the answers
			el.value = theQ;
			el.name = theAns;
		}
	}


//AnswerType=GridOnImage AnsRows=4 AnsCols=4 Image=}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.JJ.gif Answers=Clinton;Bush;Reagan;Carter;Ford;Nixon;Johnson-L;Kennedy;Eisenhower;Truman;Roosevelt-F;Wilson;Roosevelt-T;Lincoln;Jefferson;Washington
	
	addEventListnerToQBoxs(){console.log("addEventListnerToQBoxs " + this.rows );
		for(let i = 0;i< this.rows;i++){
			const butID = 'qBut' + i + 'X0';
			const el = document.getElementById(butID);
			el.addEventListener('click', function(){
				gameQ.postQuestion(this.name,this.id);
			});
		}
	}

	setUpGameSpace(){console.log("GameQ.setUpGameSpace " + this.rows );
		if(this.rows == 0)this.rows = 7;
		bidButs.createButs(this.rows);
		let buf = "";
		for(let i = 0;i< this.rows;i++){
			const butID = 'qBut' + i + 'X0';
			buf+= `<tr><td><input type="button" class="butQ" id=${butID} value="${butID}"></td></tr>\n`;
		}
		const gameQButInsertPt = document.getElementById('gameQquestionInsertPt');//           console.log("  = " +  );
		gameQButInsertPt.innerHTML = gameQButInsertPt.innerHTML = buf;
	}

	changeScoreXX(gotItRight){ console.log(" changeScore = " +  gotItRight);
		
	}
	

	procAnsTypeT(x,y){console.log("this.recArray " +  x + ' y= ' + y);
        let rw = "W"
		for(let i = 0;i< this.recArray.length;i++){
			const rec = this.recArray[i];
			//console.log("this.recArray[i]= " + this.recArray[i]);

			const recParts = rec.split(';');

			if((x > Number(recParts[0]) && x < (Number(recParts[0]) + Number(recParts[2]))) &&  (y > Number(recParts[1]) && y < (Number(recParts[1]) + Number(recParts[3]))))  {
				console.log(i + " this.rightAnswer= " + this.rightAnswer + "  this.nameArray[i]=  " + this.nameArray[i]);
				if (this.nameArray[i] == this.rightAnswer) {
                    rw = "R"
				}

				/*for (let j = 0; j < this.rightAnsArray.length; j++) {
					console.log(" this.rightAnsArray[j] = " + this.rightAnsArray[j]);
					if (this.nameArray[i] == this.rightAnsArray[j]) {
						rw = "R"
						this.rightAnsArray[i] = "**";//Can't ans twice
					}
				}*/
			}			
		}
		console.log(" rw = " + rw);
		this.rw.push(rw);
		this.isTrgNbrReched();//If reached will check play
		this.nbrHit++;
		console.log("this.isTrgNbrReched()= " + this.isTrgNbrReched());
		if(this.isTrgNbrReched()){
			this.checkPlay();
		}
		
	}

	procAnsTypeM(ans){//
        console.log("gameQtypeM procTypeM ans= " +  ans );
		this.evalAns(ans);
		
	}


	resetQXX(){console.log("gameQ resetQ  = " +  this.rows);
		this.holdOverQArray = [];
		for (let i = 0;i < this.rows; i++){
			const butID = "qBut" + i + "X0";
			const el = document.getElementById(butID);
			if(el.disabled == true){
				console.log("disabled=true  = " +  butID);
				el.style="background-color: white;";
				el.disabled =false;
				el.style="background-color#e0fdff";
			}else{
				let buf = "";
				buf+= el.value + ';;';
				buf+= el.name;
				this.holdOverQArray.push(buf);
			}
		}
         //console.log("resetQ  this.holdOverQArray= " +  this.holdOverQArray);
		 this.fillQBoxes();
	}

	procAnsButtFileXX(){console.log("procAnsButtFile this.rndSerNbr= " + cp.rndSerNbr);
	   const buttonFile = this.gameDataArray.shift();//Usually Game type T with am image and overlay of hit areas
	   let butInfo = "";
	   if(this.cp.onServer){
			butInfo = getTextFile(buttonFile)
	   }else{
			this.butInfo = 	this.cp.ansButtons.getData(cp.rndSerNbr);
	   }
       //console.log("this.butInfo  = " + this.butInfo);

	   this.displayData = this.butInfo;

	   const tempArr = this.butInfo.split("Answers=");
	   let ansType = "";
	   [,ansType] = tempArr.shift().split("=");
	   ansType = ansType.charAt(0);
	   const pos = this.butInfo.indexOf("Answers=")
	   this.typeTAnswers = this.butInfo.slice(pos+8)
	   return ansType;
	}

	evalAnsXX(ans){console.log("evalAnswer = " +  ans);
		const indx = this.rightAnsArray.indexOf(ans);//           console.log("  = " +  );
		if(indx == -1 ){
			console.log("GameQ.falure");
			this.resetQ()
		}else{
			this.rightAnsArray.splice(indx, 1);//Remove the item.
		}
		if(this.rightAnsArray.length == 0){
			console.log("GameQ.SUCCESS")
			this.ansPending = false;
			this.changeScore(true);
			const el = document.getElementById(this.butBeingAnswered);
			el.value="";el.style="background-color: green";el.enabled=true;
		}
	}

	evalAnsXX(ans){console.log("evalAnswer = " +  ans);
		const n = this.rightAnsArray.indexOf(ans);//           console.log("  = " +  );
		if(n == -1 ){
			this.rw.push("W")
		}else{
			this.rw.push("R")
		}
		if(this.rightAnsArray.length == 0){
			console.log("GameQ.SUCCESS")
			this.ansPending = false;
			this.changeScore(true);
			this.blankQuestion(this.butBeingAnswered)
		}
	}

	fillQBoxesXX(){//	this.qbutIDArray= this.getButIDArray(this.rows, this.cols);
		 console.log("GameQ.fillQBoxes.this.holdOverQArray  = " +  this.holdOverQArray );//           console.log("GameQ  = " +  );
		 const nbrOfHoldOverQs  = this.holdOverQArray.length;//From the last play
		 if(this.qbutIDArray == null)this.qbutIDArray= this.getButIDArray(this.rows, this.cols);
		 const theAnsData = this.gameDataArray.shift();//We dump
		for (let i = 0;i < this.rows- nbrOfHoldOverQs; i++){
			this.holdOverQArray.push(this.gameDataArray.shift());
		}
		//console.log("GameQthis.holdOverQArray AA = " + this.holdOverQArray );
		const newArray = this.utl.mixUpArray(this.holdOverQArray);
		console.log("GameQthis.holdOverQArray BB = " + this.holdOverQArray );
		for (let i = 0;i < this.rows; i++){
			const butID = 'qBut'+ i + 'X0';//change to this.qbutIDArray
			console.log("GameQ.butID  = " + butID);
			const el = document.getElementById(butID);
			const aQandA = this.holdOverQArray.shift();
			console.log("GameQ.aQandA  = "   + aQandA);//What two presidents saw military action in WWI?;;Truman;Eisenhower,
			const qArray = aQandA.split(";");
			const theQ = qArray.shift();
			const theRef = qArray.shift();
			const theAns = qArray;//What we have left is/are the answers
			el.value = theQ;
			el.name = theAns;
		}
	}

	enableButxx(butID){
		const el = document.getElementById(butID);
		el.style="background-color: white;";
		el.disabled ="false";
	}

	disableButtonXX(butID){
		const el = document.getElementById(butID);
		el.value="";el.style="background-color: green";el.enabled=true;
	}
	procTypeGXX(){//AnswerType=GridOnImage AnsRows=4 AnsCols=4 Image=}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.JJ.gif Answers=Clinton;Bush;Reagan;
		console.log("GameQ.procTypeG.this.displayData= "  + this.displayData);
		const parms = this.displayData.split(" ");
		for (let i = 0;i < parms.length; i++){
            //console.log("GameQ parms[i]= " +  parms[i]);
			const twoParts = parms[i].split('=');
			this.parmMap.set(twoParts[0],twoParts[1]);//           console.log("  = " +  );
		}
		this.ansRows    = this.parmMap.get("AnsRows");
		this.ansCols    = this.parmMap.get("AnsCols");
		this.image      = this.parmMap.get("Image");
		const answers    = this.parmMap.get("Answers");//Example: Answers=Clinton;Bush;Reagan;Carter;
		this.ansArray = answers.split(";")            //Example:Clinton,Bush,Reagan,Carter,
		this.ansButIDArray = this.getButIDArray("GameContext.ui.ansBut",this.ansCols,this.ansRows);//Cols first because we got from left to right
		this.ansMap = new Map();
		for (let i = 0;i < this.ansButIDArray.length; i++){//this.parmMap.set(twoParts[0],twoParts[1]);
			this.ansMap.set(this.ansButIDArray[i],this.ansArray.shift());
		}

		console.log("this.ansMap,get('ansBut0X0'  = " +  this.ansMap.get('ansBut0X0'));
		this.addAnsImage();
		const el = document.getElementById('image');		
		this.imageWidth = el.naturalWidth;
		this.imageHeight = el.naturalHeight;
        //console.log("AA this.imageWidth = " +  this.imageWidth);
		this.getImageDinensions();//For some reason we need to do this outside thes function
	}

	procTypeGXXX(){console.log("++++++++++++ procTypeG "   + this.gameDataArray[0]);
		//this.rows = this.parmMap.get("Rows")
		//this.cols = this.parmMap.get("Cols")
       // console.log("rows  = " + this.rows + " this.cols = " +  this.cols);
	   const setUp =   this.gameDataArray.shift();
       console.log("  setUp "   + setUp);//

	   const pos = setUp.indexOf("Answers");
	   const parm  = setUp.substring


		const theFullImage = getImageFile(this.gameDataArray.shift(),"theImage");


		this.theImage = theFullImage[0]
        console.log("*******theImage  = " + this.theImage );
		const theImageMod = "<div id='baseImage'> " + theImage + "</div>"
        console.log("theImageMod  = " + theImageMod );

		this.gameInsrtPt.innerHTML = this.gameInsrtPt.innerHTML + this.theImage;
		this.theImageDoc = document.getElementById("gameQansInserPt");
		this.theImageDoc.addEventListener('click', function(){
			gameB.gridHit(event.offsetX,event.offsetY);
		});
		this.width = theFullImage[2];
		this.height = theFullImage[3]
		this.boxWidth = this.width/this.cols;
		this.boxHeight = this.height/this.rows;
		this.createGridMap(this.width,this.height,this.boxWidth,this.boxHeight,this.rows,this.cols);
		this.theRCAnswers = this.gameDataArray[0];
        console.log(" this.theRCAnswers = " + this.theRCAnswers );
		this.rightAnsArray	= this.theRCAnswers.split(";");			
		const theAnswers = this.gameDataArray.shift().split(";");//Usedfor the check mark//R1C1;R1C4;R2C3;R2C4;R3C2;R3C3;R3C4
		this.ansMax = theAnswers.length;
        console.log("||||||||this.ansMax  = " + this.ansMax + "  " + theAnswers );
		for (let i = 0;i < this.ansMax; i++){
			const temp = theAnswers.shift();
			const pos = temp.indexOf("C");
             console.log(temp + " | "  + pos + " = " + temp.slice(1,pos) + " **  " + temp.slice(pos+1,99));
			 const yy = temp.slice(1,pos)//Row comes first and it is the y position
			 const xx = temp.slice(pos+1,99)
			this.rightAnsArray.push(temp.slice(1,pos) + "," + temp.slice(pos+1,99));
			const xDotloc = (xx -1) * this.boxWidth + this.boxWidth/2 -8;// 1/2 the width of the dot
			const yDotloc = (yy -1) * this.boxHeight + 3;
			console.log("RC  " + temp +   " xDotloc  = " + xDotloc + " yDotloc  = " + yDotloc);
			this.ansDotLoc.push(temp + ";" + xDotloc + ";" + yDotloc) ;
		}
         console.log("|||||this.ansDotLoc  = " + this.ansDotLoc +  "   = " + this.rightAnsArray + " this.theRCAnswers = " + this.theRCAnswers + " this.rightAnsArray= "   + this.rightAnsArray);
	}

}