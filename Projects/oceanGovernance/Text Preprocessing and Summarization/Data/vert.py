import re

# Sample data (5 institutions)
data = {
    "IOC": "Vertical coordination within the IOC involves collaboration with various levels of institutions and authorities. The IOC, under UNESCO, engages with Member States, United Nations bodies, and other international organizations to achieve its objectives. This coordination is structured under the IOC’s statutes and strategic plans, which outline the framework for cooperation with entities at different levels. The IOC operates through its Assembly, Executive Council, and Secretariat, which are responsible for implementing the decisions and strategies of the organization. The IOC also has subsidiary bodies, such as regional sub-commissions and working groups, that address specific regional and thematic areas. Within the Ocean Decade Framework, IOC coordinates with the Decade Coordination Unit (DCU), Decade Advisory Board, Ocean Decade Alliance, Decade Collaborative Centres, and Decade Implementing Partners.",
    "FAO": "The FAO’s vertical coordination involves collaboration with various levels of governance and institutions, including the United Nations, specialized agencies, regional and intergovernmental organizations, national governments, and local authorities. The FAO operates through the Conference of all the members, the Council, and a secretariat headed by a Director-General. It also has committees, commissions, and other subsidiary bodies that assist members in implementing standards, policies, and programmes, providing technical cooperation and assistance upon request. The FAO’s structure includes Regional, Liaison, and Country Offices, Subregional Offices, and Partnership and Liaison Offices, which facilitate the FAO’s work on the ground.",
    "IMO": "Vertical coordination within IMO involves collaboration with higher and lower level institutions, such as the United Nations, other specialized agencies, regional and sub-regional organizations, national governments, and local authorities. The IMO operates through its Assembly, Council, and a series of committees and sub-committees, Legal Committee, Technical Cooperation Committee, Facilitation Committee and the Secretariat that address various aspects of maritime safety, security, and environmental protection. It also works closely with Member States to implement and enforce international maritime conventions and standards. The IMO has regional coordinators/advisors for technical cooperation activities in Cote d'Ivoire, Ghana, Kenya, Philippines and Trinidad and Tobago.",
    "UN DOALOS": "DOALOS engages in vertical coordination with various levels of institutions, including the United Nations, specialized agencies, regional bodies, national governments, and local authorities, as outlined in section 9.2 of its governing document. It operates under the guidance of the Under-Secretary-General for Legal Affairs and the Director of the Division, with specialized sections and units handling distinct functions. DOALOS aids in implementing the Convention and related Agreements, offering technical cooperation and capacity building, and supports the Commission on the Limits of the Continental Shelf and the Regular Process.",
    "UNFCCC": "Vertical coordination within UNFCCC involves collaboration with higher and lower level institutions, such as the United Nations, other specialized agencies, regional and sub-regional organizations, national governments, and local authorities. The UNFCCC operates through a Conference of the Parties (COP) of all the members, a Bureau of 11 members, and a secretariat headed by an Executive Secretary. The UNFCCC also has two subsidiary bodies for scientific and technological advice (SBSTA) and for implementation (SBI), as well as other subsidiary bodies and mechanisms as needed. The UNFCCC facilitates the provision of financial resources and the transfer of technology to developing country Parties."
}

# Themes and keywords for organic assignment
themes = {
    "National Policy Implementation": ["national governments", "member states", "implementing"],
    "Capacity Building Support": ["technical cooperation", "assistance", "training"],
    "Local Project Execution": ["country offices", "local authorities", "on the ground"],
    "Regional Framework Adaptation": ["regional", "sub-regional", "regional offices"],
    "Monitoring and Reporting": ["report", "oversight", "monitor"],
    "Funding Mechanisms": ["financial resources", "funding", "budget"],
    "Stakeholder Engagement": ["collaboration with", "partnerships", "engages with"]
}

def clean_text(text):
    text = re.sub(r'http[s]?://[^\s]+', '', text)
    text = re.sub(r'\s+', ' ', text.strip())
    text = text.replace("instututions", "institutions")
    return text

def summarize_text(text):
    sentences = text.split('. ')
    summary = " ".join(sentences[:2])
    return summary.strip()

def assign_themes(text):
    assigned_themes = []
    text_lower = text.lower()
    for theme, keywords in themes.items():
        if any(keyword in text_lower for keyword in keywords):
            assigned_themes.append(theme)
    return ", ".join(assigned_themes) if assigned_themes else "None"

# Process data
results = {}
for inst, raw_text in data.items():
    cleaned_text = clean_text(raw_text)
    summary = summarize_text(cleaned_text)
    themes_assigned = assign_themes(cleaned_text)
    results[inst] = {
        "Cleaned Practical Vertical Coordination": cleaned_text,
        "Summarized Practical Vertical Coordination": summary,
        "Practical Vertical Coordination Themes": themes_assigned
    }

# Display results
print("Institution | Cleaned Practical Vertical Coordination | Summarized Practical Vertical Coordination | Practical Vertical Coordination Themes")
print("-" * 150)
for inst, values in results.items():
    print(f"{inst} | {values['Cleaned Practical Vertical Coordination']} | {values['Summarized Practical Vertical Coordination']} | {values['Practical Vertical Coordination Themes']}")