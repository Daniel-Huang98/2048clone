import React from "react";
import './../subcomponentCSS/tile.css';

class Tile extends React.Component {
    constructor(props){
        super(props)
        this.number = 91;
    }

    render(){
        return(
        <div className="Tile" style={{gridColumnStart: this.props.x, gridColumnEnd:this.props.x, gridRowStart:this.props.y, gridRowEnd:this.props.y}}>
            <p className="Number">
                {this.props.number}
            </p>
        </div>
        );
    }
}

export default Tile;
