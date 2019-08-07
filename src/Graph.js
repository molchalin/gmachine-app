import React from 'react';
import dagre from 'dagre';
import sigma from 'sigma';
import css from './Main.module.css';


class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.graph = React.createRef();
        this.dagre = new dagre.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(() => ({}));
    };
    componentDidMount() {
        this.sigma = new sigma({
          renderer: {
            container: this.graph.current,
            type: 'canvas'
          },
          settings: {
              labelThreshold: 4,
              sideMargin: 50,
              mouseEnabled: false,
              touchEnabled: false,
          },
        });
        this.drawGraph()
    };
    componentDidUpdate() {
        this.drawGraph();
    };
    render() {
        this.applyDiff(this.props.diff)
        return <div ref={this.graph} className={css.graph}></div>
    };
    applyDiff = (diff) => {
        this.props.diff.remove.nodes.forEach( node => this.dagre.removeNode(node.id) );
        this.props.diff.remove.edges.forEach( edge => this.dagre.removeEdge(edge.from, edge.to) );
        this.props.diff.add.nodes.forEach( node => this.dagre.setNode(node.id, {label: node.label}) );
        this.props.diff.add.edges.forEach( edge => this.dagre.setEdge(edge.from, edge.to) );
    };
    drawGraph = () => {
        const dgr = this.dagre;
        dagre.layout(dgr);

        const graph = {
            nodes: dgr.nodes().map(t => ({
                id: t,
                x: dgr.node(t).x,
                y: dgr.node(t).y,
                label: dgr.node(t).label,
                color: "#FF0000",
                size: 1,
            })),
            edges: dgr.edges().map(({v: source, w: target}) => ({
                id: source + "->" + target,
                source,
                target,
            })),
        };


        this.sigma.graph.clear();
        this.sigma.graph.read(graph);
        this.sigma.refresh();
    };
}
export default Graph;
