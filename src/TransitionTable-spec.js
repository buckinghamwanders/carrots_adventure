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
	
	it('TransitionTable parse1', function() {
		let trans = new TransitionTable();  
		let difference = trans.findDifferenceOfSteps("default.pattern1.tile2","default.pattern2.tile2");

		
   		expect(difference.src).toBe("default.pattern1");
   		expect(difference.dest).toBe("default.pattern2");
  	});
	
	it('TransitionTable parse2', function() {
		let trans = new TransitionTable();  
		let difference = trans.findDifferenceOfSteps("default.pattern1.tile2","default.pattern1.tile3");

		
   		expect(difference.src).toBe("default.pattern1.tile2");
   		expect(difference.dest).toBe("default.pattern1.tile3");
  	});
	
  	
});