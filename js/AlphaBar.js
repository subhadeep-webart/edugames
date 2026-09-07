// JavaScript source code

class AlphaBar{
	//constructor (cp,ansFile,ansLstFileDotPath){ 
	constructor() {console.log("abp constructor top  ")		//console.log("GameU.this.butHitArray "  + this.butHitArray);//So we can reset them
		
		this.rightAns;//AlphaButtons(this.cp.sampleData,this.rightAns,this);
		this.butLine;
		this.playerAnswering = 0;
		//this.alphaLeft = null;
		//this.alphaRight = null;
		this.test = true;
		this.bidTime = 15;
		this.playDetails = [];
		this.proposedAns = "";
		this.playeHasPlay = false;
		this.dropDownMenuIsUse = null;
		this.dropDownMenuLeft = null;
		this.dropDownMenuRight = null;
		this.ansLstFileDotPath = "";
		this.ansLstIndex = [];
		this.ansLst = [];
		this.alphaButsCreated = false;
		this.init();
	}

	init() {
		console.log("abp init top  ")
		//this.downloadAnsLst(this.ansFile);
		this.placeButsLR();
		this.createButtonEventListeners();
		this.alphaButsCreated = true;
		this.showAlphaButtons();

		//showAlphaButtons();
		//hideAlphaButtons();

		//hideAlphaButtons();
		this.addSelectionListener();

		console.log("abp init bottom  ")
	}

	loadDataxx(ansLstFileDotPath, rightAns) {
		console.log("abp loaddata top  "  +  ansLstFileDotPath + " - " + rightAns )
		this.rightAns = rightAns;
		this.ansLstFileDotPath = ansLstFileDotPath;
		this.downloadAnsLst(ansLstFileDotPath);	
		console.log("abp loaddata bottom  " + this.ansLstFileDotPath + " - " + rightAns)
	}

	loadData(ansFile, ansLstFileDotPath) {
		console.log("abp loaddata top  "  + ansLstFileDotPath)
		this.ansFile = ansFile;
		this.ansLstFileDotPath = ansLstFileDotPath;
		this.downloadAnsLst(ansLstFileDotPath);	
        this.showAlphaButtons();
		console.log("abp loaddata Bottom  ")
	}



	testA() {
		console.log("abp testA top  " + this.ansLstFileDotPath + " - " + this.rightAns)

	}
		
	resetDropDownMenus() {	
		console.log("resetDropDownMenus  " + this.dropDownMenuRight + " - " + dropDownMenuRight)
		if (this.dropDownMenuLeft != null) {
			this.dropDownMenuLeft.style.display = 'none';
            this.dropDownMenuLeft.innerHTML = "<option value='No selection'>Select Answer</option>";
		}	
		if (this.dropDownMenuRight != null) {
			this.dropDownMenuRight.style.display = 'none';
            this.dropDownMenuRight.innerHTML = "<option value='No selection'>Select Answer</option>";
		}
    }



	cleanUp() {
		console.log("abp cleanUp= ")
        hideAlphaButtons();
		this.removeAnswerMenus();
		this.resetDropDownMenus();
		//this.hideAlphaButtons("0");
		//this.hideAlphaButtons("1");
		//this.hideButLine();
	}



	getAlphaList(aLtr) {
		const indexNbrs = aLtr.charCodeAt(4) - 65;
		console.log("indexNbrs " + indexNbrs);
		const xx = this.ansLstIndex[indexNbrs];
		console.log("xx " + xx);

		const thePointer = xx.split(' ');
		const startPnt = Number(thePointer[1] - 2);
		const numberOfItems = Number(thePointer[2]);
		const alphaAnsLst = [];
		if (numberOfItems > 0) {
			const endPoint = (startPnt + numberOfItems);
			const theLtr = this.ansLst[startPnt].charAt(0);
			//alphaAnsLst.push("All answers that start with: " + theLtr);
			for (let i = startPnt; i < endPoint; i++) {
				alphaAnsLst.push(this.ansLst[i]);
			}
		} else {
			alphaAnsLst.push("No answer for letter " + ltr);
		}
        console.log(alphaAnsLst);
		return alphaAnsLst;
	}

	deleteAllAnswers() {
		ansBar.innerHTML = "";

	}

