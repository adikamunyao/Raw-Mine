const timeBins = [
    { bin: "Pre-1945", Indirect: 2, SubjMatter: 5, Source: 0, Objectives: 4, Strategies: 4, InterInst: 5, Vertical: 5, Horizontal: 5 },
    { bin: "1945-1970", Indirect: 8, SubjMatter: 15, Source: 2, Objectives: 16, Strategies: 11, InterInst: 15, Vertical: 14, Horizontal: 16 },
    { bin: "1971-1995", Indirect: 8, SubjMatter: 15, Source: 0, Objectives: 13, Strategies: 11, InterInst: 15, Vertical: 14, Horizontal: 15 },
    { bin: "1996-2025", Indirect: 6, SubjMatter: 7, Source: 1, Objectives: 7, Strategies: 5, InterInst: 7, Vertical: 8, Horizontal: 7 }
];
const attrs = ["Indirect", "SubjMatter", "Source", "Objectives", "Strategies", "InterInst", "Vertical", "Horizontal"];

const svg = d3.select("svg").attr("width", 800).attr("height", 800),
    width = 800,
    height = 800,
    radius = Math.min(width, height) / 2 - 40,
    g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

const angle = d3.scaleBand().domain(attrs).range([0, 2 * Math.PI]);
const timeScale = d3.scaleBand().domain(timeBins.map(d => d.bin)).range([0, radius]);
const barHeight = d3.scaleLinear().domain([0, 19]).range([0, timeScale.bandwidth()]);
const color = d3.scaleSequential(d3.interpolateViridis).domain([0, 19]);

timeBins.forEach((bin, i) => {
    g.selectAll(`.petal-${i}`).data(Object.entries(bin).slice(1))
        .enter().append("path")
        .attr("class", `petal petal-${i}`)
        .attr("d", d => d3.arc()({ innerRadius: timeScale(bin.bin), outerRadius: timeScale(bin.bin) + barHeight(d[1]), startAngle: angle(d[0]), endAngle: angle(d[0]) + angle.bandwidth() }))
        .attr("fill", d => color(d[1]));
});

g.selectAll(".label").data(attrs).enter().append("text")
    .attr("class", "label")
    .attr("transform", d => `rotate(${(angle(d) * 180 / Math.PI) - 90}) translate(${radius + 20},0) ${angle(d) > Math.PI ? "rotate(180)" : ""}`)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => angle(d) < Math.PI ? "start" : "end")
    .text(d => d);

// Legend
const legend = g.append("g").attr("transform", "translate(-350, -300)");
legend.append("text").attr("x", 0).attr("y", 0).text("Count of IGOs").attr("font-weight", "bold");
[0, 5, 10, 15, 19].forEach((val, i) => {
    legend.append("rect").attr("x", 0).attr("y", i * 20 + 10).attr("width", 15).attr("height", 15).attr("fill", color(val));
    legend.append("text").attr("x", 20).attr("y", i * 20 + 22).text(val);
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
    link.download = "features_by_time.svg";
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
        link.download = "features_by_time.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}