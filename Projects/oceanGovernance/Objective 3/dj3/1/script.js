const data = [
    { institution: "IOC", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "FAO", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "IMO Secretariat", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UN DOALOS", spatial: "No", subject: "Yes", source: "No", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNFCCC", spatial: "Yes", subject: "Yes", source: "No", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "ISA", spatial: "No", subject: "Yes", source: "No", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNEP", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNDP", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNCTAD", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNIDO", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "ILO", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "ITU", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNICEF", spatial: "Yes", subject: "Yes", source: "No", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "WHO", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "OHCHR", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNDRR", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UN Global Compact", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "IAEA", spatial: "Yes", subject: "Yes", source: "No", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "WMO", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "OECD", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "WBG", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "IMF", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "IHO", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "ICES", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "IPBES", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "IPCC", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "WTO", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "IOM", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNOPS", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UN-Women", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "WIPO", spatial: "No", subject: "No", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNFPA", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UN-Habitat", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "WFP", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNWTO", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNRISD", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "BRS", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "CBD", spatial: "Yes", subject: "Yes", source: "No", objectives: "Yes", strategies: "No", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "CITES", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "CMS", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "IFAD", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "ITC", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNCCD", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNU", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "Ramsar", spatial: "Yes", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "Minamata", spatial: "Yes", subject: "Yes", source: "No", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNOOSA", spatial: "Yes", subject: "Yes", source: "No", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" },
    { institution: "UNODC", spatial: "No", subject: "Yes", source: "Yes", objectives: "Yes", strategies: "Yes", relationship: "Yes", vertical: "Yes", horizontal: "Yes" }
];

const attributes = [
    "Spatial Jurisdiction", "Subject Matter Jurisdiction", "Source of Jurisdiction",
    "Defined Objectives", "Strategies", "Defined inter-institutional Relationship",
    "Vertical Practical-Coordination", "Horizontal Practical- Coordination"
];

const matrix = [];
const allNodes = [...data.map(d => d.institution), ...attributes];

allNodes.forEach((_, i) => {
    matrix[i] = new Array(allNodes.length).fill(0);
});

data.forEach(d => {
    const instIndex = allNodes.indexOf(d.institution);
    attributes.forEach((attr, attrIndex) => {
        if (d[attr.toLowerCase().replace(/ /g, '')] === "Yes") {
            const attrFullIndex = allNodes.indexOf(attr);
            matrix[instIndex][attrFullIndex] = 1;
            matrix[attrFullIndex][instIndex] = 1; // symmetric matrix for chord
        }
    });
});

const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    outerRadius = Math.min(width, height) * 0.5 - 40,
    innerRadius = outerRadius - 30;

const chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending);

const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

const ribbon = d3.ribbon()
    .radius(innerRadius);

const color = d3.scaleOrdinal(d3.schemeCategory10);

const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

const chords = chord(matrix);

const tooltip = d3.select('.tooltip');

// Interactive groups for each arc
const group = g.append("g")
    .selectAll("g")
    .data(chords.groups)
    .enter().append("g");

group.append("path")
    .style("fill", d => color(allNodes[d.index]))
    .style("stroke", d => d3.rgb(color(allNodes[d.index])).darker())
    .attr("d", arc)
    .on("mouseover", fade(0.1))
    .on("mouseout", fade(1))
    .on("mousemove", function(event, d) {
        tooltip.style("opacity", 1)
            .html(allNodes[d.index])
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseleave", () => tooltip.style("opacity", 0));

// Add labels for arcs
group.append("text")
    .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
    .attr("dy", ".35em")
    .attr("transform", d => {
        return `rotate(${(d.angle * 180 / Math.PI - 90)})
                translate(${outerRadius + 10})
                ${d.angle > Math.PI ? "rotate(180)" : ""}`;
    })
    .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
    .text(d => allNodes[d.index]);

// Interactive chords
g.append("g")
    .attr("class", "chord")
    .selectAll("path")
    .data(chords)
    .enter().append("path")
    .attr("d", ribbon)
    .style("fill", d => color(allNodes[d.source.index]))
    .style("opacity", 0.8)
    .on("mouseover", fade(0.1))
    .on("mouseout", fade(1))
    .on("mousemove", function(event, d) {
        tooltip.style("opacity", 1)
            .html(`${allNodes[d.source.index]} &harr; ${allNodes[d.target.index]}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseleave", () => tooltip.style("opacity", 0));

// Fade function for interactivity
function fade(opacity) {
    return function(event, d) {
        svg.selectAll("path.chord")
            .filter(function(data) {
                return data.source.index !== d.index && data.target.index !== d.index;
            })
            .transition()
            .style("opacity", opacity);
    };
}