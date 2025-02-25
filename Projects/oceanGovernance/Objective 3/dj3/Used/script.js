const data = [
    { institution: "IOC", spatial: "No", subject: "Yes", source: "No", objectives: "Yes", strategies: "No", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "FAO", spatial: "No", subject: "No", source: "No", objectives: "Yes", strategies: "No", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    // ... Add all other institutions here, truncated for brevity ...
    { institution: "UNODC", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "No", vertical: "No", horizontal: "No" }
];

const attributes = ["spatial", "subject", "source", "objectives", "strategies", "relationship", "vertical", "horizontal"];

// Convert data to nodes and links
const nodes = [
    ...data.map(d => ({ id: d.institution, type: "institution" })),
    ...attributes.map(attr => ({ id: attr, type: "attribute" }))
];

const links = [];
data.forEach(d => {
    attributes.forEach(attr => {
        if (d[attr] === "Yes") {
            links.push({ source: d.institution, target: attr });
        }
    });
});

const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", 1);

const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", d => d.type === "institution" ? 5 : 3) // Different size for institutions and attributes
    .attr("fill", d => d.type === "institution" ? "#1f77b4" : "#ff7f0e")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

node.append("title")
    .text(d => d.id);

const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter().append("text")
    .text(d => d.id)
    .attr("text-anchor", "middle")
    .attr("fill", d => d.type === "institution" ? "#1f77b4" : "#ff7f0e")
    .attr("y", d => d.type === "institution" ? 10 : 8);

simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    label
        .attr("x", d => d.x)
        .attr("y", d => d.y + (d.type === "institution" ? 15 : 10));
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