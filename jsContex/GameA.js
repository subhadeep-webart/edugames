// JavaScript source code


class GameA extends Game{//console.log("GameA  = " + );
	constructor(round, context) {
		super(round, context);
		this.context = context;
		//this.utl = utl;
		this.inputArray;
		this.htmlImage;
		this.ptInc = 0;
		this.firstHit=true
		this.gameInPlay = "gameA";
		this.gameType = 'A';
		this.theImage;
		this.imageName;
		this.imageArray =[];
		this.imageWidth;
		this.imageHeight;
		this.imagePath;
		this.symArray;
		this.rightArray =[];
		this.wrongArray =[];
		this.ctx;
		this.ltrCoord= [];
		this.ltrCount = 0;
		console.log("GameA.constructor Bottom"  );
	}
	init(){
		console.log("GameA.init TOP"  );
		super.init();
		this.getImageData();//We are assuming only one image, but this needs to be adjusted for more
		this.createCanvas();
		this.createTheWrkArndImage();
		//this.insertImageA();
		this.procSym();
		//this.testA();
		this.addEventListener();

		console.log("GameA.init Bottom "  +  this.gameInPlay);//  
	}

	helloWorld(){
	console.log("GameA.helloWorld" );//     console.log("  = " + );
		super.helloWorld();
	}
	//http://wordpress-test-site.local/wp-content/uploads/2024/02/SailBoat.KG_.jpg
	
	testA(){
		this.insertImage();
		this.procSym();
	}

	insertImageA(){//src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Tr/Na/SailBoat/SailBoat.KG.gif'
		const base_image = new Image();
		//base_image.src = '../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Tr/Na/SailBoat/SailBoat.KG.jpg';
		  base_image.src = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Tr/Na/SailBoat/SailBoat.KG.jpg";
		this.ctx.drawImage(base_image, 0, 0);
	}

	insertImage(){ console.log("insertImage " + this.htmlImage.src);

		 const test = document.getElementById("tempImageInsrtPt");//
		 test.innerHTNL = test.innerHTNL + this.htmlImage

		 drawImage(this.htmlImage,5,5);

	}

	testC(){
		const c = document.getElementById("myCanvas");
		const ctx = c.getContext("2d");
		const img = document.getElementById("testImage");
		ctx.drawImage(img, 10, 10);
		ctx.fillRect(30,50,25,25);
		console.log("ctx  = " + ctx );

	}

	createTestImage(){ console.log("createImage "  );
		this.theImage = document.createElement('img');
		this.theImage.src = "images/SailBoat.KG.gif";

	}

	addEventListener(){
		const theCanvas = document.getElementById('theCanvas');
	    theCanvas.addEventListener('click', function(event) {
		console.log("click " + event.offsetX);
			gameA.getHit(event.offsetX,event.offsetY);
		});

	}

	getHit(x,y){	console.log("getHit x= " + x  + " y= " + y );
		console.log("ltrCoord = "  + this.ltrCoord);
		for(let i = 0;i < this.ltrCoord.length;i++){//ltrCoord=
			console.log("ltrCoord[i] = "  + this.ltrCoord[i]);
			const arr = this.ltrCoord[i].split(",");
			const loc = arr[0];
			console.log(x + "  "  + y + "  " + loc );
			const recParts = loc.slice(0,3) + ";" + loc.slice(3,6) + ";" +loc.slice(6,9) + ";" + loc.slice(9,12);
			if((x > Number(recParts[0]) && x < (Number(recParts[0]) + Number(recParts[2]))) &&  (y > Number(recParts[1]) && y < (Number(recParts[1]) + Number(recParts[3])))){
				console.log(" Got a hit = " +  this.nameArray[i]);
				if(arr[1] == "R"){
					console.log("Success "  );
				}else{
					console.log("failure "  );
				}
			}else{
				   console.log("MISSED"  );

			}
		}
	}


