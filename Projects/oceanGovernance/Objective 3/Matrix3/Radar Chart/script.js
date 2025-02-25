// Data: Percentage of IGOs with each feature per time bin
const timeBins = [
    { bin: "Pre-1945", counts: [4, 5, 5, 4, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4], total: 5 },
    { bin: "1945-1970", counts: [15, 15, 16, 11, 15, 15, 16, 14, 16, 15, 14, 16, 16, 16], total: 19 },
    { bin: "1971-1995", counts: [15, 15, 15, 11, 15, 15, 13, 14, 13, 15, 14, 13, 15, 13], total: 17 },
    { bin: "1996-2025", counts: [7, 7, 7, 5, 7, 7, 7, 8, 7, 7, 8, 7, 8, 7], total: 8 }
];
const features = ["Science-Policy", "Collaborative", "Network", "Adaptive", "Sociotechnical", "Mechanisms", "Systemic", "Cross-Boundary", "Stewardship", "Decision-Making", "Transparency", "Equity", "Resilience", "Institutional"];

// Calculate percentages
const data = timeBins.map(bin => ({
    bin: bin.bin,
    values: bin.counts.map((count, i) => ({ feature: features[i], percent: count / bin.total * 100 }))
}));

const svg = d3.select("svg").attr("width", 800).attr("height", 800),
    width = 800,
    height = 800,
    radius = Math.min(width, height) / 2 - 80,
    g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

// Angle scale: One point per feature
const angle = d3.scalePoint().domain(features).range([0, 2 * Math.PI]);

// Radial scale: Percentage (0 to 100)
const r = d3.scaleLinear().domain([0, 100]).range([0, radius]);

// Line generator for radar chart
const radarLine = d3.lineRadial()
    .angle(d => angle(d.feature))
    .radius(d => r(d.percent))
    .curve(d3.curveLinearClosed);

// Colors for each time bin
const color = d3.scaleOrdinal().domain(timeBins.map(d => d.bin)).range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]);

// Draw radar lines
data.forEach((d, i) => {
    g.append("path")
        .datum(d.values)
        .attr("class", "line")
        .attr("d", radarLine)
        .attr("stroke", color(d.bin));
});

// Feature labels around the circle
g.selectAll(".label")
    .data(features)
    .enter().append("text")
    .attr("class", "label")
    .attr("transform", d => `rotate(${(angle(d) * 180 / Math.PI) - 90}) translate(${radius + 20},0) ${angle(d) > Math.PI ? "rotate(180)" : ""}`)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => angle(d) < Math.PI ? "start" : "end")
    .text(d => d);

// Legend: Time bins
const legend = g.append("g").attr("transform", "translate(-350, -300)");
legend.append("text").attr("x", 0).attr("y", 0).text("Time Bins").attr("font-weight", "bold");
timeBins.forEach((bin, i) => {
    legend.append("rect").attr("x", 0).attr("y", i * 20 + 10).attr("width", 15).attr("height", 15).attr("fill", color(bin.bin));
    legend.append("text").attr("x", 20).attr("y", i * 20 + 22).text(bin.bin);
});

function exportSVG() {
    const svgElement = svg.node();
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "feature_profiles_radar.svg";
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
        link.download = "feature_profiles_radar.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}