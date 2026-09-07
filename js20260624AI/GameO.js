// JavaScript source code
class GameO  extends Game{//const sampleRound = ",AA.Oen00001,EdUGames tm,,2,,,,Te,,,aPRA1_0 zPRA1_15 ,,,,,Test/Order,Place the numbers on the LEFT in order on the RIGHT with the largest number on the bottom Make a mistake or two and press the CHECK button to see what happens.,,Rows=8 Cols=1 FntSize=18 FntColor=magenta BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes,One,Two,Three,Four,Five,Six,Seven,Eight,,,,,,,,,,,";

	constructor(round, context) {
		super(round, context);
		this.context = context;
		this.procGameData;
		this.butLst;
		this.ans;
		this.mbArray =[];
		this.okToMove = false;
		this.itemsJustMoved = []
		this.ansArr = new Array();
		this.nbrMoved = 0;
		this.inputArr = [];
		//this.nbrToBePlaced = 0;
	}
	init(){
		console.log("GameO.init TOP"  );//		console.log("GameO.  " +  )
		super.init();
		this.gameName = 'GameO';
		this.procGameData();
		bidButs.startBidClock();
		showCheckBut();
		this.startPlay();
		console.log("GameO.init BOTTOM "  +  this.gameInPlay);//        console.log("GameI. "  + );
	}

	

	testA(){console.log("GameO.testA  "   );
		this.freezeItemsOnLeft();
	}

	testB(){console.log("GameO.testB  "  );
		this.unFreezeItemsOnLeft();
	}

	startPlay(arr){console.log("GameO playStarted " + arr)

		//GameContext.itf.showCheckBut();
	}
	//moveItemsBackToLeft(arr) freezeItemsOnRight()	

	checkPlay(){console.log("GameO checkPlay bidButs.topBid =" + bidButs.topBid + "   targNbr= "  + bidButs.topBid)
		if(!cp.theGameInPlay){
			return;
		}
		stopThePlayClock();//So we don't get two audios at the same time
		this.itemsJustMoved=[];
		let pf = "passed";
		let reason = "--"
		const rightSide = document.getElementById("right");
		const list = [...rightSide.children]
		console.log("GameO.list=  " + list );

		let nbrActuallyPlaced = 0;
		list.forEach(child => {
			console.log("child.style.background "  + child.style.backgroundColor);
			if(child.draggable == true){
				console.log("== true " + child.id );
				this.itemsJustMoved.push(child.id)
				nbrActuallyPlaced++
			}
		})

		console.log("nbrActuallyPlaced = " + nbrActuallyPlaced )
		if(nbrActuallyPlaced > bidButs.topBid){
			const dif = nbrActuallyPlaced - bidButs.topBid;
			reason+= "You placed " + dif + " more than selected. SORRY! Those are the rules."
			this.moveItemsBackToLeft(this.itemsJustMoved);
			pf = "failed";
		}else if(nbrActuallyPlaced < bidButs.topBid){
			const dif = bidButs.topBid - nbrActuallyPlaced;
			reason+= "You placed " + dif + " too few. SORRY! Those are the rules."
			//GameContext.itf.awardPointsToOtherSide();
			this.moveItemsBackToLeft(this.itemsJustMoved);
			pf = "failed";
		}
		if(pf == "passed"){//We got this far
			let id="";
			let placement=0;
			const array = [];
			list.forEach(child => {
				console.log("child= " + child.id)
				//this.itemsJustMoved.push(child.id);
				const aBox = document.getElementById(child.id);
				[id,placement] = child.id.split(",");
				console.log("placement "  + placement);
				array.push(Number(placement))
			})
		 
			let n = 0;
			for(let i = 0;i <array.length;i++){
			if(array[i] < n){
				reason+= "At least one item was out of order. SORRY"
				pf = "failed";
				this.moveItemsBackToLeft(this.itemsJustMoved);
				break;
				}else{
					n = array[i]
				}
			}


			if(pf == "passed"){
			//GameContext.itf.reduceButtons(bidButs.topBid);
			reason+= "Sucess!! You got them all right."
				this.freezeItemsOnRight();
				bidButs.reduceButtons(bidButs.topBid);	

			}
		}
		//GameContext.itf.hideCheckBut();
		console.log("The player " + pf +  " reason= " + reason)
		GameContext.itf.stop
		GameContext.itf.displayPtsThisPlay(pf, reason);
		if (bidButs.remButs == 0) {
			enableAnsBut();
			enableNextRndBut();
			gameInPlay = false;
		}
        this.nbrMoved = 0;
	}


