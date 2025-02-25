const width = 1200;
const height = 1500;
const radius = Math.min(width, height) / 2 - 90;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

const data = [
    { "Institution": "IOC", "Collaborators": ["Member States", "UN Bodies", "Regional Sub-commissions"], "Focus Areas": ["Ocean Science", "Tsunami Monitoring", "Ocean Literacy"] },
    { "Institution": "FAO", "Collaborators": ["IMO", "Regional Organizations"], "Focus Areas": ["Maritime Safety", "Environmental Protection", "Decarbonization"] },
    { "Institution": "IMO Secretariat", "Collaborators": ["UN", "Specialized Agencies", "Regional Organizations"], "Focus Areas": ["Maritime Safety", "Environmental Protection"] },
    { "Institution": "UN DOALOS", "Collaborators": ["UN", "National Governments", "Legal Entities"], "Focus Areas": ["Maritime Law", "Legal Frameworks"] },
    { "Institution": "UNFCCC", "Collaborators": ["UN", "National Governments", "Scientific Bodies"], "Focus Areas": ["Climate Change", "SDGs"] },
    { "Institution": "ISA", "Collaborators": ["UN", "Regional Organizations"], "Focus Areas": ["Resource Management", "Sustainability"] },
    { "Institution": "UNEP", "Collaborators": ["UN", "Regional Offices", "Environmental Bodies"], "Focus Areas": ["Environmental Protection", "Sustainability"] },
    { "Institution": "UNDP", "Collaborators": ["UN", "Regional Bodies"], "Focus Areas": ["SDGs", "Development Assistance"] },
    { "Institution": "UNCTAD", "Collaborators": ["UN", "Regional Organizations"], "Focus Areas": ["Trade", "Economic Cooperation"] },
    { "Institution": "UNIDO", "Collaborators": ["UN", "Regional Bodies"], "Focus Areas": ["Industrial Development", "Technology"] },
    { "Institution": "ILO", "Collaborators": ["UN", "Regional Bodies"], "Focus Areas": ["Labor Standards", "Social Development"] },
    { "Institution": "ITU", "Collaborators": ["UN", "Specialized Agencies"], "Focus Areas": ["Telecommunications", "Development"] },
    { "Institution": "UNICEF", "Collaborators": ["UN", "Regional Offices"], "Focus Areas": ["Child Welfare", "Human Rights"] },
    { "Institution": "WHO", "Collaborators": ["UN", "Regional Bodies"], "Focus Areas": ["Public Health", "Disease Prevention", "Human Development"] },
    { "Institution": "OHCHR", "Collaborators": ["UN", "Regional Organizations"], "Focus Areas": ["Human Rights", "Legal Standards"] },
    { "Institution": "UNDRR", "Collaborators": ["UN", "Regional Organizations"], "Focus Areas": ["Disaster Risk Reduction", "Climate Change"] },
    { "Institution": "UN Global Compact", "Collaborators": ["UN", "Private Sector"], "Focus Areas": ["Corporate Responsibility", "SDGs"] },
    { "Institution": "IAEA", "Collaborators": ["UN", "Regional Bodies"], "Focus Areas": ["Nuclear Energy", "Peaceful Use"] },
    { "Institution": "WMO", "Collaborators": ["UN bodies", "National Meteorological and Hydrological Services"], "Focus Areas": ["Meteorological and Hydrological Services"] },
    { "Institution": "OECD", "Collaborators": ["EU", "Member States", "IMF", "WTO"], "Focus Areas": ["Economic Policy", "Trade", "Development"] },
    { "Institution": "WBG", "Collaborators": ["IMF", "WTO", "Regional Development Banks"], "Focus Areas": ["Development", "Poverty Reduction"] },
    { "Institution": "IMF", "Collaborators": ["UN", "World Bank", "Regional Organizations"], "Focus Areas": ["Economic Policy", "Financial Assistance"] },
    { "Institution": "IHO", "Collaborators": ["UN", "National Hydrographic Offices", "Regional Organizations"], "Focus Areas": ["Hydrography", "Maritime Navigation"] },
    { "Institution": "ICES", "Collaborators": ["FAO", "Regional Fisheries Bodies"], "Focus Areas": ["Fisheries Management", "Marine Policy"] },
    { "Institution": "IPBES", "Collaborators": ["FAO", "UNESCO", "UNEP", "UNDP"], "Focus Areas": ["Biodiversity", "Ecosystem Services"] },
    { "Institution": "IPCC", "Collaborators": ["UNFCCC", "GCOS", "GEO", "Future Earth"], "Focus Areas": ["Climate Change", "Environmental Impact"] },
    { "Institution": "WTO", "Collaborators": ["EU", "IMF", "World Bank"], "Focus Areas": ["Trade Policy", "Global Trade Agreements"] },
    { "Institution": "IOM", "Collaborators": ["UNHCR", "UNDP", "National Governments"], "Focus Areas": ["Migration Policy", "Humanitarian Support"] },
    { "Institution": "UNOPS", "Collaborators": ["UNDP", "UNFPA", "Regional Organizations"], "Focus Areas": ["Operational Support", "Development Programs"] },
    { "Institution": "UN-Women", "Collaborators": ["UNDP", "FAO", "UNFPA"], "Focus Areas": ["Gender Equality", "Women’s Empowerment"] },
    { "Institution": "WIPO", "Collaborators": ["FAO", "WTO", "National Governments"], "Focus Areas": ["Intellectual Property", "Trade"] },
    { "Institution": "UNFPA", "Collaborators": ["UNDP", "WHO", "Regional Bodies"], "Focus Areas": ["Reproductive Health", "Gender Equality"] },
    { "Institution": "UN-Habitat", "Collaborators": ["FAO", "UNEP", "Regional Bodies"], "Focus Areas": ["Urban Development", "Sustainable Cities"] },
    { "Institution": "WFP", "Collaborators": ["FAO", "IOM", "National Governments"], "Focus Areas": ["Food Security", "Humanitarian Aid"] },
    { "Institution": "UNWTO", "Collaborators": ["UNEP", "National Governments"], "Focus Areas": ["Sustainable Tourism", "Global Travel"] },
    { "Institution": "UNRISD", "Collaborators": ["ECOSOC", "UN agencies", "governments"], "Focus Areas": ["Social dimensions of development"] },
    { "Institution": "BRS", "Collaborators": ["UNEP", "FAO", "national governments", "environmental NGOs"], "Focus Areas": ["Chemicals and waste management"] },
    { "Institution": "CBD", "Collaborators": ["UNEP", "UNDP", "national governments", "international environmental organizations"], "Focus Areas": ["Biodiversity conservation"] },
    { "Institution": "CITES", "Collaborators": ["UNEP", "member governments", "scientific organizations"], "Focus Areas": ["Wildlife conservation", "trade regulation"] },
    { "Institution": "CMS", "Collaborators": ["UNEP", "national governments", "scientific organizations"], "Focus Areas": ["Conservation of migratory species"] },
    { "Institution": "IFAD", "Collaborators": ["UN", "World Bank", "regional development banks"], "Focus Areas": ["Rural development", "food security", "poverty reduction"] },
    { "Institution": "ITC", "Collaborators": ["WTO", "regional economic organizations", "governments"], "Focus Areas": ["Trade development", "sustainable trade policies"] },
    { "Institution": "UNCCD", "Collaborators": ["UN", "regional environmental agencies", "governments"], "Focus Areas": ["Desertification", "land degradation"] },
    { "Institution": "UNU", "Collaborators": ["UNESCO", "academic institutions", "policy makers"], "Focus Areas": ["Academic research", "sustainable development", "policy advice"] },
    { "Institution": "Ramsar", "Collaborators": ["IUCN", "national governments", "wetland organizations"], "Focus Areas": ["Wetland conservation", "biodiversity protection"] },
    { "Institution": "Minamata", "Collaborators": ["UNEP", "national governments", "environmental organizations"], "Focus Areas": ["Mercury pollution reduction", "environmental health"] },
    { "Institution": "UNOOSA", "Collaborators": ["UN", "national space agencies", "regional space institutions"], "Focus Areas": ["Space law", "space science", "technology"] },
    { "Institution": "UNODC", "Collaborators": ["UN", "regional and national governments", "civil society"], "Focus Areas": ["Combating drugs", "crime", "and terrorism"] }
];


// Convert data to a hierarchical structure
const root = d3.hierarchy({
    name: "Institutions",
    children: data.map(d => ({
        name: d.Institution,
        children: [
            {
                name: "Collaborators",
                children: d.Collaborators.map(c => ({name: c}))
            },
            {
                name: "Focus Areas",
                children: d["Focus Areas"].map(f => ({name: f}))
            }
        ]
    }))
});

// Define the tree layout
const tree = d3.tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

// Apply the layout to the data
const treeData = tree(root);

// Add links between nodes
svg.selectAll(".link")
    .data(treeData.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));

// Add nodes
const nodes = svg.selectAll(".node")
    .data(treeData.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
    `);

// Add circles for nodes
nodes.append("circle")
    .attr("r", d => d.children ? 4.5 : 2.5)
    .attr("fill", d => d.children ? "#555" : "#999");

// Add labels for nodes
nodes.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
    .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
    .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
    .text(d => d.data.name);
