// Data
const sankeyData = {
    nodes: [
        // Time Bins
        { name: "Pre-1945" }, { name: "1945-1970" }, { name: "1971-1995" }, { name: "1996-2025" },
        // Spatial Jurisdiction
        { name: "Pre-1945_Direct" }, { name: "Pre-1945_Indirect" },
        { name: "1945-1970_Direct" }, { name: "1945-1970_Indirect" },
        { name: "1971-1995_Direct" }, { name: "1971-1995_Indirect" },
        { name: "1996-2025_Direct" }, { name: "1996-2025_Indirect" },
        // Strategies
        { name: "Adaptive" }, { name: "Evidence" }, { name: "Global" }, { name: "Vision" }, { name: "Resource" },
        // Objectives
        { name: "Economic" }, { name: "Governance" }, { name: "Human" }, { name: "Knowledge" }, { name: "Conservation" }
    ],
    links: [
        // Time to Spatial
        { source: 0, target: 4, value: 2 }, { source: 0, target: 5, value: 3 },
        { source: 1, target: 6, value: 6 }, { source: 1, target: 7, value: 13 },
        { source: 2, target: 8, value: 4 }, { source: 2, target: 9, value: 13 },
        { source: 3, target: 10, value: 2 }, { source: 3, target: 11, value: 6 },
        // Spatial to Strategies
        { source: 4, target: 12, value: 4 }, { source: 4, target: 13, value: 2 }, { source: 4, target: 14, value: 2 }, { source: 4, target: 15, value: 2 }, { source: 4, target: 16, value: 2 },
        { source: 5, target: 12, value: 0 }, { source: 5, target: 13, value: 1 }, { source: 5, target: 14, value: 3 }, { source: 5, target: 15, value: 3 }, { source: 5, target: 16, value: 3 },
        { source: 6, target: 12, value: 6 }, { source: 6, target: 13, value: 5 }, { source: 6, target: 14, value: 6 }, { source: 6, target: 15, value: 6 }, { source: 6, target: 16, value: 6 },
        { source: 7, target: 12, value: 10 }, { source: 7, target: 13, value: 7 }, { source: 7, target: 14, value: 12 }, { source: 7, target: 15, value: 13 }, { source: 7, target: 16, value: 13 },
        { source: 8, target: 12, value: 4 }, { source: 8, target: 13, value: 3 }, { source: 8, target: 14, value: 4 }, { source: 8, target: 15, value: 4 }, { source: 8, target: 16, value: 4 },
        { source: 9, target: 12, value: 10 }, { source: 9, target: 13, value: 7 }, { source: 9, target: 14, value: 11 }, { source: 9, target: 15, value: 12 }, { source: 9, target: 16, value: 13 },
        { source: 10, target: 12, value: 2 }, { source: 10, target: 13, value: 1 }, { source: 10, target: 14, value: 2 }, { source: 10, target: 15, value: 2 }, { source: 10, target: 16, value: 2 },
        { source: 11, target: 12, value: 5 }, { source: 11, target: 13, value: 1 }, { source: 11, target: 14, value: 6 }, { source: 11, target: 15, value: 5 }, { source: 11, target: 16, value: 6 },
        // Strategies to Objectives
        { source: 12, target: 17, value: 25 }, { source: 12, target: 18, value: 41 }, { source: 12, target: 19, value: 20 }, { source: 12, target: 20, value: 18 }, { source: 12, target: 21, value: 16 },
        { source: 13, target: 17, value: 25 }, { source: 13, target: 18, value: 27 }, { source: 13, target: 19, value: 20 }, { source: 13, target: 20, value: 18 }, { source: 13, target: 21, value: 16 },
        { source: 14, target: 17, value: 25 }, { source: 14, target: 18, value: 46 }, { source: 14, target: 19, value: 20 }, { source: 14, target: 20, value: 18 }, { source: 14, target: 21, value: 16 },
        { source: 15, target: 17, value: 25 }, { source: 15, target: 18, value: 47 }, { source: 15, target: 19, value: 20 }, { source: 15, target: 20, value: 18 }, { source: 15, target: 21, value: 16 },
        { source: 16, target: 17, value: 25 }, { source: 16, target: 18, value: 49 }, { source: 16, target: 19, value: 20 }, { source: 16, target: 20, value: 18 }, { source: 16, target: 21, value: 16 }
    ]
};

// Set up SVG
const svg = d3.select("svg").attr("width", 1200).attr("height", 800),
    margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// Sankey
const sankey = d3.sankey()
    .nodeWidth(20)
    .nodePadding(10)
    .extent([[0, 0], [width, height]]);
const { nodes, links } = sankey(sankeyData);

// Colors
const color = d3.scaleOrdinal()
    .domain(sankeyData.nodes.map(d => d.name))
    .range([
        "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", // Time Bins
        "#ff7f0e", "#ffbb78", "#ff7f0e", "#ffbb78", "#ff7f0e", "#ffbb78", "#ff7f0e", "#ffbb78", // Spatial
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", // Strategies
        "#a6cee3", "#b2df8a", "#fb9a99", "#fdbf6f", "#cab2d6" // Objectives
    ]);

// Nodes
g.append("g")
    .selectAll("rect")
    .data(nodes)
    .enter().append("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", d => color(d.name));

// Links
g.append("g")
    .selectAll("path")
    .data(links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", d => color(d.source.name))
    .attr("stroke-width", d => Math.max(1, d.width));

// Labels
g.append("g")
    .selectAll("text")
    .data(nodes)
    .enter().append("text")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .text(d => d.name.replace("_", " "));

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
    link.download = "all_dimensions_sankey.svg";
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
    canvas.width = 1200;
    canvas.height = 800;
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 1200, 800);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "all_dimensions_sankey.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}