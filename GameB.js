// JavaScript source code

class GameB extends Game{//console.log("GameB  = " + );
	constructor (round,cp,utl,plu){
		console.log("GameB.constructor TOP"  );
		super (round,cp,utl,plu);
		this.cp = cp;
		this.utl = utl;
		this.plu = plu;
		this.itf;
		this.boxWidth;
		this.boxHeight;
		this.maxWidth;
		this.rightAnsArray=[];
		this.theRCAnswers;//used for type G
		this.playerArray = [];//The answers from each player
		this.curAnsCnt = 0;
		this.curWcnt = 0
		this.curRcnt = 0
		this.checkedRC = []
		this.ansDotLoc= [];
		this.theImage;
		this.theImageDoc;
		this.idArr=[];
		this.pSel=[4];
		this.gridMap;
		this.isSelMap;
		this.typeTAnswers;
		this.recArray=[];
		this.nameArray =[];
		this.image;
		this.imageName;
		this.imageArray =[];
		this.imageWidth;
		this.imageHeight;
		this.imagePath;
		this.theAnsBar;
		this.justAnswered = [];
		this.alreadyAnswered = [];
		this.hitCnt =0;
		this.butInfo="";
		this.ckMrks =[];
		this.dotId =[];
		this.imageInsertPt;
		this.gameInsrtPt;
		qBox;
		this.ansBarAllreadyAnswered = "";
	}

	init(){console.log("GameB.init TOP"  );
		super.init();
		this.gameInsrtPt = document.getElementById("gameInsrtPt");//
		this.getData();
		this.cp.itf.setFailedPlayCount(3);
		bidButs.startBidClock();
		console.log("GameB.init BBBBOTTOM "  +  this.gameInPlay  + "  this.theRCAnswer= " + this.theRCAnswers);// 
	}

	helloWorld(){
		console.log("GameB.helloWorld" );//console.log("GameA  = " + );
		super.helloWorld();
	}

	testA(){console.log("GameB testA()" );
		this.cleanPlayArea();

	}
	procTypeG() {
		console.log("++++++++++++ procTypeG ");

		this.rows = this.round.getAParm("Rows");
		this.rows = this.round.getAParm("Cols");

		//console.log("rows  = " + this.rows + " this.cols = " +  this.cols);

		const theFullImage = getImageFile(this.gameDataArray.shift(), "theImage");
		this.theImage = theFullImage[0]
		//console.log("*******theImage  = " + this.theImage );
		//const theImageMod = "<div id='baseImage'> " + theImage + "</div>"
		console.log("#####this.theImage  = " + this.theImage);
		this.gameInsrtPt.innerHTML = this.gameInsrtPt.innerHTML + this.theImage;
		this.theImageDoc = document.getElementById("theImage");
		this.theImageDoc.addEventListener('click', function () {
			gameB.gridHit(event.offsetX, event.offsetY);
		});
		this.width = theFullImage[2];
		this.height = theFullImage[3]
		this.boxWidth = this.width / this.cols;
		this.boxHeight = this.height / this.rows;
		this.createGridMap(this.width, this.height, this.boxWidth, this.boxHeight, this.rows, this.cols);
		this.theRCAnswers = this.gameDataArray[0];
		console.log(" this.theRCAnswers = " + this.theRCAnswers);
		this.rightAnsArray = this.theRCAnswers.split(";");
		let rightAnCount = this.rightAnsArray.length
		console.log(" rightAnCount = " + rightAnCount);
		console.log(" this.rightAnsArray[rightAnCount-1] = " + this.rightAnsArray[rightAnCount - 1]);

		if (this.rightAnsArray[rightAnCount - 1] == "") {
			rightAnCount--//The last char could be a ;
		}
		console.log("%%%%%% this.rightAnsArray = " + this.rightAnsArray + "   " + this.rightAnsArray.length);
		const theAnswers = this.gameDataArray.shift().split(";");//Usedfor the check mark//R1C1;R1C4;R2C3;R2C4;R3C2;R3C3;R3C4
		bidButs.topBid = rightAnCount;
		this.createButs(rightAnCount, "B");//Includes fillBoxes


		//console.log("||||||||bidButs.topBid  = " + bidButs.topBid + "  " + theAnswers );
		for (let i = 0; i < bidButs.topBid; i++) {
			const temp = theAnswers.shift();
			const pos = temp.indexOf("C");
			//console.log(temp + " | "  + pos + " = " + temp.slice(1,pos) + " **  " + temp.slice(pos+1,99));
			const yy = temp.slice(1, pos)//Row comes first and it is the y position
			const xx = temp.slice(pos + 1, 99)
			this.rightAnsArray.push(temp.slice(1, pos) + "," + temp.slice(pos + 1, 99));
			const xDotloc = (xx - 1) * this.boxWidth + this.boxWidth / 2 - 8;// 1/2 the width of the dot
			const yDotloc = (yy - 1) * this.boxHeight + 3;
			//console.log("RC  " + temp +   " xDotloc  = " + xDotloc + " yDotloc  = " + yDotloc);
			this.ansDotLoc.push(temp + ";" + xDotloc + ";" + yDotloc);
		}
		//console.log("|||||this.ansDotLoc  = " + this.ansDotLoc +  "   = " + this.rightAnsArray + " this.theRCAnswers = " + this.theRCAnswers + " this.rightAnsArray= "   + this.rightAnsArray);
	}


