import React, {Component} from 'react';
// Import style sheets
import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      isVisited,
      isShortestPath,
      isAnimated,
    } = this.props;
    // Add start/end node classes to appropriate nodes
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : '';
    // Add non-animation classes based on is* toggles
    const visitedClass =
      isVisited && isAnimated === false ? 'node-visited' : '';
    const pathClass =
      isShortestPath && isAnimated === false ? 'node-shortest-path' : '';
    const wallClass = isWall && isAnimated === false ? 'node-wall' : '';
    return (
      <div
        className={[
          'node',
          extraClassName,
          visitedClass,
          pathClass,
          wallClass,
        ].join(' ')}
        onMouseDown={e => onMouseDown(e, row, col, isStart, isFinish)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}
