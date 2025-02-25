import re

# Reuse same data as First Assignment
data = {
    "IOC": "Horizontal coordination within the IOC encompasses collaboration across various sectors and stakeholders, including governments, scientific communities, and international institutions, to ensure ocean policies are integrated and aligned with broader governmental objectives. Forms of horizontal coordination within the IOC include: 1. Joint planning and execution of initiatives, such as the Tsunami Ready programme, 2. Participation in intergovernmental committees and global partnerships, like those fostering the UN Decade of Ocean Science for Sustainable Development, 3. Development and dissemination of guidelines and frameworks for ocean policy engagement, exemplified by the IOC Strategic Plan for Ocean Data and Information Management, 4. Advocacy and communication efforts to promote ocean science and sustainability, as seen in the State of ocean report and Advocacy campaigns like World Ocean Day.",
    "FAO": "Horizontal coordination within the FAO involves collaboration with different sectors and stakeholders within the food and agriculture domain, such as governments, civil society, private sector, scientific community, and other UN agencies to ensure that food security and nutrition are considered in all policies and that agricultural policies are aligned with other sectoral policies. Horizontal coordination within FAO can take various forms, such as: (1) Joint planning and implementation of programmes and projects with other sectors and stakeholders, such as the Global Action Programme on Food Security and Nutrition in Small Island States, (2) Participation in interagency and multisectoral committees, such as the Committee on World Food Security, (3) Development and dissemination of guidelines, such as the Voluntary Guidelines on Food Systems and Nutrition, (4) Advocacy campaigns like World Food Day or The State of Food Security and Nutrition in the World report.",
    "IMO": "Horizontal coordination within the IMO involves collaboration with different sectors and stakeholders within the maritime domain, such as governments, the shipping industry, port authorities, maritime training institutions, and other UN agencies to ensure that maritime safety, security, and environmental protection are integrated into all policies. Horizontal coordination within the IMO can take various forms, such as: (1) Joint planning and implementation of programmes and projects with other sectors and stakeholders, such as the Global SAR Plan, (2) Participation in interagency and multisectoral committees, networks, and platforms, such as the Global Integrated Shipping Information System, (3) Development and dissemination of guidelines, standards, and tools for maritime sector engagement with other sectors and stakeholders, such as the International Ship and Port Facility Security (ISPS) Code, (4) Advocacy and communication to raise awareness and mobilise support for maritime issues and policies among other sectors and stakeholders, such as the Day of the Seafarer.",
    "UN DOALOS": "Horizontal coordination within DOALOS involves collaboration with different sectors and stakeholders within the ocean domain, such as fisheries, environment, security, trade, science, private sector, civil society, and other UN agencies to ensure that ocean affairs and the law of the sea are integrated into all policies. Horizontal coordination within DOALOS can take various forms, such as: (1) Joint planning and implementation of programmes and projects with other sectors and stakeholders, (2) Participation in interagency and multisectoral committees, networks, and platforms, such as UN-Oceans, (3) Development and dissemination of guidelines, standards, and tools for engagement with other sectors and stakeholders, (4) Advocacy and communication to raise awareness and mobilise support for ocean issues and policies among other sectors and stakeholders.",
    "UNFCCC": "Horizontal coordination within the UNFCCC involves collaboration across various sectors and stakeholders in the climate change arena, including governments, institutions, civil society, the private sector, and the scientific community. This structure facilitates information exchange and communication on actions addressing climate change and its impacts via COP, SBSTA, SBI, IPCC, GEF, and GCF."
}

# Slightly adjusted keywords for second assignment to reflect reinterpretation
themes = {
    "Data Sharing Networks": ["data sharing", "information management", "information exchange"],
    "Joint Program Initiatives": ["joint planning", "programmes and projects", "initiatives"],
    "Policy Harmonization": ["policies are integrated", "aligned with", "policy coherence", "standards"],
    "Technical Assistance Partnerships": ["technical support", "guidelines", "capacity building"],
    "Environmental Synergies": ["environmental protection", "climate change", "sustainability"],
    "Regional Task Forces": ["regional", "sub-regional", "consultations"],
    "Cross-Sectoral Forums": ["committees", "partnerships", "advocacy", "forums", "networks"]
}

def clean_text(text):
    text = re.sub(r'http[s]?://[^\s]+', '', text)
    text = re.sub(r'\s+', ' ', text.strip())
    text = text.replace("collborates", "collaborates").replace("instututions", "institutions")
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
        "Cleaned Practical Horizontal Coordination": cleaned_text,
        "Summarized Practical Horizontal Coordination": summary,
        "Practical Horizontal Coordination Themes (Second Assignment)": themes_assigned
    }

# Display results
print("Institution | Cleaned Practical Horizontal Coordination | Summarized Practical Horizontal Coordination | Practical Horizontal Coordination Themes (Second Assignment)")
print("-" * 150)
for inst, values in results.items():
    print(f"{inst} | {values['Cleaned Practical Horizontal Coordination']} | {values['Summarized Practical Horizontal Coordination']} | {values['Practical Horizontal Coordination Themes (Second Assignment)']}")