// JavaScript source code
class GameC extends Game{//console.log(" =" + );
	constructor (round,cp,utl){
		super (round,cp,utl);
		this.itemsAllreadyPlaced =[];
		console.log("GameC.constructor TOP"  );
		this.utl = utl;
		this.inputArray;
		this.gameInPlay = "gameC";
		this.gameType = 'C';
		this.inputArray = [];
		this.catMap = null;
		this.itemMax=0;
		this.insrtPtRight;
		this.insrtPtLeft;
		this.tablDoc;
		console.log("GameC.constructor BOTTOM"  );
	}
	init(){
		console.log("GameC.init TOP"  );
		super.init();
		this.setUpPlayArea()
		//this.regCheckBut()
		console.log("GameC.init BOTTOM "  +  this.gameInPlay);//        console.log("GameE. "  + )
	}

	reset(){console.log("GameC.reset"  );

	}

	startPlay(){console.log("GameC startPlay " );
		this.unFreezeItemsOnLeft();
		cp.itf.showCheckBut();
	}

	cleanPlayArea(){console.log("GameB cleanUpPlayArea  "  );//this.theAnsBar
		super.cleanPlayArea();
		if(this.tablDoc != undefined)this.tablDoc.remove();
	}

	theGameInPlay(){
      console.log("gameC theGameInPlay()"  );//gameButInsrtPt
	}

	regCheckButXX(){console.log("regCheckBut()")
		const el = document.getElementById("butCheck");
		el.addEventListener("click", function(){
			gameC.check(); 
		});
	}

	freezeItemsOnLeft(){console.log("freezeItemsOnLeft "  )
		const leftSide = document.getElementById('left' );
		let itemsOnLeft = leftSide.children;
		for(let i = 0;i <itemsOnLeft.length;i++){
		  let el = document.getElementById(itemsOnLeft[i].id );
			//console.log("el.name "  + el.value)
			el.setAttribute('draggable', false);
	    }
	}

	unFreezeItemsOnLeft(){console.log("UnfreezeItemsOnLeft "  )
		const leftSide = document.getElementById('left' );
		let itemsOnLeft = leftSide.children;
		for(let i = 0;i <itemsOnLeft.length;i++){
		  let el = document.getElementById(itemsOnLeft[i].id );
			//console.log("el.name "  + el.value)
			el.setAttribute('draggable', true);
	    }
	}


    //Rows=10 Cols=1 FntSize=12 FntColor=black BkGndColor=white BoxWidth=159 BoxHeight=27 CatRows=3 CatCols=2 CatFntSize=36 CatFntColor=magenta CatLabOpaque=No PanelBkGndColor=white Sort=Yes 

