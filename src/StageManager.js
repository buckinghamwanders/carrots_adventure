import LocationRegistry from './LocationRegistry.js'
export default class StageManager {

	/**
		Shifts the world, cleans
	**/

	constructor(stageSize, elementArchitect, elementFactory)
	{
		this._size = stageSize;
		this._architect = elementArchitect;
		this._factory = elementFactory;
		this._registry = new LocationRegistry(this._size.x,this._size.y);
	}

	ShiftAndClean (offset) {
			
			
			//Crafty.log("Stage Offset x:"+offset.x+" y: "+offset.y);
			//Crafty.log("Stage Rect x:"+Crafty.viewport.bounds.min.x+" y: "+Crafty.viewport.bounds.min.y);
			
			var elements = Crafty("WorldElement").get();
			var removers = [];
			for (var elIdx = 0; elIdx < elements.length; elIdx++)
			{
				var el = elements[elIdx];
				//Crafty.log("Stage Offset Carrots :"+el.x+" y: "+el.y+" viewPort.x "+Crafty.viewport.x);
				//if (el._x  + Crafty.viewport._x < 0)
				if (unneeded(el))
				{
					Crafty.log("  Remove Offset Carrots :"+el.x+" y: "+el.y);
					
					removers.push(el);
				}
				{
					el.x = el.x +offset.x;
					//el.y = el.y + offset.y;
					//Crafty.log(" Update Offset Carrots :"+el.x+" y: "+el.y);
				}
			}
			removeUnneeded(removers); //- removes the elements
			addNewElements(); //- This fills in remove the remover class
			
			
		}
	

	unneeded(element)
	{
		return false;
	}

	removeUnneeded(removedEls)
	{

	}

	addNewElements()
	{

	}


}