const width = 1800;
const height = 1200;
const margin = {top: 20, right: 20, bottom: 20, left: 20};

const data = [
    { "Organization": "IOC", "Strategies": "Strategic Planning and Frameworks" },
    { "Organization": "FAO", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Research Science and Innovation" },
    { "Organization": "IMO Secretariat", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, International Agreements and Conventions, Operational Standards and Regulations" },
    { "Organization": "UN DOALOS", "Strategies": "Technical Assistance & Capacity Building, Monitoring Reporting and Evaluation" },
    { "Organization": "UNFCCC", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, International Agreements and Conventions" },
    { "Organization": "ISA", "Strategies": "Strategic Planning and Frameworks" },
    { "Organization": "UNEP", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Partnerships & Collaboration, Regional Focus and Coordination" },
    { "Organization": "UNDP", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Regional Focus and Coordination, Sustainable Development and Global Goals" },
    { "Organization": "UNCTAD", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Regional Focus and Coordination" },
    { "Organization": "UNIDO", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Regional Focus and Coordination, Sustainable Development and Global Goals" },
    { "Organization": "ILO", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Knowledge Sharing & Capacity Building, Sustainable Development and Global Goals" },
    { "Organization": "ITU", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Operational Standards and Regulations" },
    { "Organization": "UNICEF", "Strategies": "Strategic Planning and Frameworks, Monitoring Reporting and Evaluation, Health Environmental and Social Impact" },
    { "Organization": "WHO", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Health Environmental and Social Impact" },
    { "Organization": "OHCHR", "Strategies": "Strategic Planning and Frameworks, Monitoring Reporting and Evaluation, Legal and Normative Frameworks" },
    { "Organization": "UNDRR", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Monitoring Reporting and Evaluation" },
    { "Organization": "UN Global Compact", "Strategies": "Strategic Planning and Frameworks, Partnerships & Collaboration" },
    { "Organization": "IAEA", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Technical Assistance & Capacity Building" },
    { "Organization": "WMO", "Strategies": "International Agreements and Conventions, Operational Standards and Regulations" },
    { "Organization": "OECD", "Strategies": "International Agreements and Conventions, Operational Standards and Regulations" },
    { "Organization": "WBG", "Strategies": "Strategic Planning and Frameworks" },
    { "Organization": "IMF", "Strategies": "Strategic Planning and Frameworks, International Agreements and Conventions" },
    { "Organization": "IHO", "Strategies": "International Agreements and Conventions" },
    { "Organization": "ICES", "Strategies": "International Agreements and Conventions" },
    { "Organization": "IPBES", "Strategies": "Strategic Planning and Frameworks, Research Science and Innovation, Partnerships & Collaboration" },
    { "Organization": "IPCC", "Strategies": "Research Science and Innovation, Partnerships & Collaboration" },
    { "Organization": "WTO", "Strategies": "International Agreements and Conventions, Regulatory Frameworks" },
    { "Organization": "IOM", "Strategies": "Strategic Planning and Frameworks, International Agreements and Conventions" },
    { "Organization": "UNOPS", "Strategies": "Strategic Planning and Frameworks, Partnerships & Collaboration" },
    { "Organization": "UN-Women", "Strategies": "Strategic Planning and Frameworks, Advocacy & Communication, Sustainable Development and Global Goals" },
    { "Organization": "WIPO", "Strategies": "International Agreements and Conventions, Regulatory Frameworks" },
    { "Organization": "UNFPA", "Strategies": "Strategic Planning and Frameworks, Health Environmental and Social Impact" },
    { "Organization": "UN-Habitat", "Strategies": "Strategic Planning and Frameworks, Sustainable Development and Global Goals" },
    { "Organization": "WFP", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning, Humanitarian Aid and Crisis Response" },
    { "Organization": "UNWTO", "Strategies": "Strategic Planning and Frameworks" },
    { "Organization": "UNRISD", "Strategies": "Strategic Planning and Frameworks" },
    { "Organization": "BRS", "Strategies": "International Agreements and Conventions" },
    { "Organization": "CBD", "Strategies": "Strategic Planning and Frameworks, International Agreements and Conventions" },
    { "Organization": "CITES", "Strategies": "International Agreements and Conventions, Regulatory Frameworks" },
    { "Organization": "CMS", "Strategies": "International Agreements and Conventions, Regulatory Frameworks" },
    { "Organization": "IFAD", "Strategies": "Strategic Planning and Frameworks, Budgeting and Financial Planning" },
    { "Organization": "ITC", "Strategies": "Strategic Planning and Frameworks" },
    { "Organization": "UNCCD", "Strategies": "Strategic Planning and Frameworks, International Agreements and Conventions" },
    { "Organization": "UNU", "Strategies": "Strategic Planning and Frameworks" },
    { "Organization": "Ramsar", "Strategies": "International Agreements and Conventions, Regulatory Frameworks" },
    { "Organization": "Minamata", "Strategies": "International Agreements and Conventions, Regulatory Frameworks" },
    { "Organization": "UNOOSA", "Strategies": "Strategic Planning and Frameworks" },
    { "Organization": "UNODC", "Strategies": "Strategic Planning and Frameworks, International Agreements and Conventions, Regulatory Frameworks" }
];

// Prepare data for Treemap
const treemapData = data.map(d => ({
    name: d.Organization,
    children: d.Strategies.split(", ").map(strategy => ({name: strategy}))
}));

const treemap = d3.treemap()
    .size([width, height])
    .paddingInner(9) // Space between parent nodes
    .paddingTop(85)// Space for parent node labels
    .padding(7); // Space around child nodes

// Color scale for strategies
const color = d3.scaleOrdinal(d3.schemeCategory10);

const root = d3.hierarchy({children: treemapData})
    .sum(d => 1)
    .sort((a, b) => b.value - a.value);

treemap(root);

const treemapSvg = d3.select("#treemap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Add parent nodes (institutions)
const parent = treemapSvg.selectAll("g.parent")
    .data(root.children)
    .enter().append("g")
    .attr("class", "parent")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

parent.append("rect")
    .attr("id", d => d.data.name)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .style("fill", "none")
    .style("stroke", "#333")
    .style("stroke-width", "2px");

parent.append("text")
    .attr("x", 4)
    .attr("y", 8)
    .attr("transform", d => `rotate(- 180)`)
    .text(d => d.data.name)
    .attr("font-size", "14px")
    .attr("fill", "black");

// Add child nodes (strategies)
const child = treemapSvg.selectAll("g.child")
    .data(root.leaves())
    .enter().append("g")
    .attr("class", "child")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

child.append("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .style("fill", d => color(d.data.name));

child.append("text")
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter().append("tspan")
    .attr("x", 4)
    .attr("y", (d, i) => 13 + i * 10)
    .text(d => d)
    .attr("font-size", "10px")
    .attr("fill", "black");

// // Title for Treemap
// treemapSvg.append("text")
//     .attr("x", width / 2)
//     .attr("y", 30)
//     .attr("text-anchor", "middle")
//     .style("font-size", "15px")
//     .style("font-weight", "bold")
//     .text("Distribution of Strategies Across Organizations");