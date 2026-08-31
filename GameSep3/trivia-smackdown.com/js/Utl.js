// JavaScript source code
class Utl{//Utility Class
	constructor (cp){
		this.cp = cp;
		this.selected ="style='background-color:#DC143C'";
		this.notSelected = "style='background-color:aquamarine'";
	}
	init(){

	}
	sayHellow(){
      console.log("Utl.sayHellow()"  );
	}

	getData(fileName){
		const data = fileName;
		return data;
	}

	getMixArrayOfNumbers(n){//creates an array of numbers and then mixes them up
		const array = [];
		for (let i = 0;i<n;i++){
			array.push(i);
		}
		for (let i = n - 1; i > 0; i--) { 
			const j = Math.floor(Math.random() * (i + 1)); 
			[array[i], array[j]] = [array[j],array[i]]; 
		}
		return array;
	}
	//mixUpArray(  getArrayOfNumbers(n,prefix,sufix)

	mixUpArray(array){
		//console.log("Utl.mixUpArray.array TOP = " + array);
		const n = array.length;
		for (let i = n - 1; i > 0; i--) { 
			const j = Math.floor(Math.random() * (i + 1)); 
			[array[i], array[j]] = [array[j],array[i]]; 
		}
		//console.log("Utl.mixUpArray.array BOTTOM= " + array);
	return array;
	}

	getArrayOfNumbers(n,prefix,sufix){//Returns a list of numbers Example 1,2,3,4,5 with the prefix or sufix. Empty just returns the numbers
		const array = [];
		for (let i = 0;i<n;i++){
			array.push(prefix + i + sufix);
		}
		return array;
	}
}
