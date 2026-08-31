

class Set{
	constructor (input,isFmSubset){console.log("Set.NEW  " +  input);
		this.input = input;;
        this.rndcount = 0;
		this.setMap;
		this.rndArr = [];
		this.codes;
		this.authors;
		this.inputArr;
		this.buf;
		this.sets = null;//for subsets we replace as needed
		this.setSerNbr = null;
		this.rndBeingPlayed;
		this.roundBeingPlayed;
		this.theQuestion;
		this.init();
		this.tempArr = [];
	}

	init() {
		this.input = deComma(this.input);
		console.log("|||| Set.init \n " + this.input);
		
		this.breakOutData(this.input);

		console.log("AfterBreakOut =\n" + this.rndArr.join("\n"));

		console.log("AfterBreakOut =\n" + this.rndArr.join("\n"));


		console.log("serNbrs= " + this.listRnds("***XXX***"))
		this.listjustRndSerNbrs(" end of init");

        //this.playNextRnd();

		////this.advanceToRndNbr();
		//console.log(this.listjustRndSerNbrs());//listItemsInArr(theArr,text,strtChar,endChar,print){
	}




	playNextRnd() {
		console.log("Set.playNextRnd() this.rndArr=  " + this.rndcount + " -- " + this.rndArr);
        let thisIsFirstRnd = false;
		if (this.rndArr == null || this.rndArr == undefined || this.rndArr.length == 0) {
			const thisIsFirstRnd = true;
		}

		if (this.rndArr.length == 0) {
			console.log("Set.playNextRnd no more rnds to play ");
			plu.windUpSet();
			return;
		}
		if (this.rndcount++ > 0) {
            if(!thisIsFirstRnd)plu.addRndScoreToSet();
		}
		const rnd = this.rndArr.shift();
		const rndArr = rnd.split(";");
		const type = rndArr[0];
		console.log("Set.type= " + type);
		const serNbr = rndArr[1];
		console.log("Set.serNbr= " + serNbr);

		switch (type) {
			case "Rnd":
				if (onNet == true) {
					const url = 'https://www.edugames.com/cgi-bin/GetRoundsTSD.pl?' + serNbr;
					console.log("Sp.url =" + url + "**");
					fetch(url, {
					})
						.then(response => response.text())
						.then(data => {
							cp.itf.cleanPlayArea();
							const round = new Round(data);
							theQuestion = round.getTheQuestion();
							console.log("Set Question=  " + theQuestion)
							cp.startGame(round);
						})
						.catch(error => console.log('Error fetching data:', error));
					return;
				}
				break;
			case "Ins":
				console.log("Set.inst rnd=" + rnd);
				const tempArr = rndArr[7].split("|");//;-;-;-;-;-;A Title;:BkGndColor=White:TxtSize=12:IsBold=False:TxtColor=Black|This is before 242;
				console.log("Set.inst rndArr[7]= " + rndArr[7]);
				alert(tempArr[1]);
				this.playNextRnd();
				break;
			case "Wpg":
				console.log("Set.Wpg" + rnd);
				window.open(this.rndArr[6], '_blank');
				break;
			case "Set"://We shuld never get here.
				console.log("Set.Set" + rnd);
				this.playNextRnd();
				break;
		}
	}

	/*
Rnd;AA.Oen00199;1;5.00;100;0;History/American/Revolution;Place the first stanza of 'The Midnight Ride of Paul Revere' in order.;
Rnd;AA.Len00228;1;10;100;0;US/State Capitals;Chicago is the largest city in this state.  Where is it's capital?;
Rnd;AA.Qen00051;1;11.00;100;0;Wars/US/American Revolution;Connect the Revolutionary Battles.;

Rnd;AA.Oen00197;1;7.00;100;0;History/American/Revolution;Place parts of the second stanza of 'The Midnight Ride of Paul Revere' in order.;
Rnd;AA.Len00228;1;10;100;0;US/State Capitals;Chicago is the largest city in this state.  Where is it's capital?;
Rnd;AA.Qen00052;1;11.00;100;0;Wars/US/American Revolution;Connect the Revolutionary Battles.;

Rnd;AA.Oen00210;1;8.00;100;0;History/American/Revolution;Place the last stanza of  'The Midnight Ride of Paul Revere' in order.;
Rnd;AA.Len00228;1;10;100;0;US/State Capitals;Chicago is the largest city in this state.  Where is it's capital?;
Rnd;AA.Qen00054;1;11.00;100;0;Wars/US/American Revolution;Connect the Revolutionary Battles.;

Rnd;AA.Oen00209;1;8.00;100;0;History/American/Revolution;Place the last stanza of  'The Midnight Ride of Paul Revere' in order.;
Rnd;AA.Len00228;1;10;100;0;US/State Capitals;Chicago is the largest city in this state.  Where is it's capital?;
Rnd;AA.Qen00054;1;11.00;100;0;Wars/US/American Revolution;Connect the Revolutionary Battles.;

	*/


