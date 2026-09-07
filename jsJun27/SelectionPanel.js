// JavaScript source code

class SelectionPanel{
    constructor (cp){
    this.rndMenu = new RndMenu();//To be added to the display
    this.setMenu = new SetMenu();//To be added to the display
    this.sets;
    this.cp = cp;
    this.roundToBePlayed;
    this.setToBePlayed;
    this.secPerQuest = 5

    this.Science;
    this.History;
    this.Geography;
    this.Government;
    this.Hard;
    this.Average;
    this.Easy;
    this.roundB = null;
    this.roundC = null;
    this.roundD = null
    this.roundE = null;
    this.roundI = null;
    this.roundL = null;
    this.roundM = null;
    this.roundN = null;
    this.roundO = null;
    this.roundP = null;
    this.roundQ = null;
    this.roundU = null;
    this.setPRA = null;
    this.dataMap = null;
    }

    init(){
       this.sets = new cp.sets;
        this.dataMap = new Map()
    }

    helloWorld(){
		console.log("sp.helloWorld" );
	}

    startSet(){ console.log("********sp.startSet()  "  );
      
    }

    mapData(data){console.log("sp.mapData()  " +  data);
    const arr = data.split(",");
        for(let i = 0 ;i < arr.length;i++){
            const x = arr.shift().split("=");

        }
    }

    getRndsFmASet(aSet){console.log("sp.getRndsFmSet  " +  aSet);
        const anArr = aSet.split(",");
        const n = anArr.length;
        const rndSerNbrArr = [];
        for(let i = 9 ;i < n;i++){
            const setParts = anArr[i].split(";")
            console.log(i + " || " + anArr[i] );
            console.log("sp.setParts[1] = " +setParts[1] );
            rndSerNbrArr.push(setParts[1]);
        }
        return rndSerNbrArr;

    }

    startRnd(){ console.log("sp.startRnd()  "  );//http://edugames.com/cgi-bin/GetRounds.pl?AA.Aen00002
    const formData = getformData();
        //await cp.startRnd(formData);
        cp.startRnd(formData);
   }

    getSetSerNbr(){//console.log("sp.getSetSerNbr  "  );
       const el = document.getElementById("setMenu");
       console.log("||el.name=  "+ el.name )
       console.log("||el.index=  "+ el.index )
       console.log("||sp.setMenu.value=  "+ el.value )
       return el.value;
   }

   startRound(theRoundText){console.log("sp.startRound--  " +  theRoundText);//theRndMenu
        const round = new Round(theRoundText);
       console.log("-@@-sp.startRound.Q   " + round.getTheQuestion())
        this.cp.startGame(round);
   }

