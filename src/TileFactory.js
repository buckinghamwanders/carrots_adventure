export default class TileFactory {
	constructor()
	{
		
	}

	//todo - verify the api.
	//need to have the world
	reset(tiles,offset,world)
	{
		var ends = world.findEndPoints();
		var segments = generateSegmentList;

		buildSegments(segments,tiles,ends);
	}

	//list of segments of segments - generator really
	//tiles to place, or should it be an update of types
	//
	buildSegments(segments,tiles,ends)
	{
		if (tiles.isEmpty)
			return;
		[tileUpdates,remainingTiles,remainingEnds]  = buildSegment(segments.top(),tiles,ends);
		
		buildSegments(segments.rest(),remainingTiles,remainingEnds);
	}
}