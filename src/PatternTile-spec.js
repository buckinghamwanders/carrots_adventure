import PatternTile from './PatternTile.js' 
import PatternTileEntry from './PatternTileEntry.js';
import DefaultPatternLibrary from './DefaultPatternLibrary.js';

describe('PatternTile Build Tests', function() {
	it('PatternTile build', function() {  
		let pattern = new PatternTile([PatternTile.e(1,-1,"pink"),PatternTile.e(1,0,"green")]);
	
		expect(pattern.entry(0).X()).toBe(1);
		expect(pattern.entry(0).Y()).toBe(-1);
		expect(pattern.entry(1).Y()).toBe(0);
		expect(pattern.entry(0).Tile()).toBe("pink");
		expect(pattern.entry(1).Tile()).toBe("green");
	});

	it('PatternTile default', function() {  
		let pattern = DefaultPatternLibrary.build()[0];
	
		expect(pattern.entry(0).X()).toBe(0);
		expect(pattern.entry(0).Y()).toBe(0);
		expect(pattern.entry(1).Y()).toBe(1);
		expect(pattern.entry(0).Tile()).toBe("pinkTile");
		expect(pattern.entry(1).Tile()).toBe("blueTile");
	});

	it('PatternTile build', function() {  
		let pattern = new PatternTile([PatternTile.e(1,-1,"pink"),PatternTile.e(1,0,"green")]);
	
		let ret = pattern.buildPattern({x:10,y:10});
		expect(ret.length).toBe(2);
		
	});
});
