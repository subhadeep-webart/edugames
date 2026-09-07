// JavaScript source code




class GameD extends Game{
		//console.log("GameD  top "  ); //console.log("GameD  = " + )
		constructor (round,cp,utl,plu){
		super (round,cp,utl);
		console.log("GameD.constructor TOP"  );
		this.plu = plu;
		this.inputArray;
		this.ptInc = 0;
		this.gameInPlay = "gameD";
		this.gameType = 'D';
		this.arrowIsDraggable = true;
		this.ctx;
		this.display;
		this.theAnswer;
		this.loNbr;
		this.hiNbr;
		this.nbrLine;
		this.pAns =[];
		this.pAnsX =[];
		this.sliderYearLoc =[];
		this.sliderDayLoc =[];
		this.displayBox;
		this.slider;
		this.theAnswer = "19690720"
		this.theDayTableIsInserted = false;
		this.theYear = "";
		this.sliderYear = "";
		this.sliderDay = "";
		this.displayBoxYear = "";
		this.theDayTable = "";
		this.displayBoxDay = "";
		this.yearArr =[];
		this.arrowLoc =[];
		this.pNbr = 0;
		this.thePlayer;
		this.displayAnswer;
		this.logOfDisplayedAnswers = [];
		this.monthMap;
		this.month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"]
		console.log("GameD.constructor BOTTOM"  );
	}

	init(){
		super.init();
		console.log("GameD.init TOP"  )
							console.log("GameD this.plu.pMax = " + this.plu.pMax);
		this.plu.setFirstPlayerNbr(0);
		this.thePlayer = this.plu.getNextPlayer();
		this.insertLayout();
		this.displayBoxYear = document.getElementById("displayBoxYear");
		this.tfPlayerName = document.getElementById("playerName");
		this.displayBoxDay = document.getElementById("displayBoxDay");
		this.sliderYear= document.getElementById("sliderYear");
		this.sliderDay= document.getElementById("sliderDay");
		this.theDayTable = document.getElementById("theDayTable");
		this.displayBox= document.getElementById("displayBox");
		this.nbrLine = document.getElementById("nbrLine");
		this.insertHiAndLo()
		this.setInitialValues(this.thePlayer);
		this.addListener();
		this.createMonthMap();
		//this.setNextPlayer()
		//this.player =this.plu.getFirstPlayer();
		console.log("GameD.init Bottom   this.player 0 =  "  + this.thePlayer.name);
	}

	helloWorld(){
		console.log("GameD.helloWorld" );//console.log("GameD  = " + );
		super.helloWorld();
	}

	createMonthMap(){
		this.monthMap = new Map();
		for (let i = 0;i<12;i++){
			let x = ""
			if(i < 10){
				x = "0"+ 1;
			}else{
				x = i;
			}
			this.monthMap.set(this.month[i],x);
		}
	}


	addListener(){//for testing of arrow loacation
		const nbrLn = document.getElementById("nbrLine");
		nbrLn.addEventListener('click', function(event) {
		  gameD.getClick(event.offsetX,event.offsetY);
		});	
	}

	getClick(x,y){
		console.log(x + " ---" + y );

	}


	setNextPlayer(){//console.log("|| setNextPlayer() = " + this.plu.pMax  );
		this.thePlayer = this.plu.getNextPlayer();
		if(this.thePlayer == null){
		//console.log("***********player == null "  );	
			this.evalAns();
			return;
		}
		//console.log("|| setNextPlayer() = " + this.plu.pMax  + "  = " + this.thePlayer.getInfo());
		this.setInitialValues(this.thePlayer)
        //console.log("GameD  setNextPlayer  bottom "  );
	}

	//Done on mouseUp of sliderYear
	onSelectionOfTheYear(sliderLoc){//console.log("&&&&&&&&&&&onSelectionOfTheYear  " +  sliderLoc)
		this.theYear = displayBoxYear.value;
		this.yearArr.push(this.theYear);//For the arrow
		this.showDayTable();
		this.hideYearSlider();
		const sliderX =   ((sliderLoc - this.loNbr) * 10) ;
			//console.log(" sliderLoc=   " + sliderLoc +  " this.theYear "   +  this.theYear + " sliderX= " +  sliderX  + " this.loNbr=  " + this.loNbr)
		this.sliderYearLoc.push(sliderX);//This if for the arrows
	}

