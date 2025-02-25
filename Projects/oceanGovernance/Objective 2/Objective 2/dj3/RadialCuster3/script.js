// Data
const timeBins = [
    { bin: "Pre-1945", data: {
        Direct: { Strategies: { Adaptive: 4, Evidence: 2, Global: 2, Vision: 2, Resource: 2 }, Objectives: { Economic: 1, Governance: 2, Human: 1, Knowledge: 2, Conservation: 1 } },
        Indirect: { Strategies: { Adaptive: 0, Evidence: 1, Global: 3, Vision: 3, Resource: 3 }, Objectives: { Economic: 2, Governance: 3, Human: 0, Knowledge: 1, Conservation: 0 } }
    }},
    { bin: "1945-1970", data: {
        Direct: { Strategies: { Adaptive: 6, Evidence: 5, Global: 6, Vision: 6, Resource: 6 }, Objectives: { Economic: 4, Governance: 6, Human: 2, Knowledge: 4, Conservation: 4 } },
        Indirect: { Strategies: { Adaptive: 10, Evidence: 7, Global: 12, Vision: 13, Resource: 13 }, Objectives: { Economic: 7, Governance: 13, Human: 5, Knowledge: 7, Conservation: 3 } }
    }},
    { bin: "1971-1995", data: {
        Direct: { Strategies: { Adaptive: 4, Evidence: 3, Global: 4, Vision: 4, Resource: 4 }, Objectives: { Economic: 2, Governance: 4, Human: 2, Knowledge: 2, Conservation: 4 } },
        Indirect: { Strategies: { Adaptive: 10, Evidence: 7, Global: 11, Vision: 12, Resource: 13 }, Objectives: { Economic: 6, Governance: 13, Human: 5, Knowledge: 4, Conservation: 4 } }
    }},
    { bin: "1996-2025", data: {
        Direct: { Strategies: { Adaptive: 2, Evidence: 1, Global: 2, Vision: 2, Resource: 2 }, Objectives: { Economic: 1, Governance: 2, Human: 2, Knowledge: 0, Conservation: 2 } },
        Indirect: { Strategies: { Adaptive: 5, Evidence: 1, Global: 6, Vision: 5, Resource: 6 }, Objectives: { Economic: 2, Governance: 6, Human: 3, Knowledge: 2, Conservation: 2 } }
    }}
];

// Set up SVG
const svg = d3.select("svg").attr("width", 900).attr("height", 900),
    width = 900,
    height = 900,
    radius = Math.min(width, height) / 2 - 40,
    g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

// Scales
const angle = d3.scaleBand()
    .domain(["Adaptive", "Evidence", "Global", "Vision", "Resource", "Economic", "Governance", "Human", "Knowledge", "Conservation"])
    .range([0, 2 * Math.PI]);
const radial = d3.scaleBand()
    .domain(["Direct_Strategies", "Indirect_Strategies", "Direct_Objectives", "Indirect_Objectives"])
    .range([0, radius]);
const color = d3.scaleSequential(d3.interpolateViridis).domain([0, 19]);

// Arc generator
const arc = d3.arc()
    .innerRadius(d => radial(d.spatial + "_" + d.type))
    .outerRadius(d => radial(d.spatial + "_" + d.type) + radial.bandwidth())
    .startAngle(d => angle(d.name))
    .endAngle(d => angle(d.name) + angle.bandwidth());

// Animation function
function update(binIndex) {
    const currentData = [];
    const binData = timeBins[binIndex].data;
    ["Direct", "Indirect"].forEach(spatial => {
        ["Strategies", "Objectives"].forEach(type => {
            Object.entries(binData[spatial][type]).forEach(([name, value]) => {
                currentData.push({ spatial, type, name, value });
            });
        });
    });

    // Segments
    const segments = g.selectAll(".segment")
        .data(currentData, d => `${d.spatial}_${d.type}_${d.name}`);

    segments.exit().transition().duration(500).attr("opacity", 0).remove();

    segments.enter().append("path")
        .attr("class", "segment")
        .attr("d", arc)
        .attr("opacity", 0)
        .merge(segments)
        .transition().duration(1000)
        .attr("fill", d => color(d.value))
        .attr("opacity", 1);

    // Labels
    const labels = g.selectAll(".label")
        .data(currentData, d => `${d.spatial}_${d.type}_${d.name}`);

    labels.exit().remove();

    labels.enter().append("text")
        .attr("class", "label")
        .merge(labels)
        .transition().duration(1000)
        .attr("transform", d => {
            const a = angle(d.name) + angle.bandwidth() / 2;
            const r = radial(`${d.spatial}_${d.type}`) + radial.bandwidth() / 2;
            return `rotate(${a * 180 / Math.PI - 90}) translate(${r},0) ${a > Math.PI ? "rotate(180)" : ""}`;
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", d => angle(d.name) + angle.bandwidth() / 2 < Math.PI ? "start" : "end")
        .text(d => `${d.name.slice(0, 3)}: ${d.value}`);

    // Bin label
    g.selectAll(".bin-label").remove();
    g.append("text")
        .attr("class", "bin-label")
        .attr("x", 0)
        .attr("y", -radius - 10)
        .text(timeBins[binIndex].bin);
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
    link.download = "all_dimensions_radial_cluster.svg";
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
        link.download = "all_dimensions_radial_cluster.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}