	checkPlay(reason){console.log("*|*GameB.checkPlay reason= " + reason + " justAnswered= " + this.justAnswered )
		this.playOn = false;//so players can't continue to hit
		const nbrHit = this.justAnswered.length;
		if(nbrHit != bidButs.topBid){
			cp.itf.displayPtsThisPlay("failed","Unsufficient number of answers");
			return;
		}
		let results = ",";
		let pf = "passed";
		const nbrRight = 0;
        //console.log(" this.theRCAnswer " + this.theRCAnswer )	
        console.log(" this.rightAnsArray " +  this.rightAnsArray)
		let  gotOneWrong = false;
		for (let i = 0;i < nbrHit; i++){//this.rightAnsArray
			console.log(" this.justAnswered[i] " + this.justAnswered[i]);
			const pos = this.rightAnsArray.indexOf(this.justAnswered[i]);
			console.log(" pos= " + pos + "   = " + this.justAnswered[i])		
			if(pos == -1){
				if(!gotOneWrong){
					results+=  "  Sorry!\n At least one was wrong.";
					gotOneWrong = true;
				}
				pf = 'failed';
			}
		}
		if(pf == "failed"){console.log("failed  this.ansBarAllreadyAnswered= " + this.ansBarAllreadyAnswered)
			if(this.typeGame == "T"){
				this.theAnsBar.textContent = this.ansBarAllreadyAnswered;
			}else{
				this.unCheckCells();
				this.checkedRC = [];
			}
		} else {
			console.log("success  this.ansBarAllreadyAnswered= " + this.ansBarAllreadyAnswered)
			results+=  "CORRECT!"
			this.markTheImages();
			if(this.typeGame == "T"){
				this.ansBarAllreadyAnswered = this.theAnsBar.textContent;
				console.log(" this.ansBarAllreadyAnswered= " + this.ansBarAllreadyAnswered)
			}

			bidButs.reduceButtons(nbrHit);

			////if(this.typeGame != "G"){//It would be R1C3 
				////this.addToQBar(this.justAnswered);
			////}
			for (let i = 0;i < this.justAnswered.length; i++){
				this.alreadyAnswered.push(this.justAnswered[i])
			}
		}
		//if(this.theAnsBar != undefined){
			//this.theAnsBar.textContent = "";
		//}
		this.playOn = false;
		const winColor = bidButs.whoHasBid;
        console.log("GameB---pf=  " + pf + " results=  " + results)
		 results

		cp.itf.displayPtsThisPlay(pf,results);
	}

	addToQBar(txt){console.log("addToQuestionBar " +  txt)//Clean out wrong answers
		const x = qBox.textContent;
        console.log(" x= " + x)
		qBox.textContent =  x + ", " +  txt;
	}
	// https://trivia-smackdown.com/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Pe/Le/Po/US/Pr/16PopPres/16PopPres.NK.gif 404 (Not Found)


	procAnsTypeT(x,y){console.log("procAnsTyprT butTarg= " + bidButs.topBid );
        if(!cp.itf.playInProgress){
			alert("You need to select a number Button first.")
			return;
		}
		const anAns = this.getTextAnsFmXY(x,y);
		console.log("anAns= " + anAns );
		
		this.addToAnsBar(anAns);
		this.justAnswered.push(anAns)
		if(++this.curAnsCnt == bidButs.topBid){
			console.log("targNbr reached "  )		
			stopTheClock();
			this.checkPlay("Target Nbr Reached");
		}
		
	}

	addToAnsBar(ans){console.log("addToAnsBar ans= " + ans    )
		const x = this.theAnsBar.textContent;
		console.log("x== " + x   )
		this.theAnsBar.textContent = ans + "," + x;
	}


	setAnsBar(){console.log("Game B setAnsBar " )//For game type T 
		this.theAnsBar = document.getElementById('ansBar');
		this.theAnsBar.textContent = "-"
	}



