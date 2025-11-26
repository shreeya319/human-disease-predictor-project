# app.py
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from models import db, User, Feedback
from train_model import diseaseDB
import joblib
import bcrypt

# -------------------
# Initialize Flask
# -------------------
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///register.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your-secret-key-here'
db.init_app(app)

# -------------------
# Load ML model & encoder
# -------------------
model = joblib.load("model.pkl")                  # Your trained model
encoder = joblib.load("symptoms_encoder.pkl")    # Symptom encoder



# -------------------
# Routes
# -------------------
@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        age = request.form.get('age')
        gender = request.form.get('gender')
        pwd = request.form.get('password')

        if not all([full_name, email, phone, age, gender, pwd]):
            flash('All fields are required.')
            return redirect(url_for('home'))

        hashed = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt())

        new_user = User(
            full_name=full_name,
            email=email,
            phone_number=phone,
            age=int(age),
            gender=gender,
            password=hashed.decode('utf-8')
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            user_id = new_user.id
            return render_template('index.html', user_id=user_id)
        except Exception as e:
            db.session.rollback()
            flash('Error: ' + str(e))
            return redirect(url_for('home'))

    return render_template('index.html', user_id=None)


@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    name = request.form.get('name')
    email = request.form.get('email')
    feedback_type = request.form.get('feedback_type')
    rating = request.form.get('rating')
    message = request.form.get('message')

    if not all([name, email, feedback_type, rating, message]):
        flash("⚠️ Please fill all fields.", "error")
        return redirect(url_for('home') + "#feedback")

    feedback = Feedback(
        name=name,
        email=email,
        feedback_type=feedback_type,
        rating=int(rating),
        message=message
    )

    try:
        db.session.add(feedback)
        db.session.commit()
        flash("✅ Thank you for your feedback!", "success")
    except Exception as e:
        db.session.rollback()
        flash("❌ Error saving feedback.", "error")
        app.logger.exception("Error saving feedback")

    return redirect(url_for('home') + "#feedback")


# Predict disease by ml
@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    data = request.get_json()
    selected_symptoms = data.get("symptoms", [])

    if not selected_symptoms:
        return jsonify({"error": "No symptoms selected"}), 400

    try:
        print("Selected Symptoms:", selected_symptoms)  # Debug
        # Transform selected symptoms using MultiLabelBinarizer
        X = encoder.transform([selected_symptoms])
        print("Transformed X:", X)  # Debug

        # Predict disease
        prediction = model.predict(X)[0]
        print("Prediction:", prediction)  # Debug

        # Probability if supported
        probability = None
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(X)
            idx = list(model.classes_).index(prediction)
            probability = round(probs[0][idx] * 100, 2)

        # Get description from diseaseDB
        description = next((d.get("description", "No description available.") for d in diseaseDB if d["name"] == prediction), "No description available.")

        return jsonify({
            "disease": prediction,
            "probability": probability,
            "description": description
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
