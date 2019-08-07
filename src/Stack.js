import React from 'react';
import css from './Main.module.css';
import dagre from 'dagre';
import sigma from 'sigma';




class Stack extends React.Component {
    render() {
        return <div ref={this.graph} className={css.stack}></div>
    }
    constructor(props) {
        super(props);
        this.graph = React.createRef();
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
    drawGraph = () => {
        const dgr = new dagre.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(() => ({}));;
        dgr.graph().rankDir = 'LR';
        this.props.stack.forEach((k, i) =>{
            dgr.setNode(i, {label: k});
            if (i > 0) {
                dgr.setEdge(i - 1, i);
            }
        });
        dagre.layout(dgr);

        const graph = {
            nodes: dgr.nodes().map(t => ({
                id: t,
                x: dgr.node(t).x,
                y: dgr.node(t).y,
                label: dgr.node(t).label,
                color: "#00FF00",
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
export default Stack;
