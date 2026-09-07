

class NetTest{
	constructor(){//console.log("NetTest ");

	}

	test(){//console.log("NetTest  onNet" );
		//"onNet" matches the deployed copy: the game reads sets, rounds and
		//media from cgi-bin/*.pl on edugames.com. Run `node dev-server.js`
		//to develop locally — it proxies those calls so they work from
		//localhost. Only switch to "offNet" to work with no network, using
		//the partial snapshots in Sets.js and Round*.js (11 of 26 sets, and
		//no images).
		return "onNet";

	}


}
