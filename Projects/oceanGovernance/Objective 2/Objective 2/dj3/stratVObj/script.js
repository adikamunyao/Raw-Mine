// Data
const data = [
    { spatial: "Direct", type: "Strategy", name: "Adaptive", value: 13 },
    { spatial: "Direct", type: "Strategy", name: "Evidence", value: 9 },
    { spatial: "Direct", type: "Strategy", name: "Global", value: 14 },
    { spatial: "Direct", type: "Strategy", name: "Vision", value: 14 },
    { spatial: "Direct", type: "Strategy", name: "Resource", value: 14 },
    { spatial: "Indirect", type: "Strategy", name: "Adaptive", value: 29 },
    { spatial: "Indirect", type: "Strategy", name: "Evidence", value: 18 },
    { spatial: "Indirect", type: "Strategy", name: "Global", value: 33 },
    { spatial: "Indirect", type: "Strategy", name: "Vision", value: 34 },
    { spatial: "Indirect", type: "Strategy", name: "Resource", value: 36 },
    { spatial: "Direct", type: "Objective", name: "Economic", value: 8 },
    { spatial: "Direct", type: "Objective", name: "Governance", value: 14 },
    { spatial: "Direct", type: "Objective", name: "Human", value: 7 },
    { spatial: "Direct", type: "Objective", name: "Knowledge", value: 6 },
    { spatial: "Direct", type: "Objective", name: "Conservation", value: 9 },
    { spatial: "Indirect", type: "Objective", name: "Economic", value: 17 },
    { spatial: "Indirect", type: "Objective", name: "Governance", value: 36 },
    { spatial: "Indirect", type: "Objective", name: "Human", value: 13 },
    { spatial: "Indirect", type: "Objective", name: "Knowledge", value: 12 },
    { spatial: "Indirect", type: "Objective", name: "Conservation", value: 7 }
];

// Set up SVG
const svg = d3.select("svg").attr("width", 800).attr("height", 800),
    width = 800,
    height = 800,
    radius = Math.min(width, height) / 2 - 40,
    g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

// Scales
const angle = d3.scaleBand()
    .domain(["Adaptive", "Evidence", "Global", "Vision", "Resource", "Economic", "Governance", "Human", "Knowledge", "Conservation"])
    .range([0, 2 * Math.PI]);
const radial = d3.scaleBand()
    .domain(["Direct_Strategy", "Indirect_Strategy", "Direct_Objective", "Indirect_Objective"])
    .range([0, radius]);
const color = d3.scaleSequential(d3.interpolateViridis).domain([0, 36]);

// Arc generator
const arc = d3.arc()
    .innerRadius(d => radial(`${d.spatial}_${d.type}`))
    .outerRadius(d => radial(`${d.spatial}_${d.type}`) + radial.bandwidth())
    .startAngle(d => angle(d.name))
    .endAngle(d => angle(d.name) + angle.bandwidth());

// Draw segments
g.selectAll(".segment")
    .data(data)
    .enter().append("path")
    .attr("class", "segment")
    .attr("d", arc)
    .attr("fill", d => color(d.value));

// Labels
g.selectAll(".label")
    .data(data)
    .enter().append("text")
    .attr("transform", d => {
        const a = angle(d.name) + angle.bandwidth() / 2;
        const r = radial(`${d.spatial}_${d.type}`) + radial.bandwidth() / 2;
        return `rotate(${a * 180 / Math.PI - 90}) translate(${r},0) ${a > Math.PI ? "rotate(180)" : ""}`;
    })
    .attr("dy", "0.35em")
    .attr("text-anchor", d => angle(d.name) + angle.bandwidth() / 2 < Math.PI ? "start" : "end")
    .text(d => d.name.slice(0, 3) + ":" + d.value)
    .style("fill", "#fff")
    .style("font-size", "10px");

// Legend
const legend = g.append("g").attr("transform", `translate(${radius + 40}, ${-radius})`);
legend.append("text").attr("x", 0).attr("y", -10).text("Count").style("fill", "#333");
d3.range(0, 37, 9).forEach((v, i) => {
    legend.append("rect").attr("x", 0).attr("y", i * 20).attr("width", 15).attr("height", 15).attr("fill", color(v));
    legend.append("text").attr("x", 20).attr("y", i * 20 + 12).text(v).style("fill", "#333");
});

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
    link.download = "strategies_vs_objectives_heatmap.svg";
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
        link.download = "strategies_vs_objectives_heatmap.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}