	getTextAnsFmXY(x,y){console.log("getTexAnsFmXY "  )		
		let anAns = "";
		let gotAHit = false;
		for(let i = 0;i< this.recArray.length;i++){
			const rec = this.recArray[i];
			const recParts = rec.split(';');
			if((x > Number(recParts[0]) && x < (Number(recParts[0]) + Number(recParts[2]))) &&  (y > Number(recParts[1]) && y < (Number(recParts[1]) + Number(recParts[3])))){
				gotAHit = true;
				anAns = this.nameArray[i];
				if(this.hasThisBeenAnswered(anAns)){
					alert("This has already been answered!")
					return;
				}
				return anAns;
			}
		}
		return null;
	}

	hasThisBeenAnswered(anAns){console.log("hasThisBeenAnswered? "  +  anAns)
		const alreadyAnsCnt = this.alreadyAnswered.length;
		const justAnsweredCnt = this.justAnswered.length;
		console.log("alreadyAnsCnt= "  +  alreadyAnsCnt)
		console.log("justAnsweredCnt= "  +  justAnsweredCnt)

		for(let i = 0;i< justAnsweredCnt;i++){
			console.log("this.alreadyAnswered.indexOf(anAns)= "  +  this.alreadyAnswered.indexOf(anAns))
			if (this.justAnswered.indexOf(anAns) != -1) {
				postNotice("This has already been answered")
				return true;
			}
		}
		for(let i = 0;i< alreadyAnsCnt;i++){
			console.log("this.alreadyAnswered.indexOf(anAns)= "  +  this.alreadyAnswered.indexOf(anAns))
			if (this.alreadyAnswered.indexOf(anAns) != -1) {

				postNotice("This has already been answered")
				return true;
			}
		}
		const justAnsCnt = this.justAnswered.length;
		for(let i = 0;i< justAnsCnt;i++){
			if(this.justAnswered.indexOf(anAns) > 0){
				postNotice("This has already been answered")
				return true;
			}
		}
		return false;
	}



	cleanPlayArea(){console.log("******GameB cleanUpPlayArea  "  );//this.theAnsBar
		super.cleanPlayArea();
		for(let j = 0;j <this.dotId.length;j++){
			const el = document.getElementById(this.dotId[j]);
			if(el!= null)el.remove();
		}
		if(this.theAnsBar != undefined){
			this.theAnsBar.style="display: none;";
		}
		if(this.imageInsertPt != undefined){
			this.imageInsertPt.innerHTML = "";
			const collection = this.imageInsertPt.children ;
			for(let j = 0;j <collection.length;j++){
				collection[j].remove();
			}
		}
		if(this.gameInsrtPt != undefined){
			const collection = this.gameInsrtPt.children ;
			for(let j = 0;j <collection.length;j++){
				collection[j].remove();
			}
		}
	}

	getData(){console.log("$$$GameB getData  "  );
		const typeDisplay = this.round.getAParm("Type");
		 console.log("typeDisplay=  " + typeDisplay );
		this.typeGame = typeDisplay.charAt(0);
        console.log("$$$GameB typeGame= " + this.typeGame + "  typeDisplay = " +typeDisplay);
		if(this.typeGame == "A"){//answerButton file that has to be retrieved  For offnet
			this.typeGame =	this.procAnsButtFile();		
		}
        console.log("this.typeGame  = " + this.typeGame);
		switch (this.typeGame){
			case 'G':
				this.procTypeG();
				break;
			case 'M':
				this.procTypeM();
				break;
			case 'T':
				this.procTypeT();
				break;
		}

		this.playOn = true;
		cp.itf.playInProgress = false;
		//console.log(" getData bottom bidButs.topBid= " + bidButs.topBid);
	} 

	ckMarkIt(theAns){console.log("ckMarkIt " +  theAns );//Place the ckMark into the image
		const rc  = "div" + theAns;
		//console.log("****rc = " + rc)
		const theMiddlePt =this.maxWidth/2
		const anImageDoc = document.getElementById(rc);//../DataBase/A65AA65A/ResLibry/
		let buf = ""
		if(onNet){
			//buf+= "<img src='../DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
			buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
		} else {
		if(onLapTop){
				buf+= "<img src='ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
			}else{
				buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
			}				
		}
		buf+= " ' style=' left:-";//class='gameBtypeMDot
		buf+= theMiddlePt+ "px;   position:relative' top:+20; id='ckMrk";//top:-100px;//
		buf+= theAns; 
		buf+= "' width='17' class='ckMrk' height='16'";
		buf+= "  />";

		const aDot = document.getElementById(rc);
		anImageDoc.innerHTML = anImageDoc.innerHTML + buf;
		console.log("MkImage *buf = " + buf)
		
		this.checkedRC = [];
	}

