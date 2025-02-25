import pandas as pd
import re

# Sample DataFrame with document information
data = {
    'Document Name': [
        'UNFCCC Convention', 
        'UNESCO', 
        'UNODC', 
        'CITES Convention'
    ],
    'Full Text': [
        "Article 2: The objective of the Convention is to stabilize the concentration of greenhouse gases in the atmosphere at a level that prevents dangerous anthropogenic interference with the climate system.",
        "Article 1: UNESCO's objectives include promoting peace, international cooperation, and understanding by fostering educational, scientific, and cultural exchanges.",
        "Section 2.1: Implementing the Organization's drug programme and crime programme in an integrated manner, addressing the interrelated issues of drug control, crime prevention and international terrorism in the context of sustainable development.",
        "Article 2: The Convention aims to ensure that international trade in wild animals and plants does not threaten their survival, and it works to regulate the trade of endangered species."
    ]
}

# Load the data into a pandas DataFrame
df = pd.DataFrame(data)

# Function to summarize objectives based on keyword extraction
def summarize_objectives(text):
    # Define keywords related to objectives
    keywords = ["objective", "goal", "function", "purpose", "mandate", "aim"]
    
    # Use regular expression to find lines containing keywords related to objectives
    objective_sentences = []
    sentences = re.split(r'\.|\n', text)  # Split by periods and newlines for sentences
    
    for sentence in sentences:
        if any(keyword in sentence.lower() for keyword in keywords):
            objective_sentences.append(sentence.strip())
    
    return " | ".join(objective_sentences)

# Apply summarization function to the DataFrame
df['Summarized Objectives'] = df['Full Text'].apply(summarize_objectives)

# Output the DataFrame with summarized objectives
print(df[['Document Name', 'Summarized Objectives']])

# Example: Output the summarized objectives for each document
for index, row in df.iterrows():
    print(f"Document: {row['Document Name']}")
    print(f"Objectives: {row['Summarized Objectives']}\n")

