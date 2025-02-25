// Data: Count of Direct (max 14) and Indirect (max 35) IGOs for each attribute
const data = [
    { attr: "Indirect", Direct: 0, Indirect: 24 },
    { attr: "SubjMatter", Direct: 14, Indirect: 28 },
    { attr: "Source", Direct: 0, Indirect: 3 },
    { attr: "Objectives", Direct: 14, Indirect: 26 },
    { attr: "Strategies", Direct: 11, Indirect: 20 },
    { attr: "InterInst", Direct: 14, Indirect: 28 },
    { attr: "Vertical", Direct: 14, Indirect: 28 },
    { attr: "Horizontal", Direct: 14, Indirect: 29 }
];

const svg = d3.select("svg").attr("width", 1000).attr("height", 600),
    margin = { top: 40, right: 20, bottom: 100, left: 60 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// X-axis: Attributes
const x = d3.scaleBand().domain(data.map(d => d.attr)).range([0, width]).padding(0.1);

// Y-axis: Count (0 to 49)
const y = d3.scaleLinear().domain([0, 49]).range([height, 0]);

// Bars: Direct (orange) at the bottom
g.selectAll(".bar-direct")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar-direct")
    .attr("x", d => x(d.attr))
    .attr("y", d => y(d.Direct))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Direct));

// Bars: Indirect (blue) stacked on top
g.selectAll(".bar-indirect")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar-indirect")
    .attr("x", d => x(d.attr))
    .attr("y", d => y(d.Direct + d.Indirect))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Indirect));

// Labels: Total count on top
g.selectAll(".label")
    .data(data)
    .enter().append("text")
    .attr("class", "label")
    .attr("x", d => x(d.attr) + x.bandwidth() / 2)
    .attr("y", d => y(d.Direct + d.Indirect) - 5)
    .text(d => `${d.Direct + d.Indirect}`);

// X-axis: Attribute names (tilted)
g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end");

// Y-axis: Count
g.append("g").call(d3.axisLeft(y));

// Legend: Explain the colors
const legend = g.append("g").attr("transform", "translate(10, 10)");
legend.append("rect").attr("x", 0).attr("y", 0).attr("width", 15).attr("height", 15).attr("fill", "#ff7f0e");
legend.append("text").attr("x", 20).attr("y", 12).text("Direct IGOs (out of 14)");
legend.append("rect").attr("x", 0).attr("y", 20).attr("width", 15).attr("height", 15).attr("fill", "#1f77b4");
legend.append("text").attr("x", 20).attr("y", 32).text("Indirect IGOs (out of 35)");

function exportSVG() {
    const svgElement = svg.node();
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "direct_vs_indirect.svg";
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
        link.download = "direct_vs_indirect.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}