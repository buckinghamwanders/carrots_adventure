import DefaultTileLibrary  from './DefaultTileLibrary.js' 

describe('DefaultTileLibrary', function() {
	it('DefaultTileLibrary Create', function() {  
		var library = DefaultTileLibrary.build();
		
   		expect(library).toBeDefined();
  	});
	
	it('DefaultTileLibrary Pink', function() {  
		var library = DefaultTileLibrary.build();
		
   		expect(library.tile("pinkTile").weight()).toBe(1.0);
  	});

  	
});