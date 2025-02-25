const width =1000;
const height = 1400;
const margin = {top:180, right:180, bottom:120, left:220};

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);


const data = [
    { "Institution": "IOC", "Categories": "Ocean and Marine Science, International Cooperation and Coordination" },
    { "Institution": "FAO", "Categories": "Food Security, International Cooperation and Coordination" },
    { "Institution": "IMO Secretariat", "Categories": "Shipping and Maritime Law, International Cooperation and Coordination" },
    { "Institution": "UN DOALOS", "Categories": "International Law and Sustainable Marine Resource Management, Ocean and Marine Science" },
    { "Institution": "UNFCCC", "Categories": "Environmental Protection and Sustainable Development, International Cooperation and Coordination" },
    { "Institution": "ISA", "Categories": "Ocean and Marine Science, International Law and Sustainable Marine Resource Management" },
    { "Institution": "UNEP", "Categories": "Environmental Protection and Sustainable Development, International Cooperation and Coordination" },
    { "Institution": "UNDP", "Categories": "Humanitarian Affairs and Social Justice, International Cooperation and Coordination" },
    { "Institution": "UNCTAD", "Categories": "Economic and Trade Development, International Cooperation and Coordination" },
    { "Institution": "UNIDO", "Categories": "Industrial and Technological Development, Economic and Trade Development" },
    { "Institution": "ILO", "Categories": "Humanitarian Affairs and Social Justice, Economic and Trade Development" },
    { "Institution": "ITU", "Categories": "Telecommunication and Innovation, International Cooperation and Coordination" },
    { "Institution": "UNICEF", "Categories": "Humanitarian Affairs and Social Justice, International Cooperation and Coordination" },
    { "Institution": "WHO", "Categories": "Health and Human Rights, International Cooperation and Coordination" },
    { "Institution": "OHCHR", "Categories": "Humanitarian Affairs and Social Justice, International Cooperation and Coordination" },
    { "Institution": "UNDRR", "Categories": "Disaster Risk Reduction and Humanitarian Assistance, International Cooperation and Coordination" },
    { "Institution": "UN Global Compact", "Categories": "Economic and Trade Development, Gender Equality and Empowerment, International Cooperation and Coordination" },
    { "Institution": "IAEA", "Categories": "Industrial and Technological Development, International Cooperation and Coordination" },
    { "Institution": "WMO", "Categories": "Telecommunication and Innovation, Environmental Protection and Sustainable Development" },
    { "Institution": "OECD", "Categories": "Economic and Trade Development, Sustainable Development" },
    { "Institution": "WBG", "Categories": "Economic and Trade Development, Humanitarian Affairs and Social Justice" },
    { "Institution": "IMF", "Categories": "Economic and Trade Development, International Cooperation and Coordination" },
    { "Institution": "IHO", "Categories": "Shipping and Maritime Law, Ocean and Marine Science" },
    { "Institution": "ICES", "Categories": "Ocean and Marine Science, Environmental Protection and Sustainable Development" },
    { "Institution": "IPBES", "Categories": "Environmental Protection and Sustainable Development, Humanitarian Affairs and Social Justice" },
    { "Institution": "IPCC", "Categories": "Environmental Protection and Sustainable Development, Sustainable Development" },
    { "Institution": "WTO", "Categories": "Economic and Trade Development, International Cooperation and Coordination" },
    { "Institution": "IOM", "Categories": "Humanitarian Affairs and Social Justice, International Cooperation and Coordination" },
    { "Institution": "UNOPS", "Categories": "Disaster Risk Reduction and Humanitarian Assistance, International Cooperation and Coordination" },
    { "Institution": "UN-Women", "Categories": "Gender Equality and Empowerment, International Cooperation and Coordination" },
    { "Institution": "WIPO", "Categories": "Intellectual Property and Legal Harmonization, International Cooperation and Coordination" },
    { "Institution": "UNFPA", "Categories": "Health and Human Rights, Gender Equality and Empowerment" },
    { "Institution": "UN-Habitat", "Categories": "Environmental Protection and Sustainable Development, Sustainable Development" },
    { "Institution": "WFP", "Categories": "Food Security, Humanitarian Affairs and Social Justice" },
    { "Institution": "UNWTO", "Categories": "Economic and Trade Development, International Cooperation and Coordination" },
    { "Institution": "UNRISD", "Categories": "Humanitarian Affairs and Social Justice, Sustainable Development" },
    { "Institution": "BRS", "Categories": "Environmental Protection and Sustainable Development, International Cooperation and Coordination" },
    { "Institution": "CBD", "Categories": "Environmental Protection and Sustainable Development, International Law and Sustainable Marine Resource Management" },
    { "Institution": "CITES", "Categories": "Environmental Protection and Sustainable Development, International Cooperation and Coordination" },
    { "Institution": "CMS", "Categories": "Environmental Protection and Sustainable Development, International Cooperation and Coordination" },
    { "Institution": "IFAD", "Categories": "Food Security, Humanitarian Affairs and Social Justice" },
    { "Institution": "ITC", "Categories": "Food Security, Humanitarian Affairs and Social Justice" },
    { "Institution": "UNCCD", "Categories": "Food Security, Disaster Risk Reduction and Humanitarian Assistance" },
    { "Institution": "UNU", "Categories": "Industrial and Technological Development, Sustainable Development" },
    { "Institution": "Ramsar", "Categories": "Environmental Protection and Sustainable Development, International Cooperation and Coordination" },
    { "Institution": "Minamata", "Categories": "Environmental Protection and Sustainable Development, Health and Human Rights" },
    { "Institution": "UNOOSA", "Categories": "International Cooperation and Coordination, Telecommunication and Innovation" },
    { "Institution": "UNODC", "Categories": "International Cooperation and Coordination, Humanitarian Affairs and Social Justice" }
];