	cleanPlayArea(){console.log("GameO cleanUpPlayArea  " + "   "  + document.getElementById("theTable"));//
		super.cleanPlayArea();
		const theTable = document.getElementById("theTable");


		if(theTable != undefined){
			theTable.remove();
			//const collection = theTable.children ;
			const collection =	document.getElementsByClassName("container");
			console.log("GameO collection = " + collection  +   "   " + collection.length);//

			for(let j = 0;j <collection.length;j++){
				console.log(j + "  right collection  " +  collection[j]);//
				collection[j].remove();
			}

		}
	}

	moveItemsBackToLeft(arr){console.log("GameO.moveItemsBackToLeft  " + arr )
		const leftSide =document.getElementById("left");
		for(let i = 0;i <arr.length;i++){
			console.log("arr[i] = " + arr[i])
			const el = document.getElementById(arr[i]);
			leftSide.appendChild(el);
		}

	}//moveItemsBackToLeft(arr) freezeItemsOnRight()

	freezeItemsOnRight(){console.log("GameO.freezeItemsOnRight()  "   )
		const rightSide = document.getElementById("right");
		const list = [...rightSide.children]
		 console.log("list=" + list)
		for(let i = 0;i <list.length;i++){
			const el = document.getElementById(list[i].id);
			el.setAttribute('draggable', false);
			el.style.backgroundColor = '#0bff80';
			el.class="onRight"
		}
	}

	freezeItemsOnLeft(){console.log("GameO.freezeItemsOnLeft()  "   )
		const leftSide = document.getElementById("left");
		const list = [...leftSide.children]
		 console.log("list=" + list)
		for(let i = 0;i <list.length;i++){
			const el = document.getElementById(list[i].id);
			el.setAttribute('draggable', false);
			//el.style.backgroundColor = '#0bff80';
			//el.class="onRight"
		}
	}


	unFreezeItemsOnLeft(){console.log("GameO.unFreezeItemsOnLeft  "   )
		const leftSide = document.getElementById("left");
		const list = [...leftSide.children]
		 console.log("list=" + list)
		for(let i = 0;i <list.length;i++){
			const el = document.getElementById(list[i].id);
			el.setAttribute('draggable', true);
			//el.style.backgroundColor = '#0bff80';
			//el.class="onRight"
		}
	}


	butHitXX(txt){console.log("GameO.butHit" + nbr );
		
	}
		

	procGameData(){console.log("GameO.procGameData()"  + this.gameDataArray );//One,Two,Three,Four,Five,Six,Seven,Eight,
		const nbrOfButs = this.gameDataArray.length;
		bidButs.createButs(nbrOfButs,"O");
		//const newArr = []
		for (let i = 0;i< nbrOfButs;i++){
			let xx = this.gameDataArray.shift();
			const pos = xx.indexOf(";");//There may be a reference after the item example A bushel-struck;35.238 liters
			console.log("pos = " + pos);
			if(pos > 0){
				xx = xx.substring(0,pos);
				console.log("xx = " + xx);
			}
			this.ansArr.push(xx);
			this.inputArr.push(i + "," + xx);
		}		
		console.log("this.ansArr BB " + this.ansArr);
		const mixedArray = this.utl.mixUpArray(this.inputArr);
		this.fillTheBoxes(mixedArray);
		//GameContext.itf.setCheckBut();
	}
	
