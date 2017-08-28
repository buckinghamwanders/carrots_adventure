import PatternTileEntry  from './PatternTileEntry.js' 

describe('PatternTileEntry Tests', function() {
	it('PatternTileEntry build', function() {  
		let entry = new PatternTileEntry(1,-1,"pink");
		expect(entry.X()).toBe(1);
		expect(entry.Y()).toBe(-1);
		expect(entry.Tile()).toBe("pink");
	
	});
});