 setUpPlayArea(){console.log("setUpPlayArea gameDataArray= "  + this.gameDataArray + "\n")
 	  const htmlInput = "<table border='1' id='tabl'  width='100%'><tr><td width='30%'background-color='green'><div id='left'></div></td><td background-color='red'><div id='right'></div></td></tr</table>";
	  const insrtPt = document.getElementById("gameInsrtPt");
	  insrtPt.innerHTML = insrtPt.innerHTML + htmlInput
      this.catMap = new Map();
	  const catRows = this.round.rndMap.get("CatRows");
	  const catCols = this.round.rndMap.get("CatCols");
	  this.reduceItems(this.gameDataArray,10)
      const catNbr = this.gameDataArray.length
      const catArray = [];
      let itemNbr = 0;
      let itemBuf = ""
	  const imageArray = [];
      for(let i = 0;i <catNbr;i++){ 
		  const ar = this.gameDataArray[i].split(";");
		  let catName = ar.shift()
		  if(catName.charAt(0) == "}"){
			  const pos = catName.indexOf(" ");
			  const imageName = catName.substring(0,pos);
			  imageArray.push(imageName);
			catName = catName.substring(pos+2);//There is a "*" in front of the catName
		  }
		  catArray.push(catName) ;
		  itemBuf+= ar; //This creates a long list of all the cat names
		  this.catMap.set(catName, ar);
      }	  
	  const nn = itemBuf.length;
	  if(itemBuf.charAt(nn-1) == ","){
		itemBuf = itemBuf.substring(0,nn-1);
	  }
      const itemArray = itemBuf.split(",")
	  this.itemMax = itemArray.length;
	  const mixedArray = this.utl.mixUpArray(itemArray)

	  cp.itf.setTheNbrOfbuts(this.itemMax);
	  	const defaultFontSize = getDefaultFontSize();
		console.log("***defaultFontSize = " + defaultFontSize);//font-Size:${defaultFontSize};

      let bufItems = ""
      for(let i = 0;i < this.itemMax;i++){//background-color='#ffff00'//style=" font-Size:xx-large;
		const itemName=mixedArray[i]
		if(itemName.length > 0){
			bufItems += "<input type='button' id='" + itemName +"' class='draggableC' draggable='true' value='" + itemName +  "' style='font-Size:" + defaultFontSize + "'>\n";		
		}
	  } 
	  this.insrtPtLeft = document.getElementById("left");
      this.insrtPtLeft.innerHTML = this.insrtPtLeft.innerHTML + bufItems;   
      let buf = "<table border='1'  width='100%'>";
      let n = 0;
      for(let i = 0;i <catRows;i++){
         buf+="<tr height='60px' >" 
         for(let j = 0;j <catCols;j++){
            const butID = "cat" + i + "X" + j;//draggable='true'  class='draggable' //style='text-align:center;fontSize:36px'           
			const  insrtPtA = "gameCimageInsertPt" + n
			const catName = catArray[n++];
			if(typeof(catName) == "undefined")break;
            //buf+= "<td class='containerC' id='" + catName + "'><p id='"+insrtPtA +"'></p><p  class='catName' id='" + catName + "' > " + catName + "</p></td>\n";
            buf+= "<td class='containerC' id='" + catName + "'><p id='"+insrtPtA +"'></p><p  id='" + catName + "'" +  " style='font-Size:" + defaultFontSize +   "'' > " + catName + "  </p></td>\n";
         } 
         buf+="</tr>"
     }  
     buf+= "</table>";
	 this.freezeItemsOnLeft();
     const el = document.getElementById("right");
     el.innerHTML = el.innerHTML + buf;    
     let draggables = document.querySelectorAll('.draggableC' );    
     draggables.forEach(draggable => {
		draggable.addEventListener('dragstart',()=>{
		draggable.classList.add('dragging')
	 })
    draggable.addEventListener('dragend',() =>{
		draggable.classList.remove('dragging')
		})
	})


   const containers = document.querySelectorAll('.containerC')         
   containers.forEach(container =>{                             
     container.addEventListener('dragover',e =>{
     e.preventDefault()
     const afterElement = this.getDragAfterElement(container, e.clientY)
     const draggable = document.querySelector('.dragging')
     container.appendChild(draggable)
     if(afterElement == null){
		//console.log("---container.appendChild "  )
       container.appendChild(draggable)
     } else {
		//console.log("+++container.insertBefore "  )
        container.insertBefore(draggable,afterElement)
	 }
   })
   }) 

   if(imageArray.length > 0)this.insrtImages(imageArray);//console.log("= " +  );
   this.tablDoc = document.getElementById("tabl");
   //cp.itf.setCheckBut();
 }

freezeItem(theID){console.log("freezeItem  " +  theID )
	const el = document.getElementById(theID);
	el.setAttribute('draggable', false);
	el.style.backgroundColor = '#0bff80';
	el.class="frozen"		
}


	getDragAfterElement(container, y){ //console.log("getDragAfterElement " +  y)
	   const draggableElements = [...container.querySelectorAll('.draggable')]
		return draggableElements.reduce((closest,child) =>{
			const box = child.getBoundingClientRect()
			const offset = y - box.top - box.height / 2 
			return closest
		},{offset:Number.NEGATIVE_INFINITY}).element   
    }

	freezeTheseItems(listOfItems){console.log("listOfAllPlacedItems " +  listOfItems)
		const array = listOfItems.split(",");
		for(let i = 0;i <array.length;i++){
		  if(array[i].length > 1){
			this.itemsAllreadyPlaced.push(array[i]);
			const el = document.getElementById(array[i])
			if(el.nodeName == "INPUT"){
				//console.log("el.nodeName=  " +  el.nodeName);
				el.style.background='red';
				el.setID= "-" + array[i]  ;
				el.setAttribute('draggable', false);
			}
		  }
		}
		console.log("this.itemsAllreadyPlaced=  " +  this.itemsAllreadyPlaced);
	 }

