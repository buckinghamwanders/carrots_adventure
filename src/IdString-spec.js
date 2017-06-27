
import IdString  from './IdString.js' 

describe('IdString Operations Tests', function() {
	var id1;
  it('Creates a simple IdString', function() {
   id1 = new IdString(1);
   	expect(id1).toBeDefined();
  });

  it('Creates sets id', function() {
    id1 = new IdString(1);
    
   	expect(id1.Id()).toBe("1");
  });

   it('Creates resets id', function() {
    id1 = new IdString(1);
    id1.resetId(2);
   	expect(id1.Id()).toBe("2");
  });

  it('Appends id', function() {
    id1 = new IdString(1);
    id1.appendParent(2);
   	expect(id1.Id()).toBe("2.1");
  });

  it('Compare  ids', function() {
    id1 = new IdString(1);
    id1.appendParent(2);

    var id2 = new IdString(3);
    id2.appendParent(2);
   	expect(id1.compareId(id2)).toBe(0);
  });

   it('Compare  ids longer', function() {
    id1 = new IdString(1);
    id1.appendParent(2);
    id1.appendParent(3);
    var id2 = new IdString(3);
    id2.appendParent(2);
    id2.appendParent(3);
   	expect(id1.compareId(id2)).toBe(1);
  });

   it('Compare  ids longest', function() {
    id1 = new IdString(1);
    id1.appendParent(2);
    id1.appendParent(3);
    var id2 = new IdString(1);
    id2.appendParent(2);
    id2.appendParent(3);
   	expect(id1.compareId(id2)).toBe(2);
  });

	it('Compare  ids no match', function() {
	    id1 = new IdString(1);
	    id1.appendParent(2);
	    id1.appendParent(3);
	    var id2 = new IdString(1);
	    id2.appendParent(2);
	    id2.appendParent(4);
	   	expect(id1.compareId(id2)).toBe(-1);
	  });


    
    

});