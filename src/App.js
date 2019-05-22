import React, { Component } from 'react';
import './App.css';
import  Tile from './subcomponents/tile.js';




class App extends Component {
  constructor(props){
    super(props);
    this.nums = [
      [{val: 4, merged: 0},{val: -1, merged: 0},{val: -1, merged: 0},{val: 4, merged: 0}],
      [{val: -1, merged: 0},{val: -1, merged: 0},{val: -1, merged: 0},{val: -1, merged: 0}],
      [{val: -1, merged: 0},{val: -1, merged: 0},{val: -1, merged: 0},{val: -1, merged: 0}],
      [{val: -1, merged: 0},{val: -1, merged: 0},{val: 4, merged: 0},{val: -1, merged: 0}]
    ]
    this.prev = JSON.stringify(this.nums);
    this.score = this.Calcscore();
    this.readKey = this.readKey.bind(this);
    this.revertBoard = this.revertBoard.bind(this);
    document.onkeydown = this.readKey;
  }

  readKey(e){
    e = e || window.event;
    var code = e.keyCode;
    switch(code){
      case 38:
        this.shiftUp();
        console.log("up");
        break;
      case 40:
        this.shiftDown();
        console.log("down");
        break;
      case 37:
        this.shiftLeft();
        console.log("left");
        break;
      case 39:
        this.shiftRight();
        console.log("right");
        break;
      default:
        break;
    }
    if(code === 38 || code === 40 || code === 37 || code === 39){
      e.preventDefault();
      if(this.checkFull() === 0 && this.prev !== JSON.stringify(this.nums)){
        this.randomAdd();
      }
      this.score = this.Calcscore();
      this.forceUpdate();
      this.prev = JSON.stringify(this.nums);
    }
    
    
  }

  revertBoard(){
    //console.log("revert");
    this.nums = [
      [{val: 4, merged: 0},{val: 4, merged: 0},{val: 8, merged: 0},{val: 16 , merged: 0}],
      [{val: -1, merged: 0},{val: -1, merged: 0},{val: -1, merged: 0},{val: -1, merged: 0}],
      [{val: -1, merged: 0},{val: -1, merged: 0},{val: -1, merged: 0},{val: -1, merged: 0}],
      [{val: -1, merged: 0},{val: -1, merged: 0},{val: 4, merged: 0},{val: -1, merged: 0}]
    ]
    this.forceUpdate();
  }

  populateBoard(){
   var  list = []
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(this.nums[i][j].val !== -1){
          list.push(<Tile number={this.nums[i][j].val} x={j+1} y={i+1}/>);
        }
      }
    }
    return list;
  }

  checkFull(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(this.nums[i][j].val === -1){
          return 0;
        }
      }
    }
    return 1;
  }

  resertMerge(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        this.nums[i][j].merged = 0;
      }
    }
  }

  Calcscore(){
    var score = 0;
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(this.nums[i][j].val !== -1)
        score += this.nums[i][j].val;
      }
    }
    return score;
  }

  randomAdd(){
    //console.log("random added");
    var x = Math.floor(4*Math.random());
    var y = Math.floor(4*Math.random());
    if(this.nums[y][x].val !== -1){
      this.randomAdd();
      return;
    }
    this.nums[y][x].val = (Math.floor(2*Math.random()) === 1 ? 2:4);
    this.nums[y][x].merged = 0;
  }

  shiftUp(){
    var move;
    for(var i = 0; i < 4; i++){
      move = 0;
      for(var j = 0; j < 4; j++){
        if(this.nums[j][i].val !== -1){
          this.nums[move][i] = this.nums[j][i];
          if(move !== j){
            this.nums[j][i]= {val: -1, merged:0};
          }
          move++;
        }
      }
    }
  }

  shiftDown(){
    var move;
    for(var i = 0; i < 4; i++){
      move = 3;
      for(var j = 3; j >= 0; j--){
        if(this.nums[j][i].val !== -1){
          this.nums[move][i] = this.nums[j][i];
          if(move !== j){
            this.nums[j][i] = {val: -1, merged:0};
          }
          move--;
        }
      }
    }
  }

  shiftLeft(){
    var move;
    for(var i = 0; i < 4; i++){
      move = 0;
      for(var j = 0; j < 4; j++){
        if(this.nums[i][j].val !== -1){
          this.nums[i][move] = this.nums[i][j];
          if(move !== j){
            this.nums[i][j] = {val: -1, merged:0};
          }
          move++;
        }
      }
      for(var j = 0; j < 3; j++){
        if(this.nums[i][j].val === this.nums[i][j+1].val && this.nums[i][j].val !== -1){
          this.nums[i][j].val = 2*this.nums[i][j].val;
          this.nums[i][j+1] = {val: -1, merged:0};
        } else if(this.nums[i][j].val === -1){
          this.nums[i][j] = this.nums[i][j+1];
          this.nums[i][j+1] = {val: -1, merged:0};
        }
      }
    }
  }

  shiftRight(){
    var move;
    for(var i = 0; i < 4; i++){
      move = 3;
      for(var j = 3; j >= 0; j--){
        if(this.nums[i][j].val !== -1){
          this.nums[i][move] = this.nums[i][j];
          if(move !== j){
            this.nums[i][j] = {val: -1, merged:0};
          }
          move--;
        }
      }
      for(var j = 3; j > 0; j--){
        if(this.nums[i][j].val === this.nums[i][j-1].val && this.nums[i][j].val !== -1){
          this.nums[i][j].val = 2*this.nums[i][j].val;
          this.nums[i][j-1] = {val: -1, merged:0};
        } else if(this.nums[i][j].val === -1){
          this.nums[i][j] = this.nums[i][j-1];
          this.nums[i][j-1] = {val: -1, merged:0};
        }
      }
    }
  }

  render() {   
    var list = this.populateBoard();
    return (
      <div className="App" onKeyDown={this.readKey}>
        <div id="grid">
          {list}
        </div>
        <p id="revert" onClick={this.revertBoard}>Reset</p>
        <p id="scoreboard">score: {this.score}</p>
      </div>
    );
  }
}

export default App;
