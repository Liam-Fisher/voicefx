export function addNode<T extends AudioNode>(
    id: string,
    node: T,
    connections?: ConnectionMap
  ) {
    try {
      this.nodes.set(id, node);
      if (!connections) {
        this.routeOut(node);
        return;
      }
      this.makeConnections(node, true, connections?.sourceMap);
      this.makeConnections(node, false, connections?.sinkMap);
    } catch (e) {
      //console.log(`failed to make connections for node: `);
      //console.log(node);
      throw e;
    }
}
export function routeOut<T extends AudioNode>(tgtNode: T) {
    if (tgtNode.numberOfOutputs > 0) {
      //console.log(`connecting targetNode to destination`);
      tgtNode.connect(this.ctx.destination);
    }
  }
    
export function makeConnections<T extends AudioNode>(
    newNode: T,
    isInput: boolean,
    map?: connection
  ) {
    for (let nodeID in map) {
      let existingNode = this.nodes.get(nodeID);
      let connections = map[nodeID];
      if (!existingNode) {
        throw new Error(
          `node with ID ${nodeID} specified in source map does not exist`
        );
      }
      validateConnections(
        isInput ? existingNode : newNode,
        isInput ? newNode : existingNode,
        connections
      );
      (isInput ? newNode : existingNode).connect(
        isInput ? existingNode : newNode,
        ...connections
      );
    }
  }
  export function validateConnections(
    srcNode: AudioNode,
    tgtNode: AudioNode,
    io: [number?, number?]
  ) {
    if (srcNode.numberOfOutputs <= (io?.[0] ?? -1)) {
      throw new Error(`output ${io?.[0]} does not exist`);
    }
    if (tgtNode.numberOfInputs <= (io?.[1] ?? -1)) {
      throw new Error(`input ${io?.[1]} does not exist`);
    }
    return true;
  }