	async breakOutData(input) {
		input = deComma(input);
		console.log("||Set.breakOutData  " + input);

		// normalize input into array
		const tempArr = Array.isArray(input) ? input : input.split(",");

		if (db) {
			tempArr.forEach((v, i) => console.log(`${i} - ${v}`));
		}

		// header fields (keep your original behavior)
		this.setSerNbr = tempArr[0];
		this.creationDate = tempArr[1];
		this.setData = tempArr[2];
		this.breakOutStats(tempArr[4]);
		this.codes = tempArr[5];
		this.authors = tempArr[6];

		// result rounds (final)
		this.rndArr = [];

		// helper: safely normalize getRndsToPlay result to array
		const normalizeList = (v) => {
			if (v == null) return [];
			if (Array.isArray(v)) return v;
			if (typeof v === "string") {
				// if string contains commas and you expect array, you might want to split,
				// but for now treat single string as single item
				return [v];
			}
			return [String(v)];
		};

		// Recursive processor: handles a single item which may be Rnd or Set
		// If it's a Set, fetch its data, call getRndsToPlay(inst, subsetRounds)
		// and process each returned item (recursively).
		const processItem = async (item) => {
			if (!item || item.length < 5) return;

			// defensive trim
			item = item.trim();
			const parts = item.split(";");
			const type = parts[0];

			if (type === "Set") {
				// the instruction/context we pass to getRndsToPlay should match what your code expects.
				// previously you used `inst` — we'll pass the whole 'item' (the Set instruction string)
				const inst = item;
				const subSetSerNbr = parts[1];
				const url = `https://www.edugames.com/cgi-bin/GetASetTSD.pl?${subSetSerNbr}`;
				console.log(`Processing nested set ${subSetSerNbr}, url=${url}`);

				try {
					const resp = await fetch(url);
					if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
					let text = await resp.text();
					text = deComma(text);

					// split into array like your server provides
					const subsetArr = text.split(",");

					// rounds inside the subset are from index 9 onward (as in your protocol)
					const subsetRounds = subsetArr.slice(9);

					// getRndsToPlay selects only some of those rounds based on `inst`
					let selected = this.getRndsToPlay(inst, subsetRounds);
					selected = normalizeList(selected);

					console.log(`getRndsToPlay returned ${selected.length} items for subset ${subSetSerNbr}`);

					// Each selected item may itself be a Set; process recursively
					for (const sel of selected) {
						await processItem(sel);
					}

				} catch (err) {
					console.error(`Failed to load subset ${subSetSerNbr}:`, err);
					// Decide behavior: here we skip that subset (so no rounds added).
					// Optionally push a placeholder or re-throw to abort higher-level flow.
				}
			} else {
				// treat as a normal round-like entry (push to final array)
				this.rndArr.push(item);
			}
		};

		// iterate original set's rounds (starting at index 9)
		for (let i = 9; i < tempArr.length; i++) {
			const entry = tempArr[i];
			console.log(`${i} -- rnd -- ${entry}`);
			await processItem(entry);
		}

		console.log("Final this.rndArr =\n" + this.rndArr.join("\n"));
		this.rndcount = this.rndArr.length
		this.playNextRnd();
		//return this.rndArr;
	}






	getRndsToPlay(inst, newSetRndArr) {
		console.log("getRndsToPlay inst= " + inst + "\n\n newSetRndArr=  " + newSetRndArr);
		listItemsInArr(newSetRndArr, "*top*", 0, 40, true);
		let returnArr = [];
		const instMap = new Map();
		const instArr = inst.split(":")
		listItemsInArr(instArr, "*instArr* ", 0, 40, true);

		for (let i = 0; i < instArr.length; i++) {
			console.log("instArr[i]= " + instArr[i])
			if (instArr[i] == "") continue;
			const arrA = instArr[i].split("=")
			instMap.set(arrA[0], arrA[1]);
		}
		const nbrRndsToPlay = instMap.get("NbrRndsToPlay");
		const sortBy = instMap.get("SortBy");
		const selectBy = instMap.get("SelectBy");
		let headerComment = "";//If the first rnd is a comment, we want to include it
		console.log(" nbrRndsToPlay= " + nbrRndsToPlay + " sortBy=  " + sortBy + " selectBy=  " + selectBy);
		const type = newSetRndArr[0].substring(0, 3);

		if (type == "Cmt" || type == "WPg") {
			headerComment = newSetRndArr[0];
		}
		for (let i = 0; i < newSetRndArr.length; i++) {
			if (newSetRndArr[i].substring(0, 3) == "Rnd") {
				returnArr.push(newSetRndArr[i]);
			}
		}

		console.log("AA returnArr.length =  " + returnArr.length)
		if (sortBy == "Difficulty") {
			returnArr = this.sortRndsBydifficulty(returnArr);
		}

		let zoneBreakDown = instMap.get("ZoneBreakDown");

		if (zoneBreakDown == undefined) {
			if (headerComment != "") {//Put the comment back in front
				returnArr.unshift(headerComment);
			}
			console.log("******* undefined");
			return returnArr;//All rnds are to be played
		}
		console.log("AAA***************************");
		let zoneArr = [];
		let nbrOfZones = 1;
		if (zoneBreakDown.slice(-1) == ".") {//Get rid of a period at end
			zoneBreakDown = zoneBreakDown.slice(0, -1);
		}
		if (zoneBreakDown.indexOf(".") != -1) {//4.2.1
			zoneArr = zoneBreakDown.split(".")
			nbrOfZones = zoneArr.length;
		}
		if (nbrOfZones == 1) {
			console.log("******* only one zone");
			const nbrToReturn = Number(zoneBreakDown);
			console.log("  nbrToReturn=  " + nbrToReturn)
			newSetRndArr.sort(() => Math.random() - 0.5);//sort that chunk
			returnArr = newSetRndArr.slice(0, nbrToReturn)

			console.log(" aa returnArr.length=  " + returnArr.length)
			if (headerComment != "") {//Put the comment back in front
				returnArr.unshift(headerComment);
			}
			console.log(" bb returnArr.length=  " + returnArr.length)

			return returnArr;
		}

		console.log("BBB****************************");

		//We have mutiple zones and will continue
		const zoneCountArr = zoneBreakDown.split(".")
		nbrOfZones = zoneArr.length;
		console.log("nbrOfZones =" + nbrOfZones)
		const nbrOfRnds = newSetRndArr.length;
		console.log("nbrOfRnds =" + nbrOfRnds)
		const nbrOfRndPerZone = nbrOfRnds / nbrOfZones;
		console.log("nbrOfRndPerZone =" + nbrOfRndPerZone);
		const finalArr = [];
		let pointer = 0;
		for (let i = 0; i < nbrOfZones; i++) {
			const nbrInThisArr = zoneArr[i];
			console.log("nbrInThisArr =" + nbrInThisArr)
			console.log("pointer =" + pointer + "   " + (pointer + nbrOfRndPerZone))
			const tempArr = newSetRndArr.slice(pointer, pointer + nbrOfRndPerZone);//Take a chunk
			console.log(nbrInThisArr + "  aaatempArr =" + tempArr);
			tempArr.sort(() => Math.random() - 0.5);//sort that chunk
			console.log("bbbtempArr =" + tempArr);
			for (let j = 0; j < nbrInThisArr; j++) {//take the first n number for the chenk
				finalArr.push(tempArr.shift())
			}
			const txt = i + " finalArr " + this.serNbr
			//listItemsInArr(finalArr,txt,0,50,true)
			pointer += nbrOfRndPerZone;
		}
		if (headerComment != "") {//Put he comment back in front
			finalArr.unshift(headerComment);
		}
		return finalArr;
	}

	