	                               //Done on mouseUp of sliderDay
	onSelectionOfTheDay(sliderLoc){
		const sliderX = parseInt(sliderLoc/370 * 10)
		this.sliderDayLoc.push(sliderLoc)
		const results = displayBoxYear.value;
		this.logOfDisplayedAnswers.push(results);
		//console.log(results);
		this.pAns.push(results);
		//console.log("this.pNbr  = " + " results= " +  results);
		this.hideDayTable();
		this.showYearSlider();//
		this.setNextPlayer()
		//this.thePlayer = this.plu.getNextPlayer;
		//console.log(">>>BBB>>>TheDay  " + sliderLoc + " sliderX = " + sliderX +  "  = "  + this.pNbr)		
	}


	setInitialValues(player){console.log("***************setInitialValues  = " + this.thePlayer.name);	
		this.tfPlayerName.value = this.thePlayer.name;
		this.tfPlayerName.style.backgroundColor = this.thePlayer.altColor;
		this.displayBoxYear.style.backgroundColor = this.thePlayer.altColor;
		this.sliderYear.style.backgroundColor = this.thePlayer.altColor;
		this.sliderYear.selection=this.loNbr;
		this.sliderYear.value = this.loNbr;
		this.displayBoxYear.value=this.loNbr;
		if(this.sliderDay != null){	
			this.sliderDay.value = 0;//player.pNbr
			this.sliderDay.style.backgroundColor = this.thePlayer.altColor;//		    console.log(" = "  + );
		}
	}
	

					//				const theArrow = document.getElementById(arrowName);

	placeAnswerArrow(){		    console.log("placeAnswerArrow= "+ this.theAnswer + " this.loNbr  " +  this.loNbr +  " this.hiNbr=  " + this.hiNbr );
		//const theAnswerNbrLineLoc = 50;//nbrLineInsrtPt
		const ansYear = Number(this.theAnswer.slice(0,4));
		let xPos =  ((ansYear - this.loNbr) * 10 ) -5;
		if(xPos > 250)xPos-=10;
		this.nbrLine.style.zIndex = "1";
		const arrowImage = getImageFile("}P.AA.Pi.Th.Sy.To.Ar.BlackDownArrow.AB.png|blackDownArrow|class ='Arrow'");
		const nbrLine = document.getElementById("nbrLineInsrtPt");
		console.log("nbrLine = "  + nbrLine.loc);
		nbrLine.innerHTML= nbrLine.innerHTML + arrowImage[0];
		const blackDownArrow = document.getElementById("blackDownArrow");//  left:50px;
	    console.log("blackDownArrow = "  +blackDownArrow );
		blackDownArrow.style.zIndex = "5";
		blackDownArrow.style.left=xPos+"px";
		//console.log("blackDownArrow = "  + blackDownArrow.loc);
	}

	
	placeArrows(){///Pi/Th/Sy/To/Ar/BlueUpAnsow/BlueUpAnsow.AA.jpg' id='undefined' />
			console.log("placeArrows()  " + this.plu.pMax);//		    console.log(" = "  + );
			this.placeAnswerArrow();
			//const xLoc = arrowInsrtPt.left;
			//const yLoc = arrowInsrtPt.top;
			//console.log("arrowInsrtPt = "  + xLoc + "   " + yLoc);

			for (let i = 0;i<this.plu.pMax;i++){//
				const arrowInsrtPt = document.getElementById("arrowInsrtPt" + i );
				//console.log("arrowInsrtPt = "  + arrowInsrtPt);
				const color = this.plu.players[i].color;
				const colorX = color.charAt(0).toUpperCase() + color.slice(1);
				const fileInput = `}P.AA.Pi.Th.Sy.To.Ar.${colorX}UpArrow.AA.jpg|${color}Arrow|class ='upArrow' `;
				const img = getImageFile(fileInput)
				//console.log("img[0] = "  + img[0] );
				arrowInsrtPt.innerHTML = arrowInsrtPt.innerHTML + img[0];
				const arrowName = color + "Arrow";
				const theArrow = document.getElementById(arrowName);
				const xLoc = theArrow.x;
				const yLoc = theArrow.y
				//console.log(arrowName + "  -- "  + xLoc +  "  " + yLoc);


				let loc = parseInt(Number(this.sliderYearLoc[i]) +3 )//-(i * 32)-17
				if(loc > 260)loc-=10;
				this.arrowLoc.push(i + " --  " + arrowName + "  " +     loc);
				theArrow.style.left = loc   +"px";

				//console.log(loc + " --  " + arrowName + "  " +    theArrow.x);

			}

			for (let i = 0;i<this.plu.pMax;i++){
				//console.log(i + "  this.arrowLoc[i]  " +  this.arrowLoc[i]   + " this.pAns[i]=  " + this.pAns[i]   );			
			}
		
		}