	 returnItemToLeft(listOfAllPlacedItems){console.log("returnItemToLeft  " + listOfAllPlacedItems );		 
		 const array =  listOfAllPlacedItems.split(",");
		 const leftSide = document.getElementById('left')
		 for(let i = 0;i <array.length;i++){
		   const el = document.getElementById(array[i])
		   if(el != null){      
			 const btnStyle = getComputedStyle(el);
			 const btnColor = btnStyle['background-color'];  
			 if(btnColor == "rgb(0, 255, 128)"){//green
			   leftSide.appendChild(el)
			 }
		   }
		 }
	 }


	 checkPlay(){console.log("************checkPlay  " +  "   targNbr= "  + cp.itf.targNbr  )//targNbr
		let reason = "";
		let gotOneWrong = false;
		stopTheClock();
		let pf = "passed";
		let nbrActuallyPlaced = 0;
		let passedPlacement = true;
		let containers = document.querySelectorAll('.containerC' );
		const catsWithItems = [] 
		let listOfAllPlacedItems =  ""//so we can either move them back or freeze them
		const arrItemsPlaced = [];
		for(let i = 0;i <containers.length;i++){
		    let el = document.getElementById(containers[i].id)                                       
			if(el != null){
			  let collection = el.children ;
			  const arrayX = [];
			  for(let j = 0;j <collection.length;j++){
					 arrayX.push(collection[j].id);
			  }
			  if(arrayX.length > 2){//Example = gameCimageInsertPt2,Wyoming
				catsWithItems.push(arrayX)
				listOfAllPlacedItems+=  arrayX.slice(1) +  "," ;//The slice gets the just cat name
			  }
			}
	   }
	   for(let i = 0;i <catsWithItems.length;i++){
		  const insrtPt = 	catsWithItems[i].shift();//We don't use this, but it is in the way, so we shift it out'
		  const catName = catsWithItems[i].shift();//We don't use this, but it is in the way, so we shift it out'
		  const itemsThatWerePlaced =   catsWithItems[i]  //we shifted out the cat name
		  const listOfItemsForThisCat =  this.catMap.get(catName) ;
			 for(let k = 0;k <itemsThatWerePlaced.length;k++){
			   const  onePlacedItem = itemsThatWerePlaced[k];//this.itemsAllreadyPlaced
			   const check = this.itemsAllreadyPlaced.indexOf(onePlacedItem);
				if(check > -1){
					//console.log("||onePlacedItem  + its in the already placed" + onePlacedItem )						
				}else{
					nbrActuallyPlaced++;
					if(listOfItemsForThisCat.indexOf(onePlacedItem) == -1){
						passedPlacement = false;
					}
					//console.log("******onePlacedItem  + its newly placed nbrActuallyPlaced= " + nbrActuallyPlaced )
				}
			 }
	   }

		const nbrButs = Number(cp.itf.targNbr)//For some reason this came back as a string			

		if(nbrActuallyPlaced > nbrButs){
			const dif = nbrActuallyPlaced - nbrButs;
			reason+= "You placed " + dif + " more than selected. SORRY! Those are the rules."
			pf = "failed";
		}else if(nbrActuallyPlaced < nbrButs){
			const dif = nbrButs - nbrActuallyPlaced;
			reason+= "You placed " + dif + " too few."
			pf = "failed";
		}

		//We we fail the numbers, we want that to be the reason, so we check that first

		if(pf == "passed"){//We got this far and the nunbers are OK, so we see if placement worked
			if(!passedPlacement){
				pf = "failed";
				reason+= "You got at least one wrong.";
			}else{
				console.log("ok= " );
			}
		}
		if(pf == "failed"){
			this.returnItemToLeft(listOfAllPlacedItems);    
		}else{
			pf = "passed";
			this.freezeTheseItems(listOfAllPlacedItems);
		} 		
		cp.itf.displayPtsThisPlay(pf,reason);
		cp.itf.hideCheckBut();
		this.freezeItemsOnLeft();
	 }

	reduceItems(catArr,nbr){console.log("reduceItems nbr= " + nbr);
	   let itemCount  = this.countCatItems(catArr);
	   while(itemCount >= (nbr+1)){
		  //console.log("******itemCount= " + itemCount);
		  const catArrItemCount =  this.getCountArr(catArr);
		  const catMax = this.getCatMax(catArrItemCount) ;
		  catArr[catMax] = this.reduceAnItemFromCatArr(catArr[catMax]);
		  itemCount  = this.countCatItems(catArr);
		}
   
   return catArr.join(",");  
}
 
