const data = [
    { strategy: "Adaptive", coord: "Joint Prog.", value: 36 }, { strategy: "Adaptive", coord: "Policy Harm.", value: 32 },
    { strategy: "Adaptive", coord: "Cross-Sectoral", value: 29 }, { strategy: "Adaptive", coord: "Tech. Assist.", value: 20 },
    { strategy: "Adaptive", coord: "Data Sharing", value: 8 }, { strategy: "Evidence", coord: "Joint Prog.", value: 22 },
    { strategy: "Evidence", coord: "Policy Harm.", value: 19 }, { strategy: "Evidence", coord: "Cross-Sectoral", value: 18 },
    { strategy: "Evidence", coord: "Tech. Assist.", value: 13 }, { strategy: "Evidence", coord: "Data Sharing", value: 8 },
    { strategy: "Global", coord: "Joint Prog.", value: 39 }, { strategy: "Global", coord: "Policy Harm.", value: 34 },
    { strategy: "Global", coord: "Cross-Sectoral", value: 31 }, { strategy: "Global", coord: "Tech. Assist.", value: 22 },
    { strategy: "Global", coord: "Data Sharing", value: 10 }, { strategy: "Vision", coord: "Joint Prog.", value: 40 },
    { strategy: "Vision", coord: "Policy Harm.", value: 35 }, { strategy: "Vision", coord: "Cross-Sectoral", value: 32 },
    { strategy: "Vision", coord: "Tech. Assist.", value: 23 }, { strategy: "Vision", coord: "Data Sharing", value: 11 },
    { strategy: "Resource", coord: "Joint Prog.", value: 41 }, { strategy: "Resource", coord: "Policy Harm.", value: 36 },
    { strategy: "Resource", coord: "Cross-Sectoral", value: 33 }, { strategy: "Resource", coord: "Tech. Assist.", value: 23 },
    { strategy: "Resource", coord: "Data Sharing", value: 11 }
];

const svg = d3.select("svg").attr("width", 900).attr("height", 600),
    width = 900,
    height = 600,
    g = svg.append("g").attr("transform", "translate(100, 50)");

const hexbin = d3.hexbin()
    .radius(40)
    .extent([[0, 0], [width - 200, height - 100]]);

const x = d3.scaleBand()
    .domain(["Joint Prog.", "Policy Harm.", "Cross-Sectoral", "Tech. Assist.", "Data Sharing"])
    .range([0, width - 200]);
const y = d3.scaleBand()
    .domain(["Adaptive", "Evidence", "Global", "Vision", "Resource"])
    .range([0, height - 100]);
const color = d3.scaleSequential(d3.interpolateViridis).domain([0, 41]);

const hexData = data.map(d => [x(d.coord) + x.bandwidth() / 2, y(d.strategy) + y.bandwidth() / 2, d.value]);

g.selectAll(".hex")
    .data(hexbin(hexData))
    .enter().append("path")
    .attr("class", "hex")
    .attr("d", hexbin.hexagon())
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .attr("fill", d => color(d[0][2]));

g.selectAll(".label")
    .data(hexData)
    .enter().append("text")
    .attr("class", "label")
    .attr("x", d => d[0])
    .attr("y", d => d[1])
    .attr("dy", "0.35em")
    .text(d => d[2]);

g.selectAll(".x-label")
    .data(x.domain())
    .enter().append("text")
    .attr("class", "label")
    .attr("x", d => x(d) + x.bandwidth() / 2)
    .attr("y", -10)
    .text(d => d);

g.selectAll(".y-label")
    .data(y.domain())
    .enter().append("text")
    .attr("class", "label")
    .attr("x", -10)
    .attr("y", d => y(d) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", "end")
    .text(d => d);

function exportSVG() {
    const svgElement = svg.node();
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    svgString = svgString.replace('<svg', '<svg style="background: #f5f5f5"');
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "horizontal_coordination_hexmap.svg";
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
        link.download = "horizontal_coordination_hexmap.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}