	createCanvas(){    console.log("createCanvas "  );
		const canvas = "<canvas id='theCanvas' style='border:1px solid #000000;' width='"+ this.imageWidth + "' height='"+this.imageHeight +"'></canvas>";
		console.log("canvas  = " + canvas);
		const canvasInsertPt = document.getElementById('gameAImageInsrtPt');
		canvasInsertPt.innerHTML = canvasInsertPt.innerHTML + canvas;
		const myCanvas = document.getElementById("theCanvas");
		this.ctx = myCanvas.getContext("2d")
	}



	doSomethingElse(){
		console.log("doSomethingElse "  );
		this.ctx.fillStyle = "blue";
		this.ctx.fillRect(0, 0, 50,50,this.width,this.height);// 

	}



	createTheWrkArndImage(){console.log("^^^^^^^^^^createTheWrkArndImage  = " + this.theImage);

		const anImage = getImageFile(this.theImage,"theImage");
		console.log("**********anImagee0  = " + anImage[0]);
		console.log("**********anImagee1  = " + anImage[1]);
		console.log("**********anImagee2  = " + anImage[2]);
		console.log("**********anImagee3  = " + anImage[3]);
		console.log("**********anImagee4  = " + anImage[4]);
		console.log("**********anImagee5  = " + anImage[5]);
		//const topInsrtPt = document.getElementById("topInsrtPt");
		const topInsrtPt = document.getElementById("imageInsertPt");
		topInsrtPt.innerHTML = topInsrtPt.innerHTML + anImage[1];
		const wrkArndImage = document.getElementById("gameAImage");
		this.ctx.drawImage(wrkArndImage,2,2,100,100);
		wrkArndImage.style.display = "none";
	}

	
	getImageData(){console.log("getImageData = " + this.gameDataArray );
         console.log("$$$$this.gameDataArray[0] = " + this.gameDataArray[0] );
		this.theImage = this.gameDataArray.shift();//                  console.log("GameA  = " + );
		console.log("##########this.theImage = " + this.theImage );
		this.imageArray  = getImageFile(this.theImage,"gameAImage");
		this.htmlImage = this.imageArray[0];
		this.imagePath   = this.imageArray[1];
		this.imageWidth  = this.imageArray[2] ;
		this.imageHeight = this.imageArray[3] ;
		this.theImage = this.imageArray[4] ;
		this.symArray    = this.gameDataArray;//document.getElementById("img1").style.zIndex = "1";
		console.log("this.htmlImage = " + this.htmlImage );
	}

	//,Which is the Bow?,,Sort=Yes ,}P.AA.Pi.Th.Tr.Na.SailBoat.KGDB.gif,
	//{A-4red 009118038066 180,{A-4red 373118038066 180,{R-4red 004054057057,{W-4red 361055057057,

	procDataX(){     console.log("GameA procData() = " + this.gameDataArray);
		const firstItem =  this.gameDataArray[0];

	}
	

