/**

Default Tile Actions

**/

export default class TileActionLibrary {

	forceBounce() {
		return {
					apply:function(mover,tile) {
						mover.trigger("CarrotBounce");
					}
		}
	};

	carrotColor() {
		return { 
			apply: function(mover,tile) {
			//	mover.color("FFAAAA");
			}
		}
	}
				
	death() {

			return {
					apply:function(mover,tile) {
						Crafty.log("Death");
						Crafty.trigger("ResetWorld");
						mover.resetMover();
					}
				}
	};

	victory(){

	 return {
			apply:function(mover,tile) {
				Crafty.log("Victory");
				Crafty.trigger("Victory");
			}
		}
	};
				
	quickTime (delay)
	{
		return {
			 apply:function(mover,tile) {
				 Crafty.log("Trying to quickTime jump");
				 Crafty.e("MoveCoordinator").startMoveClock(mover,delay);
			}
		}
	};
	momentum()
	{
		return {
			apply:function(mover,tile) {
				Crafty.log("Pre Entry momentum: "+mover.getPower());
				mover.processEntry(tile);
				Crafty.log("Post Entry momentum: "+mover.getPower());
			}
		}
	}
}