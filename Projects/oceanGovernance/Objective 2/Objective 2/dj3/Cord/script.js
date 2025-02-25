// Sample data (simplified; full dataset needs manual entry)
const nodes = [
    { id: "WTO", spatial: "Indirect" }, { id: "UNEP", spatial: "Direct" }, { id: "ISA", spatial: "Direct" },
    { id: "FAO", spatial: "Direct" }, { id: "UNFCC", spatial: "Indirect" }
];
const links = [
    { source: "WTO", target: "FAO", mechanism: "JointProg", value: 5 },
    { source: "UNEP", target: "ISA", mechanism: "PolicyHarm", value: 4 },
    { source: "UNEP", target: "FAO", mechanism: "CrossSector", value: 3 },
    { source: "UNFCC", target: "UNEP", mechanism: "DataShare", value: 2 }
];

// Set up SVG
const svg = d3.select("svg").attr("width", 800).attr("height", 800),
    width = 800,
    height = 800,
    g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

// Simulation
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(0, 0));

// Links
const link = g.append("g")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke-width", d => d.value);

// Nodes
const node = g.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", d => d.spatial === "Direct" ? 10 : 5)
    .attr("fill", d => d.spatial === "Direct" ? "#ff7f0e" : "#1f77b4")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
    .append("title")
    .text(d => d.id);

// Tick function
simulation.on("tick", () => {
    link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    node.attr("cx", d => d.x).attr("cy", d => d.y);
});

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Export
function exportSVG() {
    const svgElement = svg.node();
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "coordination_network.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function exportPNG() {
    const svgElement = svg.node();
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 800;
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 800, 800);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "coordination_network.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}