	/*
	0  == {R-1red 015013010010
GameA.js:96 1  == {W-1red 033013010010
GameA.js:96 2  == {R-2red 078011014014
GameA.js:96 3  == {W-2red 106012014014
GameA.js:96 4  == {R-5red 352013036036
GameA.js:96 5  == {W-5red 411012036036
GameA.js:96 6  == {A-5red 395084045080 000
GameA.js:96 7  == {A-1red 012035017024 000
GameA.js:96 8  == {A-2red 088032024038 000
GameA.js:96 9  == {A-4green 091080038038 315
GameA.js:96 10  == {A-4green 089130058038 270
GameA.js:96 11  == {A-4green 099178038038 225
GameA.js:96 12  == {A-4green 148198038066 180
GameA.js:96 13  == {C-4magenta 157008080080
GameA.js:96 14  == {C-1magenta 012074020020
GameA.js:96 15  == {D-5magenta 245010100100
GameA.js:96 16  == {F-5orange 286134100100
GameA.js:96 17  == {B-2lightGray 010113040040
GameA.js:96 18  == {B-5lightGray 016251100005
GameA.js:96 19  == {B-4lightGray 237138004080

*/
	procSym(){console.log("********procSym. "  + this.symArray);
	
		const len = this.symArray.length;//this.imageName =
		let letterCount = 0
		const fullLeterArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"]
		for(let i = 0;i <len;i++){
			const rw = this.gameDataArray[i].charAt(1);//console.log("  = " );
			if(rw == "R" || rw == "W"){letterCount++}
		}
		const ltrArray = this.utl.mixUpArray(fullLeterArray.slice(0,letterCount));
		const ltrMap = new Map();//We are going to map letter to right and wrong

		letterCount = 0;
		for(let i = 0;i < len;i++){//
			console.log("||| this.gameDataArray[i] = " +this.gameDataArray[i])
			if(this.gameDataArray[i] == "") return;
			const token = this.gameDataArray[i];
			const array = this.gameDataArray[i].split(" ");
			const x = array[0];
			const type = x.charAt(1)
			const size = x.charAt(3)
			const color = x.substring(4);//{A-4green 148198038066 180
			const whArr = this.getSizeArray(array[1]);
			
			console.log("||type = " + type + " size = " + size + " color = " + color );
			
			switch (type) {
			case 'C':
				this.placeCircle(size,color,whArr);
				break;
			case 'R':
				const tempR = token.split(" ");
				this.rightArray.push(i);
				ltrMap.set(letterCount,true)
				this.ltrCoord.push(tempR[1] + ",R," + ltrArray[this.ltrCount]   )
				this.placeALetter(ltrArray[letterCount++],size,color,whArr);
				break;
			case 'W':
				const tempW = token.split(" ");
				this.rightArray.push(i);
				this.ltrCoord.push(tempW[1] + ",W," +  ltrArray[this.ltrCount] )
				ltrMap.set(letterCount,false)
				this.placeALetter(ltrArray[letterCount++],size,color,whArr);
				break;
			case 'A':
				this.placeArrow(token)//"{A-4blue 020138038066 180"
				break;
			case 'F':
				this.placeFrame(size,color,whArr )//{B-4blue 011008150010
				break;
			case 'B':
				this.placeBlock(size,color,whArr )//{B-4blue 011008150010
				break;
			}
		}
				
	}

	placeBlock(size,color,whArr){// F = frame B = BLock
		this.ctx.fillStyle = color;
		this.ctx.lineWidth = size;
		this.ctx.fillRect(whArr[0],whArr[1],whArr[2],whArr[3]);
		this.ctx.stroke();
	}

	placeFrame(size,color,whArr){
		this.ctx.fillStyle = color;
		this.ctx.lineWidth = size;
		this.ctx.beginPath();
		this.ctx.rect(whArr[0],whArr[1],whArr[2],whArr[3]);
		this.ctx.stroke();
	}

	placeArrow(token){
//console.log("placeArrwo size= " + size+ " color= " +color+ " whArr= " +whArr+ " orientation= " +orientation);		
		const temp = token.split(' ');
		const direction = temp[2];
		const brkDwn = this.breakDownToken(token);//return [type,size,color,xloc,yloc,h,w];
		this.ctx.fillStyle = brkDwn[2];
		let xx= [] ; let yy= [];
		[xx,yy] = this.getCoords(brkDwn[1],brkDwn[1], brkDwn[1],direction);
		this.ctx.beginPath();
		this.ctx.lineCap= "round" ;
		this.ctx.lineWidth = brkDwn[1];
		this.ctx.strokeStyle= brkDwn[2];
		//const startX = xx[0];
		//const startY = yy[0];
		this.ctx.moveTo((xx[0] + brkDwn[3]),(yy[0] + brkDwn[4] ));
		for(let i = 1;i <xx.length;i++){
			this.ctx.lineTo((xx[i]  + brkDwn[3]),(yy[i] + brkDwn[4]));
		}
		this.ctx.lineTo((xx[0]  + brkDwn[3]),(yy[0] + brkDwn[4]));//closing the shape?
		this.ctx.stroke();
	}

