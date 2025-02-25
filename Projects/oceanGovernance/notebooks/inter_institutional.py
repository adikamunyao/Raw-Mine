import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import seaborn as sns

# Example data (Replace this list with your actual text data)
data = [
    "Collaborate with UN Specialized Agencies and International Organizations on Marine Sciences...",
    "Collaborate with 66 Intergovernmental Organizations...",
    "Collaborate with International Seabed Authority...",
    # Add all the data you have here
]

# Step 1: Preprocessing
# Using TfidfVectorizer to convert text data into numerical data
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.85, max_features=1000)
X = vectorizer.fit_transform(data)

# Step 2: Apply KMeans Clustering
# Try different values of k to find the optimal number of themes
k_values = range(2, 15)
silhouette_scores = []

for k in k_values:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    silhouette_scores.append(silhouette_score(X, kmeans.labels_))

# Plot Silhouette Scores to find optimal k
plt.figure(figsize=(8,6))
plt.plot(k_values, silhouette_scores, marker='o')
plt.title('Silhouette Score vs. Number of Clusters')
plt.xlabel('Number of Clusters (k)')
plt.ylabel('Silhouette Score')
plt.show()

# Optimal K (say we choose 5 based on the plot)
optimal_k = 5

# Apply KMeans clustering with optimal k
kmeans = KMeans(n_clusters=optimal_k, random_state=42)
kmeans.fit(X)

# Step 3: Analyze the clusters and label the themes
labels = kmeans.labels_
terms = vectorizer.get_feature_names_out()

# Step 4: Display key terms per cluster
n_top_words = 10
for i in range(optimal_k):
    print(f"\nCluster {i + 1}:")
    cluster_terms = np.array(terms)[np.argsort(kmeans.cluster_centers_[i])][::-1][:n_top_words]
    print(", ".join(cluster_terms))

# Step 5: Visualize Clusters using PCA for dimensionality reduction
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X.toarray())

# Create a DataFrame for plotting
df_pca = pd.DataFrame(X_pca, columns=['PCA1', 'PCA2'])
df_pca['Cluster'] = labels

# Plot the clusters
plt.figure(figsize=(10, 8))
sns.scatterplot(data=df_pca, x='PCA1', y='PCA2', hue='Cluster', palette='viridis', s=100, edgecolor='k', alpha=0.7)
plt.title('PCA Projection of the Clusters')
plt.show()

# Step 6: Assign themes to each cluster based on the top terms
# Print the documents in each cluster to analyze
for i in range(optimal_k):
    print(f"\nDocuments in Cluster {i + 1}:")
    cluster_docs = np.array(data)[labels == i]
    for doc in cluster_docs:
        print(f"- {doc[:150]}...")  # Print first 150 characters of each document
