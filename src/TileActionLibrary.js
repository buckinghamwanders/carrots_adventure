/**

Default Tile Actions

**/

export default class TileActionLibrary {

	forceBounce() {
		return {
					apply:function(mover) {
						mover.trigger("CarrotBounce");
					}
		}
	};
				
	death() {

			return {
					apply:function(mover) {
						Crafty.log("Death");
						Crafty.trigger("ResetWorld");
					}
				}
	};

	victory(){

	 return {
			apply:function(mover) {
				Crafty.log("Victory");
				Crafty.trigger("Victory");
			}
		}
	};
				
	quickTime (delay)
	{
		return {
			 apply:function(mover) {
				 Crafty.log("Trying to quickTime jump");
				 Crafty.e("MoveCoordinator").startMoveClock(mover,delay);
			}
		}
	}
}