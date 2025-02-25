import re
import spacy
import pandas as pd
from spacy.matcher import Matcher
import spacy.cli
spacy.cli.download("en_core_web_lg")

class SpatialJurisdictionExtractor:
    def __init__(self, language_model="en_core_web_sm"):
        # Load SpaCy NLP model
        self.nlp = spacy.load(language_model)
        self.matcher = Matcher(self.nlp.vocab)
        
        # Define boundary patterns
        self.boundary_patterns = [
            {"label": "EEZ", "pattern": [{"lower": "exclusive"}, {"lower": "economic"}, {"lower": "zone"}]},
            {"label": "Territorial Seas", "pattern": [{"lower": "territorial"}, {"lower": "seas"}]},
            {"label": "International Waters", "pattern": [{"lower": "international"}, {"lower": "waters"}]},
            {"label": "Coastal Areas", "pattern": [{"lower": "coastal"}, {"lower": "areas"}]},
            {"label": "Inland Waters", "pattern": [{"lower": "inland"}, {"lower": "waters"}]},
            {"label": "Oceanic Resources", "pattern": [{"lower": "oceanic"}, {"lower": "resources"}]},
            {"label": "Maritime Safety and Security", "pattern": [{"lower": "maritime"}, {"lower": "safety"}, {"lower": "security"}]},
            {"label": "Environmental Protection", "pattern": [{"lower": "environmental"}, {"lower": "protection"}]},
            {"label": "High Seas", "pattern": [{"lower": "high"}, {"lower": "seas"}]},
            {"label": "Outer Limits", "pattern": [{"lower": "outer"}, {"lower": "limits"}]},
            {"label": "Outer Space", "pattern": [{"lower": "outer"}, {"lower": "space"}]},
            {"label": "Desertification Regions", "pattern": [{"lower": "desertification"}]},
            {"label": "Ocean Space", "pattern": [{"lower": "ocean"}, {"lower": "space"}]}
        ]
        
        # Add patterns to the matcher
        for pattern in self.boundary_patterns:
            self.matcher.add(pattern["label"], [pattern["pattern"]])

    def extract_geographic_scope(self, text):
        text = text.lower()
        
        global_patterns = [
            "global", "covers all countries", "entire", "all regions", "worldwide", 
            "international", "across the world", "globally", "universal", "covering all regions", 
            "world’s oceans", "all oceans"
        ]
        
        regional_patterns = [
            "regional", "local", "subregion", "in the region", "within the region", 
            "africa", "asia", "europe", "pacific", "mediterranean", "caribbean", 
            "latin america", "middle east", "south america", "north america", 
            "southeast asia", "sub-saharan africa", "oceans", "desertification", "outer space", "populations", 
            "coastal", "rural"
        ]
        
        if any(pattern in text for pattern in global_patterns):
            return "Global"
        
        elif any(pattern in text for pattern in regional_patterns):
            return "Regional/Local"
        
        elif "outer space" in text:
            return "Outer Space"
        elif "oceans" in text:
            return "Oceans"
        elif "land-based" in text or "desertification" in text:
            return "Land-based"

        return "No Specific"

    def extract_boundaries(self, text):
        boundaries = []
        
        # Use SpaCy NLP to detect custom jurisdictional terms
        doc = self.nlp(text)
        matches = self.matcher(doc)
        for match_id, start, end in matches:
            span = doc[start:end]
            boundaries.append(span.text)
        
        # Regex matching for boundary terms
        if re.search(r'\bexclusive economic zones?\b', text, re.IGNORECASE):
            boundaries.append("Exclusive Economic Zones (EEZs)")
        if re.search(r'\bterritorial seas?\b', text, re.IGNORECASE):
            boundaries.append("Territorial Seas")
        if re.search(r'\binternational waters?\b', text, re.IGNORECASE):
            boundaries.append("International Waters")
        if re.search(r'\bcoastal areas?\b', text, re.IGNORECASE):
            boundaries.append("Coastal Areas")
        if re.search(r'\binland waters?\b', text, re.IGNORECASE):
            boundaries.append("Inland Waters")
        if re.search(r'\boceanic resources?\b', text, re.IGNORECASE):
            boundaries.append("Oceanic Resources")
        if re.search(r'\bmaritime safety and security\b', text, re.IGNORECASE):
            boundaries.append("Maritime Safety and Security")
        if re.search(r'\benvironmental protection\b', text, re.IGNORECASE):
            boundaries.append("Environmental Protection")
        if re.search(r'\bhigh seas\b', text, re.IGNORECASE):
            boundaries.append("High Seas")
        if re.search(r'\bouter limits\b', text, re.IGNORECASE):
            boundaries.append("Outer Limits of National Jurisdiction")
        if re.search(r'\bouter space\b', text, re.IGNORECASE):
            boundaries.append("Outer Space")
        if re.search(r'\bdesertification\b', text, re.IGNORECASE):
            boundaries.append("Desertification Regions")

        # Match distances (e.g., 200 nautical miles, 500 km)
        distance_match = re.search(r'(\d+)\s*(nautical miles|kilometers|miles|km)', text, re.IGNORECASE)
        if distance_match:
            boundaries.append(f"Jurisdiction defined by {distance_match.group(1)} {distance_match.group(2)}")
        
        # Fallback if no specific boundaries were found
        if "global" in text and not boundaries:
            boundaries.append("Global Jurisdiction (No specific boundaries)")
        
        return ', '.join(boundaries) if boundaries else "Not Specified"

    def extract_references(self, text):
        urls = re.findall(r'https?://[^\s]+', text)
        treaties = re.findall(r'\b(UNCLOS|Paris Agreement|UN Convention on the Law of the Sea|Sustainable Development Goals|SDGs|Basel Convention|Minamata Convention|CBD|CITES|CMS|Outer Space Treaty|Outer Space Law)\b', text, re.IGNORECASE)
        
        references = urls + treaties
        return ', '.join(references) if references else "None"

    def summarize_spatial_jurisdiction(self, text):
        geographic_scope = self.extract_geographic_scope(text)
        boundaries = self.extract_boundaries(text)
        references = self.extract_references(text)
        return pd.Series([geographic_scope, boundaries, references], 
                         index=["Geographic Scope", "Boundaries", "References"])

