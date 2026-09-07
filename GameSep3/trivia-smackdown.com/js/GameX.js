// JavaScript source code


class GameX extends Game{//console.log("GameA  = " + );
	constructor (round,cp,utl){
		console.log("Game.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
		this.inputArray;
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
		this.theImage;
		this.count=0;
		console.log("GameX.constructor BOTTOM"  );
	}
	init(){
		console.log("GameX.init TOP"  );
		super.init();
		this.createCanvas();
		//this.getImageData();//We are assuming only one image, but this needs to be adjusted for more
		//this.insrtCanvasAndImage();
		//this.insrtImage();
		//this.procSym();
		console.log("GameX.init BOTTOM "  +  this.gameInPlay);//  
	}

	helloWorld(){
	console.log("GameX.helloWorld" );//     console.log("GameX  = " + );
		super.helloWorld();
	}

	testC(){
    this.theImage = document.createElement('img');
    this.theImage.src = "images/SailBoat.KG.gif";
	//this.ctx.fillRect(5,5,25,25)
		//if(this.count++ > 0){this.ctx.drawImage(this.theImage,0,0,45,45);}
	//this.ctx.fillRect(60,50,25,25);
	//this.theImage.onload = function(){
		//this.ctx.drawImage(this.theImage,0,0,45,45);

	//}
    
}


	createCanvas(){
		const canvas = "<canvas id='myCanvas' style='border:5px solid #000000;' width='"+ this.imageWidth + "' height='"+this.imageHeight +"'></canvas>";
		console.log("canvas  = " + canvas);
		const canvasInsertPt = document.getElementById('gameAImageInsrtPt');
		canvasInsertPt.innerHTML = canvasInsertPt.innerHTML + canvas;
		const myCanvas = document.getElementById("myCanvas");
		this.ctx = myCanvas.getContext("2d");
		this.testA();

	}

	testA(){
		this.ctx.drawImage(this.theImage,5,5);
		/*
		console.log("testA()   ");
		const theImage = document.createElement('img');
		theImage.src = "images/SailBoat.KG.gif";
		console.log("theImage.src=    " + theImage.src);
		this.ctx.fillRect(30,50,25,25);
		this.ctx.drawImage(theImage,0,0,50,50)
		//theImage.onload = function(){
			//this.ctx.drawImage(theImage,0,0)
		//}
		*/
	}
}