	getOnePlayerResults(){		console.log("getOnePlayerResults  " + this.pAnsX[0] );
		const dif = Math.abs(this.theAnswer - this.pAnsX[0]);
		console.log("dif=  " + dif );
		console.log("this.hiNbr=  " + this.hiNbr + 1000);
		console.log("this.loNbr  " + this.loNbr  + 1000);
		const diff = dif/(this.hiNbr - this.loNbr)/10;
		console.log("diff=  " + diff );
		let result =0;
		let playResults = "\nYour were ";
		if (diff > 16) {
		  result = 0;
		  playResults+= "Way OFF";//D.d("   " + );
		}else if (diff > 7.2) {
		  result = ( (16 - diff) / 16) * .25;
		  playResults+= "In The Ball Park";
		}else if (diff > 3.4) {
		  result = ( (10 - diff) / 10) * .5;
		  playResults+= "In Range";
		}
		else if (diff > 2.01) {
		  result = ( (6 - diff) / 6) * .75;
		  playResults+= "Close";
		}
		else if(diff > 1.3) {
		  result = (3 - diff) / 2;
		  playResults+= "Real Close";
		}else  {
		  result = 1;
		  playResults+= "Right On";
		}
		console.log("  playResults= " + playResults);
		const points = parseInt(result * 100);
    return playResults + " and got " + points + " points.";
  }


	evalAns(){console.log("********************GameDD evalAns()  " + this.theAnswer  );
			let result = "The question was: " + this.question + "\n The answer is: " + this.displayAnswer + " as disignated by the black arrow."
			const ansX = this.theAnswer
			this.tfPlayerName.style.backgroundColor="white";
			this.tfPlayerName.value = "";
			displayBoxYear.style.fontSize="large";
			displayBoxYear.value= "The answer is: " + this.displayAnswer;
			displayBoxYear.style.backgroundColor="white";
			this.hideDayTable();
			//console.log("ansX=  " + ansX );
			//const nbrOfPlayers = this.pAns.length//this.pAns.length//		    console.log(" = "  + );
			
			let yearX = "";
			let monthX = "";
			let DayX = "";
			const playerAns = [];
			const nbrOfPlayers = this.plu.pMax;

			//console.log("+++++*******************nbrOfPlayers = "  + nbrOfPlayers);
			for (let i = 0;i<nbrOfPlayers;i++){
				console.log(i + " --  "  + this.logOfDisplayedAnswers[i])
				const [dayX,monthX,yearX] = this.logOfDisplayedAnswers[i].split(" ")
				const monthNbr = this.monthMap.get(monthX);
				playerAns[i] = "" + yearX + monthNbr + dayX;
		    console.log("|||||||||||||| = "  + playerAns[i]);
			}

			if(nbrOfPlayers == 1){
				result+=  this.getOnePlayerResults();
			}else{
				const difArr = [];
				let totalDif = 0;
				let winPlayer = 0;
				let winDif = 100000000;
				for (let i = 0;i<nbrOfPlayers;i++){
					console.log(i + "  ^^^^^^^^^this.pAnsX[i] = "  + playerAns[i]);
					const dif = Math.abs(this.theAnswer - playerAns[i])
					console.log("^^^^^^^^^^^^^^^^dif = "  + dif);
					totalDif+= dif;
					console.log("totalDif = "  + totalDif);//		    console.log(" = "  + );
					difArr.push(i + ","  + dif + "\n" );
					if(dif < winDif){
						winDif = dif;
						console.log("winDif = "  + winDif);
						winPlayer = i;
						console.log("AAAwinPlayer = "  + winPlayer);
					}
				}
		    
				console.log("BBBwinPlayer = "  + winPlayer);
				//Checking for ties
				let tCount = 0;
				const winArr = [];
				for (let i = 0;i<nbrOfPlayers;i++){
					const [aPlayerNbr,aDif] = difArr[i].split(",")
					console.log(aDif + " =||= "  + winDif);
					if(aDif == winDif){
						tCount++;
						winArr.push(aPlayerNbr);//		    console.log(" = "  + );
					}
				}
			    console.log("----------tCount = "  + tCount);

				const avgDif = totalDif/nbrOfPlayers
				console.log("**************winDif = "  + winDif + " avgDif=  "  + avgDif);
				let ratio = (1-winDif/avgDif);
				console.log("ratio = "  + ratio);
				
				console.log("ratio* 100 = "  + ratio* 100);
				console.log("tCount = "  + tCount);
				if(isNaN(ratio)) ratio = 1; 

				const pointAwd = parseInt(100 * ratio / tCount );
				console.log("pointAwd = "  + pointAwd);
			
				if(tCount  > 1){
					let buf = "\n There is a "  +  tCount + " way tie between ";
					for (let i = 0;i<tCount;i++){
						//buf+= this.pAns[winArr[i]] + ","
						//buf+= this.players[winArr[i]] ;
						buf+= this.plu.players[winArr[i]].name ;
						if(tCount == 2 && i == 0){
							buf+= " and ";
						}else if(tCount == 3 && i < 2){
							buf+= ", "
						}
					}
					buf+= " with a point award of " + pointAwd + " each.";
					result+= buf;
				  console.log(buf );
				}else{
		    console.log("this.players[winPlayer] = "  + this.plu.players[winPlayer]);

					result +=" The winner is "  + this.plu.players[winPlayer].name + " and gets " + pointAwd + " points.";
				  console.log("\n\n winner is; " + this.plu.players[winPlayer].name +  " and gets " + pointAwd + " points")
				}
			}
			if(this.plu.pMax>1){
				result += "\nThe player selections are as follows:\n";
				for (let i = 0;i<this.plu.pMax;i++){
					result+= this.plu.players[i].name + " -- " + this.pAns[i] + "\n";		
				}
			}


			//sliderYearLoc ??
			const theQuestionArea = document.getElementById("question");
			this.hideYearSlider();
			this.placeArrows();
			theQuestionArea.value = result;
		}