  listCats(str){
	const catArr = str.split(",");
    for(let i = 0;i <catArr.length;i++){
        console.log(i + " cats " + catArr[i] );
    }
}

  reduceAnItemFromCatArr(str){//console.log("before = " + str);
   const arr = str.split(";");
   const n = arr.length-1;
   let nn = Math.floor(1 + Math.random() * (n - 1 + 1));
   if(nn <1 || nn >= n)nn = Math.floor(1 + Math.random() * (n - 1 + 1));
   if(nn <1 || nn >= n)nn = Math.floor(1 + Math.random() * (n - 1 + 1));
   if(nn <1 || nn >= n)nn = Math.floor(1 + Math.random() * (n - 1 + 1));
   if(nn <1 || nn >= n)nn = 2;
   const temp = arr.splice(nn,1);
   return arr.join(";");  
}

  getCatMax(catArrItemCount){console.log("getCatMax top" );
	  let h = 0;
	  let theCatNbr = 0;
	  for(let i = 0;i <catArrItemCount.length;i++){
		 if(catArrItemCount[i] > h){
			h =  catArrItemCount[i];
			theCatNbr = i;
		 } 
	  }
		console.log("getCatMax bottom max = " + theCatNbr);
	return theCatNbr;
  } 

  getCountArr(catArr){console.log("reduceItems" );
    const catCount = [];
    let totalCount = 0;
    for(let i = 0;i <catArr.length;i++){
        //console.log(i + " cats " + catArr[i] );
        const theItemCount =  (catArr[i].split(";").length)- 2;
        totalCount+= theItemCount;
        catCount.push(theItemCount);
    }
    return catCount;
}

  countCatItems(catArray){
   let totalCount = 0;
   for(let i = 0;i <catArray.length;i++){
      const theItemCount =  (catArray[i].split(";").length)- 2;//Drop the Cat. The last ";" = an item
      totalCount+= theItemCount;
  }
  return totalCount;
}

  removeAnItem(str){console.log("before= " +str);
   const arr = str.split(";");
   const n = arr.length-1;
   //console.log("n = " +  n );  
   let r = Math.round((Math.random(n) * 10));
   if(r == 0) r =1; //Don't remove cat
   //console.log("r = " + r );
   const temp = arr.splice(r,1);
   //console.log("temp =" + temp);
   //console.log("after =" + arr);
   return arr.join(";");
}

  getTheHighestNbrCatsxx(nbrArr){console.log("getTheHighestNbr" + nbrArr);
	  let h = 0;
	  const arrOfHighestNbrs =[];
	  for(let i = 0;i <nbrArr.length;i++){
		 if(nbrArr[i] > h)h=  nbrArr[i]; 
	  }
	  //console.log("HighestNbr" + h);
	   for(let i = 0;i <nbrArr.length;i++){
		 if(nbrArr[i] == h)arrOfHighestNbrs.pushle.log("newCat = " + newCat); 
	   }
	}

   insrtImages(imageArray){console.log("insrtImages"  );
      for(let i = 0;i <imageArray.length;i++){
		//console.log("************imageArray[i]= " + imageArray[i] );
		let imageFilePath = imageArray[i];//}P.AA.Pi.Th.Sp.Ic.Soccer.FD-a.jpg
		//Here we need to see if the image is adjusted like ".FD-a.jpg" the "-a" means that it is to be adjusted
		const imagePathParts = imageFilePath.split(".");
		const arrayLen = imagePathParts.length;
		let penAltPart = imagePathParts[arrayLen-2];
		const len = penAltPart.length;
		const orgSizeCode = imagePathParts[arrayLen-2];//take out the adjuctments if any
		const widthAndHeight = getImageSize(orgSizeCode);//get the width and height
		const sizeArray = getImageSize(orgSizeCode);
		imagePathParts[arrayLen-2] = imagePathParts[arrayLen-2].substring(0,2);//we need to get the image 
		imageFilePath = imagePathParts.join(".")
		const imageFile = getImageFile(imageFilePath)[0];
		const insrtPT = "imageInsertPt" + i
		const str = `<img class='gameC-Image' src='${imageFile}'  width='${sizeArray[0]}'  height='${sizeArray[1]}'   />`;// id='${insrtPT}'
		const insrtPt = "gameCimageInsertPt" + i;
		const imageInsertPt = document.getElementById(insrtPt);
		imageInsertPt.innerHTML = imageInsertPt.innerHTML + imageFile;//str
	  }
	}
	 
	 
  }


