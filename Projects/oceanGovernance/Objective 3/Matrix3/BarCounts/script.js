// Data: Count of IGOs with each feature (from our matrix)
const data = [
    { feature: "Science-Policy", count: 45 },
    { feature: "Collaborative", count: 38 },
    { feature: "Network", count: 42 },
    { feature: "Adaptive", count: 31 },
    { feature: "Sociotechnical", count: 45 },
    { feature: "Mechanisms", count: 42 },
    { feature: "Systemic", count: 40 },
    { feature: "Cross-Boundary", count: 42 },
    { feature: "Stewardship", count: 40 },
    { feature: "Decision-Making", count: 45 },
    { feature: "Transparency", count: 42 },
    { feature: "Equity", count: 40 },
    { feature: "Resilience", count: 47 },
    { feature: "Institutional", count: 40 }
];

const svg = d3.select("svg").attr("width", 1000).attr("height", 600),
    margin = { top: 40, right: 20, bottom: 100, left: 60 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// X-axis: Features
const x = d3.scaleBand().domain(data.map(d => d.feature)).range([0, width]).padding(0.1);

// Y-axis: Count (0 to 49)
const y = d3.scaleLinear().domain([0, 49]).range([height, 0]);

// Bars: One for each feature, height shows count
g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.feature))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.count));

// Labels: Number on top of each bar
g.selectAll(".label")
    .data(data)
    .enter().append("text")
    .attr("class", "label")
    .attr("x", d => x(d.feature) + x.bandwidth() / 2)
    .attr("y", d => y(d.count) - 5)
    .text(d => d.count);

// X-axis: Feature names (tilted for space)
g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end");

// Y-axis: Count
g.append("g").call(d3.axisLeft(y));

// Legend: Explain the bars
const legend = g.append("g").attr("transform", "translate(10, 10)");
legend.append("rect").attr("x", 0).attr("y", 0).attr("width", 15).attr("height", 15).attr("fill", "#1f77b4");
legend.append("text").attr("x", 20).attr("y", 12).text("Number of IGOs with this feature (out of 49)");

function exportSVG() {
    const svgElement = svg.node();
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "feature_counts.svg";
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
    canvas.width = 1000;
    canvas.height = 600;
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 1000, 600);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "feature_counts.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}