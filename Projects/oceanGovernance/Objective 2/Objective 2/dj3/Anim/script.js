// Data
const timeBins = [
    { bin: "Pre-1945", data: [
        { name: "Adaptive", value: 4 }, { name: "Evidence", value: 3 },
        { name: "Global", value: 5 }, { name: "Vision", value: 5 }, { name: "Resource", value: 5 }
    ]},
    { bin: "1945-1970", data: [
        { name: "Adaptive", value: 16 }, { name: "Evidence", value: 12 },
        { name: "Global", value: 18 }, { name: "Vision", value: 19 }, { name: "Resource", value: 19 }
    ]},
    { bin: "1971-1995", data: [
        { name: "Adaptive", value: 14 }, { name: "Evidence", value: 10 },
        { name: "Global", value: 15 }, { name: "Vision", value: 16 }, { name: "Resource", value: 17 }
    ]},
    { bin: "1996-2025", data: [
        { name: "Adaptive", value: 7 }, { name: "Evidence", value: 2 },
        { name: "Global", value: 8 }, { name: "Vision", value: 7 }, { name: "Resource", value: 8 }
    ]}
];

// Set up SVG
const svg = d3.select("svg").attr("width", 900).attr("height", 600),
    width = 900,
    height = 600,
    g = svg.append("g");

// Colors
const color = d3.scaleOrdinal()
    .domain(["Adaptive", "Evidence", "Global", "Vision", "Resource"])
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]);

// Bubble size scale
const size = d3.scaleSqrt().domain([0, 19]).range([10, 50]);

// Animation function
function update(binIndex) {
    const currentData = timeBins[binIndex].data;

    // Simulation
    const simulation = d3.forceSimulation(currentData)
        .force("x", d3.forceX(width / 2).strength(0.1))
        .force("y", d3.forceY(height / 2).strength(0.1))
        .force("collide", d3.forceCollide(d => size(d.value) + 2))
        .force("charge", d3.forceManyBody().strength(-50));

    // Bubbles
    const bubbles = g.selectAll(".bubble")
        .data(currentData, d => d.name);

    bubbles.exit().transition().duration(500).attr("r", 0).remove();

    bubbles.enter().append("circle")
        .attr("class", "bubble")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", 0)
        .attr("fill", d => color(d.name))
        .merge(bubbles)
        .transition().duration(1000)
        .attr("r", d => size(d.value));

    // Labels
    const labels = g.selectAll(".label")
        .data(currentData, d => d.name);

    labels.exit().remove();

    labels.enter().append("text")
        .attr("class", "label")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("dy", "0.35em")
        .text(d => `${d.name}: ${d.value}`)
        .merge(labels)
        .transition().duration(1000)
        .attr("x", d => d.x)
        .attr("y", d => d.y);

    // Bin label
    g.selectAll(".bin-label").remove();
    g.append("text")
        .attr("class", "bin-label")
        .attr("x", width / 2)
        .attr("y", 30)
        .text(timeBins[binIndex].bin);

    simulation.on("tick", () => {
        bubbles.attr("cx", d => d.x).attr("cy", d => d.y);
        labels.attr("x", d => d.x).attr("y", d => d.y);
    });
}

// Animation loop
let currentBin = 0;
update(currentBin);
setInterval(() => {
    currentBin = (currentBin + 1) % timeBins.length;
    update(currentBin);
}, 3000);

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
    link.download = "strategies_over_time_bubble.svg";
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
        link.download = "strategies_over_time_bubble.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}