// Data
const timeBins = [
    { bin: "Pre-1945", data: [
        { name: "Adaptive", Direct: 4, Indirect: 0 }, { name: "Evidence", Direct: 2, Indirect: 1 },
        { name: "Global", Direct: 2, Indirect: 3 }, { name: "Vision", Direct: 2, Indirect: 3 },
        { name: "Resource", Direct: 2, Indirect: 3 }, { name: "Economic", Direct: 1, Indirect: 2 },
        { name: "Governance", Direct: 2, Indirect: 3 }, { name: "Human", Direct: 1, Indirect: 0 },
        { name: "Knowledge", Direct: 2, Indirect: 1 }, { name: "Conservation", Direct: 1, Indirect: 0 }
    ]},
    { bin: "1945-1970", data: [
        { name: "Adaptive", Direct: 6, Indirect: 10 }, { name: "Evidence", Direct: 5, Indirect: 7 },
        { name: "Global", Direct: 6, Indirect: 12 }, { name: "Vision", Direct: 6, Indirect: 13 },
        { name: "Resource", Direct: 6, Indirect: 13 }, { name: "Economic", Direct: 4, Indirect: 7 },
        { name: "Governance", Direct: 6, Indirect: 13 }, { name: "Human", Direct: 2, Indirect: 5 },
        { name: "Knowledge", Direct: 4, Indirect: 7 }, { name: "Conservation", Direct: 4, Indirect: 3 }
    ]},
    { bin: "1971-1995", data: [
        { name: "Adaptive", Direct: 4, Indirect: 10 }, { name: "Evidence", Direct: 3, Indirect: 7 },
        { name: "Global", Direct: 4, Indirect: 11 }, { name: "Vision", Direct: 4, Indirect: 12 },
        { name: "Resource", Direct: 4, Indirect: 13 }, { name: "Economic", Direct: 2, Indirect: 6 },
        { name: "Governance", Direct: 4, Indirect: 13 }, { name: "Human", Direct: 2, Indirect: 5 },
        { name: "Knowledge", Direct: 2, Indirect: 4 }, { name: "Conservation", Direct: 4, Indirect: 4 }
    ]},
    { bin: "1996-2025", data: [
        { name: "Adaptive", Direct: 2, Indirect: 5 }, { name: "Evidence", Direct: 1, Indirect: 1 },
        { name: "Global", Direct: 2, Indirect: 6 }, { name: "Vision", Direct: 2, Indirect: 5 },
        { name: "Resource", Direct: 2, Indirect: 6 }, { name: "Economic", Direct: 1, Indirect: 2 },
        { name: "Governance", Direct: 2, Indirect: 6 }, { name: "Human", Direct: 2, Indirect: 3 },
        { name: "Knowledge", Direct: 0, Indirect: 2 }, { name: "Conservation", Direct: 2, Indirect: 2 }
    ]}
];

// Set up SVG
const svg = d3.select("svg").attr("width", 900).attr("height", 900),
    width = 900,
    height = 900,
    radius = Math.min(width, height) / 2 - 40,
    g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2}) rotate(-10)`); // Slight 3D tilt

// Scales
const angle = d3.scaleBand()
    .domain(["Adaptive", "Evidence", "Global", "Vision", "Resource", "Economic", "Governance", "Human", "Knowledge", "Conservation"])
    .range([0, 2 * Math.PI]);
const barHeight = d3.scaleLinear().domain([0, 19]).range([0, radius / timeBins.length]);
const timeScale = d3.scaleBand()
    .domain(timeBins.map(d => d.bin))
    .range([0, radius]);

// Colors
const color = d3.scaleOrdinal()
    .domain(["Direct", "Indirect"])
    .range(["#ff7f0e", "#1f77b4"]);

// Draw time rings
g.selectAll(".ring")
    .data(timeBins)
    .enter().append("circle")
    .attr("class", "ring")
    .attr("r", (d, i) => timeScale(d.bin) + timeScale.bandwidth())
    .attr("fill", (d, i) => i % 2 === 0 ? "#e0e0e0" : "#d0d0d0");

// Time labels
g.selectAll(".time-label")
    .data(timeBins)
    .enter().append("text")
    .attr("class", "time-label")
    .attr("y", (d, i) => -(timeScale(d.bin) + timeScale.bandwidth() / 2))
    .text(d => d.bin);

// Draw petal bars
timeBins.forEach((bin, binIndex) => {
    const petals = g.selectAll(`.petal-${binIndex}`)
        .data(bin.data, d => d.name)
        .enter().append("g")
        .attr("class", `petal petal-${binIndex}`)
        .attr("transform", d => `rotate(${(angle(d.name) * 180 / Math.PI) - 90}) translate(${timeScale(bin.bin)}, 0)`);

    // Direct segment
    petals.append("rect")
        .attr("x", -angle.bandwidth() * 180 / Math.PI / 2)
        .attr("y", 0)
        .attr("width", angle.bandwidth() * 180 / Math.PI)
        .attr("height", d => barHeight(d.Direct))
        .attr("fill", color("Direct"))
        .attr("opacity", 0.8);

    // Indirect segment (stacked)
    petals.append("rect")
        .attr("x", -angle.bandwidth() * 180 / Math.PI / 2)
        .attr("y", d => barHeight(d.Direct))
        .attr("width", angle.bandwidth() * 180 / Math.PI)
        .attr("height", d => barHeight(d.Indirect))
        .attr("fill", color("Indirect"))
        .attr("opacity", 0.8);

    // Labels
    petals.append("text")
        .attr("class", "label")
        .attr("transform", d => `translate(0, ${barHeight(d.Direct + d.Indirect) + 5})`)
        .attr("dy", "0.35em")
        .text(d => d.Direct + d.Indirect > 0 ? `${d.name.slice(0, 3)}: ${d.Direct + d.Indirect}` : "");
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
    link.download = "all_dimensions_radial_petal_static.svg";
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
    canvas.height = 900;
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 900, 900);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "all_dimensions_radial_petal_static.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}