			                //This continues till the player lets up on the mouse ="onchange" = onSelectionOfTheDay
	addTheDay(theDay){//console.log("addTheDay")

	  const monthDayCount =  [0,31,60,91,121,152,182,213,244,274,305,336,368,400] ;
	  let monthNbr =0;
	  let dayOfMonth = 0;
	  for(let i = 0;i< 13;i++){
		 if(theDay > monthDayCount[i] && theDay < monthDayCount[i+1]){ 
		   dayOfMonth = theDay - monthDayCount[i];
		   const ansXX = 
		   this.displayBoxYear.value = dayOfMonth  + " " + this.month[i] + " " + this.theYear
		   monthNbr = i;
		  }
	  }
	  //let buf = this.theYear;
	  let bufX = this.theYear
	  if(monthNbr < 10){
		  //buf+= "0" + Number(monthNbr + 1);
		  bufX+= "0" + Number(monthNbr + 1);
	  }else{
		  //buf+= monthNbr;
		  bufX+= monthNbr;
	  }
	  if(dayOfMonth < 10){
		  //buf+= "0" + dayOfMonth;//		    console.log(" = "  + );
		  bufX+= "0" + dayOfMonth;
	  }else{
		  //buf+= dayOfMonth;
		  bufX+= dayOfMonth;
	  }
	  this.pAnsX.push(bufX);
	  this.pAns[this.playerNbr] = bufX;
	  //console.log("addTheDay bottom")
	}

	setYearDisplay(theYear){
		this.displayBoxYear.value= theYear ;
	}

	 showYearSlider(){   console.log("showYearSlider");
		const sliderYear = document.getElementById("sliderYear");
		this.sliderYear.style.display = "block";   
	}

	hideYearSlider() {   console.log("hideYearSlider");
		this.sliderYear.style.display = "none"; 
	}

	 removeYearSlider(){   console.log("removeYearSlider");
	   const parent = this.sliderYear.parentNode
	   parent.removeChild(sliderYear); 
	}

	 test(){   console.log("test");
		this.theDayTable.style.display = "block";
	}

	showDayTable() {   console.log("$$showDayTable      " +  this.theDayTableIsInserted  + " this.thePlayer.name=  " + this.thePlayer.name);
		if(!this.theDayTableIsInserted){
			this.insertDayTable();
			this.theDayTableIsInserted = true;
			this.theDayTable = document.getElementById("theDayTable");
		}
		this.sliderDay.value = 0;//player.pNbr
		this.sliderDay.style.backgroundColor = this.thePlayer.altColor;
		this.theDayTable.style.display = "block";

	}

	 hideDayTable(){   console.log("hideDayTable  " );
		 if(this.theDayTable != null) {
				console.log(" XXX  " );
			 this.theDayTable.style.display = "none"; 
		 }
	}

	 removeDaySlider(){   console.log("removeDaySlider");
		 this.theDaySlider.parentNode.removeChild(theDaySlider);
	}
 
	 removeYearSliderAndsetUpDaySliderX(){ 
		  const theParent = this.theSliderYear.getParent
		  this.theDayTable.style.display = "block";
		  const parent = document.getElementById("theDayTable");
		  this.sliderYearDiv.parentNode.removeChild(sliderDay);
		  this.showDayTable(); 
	}

