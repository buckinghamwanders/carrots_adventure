import RotationSelector from './RotationSelector.js' 

describe('RotationSelector Rotate Tests', function() {
	it('RotationSelector build', function() {  
		let selector = new RotationSelector([0,1,2,3]);
	
		expect(selector.select(0)).toBe(0);
		expect(selector.select(0)).toBe(1);
		expect(selector.select(0)).toBe(2);
		expect(selector.select(0)).toBe(3);
		expect(selector.select(0)).toBe(0);
		
	});
});