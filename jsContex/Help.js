// JavaScript source code
class Help{
	constructor (){//console.log("Help  ");
		this.butDoc = document.getElementById("helpBut")
		this.biddingRules = "******Rules for bidding******"
		this.gameType;
	}

	getHelp(txtA,rndLtr){console.log("help getHelp " + txtA  + "  --   " + rndLtr );
		let buf = "";
			switch (txtA){
				case "bidding":
					buf+= this.bidding();
					break;
				case "general":
					window.open("Help/OverView.html", '_blank').focus();
					let theURL = "Help/OverView.html"
					console.log("theURL  " + theURL);
					//window.open(theURL, '_blank').focus();
					window.open(theURL, '_blank');
					//open(url, '_blank').focus();
					return;
				default:
					buf+= this.round(rndLtr);
			}
		return buf;
	}


	round(rnd){console.log("round " + rnd);
		switch (rnd){
			case "B":
				return this.gameTypeB(rnd);
				break;
			case "C":
				return this.gameTypeC(rnd);
				break;
			case "D":
				return this.gameTypeD(rnd);
				break
			case "E":
				return this.gameTypeE(rnd);
				break
			case "I":
				return this.gameTypeI(rnd);
				break;
			case "L":
				return this.gameTypeL(rnd);
				break;
			case "M":
				return this.gameTypeM(rnd);
				break;
			case "N":
				return this.gameTypeN(rnd);
				break
			case "O":
				return this.gameTypeO(rnd);
				break;
			case "P":
				return this.gameTypeP(rnd);
				break;
			case "Q":
				return this.gameTypeQ(rnd);
				break;
			case "U":
				return this.gameTypeU(rnd);
				break;
		}
	}


	gameTypeB(round){
		let buf = "Game Type B\n"
		buf+= `The challenge is to click-on a number of items.`; 

		buf+= this.bidProcess();
		return buf;
	}

	gameTypeC(round){
		let buf = "Game Type C\n"
		buf+= `Players are challenged to a move a number of items into categories.`;
		buf+= this.bidProcess();
		return buf;
	}

	gameTypeD(round){
		let buf = "Game Type D\n"
		buf+= `Players are challenged to select a date.

The game will select who goes first and players have a limited amount of time to make a selection or forfeit the play.`;
	    buf+= this.turnAway();
		return buf;
	}


	gameTypeE(round){
		let buf = "Game Type E\n"
		buf+= `Players are challenged to select a single item in each row going across the screen.

Example: select the misspelled word in each row.`;

		buf+= this.bidProcess();
		return buf;
	}

	gameTypeI(round){//console.log("Help gameTypeI " + round );
		let buf = "Game Type I\n"
		buf+= `Players are challenged to answer a question like 
---Who is this famous scientist?-- 
and are presented with an increasing number of images, parts of an image, text, audio or video segments that help answer the question.

1) As the items are being presented, the Potential Point Award is decreasing.

2) At any time, a player may elect to answer the question by saying 

         -I have it-

and immediately selecting the button that is the first letter of the possible answer. 

3) That player is then presented with a drop-down menu of all the possible answers to the question that start with that letter and has a limited amount of time to select an answer from the menu.

4) If the player does not find the answer, or selects a wrong answer, or runs out of time, a Point Award goes to the other player and the Game continues.

`;//<<NOTE
		//console.log("Help buf= " + buf );
		return buf;
	}

	gameTypeL(round){
		let buf = "Game Type L\n"
		buf+= `Players are challenged to select a location on a map or image.

The game will select who goes first and players have a limited amount of time to make a selection or forfeit the play.`;

		buf+= this.turnAway();//

		return buf;
	}

	gameTypeM(round){
		let buf = "Game Type M\n"
		buf+= `Players are required click on pairs of itmes, like a state with it's capital.`;		

		buf+= this.bidProcess();		
		return buf;
	}

	gameTypeN(round){
		let buf = "Game Type N\n"
		buf+= `Players are required to select a number using a slider bar.`;		

		buf+= this.turnAway();//
		return buf;
	}



	gameTypeO(round){
		let buf = "Game Type O\n"
		buf+= `Players are required to place items in order.		

Example: Put the presidents on Mt. Rushmore in order from left [top] to right [bottom].`;

		buf+= this.bidProcess();
		return buf;
	}


	gameTypeP(round){
		let buf = "Game Type P\n"
		buf+= `Players are required click on text boxs to answer a challenge.

Example: Click on the three presidents that died in office.`;		

		buf+= this.bidProcess();
		return buf;
	}

	gameTypeQ(round){
		let buf = "Game Type Q\n"
		buf+= `Players are answer questions on the left using the template on the right.

Example: Answer question about chemicals by selecting answers in the Periodic Table of Elements.`;		

		buf+= this.bidProcess();
		return buf;
	}

	gameTypeU(round){
		let buf = "Game Type U\n"
		buf+= `The challenge is to click on an item in each column from left to right.

Example: Complete the bible sayings.`;

		buf+= this.bidProcess();
		
		return buf;
	}

	bidding(){
		let buf = `This is a two person, fast paced, competitive, knowledge game and it is important to understand a few ground rules before you start.

1) Keep your hands off the mouse when viewing the challenge and while the other player has the play!

2) Understand the BIDDING PROCESS before you start. [See below]

           ****The BIDDING PROCESS****
The majority of the Games require the players to decide just how many items they can click on or move before they start.

The Point Award for each number of items is displayed at the top of the screen along with the time allotted to complete the task.

A count down timer is displayed so both players can see how much time is left to complete the bids.

As an example, if there are 8 items, a player may bid 3 and the other player counters with 5.

Unless the first player can counter with a higher bid than 5, when the time expires the second player has the posted time to attempt to answer the challenge by clicking or moving 5 items.

`;//

		return buf;
	}

	terms(){
		let buf = "Round; A single play in which the two players are challenged to accomplish a task like placing items in order, or picking out all the items that meet a challenge like picking out the 7 raindeer name."

		return buf;
	}



	bidProcess(){
		return `

This game starts with a BIDDING PROCESS.

If you are not familiar with it, please choose it from the Help Menu.

`;//
		return buf;
	}

	theBiddingProcess(){
		let buf = `The Point Award for each number of items is displayed at the top of the screen along with the time allotted to complete the task.

For example, if there are 8 items, a player may bid 3 and the other player counters with 5.

Unless the first player can counter with a higher number than 5, the second player then must click on the -5- button and attempt to answer the challenge by clicking or moving 5 items in the allotted time.

If the player cannot click on or move the selected number of items in the alloted time, or gets even a single item wrong, the Point award goes to the other player and the Round continues`;

		return buf;
	}



	turnAway(){
		return `
		
		When a player is making a selection, the other player should turnaway and not cheat by looking.

On completion of the first player's selection, the second player will have a turn to make a selection.`;
		
	}

}