	displayTheYear(theYear){
	   this.displayBoxYear.value= theYear ;
	}

	insertLayout(){
	const HTMLlayout =`


	<table  width="500px" ><caption>SELECT THE YEAR</caption>
	<tr><td><input type="text" name="display" id="displayBoxYear" value="0"></td></tr>
	<tr width="500px">
	<td>                                                                      
	<input type="text" value="1"  class="nbrDisplay" id="displayTextLow" > 
	<input type="text" value="50" class="nbrDisplay" id="displayTextMid" >  
	<input type="text" value="100"class="nbrDisplay" id="displayTextHi"  >  
	</td>        
	</tr>  
	  <!--<td><div id="nbrLineInsrtPt"> </div></td> -->
	<td><div id="nbrLineInsrtPt"><img src="../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" width="503" id="nbrLine" height="21" alt="" title="NbrLine" /></div></td> 
	</tr>
	<tr>  
	<!--  -->                                                               
	<tr><td><div   width="1000px"  id='arrowInsrtPt0'></div></td></tr>
<!--  -->
	<tr><td><div   width="1000px"  id='arrowInsrtPt1'></div></td></tr>
<!--  -->
	<tr><td><div   width="1000px"  id='arrowInsrtPt2'></div></td></tr>
<!---->
	 <tr><td><div   width="1000px"  id='arrowInsrtPt3'></div></td></tr> 
	</tr>
	<tr>                                                           
	</tr><tr><td><div  height="24px">
	<div id="sliderDiv"><input type="range"  class="slider" id="sliderYear"        onchange="gameD.onSelectionOfTheYear(this.value)" oninput="gameD.setYearDisplay(this.value)"  width="500px" height="40px" name="theSliderYear" height="24px" /> </div>
	</div></td></tr> 
	 <tr></tr>
	  <!--   value="1950" min="1950" max="2000" -->
	</table>
		<!-- id="sliderDiv"onchange="gameN.regAns(this.value)"   onchange="gameN.regAns(this.value)"-->
	 <div id="dayTableInsertionPoint"> </div>
	 <div id="theDayTable"  div>
	</div>
	  </body>
	</html>`
	
		const insertPtA = document.getElementById("insertPtA");
		insertPtA.innerHTML = insertPtA.innerHTML + HTMLlayout
	}

	insertDayTable(){
		const theDayTableHTML = `
		<table  width="500px" id="theDayTable" border="1"  width="100%"><caption>SELECT THE DAY</caption>
		  <tr><!-- Row 1 -->
			 <td width="67px">B1</td><!-- Col 1 -->
			 <td><img src="../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/DateLine-1/DateLine-1.KA.jpg" width="384px" height="29" alt="" title="" /></td><!-- Col 2 -->
		<td width="60px">   </td>
		  </tr>
		  <tr><!-- Row 2 -->
			 <td>C1</td><!-- Col 1 -->
			 <td><input width="384px" padding="67px" type="range" id="sliderDay" oninput="gameD.addTheDay(this.value)" onchange="gameD.onSelectionOfTheDay(this.value)" height="24px" value="1"  min="1" max="370" /></td><!-- Col 2 -->
		  <td width="60px">   </td>
		  </tr>
		</table>
		<br><br>`	
		const theDayTable = document.getElementById("dayTableInsertionPoint");
		theDayTable.innerHTML = theDayTable.innerHTML + theDayTableHTML;
		this.sliderDay = document.getElementById("sliderDay");
	}

	
	insertHiAndLo(){console.log("insertHiAndLo" + this.theAnswer)//Answer=19690720
		const theAnswerX = this.theAnswer + "";
 
		const year =  theAnswerX.substring(0,4);
		const month = Number(theAnswerX.substring(4,6));
				    console.log("&&&&&&&&&&month = "  + month);
		const day =   theAnswerX.substring(6,8);
		this.displayAnswer = day + "-" + this.month[month-1] + " " + year;
		this.loNbr =  year - parseInt(50 * Math.random());
		this.hiNbr = this.loNbr + 50;
		document.getElementById("displayTextLow").value = this.loNbr; 
		document.getElementById("displayTextHi").value  = this.hiNbr;
		document.getElementById("displayTextMid").value = (this.hiNbr - this.loNbr)/2 + this.loNbr;//		    console.log(" = "  + );//  ;
		this.sliderYear.value=this.loNbr
		this.sliderYear.max=  this.hiNbr;
		this.sliderYear.min=  this.loNbr;
	}


}//Bottom of game D