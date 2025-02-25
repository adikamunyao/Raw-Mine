const data = [
    { attr: "Indirect", Direct: 0, Indirect: 24 }, { attr: "SubjMatter", Direct: 14, Indirect: 28 },
    { attr: "Source", Direct: 0, Indirect: 3 }, { attr: "Objectives", Direct: 14, Indirect: 26 },
    { attr: "Strategies", Direct: 11, Indirect: 20 }, { attr: "InterInst", Direct: 14, Indirect: 28 },
    { attr: "Vertical", Direct: 14, Indirect: 28 }, { attr: "Horizontal", Direct: 14, Indirect: 29 }
];

const svg = d3.select("svg").attr("width", 900).attr("height", 600),
    width = 900,
    height = 600,
    g = svg.append("g").attr("transform", "translate(50, 50)");

const hexbin = d3.hexbin().radius(40);
const x = d3.scaleBand().domain(data.map(d => d.attr)).range([0, width - 100]);
const y = d3.scaleLinear().domain([0, 35]).range([0, height - 100]);
const color = d3.scaleOrdinal().range(["#ff7f0e", "#1f77b4"]);

g.selectAll(".hex-direct").data(data).enter().append("path")
    .attr("class", "hex")
    .attr("d", hexbin.hexagon())
    .attr("transform", d => `translate(${x(d.attr) + x.bandwidth() / 2},${y(d.Direct)})`)
    .attr("fill", color(0));

g.selectAll(".hex-indirect").data(data).enter().append("path")
    .attr("class", "hex")
    .attr("d", hexbin.hexagon())
    .attr("transform", d => `translate(${x(d.attr) + x.bandwidth() / 2},${y(d.Direct) + y(d.Indirect)})`)
    .attr("fill", color(1));

g.selectAll(".label").data(data).enter().append("text")
    .attr("class", "label")
    .attr("x", d => x(d.attr) + x.bandwidth() / 2)
    .attr("y", d => y(d.Direct + d.Indirect) + 15)
    .attr("dy", "0.35em")
    .text(d => `${d.Direct}/${d.Indirect}`);

g.selectAll(".x-label").data(data).enter().append("text")
    .attr("x", d => x(d.attr) + x.bandwidth() / 2)
    .attr("y", -10)
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
    link.download = "spatial_vs_features.svg";
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
        link.download = "spatial_vs_features.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}