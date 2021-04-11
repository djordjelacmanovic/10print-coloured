import p5 from 'p5';
import { Grid } from './grid';

const defaultTileSize = 15;

const roundToMultipleOf = (num, div) => Math.round(num / div) * div;

export class Sketch {
  constructor(
      width = roundToMultipleOf(window.innerWidth, defaultTileSize), 
      height = roundToMultipleOf(window.innerHeight, defaultTileSize), 
      tileSize = defaultTileSize
    ){
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
    this._initControls();
    this._initGrid();
  }

  _draw(){
    this._p5.background('white')
    for(let tile of this._grid.tiles)
      tile.draw();

    this._buttonsDiv.position(0, 0);
    this._buttonsDiv.center('horizontal');
  }

  _initControls(){

    this._buttonsDiv = this._p5.createDiv();

    this._regenerateButton = this._p5.createButton('Regenerate');
    this._regenerateButton.mousePressed(() => {
      this._initGrid();
      this._p5.redraw();
    });

    this._saveButton = this._p5.createButton('Save');
    this._saveButton.mousePressed(() => this._p5.saveCanvas("10print-coloured.png"));
    
    this._saveButton.parent(this._buttonsDiv);
    this._regenerateButton.parent(this._buttonsDiv);
  }

  _initGrid(){
    this._grid = new Grid(this.width, this.height, this.tileSize, this._p5);
  }
}
