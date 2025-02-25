const width = 1200;
const height = 800;
const margin = {top: 40, right: 20, bottom: 250, left: 120};

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

      const allJurisdictions = Array.from(new Set(dataList.flatMap(d => d["Subject Matter Jurisdiction"].split(", "))));
      const groupedData = allJurisdictions.map(jurisdiction => ({
          jurisdiction,
          institutions: dataList.filter(d => d["Subject Matter Jurisdiction"].includes(jurisdiction))
      }));
      
      // Color scale for institutions
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      
      // SVG setup
      const svg = d3.select("#chart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
      
      // Scales
      const x0 = d3.scaleBand()
          .rangeRound([0, width - margin.left - margin.right])
          .paddingInner(0.1)
          .domain(allJurisdictions);
      
      const x1 = d3.scaleBand()
          .padding(0.05);
      
      const y = d3.scaleLinear()
          .rangeRound([height - margin.top - margin.bottom, 0])
          .domain([0, d3.max(groupedData, d => d.institutions.length) + 1]);
      
      // Axes
      svg.append("g")
          .attr("class", "axis")
          .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
          .call(d3.axisBottom(x0))
          .selectAll("text")
          .style("text-anchor", "middle")
          .attr("transform", "rotate(-15)"); // Rotate x-axis labels by 45 degrees
      
      svg.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(y).ticks(10));
      
      // Tooltip for interaction
      const tooltip = d3.select(".tooltip");
      
      // Draw bars with interaction
      groupedData.forEach(group => {
          x1.domain(group.institutions.map(d => d.Institution)).rangeRound([0, x0.bandwidth()]);
      
          svg.append("g")
              .selectAll("rect")
              .data(group.institutions)
              .enter().append("rect")
              .attr("class", "bar")
              .attr("x", d => x0(group.jurisdiction) + x1(d.Institution))
              .attr("y", d => y(group.institutions.length))
              .attr("width", x1.bandwidth())
              .attr("height", d => height - margin.top - margin.bottom - y(group.institutions.length))
              .attr("fill", d => color(d.Institution))
              .on("mouseover", function(event, d) {
                  tooltip.transition()
                      .duration(200)
                      .style("opacity", .9);
                  tooltip.html(`${d.Institution}<br/>Established: ${d["Year of Establishement"]}`)
                      .style("left", (event.pageX) + "px")
                      .style("top", (event.pageY - 28) + "px");
              })
              .on("mouseout", function() {
                  tooltip.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
      });
      
      // Title
      svg.append("text")
          .attr("x", (width / 2) - margin.left - margin.right)
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .text("Institutions by Subject Matter Jurisdiction");
      
      // Legend at the bottom with wrapping for many items
      const legendItems = svg.selectAll(".legend")
          .data(color.domain())
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { 
              const columns = Math.ceil(Math.sqrt(color.domain().length)); // Determine columns based on square root
              const row = Math.floor(i / columns);
              const col = i % columns;
              return "translate(" + (col * 120) + "," + (height - margin.top - margin.bottom + 130 + row * 20) + ")"; // Adjusted y-position for legend
          });
      
      legendItems.append("rect")
          .attr("x", 0)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", d => color(d));
      
      legendItems.append("text")
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "start")
          .style("font-size", "9px")
          .text(d => d);
      