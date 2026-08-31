// JavaScript source code

class AlphaBar{
	//constructor (cp,ansFile,ansLstFileDotPath){ 
	constructor (cp){		//console.log("GameU.this.butHitArray "  + this.butHitArray);//So we can reset them
		this.cp = cp;
		this.rightAns;//AlphaButtons(this.cp.sampleData,this.rightAns,this);
		this.butLine;
		this.playerAnswering = 0;
		this.alphaLeft = null;
		this.alphaRight = null;
		this.test = true;
		this.bidTime = 15;
		this.playDetails = [];
		this.proposedAns = "";
	}

	loadData(ansFile,ansLstFileDotPath){console.log("abp loaddata top  " )
		this.ansFile = ansFile;
		this.ansLstFileDotPath = ansLstFileDotPath;
	}

	init(alet){if(true)console.log("abp init top  " )
		this.downloadAnsLst(this.ansFile);
		this.placeButsLR();
		this.createButtonEventListeners();
		this.addSelectionListener();
		this.showAlphaButtons();
	}

	cleanUp(){console.log("abp cleanUp= ")
		this.removeAnswerMenus();
		this.hideAlphaButtons("0");
		this.hideAlphaButtons("1");
		//this.hideButLine();
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
		return alphaAnsLst;
	}

	deleteAllAnswers() {
		ansBar.innerHTML = "";

	}





