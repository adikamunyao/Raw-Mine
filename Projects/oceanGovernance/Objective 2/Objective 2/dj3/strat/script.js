// Data
const data = [
    { bin: "Pre-1945", Adaptive: 4, Evidence: 3, Global: 5, Vision: 5, Resource: 5 },
    { bin: "1945-1970", Adaptive: 16, Evidence: 12, Global: 18, Vision: 19, Resource: 19 },
    { bin: "1971-1995", Adaptive: 15, Evidence: 10, Global: 16, Vision: 17, Resource: 18 },
    { bin: "1996-2025", Adaptive: 7, Evidence: 2, Global: 8, Vision: 7, Resource: 8 }
];
const strategies = ["Adaptive", "Evidence", "Global", "Vision", "Resource"];

// Set up SVG
const svg = d3.select("svg").attr("width", 900).attr("height", 600),
    margin = { top: 20, right: 120, bottom: 50, left: 50 },
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// Scales
const x = d3.scalePoint().domain(data.map(d => d.bin)).range([0, width]).padding(0.5);
const y = d3.scaleLinear().domain([0, 20]).range([0, height / strategies.length]);
const color = d3.scaleOrdinal()
    .domain(strategies)
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]);

// Stream generator
const area = d3.area()
    .x(d => x(d.bin))
    .y0(d => d.offset)
    .y1(d => d.offset + y(d.value))
    .curve(d3.curveCatmullRom);

// Draw streams
strategies.forEach((strat, i) => {
    const streamData = data.map(d => ({ bin: d.bin, value: d[strat], offset: i * (height / strategies.length) }));
    g.append("path")
        .datum(streamData)
        .attr("class", "stream")
        .attr("d", area)
        .attr("fill", color(strat))
        .attr("opacity", 0.7);
});

// Axes
g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x))
    .append("text").attr("x", width / 2).attr("y", 40).attr("fill", "#000").attr("text-anchor", "middle").text("Year Bin");

// Legend
const legend = g.append("g").attr("transform", `translate(${width + 10}, 0)`);
legend.selectAll("rect").data(strategies).enter().append("rect")
    .attr("x", 0).attr("y", (d, i) => i * 20).attr("width", 15).attr("height", 15).attr("fill", color);
legend.selectAll("text").data(strategies).enter().append("text")
    .attr("x", 20).attr("y", (d, i) => i * 20 + 12).attr("fill", "#333").text(d => d);

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
    link.download = "strategies_over_time_stream.svg";
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
    canvas.width = 900;
    canvas.height = 600;
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 900, 600);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "strategies_over_time_stream.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}