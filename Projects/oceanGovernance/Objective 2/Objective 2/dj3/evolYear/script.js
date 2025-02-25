// Data
const data = [
    { institution: "WTO", year: 1995, subjects: ["Economic Development and Trade", "Regulatory and Legal Oversight"] },
    { institution: "WMO", year: 1947, subjects: ["Scientific and Technical Domains", "Environmental Protection and Sustainability", "Global and Emerging Challenges"] },
    { institution: "WIPO", year: 1967, subjects: ["Economic Development and Trade", "Regulatory and Legal Oversight"] },
    { institution: "WHO", year: 1948, subjects: ["Human Welfare and Rights", "Scientific and Technical Domains", "Regulatory and Legal Oversight"] },
    { institution: "WFP", year: 1961, subjects: ["Human Welfare and Rights", "Global and Emerging Challenges"] },
    { institution: "WBG", year: 1944, subjects: ["Economic Development and Trade", "Global and Emerging Challenges"] },
    { institution: "UNWTO", year: 1946, subjects: ["Economic Development and Trade", "Environmental Protection and Sustainability"] },
    { institution: "UNU", year: 1972, subjects: ["Scientific and Technical Domains", "Economic Development and Trade", "Environmental Protection and Sustainability", "Global and Emerging Challenges"] },
    { institution: "UNRISD", year: 1963, subjects: ["Scientific and Technical Domains", "Social Equity and Inclusion"] },
    { institution: "UNOPS", year: 1994, subjects: ["Economic Development and Trade", "Human Welfare and Rights", "Environmental Protection and Sustainability"] },
    { institution: "UNOOSA", year: 1958, subjects: ["Scientific and Technical Domains", "Global and Emerging Challenges", "Regulatory and Legal Oversight"] },
    { institution: "UNODC", year: 1997, subjects: ["Regulatory and Legal Oversight", "Human Welfare and Rights", "Global and Emerging Challenges"] },
    { institution: "UNIDO", year: 1966, subjects: ["Economic Development and Trade", "Scientific and Technical Domains"] },
    { institution: "UNICEF", year: 1953, subjects: ["Human Welfare and Rights", "Social Equity and Inclusion"] },
    { institution: "UNFPA", year: 1967, subjects: ["Human Welfare and Rights", "Social Equity and Inclusion", "Global and Emerging Challenges"] },
    { institution: "UNFCC", year: 1992, subjects: ["Global and Emerging Challenges", "Regulatory and Legal Oversight"] },
    { institution: "UNEP", year: 1972, subjects: ["Environmental Protection and Sustainability", "Regulatory and Legal Oversight", "Global and Emerging Challenges"] },
    { institution: "UNDRR", year: 1999, subjects: ["Global and Emerging Challenges", "Regulatory and Legal Oversight"] },
    { institution: "UNDP", year: 1965, subjects: ["Economic Development and Trade", "Social Equity and Inclusion", "Environmental Protection and Sustainability", "Global and Emerging Challenges"] },
    { institution: "UNCTAD", year: 1964, subjects: ["Economic Development and Trade", "Regulatory and Legal Oversight"] },
    { institution: "UNCCD", year: 1994, subjects: ["Environmental Protection and Sustainability", "Global and Emerging Challenges"] },
    { institution: "UN-Women", year: 2010, subjects: ["Social Equity and Inclusion", "Regulatory and Legal Oversight"] },
    { institution: "UN-Habitat", year: 1977, subjects: ["Economic Development and Trade", "Social Equity and Inclusion", "Environmental Protection and Sustainability"] },
    { institution: "UN Global Compact", year: 2000, subjects: ["Economic Development and Trade", "Social Equity and Inclusion", "Environmental Protection and Sustainability"] },
    { institution: "UN DOALOS", year: 1992, subjects: ["Regulatory and Legal Oversight", "Environmental Protection and Sustainability"] },
    { institution: "Ramsar", year: 1971, subjects: ["Environmental Protection and Sustainability"] },
    { institution: "OHCHR", year: 1993, subjects: ["Human Welfare and Rights", "Social Equity and Inclusion", "Regulatory and Legal Oversight"] },
    { institution: "OECD", year: 1961, subjects: ["Economic Development and Trade", "Regulatory and Legal Oversight"] },
    { institution: "Minamata", year: 2013, subjects: ["Regulatory and Legal Oversight", "Environmental Protection and Sustainability", "Human Welfare and Rights"] },
    { institution: "ITU", year: 1865, subjects: ["Scientific and Technical Domains", "Regulatory and Legal Oversight"] },
    { institution: "ITC", year: 1964, subjects: ["Economic Development and Trade"] },
    { institution: "ISA", year: 1994, subjects: ["Regulatory and Legal Oversight", "Environmental Protection and Sustainability"] },
    { institution: "IPCC", year: 1988, subjects: ["Scientific and Technical Domains", "Global and Emerging Challenges"] },
    { institution: "IPBES", year: 2012, subjects: ["Scientific and Technical Domains", "Environmental Protection and Sustainability"] },
    { institution: "IOM", year: 1951, subjects: ["Social Equity and Inclusion", "Regulatory and Legal Oversight"] },
    { institution: "IOC", year: 1960, subjects: ["Scientific and Technical Domains", "Environmental Protection and Sustainability", "Global and Emerging Challenges"] },
    { institution: "IMO Secretariat", year: 1948, subjects: ["Regulatory and Legal Oversight", "Environmental Protection and Sustainability", "Scientific and Technical Domains"] },
    { institution: "IMF", year: 1944, subjects: ["Economic Development and Trade", "Regulatory and Legal Oversight"] },
    { institution: "ILO", year: 1919, subjects: ["Human Welfare and Rights", "Regulatory and Legal Oversight", "Social Equity and Inclusion"] },
    { institution: "IHO", year: 1921, subjects: ["Scientific and Technical Domains", "Regulatory and Legal Oversight", "Environmental Protection and Sustainability"] },
    { institution: "IFAD", year: 1976, subjects: ["Human Welfare and Rights", "Economic Development and Trade", "Environmental Protection and Sustainability"] },
    { institution: "ICES", year: 1902, subjects: ["Scientific and Technical Domains", "Environmental Protection and Sustainability"] },
    { institution: "IAEA", year: 1957, subjects: ["Scientific and Technical Domains", "Regulatory and Legal Oversight"] },
    { institution: "FAO", year: 1945, subjects: ["Human Welfare and Rights", "Economic Development and Trade", "Environmental Protection and Sustainability"] },
    { institution: "CMS", year: 1983, subjects: ["Environmental Protection and Sustainability", "Scientific and Technical Domains"] },
    { institution: "CITES", year: 1973, subjects: ["Regulatory and Legal Oversight", "Environmental Protection and Sustainability"] },
    { institution: "CBD", year: 1992, subjects: ["Environmental Protection and Sustainability", "Scientific and Technical Domains"] },
    { institution: "BRS", year: 2012, subjects: ["Regulatory and Legal Oversight", "Environmental Protection and Sustainability"] }
];

