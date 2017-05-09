			export default class MoveCountdownEtry {
				constructor(cTime)
				{
					this.triggerTime = cTime;
					this.paused = true;
					this.countDown = this.triggerTime;
				}
				
				tick(delta)
				{
					if (!this.paused)
					{
						this.countDown = this.countDown - delta;
					}
							
				}
				
				set paused(isPaused)
				{
					this.paused = isPaused;
				}
				
				get paused() {
					return this.paused;
				}
				
				
				reset()
				{
					this.countDown = this.triggerTime;
				}
				
				
			}