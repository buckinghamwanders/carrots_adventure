
export default class TransitionTable {
	

	  constructor(){
	   	this.entryTable = {};
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


