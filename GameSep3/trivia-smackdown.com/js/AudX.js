// JavaScript source code

class AudX {
	constructor (cp,itf){
		this.cp = cp;
		this.itf= itf;
		this.ding;
		this.lev =0.5;
		this.sndArr = [];
	}

	setFile(snd,lev){console.log("Audio setFile = " + snd )
		if(this.sndArr.includes(snd)){
			return;
		}
		let buf = "Audio/";
		if(snd == "ding"){
			this.ding = new Audio(buf + snd + ".mp3");
			this.ding.volume = this.lev;
			this.ding.play();
		}
		this.sndArr.push(snd);
	}

	playSnd(snd){//console.log("Audio playSnd  top = " + snd )
		if(snd == "ding"){
			this.ding.play();
		}
	}

	stopSnd(snd){//console.log("Audio stopSnd = " + snd )
		if(this.snd != null){
			this.snd.stop();
		}
	}

}
