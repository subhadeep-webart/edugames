// JavaScript source code

class UniBut{
	constructor (cp,itf){console.log("UniBut  ");
		this.itf= itf;
		this.cp= cp;
		this.butDoc;
		this.interval;
		this.greenOn = false;
		this.butDoc = document.getElementById("uniBut")
		this.func = "";
	}


	init(){console.log("UniBut init ");
		this.butDoc = document.getElementById("uniBut")
		this.hide();

	}

	uniButClick(){console.log("UniBut uniButClick " + this.butDoc.value);
		const ubValue = this.butDoc.value;
		console.log("UniBut ubValue=  " + ubValue);
		switch (ubValue) { 
			case 'NEXT ROUND':

				this.cp.startRnd();
				break;
			case 'CHECK':
				stopClock();
				break;
			case 'startSet':
				startSet();//onscript
				break;
			case 'help':
				startSet();//onscript
				break;
		}

	}

	hide(){console.log("UniBut hide "  );
		this.butDoc.style.display = "none";

	}

	setNextRound(){console.log("UniBut hide "  );
		this.butDoc.style.display = "block";
		this.setfunction("NEXT ROUND");
	}


	show(){console.log("UniBut show " );
		this.butDoc.style.display = "block";

	}



	setfunction(txt){console.log("UniBut setfunction " + txt);
		this.butDoc.value = txt;
	}


	setText(txt){console.log("UniBut setText " +  txt);
		this.butDoc.value = txt;
	}
	setColor(theColor){
		//const thebut = document.getElementById("uniBut");
		this.butDoc.style.background = theColor;

	}

	startBlinker(){console.log("UniBut startBlinker "   )
		this.interval =  setInterval(this.blink,2000);
		this.greenOn = true;
	}

	stopBlinker(){
		clearInterval(this.interval);
		
	}

	setGreen(){console.log("UniBut setGreen" + this.greenOn);
		this.butDoc.style.background= "green"

	}

	setRed(){console.log("UniBut setRed" + this.greenOn);
		this.butDoc.style.background= "red"

	}

	blink(){console.log("UniBut blink() " + this.greenOn);
		const thebut = document.getElementById("uniBut")
		if(this.greenOn){
			this.butDoc.style.background= "red"
			this.greenOn = false;
		}else{
			this.butDoc.style.background= "green"
			this.greenOn = true;
		}		
	}


	blinkXX(){console.log("UniBut blink() " + this.greenOn);
		const thebut = document.getElementById("uniBut")
		if(this.greenOn){
			thebut.style.background= "red"
			this.greenOn = false;
		}else{
			thebut.style.background= "green"
			this.greenOn = true;
		}		
	}
}


