/* document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const nextButtons = document.querySelectorAll('.next-btn');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const symptomButtons = document.querySelectorAll('.symptom-btn');
    const symptomList = document.getElementById('symptom-list');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const tipCategories = document.querySelectorAll('.tips-category');
    const analyzeBtn = document.getElementById('analyze-symptoms');
    const predictionResults = document.getElementById('prediction-results');

    let selectedSymptoms = [];

    // ===== PAGE NAVIGATION =====
    function showPage(targetId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(targetId);
        if (targetPage) targetPage.classList.add('active');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + targetId) link.classList.add('active');
        });

        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showPage(this.getAttribute('href').substring(1));
            navMenu.classList.remove('active');
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', function () {
            const nextPage = this.getAttribute('data-next');
            if (nextPage) showPage(nextPage);
        });
    });

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // ===== SYMPTOM SELECTION =====
    symptomButtons.forEach(button => {
        button.addEventListener('click', function () {
            const symptom = this.getAttribute('data-symptom');
            if (!symptom) return;

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
            } else {
                this.classList.add('selected');
                selectedSymptoms.push(symptom);
            }
            updateSymptomList();
        });
    });

    function updateSymptomList() {
        symptomList.innerHTML = '';
        selectedSymptoms.forEach(symptom => {
            const tag = document.createElement('div');
            tag.className = 'symptom-tag';
            tag.innerHTML = `
                <span>${symptom.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                <span class="remove-symptom" data-symptom="${symptom}">×</span>
            `;
            symptomList.appendChild(tag);
        });

        document.querySelectorAll('.remove-symptom').forEach(btn => {
            btn.addEventListener('click', function () {
                const symptom = this.getAttribute('data-symptom');
                selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
                const symptomButton = document.querySelector(`[data-symptom="${symptom}"]`);
                if (symptomButton) symptomButton.classList.remove('selected');
                updateSymptomList();
            });
        });
    }

    // ===== CATEGORY TOGGLING =====
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            tipCategories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.getAttribute('data-category') === category) cat.classList.add('active');
            });
        });
    });

    // ===== NAVBAR EFFECT =====
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.95) 0%, rgba(118,75,162,0.95) 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // ===== DISEASE DATABASE (Frontend Only) =====
    const diseaseDB = [
        { name: 'Flu', symptoms: ['fever', 'cough', 'fatigue', 'headache', 'chills'], description: 'Common viral infection causing fever, fatigue, cough, and body aches.' },
        { name: 'Common Cold', symptoms: ['cough', 'runny-nose', 'sore-throat', 'sneezing', 'congestion'], description: 'Mild viral infection affecting the nose and throat.' },
        { name: 'Migraine', symptoms: ['headache', 'nausea', 'vomiting', 'fatigue', 'sensitivity-to-light'], description: 'Severe headache often accompanied by nausea and sensitivity to light.' },
        { name: 'Allergy', symptoms: ['runny-nose', 'sneezing', 'itching', 'rash', 'congestion'], description: 'Reaction to allergens like pollen, dust, or pet dander.' },
        { name: 'COVID-19', symptoms: ['fever', 'cough', 'fatigue', 'shortness-of-breath', 'loss-of-appetite'], description: 'Viral respiratory illness causing fever, fatigue, and breathing issues.' },
        { name: 'Pneumonia', symptoms: ['fever', 'cough', 'chest-pain', 'shortness-of-breath', 'chills'], description: 'Infection inflaming air sacs in one or both lungs.' },
        { name: 'Asthma', symptoms: ['wheezing', 'shortness-of-breath', 'chest-pain', 'cough'], description: 'Condition in which airways narrow and swell, causing breathing difficulty.' },
        { name: 'Bronchitis', symptoms: ['cough', 'chest-pain', 'fatigue', 'sore-throat'], description: 'Inflammation of the bronchial tubes leading to persistent cough.' },
        { name: 'Gastroenteritis', symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal-pain', 'fatigue'], description: 'Stomach flu causing vomiting, diarrhea, and abdominal cramps.' },
        { name: 'Food Poisoning', symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach-cramps', 'fever'], description: 'Illness caused by consuming contaminated food or water.' },
        { name: 'Acid Reflux (GERD)', symptoms: ['heartburn', 'chest-pain', 'bloating', 'loss-of-appetite'], description: 'Digestive disorder causing acid to flow back into the esophagus.' },
        { name: 'Constipation', symptoms: ['constipation', 'bloating', 'abdominal-pain'], description: 'Difficulty in passing stool, often due to diet or dehydration.' },
        { name: 'Diabetes', symptoms: ['fatigue', 'weakness', 'frequent-urination', 'loss-of-appetite'], description: 'Metabolic disorder leading to high blood sugar levels.' },
        { name: 'Anemia', symptoms: ['fatigue', 'weakness', 'pale-skin', 'dizziness'], description: 'Lack of healthy red blood cells causing fatigue and weakness.' },
        { name: 'Heat Stroke', symptoms: ['fever', 'confusion', 'weakness', 'dizziness', 'cold-sweats'], description: 'Condition caused by overheating, leading to confusion and high fever.' },
        { name: 'Meningitis', symptoms: ['fever', 'headache', 'confusion', 'nausea', 'stiff-neck'], description: 'Inflammation of membranes surrounding the brain and spinal cord.' },
        { name: 'Epilepsy', symptoms: ['seizures', 'confusion', 'memory-loss', 'numbness'], description: 'Neurological disorder marked by recurrent seizures.' },
        { name: 'Stroke', symptoms: ['numbness', 'speech-difficulty', 'weakness', 'balance-problems', 'confusion'], description: 'Condition caused by interrupted blood flow to the brain.' },
        { name: 'Parkinson’s Disease', symptoms: ['tremors', 'balance-problems', 'speech-difficulty', 'fatigue'], description: 'Neurodegenerative disorder affecting movement and coordination.' },
        { name: 'Dermatitis', symptoms: ['itching', 'rash', 'swelling', 'redness'], description: 'Inflammatory skin condition causing itching and rash.' },
        { name: 'Jaundice', symptoms: ['yellow-skin', 'fatigue', 'loss-of-appetite', 'weakness'], description: 'Condition where skin turns yellow due to liver dysfunction.' },
        { name: 'Malaria', symptoms: ['fever', 'chills', 'sweating', 'headache', 'nausea'], description: 'Parasitic disease spread by mosquitoes causing fever and chills.' },
        { name: 'Tuberculosis (TB)', symptoms: ['cough', 'chest-pain', 'fever', 'night-sweats'], description: 'Serious bacterial infection affecting the lungs.' },
        { name: 'Dehydration', symptoms: ['weakness', 'dizziness', 'fatigue', 'dry-mouth'], description: 'Occurs when the body loses more fluids than it takes in.' },
        { name: 'Anxiety Disorder', symptoms: ['fatigue', 'dizziness', 'confusion', 'weakness'], description: 'Mental health condition causing excessive worry and restlessness.' },
        { name: 'Skin Infection', symptoms: ['swelling', 'rash', 'itching', 'pain'], description: 'Bacterial or fungal infection affecting the skin surface.' },
        { name: 'Sinusitis', symptoms: ['congestion', 'headache', 'runny-nose', 'facial-pain'], description: 'Inflammation of the sinuses causing pain and congestion.' },
        { name: 'Liver Disease', symptoms: ['yellow-skin', 'fatigue', 'nausea', 'abdominal-pain'], description: 'Chronic liver condition causing yellow skin and digestive issues.' },
        { name: 'Dengue Fever', symptoms: ['fever', 'headache', 'rash', 'fatigue', 'pain-behind-eyes'], description: 'Mosquito-borne viral infection causing high fever and rash.' },
        { name: 'Typhoid Fever', symptoms: ['fever', 'abdominal-pain', 'weakness', 'loss-of-appetite'], description: 'Bacterial infection causing prolonged fever and digestive issues.' }

    ];

    // ===== PREDICTION LOGIC =====
    analyzeBtn.addEventListener('click', function () {
        if (selectedSymptoms.length === 0) {
            alert('Please select at least one symptom.');
            return;
        }

        const predictions = diseaseDB.map(disease => {
            const matchCount = disease.symptoms.filter(s => selectedSymptoms.includes(s)).length;
            const probability = Math.round((matchCount / disease.symptoms.length) * 100);
            return { ...disease, probability };
        }).filter(d => d.probability > 0)
            .sort((a, b) => b.probability - a.probability);

        displayPredictions(predictions);
        showPage('prediction');
    });

    function displayPredictions(predictions) {
        predictionResults.innerHTML = '';
        if (predictions.length === 0) {
            predictionResults.innerHTML = '<p>No matching diseases found. Please select more symptoms.</p>';
            return;
        }

        predictions.forEach(pred => {
            const card = document.createElement('div');
            card.className = 'prediction-card';
            card.innerHTML = `
                <h3>${pred.name}</h3>
                <p><strong>Match:</strong> ${pred.probability}%</p>
                <p>${pred.description}</p>
            `;
            predictionResults.appendChild(card);
        });
    }

    // Feedback
    // --- Flash message auto-hide ---
    const flashes = document.querySelectorAll('.flash');
    if (flashes.length > 0) {
        setTimeout(() => {
            flashes.forEach(el => {
                el.style.opacity = '0';
                setTimeout(() => el.remove(), 500); // remove after fade
            });
        }, 4000);
    }

    // Feedback star and submit button



    // feedback submission
    const feedbackForm = document.querySelector('.feedback-form');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            // Show success message in a popup window
            alert("Thank you! Your feedback has been submitted successfully.");

            // Reset the form fields
            feedbackForm.reset();
        });
    }
});


*?




/* Different code for ML */
document.addEventListener('DOMContentLoaded', function () {

    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const nextButtons = document.querySelectorAll('.next-btn');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const symptomButtons = document.querySelectorAll('.symptom-btn');
    const symptomList = document.getElementById('symptom-list');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const tipCategories = document.querySelectorAll('.tips-category');
    const analyzeBtn = document.getElementById('analyze-symptoms');
    const predictionResults = document.getElementById('prediction-results');

    let selectedSymptoms = [];

    // ===== PAGE NAVIGATION =====
    function showPage(targetId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(targetId);
        if (targetPage) targetPage.classList.add('active');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + targetId) {
                link.classList.add('active');
            }
        });

        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showPage(this.getAttribute('href').substring(1));
            navMenu.classList.remove('active');
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', function () {
            const nextPage = this.getAttribute('data-next');
            if (nextPage) showPage(nextPage);
        });
    });

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // ===== SYMPTOM SELECTION =====
    symptomButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const symptom = btn.getAttribute('data-symptom');
            if (!symptom) return;

            if (selectedSymptoms.includes(symptom)) {
                selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
                btn.classList.remove('selected');
            } else {
                selectedSymptoms.push(symptom);
                btn.classList.add('selected');
            }

            symptomList.innerHTML = selectedSymptoms.length
                ? `<p><strong>Selected Symptoms:</strong> ${selectedSymptoms.join(", ")}</p>`
                : '';
        });
    });

    // ===== CATEGORY SWITCHING =====
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            tipCategories.forEach(cat => {
                cat.classList.toggle('active', cat.getAttribute('data-category') === category);
            });
        });
    });

    // ==== NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.95) 0%, rgba(118,75,162,0.95) 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '';
            navbar.style.backdropFilter = 'none';
        }
    });


    // ==========================================================
    //                 MACHINE LEARNING PREDICTION
    // ==========================================================
    analyzeBtn.addEventListener('click', async () => {

        if (selectedSymptoms.length === 0) {
            alert('Please select at least one symptom.');
            return;
        }

        try {
            const response = await fetch('/predict_disease', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms: selectedSymptoms })
            });

            const result = await response.json();
            predictionResults.innerHTML = '';

            if (result.error) {
                predictionResults.innerHTML = `<p style="color:red">${result.error}</p>`;
            } else {
                predictionResults.innerHTML = `
                    <h3>Predicted Disease: ${result.disease}</h3>
                    <p><strong>Match Probability:</strong> ${result.probability ? result.probability + '%' : 'N/A'}</p>
                    <p>${result.description}</p>
                `;
            }

            showPage('prediction');

        } catch (err) {
            console.error(err);
            predictionResults.innerHTML = `<p style="color:red">Prediction failed. Please try again.</p>`;
        }

    });


    // ===== FEEDBACK FORM =====
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert("Thank you! Your feedback has been submitted successfully.");
            feedbackForm.reset();
        });
    }

});