    getRoundFmRnd(rnd){console.log("sp.getRoundFmRnd  " + " onNet= " + onNet  + "  rnd= " + rnd);//theRndMenu
      let gameType = "X";
      let serNbr = "";
      if(rnd.length < 20){//this is just the serNbr
           gameType = rnd.charAt(3);
           serNbr = rnd;
      }else{
        const arr = rnd.split(";");
        serNbr = arr[1];
        gameType = serNbr.charAt(3);;
      }

      console.log("gameType=  " + gameType + " serNbr= " + serNbr + " onNet= " + onNet);

      if(onNet == true){
         const url = 'https://www.edugames.com/cgi-bin/GetRoundsTSD.pl?' + serNbr;
         console.log("Sp.url =" + url +"**");
          ////fetch('/edugames.com/cgi-bin/GetRounds.pl?' + serNbr)

            fetch (url, {
                })
                .then(response => response.text())
                .then(data => {
              // console.log("fetch **" + data +"**");
		        cp.itf.cleanPlayArea();
                    const round = new Round(data);
                    theQuestion = round.getTheQuestion();
                console.log("-@@-sp.getRoundFmRnd QQQQ=  " + round.getTheQuestion())
		        cp.startGame(round);
                    
		        //console.log("cp.startRnd BB theRnd= " +  theRnd + "  partOfset " + partOfset);

            })
             .catch(error => console.log('Error fetching data:', error));
            return;
          }

      if(onNet)return;

      //************Below is for off net testing *****************

      let roundData ="";
       console.log("||sp.gameType=  "+ gameType)
       
	    switch (gameType) {
		    case 'B':
            if(this.roundB == null){
                this.roundB = new RoundB();
                this.roundB.init();
            }
            roundData = this.roundB.getData(serNbr);
		    break;
		    case 'C':
            if(this.roundC == null){
                this.roundC = new RoundC();
                this.roundC.init();
            }
            roundData = this.roundC.getData(serNbr);
		    break;
		    case 'D':
            if(this.roundD == null){
                this.roundD = new RoundD();
                this.roundD.init();
            }
            roundData = this.roundD.getData(serNbr);
		    break;
		    case 'E':
            if(this.roundE == null){
                this.roundE = new RoundE();
                this.roundE.init();
            }
            roundData = this.roundE.getData(serNbr);
		    break;
		    case 'I':
            if(this.roundI == null){
                this.roundI = new RoundI();
                this.roundI.init();
            }
            roundData = this.roundI.getData(serNbr);
		    break;
		    case 'L':
            console.log("LLL  ")
            if(this.roundL == null){
                this.roundL = new RoundL();
                this.roundL.init();
            }
            roundData = this.roundL.getData(serNbr);
            console.log("l  ")
		    break;
            
            case 'M':
            console.log("MMM  ")
            if(this.roundM == null){
                this.roundM = new RoundM();
                this.roundM.init();
            }
            roundData = this.roundM.getData(serNbr);
		    break;
		    case 'N':
            if(this.roundN == null){
                this.roundN = new RoundN();
                this.roundN.init();
            }
            roundData = this.roundN.getData(serNbr);
		    break;
		    case 'O':
            if(this.roundO == null){
                this.roundO = new RoundO();
                this.roundO.init();
            }
            roundData = this.roundO.getData(serNbr);
		    break;
		    case 'P':
            if(this.roundP == null){
                this.roundP = new RoundP();
                this.roundP.init();
            }
            roundData = this.roundP.getData(serNbr);
		    break;
		    case 'Q':
            if(this.roundQ == null){
                this.roundQ = new RoundQ();
                this.roundQ.init();
            }
            roundData = this.roundQ.getData(serNbr);
		    break;
		    case 'U':
            if(this.roundU == null){
                this.roundU = new RoundU();
                this.roundU.init();
            }
            roundData = this.roundU.getData(serNbr);
		    break;
            default:
            console.log("|||||||||||||||sp.This Round is not in SP " +  rnd);//theRndMenu

        }
           
        console.log("|||roundData= --" +  roundData + "--");//theRndMenu

        const round = new Round(roundData);
        return round;

        /** })
            .catch(error => console.log('Error fetching data:', error));
            return;
        }**/


   }


   getRndFmGameType(rnd){console.log("sp.getRndFmGameType  " +  rnd);//theRndMenu
       const gameType = rnd.charAt(3);

       let roundData ="";
	    switch (gameType) {

		    case 'B':
            if(this.roundB == null){
                this.roundB = new RoundB();
                this.roundB.init();
            }
            roundData = this.roundB.getData(rnd);
		    break;
		    case 'C':
            if(this.roundC == null){
                this.roundC = new RoundC();
                this.roundC.init();
            }
            roundData = this.roundC.getData(rnd);
		    break;

		    case 'D':
            if(this.roundD == null){
                this.roundD = new RoundD();
                this.roundD.init();
            }
            roundData = this.roundD.getData(rnd);
		    break;
		    case 'E':
            if(this.roundE == null){
                this.roundE = new RoundE();
                this.roundE.init();
            }
            roundData = this.roundE.getData(rnd);
		    break;
		    case 'I':
            if(this.roundI == null){
                this.roundI = new RoundI();
                this.roundI.init();
            }
            roundData = this.roundI.getData(rnd);
		    break;
		    case 'L':
            if(this.roundL == null){
                this.roundL = new RoundL();
                this.roundL.init();
            }
            roundData = this.roundL.getData(rnd);
		    break;
            case 'M':
            if(this.roundM == null){
                this.roundM = new RoundM();
                this.roundM.init();
            }
            roundData = this.roundM.getData(rnd);
		    break;
		    case 'N':
            if(this.roundN == null){
                this.roundN = new RoundN();
                this.roundN.init();
            }
            roundData = this.roundN.getData(rnd);
		    break;
		    case 'O':
            if(this.roundO == null){
                this.roundO = new RoundO();
                this.roundO.init();
            }
            roundData = this.roundO.getData(rnd);
		    break;

		    case 'P':
            if(this.roundP == null){
                this.roundP = new RoundP();
                this.roundP.init();
            }
            roundData = this.roundP.getData(rnd);
		    break;
		    case 'Q':
            if(this.roundQ == null){
                this.roundQ = new RoundQ();
                this.roundQ.init();
            }
            roundData = this.roundQ.getData(rnd);
		    break;
		    case 'U':
            if(this.roundU == null){
                this.roundU = new RoundU();
                this.roundU.init();
            }
            roundData = this.roundU.getData(rnd);
		    break;
            default:
            console.log("|||||||||||||||sp.This Round is not in SP " +  rnd);//theRndMenu

        }
        console.log("sp.roundData=  " + roundData );//theRndMenu

        return roundData;
   } 


