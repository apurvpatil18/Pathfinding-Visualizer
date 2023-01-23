// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.

export function dfsAlgorithm(grid, animations, startNode, endNode) {
  let visitedOrder = [];
  dfsUtil(grid, animations, startNode, endNode, visitedOrder);
  return visitedOrder;
}
// Bulk of the DFS recursive function
function dfsUtil(grid, animations, node, endNode, visitedOrder) {
  node.isVisited = true;
  if (animations) node.isAnimated = true;
  visitedOrder.push(node);
  let neighbors = getNeighbors(node, grid);
  while (neighbors.length !== 0) {
    if (visitedOrder[visitedOrder.length - 1] === endNode) return true;
    let working = neighbors.pop();
    node.previousNode = working;
    dfsUtil(grid, animations, working, endNode, visitedOrder);
  }
  return;
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