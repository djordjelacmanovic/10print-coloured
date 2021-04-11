import { Tile } from './tile';

export class Grid {
  constructor(width, height, tileSize = 10, p5) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this._p5 = p5;
    this._grid = {};
    this._init();
    this._colour();
  }
  
  get(x, y){
    return this._grid[this._key(x,y)];
  }
  
  get tiles(){
    return Object.values(this._grid);
  }

  _init(){
    for(let x = 0; x < this.width; x += this.tileSize)
      for(let y = 0; y < this.height; y += this.tileSize)
        this._grid[this._key(x,y)] = new Tile(this._p5, {x, y}, this);

    for(let tile of this.tiles)
      tile.initTriangles();
  }

  _colour(){
    for(let tile of this.tiles){
      tile.fillColour();
    }
  }
  
  _key(x, y){
    return `${x}|${y}`;
  }
}
