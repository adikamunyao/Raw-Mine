const width =1000;
const height = 800;
const margin = {top: 50, right:150, bottom: 50, left:150};

const data = [
    { "Institution": "ITU", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "ICES", "Spatial Jurisdiction": "Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf" },
    { "Institution": "ILO", "Spatial Jurisdiction": "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { "Institution": "IHO", "Spatial Jurisdiction": "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { "Institution": "WBG", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "IMF", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "FAO", "Spatial Jurisdiction": "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { "Institution": "UNWTO", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "WMO", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "IMO Secretariat", "Spatial Jurisdiction": "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { "Institution": "WHO", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "IOM", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UNICEF", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "IAEA", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UNOOSA", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "IOC", "Spatial Jurisdiction": "Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas, The Area" },
    { "Institution": "OECD", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "WFP", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UNRISD", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UNCTAD", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "ITC", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UNDP", "Spatial Jurisdiction": "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf" },
    { "Institution": "UNIDO", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "WIPO", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UNFPA", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "Ramsar", "Spatial Jurisdiction": "Internal Waters, Territorial Seas, Archipelagic Waters" },
    { "Institution": "UNEP", "Spatial Jurisdiction": "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { "Institution": "UNU", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "CITES", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "IFAD", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UN-Habitat", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "CMS", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "IPCC", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UN DOALOS", "Spatial Jurisdiction": "Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas, The Area" },
    { "Institution": "UNFCCC", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "CBD", "Spatial Jurisdiction": "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { "Institution": "OHCHR", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "ISA", "Spatial Jurisdiction": "The Area" },
    { "Institution": "UNOPS", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UNCCD", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "WTO", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UNODC", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UNDRR", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UN Global Compact", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "UN-Women", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "IPBES", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "BRS", "Spatial Jurisdiction": "No direct jurisdiction" },
    { "Institution": "Minamata", "Spatial Jurisdiction": "No direct jurisdiction" }
];

// Filter out institutions with no direct jurisdiction
const filteredData = data.filter(d => d["Spatial Jurisdiction"] !== "No direct jurisdiction");

const radius = Math.min(width, height) / 2 - margin.top;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Define jurisdictions with a hierarchical order for visual representation
const jurisdictions = [
    "The Area", "High Seas", "Continental Shelf", "EEZ", "Contiguous Zone", "Archipelagic Waters", "Territorial Seas", "Internal Waters"
];

// Create a color scale for jurisdictions
const color = d3.scaleOrdinal()
    .domain(jurisdictions)
    .range(d3.schemeCategory10);

// Prepare data for visualization
const processedData = filteredData.map(d => ({
    ...d,
    jurisdictions: d["Spatial Jurisdiction"].split(",").map(j => j.trim()).filter(j => jurisdictions.includes(j))
}));

// Pie layout for institutions
const pie = d3.pie()
    .value(() => 1) // Each institution gets the same slice size
    .sort(null);

const arcs = pie(processedData);

// Arc generator for radial layout
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Group for each institution
const institutionGroups = svg.selectAll(".institutionGroup")
    .data(arcs)
    .enter().append("g")
    .attr("class", "institutionGroup");

// Draw arcs for each institution
institutionGroups.selectAll("path")
    .data(d => d.data.jurisdictions.map((j, i) => ({
        ...d, 
        index: i, 
        jurisdiction: j
    })))
    .enter().append("path")
    .attr("d", d => {
        const startRadius = radius / jurisdictions.length * d.index;
        const endRadius = radius / jurisdictions.length * (d.index + 1);
        return d3.arc()
            .innerRadius(startRadius)
            .outerRadius(endRadius)
            .startAngle(d.startAngle)
            .endAngle(d.endAngle)();
    })
    .attr("fill", d => color(d.jurisdiction))
    .attr("class", "arc");

// Add labels for institutions
institutionGroups.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("dy", "0.35em")
    .text(d => d.data.Institution)
    .style("text-anchor", "middle")
    .style("font-size", "10px");

// Legend for jurisdictions
const legend = svg.selectAll(".legend")
    .data(jurisdictions)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(${radius + 10},${i * 20 - radius / 2})`);

legend.append("rect")
    .attr("width", 18)
    .attr("height", 28)
    .style("fill", d => color(d));

legend.append("text")
    .attr("x",24)
    .attr("y",19)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(d => d);

// Title
svg.append("text")
    .attr("y", -radius - 20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Institution Spatial Jurisdiction");