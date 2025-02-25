// Data: Counts of key features over time bins
const data = [
    { feature: "Adaptive", counts: [4, 11, 11, 5] },
    { feature: "Network", counts: [5, 16, 15, 7] },
    { feature: "Collaborative", counts: [5, 15, 15, 7] },
    { feature: "Vertical", counts: [5, 14, 14, 8] }
];
const timeBins = ["Pre-1945", "1945-1970", "1971-1995", "1996-2025"];

const svg = d3.select("svg").attr("width", 800).attr("height", 600),
    margin = { top: 40, right: 100, bottom: 60, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// X-axis: Time bins
const x = d3.scaleBand().domain(timeBins).range([0, width]).padding(0.1);

// Y-axis: Count (0 to 19)
const y = d3.scaleLinear().domain([0, 19]).range([height, 0]);

// Colors for each feature
const color = d3.scaleOrdinal().domain(data.map(d => d.feature)).range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]);

// Lines: One for each feature
data.forEach(d => {
    g.append("path")
        .datum(d.counts)
        .attr("class", "line")
        .attr("d", d3.line()
            .x((_, i) => x(timeBins[i]) + x.bandwidth() / 2)
            .y(y))
        .attr("stroke", color(d.feature));
});

// X-axis: Time bins
g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

// Y-axis: Count
g.append("g").call(d3.axisLeft(y));

// Legend: Explain the lines
const legend = g.append("g").attr("transform", `translate(${width + 10}, 10)`);
data.forEach((d, i) => {
    legend.append("rect").attr("x", 0).attr("y", i * 20).attr("width", 15).attr("height", 15).attr("fill", color(d.feature));
    legend.append("text").attr("x", 20).attr("y", i * 20 + 12).text(`${d.feature} Count`);
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
    link.download = "features_over_time.svg";
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
    canvas.height = 600;
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 800, 600);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "features_over_time.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}