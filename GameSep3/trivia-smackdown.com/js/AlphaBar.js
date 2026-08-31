// JavaScript source codeabp checkAnswer selAns=

class AlphaBar{
	constructor (cp,ansFile,ansLstFileDotPath){             //console.log("GameU.this.butHitArray "  + this.butHitArray);//So we can reset them
		this.cp = cp;
		this.ansLstFileDotPath = ansLstFileDotPath;
		this.ansFile = ansFile;
		this.rightAns;//AlphaBar(this.cp.sampleData,this.rightAns,this);
		this.butLine;
		this.playerAnswering =0;
	}

	//			


	init(alet){if(deBug)console.log("abp init top  " )
		this.downloadAnsLst(this.ansFile);
		this.placeButsLR();
		this.createButtonEventListeners();
		this.addSelectionListener();
	}

	cleanUp(){console.log("abp cleanUp= ")
		this.removeAnswerMenus();
	}
	
	removeAnswerMenus(){console.log("removeAnswerMenus  ")
		let el = document.getElementById('aBarDropDownMenu0');
		if(el != undefined)el.remove();
		el = document.getElementById('aBarDropDownMenu1');
		if(el != undefined)el.remove();
	}

	clearTheAnsLst(el){//		if(deBug)console.log("abp loadDropDownMenu top  " );
		const nbrOfItems = el.options.length - 1;
		for(let i = nbrOfItems; i >= 0; i--) {
			el.remove(i);
		}
	}


	checkAnswer(ans){console.log("abp checkAnswer selAns= " + ans + " rightAns= -" + this.rightAns + "-");
		cp.itf.setPlayerUp(this.playerAnswering);
		if(this.rightAns == ans){
			console.log("abp checkAnswer Success  " );
			this.cp.itf.displayPtsThisPlay ("passed","Got it Right");
			this.cp.theGameInPlay.hideAllButs();
			cp.itf.setGameOver(this.rightAns);
			stopTheClock();
			stopPanelRemoval()
			stopTheClock("End of Play");
		}else{
			console.log("abp checkAnswer Failure  " );
			this.cp.itf.displayPtsThisPlay ("failed","Sorry Wrong Answer")
		}
		unPausePanelRemoval();//we need to reset
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

	addSelectionListener(){if(deBug)console.log("abp addSelectionListener top  " )
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

	loadLstIntoDropDown(ltr){console.log("loadLstIntoDropDown  "  + ltr + " gameOver = " + cp.itf.gameOver)
		console.log("abp  cp " + cp.itf);
		console.log("abp  cp.itf " + cp.itf);
				
		if(cp.itf.gameOver){
			return;
		}
		pausePanelRemoval();
		//startAlphaBarPause();
		const rl = ltr.charAt(3);
		this.playerAnswering = rl;
		const el = document.getElementById('aBarDropDownMenu' + rl);
		this.clearTheAnsLst(el);
		const indexNbrs = ltr.charCodeAt(4) -65;
		const xx = this.ansLstIndex[indexNbrs];
		const thePointer = xx.split(' ');
		const startPnt = Number(thePointer[1]-2);
		const numberOfItems = Number(thePointer[2]);
		const alphaAnsLst = [];
		if(numberOfItems > 0){
			const endPoint = (startPnt + numberOfItems);
			const theLtr = this.ansLst[startPnt].charAt(0);
				alphaAnsLst.push("All answers that start with: " + theLtr);
			for (let i = startPnt;i<endPoint;i++){	
				alphaAnsLst.push(this.ansLst[i]);
			}
			alphaAnsLst.push("----");//To get the last answer off the bottom of the screen
			alphaAnsLst.push("----");
			alphaAnsLst.push("----");

		}else{
			alphaAnsLst.push("No answer for letter " + ltr);
		}		
		for (var i = 0; i<alphaAnsLst.length; i++){
			var opt = document.createElement('option');
			opt.value = alphaAnsLst[i];
			opt.innerHTML = alphaAnsLst[i];
			el.appendChild(opt);	
		}
		el.addEventListener('change', function() {
			const selection = el.value;
			console.log(`Selected value: ${selection}`);
			gameI.abp.checkAnswer(selection)
		});
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
	
	downloadAnsLst(){console.log("downloadAnsLst   " + this.ansLstFileDotPath );
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

	separateTheAnsLst(data){console.log("separateTheAnsLst   " + data );
		this.ansLst = data.split("\n");
		const copyRightInfo =this.ansLst.shift()
		console.log("copyRightInfo   " + copyRightInfo );
		this.ansLstIndex =this.ansLst.shift().slice(5).split(",");
		console.log("this.ansLstIndex   " + this.ansLstIndex );
		console.log("this.ansLst   " + this.ansLst );
	}

	createButtonEventListeners(){
		if(deBug)console.log("abp loadDropDownMenu top  " );
		for (let j = 0;j<2;j++){
			for (let i = 0;i<26;i++){
				const aLtr = String.fromCharCode(65 + i);
				const butLtr = 'but' + j + aLtr;
				const el = document.getElementById(butLtr);//style="background-color:LightCoral"
				el.addEventListener('click', function() {
					//console.log('Button clicked!');
					gameI.abp.loadLstIntoDropDown(butLtr);
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

	placeButsLR(){console.log("abp placeButsLR  " )//insrtpt0X
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
			const insrtPt = document.getElementById(iPt);
			insrtPt.innerHTML = insrtPt.innerHTML + buf;
			//console.log(" buf== "  + buf)
		}
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
			stopTheClock("End of Play");
		}else{
			console.log("abp checkAnswer Failure  " );
			cp.itf.displayPtsThisPlay ("failed")
			//pauseButRemoval();
		}
		unPausePanelRemoval();
		console.log("**********submitAns  bottom" ) ;
	}



}
