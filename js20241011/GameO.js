// JavaScript source code
class GameO  extends Game{//const sampleRound = ",AA.Oen00001,EdUGames tm,,2,,,,Te,,,aPRA1_0 zPRA1_15 ,,,,,Test/Order,Place the numbers on the LEFT in order on the RIGHT with the largest number on the bottom Make a mistake or two and press the CHECK button to see what happens.,,Rows=8 Cols=1 FntSize=18 FntColor=magenta BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes,One,Two,Three,Four,Five,Six,Seven,Eight,,,,,,,,,,,";

	constructor (round,cp,utl){ 
		//console.log("GameO.constructor TOP round= " + round );//
		super (round,cp,utl);
		this.procGameData;
		this.butLst;
		this.ans;
		this.mbArray =[];
		this.boxesJustPlaced=[]
		this.nbrToBeMet=0;
		this.okToMove = false;
		this.itemsJustMoved=[]
		this.nbrToBePlaced = 0;
	}
	init(){
		console.log("GameO.init TOP"  );//		console.log("GameO.  " +  )
		super.init();
		this.gameName = 'GameO';
		this.procGameData();	
		//this.addListeners();
		console.log("GameO.init BOTTOM "  +  this.gameInPlay);//        console.log("GameI. "  + );
	}
//child= but2X0,1

	testA(){console.log("GameO.testA  "   );
		this.freezeItemsOnLeft();
	}

	testB(){console.log("GameO.testB  "  );
		this.unFreezeItemsOnLeft();
	}

	cleanPlayArea(){console.log("GameO cleanUpPlayArea  "  );//
		super.cleanPlayArea();
		/*
		let left = document.getElementById("left");
		if(left != undefined){
			const  collection = left.children ;
			console.log("GameO collection = " + collection );//
			for(let j = 0;j <collection.length;j++){
				console.log(j + " left  collection  " +  collection[j]);//
				collection[j].remove();
			}
		}
		*/
		const theTable = document.getElementById("theTable");
		if(theTable != undefined){
			const collection = theTable.children ;
			console.log("GameO collection = " + collection );//
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


	butHit(txt){console.log("GameO.butHit" + nbr );
		
	}

	
	playStarted(arr){console.log("GameO playStarted " + arr)
		this.sidePlaying = arr[0];
		this.butNbr = Number(arr[1]);
		this.nbrToBePlaced = this.butNbr;

	}
	//moveItemsBackToLeft(arr) freezeItemsOnRight()

	

	
   checkPlay(){console.log("GameO checkPlay this.nbrToBePlaced =" + this.nbrToBePlaced + "   nbrButSelected= "  + cp.itf.nbrButSelected)
		if(!cp.theGameInPlay){
			return;
		}
		this.itemsJustMoved=[];
		let pf = "passed"; //p ass "failed"
		let reason = "--"
		const rightSide = document.getElementById("right");
		const list = [...rightSide.children]
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
		if(nbrActuallyPlaced > cp.itf.nbrButSelected){
			const dif = nbrActuallyPlaced - cp.itf.nbrButSelected;
			reason+= "You placed " + dif + " more than selected. SORRY! Those are the rules."
			//cp.itf.awardPointsToOtherSide();
			this.moveItemsBackToLeft(this.itemsJustMoved);
			pf = "failed";
		}else if(nbrActuallyPlaced < cp.itf.nbrButSelected){
			const dif = cp.itf.nbrButSelected - nbrActuallyPlaced;
			reason+= "You placed " + dif + " too few. SORRY! Those are the rules."
			//cp.itf.awardPointsToOtherSide();
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
			//cp.itf.awardPointsToOtherSide();
			this.moveItemsBackToLeft(this.itemsJustMoved);
				break;
			}else{
				n = array[i]
			}
			}
			if(pf == "passed"){
			reason+= "Sucess!! You got them all right."
			this.freezeItemsOnRight();
			//cp.itf.awardPointsToSidePlaying();
			}
	}
		console.log("The player " + pf +  " reason= " + reason)
		cp.itf.displayPtsThisPlay(pf,reason);

	// const resultsArr = [];

	//resultsArr.push(pf);
	//resultsArr.push(buf);
	//return resultsArr;
		 
}



	procGameData(){console.log("GameO.procGameData()"  + this.gameDataArray );//One,Two,Three,Four,Five,Six,Seven,Eight,
				
		const nbrOfButs = this.gameDataArray.length;
		cp.itf.setTheNbrOfbuts(nbrOfButs);
		const newArr = []
		for (let i = 0;i< nbrOfButs;i++){
			newArr.push(i + "," + this.gameDataArray.shift());
		}
		const mixedArray = this.utl.mixUpArray(newArr);
		this.fillTheBoxes(mixedArray);
		//cp.itf.setCheckBut();
	}
	
	helloWorld(){
		console.log("GameO.helloWorld" );
		super.helloWorld();
	}

	 getDragAfterElement(container, y) {//console.log("getDragAfterElement " + y)
	   	if(!cp.itf.playInProgress){
			cp.itf.postNotice("You need to select a button first.")
			return;
		}
	   const draggableElements = [...container.querySelectorAll('.draggable')]
		return draggableElements.reduce((closest,child) =>{
			const box = child.getBoundingClientRect()
			const offset = y - box.top - box.height / 2 
			//console.log(box + "off set= " + offset)
			if(offset < 0 && offset > closest.offset){  
			   return {offset:offset,element:child }
				//console.log("  AAAA " )
			}else {
			  return closest
				//console.log("  BBBB " )
			}
		},{
		offset:Number.NEGATIVE_INFINITY}).element   //        console.log("GameO. "  + );

   }
  // post



  fillTheBoxes(inputArray){//console.log("fillTheBoxes "  + inputArray);
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
			buf+= "<p class='draggable' id='" + butID + "," + placeNbr + "' "
			buf+= "name='" + placeNbr + "' "
			buf+= "draggable='true'> " + text + "</p>\n";
		}
		buf+= "</div></td><td background-color='red'><div class='container' id='right'></div></td></tr></table>";
		//console.log("buf= " + buf);
		el.innerHTML = el.innerHTML + buf;//        console.log("GameO. "  + );

	  let draggables = document.querySelectorAll('.draggable')
      //console.log("draggables.length= " + draggables.length);
	  const containers = document.querySelectorAll('.container')//'right
     draggables.forEach(draggable => {
     draggable.addEventListener('dragstart',()=>{
       console.log("XXXXX --"  + cp.itf.playInProgress)
	   if(!cp.itf.playInProgress){
			//console.log("A A A" )
			cp.itf.postNotice("You need to select a button first.")
		}else{
			//console.log("B B B" )
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
       
  containers.forEach(container =>{//console.log("---|||-----"  + cp.itf.playInProgress)
		container.addEventListener('dragover',e =>{
		e.preventDefault()
		const afterElement = this.getDragAfterElement(container, e.clientY) 
		///console.log("  AAAA " )
		const draggable = document.querySelector('.dragging')
		///console.log("  BBBB" )    
		if(afterElement == null){
		   container.appendChild(draggable)
		} else {
		container.insertBefore(draggable,afterElement)
		}
	 })
	})

  }
  
//		   console.log("GameO=" + )

	


	
	


  

}//bottom of gameO

