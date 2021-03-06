import React from 'react';
import { withRouter } from 'react-router-dom';

class Animation extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
      }
      componentDidUpdate() {
        const {angle} = this.props;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.save();
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(width/2, height/2 );
        ctx.rotate(angle * Math.PI / 180);
        ctx.fillStyle = '#DC143C';
        ctx.fillRect(-width/4, -height/4, width/2, height/2);
        ctx.restore();
      }
      render() {
        return <canvas width="50" height="50" ref={this.canvasRef}></canvas>;
      }
    }
export default withRouter(Animation);
  
