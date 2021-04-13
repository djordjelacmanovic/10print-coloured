import { TopLeftCornerTriangle, TopRightCornerTriangle, BottomLeftCornerTriangle, BottomRightCornerTriangle } from './triangle';

export { buildTile };

// could be a separate Abstract Factory
const buildTile = (p5, position, grid, orientation = p5.random([Tile.Orientation.FWD, Tile.Orientation.BCK])) => {
  let klass = orientation == Tile.Orientation.FWD ? ForwardTile : BackwardTile;
  return new klass(p5, position, grid);
}


class Tile {
  static get Orientation() {
    return {
      FWD: 'forward',
      BCK: 'backward'
    };
  }
    
  constructor(p5, position, grid) {
    this._p5 = p5;
    this._position = position;
    this.grid = grid;
  }

  get x(){
    return this._position.x;
  }

  get y(){
    return this._position.y;
  }

  draw(){
    this._drawTriangles();
    this._drawLine();
  }

  initTriangles(){
    this.leftTriangle.left = this.leftTile && this.leftTile.rightTriangle;
    this.leftTriangle.top = this.topTile && this.topTile.bottomTriangle;
    this.leftTriangle.bottom = this.bottomTile && this.bottomTile.topTriangle;
    this.rightTriangle.right = this.rightTile && this.rightTile.leftTriangle;
    this.rightTriangle.top = this.topTile && this.topTile.bottomTriangle;
    this.rightTriangle.bottom = this.bottomTile && this.bottomTile.topTriangle;
  }

  fillColour(){
    this.leftTriangle.fillColour();
    this.rightTriangle.fillColour();
  }

  _drawTriangles(){
    this._drawTriangle(this.leftTriangle);
    this._drawTriangle(this.rightTriangle);
  }

  _drawTriangle(triangle){
    let vertices = this._verticesToP5args(triangle.calculateVertices(this._position, this.size));
    this._p5.push();
    this._p5.strokeWeight(0);
    this._p5.fill(triangle.colour);
    this._p5.triangle(...vertices);
    this._p5.pop();
  }

  _verticesToP5args(vertArray){
    return vertArray.map(({x,y}) => [x, y]).flat();
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

class ForwardTile extends Tile {
  constructor(...args){
    super(...args);

    this.leftTriangle = new TopLeftCornerTriangle(this._p5);
    this.rightTriangle = new BottomRightCornerTriangle(this._p5);
  }

  get topTriangle(){
    return this.leftTriangle;
  }

  get bottomTriangle(){
    return this.rightTriangle;
  }

  _drawLine(){
    this._p5.line(this.x, this.y + this.size, this.x + this.size, this.y);
  }
}

class BackwardTile extends Tile {
  constructor(...args){
    super(...args);

    this.leftTriangle = new BottomLeftCornerTriangle(this._p5);
    this.rightTriangle = new TopRightCornerTriangle(this._p5);
  }

  get topTriangle(){
    return this.rightTriangle;
  }

  get bottomTriangle(){
    return this.leftTriangle;
  }

  _drawLine(){
    this._p5.line(this.x, this.y, this.x + this.size, this.y + this.size);
  }
}
