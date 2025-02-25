const data = [
    { institution: "IOC", category: "Academic and Research Partnerships, Collaboration with Other International Organizations" },
    { institution: "FAO", category: "Collaboration with UN and Specialized Agencies, Collaboration with Member States and National Entities, Multilateral Environmental Agreements (MEAs) and Conventions, Capacity Building and Knowledge Sharing" },
    { institution: "IMO Secretariat", category: "Collaboration with UN and Specialized Agencies" },
    { institution: "UN DOALOS", category: "Dispute Resolution and Legal Cooperation" },
    { institution: "UNFCCC", category: "Collaboration with UN and Specialized Agencies, Collaboration with Member States and National Entities, Financial and Development Partnerships, Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "ISA", category: "Dispute Resolution and Legal Cooperation, Collaboration with Other International Organizations" },
    { institution: "UNEP", category: "Collaboration with UN and Specialized Agencies, Multilateral Environmental Agreements (MEAs) and Conventions, Regional Cooperation, Capacity Building and Knowledge Sharing" },
    { institution: "UNDP", category: "Collaboration with UN and Specialized Agencies, Collaboration with Member States and National Entities, Financial and Development Partnerships, Capacity Building and Knowledge Sharing" },
    { institution: "UNCTAD", category: "Collaboration with Other International Organizations, Financial and Development Partnerships" },
    { institution: "UNIDO", category: "Collaboration with UN and Specialized Agencies, Private Sector and Industry Engagement, Capacity Building and Knowledge Sharing" },
    { institution: "ILO", category: "Collaboration with Other International Organizations" },
    { institution: "ITU", category: "Collaboration with Other International Organizations" },
    { institution: "UNICEF", category: "Collaboration with UN and Specialized Agencies, Collaboration with Member States and National Entities, NGOs and Civil Society Engagement" },
    { institution: "WHO", category: "Collaboration with UN and Specialized Agencies, Collaboration with Member States and National Entities, Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "OHCHR", category: "Collaboration with UN and Specialized Agencies" },
    { institution: "UNDRR", category: "Collaboration with UN and Specialized Agencies, Capacity Building and Knowledge Sharing" },
    { institution: "UN Global Compact", category: "Private Sector and Industry Engagement, Advocacy and Awareness Campaigns" },
    { institution: "IAEA", category: "Collaboration with UN and Specialized Agencies, Academic and Research Partnerships, Dispute Resolution and Legal Cooperation" },
    { institution: "WMO", category: "Collaboration with UN and Specialized Agencies, Regional Cooperation" },
    { institution: "OECD", category: "Collaboration with Other International Organizations" },
    { institution: "WBG", category: "Financial and Development Partnerships" },
    { institution: "IMF", category: "Financial and Development Partnerships" },
    { institution: "IHO", category: "Academic and Research Partnerships" },
    { institution: "ICES", category: "Academic and Research Partnerships" },
    { institution: "IPBES", category: "Academic and Research Partnerships, NGOs and Civil Society Engagement" },
    { institution: "IPCC", category: "Academic and Research Partnerships, Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "WTO", category: "Collaboration with Other International Organizations, Dispute Resolution and Legal Cooperation" },
    { institution: "IOM", category: "Collaboration with Member States and National Entities" },
    { institution: "UNOPS", category: "Collaboration with UN and Specialized Agencies" },
    { institution: "UN-Women", category: "Private Sector and Industry Engagement, NGOs and Civil Society Engagement, Advocacy and Awareness Campaigns" },
    { institution: "WIPO", category: "Collaboration with Other International Organizations" },
    { institution: "UNFPA", category: "Collaboration with UN and Specialized Agencies, Collaboration with Member States and National Entities" },
    { institution: "UN-Habitat", category: "Collaboration with UN and Specialized Agencies, NGOs and Civil Society Engagement, Advocacy and Awareness Campaigns" },
    { institution: "WFP", category: "Collaboration with UN and Specialized Agencies, Collaboration with Member States and National Entities" },
    { institution: "UNWTO", category: "Collaboration with UN and Specialized Agencies, Collaboration with Member States and National Entities" },
    { institution: "UNRISD", category: "Academic and Research Partnerships" },
    { institution: "BRS", category: "Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "CBD", category: "Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "CITES", category: "Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "CMS", category: "Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "IFAD", category: "Financial and Development Partnerships" },
    { institution: "ITC", category: "Collaboration with Other International Organizations" },
    { institution: "UNCCD", category: "Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "UNU", category: "Academic and Research Partnerships, Capacity Building and Knowledge Sharing" },
    { institution: "Ramsar", category: "Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "Minamata", category: "Multilateral Environmental Agreements (MEAs) and Conventions" },
    { institution: "UNOOSA", category: "Collaboration with Other International Organizations" },
    { institution: "UNODC", category: "Collaboration with Member States and National Entities, Dispute Resolution and Legal Cooperation" }
];

const institutionsWithCategories = data.map(d => ({
    ...d,
    category: d.category.split(',').map(c => c.trim())
}));

const allCategories = new Set();
institutionsWithCategories.forEach(d => d.category.forEach(c => allCategories.add(c)));
const categoriesArray = Array.from(allCategories);

const groupedByCategories = categoriesArray.map(category => ({
    name: category,
    children: institutionsWithCategories
        .filter(d => d.category.includes(category))
        .map(d => ({ name: d.institution }))
}));

const hierarchicalData = {
    name: "Categories",
    children: groupedByCategories
};

const width = 1200;
const height = 1000;

// Create a tree layout.
const cluster = d3.cluster()
    .size([height, width - 160]);

// Convert to D3 hierarchy and apply layout
const root = d3.hierarchy(hierarchicalData);
cluster(root);

// Create SVG element
const svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

// Create a vibrant color scale
const color = d3.scaleOrdinal(d3.schemeSet3); // or d3.schemePaired for another vibrant set

// Add links
const link = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
  .data(root.links())
  .join("path")
    .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

// Add nodes
const node = svg.append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
  .selectAll("g")
  .data(root.descendants())
  .join("g")
    .attr("transform", d => `translate(${d.y},${d.x})`);

// Add circles for nodes with vibrant colors based on category
node.append("circle")
    .attr("fill", d => {
        // Here we color the node based on the parent category if it has one, or gray otherwise
        if (d.depth > 0) {
            return d.parent ? color(d.parent.data.name) : "#999";
        }
        return "#555"; // Color for root node
    })
    .attr("r", 2.5);

// Add text labels
node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.children ? -6 : 6)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name)
    .attr("stroke", "white")
    .attr("paint-order", "stroke");

// Function to download SVG
function downloadSVG() {
    const svgString = new XMLSerializer().serializeToString(svg.node());
    const blob = new Blob([svgString], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'dendrogram.svg';
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Add click event to save button
document.getElementById('saveButton').addEventListener('click', downloadSVG);