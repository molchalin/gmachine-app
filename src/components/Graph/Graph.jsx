import React from "react";
import dagre from "dagre";
import sigma from "sigma";
import css from "./Graph.module.css";

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.dagre = new dagre.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(() => ({}));
    this.graph = React.createRef();
    this.removes = [];

    this.applyDiff(this.props.diff);
  }

  componentWillReceiveProps(nextProps) {
    this.applyDiff(nextProps.diff);
  }

  applyDiff = diff => {
    let update =
      diff.remove.nodes.length === 1 &&
      diff.add.nodes.length === 1 &&
      diff.remove.nodes[0].id === diff.add.nodes[0].id;
    diff.remove.nodes.forEach(node => {
      if (!update) {
        this.dagre.removeNode(node.id);
      }
      if (node.from !== null && node.to !== null) {
        this.dagre.removeEdge(node.id, node.to);
        this.dagre.removeEdge(node.id, node.from);
      }
    });
    diff.add.nodes.forEach(node => {
      this.dagre.setNode(node.id, { label: node.label + "($" + node.id + ")" });
      if (node.from !== null && node.to !== null) {
        this.dagre.setEdge(node.id, node.from);
        this.dagre.setEdge(node.id, node.to);
      }
    });
  };

  componentDidMount() {
    this.sigma = new sigma({
      renderer: {
        container: this.graph.current,
        type: "canvas"
      },
      settings: {
        labelThreshold: 4,
        sideMargin: 50
        //mouseEnabled: false,
        //touchEnabled: false,
      }
    });
    this.drawGraph();
  }

  componentDidUpdate() {
    this.drawGraph();
  }

  drawGraph = () => {
    const dgr = this.dagre;
    dagre.layout(dgr);
    dgr.graph().ranker = "tight-tree";

    const graph = {
      nodes: dgr.nodes().map(t => ({
        id: t,
        x: dgr.node(t).x,
        y: dgr.node(t).y,
        label: dgr.node(t).label,
        color: "#000",
        size: 1
      })),
      edges: dgr.edges().map(({ v: source, w: target }) => ({
        id: source + "->" + target,
        source,
        target
      }))
    };

    this.sigma.graph.clear();
    this.sigma.graph.read(graph);
    this.sigma.refresh();
  };

  render() {
    return <div ref={this.graph} className={css.graph}></div>;
  }
}

export default Graph;
