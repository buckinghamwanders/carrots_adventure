import LocationRegistry from './LocationRegistry.js';
import TileWorld from './TileWorld.js';

export default class StageManager {

	/**
		Shifts the world, cleans
	**/

	constructor(tileWorld, elementFactory,stageScreenSize)
	{
		this._totalShift = 0;
		//this._size = stageSize;
		//this._architect = elementArchitect;
		this._factory = elementFactory;
		this._tileWorld = tileWorld;
		this._minFactorySupply = tileWorld.numRows * 4;
		this._freeQueue = [];
		this._worldPixelSize = stageScreenSize;
				
		
	}

	reset(offset) {
		/*var offset = {
			x:Crafty.viewport.x,
			y:Crafty.viewport.y
		}

		var viewport = Crafty.viewport;
		

		Crafty.log("Stage Offset x:"+offset.x+" y: "+offset.y+" offset in tile units "+(offset.x/tileWidth)+" , "+(offset.y/tileHeight));
		//Crafty.log("Stage Rect x:"+Crafty.viewport.bounds.min.x+" y: "+Crafty.viewport.bounds.min.y);
		*/
		
		let elements = Crafty("WorldElement").get();
		let removers = [];
		let minX = this.findMinX();
		let shiftX = this.calculateShift();

		for (var elIdx = 0; elIdx < elements.length; elIdx++)
		{
			var el = elements[elIdx];
			//Crafty.log("Stage Offset Carrots :"+el.x+" y: "+el.y+" viewPort.x "+Crafty.viewport.x);
			if (el.has("Tile") && el._x  < minX)
			{
				if (this._freeQueue.every(function(anEl) {
					return el.getId() != anEl.getId()
				}))
				{
				 	Crafty.log("  Remove Offset Carrots :"+el.x+" y: "+el.y);
				
				
					//removers.push(el);
					this._tileWorld.Registry().Release(this._tileWorld.screenXYToGrid({x:el._x+this._totalShift,y:el._y}));
					this._freeQueue.push(el);
				}
			}
			{
				el.x = el.x +shiftX;
				//el.y = el.y + offset.y;
				//Crafty.log(" Update Offset Carrots :"+el.x+" y: "+el.y);
			}

		}
		var currentGridShift = this._tileWorld.screenXYToGrid({x:this._totalShift,y:0});
		this._totalShift += -shiftX;
		var newGridShift = this._tileWorld.screenXYToGrid({x:this._totalShift,y:0});
		if (this._freeQueue.length >  this._minFactorySupply)
		{
			this._factory.reset(this._freeQueue,this._worldPixelSize.width,this._totalShift);
		}
	}

	findMinX(){
		var rabbit = Crafty("Rabbit").get(0);
		
		return rabbit.x - 200;
	}

	calculateShift() {
		var aRabbit = Crafty("Rabbit").get(0);

		Crafty.log("Rabbit Location: x "+aRabbit.x);
		
		var ret = 0;
	    if (aRabbit.x > 300)
	    {
	    	ret = -50;
	    }
	    return ret;
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