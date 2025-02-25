// Data: Simplified from matrix (1 = present, 0 = absent) for 14 features, 49 IGOs
const features = ["Science-Policy", "Collaborative", "Network", "Adaptive", "Sociotechnical", "Mechanisms", "Systemic", "Cross-Boundary", "Stewardship", "Decision-Making", "Transparency", "Equity", "Resilience", "Institutional"];
const igos = ["IOC", "FAO", "IMO", "UN DOALOS", "UNFCCC", "ISA", "UNEP", "UNDP", "UNCTAD", "UNIDO", "ILO", "ITU", "UNICEF", "WHO", "OHCHR", "UNDRR", "UN Global Compact", "IAEA", "WMO", "OECD", "WBG", "IMF", "IHO", "ICES", "IPBES", "IPCC", "WTO", "IOM", "UNOPS", "UN-Women", "WIPO", "UNFPA", "UN-Habitat", "WFP", "UNWTO", "UNRISD", "BRS", "CBD", "CITES", "CMS", "IFAD", "ITC", "UNCCD", "UNU", "Ramsar", "Minamata", "UNOOSA", "UNODC"];
const data = [
    [1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,0,1,1,0,0,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,0],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
    [0,1,0,1,0,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,0,1,1,0,0,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,0],
    [1,1,0,1,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1],
    [1,0,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,1,0,0,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0,1,1,1,1,1,1],
    [1,1,1,1,0,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,1,0,0,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
    [1,1,0,1,0,0,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0,1,1,1,1,1,1]
];

const svg = d3.select("svg").attr("width", 1200).attr("height", 600),
    margin = { top: 80, right: 20, bottom: 60, left: 150 },
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// X-axis: IGOs
const x = d3.scaleBand().domain(igos).range([0, width]).padding(0.05);

// Y-axis: Features
const y = d3.scaleBand().domain(features).range([0, height]).padding(0.05);

// Color scale: 0 (blue) to 1 (red)
const color = d3.scaleLinear().domain([0, 1]).range(["#1f77b4", "#d62728"]);

// Cells: Color blocks for each feature-IGO pair
g.selectAll(".cell")
    .data(data.flatMap((row, i) => row.map((value, j) => ({ feature: features[i], igo: igos[j], value }))))
    .enter().append("rect")
    .attr("class", "cell")
    .attr("x", d => x(d.igo))
    .attr("y", d => y(d.feature))
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .attr("fill", d => color(d.value));

// X-axis: IGO names (tilted)
g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end");

// Y-axis: Feature names
g.append("g").call(d3.axisLeft(y));

// Legend: Color scale explanation
const legend = g.append("g").attr("transform", "translate(0, -60)");
legend.append("text").attr("x", 0).attr("y", 0).text("Feature Presence").attr("font-weight", "bold");
[0, 1].forEach((val, i) => {
    legend.append("rect").attr("x", i * 50).attr("y", 10).attr("width", 15).attr("height", 15).attr("fill", color(val));
    legend.append("text").attr("x", i * 50 + 20).attr("y", 22).text(val === 0 ? "Not" : "Yes");
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
    link.download = "feature_distribution_heatmap.svg";
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
    canvas.width = 1200;
    canvas.height = 600;
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 1200, 600);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "feature_distribution_heatmap.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}