	advanceToRndNbr() { console.log("Set.advanceToRndNbr " );
		const strtNbr = Number(document.getElementById("strtNbr").value)
		for (let i = 0; i < strtNbr; i++) {
			this.rndArr.shift();;
		}
	}

	getQuestionBeingPlayed() {
		return this.theQuestion;
	}


	getSerNbrOfRndBeingPlayer(){console.log("Set.getSerNbrOfRndBeingPlayer " )
		const rnd =  this.rndBeingPlayed;
		console.log("rnd=  " + this.rndBeingPlayed)//,AA.Qen00435,Ed-U-Games tm,20220123,9
		if(rnd != null && rnd != undefined){
			return rnd.substring(0,12);
		}
	}

	

	getRoundFmRnd(rnd) {
		console.log("sp.getRoundFmRnd  " + " onNet= " + onNet + "  rnd= " + rnd);//theRndMenu
		let gameType = "X";
		if (rnd.length < 20) {//this is just the rndSerNbr
			gameType = rnd.charAt(3);
            rndSerNbr = rnd;//rndSerNbr is global
		} else {
			const arr = rnd.split(";");
			rndSerNbr = arr[1];
			gameType = rndSerNbr.charAt(3);;
		}

		console.log("gameType=  " + gameType + " rndSerNbr= " + rndSerNbr + " onNet= " + onNet);

		if (onNet == true) {
			const url = 'https://www.edugames.com/cgi-bin/GetRoundsTSD.pl?' + rndSerNbr;
			console.log("Sp.url =" + url + "**");
			////fetch('/edugames.com/cgi-bin/GetRounds.pl?' + rndSerNbr)

			fetch(url, {
			})
				.then(response => response.text())
				.then(data => {
					// console.log("fetch **" + data +"**");
					cp.itf.cleanPlayArea();
					const round = new Round(data);
					theQuestion = round.getTheQuestion();
					console.log("-@@-sp.getRoundFmRnd QQQQ=  " + round.getTheQuestion())
					cp.startGame(round);

				})
				.catch(error => console.log('Error fetching data:', error));
			return;
		}

	}
	
	async getNextRndZZZ(from) {//function //getNextRnd(from)
		console.log("Set.getNextRnd Top rndArr.length= " + this.rndArr.length + " from " + from);
		listItemsInArr(this.rndArr, "From -- getNextRnd", 0, 20, true);
		if (!Array.isArray(this.rndArr) || this.rndArr.length === 0) {
			return null;
		}

		// keep bookkeeping
		plu.addRndScoreToSet();
		const serNbr = this.getSerNbr();
		const rndOrSet = this.rndArr.shift();
		const rndOrSetArr = rndOrSet.split(";");
		const type = rndOrSetArr[0];
		const aSerNbr = rndOrSetArr[1];

		console.log("||type= " + type + " serNbr=  " + serNbr + " aSerNbr=  " + aSerNbr);

		try {
			if (type === "Rnd") {
				this.rndBeingPlayed = aSerNbr;
				this.theQuestion = rndOrSetArr[7]; // keep existing behavior
				console.log("||theQuestion= " + this.theQuestion + " aSerNbr=  " + aSerNbr);
				cp.sp.getRoundFmRnd(aSerNbr);
				return;
			}

			if (type === "Set") {
				// If online, fetch the set contents
				if (onNet) {
					const url = 'https://www.edugames.com/cgi-bin/GetASetTSD.pl?' + aSerNbr;
					// use fetchWithTimeout with 5s timeout and 2 attempts (configurable)
					let data;
					try {
						data = await fetchWithTimeout(url, { timeoutMs: 5000, retries: 2 });
					} catch (err) {
						console.error("Failed to fetch set data:", err);
						// graceful fallback: try offline subSet or push the set back and stop
						// Option A: push rndOrSet back so next attempt might try again later
						this.rndArr.unshift(rndOrSet);
						// return null (or you could return a special error code)
						return null;
					}

					const instPlusData = rndOrSet + "," + data;
					countUp();
					const subSet = new SubSet(instPlusData);
					subSet.init();
					const dataX = subSet.returnRndsToBePlayed();

					// Prepend the returned rounds
					for (let i = dataX.length - 1; i >= 0; i--) {
						// unshift in reverse to preserve order
						this.rndArr.unshift(dataX[i]);
					}

					// Loop will continue and pick next item
					return await this.getNextRnd("online thisset");
				} else {
					// offline handling
					const subSet = new SubSet(rndOrSet);
					subSet.init();
					const data = subSet.returnRndsToBePlayed();

					for (let i = data.length - 1; i >= 0; i--) {
						this.rndArr.unshift(data[i]);
					}

					return await this.getNextRnd("offline thisset");
				}
			} else if (type === "Cmt") {
				alert("Comment: " + rndOrSetArr[7]);
			} else if (type === "Wpg") {
				window.open(this.rndArr[6], '_blank');
			}

			// fallback - try again if there are more items
			return await this.getNextRnd("Set.getNextRnd bottom");
		} catch (err) {
			console.error("getNextRnd caught error:", err);
			// safe fallback
			return null;
		}
	}