	loadLstIntoDropDown(ltr) {
		console.log("loadLstIntoDropDown " + ltr  +  "  " + cp.itf.gameOver );
		if (cp.itf.gameOver) {
			return;
		}
		if (!this.playerHasPlay) {
			this.bidTime = bidButs.getTimeForGameLND();
			startGameLNDTimer(this.bidTime);
			this.playerHasPlay = true;
        }
		pausePanelRemoval();
		const rl = ltr.charAt(3);
		console.log("loadLstIntoDropDown " + rl);
		/*
		if (rl == "1") {
			console.log("xxx" );
			hideAlphaButtons("left");
		} else {
			hideAlphaButtons("right");
		}
		*/
		this.playerAnswering = rl;
		let el = null;
		if (rl == 0) {
			el = document.getElementById('dropDownMenuLeft');
            //el.class = "alphaDropDownMenu";
		} else {
			el = document.getElementById('dropDownMenuRight');
            //el.class = "alphaDropDownMenu";
		}
		//this.dropDownMenuIsUse = el.id;
		//console.log("dropDownMenuIsUse-- " + dropDownMenuIsUse);

		//const el = document.getElementById('aBarDropDownMenu' + rl);
        //el.class = "alphaDropDownMenu";
		console.log("el-- " + el.className);
		//el.style.display = "none";
		this.clearTheAnsLst(el);
		const indexNbrs = ltr.charCodeAt(4) - 65;
		console.log("indexNbrs " + indexNbrs);
		const xx = this.ansLstIndex[indexNbrs];
		console.log("xx= " + xx);

		const thePointer = xx.split(' ');
		const startPnt = Number(thePointer[1] - 2);
		const numberOfItems = Number(thePointer[2]);
		const alphaAnsLst = [];
		if (numberOfItems > 0) {
			const endPoint = (startPnt + numberOfItems);
			const theLtr = this.ansLst[startPnt].charAt(0);
			alphaAnsLst.push("All answers that start with: " + theLtr);
			for (let i = startPnt; i < endPoint; i++) {
				alphaAnsLst.push(this.ansLst[i]);
			}
			alphaAnsLst.push("----");//To get the last answer off the bottom of the screen
			alphaAnsLst.push("----");
			alphaAnsLst.push("-- --");

		} else {
			alphaAnsLst.push("No answers for letter " + ltr);
		}

		for (var i = 0; i < alphaAnsLst.length; i++) {
			var opt = document.createElement('option');
			opt.value = alphaAnsLst[i];
			opt.innerHTML = alphaAnsLst[i];
			el.appendChild(opt);
		}
		el.dispatchEvent(new Event('mousedown'));
		setTimeout(() => {
			el.focus();
			el.click();
			el.classList.remove('hidden'); // Ensure it is visible
		}, 100);

		el.addEventListener('change', function () {
			const selection = el.value;
			console.log(`Selected value: ${selection}`);
			abp.checkAnswer(selection)//Don't know why I have to do it this way
		});
		el.style.display = "block";
	}
	
	checkAnswer(ans) {
		console.log("abp checkAnswer selAns= " + ans + " rightAns= -" + this.rightAns + "-");
        this.playerHasPlay = false;//Reset for next time
		this.proposedAns = ans;
		cp.itf.setPlayerUp(this.playerAnswering);
		this.timeToAnswer = stopGameLNDTimer();//Stop the clock
		this.logPlay(ans);
		const arr = ans.split("_");//To get around R_Mt Rushmore-Mt
		if (arr.length > 1) {
			ans = arr[1];
		}
		console.log("ans =   " + ans);
		if (this.rightAns == ans) {
			console.log("abp checkAnswer Success  " + "  " + cp.itf );
			cp.itf.displayPtsThisPlay("passed", "Got it Right");
			this.endGame(false)
			if (theGameInPlay != undefined) cp.itf.theGameInPlay.setGameOver();//For not set play
		} else {
			this.deleteAllAnswers();
			this.showAlphaButtons();
			console.log("abp checkAnswer Failure  ");
			cp.itf.displayPtsThisPlay("failed", "Sorry Wrong Answer")
		unPausePanelRemoval();//we need to reset
		}

		this.resetDropDownMenus();


		//this.hideDropDownMenus();
	}  



	removeAnswerMenus(){console.log("removeAnswerMenus  ")
		let el = document.getElementById('aBarDropDownMenu0');
		if(el != undefined)el.remove();
		el = document.getElementById('aBarDropDownMenu1');
		if(el != undefined)el.remove();
	}

	clearTheAnsLst(el){
		const nbrOfItems = el.options.length - 1;
		for(let i = nbrOfItems; i >= 0; i--) {
			el.remove(i);
		}
	}

