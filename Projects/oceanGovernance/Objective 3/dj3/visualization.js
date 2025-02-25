const organizations = [
    { id: "IOC", documents: ["Statute", "Treaty", "Resolution"] },
    { id: "FAO", documents: ["Constitution", "Treaty"] },
    { id: "IMO", documents: ["Convention", "Treaty", "Regulation"] },
    { id: "UN DOALOS", documents: ["Treaty", "Agreement"] },
    { id: "UNFCCC", documents: ["Treaty", "Protocol"] },
    { id: "ISA", documents: ["Treaty", "Agreement"] },
    { id: "UNEP", documents: ["Resolution", "Declaration"] },
    { id: "UNDP", documents: ["Resolution", "Regulation", "Agenda"] },
    { id: "UNCTAD", documents: ["Resolution", "Conference Document", "Agenda"] },
    { id: "UNIDO", documents: ["Constitution", "Declaration", "Agenda"] },
    { id: "ILO", documents: ["Treaty", "Constitution", "Declaration"] },
    { id: "ITU", documents: ["Constitution", "Convention", "Resolution", "Regulation"] },
    { id: "UNICEF", documents: ["Resolution", "Treaty"] },
    { id: "WHO", documents: ["Constitution", "Treaty", "Declaration"] },
    { id: "OHCHR", documents: ["Charter", "Resolution", "Treaty"] },
    { id: "UNDRR", documents: ["Resolution", "Framework", "Agenda"] },
    { id: "UN Global Compact", documents: ["Initiative", "Resolution", "Declaration"] },
    { id: "IAEA", documents: ["Statute", "Treaty", "Convention"] },
    { id: "WMO", documents: ["Convention", "Regulation", "Resolution", "Treaty"] },
    { id: "OECD", documents: ["Convention", "Decision", "Agreement", "Standard"] },
    { id: "WBG", documents: ["Agreement"] },
    { id: "IMF", documents: ["Agreement", "Charter", "Treaty"] },
    { id: "IHO", documents: ["Convention", "Treaty"] },
    { id: "ICES", documents: ["Convention", "Treaty"] },
    { id: "IPBES", documents: ["Plenary Decision", "Treaty"] },
    { id: "IPCC", documents: ["Panel Decision", "Treaty"] },
    { id: "WTO", documents: ["Agreement", "Treaty"] },
    { id: "IOM", documents: ["Constitution", "Resolution", "Convention"] },
    { id: "UNOPS", documents: ["Resolution", "Charter", "Agreement"] },
    { id: "UN-Women", documents: ["Resolution", "Treaty", "Platform", "Agenda"] },
    { id: "WIPO", documents: ["Convention", "Treaty", "Agreement"] },
    { id: "UNFPA", documents: ["Resolution", "Programme"] },
    { id: "UN-Habitat", documents: ["Resolution", "Agenda"] },
    { id: "WFP", documents: ["Resolution", "Constitution"] },
    { id: "UNWTO", documents: ["Statute", "Resolution"] },
    { id: "UNRISD", documents: ["Resolution", "Charter"] },
    { id: "BRS", documents: ["Convention", "Treaty"] },
    { id: "CBD", documents: ["Convention", "Declaration"] },
    { id: "CITES", documents: ["Convention"] },
    { id: "CMS", documents: ["Convention"] },
    { id: "IFAD", documents: ["Agreement", "Resolution"] },
    { id: "ITC", documents: ["Conference Document"] },
    { id: "UNCCD", documents: ["Convention", "Declaration"] },
    { id: "UNU", documents: ["Charter", "Resolution"] },
    { id: "Ramsar", documents: ["Convention"] },
    { id: "Minamata", documents: ["Convention"] },
    { id: "UNOOSA", documents: ["Resolution", "Charter"] },
    { id: "UNODC", documents: ["Resolution", "Convention"] }
  ];
  
  const documentTypes = new Set();
  organizations.forEach(org => {
    org.documents.forEach(doc => {
      documentTypes.add(doc);
    });
  });
  
  const nodes = [
    ...organizations.map(org => ({ id: org.id, group: 1 })),
    ...Array.from(documentTypes).map(doc => ({ id: doc, group: 2 }))
  ];
  
  const links = organizations.flatMap(org => 
    org.documents.map(doc => ({
      source: org.id,
      target: doc
    }))
  );

  
  const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(100))
  .force("charge", d3.forceManyBody().strength(-200))
  .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
  .selectAll(".link")
  .data(links)
  .enter()
  .append("line")
  .attr("class", "link")
  .style("stroke-width", 2);

const node = svg.append("g")
  .selectAll(".node")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("class", "node")
  .attr("r", 15)
  .style("fill", "#6699FF")
  .call(d3.drag().on("start", dragstart).on("drag", dragged).on("end", dragend));

const labels = svg.append("g")
  .selectAll("text")
  .data(nodes)
  .enter()
  .append("text")
  .attr("dx", 15)
  .attr("dy", 5)
  .text(d => d.id);

simulation.on("tick", () => {
  link.attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node.attr("cx", d => d.x)
    .attr("cy", d => d.y);

  labels.attr("x", d => d.x)
    .attr("y", d => d.y);
});