	markTheImages(){console.log("markTheImages " +  this.checkedRC );//Place the ckMark into the image
		for (let i = 0;i < this.checkedRC.length; i++){
			const theAns = this.checkedRC[i];
			const rc  = "div" + theAns;
			//console.log("****rc = " + rc)
			const theMiddlePt =this.maxWidth/2
			const anImageDoc = document.getElementById(rc);//../DataBase/A65AA65A/ResLibry/
			let buf = ""
			if(onNet){
				//buf+= "<img src='../DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";

			} else {
				if(onLapTop){
					buf+= "<img src='ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";			
				}else{
					buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				}
			}
			buf+= " ' style=' left:-";//class='gameBtypeMDot
			buf+= theMiddlePt+ "px;   position:relative' top:+20; id='ckMrk";//top:-100px;//
			buf+= theAns; 
			buf+= "' width='17' class='ckMrk' height='16'";
			buf+= "  />";

			const aDot = document.getElementById(rc);
			anImageDoc.innerHTML = anImageDoc.innerHTML + buf;
			//console.log("MkImage *buf = " + buf)
		}
		this.checkedRC = [];
	}

	recordImageHit(theAns){console.log("recordImageHit= " + theAns)
		this.checkedRC.push(theAns);
	}

	//The button file is created for large answer lists
	procAnsButtFile(){console.log("procAnsButtFile this.rndSerNbr= " + this.round.getSerNbr());
	    const buttonFile = this.gameDataArray.shift();//Usually Game type T with am image and overlay of hit areas
		//console.log("buttonFile= " + buttonFile);
	   let butInfo = "";
	   if(this.cp.onServer){
			butInfo = getTextFile(buttonFile)
	   }else{
			this.butInfo = 	this.cp.ansButtons.getData(this.round.getSerNbr());
	   }
       //console.log("this.butInfo  = " + this.butInfo);
	   const tempArr = this.butInfo.split("Answers=");
	   let ansType = "";
	   [,ansType] = tempArr.shift().split("=");
	   ansType = ansType.charAt(0);
	   const pos = this.butInfo.indexOf("Answers=")
	   this.typeTAnswers = this.butInfo.slice(pos+8)
	   return ansType;
	}

	createGridMap(imageWidth,imageHeight,boxWidth,boxHeight,nbrRows,nbrCols){//console.log("createGridMap"  );
		this.gridMap = new Map();
		for (let i = 0;i < nbrRows; i++){
			for (let j = 0;j < nbrCols; j++){
				const rc =  "R" +( i +1) + "C" + (j +1); 
				const ptX = j * boxWidth;
				const ptY = i * boxHeight;
				const ptArr = [ptX,ptY];
				this.gridMap.set(rc,ptArr)
			}
		}
	}

	reset(){console.log("GameB reset"  );
		this.justAnswered = [];
		this.curAnsCnt = 0;
		this.curWcnt = 0
		this.curRcnt = 0
		this.ansCkd = "";
		this.checkedRC = [];
	}

	procTypeT(displayData){//Transparent buttons//		this.rightAnsArray = []
         console.log("||GameB this.gameDataArray[0] = " + this.gameDataArray[0]);
		this.setAnsBar();
		this.rightAnsArray = this.gameDataArray[0];
		if(this.rightAnsArray.endsWith(";"))this.rightAnsArray = this.rightAnsArray.substring(0,this.rightAnsArray.length-1);
		this.rightAnsArray = this.rightAnsArray.split(";");
		bidButs.createButs(this.rightAnsArray.length);
        console.log(" bidButs.topBid = " + bidButs.topBid);
		this.displayData = this.butInfo;
		let pos1 = this.displayData.indexOf("Image=");
		let pos2 = this.displayData.indexOf("Answers=");
		this.image = this.displayData.substring(pos1+6,pos2 -1 );
		this.answers = this.displayData.substring(pos2+8)
		const imageArray = [this.image];
		const nameArray = ["map1"];
		this.addAnsImage(imageArray,nameArray);
		const answerArray = this.answers.split(";")

		for(let i = 0;i< answerArray.length;i++){
			const parts = answerArray[i].split(' ');//example={H-1black 206075010157 Jordan River
			const part1 = parts.shift();
			const loc = parts.shift();
			const nameX = parts;//What is left.
			const name = String(nameX).replaceAll(',',' ');
			const rec = loc.slice(0,3) + ";" + loc.slice(3,6) + ";" +loc.slice(6,9) + ";" + loc.slice(9,12);
			this.recArray.push(rec);
			this.nameArray.push(name);
		}

	}






	resetTypeT(){ 
		this.theAnsBar.textContent= "";
	}

	checkTypeTAns(){console.log("checkTypeTAns " +  this.justAnswered )
		const pf = failed;
		for(let i = 0;i< this.justAnswered.length;i++){
			if(this.rightAnsArray.indexOf(this.justAnswered[i]) == -1 ){
				console.log("failed "  )
			}
		}
	}





