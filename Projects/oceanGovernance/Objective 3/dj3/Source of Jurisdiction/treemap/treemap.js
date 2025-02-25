// Dimensions for the Treemap
const width = 960;
const height = 600;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

// Create SVG container
const svg = d3
  .select("#treemap")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the treemap layout
const treemap = d3
  .treemap()
  .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
  .padding(1);

// Example data structure for organizations and jurisdictional sources
const data = {
  "name": "Jurisdictional Sources",
  "children": [
    {
      "name": "IOC",
      "children": [
        {"name": "IOC Statutes", "size": 1},
        {"name": "UNCLOS, UN General Assembly Resolutions", "size": 1}
      ]
    },
    {
      "name": "FAO",
      "children": [
        {"name": "FAO Constitution", "size": 1},
        {"name": "PSMA, UNCLOS, CBD", "size": 1}
      ]
    },
    {
      "name": "IMO",
      "children": [
        {"name": "IMO Convention", "size": 1},
        {"name": "UNCLOS, IMO Conventions", "size": 1}
      ]
    },
    // Add more organizations and jurisdictional sources here
  ]
};

// Create the root hierarchy for treemap
const root = d3.hierarchy(data).sum(d => d.size);

// Apply the treemap layout to the data
treemap(root);

// Create the rectangles (leaf nodes) for the treemap
svg
  .selectAll("rect")
  .data(root.leaves())
  .enter()
  .append("rect")
  .attr("x", d => d.x0)
  .attr("y", d => d.y0)
  .attr("width", d => d.x1 - d.x0)
  .attr("height", d => d.y1 - d.y0)
  .style("fill", "lightblue")
  .style("stroke", "black")
  .style("stroke-width", 1);

// Add labels inside the rectangles
svg
  .selectAll("text")
  .data(root.leaves())
  .enter()
  .append("text")
  .attr("x", d => d.x0 + 5)  // Position label inside the rect
  .attr("y", d => d.y0 + 15) // Position label inside the rect
  .text(d => d.data.name)
  .style("font-size", "12px")
  .style("fill", "black")
  .style("text-anchor", "start")
  .style("alignment-baseline", "middle");

// Optional: Add interactivity (tooltip on hover)
svg
  .selectAll("rect")
  .on("mouseover", function (event, d) {
    d3.select(this).style("fill", "orange");
  })
  .on("mouseout", function (event, d) {
    d3.select(this).style("fill", "lightblue");
  });