const categories = Array.from(new Set(data.flatMap(d => d.Categories.split(", "))));
const matrix = [];

categories.forEach(() => {
    const row = categories.map(() => 0);
    matrix.push(row);
});

data.forEach(institution => {
    const cats = institution.Categories.split(", ");
    for (let i = 0; i < cats.length; i++) {
        for (let j = i + 1; j < cats.length; j++) {
            const index1 = categories.indexOf(cats[i]);
            const index2 = categories.indexOf(cats[j]);
            matrix[index1][index2] += 1;
            matrix[index2][index1] += 1;
        }
    }
});

const chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending);

const chords = chord(matrix);

const color = d3.scaleOrdinal()
    .domain(categories)
    .range(d3.schemeCategory10);

const outerRadius = Math.min(width, height) * 0.5 - 40;
const innerRadius = outerRadius - 30;

const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

const ribbon = d3.ribbon()
    .radius(innerRadius);

// Draw chords
const chordPaths = svg.selectAll("path.chord")
    .data(chords)
    .enter().append("path")
    .attr("class", "chord")
    .attr("d", ribbon)
    .style("fill", d => color(categories[d.source.index]))
    .style("opacity", 0.6)
    .on("mouseover", function(event, d) {
        d3.select(this).style("opacity", 1);
        d3.select(".tooltip").transition()
            .duration(200)
            .style("opacity", .9);
        d3.select(".tooltip").html(`<strong>${categories[d.source.index]}</strong> - <strong>${categories[d.target.index]}</strong><br/>Co-occurrences: ${d.source.value}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function() {
        d3.select(this).style("opacity", 0.6);
        d3.select(".tooltip").transition()
            .duration(500)
            .style("opacity", 0);
    });

// Draw arcs
const groupPaths = svg.selectAll("g.group")
    .data(chords.groups)
    .enter().append("g")
    .attr("class", "group");

groupPaths.append("path")
    .attr("d", arc)
    .style("fill", d => color(categories[d.index]))
    .style("stroke", "#000")
    .style("stroke-width", ".5px");

// New labeling approach: Labels on top of the arc
groupPaths.append("text")
    .each(d => {
        d.angle = (d.startAngle + d.endAngle) / 2;
        d.textRadius = outerRadius + 7; // Adjust this value to place text further from the arc
    })
    .attr("x", d => d.textRadius * Math.sin(d.angle))
    .attr("y", d => -d.textRadius * Math.cos(d.angle)) // Negative because SVG y increases downward
    .attr("dy", "0.35em") // Vertical adjustment for text
    .text(d => {
        const category = categories[d.index];
        return category.length > 20 ? category.substring(0, 20) + "..." : category;
    })
    .style("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-weight", "bold");

// Title
svg.append("text")
    .attr("y", -height / 2 + 20)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Category Co-occurrence");

// Legend - No changes here, assuming the previous setup was fine or adjust as needed
const legend = svg.selectAll(".legend")
    .data(categories)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(${(i % 3) * 250 - 350},${height / 2 - 150 + Math.floor(i / 3) * 25})`);

legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", d => color(d));

legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .text(d => d.length > 30 ? d.substring(0, 30) + "..." : d)
    .style("font-size", "12px");

// Adjust SVG size to accommodate legend
d3.select("svg").attr("height", height + 100);

