
export default class TransitionTable {
	

	  constructor(){
	   	this.entryTable = {};
	  }

	  parseTransition(id,src,dest)
	  {
	  	 
	  	 let difference = this.findDifferenceOfSteps(src,dest);

	  	 this.recordTransition(id,difference.src,difference.dest);
	  }

	  findDifferenceOfSteps(src,dest)
	  {
	  	let srcArray = src.split(".");
	  	 let destArray = dest.split(".");
	  	 let idx = 0;
	  	 for (idx = 0; idx < srcArray.length; idx++)
	  	 {
	  	 	if (srcArray[idx] != destArray[idx])
	  	 		break
	  	 }
	  	 let srcStep = "";
	  	 let destStep = "";
	  	 for (let concatIdx = 0; concatIdx < idx; concatIdx++)
	  	 {
	  	 	srcStep = srcStep.concat(srcArray[concatIdx]).concat(".");
	  	 	destStep = destStep.concat(destArray[concatIdx]).concat(".");
	  	 }

	  	 if (idx < srcArray.length)
	  	 {
	  	 	srcStep = srcStep.concat(srcArray[idx]);
	  	 	destStep = destStep.concat(destArray[idx]);
	  	 }
	  	 return {src: srcStep, dest: destStep};	
	  }

	  recordTransition(id,src,dest)
	  {
	  	  let srcEntry = this.updateEntry(src);
	  	  srcEntry.addTransition(dest);
	  }

	  likelihoodTransition(src,dest)
	  {
	  		let srcEntry = this.updateEntry(src);
	  	  	return srcEntry.probabilityTransition(dest);
	  }

	  transitionCount(src,dest)
	  {
	  		let srcEntry = this.updateEntry(src);
	  	  	return srcEntry.transitionCount(dest);
	  }

	  updateEntry(src)
	  {
	  	if (!this.entryTable.hasOwnProperty(src))
	  		this.entryTable[src] = new TransitionEntry();
	  	return this.entryTable[src];
	  }
}

class TransitionEntry {
	constructor() {
		this.total = 0;
		this.transitions = {};
	}

	addTransition(dest)
	{
		this.total = this.total + 1;
		this.transitions[dest] = this.transitionCount(dest) + 1;
	}

	transitionCount(dest)
	{
		if (!this.transitions.hasOwnProperty(dest))
			return 0;
		return this.transitions[dest];
	}

	probabilityTransition(dest)
	{
		return this.transitionCount(dest)/this.total;
	}
}

export let transitions = new TransitionTable();