// Assign dominant subject (first listed) and count subjects
data.forEach(d => {
    d.dominantSubject = d.subjects[0];
    d.subjectCount = d.subjects.length;
});

// Set up SVG
const svg = d3.select("svg")
    .attr("width", 900)
    .attr("height", 600),
    margin = { top: 20, right: 120, bottom: 50, left: 50 },
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// Scales
const x = d3.scaleLinear()
    .domain([1860, 2020])
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, 5]) // Max subject count is 4, add buffer
    .range([height, 0]);

const color = d3.scaleOrdinal()
    .domain(["Economic Development and Trade", "Environmental Protection and Sustainability", "Regulatory and Legal Oversight", "Human Welfare and Rights", "Scientific and Technical Domains", "Social Equity and Inclusion", "Global and Emerging Challenges"])
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"]);

const size = d3.scaleSqrt()
    .domain([1, 4])
    .range([5, 15]);

// Dots
g.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.subjectCount))
    .attr("r", d => size(d.subjectCount))
    .attr("fill", d => color(d.dominantSubject))
    .append("title")
    .text(d => `${d.institution} (${d.year}): ${d.subjects.join(", ")}`);

// X-axis
g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")))
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
    .text("Number of Subject Matters");

// Legend
const legend = g.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width + 10}, 0)`);

legend.selectAll("rect")
    .data(color.domain())
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * 20)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", color);

legend.selectAll("text")
    .data(color.domain())
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
    link.download = "subject_matter_evolution.svg";
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
        link.download = "subject_matter_evolution.png";
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