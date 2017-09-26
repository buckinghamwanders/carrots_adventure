import PatternTileSelector  from './PatternTileSelector.js' 
import RotationSelector from './RotationSelector.js'
import PatternTile from './PatternTile.js';
import DefaultPatternLibrary from './DefaultPatternLibrary.js';

describe('PatternTileSelector', function() {
	it('PatternTileSelector Create', function() {  
		var selector = new PatternTileSelector(new RotationSelector(DefaultPatternLibrary.build()));
		
   		expect(selector).toBeDefined();
  	});
	
	it('PatterTileSelector calcXYString', function() {  
		var selector = new PatternTileSelector(new RotationSelector(DefaultPatternLibrary.build()));
		
   		expect(selector.calcXYString(1,2)).toBe("1_2");
  	});

  	it('PatternTileSelector calcLocationString', function() {  
		var selector = new PatternTileSelector(new RotationSelector(DefaultPatternLibrary.build()));
		
   		expect(selector.calcLocationString({x:1, y:2})).toBe("1_2");
  	});

	it('PatternTileSelector preselected false', function() {  
		var selector = new PatternTileSelector(new RotationSelector(DefaultPatternLibrary.build()));
		
   		expect(selector.preselectedTile({x:1, y:2})).toBe(false);
  	});
  	
  	it('PatternTileSelector preselected true', function() {  
		let selector = new PatternTileSelector(new RotationSelector(DefaultPatternLibrary.build()));
		let location = {x:1, y:2};
  		selector.registerLocation(location.x,location.y,"PINK","TESTER_PATTERN");
   		expect(selector.preselectedTile(location)).toBe(true);
  	});

  	it('PatternTileSelector configure true', function() {  
		let selector = new PatternTileSelector(new RotationSelector(DefaultPatternLibrary.build()));
		let location = {x:1, y:2};
  		selector.configureNewPattern(location);
   		expect(selector.preselectedTile(location)).toBe(true);
   		location = {x:2, y:2};
   		expect(selector.preselectedTile(location)).toBe(true);
   		location = {x:1, y:3};
   		expect(selector.preselectedTile(location)).toBe(true);
   		location = {x:2, y:3};
   		expect(selector.preselectedTile(location)).toBe(true);
   		location = {x:1, y:0};
   		expect(selector.preselectedTile(location)).toBe(false);
  	});

  	it('PatternTileSelector configure true', function() {  
		let selector = new PatternTileSelector(new RotationSelector(DefaultPatternLibrary.build()));
		let location = {x:1, y:2};
  		selector.configureNewPattern(location);
   		expect(selector.preselectedTile(location)).toBe(true);
   		location = {x:2, y:2};
   		expect(selector.preselectedTile(location)).toBe(true);
   		location = {x:1, y:3};
   		expect(selector.preselectedTile(location)).toBe(true);
   		location = {x:2, y:3};
   		expect(selector.preselectedTile(location)).toBe(true);
   		location = {x:1, y:0};
   		expect(selector.preselectedTile(location)).toBe(false);
  	});

  	it('PatternTileSelector select', function() {  
		let selector = new PatternTileSelector(new RotationSelector(DefaultPatternLibrary.build()));
		let location = {x:1, y:2};
  		
   		expect(selector.selectLabel(location).tile).toBe("pinkTile");
   		expect(selector.preselectedTile(location)).toBe(false);
   		location = {x:2, y:2};
   		expect(selector.selectLabel(location).tile).toBe("blueTile");
   		expect(selector.preselectedTile(location)).toBe(false);
   		location = {x:1, y:3};
   		expect(selector.selectLabel(location).tile).toBe("blueTile");
   		expect(selector.preselectedTile(location)).toBe(false);
   		location = {x:2, y:3};
   		expect(selector.selectLabel(location).tile).toBe("pinkTile");
   		expect(selector.preselectedTile(location)).toBe(false);
   		location = {x:1, y:0};
   		expect(selector.selectLabel(location).tile).toBe("greenTile");
   		expect(selector.preselectedTile(location)).toBe(false);
   		
  	});


  	
});