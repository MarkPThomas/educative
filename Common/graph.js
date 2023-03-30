// Template for initiliazing and populating a graph
class Graph {
  constructor() {
    this.graph_list = {}
  }
  initializing_graph(dependencies) {
    for (let x = 0; x < dependencies.length; x++) {
      let parent = dependencies[x][1]
      let child = dependencies[x][0]
      this.graph[parent] = []
      this.graph[child] = []
    }
  }
  building_graph(dependencies) {
    for (let x = 0; x < dependencies.length; x++) {
      let child = dependencies[x][0]
      this.graph[parent].push(child)
    }
  }
}

export default Graph