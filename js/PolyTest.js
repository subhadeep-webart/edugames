'use strict';

const ltrCoord= [];
let ltrCount = 0;
let theImage = ""
const canvas = document.getElementById("canvas");//console.log(" = " + )
console.log(" canvas= " +canvas);
const ctx = canvas.getContext("2d");   //console.log("Polygon top= "  );
//ctx.width = 500;
//ctx.height = 400;


function testC(){
console.log("testC");
    theImage = document.createElement('img');
    theImage.src = "images/SailBoat.KG.gif";

ctx.fillRect(35,35,25,25)
        //ctx.drawImage(theImage,0,0,45,45);
ctx.fillRect(60,50,25,25);

    theImage.onload = function(){
        ctx.drawImage(theImage,0,0,45,45);
}
   R1C1;R1C2;R1C3;R1C4;R2C1;R2C2;R2C3;R2C4;R3C1;R3C2;R3C3;R3C4;R4C1;R4C2;R4C3;R4C4;


}

function testB(){
console.log("testB()");
    assignToken("{R-4green 001001050050","R");
    assignToken(  "{W-4red 100050050050","W");
    assignToken( "{W-4blue 100050050050","W");
    /*
    assignToken("{W-4green 100019028028","W")
    assignToken("{D-4red 256055080080");
    assignToken("{C-4green 071007080080");
    assignToken("{R-4green 165015028028","R");
    assignToken("{W-4green 215019028028","W");
    assignToken("{F-4green 032107080080");
    assignToken("{B-4green 141127128010");
    assignToken("{A-4green 010014038066 000")
    */
}



function testA(){
console.log("testA()");
    createImage();
    const w  = theImage.getWidth;
    const h  = theImage.getHeight;
console.log(h + " --   " + h);


}

function createImage(){
    console.log("createImage "  );
theImage = document.createElement('img');
    theImage.src = "images/SailBoat.KG.gif";// url("images/SailBoat.KG.gif");//.src = "images/SailBoat.KG.gif";
    const width= ctx.width
    const height= ctx.height
    console.log( width  +  "  --- " +  height);
    const imgWidth =theImage.clientWidth;
    const imgHeight =theImage.height;
    console.log( imgWidth  +  "  --- " +  imgHeight);

    let ratio = 1;;
    if (theImage.width>width) {
        ratio = width/theImage.width;
    }
    else if (theImage.height > height) {
        ratio = height/theImage.height;
    }
    else {
        ratio = 1;
    }

    //ctx.drawImage(theImage, 100, 100);

    theImage.onload = function(){    console.log("theImage.onload "  );
            console.log( theImage.width  +  "  --- " +  theImage.height);
//ctx.drawImage(theImage,0,0,theImage.width,theImage.height,0,0,theImage.width,theImage.height)////canvas352,224
        ctx.drawImage(theImage,0,0)
}

//ctx.setWidth = theImage.width;
    //ctx.setHeight = theImage.height;
    const theCanvas = document.getElementById('canvas');
theCanvas.addEventListener('click', function(event) {
console.log("click " + event.offsetX);
getHit(event.offsetX,event.offsetY);
});

}


function getHit(x,y){console.log("getHit x= " + x  + " y= " + y );
    console.log("ltrCoord = "  + ltrCoord);
    for(let i = 0;i < ltrCoord.length;i++){//ltrCoord=
        console.log("ltrCoord[i] = "  + ltrCoord[i]);
        const arr = ltrCoord[i].split(",");
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
            //alert("Click on a letter not an object.");

        }

        //console.log("arr[2]= " + arr[2] );
    }
}

function testPoly(){
console.log("testPoly");
    //
    //assignToken("{D-4red 256055080080");
    //assignToken("{C-4green 071007080080");
    assignToken("{R-4green 050050028028","R");
    assignToken("{W-4green 075050028028","W");
    //assignToken("{F-4green 032107080080");
    //assignToken("{B-4green 141127128010");
    //assignToken("{A-4green 010014038066 000");
    //createImage();
    //getLtrCoord();
}


function getLtrCoord(){
console.log("ltrCoord= " + ltrCoord);


}

