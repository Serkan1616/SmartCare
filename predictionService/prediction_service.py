from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import joblib
import numpy as np
from PIL import Image
import io
from tensorflow.keras.models import load_model

# FastAPI uygulaması oluşturma
app = FastAPI()

# Mevcut Model Yükleme
loaded_health_model = joblib.load("log_reg_model.pkl")

try:
    loaded_retina_model = load_model("cnn_model.h5")
    print(" Model başarıyla yüklendi.")
except Exception as e:
    print(f" Model yüklenirken hata oluştu: {e}")


# Health Model Input
class PredictionInput(BaseModel):
    gender: int
    age: float
    hypertension: int
    heart_disease: int
    work_type: int
    avg_glucose_level: float
    bmi: float

def preprocess_image(image) -> np.ndarray:
    img = Image.open(image).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0  # Normalize et
    img_array = img_array.astype('float32')  # Modelin beklediği dtype
    img_array = np.expand_dims(img_array, axis=0)  # Batch boyutu ekleme
    return img_array



# 🟢 Mevcut Model Prediction Endpoint
@app.post("/predict")
async def predict_health(data: PredictionInput):
    try:
        input_data = np.array([[data.gender, data.age, data.hypertension,
                                data.heart_disease, data.work_type,
                                data.avg_glucose_level, data.bmi]])

        prediction = loaded_health_model.predict(input_data)
        prediction_proba = loaded_health_model.predict_proba(input_data)

        return {
            "prediction": int(prediction[0]),
            "confidence": round(prediction_proba[0][1] * 100, 2)
        }
    except Exception as e:
        return {"error": str(e)}

@app.post("/retina-predict")
async def predict_retina(file: UploadFile = File(...)):
    try:
        img_array = preprocess_image(file.file)

        prediction = loaded_retina_model.predict(img_array)

        # 🔹 Model çıktısındaki en yüksek olasılığı bulma
        categories = ['CNV', 'DME', 'DRUSEN', 'NORMAL']
        predicted_class = np.argmax(prediction[0])
        confidence = round(np.max(prediction[0]) * 100, 2)

        return {
            "prediction": categories[predicted_class],
            "confidence": confidence
        }

    except Exception as e:
        return {"error": str(e)}


# Sunucuyu başlatma
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
