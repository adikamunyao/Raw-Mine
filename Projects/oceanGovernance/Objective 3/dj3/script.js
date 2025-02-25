// Prepare the data as nodes and links
const data = {
    nodes: [
        { id: "IOC", type: "organization" },
        { id: "FAO", type: "organization" },
        { id: "IMO", type: "organization" },
        { id: "UNFCCC", type: "organization" },
        { id: "Treaty", type: "document" },
        { id: "Resolution", type: "document" },
        { id: "Constitution", type: "document" },
        { id: "Convention", type: "document" },
        { id: "Agenda", type: "document" },
        { id: "Charter", type: "document" }
    ],
    links: [
        { source: "IOC", target: "Treaty" },
        { source: "FAO", target: "Constitution" },
        { source: "IMO", target: "Convention" },
        { source: "UNFCCC", target: "Treaty" },
        { source: "IOC", target: "Resolution" },
        { source: "IMO", target: "Treaty" },
        { source: "UNFCCC", target: "Protocol" },
        { source: "UNFCCC", target: "Treaty" },
        { source: "FAO", target: "Treaty" }
        // Add more links based on your data
    ]
};

// Set up dimensions and margin for the graph
const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Tooltip for interaction
const tooltip = d3.select("#tooltip");

// Create the simulation (force-directed graph)
const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

// Create links (edges)
const link = svg.selectAll(".link")
    .data(data.links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke-width", 1);

// Create nodes (organizations and document types)
const node = svg.selectAll(".node")
    .data(data.nodes)
    .enter().append("circle")
    .attr("class", d => `node node--${d.type}`)
    .attr("r", 10)
    .call(d3.drag()
        .on("start", dragstart)
        .on("drag", dragmove)
        .on("end", dragend));

// Add labels to nodes
const labels = svg.selectAll(".label")
    .data(data.nodes)
    .enter().append("text")
    .attr("class", "label")
    .attr("dx", 12)
    .attr("dy", 3)
    .text(d => d.id);

// Update the simulation positions
simulation.on("tick", function() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
});

// Hover interactions for nodes
node.on("mouseover", function(event, d) {
    tooltip.style("visibility", "visible")
        .text(d.id);
})
.on("mousemove", function(event) {
    tooltip.style("top", (event.pageY + 10) + "px")
        .style("left", (event.pageX + 10) + "px");
})
.on("mouseout", function() {
    tooltip.style("visibility", "hidden");
});

// Drag functions for interactivity
function dragstart(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

function dragmove(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

function dragend(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}