	breakDownToken(token){
		let typeSizeColor = "";
		let coord  = "";
		let dir = "";
		[typeSizeColor,coord,dir] = token.split(' ');
		const type = typeSizeColor.charAt(1)
		const size = typeSizeColor.charAt(3);
		const color = typeSizeColor.slice(4,99);
		const xloc = Number(coord.slice(0,3).trim()) * 1;
		const yloc = Number(coord.slice(3,6).trim()) * 1;
		const h = Number(coord.slice(6,9).trim()) * 1;
		const w = Number(coord.slice(9,12).trim()) * 1;
		return [type,size,color,xloc,yloc,h,w];

} 

	placeALetter(aLet,size,color,whArr){//Pxl size XL - S 36,28,21,14,10
		console.log("placeLetter aLet= " + aLet + " size= " + size +  " color= " + color  + " whArr= " + whArr );
		const sn = (size * 10);
		const sT = sn+ "px Arial"
		this.ctx.font = sT;
		whArr[1]= Number(size*7) + Number(whArr[1]);
        console.log("whArr[0]  = " + whArr[0] + "  whArr[1]= " +  whArr[1]);
		this.ctx.fillText(aLet, whArr[0], whArr[1]);
	}
	     
	getSizeArray(size){console.log("getSizeArray  = " + size);
		const arr = [];
		arr.push(Number(size.substring(0,3)));
		arr.push(size.substring(3,6));
		arr.push(size.substring(6,9));
		arr.push(size.substring(9,12));
		return arr;
	}

	placeCircle(size,color,arr){//console.log("placCircle size= " + size + "  color= " + color + " orientation=  " + orientation );
		//const arr = this.getSizeArray(orientation)
		this.ctx.fillStyle = color;
		this.ctx.lineWidth = size;
		this.ctx.beginPath();
		const centerFmRight = (Number(arr[0]) +  Number(arr[2])/2)//
		const centerFmTop = (Number(arr[1]) +  Number(arr[3])/2)
		const radious = (Number(arr[2]) + Number(arr[3]))/4
        //console.log(" centerFmRight = " + centerFmRight + " centerFmTop  "  + centerFmTop  + " radious = " +radious );		
		this.ctx.arc(centerFmRight, centerFmTop, radious, 0, 2 * Math.PI);
		this.ctx.stroke();

	}
	//bottom of game a code***************
	        //                  console.log("  = " + );

