// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.

class PriorityQueue {
  constructor() {
    this.arr = [];
  }
  enqueue(node) {
    var added = false;
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].fcost > node.fcost) {
        this.arr.splice(i, 0, node);
        added = true;
        break;
      }
    }
    if (!added) this.arr.push(node);
  }
  dequeue() {
    if (this.isEmpty()) return;
    return this.arr.shift();
  }
  front() {
    if (this.isEmpty()) return;
    return this.arr[0];
  }
  rear() {
    if (this.isEmpty()) return;
    return this.arr[this.arr.length - 1];
  }
  isEmpty() {
    return this.arr.length === 0;
  }
  find(node) {
    return this.arr.includes(node);
  }
}
// Exported A* Search Algorithm function, returns nodes visited order and shortest path order of nodes
export function aStarAlgorithm(grid, animations, startNode, endNode) {
  let visitedOrder = aStar(grid, animations, startNode, endNode);
  let nodesInShortestPathOrder = findShortestPath(endNode);
  return [visitedOrder, nodesInShortestPathOrder];
}
// A* Search algorithm, finds the shortest path from startNode to endNode
function aStar(grid, animations, startNode, endNode) {
  // Initialize priority queue
  let OPEN = new PriorityQueue();
  // Set initial values of A* search variables for startNode, enqueue afterwards
  startNode.gcost = 0;
  startNode.hcost = calcHVal(startNode, endNode);
  startNode.fcost = startNode.hcost;
  OPEN.enqueue(startNode);
  // Initialize an array tracking the nodes visited order
  let visitedOrder = [];
  // While the OPEN set is not empty, do...
  while (!OPEN.isEmpty()) {
      //Find node with the least f cost in the Open List
      let current = OPEN.dequeue();
      // Add current node to the Closed List
      current.isVisited = true;
      if(animations) current.isAnimated = true;
      visitedOrder.push(current);
      // Path has been found to endNode
      if(current === endNode) {
            return visitedOrder;
      }
      // Grab the unvisited neighbors of current
      let neighbors = getNeighbors(current, grid);
      // For each of the unvisited neighbors of current
      for(let neighbor of neighbors) {
            let tempG = current.gcost + 1;
            if(tempG < neighbor.gcost) {
                  neighbor.previousNode = current;
                  neighbor.gcost = tempG;
                  neighbor.hcost = calcHVal(neighbor, endNode);
                  neighbor.fcost = neighbor.gcost + neighbor.hcost;
                  if(!OPEN.find(neighbor)) {
                        OPEN.enqueue(neighbor);
                  }
            }
      }

  }
  return visitedOrder;
}
// Returns a list of neighbors around node that are unvisited
function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((node) => !node.isVisited && !node.isWall);
}
// Returns the shortest path in the A* search
function findShortestPath(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null && currentNode.isVisited) {
    currentNode.isShortestPath = true;
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
// Calculates the H value used in the A* Search algorithm
// H value is the predicted distance from the node to the endNode
function calcHVal(node, endNode) {
  // Manhattan distance
  // return Math.abs(node.row - endNode.row) +  Math.abs(node.col - endNode.col);

  // Euclidean distance
  return Math.sqrt(Math.pow(node.row - endNode.row,2) + Math.pow(node.col - endNode.col,2));
}