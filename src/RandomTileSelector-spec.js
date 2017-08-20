import RandomTileSelector  from './RandomTileSelector.js' 

describe('RandomTileSelector', function() {
	it('RandomTimeSelector Create', function() {  
		var selector = new RandomTileSelector();
		selector.addWeight("Tile1", 1.0);
		selector.addWeight("Tile2", 0.0);

   		expect(selector).toBeDefined();
  	});

  	it('RandomTimeSelector Select from 1', function() {  
		var selector = new RandomTileSelector();
		selector.addWeight("Tile1", 1.0);
		selector.addWeight("Tile2", 0.0);

   		expect(selector.selectLabel()).toBe("Tile1");
  	});


  	it('RandomTimeSelector Select  2nd', function() {  
		var selector = new RandomTileSelector();
		selector.addWeight("Tile1", 0.0);
		selector.addWeight("Tile2", 1.0);

   		expect(selector.selectLabel()).toBe("Tile2");
  	});
});