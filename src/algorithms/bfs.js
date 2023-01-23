// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.

class Queue {
  constructor() {
    this.arr = [];
  }
  enqueue(val) {
    this.arr.push(val);
  }
  dequeue() {
    return this.arr.shift();
  }
  isEmpty() {
    return this.arr.length === 0;
  }
}
// Exported bfs algorithm function, returns nodes visited order and nodes in the shortest path
export function bfsAlgorithm(grid, animations, startNode, endNode) {
  let visitedOrder = bfs(grid, animations, startNode, endNode);
  let nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
  return [visitedOrder, nodesInShortestPathOrder];
}
// Bulk of the BFS algorithm, performs BFS on startNode and halfs on endNode
function bfs(grid, animations, startNode, endNode) {
  let visitedOrder = [];
  let queue = new Queue();
  startNode.isVisited = true;
  if (animations) startNode.isAnimated = true;
  visitedOrder.push(startNode);
  queue.enqueue(startNode);
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    visitedOrder.push(node);
    if (node === endNode) return visitedOrder;
    let neighbors = getNeighbors(node, grid);
    for (let i = 0; i < neighbors.length; i++) {
      neighbors[i].isVisited = true;
      neighbors[i].previousNode = node;
      if (animations) neighbors[i].isAnimated = true;
      queue.enqueue(neighbors[i]);
    }
  }
  return visitedOrder;
}
// Returns a list of neighbors around node that are unvisited
function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  return neighbors.filter((node) => !node.isVisited && !node.isWall);
}
export function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null && currentNode.isVisited) {
    currentNode.isShortestPath = true;
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}