# train_model.py
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
import joblib

# Your disease-symptom database
diseaseDB = [
    {"name": 'Flu', "symptoms": ['fever', 'cough', 'fatigue', 'headache', 'chills']},
    {"name": 'Common Cold', "symptoms": ['cough', 'runny-nose', 'sore-throat', 'sneezing', 'congestion']},
    {"name": 'Migraine', "symptoms": ['headache', 'nausea', 'vomiting', 'fatigue', 'sensitivity-to-light']},
    {"name": 'Allergy', "symptoms": ['runny-nose', 'sneezing', 'itching', 'rash', 'congestion']},
    {"name": 'COVID-19', "symptoms": ['fever', 'cough', 'fatigue', 'shortness-of-breath', 'loss-of-appetite']},
    {"name": 'Pneumonia', "symptoms": ['fever', 'cough', 'chest-pain', 'shortness-of-breath', 'chills']},
    {"name": 'Asthma', "symptoms": ['wheezing', 'shortness-of-breath', 'chest-pain', 'cough']},
    {"name": 'Bronchitis', "symptoms": ['cough', 'chest-pain', 'fatigue', 'sore-throat']},
    {"name": 'Gastroenteritis', "symptoms": ['nausea', 'vomiting', 'diarrhea', 'abdominal-pain', 'fatigue']},
    {"name": 'Food Poisoning', "symptoms": ['nausea', 'vomiting', 'diarrhea', 'stomach-cramps', 'fever']},
    {"name": 'Acid Reflux (GERD)', "symptoms": ['heartburn', 'chest-pain', 'bloating', 'loss-of-appetite']},
    {"name": 'Constipation', "symptoms": ['constipation', 'bloating', 'abdominal-pain']},
    {"name": 'Diabetes', "symptoms": ['fatigue', 'weakness', 'frequent-urination', 'loss-of-appetite']},
    {"name": 'Anemia', "symptoms": ['fatigue', 'weakness', 'pale-skin', 'dizziness']},
    {"name": 'Heat Stroke', "symptoms": ['fever', 'confusion', 'weakness', 'dizziness', 'cold-sweats']},
    {"name": 'Meningitis', "symptoms": ['fever', 'headache', 'confusion', 'nausea', 'stiff-neck']},
    {"name": 'Epilepsy', "symptoms": ['seizures', 'confusion', 'memory-loss', 'numbness']},
    {"name": 'Stroke', "symptoms": ['numbness', 'speech-difficulty', 'weakness', 'balance-problems', 'confusion']},
    {"name": 'Parkinson’s Disease', "symptoms": ['tremors', 'balance-problems', 'speech-difficulty', 'fatigue']},
    {"name": 'Dermatitis', "symptoms": ['itching', 'rash', 'swelling', 'redness']},
    {"name": 'Jaundice', "symptoms": ['yellow-skin', 'fatigue', 'loss-of-appetite', 'weakness']},
    {"name": 'Malaria', "symptoms": ['fever', 'chills', 'sweating', 'headache', 'nausea']},
    {"name": 'Tuberculosis (TB)', "symptoms": ['cough', 'chest-pain', 'fever', 'night-sweats']},
    {"name": 'Dehydration', "symptoms": ['weakness', 'dizziness', 'fatigue', 'dry-mouth']},
    {"name": 'Anxiety Disorder', "symptoms": ['fatigue', 'dizziness', 'confusion', 'weakness']},
    {"name": 'Skin Infection', "symptoms": ['swelling', 'rash', 'itching', 'pain']},
    {"name": 'Sinusitis', "symptoms": ['congestion', 'headache', 'runny-nose', 'facial-pain']},
    {"name": 'Liver Disease', "symptoms": ['yellow-skin', 'fatigue', 'nausea', 'abdominal-pain']},
    {"name": 'Dengue Fever', "symptoms": ['fever', 'headache', 'rash', 'fatigue', 'pain-behind-eyes']},
    {"name": 'Typhoid Fever', "symptoms": ['fever', 'abdominal-pain', 'weakness', 'loss-of-appetite']}
]

df = pd.DataFrame(diseaseDB)

# Encode symptoms
mlb = MultiLabelBinarizer()
X = mlb.fit_transform(df['symptoms'])
y = df['name']

# Train RandomForest
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X, y)

# Save model & encoder
joblib.dump(model, "model.pkl")
joblib.dump(mlb, "symptoms_encoder.pkl")

print("Model and encoder saved!")
