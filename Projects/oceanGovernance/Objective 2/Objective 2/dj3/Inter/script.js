const data = {
    matrix: [
        [4, 3, 2, 2, 1, 0, 1], // Pre-1945
        [16, 11, 7, 8, 6, 8, 4], // 1945-1970
        [14, 4, 5, 4, 6, 8, 1], // 1971-1995
        [6, 3, 2, 1, 2, 6, 0]  // 1996-2025
    ],
    names: ["Pre-1945", "1945-1970", "1971-1995", "1996-2025", "UN System", "Economic", "Regulatory", "Scientific", "Environmental", "Multi-Stakeholder", "Regional"]
};

const svg = d3.select("svg").attr("width", 800).attr("height", 800),
    width = 800,
    height = 800,
    outerRadius = Math.min(width, height) * 0.5 - 40,
    innerRadius = outerRadius - 20;

const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
const chords = chord(data.matrix);
const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
const ribbon = d3.ribbon().radius(innerRadius);

const color = d3.scaleOrdinal()
    .domain(data.names)
    .range(["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#ff7f0e", "#ffbb78", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"]);

const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

g.append("g")
    .selectAll("path")
    .data(chords.groups)
    .enter().append("path")
    .attr("d", arc)
    .style("fill", d => color(data.names[d.index]))
    .style("stroke", "#fff");

g.append("g")
    .attr("class", "chord")
    .selectAll("path")
    .data(chords)
    .enter().append("path")
    .attr("d", ribbon)
    .style("fill", d => color(data.names[d.target.index]));

g.append("g")
    .selectAll("text")
    .data(chords.groups)
    .enter().append("text")
    .attr("class", "label")
    .attr("dy", d => d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 15 : -10)
    .attr("transform", d => {
        const angle = (d.startAngle + d.endAngle) / 2 * (180 / Math.PI);
        return `rotate(${angle - 90}) translate(${outerRadius + 20}) ${angle > 90 ? "rotate(180)" : ""}`;
    })
    .attr("text-anchor", d => d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? "start" : "end")
    .text(d => data.names[d.index]);

function exportSVG() {
    const svgElement = svg.node();
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "relationships_chord.svg";
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
        link.download = "relationships_chord.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}