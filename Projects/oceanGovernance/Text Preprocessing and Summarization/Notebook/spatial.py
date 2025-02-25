# List of spatial categories
categories = {
    "Territorial Sea": "Territorial seas, up to 12 nautical miles from the baseline.",
    "Contiguous Zone": "Up to 24 nautical miles from the baseline, adjacent to the territorial sea.",
    "Exclusive Economic Zone (EEZ)": "Up to 200 nautical miles from the baseline.",
    "Continental Shelf": "Beyond the territorial sea to a depth of 200 nautical miles or edge of the continental margin.",
    "High Seas": "Beyond the national jurisdiction of any state, beyond the EEZ.",
    "Area (Deep Seabed)": "Beyond national jurisdiction, seabed and ocean floor, common heritage of mankind.",
    "Internal Waters": "Waters landward of the baseline (e.g., bays, rivers, harbors).",
    "Archipelagic Waters": "Waters enclosed by the baseline connecting outermost points of an archipelago."
}

# List of jurisdiction descriptions
jurisdictions = [
    ("Global, exclusive economic zones (EEZs), territorial seas, 200 nautical miles.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea"]),
    ("Marine and inland waters, exclusive economic zones (EEZs), territorial seas, 200 nautical miles.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea"]),
    ("Global, territorial waters, exclusive economic zones (EEZs), 200 nautical miles.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea"]),
    ("No specific ocean space, outer limits of continental shelf beyond 200 nautical miles.", ["Continental Shelf"]),
    ("Global, atmosphere, land, ocean surfaces.", []),
    ("International seabed area, beyond the limits of national jurisdiction, ocean space, territory, maritime zones, about 50 percent of the world’s oceans.", ["High Seas", "Area (Deep Seabed)"]),
    ("Global, marine and coastal environment, all regions and subregions.", []),
    ("Global, more than 170 countries and territories, Africa, Asia, Europe, Latin America, Caribbean.", []),
    ("No specific geographical area.", []),
    ("Global, developing countries, countries with economies in transition.", []),
    ("Global, countries, territories, areas within the UN system, regional and subregional organizations.", []),
    ("Global, No specific geographical area.", []),
    ("Global, over 190 countries and territories, all continents and oceans.", []),
    ("Global, land and sea areas, countries and regions within the six WHO regions.", []),
    ("Global, all countries and territories.", []),
    ("Global, all regions and countries exposed to disaster risk, least developed countries, small island developing states, low water mark, coastal and inland areas.", ["Territorial Sea", "Exclusive Economic Zone (EEZ)", "Internal Waters"]),
    ("Global, ocean spaces, maritime zones, adjacent coastal areas, inland waters.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea", "Internal Waters"]),
    ("Global, nuclear activities and facilities, states that have signed the Treaty on the Non-Proliferation of Nuclear Weapons (NPT).", []),
    ("Global, weather, climate, water resources, atmospheric, oceanic, terrestrial domains.", []),
    ("Global, economic zones of 38 member countries.", ["Exclusive Economic Zone (EEZ)"]),
    ("No specific geographical area, Africa, East Asia and Pacific, Europe and Central Asia, Latin America and the Caribbean, Middle East and North Africa, South Asia, more than 189 member countries.", []),
    ("No specific geographical area, Global, 190 member countries, six regional offices.", []),
    ("Global, seas, oceans, navigable waters, exclusive economic zones (EEZs), territorial seas, continental shelves, inland waters, international boundaries, low water mark, outermost reaches of the marine environment.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea", "Continental Shelf", "High Seas", "Internal Waters"]),
    ("Atlantic Ocean, adjacent seas, North Atlantic, areas beyond national jurisdiction (ABNJ), exclusive economic zones (EEZs), territorial waters of 20 member countries.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea", "High Seas"]),
    ("No specific geographical area, Global, terrestrial, freshwater, coastal, marine biodiversity, ecosystem functions, ecosystem services, Africa, the Americas, Asia Pacific, Europe and Central Asia.", []),
    ("Global, atmosphere, oceans, cryosphere, land surface, biosphere, Africa, Asia, Australasia, Central and South America, Europe, Mountains, North and Central America, Polar Regions, Small Islands, Oceans.", []),
    ("Global, 164 member states, over 98% of global trade and global GDP.", []),
    ("Global, over 100 countries, 175 member states, 8 observer states.", []),
    ("Global, all regions and countries where it implements infrastructure and procurement projects.", []),
    ("Global, all regions and countries where the United Nations operates, conflict-affected and fragile states.", []),
    ("Global, 193 member states, all continents and regions, developing countries, least developed countries.", []),
    ("Global, Arab States, Asia & the Pacific, East & Southern Africa, Eastern Europe & Central Asia, Latin America & the Caribbean, West & Central Africa.", []),
    ("Global, more than 90 countries, five continents, cities and towns, rural and peri-urban areas.", []),
    ("Global, over 120 countries and territories.", []),
    ("Global, 160 member states, six associate members, developing countries, small island developing states (SIDS), oceans.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea"]),
    ("Global, developing world.", []),
    ("Global, ocean space, territory, maritime zones, high seas, Antarctic, areas beyond national jurisdiction.", ["High Seas", "Area (Deep Seabed)"]),
    ("National jurisdiction, exclusive economic zones (EEZs), territorial waters, contiguous zones, inland waters, coastal areas.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea", "Contiguous Zone", "Internal Waters"]),
    ("Global, member states, territories, trade in endangered species.", []),
    ("Global, migratory species, 133 countries, terrestrial, aquatic, avian species, national boundaries.", []),
    ("Rural areas, 177 member states, developing, middle, and high-income countries, all regions of the world, coastal communities, fisheries, aquaculture.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea"]),
    ("Global, Least Developed Countries, Landlocked Developing Countries, Small Island Developing States, Sub-Saharan Africa, Post-conflict and fragile states, regions and countries that are members of the World Trade Organization (WTO), regions and countries that are members of the United Nations (UN).", []),
    ("Dry and semi-arid lands regions, Africa, Asia, Latin America and the Caribbean, Central and Eastern Europe, Northern Mediterranean", []),
    ("No specific geographical area, no authority over oceans and maritime zones.", []),
    ("Wetlands within the territories of 163 Contracting Parties, marshes, peatlands, floodplains, rivers, lakes, coastal areas, coral reefs, marine areas no deeper than six metres at low tide, human-made wetlands.", ["Internal Waters", "Territorial Sea"]),
    ("Global, covering all 147 signatory states.", []),
    ("Global, outer space, 147 states, peaceful purposes, celestial bodies, international law, no authority over oceans.", []),
    ("Global, Exclusive Economic Zones (EEZs), Territorial waters, Member states' authority, Maritime regions, International waters, Coastal areas, Oceanic resources, Inland waters, Maritime safety and security, Environmental protection.", ["Exclusive Economic Zone (EEZ)", "Territorial Sea", "High Seas", "Internal Waters"]),
]

# Function to map each jurisdiction description to categories
def map_jurisdiction(description):
    mapped_categories = []
    
    for category, details in categories.items():
        # Check for keywords in the description
        if category.lower() in description.lower():
            mapped_categories.append(category)
    
    return mapped_categories

# Print results for each description
for description, expected_mapping in jurisdictions:
    print(f"Jurisdiction: {description}")
    mapped = map_jurisdiction(description)
    print(f"Mapped Categories: {mapped}")
    print(f"Expected Categories: {expected_mapping}")
    print("-" * 50)
