//Library of how move rules. Tiles 
export default class MoveLibrary {
				constructor()
				{
					this._ruleMap =  {};
				}

				appendRule(rule)
				{
					this._ruleMap[rule.name] = rule;
					return this;
				}

				get rules() {
					return this._ruleMap;
				}

				static installDefaultRules(library)
				{

					library.appendRule( {
						name: "Default",
						
						move:function(mover) {
							var jump = 1;
							return {x: Math.cos(Crafty.math.degToRad(mover._rotation) )* mover.tileMoveWidth() *jump, y: Math.sin(Crafty.math.degToRad(mover._rotation) ) * mover.tileMoveWidth() *jump};
						},
						
						//return false if done
						//return true to return
						processMoved:function(mover) {
							var ret = false;
							return ret;
						}
					}).appendRule({
						name:"Power2",
						
						move:function(mover) {
							var jump = Math.floor(2 * mover._power);
							return {x: Math.cos(Crafty.math.degToRad(mover._rotation) )* mover.tileMoveWidth() *jump, y: Math.sin(Crafty.math.degToRad(mover._rotation) ) * mover.tileMoveWidth() *jump};		
						},
						
						//return false if done
						//return true to return
						processMoved:function(mover) {
							var ret = false;
							return ret;
						}
					}).appendRule({
						name:"Momentum",
						
						move:function(mover) {
							var jump = Math.floor(mover.currentHeight());
							return {x: Math.cos(Crafty.math.degToRad(mover._rotation) )* mover.tileMoveWidth() *jump, y: Math.sin(Crafty.math.degToRad(mover._rotation) ) * mover.tileMoveWidth() *jump};		
						},
						
						//return false if done
						//return true to return
						processMoved:function(mover) {
							var ret = false;
							return ret;
						}
					}).appendRule({
						name: "Slide",
						slideCounter: {},
						slideSize: 5,
						move:function(mover) {
							var jump = 1;
							return {x: Math.cos(Crafty.math.degToRad(mover._rotation) )* mover.tileMoveWidth() *jump, y: Math.sin(Crafty.math.degToRad(mover._rotation) ) * mover.tileMoveWidth() *jump};
						},
						
						//return false if done
						//return true to return
						processMoved:function(mover) {
							var id = this.calculateIdString(mover)
							this.updateSlideCount(id);
							var slideLeft = this.slideLength(id)
							
							var ret = slideLeft > 0;
							return ret;
						},
						calculateIdString: function(mover) {return mover.getId();},
						updateSlideCount: function(id) {
							if ((! this.slideCounter.hasOwnProperty (id)) || (this.slideCounter[id] <= 0))
						 	{
								this.slideCounter[id] = this.slideSize;
							}
							this.slideCounter[id] = this.slideCounter[id]--;
						},
						slideLength: function(id) {
							return this.slideCounter[id];
						}
						
					});
					return library;
				};
			};
			