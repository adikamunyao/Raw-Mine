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

    const attributes = ["spatial", "subject", "source", "objectives", "strategies", "relationship", "vertical", "horizontal"];

    // Convert data into nodes and links for Sankey
    const nodes = [
        ...data.map(d => ({ node: d.institution, name: d.institution })),
        ...attributes.map(attr => ({ node: attr, name: attr }))
    ];
    
    const links = [];
    data.forEach(d => {
        attributes.forEach(attr => {
            if (d[attr] === "Yes") {
                links.push({ source: d.institution, target: attr, value: 1 });
            }
        });
    });
    
    const svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");
    
    const formatNumber = d3.format(",.0f"),
        format = function(d) { return formatNumber(d) + " Institutions"; },
        color = d3.scaleOrdinal(d3.schemeCategory10);
    
    const sankey = d3.sankey()
        .nodeWidth(15)
        .nodePadding(10)
        .size([width, height]);
    
    const path = sankey.link();
    
    const graph = { nodes, links };
    
    sankey(graph);
    
    const link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", d => Math.max(1, d.width));
    
    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);
    
    const node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .call(d3.drag()
            .subject(d => d)
            .on("start", function() { this.parentNode.appendChild(this); })
            .on("drag", dragmove));
    
    node.append("rect")
        .attr("height", d => d.dy)
        .attr("width", sankey.nodeWidth())
        .style("fill", d => color(d.name))
        .style("stroke", "black")
        .append("title")
        .text(d => d.name + "\n" + format(d.value));
    
    node.append("text")
        .attr("x", -6)
        .attr("y", d => d.dy / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(d => d.name)
        .filter(d => d.x < width / 2)
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");
    
    function dragmove(d) {
        d3.select(this).attr("transform", `translate(${d.x = d3.event.x},${d.y = d3.event.y})`);
        sankey.relayout();
        link.attr("d", path);
    }    