	logPlay(ans) {
		this.playDetails.push(cp.rndSerNbr + "|" + ans + "," + gameI.getButCount() );
		console.log("logPlay()playDetails= " + this.playDetails);
		logRoundPlay(this.playDetails);
	}



	endGame(gaveUp) {
		console.log("endGame() top " + gaveUp)
		//this.cp.itf.setGameOver(this.rightAns);
		if (gaveUp) {
			cp.itf.displayPtsThisPlay("failed", "You Gave Up and got -10 Points");
		}
		cp.theGameInPlay.hideAllButs();
		//hideAlphaButtons();
		stopThePlayClock();
		stopPanelRemoval();
		gameI.removeAllButs();
		hideAlphaButtons();
		qBox.textContent = qBox.textContent + "\nThe Correct Answer is: " + this.rightAns;
		enableAnsBut();
		enableNextRndBut();
		stopThePlayClock("End of Play");
		console.log("endGame() Bottom")
	}


	

	showAlphaButtons() {
		console.log("abp showAlphaButtons() top  ")
		alphaBarInsrtPtLeft.style.display = 'block'
		alphaBarInsrtPtRight.style.display = 'block'
		alphaBarInsrtPtLeft.hidden = "false";
		alphaBarInsrtPtRight.hidden = "false";
		console.log("abp showAlphaButtons() bottom ")
	}

	hideAlphaButtons(side) {
		console.log("abp hideAlphaButtons top "  + side)
		if (side == 0) {
			alphaBarInsrtPtRight.style.display = 'none';
		} else {
			alphaBarInsrtPtLeft.style.display = 'none';
		}
	}
	setRightAns(rightAns){console.log("abpsetRightAns  "  + rightAns);
		this.rightAns = rightAns;
	}

	getSelectionXX(){console.log('getSelection theAns = ' + theAns +  "    " + cp.itf.nowPlaying);
		const el = document.getElementById("aBarDropDownMenu" + cp.itf.nowPlaying );
		const theSelection = el.selection;
		console.log("ABP theSelection "  + theSelection);
		return theSelection;
	}

	getSelection() {
		const el = document.getElementById("aBarDropDownMenu" + cp.itf.nowPlaying);
		return el ? el.value : null;
	}


    hideDropDownMenus() {
		console.log("hideDropDownMenus  ");
		let el = document.getElementById('dropDownMenuLeft');
		if (el != undefined) {
			el.style.display = 'none';
		}
		el = document.getElementById('dropDownMenuRight');
		if (el != undefined) {
			el.style.display = 'none';
		}
    }

	addSelectionListener(){if(true)console.log("abp addSelectionListener top  " )
		for (let j = 0;j<2;j++){
			const xx = 'aBarDropDownMenu' + j;
			console.log("xx  " + xx)
			let el = null;
			if (j == 0) {
				el = document.getElementById('dropDownMenuLeft');
			} else {	
				el = document.getElementById('dropDownMenuRight');
            }
			
			el.addEventListener('change', function() {
				const theAns = el.value;
				console.log('theAns = ' + theAns);
			});
		}
	}


	getTextFromServer(filePath){console.log("getTextFromServer   " + filePath);
		let data = '';
		fetch('http://localhost/' + filePath)//		console.log("abp   " + );
	  .then(response => response.text())
	  .then((data) => {
		console.log(data)
	  })
	  return data;//L.AA.An.Ge.No.No.US.CiStMo.AL.csv Rushmore-Mt
	}
	
	downloadAnsLst(ansLstFileDotPath){console.log("***downloadAnsLst   " + ansLstFileDotPath );
		const theFilePath = getTextFile(ansLstFileDotPath);
		console.log("theFilePath   " + theFilePath );

		let data= "";
		if(onNet){
			console.log("  **||**  "  );
            fetch(theFilePath)
            .then(response => response.text())
            .then(data => {
				//console.log("*|*" + data +"*|*");
				this.separateTheAnsLst(data);
		    });
		}else{
			data =cp.ansButtons.getData(cp.rndSerNbr);
			console.log("data=   " + data );
			const twoParts = data.split('|');//Note this need to be changed
			const header = twoParts[0].split(',');
			this.ansLstIndex = header.slice(5);
			this.ansLst = twoParts[1].split(',');
			console.log("abp  this.ansLst "  +this.ansLst );
		}		
	}

