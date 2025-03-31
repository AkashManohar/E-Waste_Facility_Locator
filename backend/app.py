from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io

# Load Model
model = tf.keras.models.load_model("waste_classifier.h5")
class_names = ["Plastic", "Metal", "Glass", "Cardboard", "Paper", "Others"]

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read())).resize((224, 224))  # Resize to model input size
    img_array = np.array(image) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    predicted_class = class_names[np.argmax(prediction)]

    return jsonify({"category": predicted_class, "confidence": float(np.max(prediction))})

if __name__ == "__main__":
    app.run(debug=True)
