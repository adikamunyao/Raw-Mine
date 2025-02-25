# Import necessary libraries
import torch
from transformers import T5Tokenizer, T5ForConditionalGeneration
from sklearn.model_selection import train_test_split
import pandas as pd
from torch.utils.data import DataLoader, Dataset

# Step 1: Install the necessary libraries
# !pip install transformers
# !pip install torch
# !pip install scikit-learn

# Load the pre-trained T5 model and tokenizer
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

# Sample data (replace with your actual dataset)
data = {
    'text': [
        "Global trade rules and agreements need constant evaluation for better cooperation.",
        "Climate change impacts affect both human health and the environment.",
        "Women's empowerment is essential for achieving gender equality in societies.",
        "Wildlife conservation requires international cooperation and policy support."
    ],
    'category': ['Trade', 'Climate Change', 'Gender Equality', 'Conservation']
}

# Convert data to DataFrame
df = pd.DataFrame(data)

# Split the data into training and testing sets
train_texts, test_texts, train_labels, test_labels = train_test_split(
    df['text'], df['category'], test_size=0.2, random_state=42
)

# Step 2: Tokenization and encoding function
def encode_data(texts, labels, tokenizer):
    encodings = tokenizer(texts.tolist(), truncation=True, padding=True, return_tensors="pt")
    labels_encodings = tokenizer(labels.tolist(), truncation=True, padding=True, return_tensors="pt")
    return encodings, labels_encodings

# Encode the training and testing data
train_encodings, train_labels_encodings = encode_data(train_texts, train_labels, tokenizer)
test_encodings, test_labels_encodings = encode_data(test_texts, test_labels, tokenizer)

# Step 3: Custom Dataset class for handling data during training
class TextDataset(Dataset):
    def __init__(self, encodings, labels_encodings):
        self.encodings = encodings
        self.labels_encodings = labels_encodings

    def __len__(self):
        return len(self.encodings.input_ids)

    def __getitem__(self, idx):
        return {'input_ids': self.encodings.input_ids[idx],
                'attention_mask': self.encodings.attention_mask[idx],
                'labels': self.labels_encodings.input_ids[idx]}

# Step 4: Create DataLoader for training
train_dataset = TextDataset(train_encodings, train_labels_encodings)
train_loader = DataLoader(train_dataset, batch_size=4, shuffle=True)

# Step 5: Define optimizer and loss function
optimizer = torch.optim.AdamW(model.parameters(), lr=5e-5)

# Step 6: Training loop
model.train()
for epoch in range(3):  # Number of epochs
    for batch in train_loader:
        optimizer.zero_grad()
        
        # Forward pass
        input_ids = batch['input_ids']
        attention_mask = batch['attention_mask']
        labels = batch['labels']

        outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
        loss = outputs.loss
        
        # Backward pass
        loss.backward()
        optimizer.step()
    
    print(f"Epoch {epoch + 1} completed. Loss: {loss.item()}")

# Save the model after training
model.save_pretrained('./t5_finetuned_model')
tokenizer.save_pretrained('./t5_finetuned_model')

# Step 7: Evaluation on the test set
model.eval()
with torch.no_grad():
    test_encodings, test_labels_encodings = encode_data(test_texts, test_labels, tokenizer)
    test_dataset = TextDataset(test_encodings, test_labels_encodings)
    test_loader = DataLoader(test_dataset, batch_size=4)

    correct_predictions = 0
    total_predictions = 0
    for batch in test_loader:
        input_ids = batch['input_ids']
        attention_mask = batch['attention_mask']
        labels = batch['labels']

        outputs = model.generate(input_ids=input_ids, attention_mask=attention_mask, max_length=50)
        predictions = tokenizer.batch_decode(outputs, skip_special_tokens=True)
        
        for pred, label in zip(predictions, labels):
            if pred == tokenizer.decode(label, skip_special_tokens=True):
                correct_predictions += 1
            total_predictions += 1
    
    accuracy = correct_predictions / total_predictions
    print(f"Accuracy on test data: {accuracy * 100:.2f}%")

# Step 8: Categorize new input text
def categorize_text(text, model, tokenizer):
    # Tokenize and encode the input text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    
    # Generate the prediction
    output = model.generate(input_ids=inputs['input_ids'], attention_mask=inputs['attention_mask'])
    
    # Decode the generated prediction
    predicted_category = tokenizer.decode(output[0], skip_special_tokens=True)
    return predicted_category

# Example usage for new text
new_text = "Renewable energy solutions are essential for sustainable development."
category = categorize_text(new_text, model, tokenizer)
print(f"The category for the input text is: {category}")