	loadLstIntoDropDown(ltr) {
		this.bidTime = bidButs.getTimeForGameLND();
		startGameLNDTimer(this.bidTime);
		console.log("loadLstIntoDropDown  " + ltr + " gameOver = " + cp.itf.gameOver)
		console.log("abp  cp " + cp.itf);
		console.log("abp  cp.itf " + cp.itf);
		if (cp.itf.gameOver) {
			return;
		}
		pausePanelRemoval();
		const rl = ltr.charAt(3);
		this.hideAlphaButtons(rl);//
		this.playerAnswering = rl;
		const el = document.getElementById('aBarDropDownMenu' + rl);
		this.clearTheAnsLst(el);
		const indexNbrs = ltr.charCodeAt(4) - 65;
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
			alphaAnsLst.push("All answers that start with: " + theLtr);
			for (let i = startPnt; i < endPoint; i++) {
				alphaAnsLst.push(this.ansLst[i]);
			}
			alphaAnsLst.push("----");//To get the last answer off the bottom of the screen
			alphaAnsLst.push("----");
			alphaAnsLst.push("----");

		} else {
			alphaAnsLst.push("No answer for letter " + ltr);
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
			//this.checkAnswer(selection);
		});

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


	checkAnswer(ans) {
		console.log("abp checkAnswer selAns= " + ans + " rightAns= -" + this.rightAns + "-");
		this.proposedAns = ans;
		cp.itf.setPlayerUp(this.playerAnswering);
		this.timeToAnswer = stopGameLNDTimer();//Stop the clock
		this.logPlay(ans);
        const arr = ans.split("_");//To get around R_Mt Rushmore-Mt
		if(arr.length > 1){
			ans = arr[1];
		}
		console.log("ans =   " + ans);
		if(this.rightAns == ans){
			console.log("abp checkAnswer Success  " );
			this.cp.itf.displayPtsThisPlay ("passed","Got it Right");
			this.cp.theGameInPlay.hideAllButs();
			//cp.itf.setGameOver(this.rightAns);
			hideAlphaButtons();
			stopThePlayClock();
			stopPanelRemoval();
			gameI.removeAllButs();
			this.hideAlphaButtons(0);
			this.hideAlphaButtons(1);
			enableAnsBut();
			enableNextRndBut();
			stopThePlayClock("End of Play");
			if (theGameInPlay != undefined) this.cp.itf.theGameInPlay.setGameOver();//For not set play

		} else {
			this.deleteAllAnswers();
			this.showAlphaButtons();
			console.log("abp checkAnswer Failure  ");
			this.cp.itf.displayPtsThisPlay("failed", "Sorry Wrong Answer")

		}
		unPausePanelRemoval();//we need to reset
	}  

	showAlphaButtons() {
		console.log("abp showAlphaButtons() top  " + this.alphaLeft)
		this.alphaLeft.style.display = 'block'
		this.alphaRight.style.display = 'block'
		//this.alphaLeft.hidden = "false";
		//this.alphaRight.hidden = "false";
		console.log("abp showAlphaButtons() bottom ")
	}

	hideAlphaButtons(side) {//The opposit side from the one just selected
		if (side == 0) {
			this.alphaRight.style.display = 'none';
		} else {
			this.alphaLeft.style.display = 'none';
		}
	}
	setRightAns(rightAns){console.log("abpsetRightAns  "  + rightAns);
		this.rightAns = rightAns;
	}

	getSelection(){console.log('getSelection theAns = ' + theAns +  "    " +this.cp.itf.nowPlaying);
		const el = document.getElementById("aBarDropDownMenu" +this.cp.itf.nowPlaying );
		const theSelection = el.selection;
		console.log("ABP theSelection "  + theSelection);
		return theSelection;
	}

	addSelectionListener(){if(true)console.log("abp addSelectionListener top  " )
		for (let j = 0;j<2;j++){
			const xx = 'aBarDropDownMenu' + j;
			console.log("xx  "  + xx )
			const el = document.getElementById(xx);
			el.addEventListener('onselectionchange', function() {
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
	
	downloadAnsLst(){console.log("***downloadAnsLst   " + this.ansLstFileDotPath );
		const theFilePath = getTextFile(this.ansLstFileDotPath);
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
			data =this.cp.ansButtons.getData(this.cp.rndSerNbr);
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

	createButtonEventListeners(){
		//console.log("abp loadDropDownMenu top  " );
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

	hideButLine(){console.log("hideButLine " );//this.butLine
		this.butLine.style.display = "none";
	}

	showButLine(){console.log("showButLine " );
		this.butLine.style.display = "block"
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
			for (let i = 0;i<26;i++){
				const aLtr = String.fromCharCode(65 + i);//["SkyBlue","Salmon"]
				const butLtr = 'but' + j + aLtr;
				let color = "SkyBlue"
				if(j == 1){
					color = "Salmon";
				}
				buf+=  `<input type='button' id='${butLtr}' class='alphaBut' name='' value='${aLtr}' style='background-color:${color};' >`;
				if(i == 8 || i == 17){
					buf+= "</td></tr><tr><td>"
				}
			}
			buf+= "</td></tr></table>"
			buf+= `<select name='aBarDropDown' id='aBarDropDownMenu${j}'  value='Select Answer'>`;
			buf+= `<option value="No selection">"ANSWER GOES HERE"</option>`;
			buf+= `<div id='butLine' ></div>`;
			const iPt = "insrtpt" + j + "X"
			console.log(" iPt== "  + iPt)
			const insrtPt = document.getElementById(iPt);

			if (j == 0) {
				this.alphaLeft = insrtPt;
			} else{
				this.alphaRight = insrtPt;
			}
			insrtPt.innerHTML = insrtPt.innerHTML + buf;
			console.log("abp placeButsLR bottom"  )
		}



	}

	testXX(aLtr) {
		console.log("abp test top")
		this.hideAlphaButtons("0");
		this.hideAlphaButtons("1");//const el = document.getElementById('aBarDropDownMenu' + rl);
		ansBar.innerHTML = ''; // Clear previous options
		const answers = this.getAlphaList(aLtr)
		let buf = ""

		answers.forEach(answer => {
			buf += `<input type="button" backgroundcolor="green" onclick="abp.checkAnswer('${answer}')" value="${answer}">--`
			/*
			const button = document.createElement('button');
			button.textContent = answer;
			button.classList.add("<li>" + 'answer-button' + "</li>");
			const x = `onclick="checkAnswer(${answer})"`
			console.log("x= " + x);
			button.addEventListener('x', () => {
				checkAnswer(answer);
			});

			ansBar.appendChild(button);
			*/
		});

		ansBar.innerHTML = buf;

		console.log("abp test bottom " + buf);
		//ansBar.classList.add('visible'); // Show the listsetTimeout(() => list.remove(), 5000); // Auto-remove after 5 sec
	}
	
	submitAnsxx(){console.log("abp checkAnswer " +  this.abp.getMenuSelection());
		const theSelection = this.abp.getMenuSelection();
		if(this.rightAns == theSelection){
			console.log("abp checkAnswer Success  " );
			cp.itf.displayPtsThisPlay ("passed");
			this.hideAllButs();
			console.log("aaa " );
			cp.itf.setGameOver();
			console.log("bbb " );
			stopPanelRemoval();
			stopThePlayClock("End of Play");
		}else{
			console.log("abp checkAnswer Failure  " );
			cp.itf.displayPtsThisPlay ("failed")
			//pauseButRemoval();
		}
		unPausePanelRemoval();
		console.log("**********submitAns  bottom" ) ;
	}



}
