const width = 1200;
const height = 1000;
const margin = {top: 50, right: 50, bottom:150, left: 150};

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const data = [
    { "Organization": "IOC", "Source of Jurisdiction": "Statutes, Constitutions, Treaties, Resolutions" },
    { "Organization": "FAO", "Source of Jurisdiction": "Constitutions, Treaties, International Law" },
    { "Organization": "IMO", "Source of Jurisdiction": "Treaties, Conventions, International Law" },
    { "Organization": "UN DOALOS", "Source of Jurisdiction": "Treaties, Agreements, International Law" },
    { "Organization": "UNFCCC", "Source of Jurisdiction": "Treaties, Agreements" },
    { "Organization": "ISA", "Source of Jurisdiction": "Treaties, Agreements" },
    { "Organization": "UNEP", "Source of Jurisdiction": "Resolutions, International Law" },
    { "Organization": "UNDP", "Source of Jurisdiction": "Resolutions, Constitutions, Treaties" },
    { "Organization": "UNCTAD", "Source of Jurisdiction": "Resolutions, Treaties" },
    { "Organization": "UNIDO", "Source of Jurisdiction": "Constitutions, Treaties" },
    { "Organization": "ILO", "Source of Jurisdiction": "Statutes, Constitutions, Treaties, Resolutions" },
    { "Organization": "ITU", "Source of Jurisdiction": "Constitutions, Conventions, Resolutions" },
    { "Organization": "UNICEF", "Source of Jurisdiction": "Resolutions, Treaties, International Law" },
    { "Organization": "WHO", "Source of Jurisdiction": "Constitutions, Treaties, International Law" },
    { "Organization": "OHCHR", "Source of Jurisdiction": "Constitutions, Resolutions, International Law" },
    { "Organization": "UNDRR", "Source of Jurisdiction": "Resolutions, Agreements, International Law" },
    { "Organization": "UN Global Compact", "Source of Jurisdiction": "Resolutions, International Law" },
    { "Organization": "IAEA", "Source of Jurisdiction": "Statutes, Treaties, International Law" },
    { "Organization": "WMO", "Source of Jurisdiction": "Conventions, Resolutions, International Law" },
    { "Organization": "OECD", "Source of Jurisdiction": "Treaties, Agreements, International Law" },
    { "Organization": "WBG", "Source of Jurisdiction": "Constitutions, Statutes" },
    { "Organization": "IMF", "Source of Jurisdiction": "Constitutions, Treaties, International Law" },
    { "Organization": "IHO", "Source of Jurisdiction": "Conventions, Treaties" },
    { "Organization": "ICES", "Source of Jurisdiction": "Conventions, Treaties" },
    { "Organization": "IPBES", "Source of Jurisdiction": "Agreements, Treaties" },
    { "Organization": "IPCC", "Source of Jurisdiction": "Treaties, International Law" },
    { "Organization": "WTO", "Source of Jurisdiction": "Treaties, Agreements, International Law" },
    { "Organization": "IOM", "Source of Jurisdiction": "Constitutions, Resolutions, Treaties, International Law" },
    { "Organization": "UNOPS", "Source of Jurisdiction": "Resolutions, Constitutions, Agreements" },
    { "Organization": "UN-Women", "Source of Jurisdiction": "Resolutions, Treaties, Agreements" },
    { "Organization": "WIPO", "Source of Jurisdiction": "Treaties, Conventions" },
    { "Organization": "UNFPA", "Source of Jurisdiction": "Resolutions, Treaties" },
    { "Organization": "UN-Habitat", "Source of Jurisdiction": "Resolutions, Agreements, Treaties" },
    { "Organization": "WFP", "Source of Jurisdiction": "Resolutions, Constitutions" },
    { "Organization": "UNWTO", "Source of Jurisdiction": "Statutes, Resolutions" },
    { "Organization": "UNRISD", "Source of Jurisdiction": "Resolutions, Constitutions" },
    { "Organization": "BRS", "Source of Jurisdiction": "Treaties, International Law" },
    { "Organization": "CBD", "Source of Jurisdiction": "Treaties, International Law" },
    { "Organization": "CITES", "Source of Jurisdiction": "Treaties" },
    { "Organization": "CMS", "Source of Jurisdiction": "Treaties" },
    { "Organization": "IFAD", "Source of Jurisdiction": "Agreements, Resolutions" },
    { "Organization": "ITC", "Source of Jurisdiction": "Treaties" },
    { "Organization": "UNCCD", "Source of Jurisdiction": "Treaties, International Law" },
    { "Organization": "UNU", "Source of Jurisdiction": "Constitutions, Resolutions" },
    { "Organization": "Ramsar", "Source of Jurisdiction": "Treaties" },
    { "Organization": "Minamata", "Source of Jurisdiction": "Treaties" },
    { "Organization": "UNOOSA", "Source of Jurisdiction": "Resolutions, Constitutions" },
    { "Organization": "UNODC", "Source of Jurisdiction": "Resolutions, Treaties" }
];