 getCoords(size,h, w,direction) {
    direction = direction * 1; let n = 10; const xx = []; const yy = [];
    let z1 = 0; let z2 = 0; let z3 = 0; let z4 = 0; let z5 = 0; let  z6 = 0;
    for(let i = 0;i < 10;i++){
        xx[i] = 0; yy[i] = 0;
    }
    let t = size * 4;
    switch (direction) {//console.log("  = " + )
      case 90:
      case 270:
        w = 10 + size * 12;h = 10 + size * 7;z1 = h / 2 - t / 4;z2 = h / 2 + t / 4;z3 = w - t;z4 = w / 2;
        break;
      case 0:
      case 180:
        h = 10 + size * 14;w = 10 + size * 7;z1 = w / 2 - t / 4;z2 = w / 2 + t / 4;z3 = h - t;z4 = h / 2;
        break;
      case 45:
      case 135:
      case 225:
      case 315:
        w = 10 + size * 7;h = 10 + size * 7;z1 = w / 2;z2 = w - t / 2;z3 = t / 2;z4 = w - t;z5 = w / 2 - t;z6 = w / 2 + t;
      break;
    }

    switch (direction) {
      case 315:xx[0] += w; yy[0] += z2;xx[1] += t; yy[1] += z3;xx[2] += z6; yy[2] += z3;xx[3] += z6; yy[3] += 0;xx[4] += 0; yy[4] += 0;xx[5] += 0; yy[5] += z6;xx[6] += z3; yy[6] += z6;xx[7] += z3; yy[7] += t;xx[8] += z2; yy[8] += h;xx[9] += w; yy[9] += h;
        break;
      case 225:xx[0] += w - z3; yy[0] += 0;xx[1] += z3; yy[1] += z4;xx[2] += z3; yy[2] += z5;xx[3] += 0; yy[3] += z5;xx[4] += 0; yy[4] += h;xx[5] += z6; yy[5] += h;xx[6] += z6; yy[6] += z2;xx[7] += t; yy[7] += z2;xx[8] += w; yy[8] += z3;xx[9] += w; yy[9] += 0;
        break;
      case 135:
        xx[0] += 0; yy[0] += z3;xx[1] += z4; yy[1] += z2;xx[2] += z5; yy[2] += z2;xx[3] += z5; yy[3] += h;xx[4] += w; yy[4] += h;xx[5] += w; yy[5] += z5;xx[6] += z2; yy[6] += z5;xx[7] += z2; yy[7] += z4;xx[8] += z3; yy[8] += 0;xx[9] += 0; yy[9] += 0;
        break;
      case 45:
        xx[0] += z3; yy[0] += h;xx[1] += z2; yy[1] += t;xx[2] += z2; yy[2] += z1 + t;xx[3] += w; yy[3] += z1 + t;xx[4] += w; yy[4] += 0;xx[5] += z1 - t; yy[5] += 0;xx[6] += z1 - t; yy[6] += z3;xx[7] += w - t; yy[7] += z3;xx[8] += 0; yy[8] += h - z3;xx[9] += 0; yy[9] += h;
        break;
      case 0:
        xx[0] += z2; yy[0] += h;xx[1] += z2; yy[1] += t;xx[2] += w; yy[2] += z4 + t;xx[3] += w; yy[3] += z4;xx[4] += z2; yy[4] += 0;xx[5] += z1; yy[5] += 0;xx[6] += 0; yy[6] += z4;xx[7] += 0; yy[7] += z4 + t;xx[8] += z1; yy[8] += t;xx[9] += z1; yy[9] += h;
        break;
      case 90:
        xx[0] += 0; yy[0] += z1;xx[1] += z3; yy[1] += z1;xx[2] += z4 - t; yy[2] += 0;xx[3] += z4; yy[3] += 0;xx[4] += w; yy[4] += z1;xx[5] += w; yy[5] += z2;xx[6] += z4; yy[6] += h;xx[7] += z4 - t; yy[7] += h;xx[8] += z3; yy[8] += z2;xx[9] += 0; yy[9] += z2;
        break;
      case 180:
        xx[0] += z1; yy[0] += 0;xx[1] += z1; yy[1] += z3;xx[2] += 0; yy[2] += z4 - t;xx[3] += 0; yy[3] += z4;xx[4] += z1; yy[4] += h;xx[5] += z2; yy[5] += h;xx[6] += w; yy[6] += z4;xx[7] += w; yy[7] += z4 - t;xx[8] += z2; yy[8] += z3;xx[9] += z2; yy[9] += 0;
        break;
      case 270:
        xx[0] += w; yy[0] += z1;xx[1] += t; yy[1] += z1;xx[2] += z4 + t; yy[2] += 0;xx[3] += z4; yy[3] += 0;xx[4] += 0; yy[4] += z1;xx[5] += 0; yy[5] += z2;xx[6] += z4; yy[6] += h;xx[7] += z4 + t; yy[7] += h;xx[8] += t; yy[8] += z2;xx[9] += w; yy[9] += z2;
      break;
    }
    //console.log("||xx   = " +  xx );
    //console.log("||yy   = " +  yy );
    //console.log("||size   = " +  size );
    return [xx,yy];
   
}


	



	
}//bottom of startGame

