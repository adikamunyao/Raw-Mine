# preprocessing.py
import re
import nltk
import pandas as pd
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
import spacy

# Ensure necessary NLTK resources are downloaded
nltk.download('stopwords')
nltk.download('punkt')

# Define stopwords and lemmatizer
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

# Initialize spaCy for Named Entity Recognition (NER)
nlp = spacy.load('en_core_web_sm')


def clean_text(text):
    """
    Clean the text by removing URLs, punctuation, stopwords, and converting to lowercase.
    
    Args:
    - text (str): The input text to be cleaned.
    
    Returns:
    - str: The cleaned text.
    """
    # Remove URLs
    text = re.sub(r'http\S+', '', text)
    # Remove punctuation and digits
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Convert to lowercase
    text = text.lower()
    # Remove stopwords
    text = ' '.join([word for word in text.split() if word not in stop_words])
    
    return text


def lemmatize_text(text):
    """
    Lemmatize the text by reducing words to their base or root form.
    
    Args:
    - text (str): The input text to be lemmatized.
    
    Returns:
    - str: The lemmatized text.
    """
    return ' '.join([lemmatizer.lemmatize(word) for word in text.split()])


def tokenize_text(text):
    """
    Tokenize the text into words using nltk's word_tokenize.
    
    Args:
    - text (str): The input text to be tokenized.
    
    Returns:
    - list: A list of tokens (words).
    """
    return word_tokenize(text)


def extract_entities(text):
    """
    Extract named entities (e.g., organizations, locations) using spaCy NER.
    
    Args:
    - text (str): The input text to extract named entities from.
    
    Returns:
    - list: A list of named entities found in the text.
    """
    doc = nlp(text)
    entities = [ent.text for ent in doc.ents]
    return entities


def extract_tfidf_terms(text_data):
    """
    Extract key terms using TF-IDF (Term Frequency-Inverse Document Frequency).
    
    Args:
    - text_data (list): A list of text documents (str) for TF-IDF analysis.
    
    Returns:
    - pd.DataFrame: Dataframe with TF-IDF terms and their respective scores.
    """
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(text_data)
    
    # Convert TF-IDF matrix to a DataFrame
    tfidf_df = pd.DataFrame(tfidf_matrix.toarray(), columns=vectorizer.get_feature_names_out())
    
    return tfidf_df


def preprocess_dataframe(df, text_column):
    """
    Preprocess the dataframe by applying cleaning, tokenization, lemmatization,
    and named entity extraction to the specified text column.
    
    Args:
    - df (pd.DataFrame): The input dataframe containing the textual data.
    - text_column (str): The column name containing the text data.
    
    Returns:
    - pd.DataFrame: The dataframe with preprocessed text data.
    """
    # Apply the text cleaning process
    df['cleaned_text'] = df[text_column].apply(clean_text)
    
    # Lemmatize the cleaned text
    df['lemmatized_text'] = df['cleaned_text'].apply(lemmatize_text)
    
    # Tokenize the lemmatized text
    df['tokens'] = df['lemmatized_text'].apply(tokenize_text)
    
    # Extract named entities from the lemmatized text
    df['entities'] = df['lemmatized_text'].apply(extract_entities)
    
    return df


