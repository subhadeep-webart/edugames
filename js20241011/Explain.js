// JavaScript source code
class Explain{
	constructor (){console.log("explain  ");
	}

	explain(type){console.log("explain  " + type);
		switch (type) { 
			case 'B':
			case 'C':
			case 'E':
			case 'M':
			case 'O':
			case 'P':
			case 'Q':
				return this.exPlainTypeB();
				break;
			case 'I':
				return this.exPlainTypeI();
				break;
			case 'D':
			case 'N':
				return this.exPlainTypeD();
				break;			
			case 'X':
				return "There are no Rounds in hopper right now. You need to start a Set.";
				break;
		}

	}




	exPlainTypeB(){console.log("explain  ");
		const txt = `
<p>
***************CLICK TO CLOSE**********
<P>
Players will be challenged to click-on [or move] a set number of items with the potential score being the square of the number. 
<p>
Example: 1 = 1, 2 = 4, 3 = 9, 4 = 16 etc.

<p>Neither player can have a hand on a mouse.</p>

<p>At any time, a player may announce a number, example "3".  The other player may say "Pass", or "up the number" until one player says "Pass". At which time the player
winning the bid, must immediately press the corresponding numbered button above his/her name and the clock starts a count down.
<p>  
That player will then have a limited amount of time to click on [or move] the specified number if items.
<p>
If all the specified number of items are not click on [or moved], or any one of them is incorrect, the score goes to the other player.
<p>
Added to the winning score is a "Bonus Time Factor" for beating the clock and a "Point Factor", to balance the Set so that each Round has a maximum value of 100 points.
<p>
*Players may only handle their mouse after hitting their Buzzer or the other player has said "Pass". 
		`
		return txt;
	}


	exPlainTypeD(){console.log("explain  ");
		const txt = `
<p>
***************CLICK TO CLOSE**********
<P>
Players are challenged to select a date, a number or a location on a map or image.
<p>
In order to encourage a player to go first, an increasing “Point Factor” is displayed.
<p>
At any time, a player may select to go first by pressing his/her Buzzer and pressing the “Go first” button over that player’s name.
<p>
If that player eventually wins the challenge, his/her score is multiplied by the Point Factor.
<p>

*Players may only handle their mouse after hitting their Buzzer or the other player has said “Pass”. 
		`
	}


	exPlainTypeI(){console.log("explain  ");
		const txt = `	
<p>
***************CLICK TO CLOSE**********
<P>
Players are challenged to answer a question like “Who is this famous scientist?” and are presented with an increasing number of images, parts of an image, text, audio or video segments that help answer the question.
<p>
As the items are being presented, the “Point Award” is decreasing.
<p>
At any time, a player may elect to answer the question by hitting their Buzzer and immediately selecting the button that is the first letter of the possible answer.  
He/she is then presented with a drop-down menu of all the possible answers to the question.  
That player has a limited amount of time to select an answer from the menu and  press the “Submit” button.  
Failure to submit on time or selecting a wrong answer and the Point Award goes to the other player.
<p>
*Players may only handle their mouse after hitting their Buzzer or the other player has said “Pass”.. 

`
return txt;
	}

}