// Extract all unique jurisdiction sources
const allSources = Array.from(new Set(data.flatMap(d => d["Source of Jurisdiction"].split(", "))));

// Prepare data for matrix
const matrix = data.map(d => {
    const sources = d["Source of Jurisdiction"].split(", ");
    return {
        organization: d.Organization,
        data: allSources.map(source => sources.includes(source) ? 1 : 0)
    };
});

// Define scales
const x = d3.scaleBand()
    .domain(allSources)
    .range([0, width - margin.left - margin.right])
    .padding(0.05);

const y = d3.scaleBand()
    .domain(data.map(d => d.Organization))
    .range([0, height - margin.top - margin.bottom])
    .padding(0.05);

// Define color scale
const color = d3.scaleSequential(d3.interpolateCool)
    .domain([0, 1]);

// Create cells
const cells = svg.selectAll(".cell")
    .data(matrix.flatMap(d => d.data.map((value, i) => ({x: i, y: d.organization, value}))))
    .enter().append("rect")
    .attr("class", "cell")
    .attr("x", d => x(allSources[d.x]))
    .attr("y", d => y(d.y))
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .attr("fill", d => color(d.value))
    .on("mouseover", function(event, d) {
        d3.select(this).style("stroke", "black").style("stroke-width", 2);
        d3.select(".tooltip").transition().duration(200).style("opacity", .9);
        d3.select(".tooltip").html(`<strong>${d.y}</strong><br>${allSources[d.x]}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function() {
        d3.select(this).style("stroke", "white").style("stroke-width", 0);
        d3.select(".tooltip").transition().duration(500).style("opacity", 0);
    });

// Add x-axis labels with better rotation
svg.append("g")
    .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
    .call(d3.axisBottom(x).tickSize(0))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)")
    .style("font-size", "12px");

// Add y-axis labels with a clear font style
svg.append("g")
    .call(d3.axisLeft(y).tickSize(0))
    .style("font-size", "12px");

// Title
svg.append("text")
    .attr("x", (width - margin.left - margin.right) / 2)
    .attr("y", -margin.top / 2)
    .attr("class", "title")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Source of Jurisdiction for Organizations");

// Add gridlines
svg.append("g")
    .attr("class", "grid")
    .selectAll(".grid-line")
    .data(allSources)
    .enter().append("line")
    .attr("class", "grid-line")
    .attr("x1", d => x(d) + x.bandwidth() / 2)
    .attr("y1", 0)
    .attr("x2", d => x(d) + x.bandwidth() / 2)
    .attr("y2", height - margin.top - margin.bottom)
    .style("stroke", "#ccc")
    .style("stroke-dasharray", "4");

svg.append("g")
    .attr("class", "grid")
    .selectAll(".grid-line")
    .data(data)
    .enter().append("line")
    .attr("class", "grid-line")
    .attr("x1", 0)
    .attr("y1", d => y(d.Organization) + y.bandwidth() / 2)
    .attr("x2", width - margin.left - margin.right)
    .attr("y2", d => y(d.Organization) + y.bandwidth() / 2)
    .style("stroke", "#ccc")
    .style("stroke-dasharray", "4");

// Legend
const legend = svg.selectAll(".legend")
    .data([0, 1])
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(${width - margin.right - 120},${i * 30})`);

legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", d => color(d));

legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .text(d => d === 0 ? "Not Applicable" : "Applicable")
    .style("font-size", "12px")
    .style("fill", "#333");

// Tooltip Style
d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "rgba(0,0,0,0.8)")
    .style("color", "white")
    .style("padding", "5px 10px")
    .style("border-radius", "5px")
    .style("opacity", 0);
