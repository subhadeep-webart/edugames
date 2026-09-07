// JavaScript source code
class Round{
	constructor (cp){
		this.roundMap;
	}
	init(){
		this.setData();
	}

  getData(serNbr){console.log("Round. getData  = " + serNbr);
	  return this.roundMap.get(serNbr);
  }
  setData(){
	this.roundMap = new Map();






  }

}