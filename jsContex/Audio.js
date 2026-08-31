// JavaScript source code

class Audio {
	constructor (cp,itf){
		//this.cp = cp;
		this.itf= itf;
		this.Ding;
		this.sndArr = [];
	}


	setFile(snd){console.log("Audio setFile = " + snd )
		if(this.sndArr.includes(snd)){
			console.log("includes(snd) "  )
			return;
		}
		let buf = "Audio/";
		if(snd == "Ding"){
		console.log("*** = " +  buf + snd + ".mp3" )
			this.Ding = new Audio(buf + snd + ".mp3");
			this.Ding.play();
		}

		this.sndArr.push(snd);
	}

	playSnd(snd){console.log("Audio playSnd = " + snd )
		if(snd == "Ding"){
		console.log("this.Ding = " + this.Ding )
			this.Ding.play();
		}

	}


}