	helloWorld(){
		console.log("GameO.helloWorld" );
		super.helloWorld();
	}

	 getDragAfterElement(container, y) {//console.log("getDragAfterElement " + y)
	   	if(!GameContext.itf.playInProgress){
			GameContext.itf.postNotice("You need to select a button first.")
			return;
		}
	   const draggableElements = [...container.querySelectorAll('.draggable')]
		return draggableElements.reduce((closest,child) =>{
			const box = child.getBoundingClientRect()
			const offset = y - box.top - box.height / 2 
			//console.log(box + "off set= " + offset)
			if(offset < 0 && offset > closest.offset){
				console.log("  AAAA " + bidButs.topBid)  
			   return {offset:offset,element:child }
			}else {
				console.log("  BBBB " + bidButs.topBid )
			  return closest
			}
		},{
		offset:Number.NEGATIVE_INFINITY}).element   //        console.log("GameO. "  + );

   }
  // post

	showAnswers() {console.log("GameO showAnswers()  " + this.ansArr);//
		const el = document.getElementById("gameInsrtPt");
		el.innerHTML = "XXX";
		let buf = "<div><p backgroundColor='#0bff80' id='results'> </p> </div>"
		buf += "<table border='3' id='theTable' width='100%'><tr><td width='50%' background-color='#0bff80'><div class='container' id='left'>";	
		const len = this.ansArr.length;
		const butID = "";
		for (let i = 0; i < (len); i++) {
			buf += "<p class='draggable'; >" + this.ansArr[i] + "</p>\n";
		}
		buf+= "</div></td><td background-color='red'><div class='container' id='right'></div></td></tr></table>";

		el.innerHTML = buf;

		/*
		let longestQuestion = 0;
		let buf = "The Correct Order:\n"
		for (let i = 0; i < (this.ansArr.length + 1); i++) {
			const theQ = this.ansArr[i];
			console.log("theQ  " + theQ)
			if (theQ == undefined) continue;
			const charCnt = theQ.length;
			if (charCnt > longestQuestion) longestQuestion = charCnt;
			buf += theQ + "\n"
		}

		console.log("GameQ longestQuestion " + longestQuestion);//

		this.displayAnswers(buf);
		*/
	}



   fillTheBoxes(inputArray){console.log("fillTheBoxes "  + inputArray);
     const len = inputArray.length;
	 const el = document.getElementById("gameInsrtPt");
		//let buf ="<input type='button' onclick='gameO.checkPlay()' value='CHECK'>";
		let buf = "<div><p backgroundColor='#0bff80' id='results'> </p> </div>"
	 	buf+=  "<table border='3' id='theTable' width='100%'><tr><td width='50%' background-color='#0bff80'><div class='container' id='left'>";	
		for(let i = 0;i <len;i++){
			let placeNbr = 0;
			let text = "";
			[placeNbr,text] = inputArray[i].split(",")
			const butID = "but" + i + "X0" //need to add containers
			///buf += "<p class='draggable' id='" + butID + "," + placeNbr + "' "
			buf += "<p class='draggable' id='" + butID + "' "
			buf+= "name='" + placeNbr + "' "
			buf+= "draggable='true'> " + text + "</p>\n";
		}
		buf+= "</div></td><td background-color='red'><div class='container' id='right'></div></td></tr></table>";
		console.log("buf= " + buf);
		el.innerHTML = el.innerHTML + buf;//        console.log("GameO. "  + );

	  let draggables = document.querySelectorAll('.draggable')
      console.log("draggables.length= " + draggables.length);
	  const containers = document.querySelectorAll('.container')//'right
     draggables.forEach(draggable => {
     draggable.addEventListener('dragstart',()=>{
       console.log("XXXXX --"  + GameContext.itf.playInProgress)
	   if(!GameContext.itf.playInProgress){
			console.log("A A A" )
			GameContext.itf.postNotice("You need to select a button first.")
		}else{
			console.log("B B B" )
			draggable.classList.add('dragging')
		}
    })

    draggable.addEventListener('dragend',() =>{//console.log("DDD  " +  draggable.id)

		draggable.draggable='false';
       //console.log("BBBB" +  draggable.id)
	   //const theJestMoved = document.getElementById(draggable.id);
		//theJestMoved.draggable=false;
		draggable.classList.remove('dragging')
    })
  })
       
  containers.forEach(container =>{//console.log("---|||-----"  + GameContext.itf.playInProgress)
		container.addEventListener('dragover',e =>{
		e.preventDefault()
		const afterElement = this.getDragAfterElement(container, e.clientY) 
		//console.log("  AAAA " )
		const draggable = document.querySelector('.dragging')
		//console.log("draggable=  " +  draggable);
		//console.log("afterElement=  " +  afterElement);
		if(afterElement == undefined || afterElement == null){
			container.appendChild(draggable)
		} else {
			container.insertBefore(draggable,afterElement)
		}
	 })
	})
  }



