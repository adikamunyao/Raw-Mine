const attrs = [
    { attr: "SubjMatter", Vertical: 42, Horizontal: 42 },
    { attr: "Source", Vertical: 3, Horizontal: 3 },
    { attr: "Objectives", Vertical: 40, Horizontal: 40 },
    { attr: "Strategies", Vertical: 31, Horizontal: 31 },
    { attr: "InterInst", Vertical: 42, Horizontal: 42 }
];

const svg = d3.select("svg").attr("width", 800).attr("height", 800),
    width = 800,
    height = 800,
    radius = Math.min(width, height) / 2 - 40,
    g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

const angle = d3.scaleBand().domain(attrs.map(d => d.attr)).range([0, 2 * Math.PI]);
const barHeight = d3.scaleLinear().domain([0, 43]).range([0, radius / 2]);
const color = d3.scaleSequential(d3.interpolatePlasma).domain([0, 43]);

["Vertical", "Horizontal"].forEach((coord, i) => {
    g.selectAll(`.ring-${coord}`).data(attrs)
        .enter().append("path")
        .attr("class", `ring ring-${coord}`)
        .attr("d", d => d3.arc()({ innerRadius: i === 0 ? 100 : 150, outerRadius: i === 0 ? 100 + barHeight(d[coord]) : 150 + barHeight(d[coord]), startAngle: angle(d.attr), endAngle: angle(d.attr) + angle.bandwidth() }))
        .attr("fill", d => color(d[coord]));
});

g.selectAll(".label").data(attrs).enter().append("text")
    .attr("class", "label")
    .attr("transform", d => `rotate(${(angle(d.attr) * 180 / Math.PI) - 90}) translate(${radius + 20},0) ${angle(d.attr) > Math.PI ? "rotate(180)" : ""}`)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => angle(d.attr) < Math.PI ? "start" : "end")
    .text(d => d.attr);

function exportSVG() {
    const svgElement = svg.node();
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "coordination_vs_features.svg";
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
        link.download = "coordination_vs_features.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}