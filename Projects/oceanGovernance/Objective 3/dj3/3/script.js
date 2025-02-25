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

const width = 1200;
const height = 800;

// Convert data for hierarchy
const attributes = ["spatial", "subject", "source", "objectives", "strategies", "relationship", "vertical", "horizontal"];

// Transform data into hierarchical structure for dendrogram
const hierarchicalData = {
    name: "Institutions",
    children: data.map(org => ({
        name: org.institution,
        children: attributes.map(attr => ({
            name: attr,
            value: org[attr.toLowerCase()] === "Yes" ? 1 : 0
        }))
    }))
};

// Create a tree layout.
const cluster = d3.cluster()
    .size([height, width - 100]); // Adjust size for vertical layout

// Convert the data to a hierarchy and apply the layout.
const root = d3.hierarchy(hierarchicalData);
cluster(root);

// Create SVG element
const svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

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

// Add circles for nodes
node.append("circle")
    .attr("fill", d => d.children ? "#555" : "#999")
    .attr("r", 2.5);

// Add text labels
node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.children ? -6 : 6)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name)
    .attr("stroke", "white")
    .attr("paint-order", "stroke");