	addAnsImage(imageArray,nameArray){console.log("|-|-|GameB.addAnsImage imageArray= " + imageArray ); //         console.log("  = " +  );
		
		const images = [];
			//console.log("imageArray.length= " +  imageArray.length);
		for (let i = 0;i < imageArray.length; i++){
			//ImageArray file example= }P.AA.Pi.Ge.No.No.US.MA.General-2.JF.gi
			const ip = getImageFile(imageArray[i],nameArray[i])[0];
			//console.log("ip  = " +  ip);
			images.push(ip);
		}//We add up the images and insrt them
		let buf = "";
		for (let i = 0;i < images.length; i++){
			buf+= images;
		}
        ///console.log("buf  = --" + buf + "--");
		this.imageInsertPt= document.getElementById('imageInsertPt');//^^This should be a universal point
		this.imageInsertPt.innerHTML = this.imageInsertPt.innerHTM + buf;
		this.imageInsertPt.innerHTML =  buf;
		for (let i = 0;i < images.length; i++){
			const el = document.getElementById(nameArray[i]);
				el.addEventListener('click', function(event) {
				//console.log('X: ' + event.offsetX + ', Y: ' + event.offsetY + "," + nameArray[i]);
				gameB.procAnsTypeT(event.offsetX,event.offsetY);
			});
		}
	}

// this.roundMap.set('AA.Ben00021',',AA.Ben00021,Ed-U-Games tm,20210410,9,LoStQu ,GeNoNoUSNY ,NoNoUSNY ,GeStNY,quarters;new york,}P.AA.Pi.Th.Cu.US.Co.Qu.St.OR.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.NV.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.NY.EE.jpg,aPRA1_85 zPRA1_30,,,,Pick out 1 of 3 quarters for New York,US/States/Quarters,Check the quarter from the state of New York.,,Type=MultipleResourcess,}P.AA.Pi.Th.Cu.US.Co.Qu.St.OR.EE.jpg selected=No,}P.AA.Pi.Th.Cu.US.Co.Qu.St.NV.EE.jpg selected=No,}P.AA.Pi.Th.Cu.US.Co.Qu.St.NY.EE.jpg selected=Yes');

	

//                                             console.log("  = " + );
	setUpMultiImageTable(tblLayout,imageFileArr,selYesNo){console.log("setUpMultiImageTable" + tblLayout);
		let rows = 0;
		let cols = 0;
		let tblWidth = 0;
		[rows,cols] = tblLayout.split(",");
		this.isSelMap = new Map();
		let cnt =0;
		this.maxWidth = 0;
		let buf = "<table border='1'>"
			for (let i = 0;i < rows; i++){
				buf+= "<tr>\n"
				for (let j = 0;j < cols; j++){
					const id = "R" + (i+1) +"C" + (j+1);//this.rightAnsArray
					buf+= "<td><div id='div"
					buf+= id + "'/>\n"

					this.isSelMap.set(id,selYesNo[cnt]);
					console.log("$$$$selYesNo[cnt]  = " + selYesNo[cnt]);
					 if(selYesNo[cnt] == "Yes"){

						 this.rightAnsArray.push(id)

					 }
					bidButs.topBid = this.rightAnsArray.length
                   console.log(cnt + " $$theImage$$  = " + imageFileArr[cnt]);

					console.log(bidButs.topBid + " ||*^^*|| " + this.rightAnsArray);
					this.idArr.push(id);//THis is for the event listener

					const theImage =getImageFile(imageFileArr[cnt++],id,"class='gameBImage'");

					const theImageWidth = theImage[2];
					if(theImageWidth > this.maxWidth){
						this.maxWidth = theImageWidth;
					}

					buf+= theImage[0];
					//buf+= getImageFile(imageFileArr[cnt++],id);
					buf+=  "</div></td>"
				}
				buf+=  "</tr>"
			}
		buf+="</table>";
        console.log("buf  = " + buf );

		this.gameInsrtPt.innerHTML = this.gameInsrtPt.innerHTML + buf;
        console.log("******this.rightAnsArray  = " + this.rightAnsArray );
		bidButs.createButs(this.rightAnsArray.length);
        console.log("this.maxWidth  = " + this.maxWidth );
		this.addEventListenersToMultiImages(this.idArr);//                                             console.log("  = " + );

	}

	reAddEventListener(theID){console.log("reAddEventListener  = " + theID);
		const anImage = document.getElementById(theID);
		anImage.addEventListener('click', function(){
            console.log("**MI anImage.id  = " );
			gameB.aHit(anImage.id);//This is n aRC
		});
	}



