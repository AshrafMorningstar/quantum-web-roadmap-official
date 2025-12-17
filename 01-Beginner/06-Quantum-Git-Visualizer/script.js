/** Quantum Git Visualizer - Script | Author: Ashraf Morningstar */
class QuantumGitVisualizer {
    constructor() {
        this.svg = null;
        this.width = 0;
        this.height = 0;
        this.simulation = null;
        
        // Mock Data: multiple timelines (branches)
        this.nodes = [
            { id: "c1", msg: "Initial commit", branch: "main", type: "commit" },
            { id: "c2", msg: "Add quantum core", branch: "main", type: "commit" },
            { id: "c3", msg: "Feature: UI", branch: "feature/quantum-ui", type: "commit" },
            { id: "c4", msg: "Fix button glitch", branch: "feature/quantum-ui", type: "commit" },
            { id: "c5", msg: "Emergency fix", branch: "bugfix/entanglement", type: "commit" },
            { id: "c6", msg: "Merge fix", branch: "main", type: "merge" },
            { id: "c7", msg: "Release v1.0", branch: "main", type: "tag" }
        ];

        this.links = [
            { source: "c1", target: "c2" },
            { source: "c2", target: "c3" }, // Branch off
            { source: "c3", target: "c4" },
            { source: "c2", target: "c5" }, // Branch off
            { source: "c5", target: "c6" }, // Merge back
            { source: "c2", target: "c6" },
            { source: "c6", target: "c7" }
        ];

        this.init();
    }

    init() {
        const container = document.getElementById('graph-container');
        this.width = container.offsetWidth;
        this.height = container.offsetHeight;

        this.svg = d3.select("#graph-container")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .call(d3.zoom().on("zoom", (event) => {
                this.svg.attr("transform", event.transform);
            }))
            .append("g");

        this.renderGraph();
        this.setupEventListeners();
    }

    renderGraph() {
        const colorScale = d3.scaleOrdinal()
            .domain(["main", "feature/quantum-ui", "bugfix/entanglement"])
            .range(["#238636", "#a371f7", "#f85149"]);

        this.simulation = d3.forceSimulation(this.nodes)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(80))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force("y", d3.forceY(0).strength(0.1)); // Force timelines horizontal-ish

        // Links
        const link = this.svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.links)
            .enter().append("line")
            .attr("stroke", "#30363d")
            .attr("stroke-width", 2);

        // Nodes
        const node = this.svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.nodes)
            .enter().append("circle")
            .attr("r", 10)
            .attr("fill", d => colorScale(d.branch))
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .call(this.drag(this.simulation));

        // Labels
        const label = this.svg.append("g")
            .selectAll("text")
            .data(this.nodes)
            .enter().append("text")
            .text(d => d.id.substring(0, 4))
            .attr("x", 15)
            .attr("y", 4)
            .style("fill", "#8b949e")
            .style("font-size", "12px")
            .style("pointer-events", "none");

        // Interaction
        node.on("click", (event, d) => {
            this.showDetail(d);
            // Highlight effect
            node.attr("stroke", "white").attr("stroke-width", 1.5);
            d3.select(event.currentTarget).attr("stroke", "#58a6ff").attr("stroke-width", 3);
        });

        // Ticking
        this.simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            label
                .attr("x", d => d.x + 15)
                .attr("y", d => d.y + 4);
        });
    }

    drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    showDetail(node) {
        const panel = document.getElementById('commitDetail');
        panel.style.display = 'block';
        document.getElementById('detailHash').textContent = Math.random().toString(16).substr(2, 7); // Fake hash
        document.getElementById('detailMsg').textContent = node.msg;
    }

    setupEventListeners() {
        document.getElementById('addCommitBtn').addEventListener('click', () => {
            // In a real app, this would recalculate graph
            alert('Simulation: New commit added to graph superposition.');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new QuantumGitVisualizer());
