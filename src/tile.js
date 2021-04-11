import { Triangle } from './triangle';

export class Tile {
  static get Orientation() {
    return {
      FWD: 'forward',
      BCK: 'backward'
    };
  }
  
  constructor(p5, {x, y}, grid, orientation = p5.random([Tile.Orientation.FWD, Tile.Orientation.BCK])) {
    this._p5 = p5;
    this.x = x;
    this.y = y;
    this.grid = grid;
    this.orientation = orientation;
    this.leftTriangle = new Triangle(this._p5);
    this.rightTriangle = new Triangle(this._p5);
  }

  draw(){
    this._drawTriangles();
    this._drawLine();
  }

  initTriangles(){
    this.leftTriangle.left = this.leftTile && this.leftTile.rightTriangle;
    this.leftTriangle.top = this.orientation == Tile.Orientation.FWD 
        ? this.topTile && this.topTile.bottomTriangle
        : null;
    this.leftTriangle.bottom = this.orientation == Tile.Orientation.FWD 
        ? null
        : this.bottomTile && this.bottomTile.topTriangle;
    
    this.rightTriangle.right = this.rightTile && this.rightTile.leftTriangle;
    this.rightTriangle.top = this.orientation == Tile.Orientation.FWD 
      ? null
      : this.topTile && this.topTile.bottomTriangle;
    this.rightTriangle.bottom = this.orientation == Tile.Orientation.FWD 
      ? this.bottomTile && this.bottomTile.topTriangle
      : null;
  }

  fillColour(){
    this.leftTriangle.fillColour();
    this.rightTriangle.fillColour();
  }

  get topTriangle(){
    if(this.orientation == Tile.Orientation.FWD)
      return this.leftTriangle;
    else
      return this.rightTriangle;
  }

  get bottomTriangle(){
    if(this.orientation == Tile.Orientation.FWD)
      return this.rightTriangle;
    else
      return this.leftTriangle;
  }

  _drawTriangles(){
    let { left, right } = this.triangleVertices;

    this._p5.push();
    this._p5.strokeWeight(0);
    this._p5.fill(this.leftTriangle.colour || 'white');
    this._p5.triangle(...left);
    this._p5.fill(this.rightTriangle.colour || 'white');
    this._p5.triangle(...right);
    this._p5.pop();
  }

  _drawLine(){
    if(this.orientation == Tile.Orientation.FWD)
      this._p5.line(this.x, this.y + this.size, this.x + this.size, this.y);
    else 
      this._p5.line(this.x, this.y, this.x + this.size, this.y + this.size);
  }

  get triangleVertices(){
    if(this.orientation == Tile.Orientation.FWD){
      return {
        left: [this.x, this.y, this.x + this.size, this.y, this.x, this.y + this.size],
        right: [this.x, this.y + this.size, this.x + this.size, this.y, this.x + this.size, this.y + this.size]
      }
    } else {
      return {
        left: [this.x, this.y, this.x, this.y + this.size, this.x + this.size, this.y + this.size],
        right: [this.x, this.y, this.x + this.size, this.y, this.x + this.size, this.y + this.size]
      }
    }
  }

  get leftTile(){
    return this.grid.get(this.x - this.size, this.y);
  }

  get rightTile(){
    return this.grid.get(this.x + this.size, this.y);
  }

  get topTile(){
    return this.grid.get(this.x, this.y - this.size);
  }

  get bottomTile(){
    return this.grid.get(this.x, this.y + this.size);
  }
  
  get size(){
    return this.grid.tileSize;
  }
}
