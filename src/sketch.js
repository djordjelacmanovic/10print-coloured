import p5 from 'p5';
import { Grid } from './grid';

const defaultTileSize = 10;

export class Sketch {
  constructor(width = window.innerWidth, height = window.innerHeight, tileSize = defaultTileSize){
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;

    this._p5 = new p5(s => {
      s.setup = () => this._setup();
      s.draw = () => this._draw();
    });
  }

  _setup(){
    this._p5.createCanvas(this.width, this.height);
    this._p5.noLoop();
    this._grid = new Grid(this.width, this.height, this.tileSize, this._p5);
  }

  _draw(){
    for(let tile of this._grid.tiles)
      tile.draw();
  }
}
