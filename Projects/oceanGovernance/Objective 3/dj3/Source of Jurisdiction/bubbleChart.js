// Enhanced bubble chart using D3.js with d3.pack() layout

const data = [
    { "organization": "IOC", "documentTypes": ["Statute", "Treaty", "Resolution"] },
    { "organization": "FAO", "documentTypes": ["Constitution", "Treaty"] },
    { "organization": "IMO", "documentTypes": ["Convention", "Treaty", "Regulation"] },
    { "organization": "UN DOALOS", "documentTypes": ["Treaty", "Agreement"] },
    { "organization": "UNFCCC", "documentTypes": ["Treaty", "Protocol"] },
    { "organization": "ISA", "documentTypes": ["Treaty", "Agreement"] },
    { "organization": "UNEP", "documentTypes": ["Resolution", "Declaration"] },
    { "organization": "UNDP", "documentTypes": ["Resolution", "Regulation", "Agenda"] },
    { "organization": "UNCTAD", "documentTypes": ["Resolution", "Conference Document", "Agenda"] },
    { "organization": "UNIDO", "documentTypes": ["Constitution", "Declaration", "Agenda"] },
    { "organization": "ILO", "documentTypes": ["Treaty", "Constitution", "Declaration"] },
    { "organization": "ITU", "documentTypes": ["Constitution", "Convention", "Resolution", "Regulation"] },
    { "organization": "UNICEF", "documentTypes": ["Resolution", "Treaty"] },
    { "organization": "WHO", "documentTypes": ["Constitution", "Treaty", "Declaration"] },
    { "organization": "OHCHR", "documentTypes": ["Charter", "Resolution", "Treaty"] },
    { "organization": "UNDRR", "documentTypes": ["Resolution", "Framework", "Agenda"] },
    { "organization": "UN Global Compact", "documentTypes": ["Initiative", "Resolution", "Declaration"] },
    { "organization": "IAEA", "documentTypes": ["Statute", "Treaty", "Convention"] },
    { "organization": "WMO", "documentTypes": ["Convention", "Regulation", "Resolution", "Treaty"] },
    { "organization": "OECD", "documentTypes": ["Convention", "Decision", "Agreement", "Standard"] },
    { "organization": "WBG", "documentTypes": ["Agreement"] },
    { "organization": "IMF", "documentTypes": ["Agreement", "Charter", "Treaty"] },
    { "organization": "IHO", "documentTypes": ["Convention", "Treaty"] },
    { "organization": "ICES", "documentTypes": ["Convention", "Treaty"] },
    { "organization": "IPBES", "documentTypes": ["Plenary Decision", "Treaty"] },
    { "organization": "IPCC", "documentTypes": ["Panel Decision", "Treaty"] },
    { "organization": "WTO", "documentTypes": ["Agreement", "Treaty"] },
    { "organization": "IOM", "documentTypes": ["Constitution", "Resolution", "Convention"] },
    { "organization": "UNOPS", "documentTypes": ["Resolution", "Charter", "Agreement"] },
    { "organization": "UN-Women", "documentTypes": ["Resolution", "Treaty", "Platform", "Agenda"] },
    { "organization": "WIPO", "documentTypes": ["Convention", "Treaty", "Agreement"] },
    { "organization": "UNFPA", "documentTypes": ["Resolution", "Programme"] },
    { "organization": "UN-Habitat", "documentTypes": ["Resolution", "Agenda"] },
    { "organization": "WFP", "documentTypes": ["Resolution", "Constitution"] },
    { "organization": "UNWTO", "documentTypes": ["Statute", "Resolution"] },
    { "organization": "UNRISD", "documentTypes": ["Resolution", "Charter"] },
    { "organization": "BRS", "documentTypes": ["Convention", "Treaty"] },
    { "organization": "CBD", "documentTypes": ["Convention", "Declaration"] },
    { "organization": "CITES", "documentTypes": ["Convention"] },
    { "organization": "CMS", "documentTypes": ["Convention"] },
    { "organization": "IFAD", "documentTypes": ["Agreement", "Resolution"] },
    { "organization": "ITC", "documentTypes": ["Conference Document"] },
    { "organization": "UNCCD", "documentTypes": ["Convention", "Declaration"] },
    { "organization": "UNU", "documentTypes": ["Charter", "Resolution"] },
    { "organization": "Ramsar", "documentTypes": ["Convention"] },
    { "organization": "Minamata", "documentTypes": ["Convention"] },
    { "organization": "UNOOSA", "documentTypes": ["Resolution", "Charter"] },
    { "organization": "UNODC", "documentTypes": ["Resolution", "Convention"] }
  ];
  
  // Set the dimensions of the chart
  const width = 928;
  const height = width;
  const margin = 1;
  const format = d3.format(",d");
  
  // Create a categorical color scale
  const color = d3.scaleOrdinal(d3.schemeTableau10);
  
  // Create the pack layout
  const pack = d3.pack()
    .size([width - margin * 2, height - margin * 2])
    .padding(3);
  
  // Create a hierarchical structure
  const root = pack(d3.hierarchy({children: data})
    .sum(d => d.documentTypes.length));  // Size based on the number of document types
  
  // Create the SVG container
  const svg = d3.select("svg")
    .attr("viewBox", [-margin, -margin, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
    .attr("text-anchor", "middle");
  
  // Create nodes and append to the SVG
  const node = svg.append("g")
    .selectAll(".node")
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x},${d.y})`);
  
  // Add title to each node
  node.append("title")
    .text(d => `${d.data.organization}\n${format(d.value)}`);
  
  // Append circles for each node
  node.append("circle")
    .attr("class", "node")
    .attr("r", d => d.r)
    .attr("fill-opacity", 0.7)
    .attr("fill", d => color(d.data.organization));
  
  // Add labels inside the bubbles
  const text = node.append("text")
    .attr("clip-path", d => `circle(${d.r})`);
  
  // Split the organization name into CamelCase words
  text.selectAll()
    .data(d => d.data.organization.split(/(?=[A-Z][a-z])|\s+/g))
    .join("tspan")
    .attr("x", 0)
    .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
    .text(d => d);
  
  // Add document count as a tspan below the organization name
  text.append("tspan")
    .attr("x", 0)
    .attr("y", d => `${d.length / 2 + 0.35}em`)
    .attr("fill-opacity", 0.7)
    .text(d => format(d.value));
  