export class Triangle {
  static get Colours(){
    return ['#A34C2C', '#F06835', '#29AAF0', '#A3800B', '#F0BF1D', '#8DA83D', '#33F59A'];
  }

  constructor(p5) {
    this._p5 = p5;
  }

  fillColour(){
    if(!this.colour) this.colour = this._p5.random(Triangle.Colours);

    if(this.left && !this.left.colour){
      this.left.colour = this.colour;
      this.left.fillColour(); 
    }

    if(this.right && !this.right.colour){
      this.right.colour = this.colour;
      this.right.fillColour();
    }

    if(this.top && !this.top.colour){
      this.top.colour = this.colour;
      this.top.fillColour();
    }

    if(this.bottom && !this.bottom.colour){
      this.bottom.colour = this.colour;
      this.bottom.fillColour();
    }
  }
}