export let stageManager = null;
let tiles = null;
let tileWidth = 0;
let tileHeight = 0;
let table = null;
let transitions = null;
let patternLibrary = null;
export const POWER_RATE_PER_SECOND = 2;

export const CENTER_TIME = 500;
			
export class CarrotGame {
	static setStageManager(sManager)
	{
		stageManager = sManager;
	}

	static StageManager()
	{
		return stageManager;
	}

	static setTile(aTiles)
	{
		tiles = aTiles;
	}

	static Tiles()
	{
		return tiles;
	}

	static findTile(locXY)
			{
  				var tiles = Crafty("Tile").get();
  				var ret;
				var found = 0;
  				for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
  				{

  					if (tiles[tileIdx].contains(locXY))
  					{
						ret = tiles[tileIdx];
						found = found +1;
						//break;
  					}
  				}
				Crafty.log("Found Tiles: "+found);
				return ret;
			}

	static setTileWidth(width)
	{
		tileWidth = width;
	}

	static getTileWidth()
	{
		return tileWidth;
	}

	static setTileHeight(height)
	{
		tileHeight = height;
	}

	static getTileHeight()
	{
		return tileHeight;
	}

	static setTable(aTable)
	{
		table = aTable;
	}

	static Table()
	{
		return table;
	}

	static setTransitions(trans)
	{
		transitions = trans;
	}

	static Transitions()
	{
		return transitions;
	}

	static setPatternLibrary(patLibrary)
	{
		patternLibrary = patLibrary;
	}

	static PatternLibrary()
	{
		return patternLibrary;
	}

}