  fillTheBoxesXX(inputArray){console.log("fillTheBoxes "  + inputArray);
     const len = inputArray.length;
		//let buf ="<input type='button' onclick='gameO.checkPlay()' value='CHECK'>";
		let buf = "<div><p backgroundColor='#0bff80' id='results'> </p> </div>"
	 	buf+=  "<table border='3' id='theTable' width='100%'><tr><td width='50%' background-color='#0bff80'><div class='container' id='left'>";	
		for(let i = 0;i <len;i++){
			let placeNbr = 0;
			let text = "";
			[placeNbr,text] = inputArray[i].split(",")
			const butID = "but" + i + "X0" //need to add containers
			buf+= "<p class='draggable' id='" + butID + "," + placeNbr + "' "
			buf+= "name='" + placeNbr + "' "
			buf+= "draggable='true'> " + text + "</p>\n";
		}
		buf+= "</div></td><td background-color='red'><div class='container' id='right'></div></td></tr></table>";
		console.log("buf= " + buf);
	  GameContext.ui.gamePlayArea.innerHTML =  buf;//        console.log("GameO. "  + );

	  let draggables = document.querySelectorAll('.draggable')
      console.log("draggables.length= " + draggables.length);
	  const containers = document.querySelectorAll('.container')//'right
     draggables.forEach(draggable => {
     draggable.addEventListener('dragstart',()=>{
       console.log("XXXXX --"  + GameContext.itf.playInProgress)
	   if(!GameContext.itf.playInProgress){
			console.log("A A A" )
			GameContext.itf.postNotice("You need to select a button first.")
		}else{
			console.log("B B B" )
			draggable.classList.add('dragging')
		}
    })

    draggable.addEventListener('dragend',() =>{//console.log("DDD  " +  draggable.id)

		draggable.draggable='false';
       //console.log("BBBB" +  draggable.id)
	   //const theJestMoved = document.getElementById(draggable.id);
		//theJestMoved.draggable=false;
		draggable.classList.remove('dragging')
    })
  })
       
  containers.forEach(container =>{console.log("---|||-----"  + GameContext.itf.playInProgress)
		container.addEventListener('dragover',e =>{
		e.preventDefault()
		const afterElement = this.getDragAfterElement(container, e.clientY) 
			console.log("  A A A A " + bidButs.topBid + " brMoved= " + (this.nbrMoved + 1))
			if (++this.nbrMoved >= bidButs.topBid){
				this.checkPlay();
			}
		const draggable = document.querySelector('.dragging')
		console.log("draggable=  " +  draggable);
		console.log("afterElement=  " +  afterElement);
		if(draggable && draggable instanceof Node){
		   if(afterElement){
			  container.insertBefore(draggable, afterElement)
		   } else {
			  container.appendChild(draggable)
		   }
		}

	 })
	})
  }
    

}//bottom of gameO

