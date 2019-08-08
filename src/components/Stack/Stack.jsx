import React from 'react';
import Dagre from 'dagre';
import Sigma from 'sigma';

import css from './Stack.module.css';

class Stack extends React.Component {
    constructor(props) {
        super(props);
        this.graph = React.createRef();
    };

    componentDidMount() {
        this.Sigma = new Sigma({
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

    drawGraph = () => {
        const dgr = new Dagre.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(() => ({}));;
        dgr.graph().rankDir = 'LR';
        this.props.stack.forEach((k, i) =>{
            dgr.setNode(i, {label: k});
            if (i > 0) {
                dgr.setEdge(i - 1, i);
            }
        });
        Dagre.layout(dgr);

        const graph = {
            nodes: dgr.nodes().map(t => ({
                id: t,
                x: dgr.node(t).x,
                y: dgr.node(t).y,
                label: dgr.node(t).label,
                color: "#999",
                size: 1,
            })),
            edges: dgr.edges().map(({ v: source, w: target }) => ({
                id: source + "->" + target,
                source,
                target,
            })),
        };

        this.Sigma.graph.clear();
        this.Sigma.graph.read(graph);
        this.Sigma.refresh();
    };

    render() {
        return <div ref={this.graph} className={css.stack}></div>
    }
}

export default Stack;
