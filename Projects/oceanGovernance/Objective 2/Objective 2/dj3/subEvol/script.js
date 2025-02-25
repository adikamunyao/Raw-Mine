// Data
const data = [
    { bin: "Pre-1945", Economic: 3, Environment: 1, Regulatory: 5, Human: 1, Scientific: 3, Social: 1, Global: 1 },
    { bin: "1945-1970", Economic: 11, Environment: 7, Regulatory: 12, Human: 7, Scientific: 11, Social: 3, Global: 5 },
    { bin: "1971-1995", Economic: 9, Environment: 13, Regulatory: 14, Human: 6, Scientific: 8, Social: 4, Global: 9 },
    { bin: "1996-2025", Economic: 4, Environment: 5, Regulatory: 8, Human: 2, Scientific: 2, Social: 3, Global: 5 }
];

// Subject matters
const subjects = ["Economic", "Environment", "Regulatory", "Human", "Scientific", "Social", "Global"];

// Set up SVG
const svg = d3.select("svg")
    .attr("width", 900)
    .attr("height", 600),
    margin = { top: 20, right: 120, bottom: 50, left: 50 },
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// Scales
const x = d3.scalePoint()
    .domain(data.map(d => d.bin))
    .range([0, width])
    .padding(0.5);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(subjects.map(s => d[s])))])
    .range([height, 0]);

const color = d3.scaleOrdinal()
    .domain(subjects)
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"]);

// Line generator
const line = d3.line()
    .x(d => x(d.bin))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);

// Draw lines
subjects.forEach(subject => {
    const lineData = data.map(d => ({ bin: d.bin, value: d[subject] }));
    g.append("path")
        .datum(lineData)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", color(subject));
});

// X-axis
g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .text("Year of Establishment");

// Y-axis
g.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("x", -height / 2)
    .attr("y", -40)
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Number of Institutions");

// Legend
const legend = g.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width + 10}, 0)`);

legend.selectAll("rect")
    .data(subjects)
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * 20)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", color);

legend.selectAll("text")
    .data(subjects)
    .enter().append("text")
    .attr("x", 20)
    .attr("y", (d, i) => i * 20 + 12)
    .attr("fill", "#333")
    .text(d => d);

// Export functions
function exportSVG() {
    const svgElement = document.querySelector("svg");
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "subject_matter_evolution_line.svg";
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
        link.download = "subject_matter_evolution_line.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    img.onerror = function() {
        console.error("Failed to load SVG for PNG export");
        URL.revokeObjectURL(url);
    };

    img.src = url;
}