	addEventListenersToMultiImages(idArr){console.log("addEventListenersToMultiImages  = " + idArr);
		for (let i = 0;i < idArr.length; i++){
			const theID = idArr[i];
			const anImage = document.getElementById(theID);
			if(anImage == null)break;
			anImage.addEventListener('click', function(){
                console.log("MI anImage.id  = " + anImage.id);
				gameB.aHit(anImage.id);//This is n aRC
			});
		}
	}
//                                             console.log("  = " + );	



	typeMHit(theRC) {
		console.log("typeMHit  = " + theRC);	//this.playerArray

	  	if(!cp.itf.playInProgress){
			cp.itf.postNotice("You need to Bid First.")
			return;
		}
		const isRight = this.isSelMap.get(theRC);

		if(isRight == "Yes"){
			this.curRcnt++;
		}else{
			this.curWcnt++
		}
        console.log("isRight  = " +isRight + " this.curRcnt = " + this.curRcnt );
		console.log("typeMHit isRight  = " + isRight);

		for (let i = 0;i < this.checkedRC.length; i++){
             console.log(theRC + "  === " + this.checkedRC[i]);
			if(theRC == this.checkedRC[i]){
				alert("You have already checked this one")
				return;
			}
		}
		this.checkedRC.push(theRC)
		console.log( bidButs.topBid +  "  ||this.checkedRC=	"  + this.checkedRC	);
		if(this.checkedRC.length == bidButs.topBid){
           console.log("this.curRcnt  = " +this.curRcnt );
           console.log("this.curWcnt  = " +this.curWcnt );		   
			this.playerArray[this.pNbr] = this.curRcnt,this.curWcnt;
			this.changePlayers();
		}

	}

//                                             console.log("  = " + );	

	grenDotIt(theRC){console.log(" grenDotIt  " + theRC);	
		let xPt =0;let yPt=0
		let buf = ""
		if(onNet){
			//buf+= "<img src='../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
			  buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
		} else {
			if(onLapTop){
				buf+= "<img src='ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
			}else{
			    buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
			}			
		}

		const theID ="dot" + theRC
		buf+="id='" + theID + "'"
		buf+= " width='17' class='dot' height='16' />";
        console.log("buf  = " + buf);
		this.dotId.push(theID);//Needed for cleanup
		this.gameInsrtPt.innerHTML = this.gameInsrtPt.innerHTML + buf;
		console.log("theRC  = " + theRC);
		const aDot = document.getElementById(theID);
		const ptt = this.gridMap.get(theRC);
        console.log(" ptt = " + ptt);
		const pos = ptt.indexOf(",");
		xPt = Number(ptt.slice(0,pos));// -(n*11)
		//yPt = Number(ptt.slice(pos,9)) +(i * 20);
		yPt = Number(ptt.slice(pos,9));
        console.log(" ptt  = " + ptt + " theRC  = " + theRC + " xPt = " + xPt+ " yPt = " +yPt);
		aDot.style=`left: ${xPt}px; top:${yPt}px; z-index:50; `//
		this.theImageDoc = document.getElementById("theImage");

		this.theImageDoc.addEventListener('click', function(){
			gameB.gridHit(event.offsetX,event.offsetY);
		});
        console.log(" xx  = " + aDot.offsetLeft + " yy  = " + aDot.offsetTop )
	}

	

	getRCFmHit(x,y){
		let rowNbr =0;
		let colNbr = 0;
		let n = this.boxHeight		
		let ansRow = 0
		for (let i = 0;i <= this.rows; i++){
			if(y < n){
				ansRow = i + 1;
				break;
			}else{
				n+= this.boxHeight;
			}
		}
		let ansCol = 0;
		n= this.boxWidth;
		for (let i = 0;i <= this.cols; i++){
			if(x < n){
				ansCol = i + 1;
				break;
			}else{
				n+= this.boxWidth;
			}
		}
        console.log("  ansCol= " + ansCol + "  ansRow= " + ansRow);
        const theRC = "R"+ansRow+"C"+ansCol;
		return theRC;
	}

	isAllreadyAnswered(theRC){
		const pos = this.alreadyAnswered.indexOf(theRC);
		if( pos > -1){
        console.log("alreadyAnswered = true");
			return true;
		}else{
			return false;
		}
	}


	aHit(theAns) {
		console.log("***aHit theAns= " + theAns + " this.typeGame " + this.typeGame + " topBid= " + bidButs.topBid)
		if (biddingInProgress) {
			return;
		}
		
		for (let i = 0;i < this.justAnswered.length; i++){
			if(theAns == this.justAnswered[i]){
				//alert("Already Answered.");
				return;
			}
		}
		if(this.isAllreadyAnswered(theAns)){
			alert("Already Answered.")
			return;
		}
		console.log("-" + this.typeGame + "  targNbr= " +  bidButs.topBid  +  "   hitCnt= " + this.hitCnt)
		if(this.typeGame != "T"){
			if(this.typeGame == "G"){
				this.grenDotIt(theAns);
			}
			if(this.typeGame == "M"){
				this.recordImageHit(theAns)
			}
			this.justAnswered.push(theAns);

			if(++this.hitCnt == bidButs.topBid){
				console.log(" XXX = "  );
				stopTheClock("Hit Count Reached");
				this.checkPlay("hit count reached");
			}
		}
        console.log(" aHit Bottom = " + theAns + "  " + this.checkedRC.length);
	}