	async getRndsFromSubSet(aSet) {
		console.log(" getRndsFromSubSet " + aSet);
		const arr = aSet.split(";");
		const theSetSerNbr = arr[1];
        const lstOfRnds = [];
		const url = 'https://www.edugames.com/cgi-bin/GetASetTSD.pl?' + theSetSerNbr;
		console.log("url = " + url);

		try {
			const response = await fetch(url);
			const data = await response.text();

			if (data != null) {
				console.log("fetch data=  " + data.substring(0, 24));
				const subSet = new Set(data); // Make sure Set is defined correctly
				const rndArr = subSet.getRndArr(); // Check that getRndArr exists
				for (let i = 0; i < rndArr.length; i++) {
					console.log("rndArr[i]  = " + rndArr[i]);
					this.rndArr.push(rndArr[i]);
                    lstOfRnds.push(rndArr[i]);
				}
			} else {
				alert("Something went wrong and the Set could not be downloaded");
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
        return lstOfRnds;
	}

	// ---------- helpers ----------
/**
 * Helper: fetch with timeout and optional retries
 * @param {string} url
 * @param {object} opts - { timeoutMs, retries }
 */
async  fetchWithTimeout(url, opts = {}) {//function
	const timeoutMs = opts.timeoutMs ?? 5000;
	const retries = opts.retries ?? 1; // number of attempts (1 = single attempt)
	let lastErr = null;

	for (let attempt = 1; attempt <= retries; attempt++) {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeoutMs);

		try {
			const resp = await fetch(url, { signal: controller.signal });
			clearTimeout(id);
			if (!resp.ok) {
				throw new Error(`HTTP ${resp.status}`);
			}
			return await resp.text();
		} catch (err) {
			clearTimeout(id);
			lastErr = err;
			console.warn(`fetchWithTimeout attempt ${attempt} failed for ${url}:`, err);
			// small backoff (optional)
			if (attempt < retries) await new Promise(r => setTimeout(r, 250 * attempt));
		}
	}

	throw lastErr;
}

// ---------------- getNextRnd (improved) ----------------


async popNextRoundFromQueue() {console.log("Set.popNextRoundFromQueue    " );
    listItemsInArr(this.rndArr, "popNextRoundFromQueue", 0, 20, true);
	while (this.rndArr.length > 0) {
		const rndOrSet = this.rndArr.shift();
		const parts = rndOrSet.split(";");
		const type = parts[0];
		const aSerNbr = parts[1];

		if (type === "Rnd") {
			this.rndBeingPlayed = aSerNbr;
			this.theQuestion = parts[7];
			return aSerNbr;
		} else if (type === "Set") {
			if (onNet) {
				const url = 'https://www.edugames.com/cgi-bin/GetASetTSD.pl?' + aSerNbr;
				let data;
				try {
					data = await fetchWithTimeout(url, { timeoutMs: 5000, retries: 2 });
				} catch (err) {
					console.error("Failed to fetch set, pushing back and aborting:", err);
					// push it back so next attempt might retry later
					this.rndArr.unshift(rndOrSet);
					return null;
				}
				const instPlusData = rndOrSet + "," + data;
				const subSet = new SubSet(instPlusData);
				subSet.init();
				const dataX = subSet.returnRndsToBePlayed();
				// prepend in correct order
				for (let i = dataX.length - 1; i >= 0; i--) this.rndArr.unshift(dataX[i]);
				// continue loop
			} else {
				const subSet = new SubSet(rndOrSet);
				subSet.init();
				const data = subSet.returnRndsToBePlayed();
				for (let i = data.length - 1; i >= 0; i--) this.rndArr.unshift(data[i]);
				// continue loop
			}
		} else if (type === "Cmt") {
			alert("Comment: " + parts[7]);
			// loop continues
		} else if (type === "Wpg") {
			window.open(this.rndArr[6], '_blank');
			// loop continues
		} else {
			console.warn("Unknown type in queue:", type, rndOrSet);
		}
	}

	return null; // nothing more
}

	

	//async getNextRnd(from) {
	async getNextRndTT(from) {
		console.log("Set.getNextRnd Top rndArr.length= " + this.rndArr.length + " from " + from);
		listItemsInArr(this.rndArr, "From -- getNextRnd", 0, 20, true);

		if (this.rndArr.length === 0) {
			return null;
		}

		plu.addRndScoreToSet();
		const serNbr = this.getSerNbr();
		const rndOrSet = this.rndArr.shift();
		const rndOrSetArr = rndOrSet.split(";");
		const type = rndOrSetArr[0];
		const aSerNbr = rndOrSetArr[1];

		console.log("||type= " + type + " serNbr=  " + serNbr + " aSerNbr=  " + aSerNbr);
		
		if (type === "Rnd") {
			this.rndBeingPlayed = aSerNbr;
			this.theQuestion = rndOrSetArr[7];
			return aSerNbr;
		}

		if (type === "Set") {
			if (onNet) {
				const url = 'https://www.edugames.com/cgi-bin/GetASetTSD.pl?' + aSerNbr;
				const response = await fetch(url);
				const data = await response.text();

				const instPlusData = rndOrSet + "," + data;
				countUp();
				const subSet = new SubSet(instPlusData);
				subSet.init();
				const dataX = subSet.returnRndsToBePlayed();

				for (let i = 0; i < dataX.length; i++) {
					this.rndArr.unshift(dataX[i]);
				}

				return await this.getNextRnd("online thisset");
			} else {
				const subSet = new SubSet(rndOrSet);
				subSet.init();
				const data = subSet.returnRndsToBePlayed();

				for (let i = 0; i < data.length; i++) {
					this.rndArr.unshift(data[i]);
				}

				return await this.getNextRnd("offline thisset");
			}
		} else if (type === "Cmt") {
			alert("Comment: " + rndOrSetArr[7]);
		} else if (type === "Wpg") {
			window.open(this.rndArr[6], '_blank');
		}

		return await this.getNextRnd("Set.getNextRnd bottom");
	}
	
	getNextRndAA(from){console.log("Set.getNextRnd Top rndArr.length= " +  this.rndArr.length + " from " + from);
		listItemsInArr(this.rndArr,"From -- getNextRnd",0,20,true);
		//plu.logTheRound();
		if(this.rndArr.length == 0){
			return null;
		}
		plu.addRndScoreToSet();
		const serNbr = this.getSerNbr();
		console.log(" serNbr= "  + serNbr);
		console.log("AAA---Set.getNextRnd rndArr.length= " + this.rndArr.length + " **  " + this.rndArr);
		listItemsInArr(this.rndArr,"|||getNextRnd",0,20,true);
		const rndOrSet = this.rndArr.shift();
		console.log("rndOrSet=  " +  rndOrSet);
		const rndOrSetArr = rndOrSet.split(";");
		const type = rndOrSetArr[0];
		const aSerNbr = rndOrSetArr[1];
		console.log("type=  --" + type + "--" + aSerNbr )
		if(type ==  "Rnd"){
			this.rndBeingPlayed = aSerNbr;
			console.log("set.return " + aSerNbr)
			this.theQuestion = rndOrSetArr[7];
			return aSerNbr;
		}

		listItemsInArr(this.rndArr, "***$$$$** ", 0, 20, true);

		if(type == "Set"){
			if (onNet) {
				console.log("Set.Set  " + aSerNbr);
				const url = 'https://www.edugames.com/cgi-bin/GetASetTSD.pl?' + aSerNbr;
				console.log("url= " + url)
				fetch(url)
					.then(response => response.text())
					.then(data => {
						listItemsInArr(this.rndArr, "***|||*** ", 0, 20, true);
						const instPlusData = rndOrSet + "," + data;
						console.log("instPlusData= " + instPlusData);
						console.log(" AAAAAAAAAAAAAAAA " + aSerNbr );
						countUp();
						const subSet = new SubSet(instPlusData);
						subSet.init();
						console.log(" BBBBBBBBBBBBB " + aSerNbr);

						const dataX = subSet.returnRndsToBePlayed();
						console.log("*****  ***  **subSet.dataX = " + dataX)
						listItemsInArr(this.rndArr, "Before subsetaddition", 0, 20, true);

						for(let i = 0 ;i < dataX.length;i++){
							this.rndArr.unshift(dataX[i]);
						}
						listItemsInArr(this.rndArr, "After  subsetaddition", 0, 20, true);

						console.log("BBB******this.rndArr " +  this.rndArr);
							//Place the Rnds from the set at the front of the arr
				
						return this.getNextRnd("online thisset");
						;
				});
			}else{//Off net  
				//console.log("AAA******this.rndArr= " +  this.rndArr + " \\");
				const subSet = new SubSet(rndOrSet);
				subSet.init();
				const data = subSet.returnRndsToBePlayed();
				//console.log("*****  ***  **subSet.data = " + data)
				for(let i = 0 ;i < data.length;i++){
					this.rndArr.unshift(data[i]);
				}
				//console.log("BBB******this.rndArr " +  this.rndArr);
				//Place the Rnds from the set at the front of the arr
				console.log(" ***AA ");
				//cp.startRnd();
				console.log(" ***bbb ");
				return this.getNextRnd("offLine this set");
				//this.procASubSet(data);
			}
		} else if (type == "Cmt") {
            const comment = rndOrSetArr[7];
			console.log("Set.rndOrSetArr= " + rndOrSetArr);
			alert("Comment: " + comment);
		}else if(type == "Wpg"){
			console.log("Set.Get Web Page   " + this.rndArr[6]);
			window.open(this.rndArr[6], '_blank');	
		}
		const nextRnd = this.getNextRnd("Set.getNextRnd bottom");

		console.log("Set.getNextRnd bottom nextRnd=  " + nextRnd);

		return "*," + nextRnd;//goes back to caller to get next rnd
		
		console.log("Set.getNextRnd bottom  " );
		
	}

	getitfTypeFromRound(rmdType) {
		let itfType = 'X';
		switch (rmdType) {
			case 'B':
				itfType = "B"
			case 'C':
				itfType = "B"
				break;
			case 'D':
				itfType = "D"
				break;
			case 'E':
				itfType = "B"
				break;
			case 'I':
				itfType = "I"
				break;
			case 'L':
				itfType = "D"
				break;
			case 'M':
				itfType = "B"
				break;
			case 'N':
				itfType = "D"
				break;
			case 'O':
				this.itfType = "B"
				break;
			case 'P':
				itfType = "B"
				break
			case 'Q':
				itfType = "B"
				break;
			case 'U':
				itfType = "B"
				break;
			case 'X':
				itfType = "X"
				break;
			default:
		} 
		return itfType;

	}



	getTypeOfNextRnd(){console.log("set.getTypeOfNextRnd  " + this.setSerNbr);
		const nxtRnd = this.rndArr[0];
		console.log("set.nxtRnd  " + nxtRnd);
		const type = nxtRnd.charAt(7);
		console.log("type  " + type);
		return type;
	}

	getTypeOfThisRnd(){console.log("set.getTypeOfNextRnd  " + this.setSerNbr);

		//console.log("this.rndBeingPlayed == " + this.rndBeingPlayed + " ===");

		const type = this.rndBeingPlayed.charAt(7);
		return type;		 
	}

	getRndBeingPlayed(){console.log("set.getRndBeingPlayed  " + this.setSerNbr);
		return this.rndBeingPlayed;
	}

	getSerNbr(){
		return this.setSerNbr;
	}

	getAuthors(){
		return this.authors;
	}

	getNbrOfRemRnds(){
		return this.rndArr.length;
	}

	listRnds(txt) {
		console.log("Set listRnds  " + this.setSerNbr + " length " + this.rndArr.length);
		let buf = txt + ": A list of rnds\n";
	    for(let i = 0 ;i < this.rndArr.length;i++){
			buf+= i + "  " + this.rndArr[i]+ "\n"
		}
		console.log(" " + buf + "\n");
		return buf;
	}

	listjustRndSerNbrs(text) {
		console.log("justRndSerNbr  " +  text  +  "\n");
		let buf = "Rnds: len= "  + this.rndArr.length +  "\n";
	     for(let i = 0 ;i < this.rndArr.length;i++){
			buf+= i + "  " +  this.rndArr[i].substring(0,20) + "\n";
		}
		console.log(buf)
	}

	procRnds(arr){console.log("procRnds top " + this.setSerNbr  + "   " + arr);
	     for(let i = 0 ;i < arr.length;i++){
			const aRnd = arr[i];
			console.log("aRnd " + aRnd);			
			const type = aRnd.substring(0,3);
			console.log("type " + type);
			this.rndArr.push(aRnd + " ****  "+ this.setSerNbr);
			
			if(type == "Set"){ 
				console.log(this.setSerNbr + "  procRnds just before procSubset " + aRnd);
				this.procSubset(aRnd);
			}else{
				//console.log(this.setSerNbr + "  procRnds just before push a rnd " + aRnd);
				this.rndArr.push(aRnd + " ****  "+ this.setSerNbr);
			}
			
	    }
		const txt ="botom of procRnds" + this.setSerNbr

		listItemsInArr(this.rndArr,txt,0,30,true)//const xx = [arr[3], i];
    }

	sortRndsBydifficulty(rndArr){console.log("sortRndsBydifficulty  " + rndArr.length);//Difficulty is school grade
		const sortLst = []
	    for(let i = 0 ;i < rndArr.length;i++){
			const arr = rndArr[i].split(";")//Rnd;AA.Uen00002;1;9;100;0;Test/Unscramble;Unscramble
			sortLst.push((arr[3] * 1000).toFixed(0) + "." + i);
		}
		sortLst.sort((a, b) => a - b);
		const secondArr = []
	    for(let i = 0 ;i < sortLst.length;i++){
			const n = "" + sortLst[i];
			const tempArr = n.split(".")
			secondArr[i] = rndArr[tempArr[1]];
		}

		listItemsInArr(secondArr,"** sortRndsBydifficulty bottom *",0,40,true);

		return secondArr;
	}


	//Set  PRA1_1778   6    9.166667 600 :SortBy=Random:ZoneBreakDown=2.0.1.:NbrRndsToPlay=3:SelectBy=RandomOrder                                6
	getSetInst(inst,newSetRndArr){console.log("Set.getSetIns  " + inst);
		//listItemsInArr(newSetRndArr,"*top*",0,40,true);
		let returnArr = [];
		const instMap = new Map();
		const instArr = inst.split(":")
	    for(let i = 0 ;i < instArr.length;i++){
			const arrA = instArr[i].split("=") 
			instMap.set(arrA[0],arrA[1]);
		}
		const nbrRndsToPlay = instMap.get("NbrRndsToPlay");
		const sortBy        = instMap.get("SortBy");
		const selectBy      = instMap.get("SelectBy");
		let headerComment = "";//If the first rnd is a comment, we want to include it
		console.log( " nbrRndsToPlay= " + nbrRndsToPlay + " sortBy=  " + sortBy + " selectBy=  " + selectBy);
		const type = newSetRndArr[0].substring(0,3);

		if(type == "Cmt" || type == "WPg"){
			headerComment =  newSetRndArr[0];
		}		
		for(let i = 0 ;i < newSetRndArr.length;i++){
			if(newSetRndArr[i].substring(0,3) == "Rnd"){
				returnArr.push(newSetRndArr[i]);
			}
		}

		console.log("AA nbr of rnds in subset =  " + returnArr.length)
		if(sortBy == "Difficulty"){
			returnArr = this.sortRndsBydifficulty(returnArr);
		}

		let zoneBreakDown = instMap.get("ZoneBreakDown");

		if(zoneBreakDown == undefined){
			if(headerComment != ""){//Put the comment back in front
				returnArr.unshift(headerComment);
			}
			console.log("******* undefined" );
			return returnArr;//All rnds are to be played
		}
		console.log( "AAA***************************"	+	this.setSerNbr);				
		let zoneArr =[];
		let nbrOfZones = 1;
		if(zoneBreakDown.slice(-1) == "."){//Get rid of a period at end
			zoneBreakDown = zoneBreakDown.slice(0,-1);
		}
		if(zoneBreakDown.indexOf(".") != -1){//4.2.1
			zoneArr = zoneBreakDown.split(".")
			nbrOfZones = zoneArr.length;
		}		
		if(nbrOfZones == 1){
			console.log("******* only one zone" );
			const nbrToReturn = Number(zoneBreakDown);
			console.log( "  nbrToReturn=  "  + nbrToReturn)
			this.rndArr.sort(() => Math.random() - 0.5);//sort that chunk
			returnArr = returnArr.slice(0,nbrToReturn)

			console.log( " aa returnArr.length=  "  + returnArr.length)
			if(headerComment != ""){//Put he comment back in front
				returnArr.unshift(headerComment);
			}
			console.log( " bb returnArr.length=  "  + returnArr.length)
			return returnArr;
		}

		console.log( "BBB****************************"	+	this.setSerNbr);

		//We have mutiple zones and will continue
		const zoneCountArr = zoneBreakDown.split(".")
		nbrOfZones = zoneArr.length;
		console.log( "nbrOfZones ="	+	nbrOfZones)
		const nbrOfRnds = returnArr.length;
		console.log( "nbrOfRnds ="	+	nbrOfRnds)
		const nbrOfRndPerZone = nbrOfRnds/nbrOfZones;
		console.log( "nbrOfRndPerZone ="	+	nbrOfRndPerZone);
		const finalArr = [];
		let pointer = 0;
		for(let i = 0 ;i < nbrOfZones;i++){
			const nbrInThisArr = zoneArr[i];
			console.log( "nbrInThisArr ="	+	nbrInThisArr)
			console.log( "pointer ="	+	pointer + "   " + (pointer + nbrOfRndPerZone))
			const tempArr = returnArr.slice(pointer,pointer + nbrOfRndPerZone);//Take a chunk
			//console.log(nbrInThisArr + "  aaatempArr ="	+	tempArr);
			tempArr.sort(() => Math.random() - 0.5);//sort that chunk
			//console.log( "bbbtempArr ="	+	tempArr);
			for(let j = 0 ;j < nbrInThisArr;j++){//take the first n number for the chenk
				finalArr.push(tempArr.shift())
			}
			const txt  = i + " finalArr " + this.setSerNbr 
			listItemsInArr(finalArr,txt,0,50,true)
			pointer+=nbrOfRndPerZone;
		}
		if(headerComment != ""){//Put he comment back in front
			finalArr.unshift(headerComment);
		}
		return finalArr;
	}


	breakOutStats(imput4){console.log("breakOutStats  " + imput4 );
		this.setMap= new Map();
		const arrParm = imput4.split(" ");
		let name = "";
		let item = "";
        for(let i = 0 ;i < arrParm.length;i++){
			[name,item] = arrParm[i].split("=");
			this.setMap.set(name,item);
		}
	}

	displayAll(){
		console.log("Set.getNextRnd  " +  this.buf);
	}

	getRndsFromSubSetXX(aSet) {
		console.log(" getRndsFromSubSet " + aSet);//Set;PRA1_1777;6;9.166667;600;-;;2010Oct14;:ZoneBreakDown=1.:NbrRndsToPlay=1;1,
		const arr = aSet.split(";");
		const theSetSerNbr = arr[1];
		console.log("theSetSerNbr AAA= " + theSetSerNbr);
		const url = 'https://www.edugames.com/cgi-bin/GetASetTSD.pl?' + theSetSerNbr;
		console.log("url = " + url);
		fetch(url)
			.then(response => response.text())
			.then(data => {
				if (data != null) {
					console.log("fetch data=  " + data.substring(0, 24));
					const subSet = new Set(data);
					const rndArr = subset.getRndArr();
					for (let i = 0; i < rndArr.length; i++) {
						console.log("rndArr[i]  = " + rndArr[i])
						this.rndArr.push(rndArr[i]);
					}
				} else {
					alert("Somethign went wrong and the Set could not be downloaded");
					return;
				}

			});
	}

	compileASetXX(inputArr) {
		console.log(" compileASet " + inputArr);
		//const playArr = [];
		//input = "PRA1_1780,2024.05.05,PRA1_1780;Set;19;8.789474;1900;;TSDTest3SubSets1WbPg1Rnd,,AvgGrade=8.789474 Points=1900 TotalRounds=19 SubSets=3 SubSetRnds=18 WebPages=1 Instructions=0 Commands=0 Comments=1 ,AbTe;;;;,gPRA1_80 ,,Fu2,Cmt;-;-;-;-;-;TSD Test;This is a test of TSD;,Set;PRA1_1777;6;9.166667;600;-;;2010Oct14;:ZoneBreakDown=1.:NbrRndsToPlay=1;1,Rnd;AA.Oen00001;1;2;100;0;Test/Order;Place the numbers on the LEFT in order on the RIGHT with the largest number on the bottom Make a mistake or two and press the CHECK button to see what happens.;,Set;PRA1_1778;6;9.166667;600;-;;TSD6UgamesTest;:ZoneBreakDown=1.:NbrRndsToPlay=1;2,Set;PRA1_1779;6;9.166667;600;-;;TSD6UgamesTest;:ZoneBreakDown=1.:NbrRndsToPlay=1;3,WPg;-;-;-;-;-;RG10_KnowledgeBase.html;Antoniak.Peter.PRA1/WebPages/RG10_KnowledgeBase.html;";
		//const inputArr = input.split(",");

		for (let i = 0; i < inputArr.length; i++) {
			const aline = inputArr[i];
			console.log(" aline= " + aline);
			const type = aline.substring(0, 3);
			console.log(" type= " + type);
			if (type == "Set") {
				//this.this.rndArr.push(aline);
				this.getRndsFromSubSet(aline);//It will fetch and process the rnds from the subset
				if (countUp() >= 20) {
					causeError();
				}
			} else {
				this.rndArr.push(aline);
			}
		}
		console.log("this.rndArr= " + this.rndArr);

	}

	/*
	PRA1_1780,2024.05.05,PRA1_1780;Set;19;8.789474;1900;;TSDTest3SubSets1WbPg1Rnd,,AvgGrade=8.789474 Points=1900 TotalRounds=19 SubSets=3 SubSetRnds=18 WebPages=1 Instructions=0 Commands=0 Comments=1 ,
	AbTe;;;;,gPRA1_80 ,,Fu2,
	Cmt;-;-;-;-;-;TSD Test;This is a test of TSD;,
	Set;PRA1_1777;6;9.166667;600;-;;2010Oct14;:ZoneBreakDown=1.:NbrRndsToPlay=1;1,
	Rnd;AA.Oen00001;1;2;100;0;Test/Order;Place the numbers on the LEFT in order on the RIGHT with the largest number on the bottom Make a mistake or two and press the CHECK button to see what happens.;,
	Set;PRA1_1778;6;9.166667;600;-;;TSD6UgamesTest;:ZoneBreakDown=1.:NbrRndsToPlay=1;2,
	Set;PRA1_1779;6;9.166667;600;-;;TSD6UgamesTest;:ZoneBreakDown=1.:NbrRndsToPlay=1;3,
	WPg;-;-;-;-;-;RG10_KnowledgeBase.html;Antoniak.Peter.PRA1/WebPages/RG10_KnowledgeBase.html;
	*/

	async compileASet(inputArr) {
		console.log(" compileASet " + inputArr);

		for (let i = 0; i < inputArr.length; i++) {
			const aline = inputArr[i];
			console.log(" aline= " + aline);
			const type = aline.substring(0, 3);
			console.log(" type= " + type);

			if (type === "Set") {
				await this.getRndsFromSubSet(aline); // Wait for fetch to complete
				if (countUp() >= 20) {
					causeError();
				}
			} else {
				this.rndArr.push(aline);
			}
		}

		console.log("this.rndArr= " + this.rndArr);
	}

	async breakOutDataXX(input) {
		input = deComma(input);
		//console.log("||Set.breakOutData  " + input);

		let tempArr;

		if (Array.isArray(input)) {
			tempArr = input;
		} else {
			tempArr = input.split(",");
		}

		this.setSerNbr = tempArr[0];
		this.creationDate = tempArr[1];
		this.setData = tempArr[2];

		this.breakOutStats(tempArr[4]);
		this.codes = tempArr[5];
		this.authors = tempArr[6];

		//this.rndArr = [];

		// Collect async fetch promises here:
		const subsetPromises = [];

		for (let i = 9; i < tempArr.length; i++) {

			const entry = tempArr[i];
			//console.log(i + " - " + entry);

			if (entry.length <= 10) continue;

			const tmpArr = entry.split(";");
			const type = tmpArr[0];

			if (type === "Set") {
				// ---- Nested Set ----
				const subSetSerNbr = tmpArr[1];
				const inst = tmpArr[8];

				const url = 'https://www.edugames.com/cgi-bin/GetASetTSD.pl?' + subSetSerNbr;
				//console.log("Nested set url = " + url);

				// Push a promise that fetches and processes this sub-set
				subsetPromises.push(
					fetch(url)
						.then(r => r.text())
						.then(data => {
							if (!data) throw new Error("Empty subset data");

							console.log("Fetched subSet: " + data.substring(0, 240));
							data = deComma(data);
							const subsetArr = data.split(",");
							for (let j = 9; j < subsetArr.length; j++) {
								//console.log(j + " subSet.rnd " + subsetArr[j]);
							}
							const listOfRndsToPlay = this.getRndsToPlay(inst, subsetArr.slice(9));

							console.log("listOfRndsToPlay " + listOfRndsToPlay)
							this.tempArr.push(...listOfRndsToPlay);
							// Append to main rndArr	
							this.rndArr.concat(listOfRndsToPlay);
							this.listjustRndSerNbrs("After loading subset " + subSetSerNbr);


						})
						.catch(err => {
							console.error("Error loading subset " + subSetSerNbr, err);
							alert("Subset could not be loaded: " + subSetSerNbr);
						})
				);

			} else {
				// ---- Normal Round ----
				this.rndArr.push(entry);
			}
		}

		// ------ IMPORTANT ------
		// Wait until ALL fetches are complete
		await Promise.all(subsetPromises);

		console.log("this.rndArr = \n" + this.rndArr.join("\n"));

		return this.rndArr;
	}



}

