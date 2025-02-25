const data = [
    { spatial: "Direct", name: "Nat. Policy", value: 14 }, { spatial: "Direct", name: "Capacity", value: 14 },
    { spatial: "Direct", name: "Monitoring", value: 11 }, { spatial: "Direct", name: "Local Exec.", value: 8 },
    { spatial: "Direct", name: "Funding", value: 2 }, { spatial: "Indirect", name: "Nat. Policy", value: 31 },
    { spatial: "Indirect", name: "Capacity", value: 29 }, { spatial: "Indirect", name: "Monitoring", value: 23 },
    { spatial: "Indirect", name: "Local Exec.", value: 6 }, { spatial: "Indirect", name: "Funding", value: 6 }
];

const svg = d3.select("svg").attr("width", 800).attr("height", 800),
    width = 800,
    height = 800,
    radius = Math.min(width, height) / 2 - 40,
    g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

const angle = d3.scaleBand()
    .domain(["Nat. Policy", "Capacity", "Monitoring", "Local Exec.", "Funding"])
    .range([0, 2 * Math.PI]);
const radial = d3.scaleBand()
    .domain(["Direct", "Indirect"])
    .range([radius / 2, radius]);
const color = d3.scaleSequential(d3.interpolateViridis).domain([0, 35]);

const arc = d3.arc()
    .innerRadius(d => radial(d.spatial))
    .outerRadius(d => radial(d.spatial) + radial.bandwidth())
    .startAngle(d => angle(d.name))
    .endAngle(d => angle(d.name) + angle.bandwidth());

g.selectAll(".arc")
    .data(data)
    .enter().append("path")
    .attr("class", "arc")
    .attr("d", arc)
    .attr("fill", d => color(d.value));

g.selectAll(".label")
    .data(data)
    .enter().append("text")
    .attr("class", "label")
    .attr("transform", d => {
        const a = angle(d.name) + angle.bandwidth() / 2;
        const r = radial(d.spatial) + radial.bandwidth() / 2;
        return `rotate(${a * 180 / Math.PI - 90}) translate(${r},0) ${a > Math.PI ? "rotate(180)" : ""}`;
    })
    .attr("dy", "0.35em")
    .attr("text-anchor", d => angle(d.name) + angle.bandwidth() / 2 < Math.PI ? "start" : "end")
    .text(d => `${d.name.slice(0, 3)}: ${d.value}`);

function exportSVG() {
    const svgElement = svg.node();
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vertical_coordination_donut.svg";
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
        link.download = "vertical_coordination_donut.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}