	gridHit(x,y,id){ console.log("gridHit  pNbr= " + this.pNbr + " x=  " + x +   " y=  " + y );
		const theAns = 	this.getRCFmHit(x,y);
        console.log(" theAns = " + theAns)
		this.aHit(theAns);
	}

	startPlay(trgHitNbr){console.log("GameB  startPlay " + trgHitNbr )
		//bidButs.topBid = trgHitNbr;
		this.hitCnt = 0;
		this.justAnswered = [];
		this.playOn = true;
	}

//        console.log("  " + )		



	unCheckCells(){console.log("B unCheckCells  this.justAnswered=  "  + this.justAnswered )
		const nbr = this.justAnswered.length;
		let rc = "";
		for (let i = 0;i < nbr; i++){
			if(this.typeGame == "G"){
				rc = "dot" + this.justAnswered[i]
			}else if(this.typeGame == "M"){
				rc = "ckMrk" + this.justAnswered[i];
				//this.reAddEventListener(rc);
			}

			console.log(" rc= " + rc)		
			const el = document.getElementById(rc);
			if (el != null) {
				el.remove();
			}

			//el.parentNode.removeChild(el);
		}
	}

	//                                             console.log("  = " + );

	procTypeM() {
		console.log("procTypeM() length= " + this.gameDataArray.length);
		//console.log("  this.gameDataArray= " + this.gameDataArray)

		const theImages = this.gameDataArray
		const nbrOfImages = this.gameDataArray.length//this.rightAnsArray

		const imageArr = [];
		const isSelArr = [];
		let theImage = ""
		let temp = ""
		let junk = ""
		let selYesNo = ""
		let rightAnCount = 0;
		for (let i = 0; i < nbrOfImages; i++) {
			//console.log("this.gameDataArray[i]  = -" + this.gameDataArray[i] + "-");
			if (this.gameDataArray[i].length == 0) {
				break;
			}
			[theImage, temp] = this.gameDataArray[i].split(" ")//}P.AA.Pi.Th.Cu.US.Co.Qu.St.LA.EE.jpg selected=Yes
			imageArr.push(theImage);
			[junk, selYesNo] = temp.split("=")
			if(selYesNo == 'Yes')rightAnCount++;
			isSelArr.push(selYesNo);			
		}

		bidButs.topBid = rightAnCount;
		this.createButs(rightAnCount, "B");//Includes fillBoxes



		//console.log("imageArr  = " + imageArr);
		//console.log("isSelArr  = " + isSelArr);//No,Yes,No,Yes,No,Yes

		const tblLayout = this.returnTblLayout(nbrOfImages);

		this.setUpMultiImageTable(tblLayout, imageArr, isSelArr);

	}




//                                             console.log("  = " + );




	placeMultiImageCheckMarks(){console.log("placeMultiImageCheckMarks= " +  this.rightAnsArray);//this.rightAnsArray

		for (let i = 0;i < this.rightAnsArray.length; i++){
			const rc  = "dot" + this.rightAnsArray[i]
			console.log("****rc = " + rc)
			const theMiddlePt =this.maxWidth/2
			const anImageDoc = document.getElementById(rc);
			let buf = ""
			if(onNet){
				//buf+= "<img src='../DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";

			} else {
			if(onLapTop){
					buf+= "<img src='ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				}else{
					buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				}
			}

			buf+= " ' style=' left:-";//class='gameBtypeMDot
			buf+= theMiddlePt+ "px;   position:relative' top:+20; id='";//top:-100px;//
			buf+= rc; 
			buf+= "' width='17' class='dot' height='16'";
			buf+= "  />";
			const aDot = document.getElementById(rc);
			//aDot.style=`left: 30px; top:10px; z-index:50; `// 
			anImageDoc.innerHTML = anImageDoc.innerHTML + buf;
			console.log("****buf = " + buf)
		}
	}


