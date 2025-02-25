import pandas as pd
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn import metrics

# Sample dataset with document text and category
data = {
    'Document': [
        "Convention on Biological Diversity, UNGA, COP, SDGs, Paris Agreement",
        "UNGA Resolution 56/195, Hyogo Framework for Disaster Risk Reduction, Sendai Framework",
        "Treaty of Versailles, Covenant of the League of Nations, ILO Constitution",
        "Articles of Agreement of IMF, Resolutions of the Board of Governors, Sustainable Development Goals",
        "UNGA, WTO, UNCTAD, GATT, Aid for Trade Initiative"
    ],
    'Category': [
        "Environmental Protection and Sustainability",
        "Disaster Risk Reduction and Climate Change",
        "International Law and Justice",
        "Trade and Economic Development",
        "International Organizations and Frameworks"
    ]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Tokenization and TF-IDF Vectorization
X = df['Document']
y = df['Category']

# Train-test split for evaluation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a pipeline with a TfidfVectorizer and Naive Bayes classifier
model = make_pipeline(TfidfVectorizer(), MultinomialNB())

# Train the model
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate accuracy
print("Accuracy:", metrics.accuracy_score(y_test, y_pred))

# Confusion Matrix
print("Confusion Matrix:")
print(metrics.confusion_matrix(y_test, y_pred))

# New documents to classify
new_documents = [
    "UNGA Resolution 65/176, Financial regulations, Paris Agreement, 2030 Agenda",
    "Convention on the Rights of the Child, CEDAW, International Labour Organization"
]

# Predict categories for new documents
predictions = model.predict(new_documents)
print("\nPredicted Categories for New Documents:")
for doc, category in zip(new_documents, predictions):
    print(f"Document: {doc}\nPredicted Category: {category}\n")

