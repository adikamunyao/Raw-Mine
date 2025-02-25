# Step 2: Keyword Frequency Analysis
from nltk.probability import FreqDist

# Step 2: Keyword Frequency Analysis
def frequency_analysis(text_data):
    # Tokenize all the text data
    all_tokens = word_tokenize(" ".join(text_data).lower())
    # Filter out stopwords
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in all_tokens if word not in stop_words and word.isalpha()]
    # Frequency distribution
    freq_dist = FreqDist(filtered_tokens)
    return freq_dist

# Perform frequency analysis
freq_dist = frequency_analysis(processed_igo_data)
print(freq_dist.most_common(10))  # Display top 10 most frequent words


# Step 3: Clustering and Categorization

from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import CountVectorizer

# Step 3: Clustering and Categorization
def cluster_themes(text_data, num_clusters=4):
    # Convert text data into a document-term matrix using CountVectorizer
    vectorizer = CountVectorizer(stop_words='english')
    X = vectorizer.fit_transform(text_data)
    
    # Perform KMeans clustering
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    kmeans.fit(X)
    
    # Get the cluster labels
    cluster_labels = kmeans.labels_
    return cluster_labels, vectorizer.get_feature_names_out()

# Cluster the themes
cluster_labels, feature_names = cluster_themes(processed_igo_data)
print("Cluster Labels:", cluster_labels)
print("Feature Names:", feature_names)

# Step 4: Classification
# Step 4: Classification of IGOs into categories
def classify_igos(cluster_labels, igo_data):
    categories = {
        0: "Sustainable Development & Capacity Building",
        1: "Environmental Protection & Climate Change",
        2: "Human Rights, Social Justice & Advocacy",
        3: "Research, Science & Innovation"
    }
    classified_igos = []
    for i, label in enumerate(cluster_labels):
        classified_igos.append({"IGO": igo_data[i], "Category": categories[label]})
    return classified_igos

# Classify IGOs
classified_igos = classify_igos(cluster_labels, igo_data)
for classified_igo in classified_igos:
    print(f"IGO: {classified_igo['IGO']} - Category: {classified_igo['Category']}")
