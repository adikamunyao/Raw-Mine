const width = 1800;
const height =2800;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


    const data = [
        { "Institution": "IOC", "Key Activities/Initiatives": "Tsunami Ready Programme, UN Decade of Ocean Science", "Collaboration Type": "Joint planning, advocacy", "Collaborating Organizations/Stakeholders": "UN, regional organizations" },
        { "Institution": "FAO", "Key Activities/Initiatives": "Global Action Programme on Food Security, World Food Day", "Collaboration Type": "Joint planning, advocacy", "Collaborating Organizations/Stakeholders": "UN bodies, small island states" },
        { "Institution": "IMO Secretariat", "Key Activities/Initiatives": "Maritime safety, GloFouling Partnerships, ISPS Code", "Collaboration Type": "Data sharing, capacity building", "Collaborating Organizations/Stakeholders": "Regional groups, contractors" },
        { "Institution": "UN DOALOS", "Key Activities/Initiatives": "Marine governance, UN Oceans Conference", "Collaboration Type": "Policy coordination, technical support", "Collaborating Organizations/Stakeholders": "UN bodies, regional intergovernmental orgs" },
        { "Institution": "UNFCCC", "Key Activities/Initiatives": "COP decisions, Green Climate Fund, IPCC collaboration", "Collaboration Type": "Climate action coordination", "Collaborating Organizations/Stakeholders": "IPCC, GEF, UN bodies" },
        { "Institution": "ISA", "Key Activities/Initiatives": "Seabed exploration, GloFouling Partnerships", "Collaboration Type": "International cooperation, data sharing", "Collaborating Organizations/Stakeholders": "Contractors, regional orgs" },
        { "Institution": "UNEP", "Key Activities/Initiatives": "Environmental sustainability, monitoring global environment", "Collaboration Type": "Collaboration, policy integration", "Collaborating Organizations/Stakeholders": "Private sector, civil society" },
        { "Institution": "UNDP", "Key Activities/Initiatives": "SDG implementation, climate action projects", "Collaboration Type": "Technical assistance, advocacy", "Collaborating Organizations/Stakeholders": "Governments, foundations, private sector" },
        { "Institution": "UNCTAD", "Key Activities/Initiatives": "Trade research, policy advice", "Collaboration Type": "Research collaboration, capacity-building", "Collaborating Organizations/Stakeholders": "International organizations, private sector" },
        { "Institution": "UNIDO", "Key Activities/Initiatives": "Industrial development, capacity building", "Collaboration Type": "Technical assistance, partnerships", "Collaborating Organizations/Stakeholders": "Governments, private sector" },
        { "Institution": "ILO", "Key Activities/Initiatives": "Labour standards, social justice", "Collaboration Type": "Social dialogue, technical assistance", "Collaborating Organizations/Stakeholders": "Employers, social partners, UN agencies" },
        { "Institution": "ITU", "Key Activities/Initiatives": "Telecommunications development, international cooperation", "Collaboration Type": "Technical coordination", "Collaborating Organizations/Stakeholders": "Private sector, UN bodies" },
        { "Institution": "UNICEF", "Key Activities/Initiatives": "Child protection, education, nutrition", "Collaboration Type": "Advocacy, partnerships", "Collaborating Organizations/Stakeholders": "NGOs, UN agencies" },
        { "Institution": "WHO", "Key Activities/Initiatives": "One Health Joint Plan, health standards", "Collaboration Type": "Joint planning, technical support", "Collaborating Organizations/Stakeholders": "FAO, UNEP, WOAH" },
        { "Institution": "OHCHR", "Key Activities/Initiatives": "Human rights integration, social justice", "Collaboration Type": "Advocacy, research", "Collaborating Organizations/Stakeholders": "UN bodies, social partners" },
        { "Institution": "UNDRR", "Key Activities/Initiatives": "Disaster risk reduction, Sendai Framework", "Collaboration Type": "Disaster resilience, capacity building", "Collaborating Organizations/Stakeholders": "UCLG, ICLEI, UN-Habitat" },
        { "Institution": "UN Global Compact", "Key Activities/Initiatives": "Business alignment with SDGs, sustainability", "Collaboration Type": "Advocacy, partnership", "Collaborating Organizations/Stakeholders": "Businesses, UN agencies" },
        { "Institution": "IAEA", "Key Activities/Initiatives": "Technical Cooperation Programme, Nuclear Security Plan", "Collaboration Type": "Joint planning, technical support, advocacy", "Collaborating Organizations/Stakeholders": "UNODC, INTERPOL, WCO" },
        { "Institution": "WMO", "Key Activities/Initiatives": "WMO Coordination Mechanism, Unified Data Policy", "Collaboration Type": "Policy coordination, technical support, advocacy", "Collaborating Organizations/Stakeholders": "Inter-Agency Standing Committee" },
        { "Institution": "OECD", "Key Activities/Initiatives": "Action Plan on SDGs, OECD Economic Outlook", "Collaboration Type": "Joint planning, policy development, advocacy", "Collaborating Organizations/Stakeholders": "Intergovernmental bodies, private sector" },
        { "Institution": "WBG", "Key Activities/Initiatives": "Global Practice Groups, Country Partnership Frameworks", "Collaboration Type": "Joint planning, technical assistance, advocacy", "Collaborating Organizations/Stakeholders": "G-20, UN Development System, Multilateral Development Banks" },
        { "Institution": "IMF", "Key Activities/Initiatives": "Climate change, inequality, and digitalization analysis", "Collaboration Type": "Policy coordination, advice, collaboration", "Collaborating Organizations/Stakeholders": "Interdepartmental working groups, UN agencies" },
        { "Institution": "IHO", "Key Activities/Initiatives": "Programme implementation, interagency committees", "Collaboration Type": "Joint planning, technical support, advocacy", "Collaborating Organizations/Stakeholders": "Various intergovernmental and multisectoral platforms" },
        { "Institution": "ICES", "Key Activities/Initiatives": "Programme implementation, policy advocacy", "Collaboration Type": "Joint planning, technical support, advocacy", "Collaborating Organizations/Stakeholders": "Intergovernmental committees, scientific organizations" },
        { "Institution": "IPBES", "Key Activities/Initiatives": "Assessments, biodiversity and ecosystem services initiatives", "Collaboration Type": "Joint planning, assessment, advocacy", "Collaborating Organizations/Stakeholders": "Intergovernmental bodies, research institutions" },
        { "Institution": "IPCC", "Key Activities/Initiatives": "Assessment reports, climate change policy guidance", "Collaboration Type": "Joint preparation, technical support, advocacy", "Collaborating Organizations/Stakeholders": "Intergovernmental bodies, scientific organizations" },
        { "Institution": "WTO", "Key Activities/Initiatives": "Programmes on trade, development, and policy frameworks", "Collaboration Type": "Joint planning, technical support, advocacy", "Collaborating Organizations/Stakeholders": "Various UN bodies, governments, private sector" },
        { "Institution": "IOM", "Key Activities/Initiatives": "Migration and refugee-related initiatives", "Collaboration Type": "Joint planning, advocacy, technical support", "Collaborating Organizations/Stakeholders": "Governments, UN agencies, NGOs" },
        { "Institution": "UNOPS", "Key Activities/Initiatives": "Sustainable project management, infrastructure development", "Collaboration Type": "Programme implementation, technical support", "Collaborating Organizations/Stakeholders": "Governments, UN bodies, private sector" },
        { "Institution": "UN-Women", "Key Activities/Initiatives": "Gender equality, women’s empowerment initiatives", "Collaboration Type": "Policy integration, technical support, advocacy", "Collaborating Organizations/Stakeholders": "Governments, civil society, private sector" },
        { "Institution": "WIPO", "Key Activities/Initiatives": "Intellectual property rights and innovation promotion", "Collaboration Type": "Policy development, advocacy, technical support", "Collaborating Organizations/Stakeholders": "Governments, private sector, scientific community" },
        { "Institution": "UNFPA", "Key Activities/Initiatives": "Sexual and reproductive health, gender equality policies", "Collaboration Type": "Programme implementation, advocacy", "Collaborating Organizations/Stakeholders": "Governments, civil society, private sector" },
        { "Institution": "UN-Habitat", "Key Activities/Initiatives": "Urbanization, sustainable cities initiatives", "Collaboration Type": "Joint planning, advocacy, technical support", "Collaborating Organizations/Stakeholders": "Governments, private sector, civil society" },
        { "Institution": "WFP", "Key Activities/Initiatives": "Food security and zero hunger initiatives", "Collaboration Type": "Programme coordination, technical support", "Collaborating Organizations/Stakeholders": "Governments, UN agencies, NGOs" },
        { "Institution": "UNWTO", "Key Activities/Initiatives": "Sustainable tourism promotion", "Collaboration Type": "Joint planning, advocacy, technical support", "Collaborating Organizations/Stakeholders": "Governments, private sector, academia" },
        { "Institution": "UNRISD", "Key Activities/Initiatives": "Social equity, inclusive development policies", "Collaboration Type": "Research, technical support, advocacy", "Collaborating Organizations/Stakeholders": "Governments, civil society, academia" },
        { "Institution": "BRS", "Key Activities/Initiatives": "Chemicals and waste management programmes", "Collaboration Type": "Joint planning, technical support, advocacy", "Collaborating Organizations/Stakeholders": "IOMC, ENFORCE, UN agencies" },
        { "Institution": "CBD", "Key Activities/Initiatives": "Biodiversity, ecosystem services initiatives", "Collaboration Type": "Programme implementation, advocacy", "Collaborating Organizations/Stakeholders": "Governments, civil society, private sector" },
        { "Institution": "CITES", "Key Activities/Initiatives": "Wildlife trade regulation, conservation", "Collaboration Type": "Joint projects, advocacy, technical support", "Collaborating Organizations/Stakeholders": "FAO, WHO, WCO, other biodiversity conventions" },
        { "Institution": "CMS", "Key Activities/Initiatives": "Sustainable rural development, poverty reduction", "Collaboration Type": "Joint projects, advocacy, technical support", "Collaborating Organizations/Stakeholders": "FAO, WFP, GEF, governments" },
        { "Institution": "IFAD", "Key Activities/Initiatives": "Sustainable trade, MSME development", "Collaboration Type": "Programme implementation, advocacy", "Collaborating Organizations/Stakeholders": "Governments, civil society, private sector" },
        { "Institution": "ITC", "Key Activities/Initiatives": "Addressing desertification, land degradation, and drought", "Collaboration Type": "Programme implementation, technical support", "Collaborating Organizations/Stakeholders": "UNCCD, scientific community, regional networks" },
        { "Institution": "UNCCD", "Key Activities/Initiatives": "Land degradation and desertification initiatives", "Collaboration Type": "Joint planning, advocacy, technical support", "Collaborating Organizations/Stakeholders": "UN bodies, civil society, governments" },
        { "Institution": "UNU", "Key Activities/Initiatives": "Wetland conservation, environmental protection", "Collaboration Type": "Joint initiatives, advocacy", "Collaborating Organizations/Stakeholders": "Governments, NGOs, scientific community" },
        { "Institution": "Ramsar", "Key Activities/Initiatives": "Wetland conservation under the Minamata Convention", "Collaboration Type": "Programme implementation, technical support", "Collaborating Organizations/Stakeholders": "Minamata Convention Secretariat, UN bodies" },
        { "Institution": "Minamata", "Key Activities/Initiatives": "Mercury reduction and environmental protection", "Collaboration Type": "Programme implementation, technical support", "Collaborating Organizations/Stakeholders": "Global Environment Facility, UN bodies" },
        { "Institution": "UNOOSA", "Key Activities/Initiatives": "Space science and outer space utilization", "Collaboration Type": "Joint planning, technical support, advocacy", "Collaborating Organizations/Stakeholders": "Governments, UN bodies, private sector" },
        { "Institution": "UNODC", "Key Activities/Initiatives": "Drug control, crime prevention, counter-terrorism", "Collaboration Type": "Programme implementation, technical support", "Collaborating Organizations/Stakeholders": "Governments, UN bodies, NGOs" }
    ];
    
    
    // Prepare data for force-directed layout
    const nodes = [];
    const links = [];
    
    // Iterate over data to create nodes and links
    data.forEach(d => {
        // Add institution node
        const institution = {id: d.Institution, group: 1};
        if (!nodes.some(node => node.id === institution.id)) nodes.push(institution);
    
        // Add activity nodes and links
        const activities = d["Key Activities/Initiatives"].split(",").map(a => a.trim());
        activities.forEach(activity => {
            const activityNode = {id: activity, group: 2};
            if (!nodes.some(node => node.id === activityNode.id)) nodes.push(activityNode);
            links.push({source: d.Institution, target: activity, value: 1});
        });
    
        // Add collaboration nodes and links
        const collaborations = d["Collaboration Type"].split(",").map(c => c.trim());
        collaborations.forEach(collaboration => {
            const collaborationNode = {id: collaboration, group: 3};
            if (!nodes.some(node => node.id === collaborationNode.id)) nodes.push(collaborationNode);
            activities.forEach(activity => {
                links.push({source: activity, target: collaboration, value: 1});
            });
        });
    
        // Add stakeholder nodes and links
        const stakeholders = d["Collaborating Organizations/Stakeholders"].split(",").map(s => s.trim());
        stakeholders.forEach(stakeholder => {
            const stakeholderNode = {id: stakeholder, group: 4};
            if (!nodes.some(node => node.id === stakeholderNode.id)) nodes.push(stakeholderNode);
            collaborations.forEach(collaboration => {
                links.push({source: collaboration, target: stakeholder, value: 1});
            });
        });
    });
    
    // Set up the force simulation
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2));
    
    // Add links to the SVG
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("class", "link");
    
    // Add nodes to the SVG
    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5)
        .attr("class", "node")
        .attr("fill", d => {
            switch(d.group) {
                case 1: return "#4e79a7"; // Institutions
                case 2: return "#f28e2b"; // Activities
                case 3: return "#e15759"; // Collaborations
                case 4: return "#76b7b2"; // Stakeholders
            }
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    // Add labels to the nodes
    const label = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(d => d.id)
        .style("font-size", "10px");
    
    // Tooltip for nodes
    const tooltip = d3.select(".tooltip");
    
    node.on("mouseover", function(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`<strong>${d.id}</strong><br/>Group: ${d.group}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
    
    // Update positions of elements on each tick of the simulation
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    
        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
    
    // Drag functions for nodes
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    