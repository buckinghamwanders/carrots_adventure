import TransitionTable  from './TransitionTable.js' 

describe('TransitionTable', function() {
	it('TransitionTable add', function() {
		let trans = new TransitionTable();  
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile2");
		
   		expect(trans.transitionCount("tile1","tile2")).toBe(3);
  	});
	
	it('TransitionTable add2', function() {
		let trans = new TransitionTable();  
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile3");
		
   		expect(trans.transitionCount("tile1","tile2")).toBe(3);
  	});

  	it('TransitionTable probability', function() {
		let trans = new TransitionTable();  
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile3");
		
   		expect(trans.likelihoodTransition("tile1","tile2")).toBe(0.75);
  	});

  	it('TransitionTable probability2', function() {
		let trans = new TransitionTable();  
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile2");
		trans.recordTransition("rab","tile1","tile3");
		trans.recordTransition("rab","tile2","tile3");
		
   		expect(trans.likelihoodTransition("tile2","tile3")).toBe(1.0);
  	});
	
	
  	
});