function assignToken(token){
console.log("assignToken= " + token);////return [type,size,color,xloc,yloc,h,w];
    const brkDwn = breakDownToken(token);
    const type = brkDwn[0];

    const ltrArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"]

    switch (type) {//{R-4red 026037028028
    case 'C':
placeCircle(token);//H-1Black 011028022021 Hydrogen 
break;
case 'R':
        const tempR = token.split(" ");
        ltrCoord.push(tempR[1] + ",R," + ltrArray[ltrCount]   )
        placeLtr(token,ltrArray[ltrCount++]);
break;
case 'W':
        const tempW = token.split(" ");
        ltrCoord.push(tempW[1] + ",W," +  ltrArray[ltrCount] )
        placeLtr(token,ltrArray[ltrCount++]);
break;
case 'A':
        placeArrow(token)
break;
case 'D':
        placeFilledCircle(token);
break;
case 'F':
        placeFrame(token);
break;
case 'B':
        placeBlock(token);
break;
}

}







function getCoords(size,h, w,direction) {
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



function breakDownToken(token){
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

function placeFrame(token){// F = frame B = BLock
console.log("placeSquare= " + token);
    const brkDwn = breakDownToken(token);
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.strokeStyle = brkDwn[2];
    ctx.rect(brkDwn[3],brkDwn[4],brkDwn[5],brkDwn[6]);
    ctx.stroke();
}

function placeFilledCircle(token){
console.log("placeFilledCircl= " + token);
    const brkDwn = breakDownToken(token);
    const rad =  (brkDwn[1] * 5) ;
//console.log("rad= " + rad);
    ctx.strokeStyle = brkDwn[2];
    ctx.fillStyle= brkDwn[2];
    ctx.arc(brkDwn[3],brkDwn[4], rad, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}




function placeCircle(token){
console.log("placeCircle= " + token);
    const brkDwn = breakDownToken(token);
    const rad =  (brkDwn[1] * 5);
    ctx.beginPath();
    ctx.lineWidth = brkDwn[1];
    ctx.strokeStyle = brkDwn[2];
    ctx.arc(brkDwn[3],brkDwn[4], rad, 0, 2 * Math.PI,false);
    ctx.stroke();
}
function placeBlock(token){// F = frame B = BLock
console.log("placeBlock= " + token);
    const brkDwn = breakDownToken(token);
    ctx.fillStyle = brkDwn[2];
    ctx.lineWidth = 4;
    //ctx.lineJoin = "round";
    ctx.strokeStyle = brkDwn[2];
    ctx.fillRect(brkDwn[3],brkDwn[4],brkDwn[5],brkDwn[6]);
    ctx.stroke();
}

function placeLtr(token,assignedLtr){//
console.log("placeLtr " + token + " " + assignedLtr);
    const brkDwn = breakDownToken(token);
    ctx.fillStyle = brkDwn[2];
    const fnt = (brkDwn[1] * 10) +"px times bold";
    ctx.font =   fnt ;
//console.log("brkDwn[3]= " + brkDwn[3] + "  brkDwn[4]=  " + brkDwn[4]);
    ctx.fillText(assignedLtr, brkDwn[3], brkDwn[4]);

}

function placeArrow(token){
console.log("placePoly " + token )
    const temp = token.split(' ');
    const direction = temp[2];
    const brkDwn = breakDownToken(token);//return [type,size,color,xloc,yloc,h,w];
    ctx.fillStyle = brkDwn[2];
    let xx= [] ; let yy= [];
    [xx,yy] = getCoords(brkDwn[1],brkDwn[1], brkDwn[1],direction);
    ctx.beginPath();
    ctx.lineCap= "round" ;
    ctx.lineWidth = brkDwn[1];
    ctx.strokeStyle= brkDwn[2];
    //const startX = xx[0];
    //const startY = yy[0];
    ctx.moveTo((xx[0] + brkDwn[3]),(yy[0] + brkDwn[4] ));
    for(let i = 1;i <xx.length;i++){
        ctx.lineTo((xx[i]  + brkDwn[3]),(yy[i] + brkDwn[4]));
    }
    ctx.lineTo((xx[0]  + brkDwn[3]),(yy[0] + brkDwn[4]));//closing the shape?
    ctx.stroke();

}




function adjustRatio(){
    var ratio;
    if (imageObj.width>width) {
        ratio = width/imageObj.width;
    }
    else if (imageObj.height > height) {
        ratio = height/imageObj.height;
    }
    else {
        ratio = 1;
}
//context.drawImage(imageObj, x, y, imageObj.width*ratio, imageObj.height*ratio);

}








