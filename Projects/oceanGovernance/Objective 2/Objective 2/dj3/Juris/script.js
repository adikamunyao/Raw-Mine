// Data from cross-tabulation
const data = [
    { spatial: "No Direct", Economic: 20, Environment: 15, Regulatory: 22, Human: 12, Scientific: 14, Social: 9, Global: 15 },
    { spatial: "Partial", Economic: 3, Environment: 6, Regulatory: 4, Human: 2, Scientific: 4, Social: 1, Global: 2 },
    { spatial: "Full", Economic: 2, Environment: 3, Regulatory: 2, Human: 1, Scientific: 2, Social: 0, Global: 1 }
];

// Prepare data for stacking
const keys = ["Economic", "Environment", "Regulatory", "Human", "Scientific", "Social", "Global"];
const stack = d3.stack().keys(keys);
const stackedData = stack(data);

// Set up SVG
const svg = d3.select("svg"),
    margin = { top: 20, right: 120, bottom: 50, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// Scales
const x = d3.scalePoint()
    .domain(data.map(d => d.spatial))
    .range([0, width])
    .padding(0.5);

const y = d3.scaleLinear()
    .domain([0, d3.max(stackedData, layer => d3.max(layer, d => d[1]))])
    .range([height, 0]);

const color = d3.scaleOrdinal()
    .domain(keys)
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"]);

// Area generator
const area = d3.area()
    .x(d => x(d.data.spatial))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]))
    .curve(d3.curveCatmullRom);

// Draw areas
g.selectAll(".area")
    .data(stackedData)
    .enter().append("path")
    .attr("class", "area")
    .attr("d", area)
    .attr("fill", d => color(d.key));

// X-axis
g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("fill", "#333") // Darker text for contrast
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .text("Spatial Jurisdiction");

// Y-axis
g.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("fill", "#333") // Darker text for contrast
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
    .data(keys)
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * 20)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", color);

legend.selectAll("text")
    .data(keys)
    .enter().append("text")
    .attr("x", 20)
    .attr("y", (d, i) => i * 20 + 12)
    .attr("fill", "#333") // Darker text for contrast
    .text(d => d);

// Export functions
function exportSVG() {
    const svgElement = document.querySelector("svg");
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    // Ensure background is included in SVG
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ocean_governance_stacked_area.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function exportPNG() {
    const svgElement = document.querySelector("svg");
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    // Ensure background is included
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Set canvas size to match SVG
    canvas.width = 800;
    canvas.height = 600;

    // Fill canvas with background color
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "ocean_governance_stacked_area.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}