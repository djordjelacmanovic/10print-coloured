export { TopLeftCornerTriangle, TopRightCornerTriangle, BottomLeftCornerTriangle, BottomRightCornerTriangle };

class Triangle {
  static get Colours(){
    return ['#A34C2C', '#F06835', '#29AAF0', '#A3800B', '#F0BF1D', '#8DA83D', '#33F59A'];
  }

  constructor(p5) {
    this._p5 = p5;
  }

  fillColour(){
    if(!this.colour) this.colour = this._p5.random(Triangle.Colours);
  }
}

class RightCornerTriangle extends Triangle {
  fillColour(){
    super.fillColour();

    if(this.right && !this.right.colour){
      this.right.colour = this.colour;
      this.right.fillColour();
    }
  }
}

class LeftCornerTriangle extends Triangle {
  fillColour(){
    super.fillColour();

    if(this.left && !this.left.colour){
      this.left.colour = this.colour;
      this.left.fillColour(); 
    }
  }
}


class TopRightCornerTriangle extends RightCornerTriangle {
  fillColour(){
    super.fillColour();
    if(this.top && !this.top.colour){
      this.top.colour = this.colour;
      this.top.fillColour();
    }
  }

  calculateVertices({x, y}, sideLength) {
    return [{ x, y }, { x: x + sideLength, y }, { x: x + sideLength, y: y + sideLength }]
  }
}

class BottomRightCornerTriangle extends RightCornerTriangle {
  fillColour(){
    super.fillColour();
    
    if(this.bottom && !this.bottom.colour){
      this.bottom.colour = this.colour;
      this.bottom.fillColour();
    }
  }

  calculateVertices({x, y}, sideLength) {
    return [{ x, y: y + sideLength }, { x: x + sideLength, y }, { x: x + sideLength, y: y + sideLength }];
  }
}

class TopLeftCornerTriangle extends LeftCornerTriangle {
  fillColour(){
    super.fillColour();
    if(this.top && !this.top.colour){
      this.top.colour = this.colour;
      this.top.fillColour();
    }
  }

  calculateVertices({x, y}, sideLength) {
    return [{ x, y }, { x: x + sideLength, y }, { x, y: y + sideLength }];
  }
}

class BottomLeftCornerTriangle extends LeftCornerTriangle {
  fillColour(){
    super.fillColour();

    if(this.bottom && !this.bottom.colour){
      this.bottom.colour = this.colour;
      this.bottom.fillColour();
    }
  }

  calculateVertices({x, y}, sideLength){
    return [{x, y}, {x, y: y + sideLength }, { x: x + sideLength, y: y + sideLength}];
  }
}