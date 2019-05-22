import React, { Component } from 'react';
import './App.css';
import  Tile from './subcomponents/tile.js';




class App extends Component {
  constructor(props){
    super(props);
    this.nums = [
      [-1,-1,-1,-1],
      [-1,-1,-1,-1],
      [-1,-1,-1,-1],
      [-1,-1,-1,-1]
    ]
    this.prev = [
      [-1,-1,-1,-1],
      [-1,-1,-1,-1],
      [-1,-1,-1,-1],
      [-1,-1,-1,-1]
    ];
    this.readKey = this.readKey.bind(this);
    document.onkeydown = this.readKey;
  }

  readKey(e){
    this.prev = this.nums;
    e = e || window.event;
    e.preventDefault();
    switch(e.keyCode){
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
    if(this.checkFull() === 0){
      this.randomAdd();
    }
    this.forceUpdate();
  }

  revertBoard(){
    this.nums = this.prev;
  }

  populateBoard(){
   var  list = []
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(this.nums[i][j] !== -1){
          list.push(<Tile number={this.nums[i][j]} x={j+1} y={i+1}/>);
        }
      }
    }
    return list;
  }

  checkFull(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(this.nums[i][j] === -1){
          return 0;
        }
      }
    }
    return 1;
  }

  randomAdd(){
    var x = Math.floor(4*Math.random());
    var y = Math.floor(4*Math.random());
    if(this.nums[y][x] !== -1){
      this.randomAdd();
      return;
    }
    this.nums[y][x] = 2;
  }

  shiftarray(array){
    var move = 0;
    for(var i = 0; i < 4; i++){
      if(array[i] !== -1){
        array[move] = array[i];
        if(i !== move){
          array[i] = -1;
        }
        move++;
      }
    }
    return array;
  }

  shiftUp(){
    var move;
    for(var i = 0; i < 4; i++){
      move = 0;
      for(var j = 0; j < 4; j++){
        if(this.nums[j][i] !== -1){
          this.nums[move][i] = this.nums[j][i];
          if(move !== j){
            this.nums[j][i] = -1;
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
        if(this.nums[j][i] !== -1){
          this.nums[move][i] = this.nums[j][i];
          if(move !== j){
            this.nums[j][i] = -1;
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
        if(this.nums[i][j] !== -1){
          this.nums[i][move] = this.nums[i][j];
          if(move !== j){
            this.nums[i][j] = -1;
          }
          move++;
        }
      }
    }
  }

  shiftRight(){
    var move;
    for(var i = 0; i < 4; i++){
      move = 3;
      for(var j = 3; j >= 0; j--){
        if(this.nums[i][j] !== -1){
          this.nums[i][move] = this.nums[i][j];
          if(move !== j){
            this.nums[i][j] = -1;
          }
          move--;
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
        <p id="revert" onClick={this.revertBoard}></p>
      </div>
    );
  }
}

export default App;