	separateTheAnsLst(data){//console.log("separateTheAnsLst   " + data );
		this.ansLst = data.split("\n");
		const firstLine =this.ansLst.shift();
		//console.log("firstLinet   " + firstLine );
		const secondLine =this.ansLst.shift()
		//console.log("secondLin   " + secondLine );

		const thirdLine =this.ansLst.shift()
		//console.log("thirdLinet   " + thirdLine );
		const copyRightInfo =this.ansLst.shift()
		//console.log("copyRightInfo   " + copyRightInfo );
		this.ansLstIndex =this.ansLst.shift().slice(5).split(",");
		//console.log("this.ansLstIndex   " + this.ansLstIndex );
		//console.log("this.ansLst   " + this.ansLst );
	}

	playerGivesUp() {
		console.log("playerGivesUp  ");
		cp.itf.displayPtsThisPlay("failed", "You Gave Up");
		abp.endGame(true);
		//hideAlphaButtons();
		stopThePlayClock("End of Play");
	}


	createButtonEventListeners(){
		for (let j = 0;j<2;j++){
			for (let i = 0;i<26;i++){
				const aLtr = String.fromCharCode(65 + i);
				const butLtr = 'but' + j + aLtr;
				const el = document.getElementById(butLtr);//style="background-color:LightCoral"
				el.addEventListener('click', function() {
					console.log('Button clicked!' + butLtr);
					abp.loadLstIntoDropDown(butLtr);
					//gameI.abp.testXX(butLtr);
					//this.loadLstIntoDropDown(butLtr);
				});
			}
		}
	}

	
	addEventListener(){
		const el = document.getElementById("aBarDropDownMenu");
	}

	getMenuSelection(rl){console.log("abp getMenuSelection  " );//
		return  document.getElementById("aBarDropDownMenu" + rl).value;
	}

	placeButsLR(){console.log("abp placeButsLR top " )//insrtpt0X
		for (let j = 0;j<2;j++){
			let buf = "<table><tr><td>"
			if (singlePlayerMode && j == 0) {
				buf += `<input type='button' id='-IGiveup' onclick='abp.playerGivesUp()'class='alphaBut' name='' value='-I Give Up' >`;
			}
			for (let i = 0;i<26;i++){
				const aLtr = String.fromCharCode(65 + i);
				const butLtr = 'but' + j + aLtr;
				let color = "blue"
				if(j == 1){
					color = "red";
				}
				buf += `<input type='button' id='${butLtr}' class='alphaBut${j}' name='' value='${aLtr}'  >`;
				if(i == 8 || i == 17){
					buf+= "</td></tr><tr><td>"
				}
			}
			buf += "</td></tr></table>"
			if (j == 0) {
				buf += `<select class="DDM" name='aBarDropDownLeft' id='dropDownMenuLeft' style='display:none;fontSize:"24px"' value='Select Answer'></select>`;
			} else {
				buf += `<select class="DDM"  name='aBarDropDownRight' id='dropDownMenuRight' style='display:none;fontSize:"24px"' value='Select Answer'></select>`;
			}
			
			buf+= `<option value="No selection">"ANSWER GOES HERE"</option>`;
			buf += `<div id='butLine' ></div>`;
			//console.log(" ^^^^buf== "  + buf)
			const iPt = "insrtpt" + j + "Y"
			console.log(" iPt== "  + iPt)
			const insrtPt = document.getElementById(iPt);

			if (j == 0) {
				alphaBarInsrtPtLeft.innerHTML = buf;
			} else{
				alphaBarInsrtPtRight.innerHTML = buf;
			}
			//insrtPt.innerHTML = insrtPt.innerHTML + buf;
			//insrtPt.innerHTML =  buf;
			this.dropDownMenuLeft = document.getElementById('dropDownMenuLeft');
			//this.dropDownMenuLeft.style.fontSize = "24px";
			this.dropDownMenuRight = document.getElementById('dropDownMenuRight');
			//console.log(" dropDownMenuRight === null)== " + (dropDownMenuRight === undefined))
			//this.dropDownMenuRight.style.fontSize = "24px";
			//console.log("abp placeButsLR bottom  " + insrtPt.innerHTML);
		}

		//insrtpt0X.innerHTML

	}

	getTestData() {
		const arr = new Array();
		arr.push("ABCD");
		arr.push("ABCD");
		arr.push("1234");
		arr.push("xyz");
		arr.push("The empire State Building");
		return arr
	}

	

}
