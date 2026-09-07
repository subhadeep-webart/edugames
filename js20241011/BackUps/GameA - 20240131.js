// JavaScript source code


class GameA extends Game{//console.log("GameA  = " + );
	constructor (round,cp,utl){
		console.log("GameA.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
		this.inputArray;
		this.ptInc = 0;
		this.firstHit=true
		this.gameInPlay = "gameA";
		this.gameType = 'A';
		this.image;
		this.imageName;
		this.imageArray =[];
		this.imageWidth;
		this.imageHeight;
		this.imagePath;
		this.symArray;
		this.rightArray =[];
		this.wrongArray =[];
		this.ctx;
		console.log("GameA.constructor BOTTOM"  );
	}
	init(){
		console.log("GameA.init TOP"  );
		super.init();
		this.getData();
		this.insrtCanvasAndImage()
		this.procSym();
		this.insrtImage();
		console.log("GameA.init BOTTOM "  +  this.gameInPlay);//  
	}

	helloWorld(){
	console.log("GameA.helloWorld" );//console.log("GameA  = " + );
		super.helloWorld();
	}
	getData(){ 
		this.imageArray  = getImageFile(this.gameDataArray.shift());
		this.imagePath   = this.imageArray[1];
		this.imageWidth  = this.imageArray[2];
		this.imageHeight = this.imageArray[3];
		this.symArray    = this.gameDataArray;
	}

	insrtCanvasAndImage(){console.log("insrtCanvasAndImage  = " );
		const canvas = "<canvas id='myCanvas' style='border:1px solid #000000;' width='"+ this.imageWidth + "' height='"+this.imageHeight +"'></canvas>";
		console.log("canvas  = " + canvas);
		const canvasInsertPt = document.getElementById('gameAImageInsrtPt');
		canvasInsertPt.innerHTML = canvasInsertPt.innerHTML + canvas;
		const myCanvas = document.getElementById("myCanvas");
		this.ctx = myCanvas.getContext("2d");
		this.ctx.fillRect(100, 200, 50,50,this.width,this.height);//                  console.log("GameA  = " + );

	}

	insrtImage(){
		let theImage = new Image(this.imagePath,0,0,this.imageWidth,this.imageHeight);
		console.log("GameA  theImage= " + theImage);
		this.createImage(this.ctx,this.imagePath,0,0,this.imageWidth,this.imageHeight);
		theImage.style.zIndex = "0";
	}

	createImage(context,path,x,y,w,h){
		console.log("createImage context = " + context + " path= " + path + " x= " + x + " y= " + y + " w= " + w + " h= " + h);
		let theImage = document.createElement('img');
		theImage.src = path;
		theImage.onload = function(){
			context.drawImage(theImage,x,y,w,h)
		}
	}

	procSym(){console.log("procSym. "  + this.symArray)
	let zz = 2;
		const len = this.symArray.length;//this.imageName =
		for(let i = 0;i <len;i++){
			console.log(i +  "  == " + this.symArray[i]);
		}
		let letterCount = 0
		const fullLeterArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"]


		for(let i = 0;i <len;i++){
			const rw = this.gameDataArray[i].charAt(1);//console.log("  = " );
			if(rw == "R" || rw == "W"){letterCount++}
		}

		const ltrArray = this.utl.mixUpArray(fullLeterArray.slice(0,letterCount));
		const ltrMap = new Map();//We are going to map letter to right and wrong


//{B-4lightGray 237138004080


		letterCount = 0;
		for(let i = 0;i <len;i++){
			console.log("||| this.gameDataArray[i] = " +this.gameDataArray[i])
			if(this.gameDataArray[i] === "") return;

			const array = this.gameDataArray[i].split(" ");

			const orientation = array[1];
			const x = array[0];
			const type = x.charAt(1)
			const size = x.charAt(3)
			const color = x.substring(4);
			console.log("type =" + type + "size =" + size + "color =" + color + "orientation =" + orientation);
			const oArr = this.getSizeArray(orientation);
			switch (type) {
			case 'C':
				this.placeCircle(size,color,orientation);
				break;
			case 'R':
				this.rightArray.push(i);
				ltrMap.set(letterCount,true)
				this.placeALetter(ltrArray[letterCount++],size,color,oArr);
				break;
			case 'W':
				this.rightArray.push(i);
				ltrMap.set(letterCount,false)
				this.placeALetter(ltrArray[letterCount++],size,color,oArr);
				break;
			}
		}
				
	}//arrow =,{A-1red 007033017024 000,{A-2red 030032024038 000,{A-3red 060031031052 000,
	//{A-4red 097032038066 000,{A-5red 141035045080 000

	placeALetter(aLet,size,color,oArr){//Pxl size XL - S 36,28,21,14,10
		console.log("placeLetter aLet= " + aLet + " size= " + size +  " color= " + color  + " oArr= " + oArr );
		const sn = (size * 20);
		const sT = sn+ "px Arial"
		this.ctx.font = sT;
		this.ctx.fillText(aLet, oArr[0], oArr[0]);
	}
	                                              //console.log("  = " + );
	getSizeArray(orientation){console.log(" getSizeArray orientation = " + orientation);
		const arr = [];
		arr.push(Number(orientation.substring(0,3)));
		arr.push(orientation.substring(3,6));
		arr.push(orientation.substring(6,9));
		arr.push(orientation.substring(9));
		return arr;
	}

	placeCircle(size,color,orientation){console.log("placCircle size= " + size + "  color= " + color + " orientation=  " + orientation );
		/*
		const x = Number(orientation.substring(0,3));
		const y = Number(orientation.substring(3,6));
		const w = Number(orientation.substring(6,9));
		const h = Number(orientation.substring(9));
		*/
		const arr = this.getSizeArray(orientation)
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(arr[0], arr[1], arr[2], 0, 2 * Math.PI);
		this.ctx.stroke();

	}
	//bottom of game a code***************


/*
//              }P.AA.Pi.Th.Tr.Na.SailBoat.KGDB.gif,{A-4red 009118038066 180,{A-4red 373118038066 180,{R-4red 004054057057,{W-4red 361055057057,
	startGame(){console.log("GameA. "  + this.gameDataArray)
		this.image = this.gameDataArray.shift();
		//this.insertImage();
		console.log("image. "  + this.image)
		;
			const canvas = document.getElementById("myCanvas");
			console.log("GameA canvas = " + canvas);
			const ctx = canvas.getContext("2d");
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(0, 0, 150, 75);
		}
	}

	insrtCanvas(){console.log("||||insrtCanvas =" );
		const imageArray = getImageFile(this.image,"testImage");
		const image = new Image(imageArray[1],imageArray[2],imageArray[3],100,100);

		const anImage = imageArray[0];
		//const testImageInsertPt = document.getElementById('testImageInsrtPt');
		//testImageInsertPt.innerHTML = testImageInsertPt.innerHTML + anImage
		const path = imageArray[1];
		const width = imageArray[2];
		const height = imageArray[3];
		console.log("path =" + path);
		console.log("width =" + width);
		console.log("height =" + height);
		
		const canvasInsertPt = document.getElementById('gameAImageInsrtPt');
		


		//const img = document.getElementById("testImage");
        //console.log("img= "  + img);
		//ctx.drawImage(img,50,50,imageArray[2],imageArray[3]);
		

	}

	
	

/*
	insertImage(){console.log("GameAinsertImage  = " + this.image);
		const imageInsrtTxt = getImageFile(this.image,"gameAImage"); 
        console.log("GameA.imageInsrtTxt= "  + imageInsrtTxt);
		const imageInsertPt = document.getElementById('imageInsertPt');
		imageInsertPt.innerHTML = imageInsertPt.innerHTML + imageInsrtTxt;
	}
	*/
	
}//bottom of startGame

