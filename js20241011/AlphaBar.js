// JavaScript source codeabp checkAnswer selAns=

class AlphaBar{
	constructor (cp,ansFile,ansLstFileDotPath){             //console.log("GameU.this.butHitArray "  + this.butHitArray);//So we can reset them
		this.cp = cp;
		this.ansLstFileDotPath = ansLstFileDotPath;
		this.ansFile = ansFile;
		this.rightAns;//AlphaBar(this.cp.sampleData,this.rightAns,this);
		this.butLine;
	}

	init(alet){if(deBug)console.log("abp init top  " )
		console.log("*********cp =  " + this.cp);
		console.log("*********cp.rndSerNbr =  " +this.cp.rndSerNbr);		
	

		this.downloadAnsLst(this.ansFile);
		this.placeButsLR();
		this.createButtonEventListeners();
		this.addSelectionListener();

		//this.hideButLine();

	}

	checkAnswer(selAns){console.log("abp checkAnswer selAns= " + selAns + " rightAns= -" + this.rightAns + "-");
		const arr = selAns.split(",");
		const rl = arr[0];
		const ans = arr[1]
		console.log("pnbr =  " + rl);
		console.log("ans =  " + ans)
		this.cp.itf.setPlayerUp(rl);
		if(this.rightAns == ans){
			console.log("abp checkAnswer Success  " );
			this.cp.itf.displayPtsThisPlay ("passed","Got it Right");
			this.cp.theGameInPlay.hideAllButs();
			stopTheClock();
		}else{
			console.log("abp checkAnswer Failure  " );
			this.cp.itf.displayPtsThisPlay ("failed","Sorry Wrong Answer")
		}
		//unPausePanelRemoval();//we need to reset
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


	clearTheAnsLst(el){//		if(deBug)console.log("abp loadDropDownMenu top  " );
		const nbrOfItems = el.options.length - 1;
		for(let i = nbrOfItems; i >= 0; i--) {
			el.remove(i);
		}
	}

//The index looks like this:",A 2 13,B 15 11,C 26 15," Ltr Start position Nbr of items

	loadLstIntoDropDown(ltr){console.log("+++loadLstIntoDropDown  "  + ltr)
		
		const rl = ltr.charAt(3);
		const el = document.getElementById('aBarDropDownMenu' + rl);
		this.clearTheAnsLst(el);
		const indexNbrs = ltr.charCodeAt(4) -65;
		console.log("indexNbrs "  + indexNbrs);
		const xx = this.ansLstIndex[indexNbrs];
		console.log("xx "  + xx);

		const thePointer = xx.split(' ');
		console.log("xx "  + xx);
		const startPnt = Number(thePointer[1]-2);
		console.log("startPnt= "  + startPnt)

		const numberOfItems = Number(thePointer[2]);

		console.log("abp numberOfItems=  " + numberOfItems);
		const alphaAnsLst = [];
		if(numberOfItems > 0){
			const endPoint = (startPnt + numberOfItems);
			
			for (let i = startPnt;i<endPoint;i++){	
				alphaAnsLst.push(this.ansLst[i]);
			}
		}else{
			alphaAnsLst.push("No answer for letter " + ltr);
		}		

		for (var i = 0; i<alphaAnsLst.length; i++){
			var opt = document.createElement('option');
			opt.value = alphaAnsLst[i];
			opt.innerHTML = alphaAnsLst[i];
			el.appendChild(opt);
		console.log("loadLstIntoDropDown bottom " );		}

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

	
	//This gets the whole set of answers and divides the text file into  this.ansLstIndex and this.ansLst
	//For the time being, using sampleData

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




	hideSubMitBut(){console.log("|||||||||hideSubMitBut "  );
		const butABPsub = document.getElementById('butABPSubmit');
		butABPsub.style.display = "none";

	}


	createButtonEventListeners(){
		if(deBug)console.log("abp loadDropDownMenu top  " );
		for (let j = 0;j<2;j++){
			for (let i = 0;i<26;i++){
				const aLtr = String.fromCharCode(65 + i);
				const butLtr = 'but' + j + aLtr;
				const el = document.getElementById(butLtr);//style="background-color:LightCoral"
				el.addEventListener('click', function() {
					console.log('Button clicked!');
					gameI.abp.loadLstIntoDropDown(butLtr);
				});

			}
		}
		for (let j = 0 ;j<2;j++){
			const butABPsub = document.getElementById('butABPSubmit'+j);
				const xx = "aBarDropDownMenu" + j;
				butABPsub.addEventListener('click', function() {
					const selection = document.getElementById(xx).value;
					gameI.abp.checkAnswer(j + "," + selection)

				});

			if(deBug)console.log("abp loadDropDownMenu bottom  " );
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

			buf+= `<input type='button' id='butABPSubmit${j}' name='butSubmit' value='Submit Answer'>`
			buf+= `<select name='aBarDropDown' id='aBarDropDownMenu${j}'  value='Select Answer'><div id='butLine' >BBBB</div>`;

			const iPt = "insrtpt" + j + "X"
			const insrtPt = document.getElementById(iPt);
			insrtPt.innerHTML = insrtPt.innerHTML + buf;

			//console.log(" buf== "  + buf)
		}

	}


	createAlphaButtonPanelXX(){console.log("abp createAlphaButtonPanel() top  " );//
		const insrtPt = document.getElementById("gamePlayArea");
		console.log("insrtPt = " +  insrtPt);

		let buf = " <input type='button' id='butABPSubmit' name='butSubmit' value='Submit Answer'>";
		buf+= "<select name='aBarDropDown' id='aBarDropDownMenu'  value='Select Answer'><div id='butLine' >BBBB</div>";
		/*
		console.log("buf = " +  buf);
		for (let i = 0;i<26;i++){
			const aLtr = String.fromCharCode(65 + i);
			const butLtr = 'but' + aLtr;
			buf+=  `<input type='button' id='${butLtr}' class='alphaBut' name='' value='${aLtr}' style='background-color:aquamarine;' >`;	
			//console.log("abp str  "  + str);
			//this.butLine.innerHTML = this.butLine.innerHTML + str;
		}
		*/
		insrtPt.innerHTML = insrtPt.innerHTML + buf;


//This does not work if inside the for loop
		//this.butLine = document.getElementById('butLine');
		if(deBug)console.log("abp createAlphaButtonPanel() Bottom  " );
	}

	addButLineXX(){console.log("addButLine  " );
		this.butLine = document.getElementById("butLine");
		console.log("this.butLine  " + this.butLine );
		for (let i = 0;i<26;i++){
			const aLtr = String.fromCharCode(65 + i);
			const butLtr = 'but' + aLtr;
			const str  = `<input type='button' id='${butLtr}' class='alphaBut' name='' value='${aLtr}' style='background-color:aquamarine;' >`;	
			//console.log("abp str  "  + str);
			this.butLine.innerHTML = this.butLine.innerHTML + str;
		}


	}

	//				 

}
