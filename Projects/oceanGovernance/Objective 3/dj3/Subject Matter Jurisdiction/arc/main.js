const width = 2000;
const height = 600;
const margin = {top: 20, right: 20, bottom: 100, left: 20};

// Full dataset
const dataList = [   
        { "Institution": "IOC", "Year of Establishement": 1960, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building, Research Science & Innovation, Environmental Protection & Climate Change" },
        { "Institution": "FAO", "Year of Establishement": 1945, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building, Biodiversity & Ecosystem Conservation" },
        { "Institution": "IMO Secretariat", "Year of Establishement": 1948, "Subject Matter Jurisdiction": "International Cooperation & Governance, Environmental Protection & Climate Change" },
        { "Institution": "UN DOALOS", "Year of Establishement": 1992, "Subject Matter Jurisdiction": "International Cooperation & Governance, Environmental Protection & Climate Change" },
        { "Institution": "UNFCCC", "Year of Establishement": 1992, "Subject Matter Jurisdiction": "Environmental Protection & Climate Change, Research Science & Innovation" },
        { "Institution": "ISA", "Year of Establishement": 1994, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building, International Cooperation & Governance, Environmental Protection & Climate Change" },
        { "Institution": "UNEP", "Year of Establishement": 1972, "Subject Matter Jurisdiction": "Environmental Protection & Climate Change, Sustainable Development & Capacity Building, Research Science & Innovation" },
        { "Institution": "UNDP", "Year of Establishement": 1965, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building, International Cooperation & Governance" },
        { "Institution": "UNCTAD", "Year of Establishement": 1964, "Subject Matter Jurisdiction": "Trade Investment & Economic Cooperation" },
        { "Institution": "UNIDO", "Year of Establishement": 1966, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building, International Cooperation & Governance" },
        { "Institution": "ILO", "Year of Establishement": 1919, "Subject Matter Jurisdiction": "Human Rights Social Justice & Advocacy, International Cooperation & Governance" },
        { "Institution": "ITU", "Year of Establishement": 1865, "Subject Matter Jurisdiction": "International Cooperation & Governance" },
        { "Institution": "UNICEF", "Year of Establishement": 1953, "Subject Matter Jurisdiction": "Human Rights Social Justice & Advocacy, Sustainable Development & Capacity Building" },
        { "Institution": "WHO", "Year of Establishement": 1948, "Subject Matter Jurisdiction": "Research Science & Innovation, Environmental Protection & Climate Change" },
        { "Institution": "OHCHR", "Year of Establishement": 1993, "Subject Matter Jurisdiction": "Human Rights Social Justice & Advocacy" },
        { "Institution": "UNDRR", "Year of Establishement": 1999, "Subject Matter Jurisdiction": "Disaster Risk Reduction & Resilience, Environmental Protection & Climate Change" },
        { "Institution": "UN Global Compact", "Year of Establishement": 2000, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building" },
        { "Institution": "IAEA", "Year of Establishement": 1957, "Subject Matter Jurisdiction": "Research Science & Innovation, Environmental Protection & Climate Change, International Cooperation & Governance" },
        { "Institution": "WMO", "Year of Establishement": 1947, "Subject Matter Jurisdiction": "Research Science & Innovation, Environmental Protection & Climate Change" },
        { "Institution": "OECD", "Year of Establishement": 1961, "Subject Matter Jurisdiction": "Trade Investment & Economic Cooperation, Sustainable Development & Capacity Building" },
        { "Institution": "WBG", "Year of Establishement": 1944, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building, International Cooperation & Governance" },
        { "Institution": "IMF", "Year of Establishement": 1944, "Subject Matter Jurisdiction": "Trade Investment & Economic Cooperation, International Cooperation & Governance" },
        { "Institution": "IHO", "Year of Establishement": 1921, "Subject Matter Jurisdiction": "Research Science & Innovation, Environmental Protection & Climate Change" },
        { "Institution": "ICES", "Year of Establishement": 1902, "Subject Matter Jurisdiction": "Biodiversity & Ecosystem Conservation, Environmental Protection & Climate Change" },
        { "Institution": "IPBES", "Year of Establishement": 2012, "Subject Matter Jurisdiction": "Biodiversity & Ecosystem Conservation, Environmental Protection & Climate Change, Research Science & Innovation" },
        { "Institution": "IPCC", "Year of Establishement": 1988, "Subject Matter Jurisdiction": "Environmental Protection & Climate Change, Research Science & Innovation" },
        { "Institution": "WTO", "Year of Establishement": 1995, "Subject Matter Jurisdiction": "Trade Investment & Economic Cooperation" },
        { "Institution": "IOM", "Year of Establishement": 1951, "Subject Matter Jurisdiction": "International Cooperation & Governance, Sustainable Development & Capacity Building" },
        { "Institution": "UNOPS", "Year of Establishement": 1994, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building" },
        { "Institution": "UN-Women", "Year of Establishement": 2010, "Subject Matter Jurisdiction": "Human Rights Social Justice & Advocacy" },
        { "Institution": "WIPO", "Year of Establishement": 1967, "Subject Matter Jurisdiction": "Biodiversity & Ecosystem Conservation, Research Science & Innovation" },
        { "Institution": "UNFPA", "Year of Establishement": 1967, "Subject Matter Jurisdiction": "Human Rights, Social Justice & Advocacy, Sustainable Development & Capacity Building" },
        { "Institution": "UN-Habitat", "Year of Establishement": 1977, "Subject Matter Jurisdiction": "Disaster Risk Reduction & Resilience, Sustainable Development & Capacity Building" },
        { "Institution": "WFP", "Year of Establishement": 1961, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building, Disaster Risk Reduction & Resilience" },
        { "Institution": "UNWTO", "Year of Establishement": 1946, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building" },
        { "Institution": "UNRISD", "Year of Establishement": 1963, "Subject Matter Jurisdiction": "Human Rights Social Justice & Advocacy, Sustainable Development & Capacity Building" },
        { "Institution": "BRS", "Year of Establishement": 2012, "Subject Matter Jurisdiction": "Environmental Protection & Climate Change, International Cooperation & Governance" },
        { "Institution": "CBD", "Year of Establishement": 1992, "Subject Matter Jurisdiction": "Biodiversity & Ecosystem Conservation, International Cooperation & Governance" },
        { "Institution": "CITES", "Year of Establishement": 1973, "Subject Matter Jurisdiction": "Biodiversity & Ecosystem Conservation, Environmental Protection & Climate Change" },
        { "Institution": "CMS", "Year of Establishement": 1983, "Subject Matter Jurisdiction": "Biodiversity & Ecosystem Conservation, Environmental Protection & Climate Change" },
        { "Institution": "IFAD", "Year of Establishement": 1976, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building" },
        { "Institution": "ITC", "Year of Establishement": 1964, "Subject Matter Jurisdiction": "Trade Investment & Economic Cooperation" },
        { "Institution": "UNCCD", "Year of Establishement": 1994, "Subject Matter Jurisdiction": "Environmental Protection & Climate Change, Research Science & Innovation" },
        { "Institution": "UNU", "Year of Establishement": 1972, "Subject Matter Jurisdiction": "Sustainable Development & Capacity Building, Research Science & Innovation" },
        { "Institution": "Ramsar", "Year of Establishement": 1971, "Subject Matter Jurisdiction": "Environmental Protection & Climate Change, Biodiversity & Ecosystem Conservation" },
        { "Institution": "Minamata", "Year of Establishement": 2013, "Subject Matter Jurisdiction": "Environmental Protection & Climate Change" },
        { "Institution": "UNOOSA", "Year of Establishement": 1958, "Subject Matter Jurisdiction": "International Cooperation & Governance" },
        { "Institution": "UNODC", "Year of Establishement": 1997, "Subject Matter Jurisdiction": "International Cooperation & Governance, Security & Safety" }
      ];

// Process the data
const data = {
    "nodes": dataList.map(d => ({ id: d.Institution, est: d["Year of Establishement"] })),
    "links": []
};

const jurisdictionMap = {};
dataList.forEach(row => {
    const institution = row.Institution;
    const jurisdictions = row["Subject Matter Jurisdiction"].split(", ");
    jurisdictions.forEach(jurisdiction => {
        if (!jurisdictionMap[jurisdiction]) {
            jurisdictionMap[jurisdiction] = [];
        }
        jurisdictionMap[jurisdiction].push(institution);
    });
});

Object.values(jurisdictionMap).forEach(institutions => {
    for (let i = 0; i < institutions.length; i++) {
        for (let j = i + 1; j < institutions.length; j++) {
            data.links.push({ source: institutions[i], target: institutions[j] });
        }
    }
});

// Setup SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Set up scales
const x = d3.scalePoint()
    .range([0, width - margin.left - margin.right])
    .domain(data.nodes.map(d => d.id));

// Draw nodes
svg.selectAll("circle")
    .data(data.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("cx", d => x(d.id))
    .attr("cy", height - margin.bottom - margin.top - 10)
    .attr("r", 5);

// Draw arcs for connections
const line = d3.line()
    .x(d => x(d))
    .y(d => height - margin.bottom - margin.top - 10);

svg.selectAll("path")
    .data(data.links)
    .enter().append("path")
    .attr("class", "arc")
    .attr("d", d => {
        const start = x(d.source);
        const end = x(d.target);
        const midX = (start + end) / 2;
        const midY = height - margin.bottom - margin.top - 10 - Math.abs(end - start) / 2;
        return `M${start},${height - margin.bottom - margin.top - 10} 
                Q${midX},${midY} 
                ${end},${height - margin.bottom - margin.top - 10}`;
    });

// Add labels to nodes
svg.selectAll("text")
    .data(data.nodes)
    .enter().append("text")
    .attr("x", d => x(d.id))
    .attr("y", height - margin.bottom + 20) // Adjust for better readability 
    .text(d => d.id);

// Add title
svg.append("text")
    .attr("x", (width / 2) - margin.left - margin.right)
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Institution Connections via Jurisdictions");

