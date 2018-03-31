
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
		this._minFactorySupply = tileWorld.numRows ;
		this._freeQueue = [];
		this._worldPixelSize = stageScreenSize;
				
		
	}

	clear()
	{
		this._freeQueue = [];
		this._totalShift = 0;
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
		Crafty.log("Stage Reset shiftX:"+shiftX);
		
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
				
					let gridxy = this._tileWorld.screenXYToGrid({x:el._x+this._totalShift,y:el._y});
					Crafty.log(" Release gridLoc "+gridxy.x+" , "+gridxy.y);
					//removers.push(el);
					this._tileWorld.Registry().Release(gridxy);
					this._freeQueue.push(el);
				}
			}
			

		}
		var currentGridShift = this._tileWorld.screenXYToGrid({x:this._totalShift,y:0});
		let screenEdge = this._totalShift;
		this._totalShift += -shiftX;
		var newGridShift = this._tileWorld.screenXYToGrid({x:this._totalShift,y:0});
		if (this._freeQueue.length >  this._minFactorySupply)
		{
			this._factory.reset(this._freeQueue,screenEdge,this._totalShift);
		}
		for (var elIdx = 0; elIdx < elements.length; elIdx++)
		{
			var el = elements[elIdx];
			//Crafty.log("Stage Offset Carrots :"+el.x+" y: "+el.y+" viewPort.x "+Crafty.viewport.x);
			
			{
				//el.shift(shiftX,0,0,0);
				if (this._freeQueue.every(function(anEl) {
					return el.getId() != anEl.getId()
				}))
				{
					if (shiftX < 0)
						el.tween({x:el._x + shiftX,y:el._y}, 8 * Math.abs(shiftX));
				}
				//el.trigger("Invalidate");
				//el.y = el.y + offset.y;
				//Crafty.log(" Update Offset Carrots :"+el.x+" y: "+el.y);
			}

		}
	}

	findMinX(){
		var aRabbit = Crafty("Rabbit").get(0);
		
		//return rabbit.x - 200;
		var ret = 0;
	    if (aRabbit.x > 300)
	    {
	    	ret =  aRabbit.x - 300;
	    }
	    return ret;
	}

	calculateShift() {
		var aRabbit = Crafty("Rabbit").get(0);

		Crafty.log("Rabbit Location: x "+aRabbit.x);
		
		var ret = 0;
	    if (aRabbit.x > 300)
	    {
	    	ret = 300 - aRabbit.x;
	    }
	    return ret;
	}

	ShiftAndClean (offset) {
			
			
			Crafty.log("Stage Offset x:"+offset.x+" y: "+offset.y);
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

