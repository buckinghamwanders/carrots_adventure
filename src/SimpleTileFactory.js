import LocationRegistry from './LocationRegistry.js'

export default class SimpleTileFactory {

	constructor(tileUpdater,locationSelector,tileWorld)
	{
		this._tileUpdater = tileUpdater;
		this._locationSelector = locationSelector;
		this.tileWorld = tileWorld;
	}

	determineBestFreeLocation(globalOffset)
	{
		var localTileLoc = this.tileWorld.Registry().findBestOpen(this._locationSelector(globalOffset));
		var globalTileLoc = this.tileWorld.Registry().calculateAGlobalSpot(localTileLoc,this.tileWorld.screenWidthToGridWidth(globalOffset));
		var gridLoc = this.tileWorld.gridToScreenXY(globalTileLoc);

		return gridLoc;
	}

	clear()
	{
		this._tileUpdater.clear();
		this.tileWorld.clear();
	}

	reset(tiles,screenOffset,globalOffset)
	{
		//for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
		while (tiles.length > 0)
		{
			//tiles[tileIdx].x += offset;//worldWidth;
			//tiles[tileIdx].y = 0;
			//tiles[tileIdx].color("FF00FF")
			var tile = tiles.pop();
			var newLoc = this.determineBestFreeLocation(globalOffset);
			Crafty.log("BestLocation is ."+newLoc.x+" , "+newLoc.y);
			//newloc is in global space, need to apply the shift over
			tile.x = newLoc.x - screenOffset;
			tile.y = newLoc.y;


			var tileLocation = {x:tile.x,y:tile.y};
			var gridLocation = this.tileWorld.screenXYToGrid(newLoc);
			var claimValue = tile.getId();
			/*********
			var changeFunctions = Object.keys(tileMaker);
			var totalWeight = Object.values(tileMaker).map(function(t) { return t.weight();}).reduce(function(w,t) {return w+t;},0);
			var indexWeight = Math.random() * totalWeight;
			var index = (Math.floor(changeFunctions.length * Math.random())) % changeFunctions.length;
			var claimValue = tile.getId();

			//Debug this needs to be removed is test of code
			for (var i = 0; i < changeFunctions.length;i++)
			{
				indexWeight -= tileMaker[changeFunctions[i]].weight();
				if (indexWeight <= 0)
				{
					index = i;
					break;
				}
			}
			**********/

			if (this.tileWorld.Registry().IsClaimed(gridLocation))
			{
				Crafty.log("Why is the tile claimed before reset.");
				var locIdx = this.tileWorld.Registry().FindLocation(gridLocation);
				Crafty.log(" Location index is: "+locIdx);
				var claimer = this.tileWorld.Registry().ClaimData(gridLocation);
				Crafty.log(" Claimer is: "+claimer);
				var claimerXY = {x:Crafty(claimer).x,y:Crafty(claimer).y};
				Crafty.log(" Claimer Loc is: "+claimerXY);
			}	

			this.tileWorld.Registry().Claim(gridLocation,claimValue);
			if (!this.tileWorld.Registry().IsClaimed(gridLocation))
				 Crafty.log("Why is the tile not claimed after reset.");
			
			//what other context does this need to be done.
			var cFunc = this._tileUpdater.buildFunction(gridLocation);//tileMaker[changeFunctions[index]].build;
			cFunc(tile);
			Crafty.log("Reseting Tile to "+" Loc: "+tile.x+" , "+tile.y);
		}
	}
	

			
}


