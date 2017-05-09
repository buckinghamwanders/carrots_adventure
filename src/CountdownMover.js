export default class CountdownMover {
	constructor(mover)
	{
		this._mover = mover;
	}
		
	//this is a bit of a hack. We're assuming this is called by an object that has a trigger		
	doMove()
	{
		Crafty.log("Performing timed move: "+this._mover);
		this.trigger("CarrotBounce");
	}
				
}