class Graph {
  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjList[node] = [];
  }

  addEdge(node1, node2) {
    this.adjList[node1].push(node2);
    this.adjList[node2].push(node1);
  }

  searchNode(node) {
    if (!this.nodes.length) return;
    return this.nodes.find(n => n === node);
  }

  getNeighbors(node) {
    if (this.searchNode(node)) {
      return this.adjList[node];
    }
  }

  removeNode(node) {
    const index = this.nodes.indexOf(node);
    if (index > -1) {
      this.nodes.splice(index, 1);
      
     
      delete this.adjList[node];
      
 
      for (const n in this.adjList) {
        const edgeIndex = this.adjList[n].indexOf(node);
        if (edgeIndex > -1) {
          this.adjList[n].splice(edgeIndex, 1);
        }
      }
      
      return true;
    }
    return false;
  }

  getAllNodes() {
    return this.nodes;
  }

  getAllEdges() {
    const edges = [];
    for (const node in this.adjList) {
      this.adjList[node].forEach(neighbor => {
        
        if (node < neighbor) {
          edges.push({ source: node, target: neighbor });
        }
      });
    }
    return edges;
  }

  printGraph() {
    console.log(this.adjList);
  }
}

export default Graph;
