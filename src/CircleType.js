export default class CircleType {
	static toCrafty() {
		Crafty.c("Circle", {
				    Circle: function(radius, color) {
				        this.radius = radius;
				        this.w = this.h = radius * 2;
				        this.color = color || "#000000";
        				this.bind("Draw", this.sdraw); 
				        return this;
				    },
				    CircleColor: function( color) {
				        this.color = color || "#000000";
        				return this;
				    },
    
				    sdraw: function( drawVars) {
				       //ctx.save();
				       drawVars.ctx.fillStyle = this.color;
				       drawVars.ctx.beginPath();
				       drawVars.ctx.arc(
				           drawVars.pos._x + drawVars.pos._w/2,
				           drawVars.pos._y + drawVars.pos._h/2,
				           drawVars.pos._w/2,
				           0,
				           Math.PI * 2
				       );
				       drawVars.ctx.closePath();
				       drawVars.ctx.fill();
				    }
				});
	}
}
