const data = [
    { institution: "ITU", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "ICES", spatialJurisdiction: "Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf" },
    { institution: "ILO", spatialJurisdiction: "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { institution: "IHO", spatialJurisdiction: "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { institution: "WBG", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "IMF", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "FAO", spatialJurisdiction: "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { institution: "UNWTO", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "WMO", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "IMO Secretariat", spatialJurisdiction: "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { institution: "WHO", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "IOM", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UNICEF", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "IAEA", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UNOOSA", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "IOC", spatialJurisdiction: "Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas, The Area" },
    { institution: "OECD", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "WFP", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UNRISD", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UNCTAD", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "ITC", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UNDP", spatialJurisdiction: "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf" },
    { institution: "UNIDO", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "WIPO", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UNFPA", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "Ramsar", spatialJurisdiction: "Internal Waters, Territorial Seas, Archipelagic Waters" },
    { institution: "UNEP", spatialJurisdiction: "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { institution: "UNU", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "CITES", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "IFAD", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UN-Habitat", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "CMS", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "IPCC", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UN DOALOS", spatialJurisdiction: "Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas, The Area" },
    { institution: "UNFCCC", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "CBD", spatialJurisdiction: "Internal Waters, Territorial Seas, Archipelagic Waters, Contiguous Zone, EEZ, Continental Shelf, High Seas" },
    { institution: "OHCHR", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "ISA", spatialJurisdiction: "The Area" },
    { institution: "UNOPS", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UNCCD", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "WTO", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UNODC", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UNDRR", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UN Global Compact", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "UN-Women", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "IPBES", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "BRS", spatialJurisdiction: "No direct jurisdiction" },
    { institution: "Minamata", spatialJurisdiction: "No direct jurisdiction" }
];

const chart = () => {
    // Specify the dimensions of the chart.
    const width = 928;
    const height = width;
    const margin = 1; // to avoid clipping the root circle stroke
    const name = d => d.institution;
    const group = d => d.spatialJurisdiction === "No direct jurisdiction" ? "No Jurisdiction" : "Has Jurisdiction"; // Simplified grouping
    const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g);

    // Specify the number format for values.
    const format = d3.format(",d");

    // Create a categorical color scale.
    const color = d3.scaleOrdinal(d3.schemeTableau10);

    // Create the pack layout.
    const pack = d3.pack()
        .size([width - margin * 2, height - margin * 2])
        .padding(3);

    // Compute the hierarchy from the (flat) data; expose the values
    // for each node; lastly apply the pack layout.
    const root = pack(d3.hierarchy({children: data})
        .sum(d => d.spatialJurisdiction === "No direct jurisdiction" ? 1 : d.spatialJurisdiction.split(',').length)); // Changed from 0 to 1 for visibility

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-margin, -margin, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
        .attr("text-anchor", "middle");

    // Place each (leaf) node according to the layout’s x and y values.
    const node = svg.append("g")
      .selectAll()
      .data(root.leaves())
      .join("g")
        .attr("transform", d => `translate(${d.x},${d.y})`);

    // Add a title.
    node.append("title")
        .text(d => `${d.data.institution}\nJurisdictions: ${d.data.spatialJurisdiction === "No direct jurisdiction" ? "0" : d.data.spatialJurisdiction.split(',').length}`);

    // Add a filled circle with stroke for better visibility.
    node.append("circle")
        .attr("fill-opacity", 0.7)
        .attr("fill", d => color(group(d.data)))
        .attr("r", d => d.r)
        .attr("stroke", "black")
        .attr("stroke-width", 0.5);

    // Add a label.
    const text = node.append("text")
        .attr("clip-path", d => `circle(${d.r})`);

    // Add a tspan for each CamelCase-separated word.
    text.selectAll()
      .data(d => names(d.data))
      .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
        .text(d => d);

    // Add a tspan for the node’s value.
    text.append("tspan")
        .attr("x", 0)
        .attr("y", d => `${names(d.data).length / 2 + 0.35}em`)
        .attr("fill-opacity", 0.7)
        .text(d => format(d.value));

    return Object.assign(svg.node(), {scales: {color}});
};

// Append the chart to the body
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('chart').appendChild(chart());
});