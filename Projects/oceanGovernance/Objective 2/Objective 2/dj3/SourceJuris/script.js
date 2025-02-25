// Data
const data = {
    name: "Sources",
    children: [
        { name: "Treaties", size: 38, children: [
            { name: "Economic", size: 21 }, { name: "Environment", size: 19 }, { name: "Regulatory", size: 27 },
            { name: "Human", size: 11 }, { name: "Scientific", size: 17 }, { name: "Social", size: 8 }, { name: "Global", size: 15 }
        ]},
        { name: "Resolutions", size: 25, children: [
            { name: "Economic", size: 13 }, { name: "Environment", size: 12 }, { name: "Regulatory", size: 17 },
            { name: "Human", size: 8 }, { name: "Scientific", size: 9 }, { name: "Social", size: 7 }, { name: "Global", size: 12 }
        ]},
        { name: "Constitutions", size: 18, children: [
            { name: "Economic", size: 11 }, { name: "Environment", size: 7 }, { name: "Regulatory", size: 13 },
            { name: "Human", size: 7 }, { name: "Scientific", size: 8 }, { name: "Social", size: 5 }, { name: "Global", size: 6 }
        ]},
        { name: "Int'l Law", size: 17, children: [
            { name: "Economic", size: 8 }, { name: "Environment", size: 9 }, { name: "Regulatory", size: 14 },
            { name: "Human", size: 6 }, { name: "Scientific", size: 7 }, { name: "Social", size: 5 }, { name: "Global", size: 7 }
        ]}
    ]
};

// Set up SVG
const svg = d3.select("svg").attr("width", 800).attr("height", 800),
    width = 800,
    height = 800,
    radius = Math.min(width, height) / 2 - 40,
    g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

// Sunburst partition
const partition = d3.partition().size([2 * Math.PI, radius]);
const root = d3.hierarchy(data).sum(d => d.size);
partition(root);

// Arc generator
const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1);

// Colors
const color = d3.scaleOrdinal()
    .domain(["Treaties", "Resolutions", "Constitutions", "Int'l Law", "Economic", "Environment", "Regulatory", "Human", "Scientific", "Social", "Global"])
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#a6cee3", "#b2df8a", "#fb9a99", "#fdbf6f", "#cab2d6", "#6a3d9a"]);

// Draw arcs
g.selectAll("path")
    .data(root.descendants().slice(1))
    .enter().append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.name))
    .attr("opacity", d => d.depth === 1 ? 0.8 : 0.6);

// Labels
g.selectAll("text")
    .data(root.descendants().slice(1))
    .enter().append("text")
    .attr("transform", d => {
        const angle = ((d.x0 + d.x1) / 2) * 180 / Math.PI - 90;
        const r = (d.y0 + d.y1) / 2;
        return `rotate(${angle}) translate(${r},0) ${angle > 90 ? "rotate(180)" : ""}`;
    })
    .attr("dy", "0.35em")
    .attr("text-anchor", d => ((d.x0 + d.x1) / 2) * 180 / Math.PI < 180 ? "start" : "end")
    .text(d => d.data.name)
    .style("fill", "#333")
    .style("font-size", "10px");

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
    link.download = "source_of_jurisdiction_sunburst.svg";
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
        link.download = "source_of_jurisdiction_sunburst.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}