   getRndToBePlayed(){console.log("sp.getRndToBePlayed  "  );//theRndMenu
       const el = document.getElementById("rndMenu");

       console.log("||el.name=  "+ el.name )
       console.log("||el.index=  "+ el.index )
       console.log("||sp.rndMenu.value=  "+ el.value )
       this.roundToBePlayed = rndMenu.value;
       console.log("sp.this.roundToBePlayed=  "+ this.roundToBePlayed );
       const theSelection = rndMenu.options[rndMenu.selectedIndex].text;
       console.log("sp.theSelection=  "+ theSelection );
       return this.roundToBePlayed;
   }

   setSecPerQuest(){console.log("sp.setSecPerQuest  "  );
       const radioButtons = document.getElementsByName("secPerQuest");
       for (const button of radioButtons) {
        if (button.checked) {
           this.secPerQuest = button.value;
        }
       }
        console.log("||sp.setSecPerQuest = " + this.secPerQuest);
   }

   saveData(){console.log("sp.saveData "  );
        this.setSecPerQuest();//This is the first of many

   }

    getformData(){   console.log(" getformDat "  );
        this.setSecPerQuest();     
        this.science = document.getElementById('science').selection;
        console.log("this.science  "+  this.science );
        return this.science;
    }

     removeSelectionFormXX(){console.log("removeSelectionForm");
        const theChild =    document.getElementById("selForm");
        const formParent = theChild.parentNode;
	    formParent.removeChild(theChild);          
     }


     removeSelectionForm(){console.log("********************removeSelectionForm()");
        this.saveData();
        //let theChild =    document.getElementById("selForm");
        let theChild =    document.getElementById("selFormInsrtPt");
        if(theChild != null){
        let formParent = theChild.parentNode;
	        formParent.removeChild(theChild);
        }       
     }

    insertRounds(){console.log("sp. insertRounds "  );
        const theRndMenu = this.rndMenu.getRnds();
        console.log("sp. itheRndMenu " + theRndMenu );
        const el = document.getElementById('rnds').selection;
        el.innerHTML = el.innerHTML + theRndMenu
    }

  displaySelForm(){  console.log("sp. displaySelForm( "  );
    const theForm =`
     <table id='selForm' border='0'  width='100%'>
              
      </select><input type='button' onclick='startSet()' id='StartRound' value='Start Set'></td>
      </select><input type='button' onclick='startRnd()' id='startRndBut' value='Start RounD'></td>
      <td><div id='setMenuInsrtPt'></div>
      <tr>
    <td>Select Response Time:  
   3<input type='radio'  name='secPerQuest' value='3' id='rb3'>
   4<input type='radio' name='secPerQuest' value='4' id='rb4'>
   5<input type='radio' name='secPerQuest' value='5' id='rb5'>
   6<input type='radio' name='secPerQuest' value='6' id='rb6'>
   7<input type='radio' checked='checked' name='secPerQuest' value='7' id='rb7'>
   8<input type='radio' name='secPerQuest' value='8' id='rb8'>
   9<input type='radio' name='secPerQuest' value='9' id='rb9'>
   10<input type='radio' name='secPerQuest' value='10' id='rb10'>
   11<input type='radio' name='secPerQuest' value='11' id='rb11'>

</td>
    
</table>`

    const selForm = document.getElementById("selFormInsrtPt");
    selForm.innerHTML =  selForm.innerHTML + theForm

    const theSetMenu = this.setMenu.getSetMenu();
    const setMenuInsrtPt = document.getElementById("setMenuInsrtPt");
    setMenuInsrtPt.innerHTML = setMenuInsrtPt.innerHTML + theSetMenu

    //document.getElementById('startSetBut').addEventListener("click", function(){ 
	//console.log("script  addEventListener for butStartGame "  );
	//startSet(); 
    //});

}


}