	placeGridCkMrks(){console.log("**********placeGridCkMrks" );
		const theImage = document.getElementById("baseImage");
		//this.ansDotLoc =  "R1C1;46;44,R3C4;382;220,3XXX;270;44,4XXX;1XXX;46;44,2XXX;158;44,3XXX;270;44,4XXX;383;44,5XXX;46;132,6XXX;158;132,7XXX;270;132,8XXX;383;132,AXXX;46;220,BXXX;158;220,CXXX;270;220,DXXX;383;220,EXXX;46;308,FXXX;158;308,GXXX;270;308,HXXX;383;308";

		console.log(this.theImage)
		for (let i = 0;i < this.ansDotLoc.length; i++){//this.ansDotLoc.length
			let xLoc=0;let yLoc=0; let rc = "";
			[rc,xLoc,yLoc,] = this.ansDotLoc[i].split(";");

			console.log(" +++++++  " + this.ansDotLoc[i] + "  "+  rc + "  " + xLoc + "  " + yLoc)
			let buf = "";
			if(onNet){
				//buf+= "<img src='../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg' class='redCkMrk' id='dot";
				buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg' class='redCkMrk' id='dot";

			} else {
			if(onLapTop){
					buf+= "<img src='ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg' class='redCkMrk' id='dot";
				}else{
					buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg' class='redCkMrk' id='dot";
				}
			}

			buf+= rc; 
			buf+= "' width='17' class='redCkMrk' height='16'";
			buf+= "  />";

			console.log("****buf = " + buf)
            //console.log("this.theImage  = " + this.theImage);
			//const theImage = document.getElementById("theImage");
			//theImage.innerHTML = theImage.innerHTML + buf;

			this.gameInsrtPt.innerHTML = this.gameInsrtPt.innerHTML + buf;

			const aDot = document.getElementById("dot" + rc);//style='position: absolute; left:100px; top: 100px;'
			//xLoc-= (i * 12);//The size of the last dot. A work around to conpensate

			aDot.style=`left: ${xLoc}px; top:${yLoc}px; z-index:50; `//
			

			//console.log(" yLoc=  " + yLoc)
			//aDot.style.top=yLoc;
			//aDot.style=`left: ${xLoc}px; top:50px; z-index:50;`
		}
	}	
//                                             console.log("  = " + );





	placePlayerDots(){console.log("*********placePlayerDots "   )

		for (let i = 0;i < this.pMax; i++){
			let n=0;
			console.log("----"   + this.pSel[i])//R1C4,R1C3,R1C2,R1C1,R2C1,R2C2,R2C3
			const arr = this.pSel[i];
            console.log("arr  = " + arr);
			const capColor = this.plu.getCapColor(i);//console.log(" capColor = " + capColor);
			let xPt =0;let yPt=0
			for (let j = 0;j < arr.length; j++){


				const theRC =arr[j];
				let buf = "";
				if(onNet){
					//buf+= "<img src='../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/";
					buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/";					

				} else {
					if(onLapTop){
						buf+= "<img src='ResLibry/Pi/Th/Sy/To/";
					}else{
						buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/"
					}									
				}

				buf+=capColor;
				buf+="Dot/";
				buf+=capColor;
				buf+="Dot.AA.jpg' id='";
				const theID = capColor + n++;
				buf+=theID
				buf+= "' width='17' class='dot' height='16' ";
				buf+= "name='";
				buf+= this.plu.players[i].name;
				buf+= n;
				buf+= "'  />";
                console.log("buf  = " + buf);
				this.gameInsrtPt.innerHTML = this.gameInsrtPt.innerHTML + buf;
				console.log("theRC  = " + theRC);
				const aDot = document.getElementById(theID);
                console.log(" aDot.name  = " + aDot.name)
				const ptt = this.gridMap.get(theRC);

				const pos = ptt.indexOf(",");
				xPt = Number(ptt.slice(0,pos));// -(n*11)
				yPt = Number(ptt.slice(pos,9)) +(i * 20);
                console.log(" ptt  = " + ptt + " theRC  = " + theRC + " xPt = " + xPt+ " yPt = " +yPt);

				aDot.style=`left: ${xPt}px; top:${yPt}px; z-index:50; `//
                console.log(" xx  = " + aDot.offsetLeft + " yy  = " + aDot.offsetTop )


			}
		}
	}
	returnTblLayout(n){console.log("returnGridInfo n= "  + n);//For Multiple Images
		let cols = 0;
		let rows = 0;
		if(n < 4){
			rows =1;cols=3;
		}else if(n < 5){
			rows =2;cols=2;
		}else if(n < 7){
			rows =2;cols=3;
		}else if(n < 9){
			rows =2;cols=4;
		}else if(n == 9){
			rows =3;cols=3;
		}else if(n < 13){
			rows =3;cols=4;
		}else if(n == 16){
			rows =4;cols=4;
		}else if(n < 17){
			rows =4;cols=4;
		}else if(n < 21){
			rows =4;cols=5;
		}else if(n < 25){
			rows =4;cols=6;
		}
		console.log("rows  = " +rows+ " cols = " +cols);
		return rows + "," + cols ;

	}





//                                             console.log("  = " + );
}

