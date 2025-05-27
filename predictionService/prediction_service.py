from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import joblib
import numpy as np
from PIL import Image
import io
import pytesseract
import re
from pdf2image import convert_from_bytes

# FastAPI uygulaması oluşturma
app = FastAPI()

# # Mevcut Model Yükleme
# loaded_health_model = joblib.load("log_reg_model.pkl")

# try:
#     loaded_retina_model = load_model("cnn_model.h5")
#     print(" Model başarıyla yüklendi.")
# except Exception as e:
#     print(f" Model yüklenirken hata oluştu: {e}")


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



# # 🟢 Mevcut Model Prediction Endpoint
# @app.post("/predict")
# async def predict_health(data: PredictionInput):
#     try:
#         input_data = np.array([[data.gender, data.age, data.hypertension,
#                                 data.heart_disease, data.work_type,
#                                 data.avg_glucose_level, data.bmi]])

#         prediction = loaded_health_model.predict(input_data)
#         prediction_proba = loaded_health_model.predict_proba(input_data)

#         return {
#             "prediction": int(prediction[0]),
#             "confidence": round(prediction_proba[0][1] * 100, 2)
#         }
#     except Exception as e:
#         return {"error": str(e)}

# @app.post("/retina-predict")
# async def predict_retina(file: UploadFile = File(...)):
#     try:
#         img_array = preprocess_image(file.file)

#         prediction = loaded_retina_model.predict(img_array)

#         # 🔹 Model çıktısındaki en yüksek olasılığı bulma
#         categories = ['CNV', 'DME', 'DRUSEN', 'NORMAL']
#         predicted_class = np.argmax(prediction[0])
#         confidence = round(np.max(prediction[0]) * 100, 2)

#         return {
#             "prediction": categories[predicted_class],
#             "confidence": confidence
#         }

#     except Exception as e:
#         return {"error": str(e)}
    
    
# @app.post("/ocr-predict")
# async def ocr_predict(file: UploadFile = File(...)):
#     try:
#         # 1. Görseli al ve OCR yap
#         image = Image.open(io.BytesIO(await file.read()))
#         text = pytesseract.image_to_string(image)

#         print("\n🧾 OCR Çıkan Metin:\n", text)

#         # 2. Değerleri regex ile ayıkla
#         def extract(pattern):
#             match = re.search(rf"{pattern}[:\s\-]*([\d.]+)", text, re.IGNORECASE)
#             if match and match.group(1):
#                 try:
#                     # Virgül varsa nokta ile değiştir (Türkçe sayılar için)
#                     value = match.group(1).replace(',', '.')
#                     return float(match.group(1))
#                 except ValueError:
#                     return None
#             return None

#         # 3. Tahmin için gerekli tüm değerleri topla
#         input_data = {
#     "WBC": extract("WBC"),
#     "RBC": extract("RBC"),
#     "Hemoglobin": extract("HGB|Hemoglobin"),
#     "Platelets": extract("PLT|Platelets"),
#     "Neutrophils": extract("NEUT|NEU|Neutrophils"),
#     "Lymphocytes": extract("LYMPH|LYM|Lymphocytes"),
#     "Monocytes": extract("MONO|MON|Monocytes"),
#     "Eosinophils": extract("EOS|Eosinophils"),
#     "Basophils": extract("BASO|BAS|Basophils"),
# }


#         # 4. Hangi değerler eksik?
#         missing = [k for k, v in input_data.items() if v is None]

#         # 5. Geri dön
#         if missing:
#             return {
#                 "error": f"Could not extract the following fields: {', '.join(missing)}",
#                 "ocr_text": text,
#                 "input_data": input_data
#             }

#         return {
#             "message": "Values extracted successfully",
#             "ocr_text": text,
#             "input_data": input_data
#         }

#     except Exception as e:
#         return {"error": str(e)}
    
    
    
    
# 🔹 Anemi modelini yükle
anemia_model = joblib.load("anemia_model.pkl")

# 🔹 LabelEncoder (manuel sınıflar)
from sklearn.preprocessing import LabelEncoder
label_encoder = LabelEncoder()
label_encoder.classes_ = np.array([
    'Healthy',
    'Iron deficiency anemia',
    'Leukemia',
    'Leukemia with thrombocytopenia',
    'Macrocytic anemia',
    'Normocytic hypochromic anemia',
    'Normocytic normochromic anemia',
    'Other microcytic anemia',
    'Thrombocytopenia'
])

# 🔹 Özellik sıralaması
features = ['WBC', 'LYMp', 'NEUTp', 'LYMn', 'NEUTn', 'RBC', 'HGB', 'HCT', 'MCV', 'MCH', 'MCHC', 'PLT', 'PDW', 'PCT']

@app.post("/anemia-predict-from-pdf")
async def anemia_predict_from_pdf(file: UploadFile = File(...)):
    try:
        # 1. Dosya türünü kontrol et
        filename = file.filename.lower()
        is_pdf = filename.endswith(".pdf") or file.content_type == "application/pdf"

        # 2. Dosyayı oku
        content = await file.read()

        # 3. PDF ise: pdf2image ile ilk sayfayı al
        if is_pdf:
            pages = convert_from_bytes(content)
            image = pages[0]
        else:
            image = Image.open(io.BytesIO(content)).convert("RGB")

        # 4. OCR yap
        text = pytesseract.image_to_string(image)

        # 5. Değer çıkarma fonksiyonu
        def extract(pattern):
            match = re.search(rf"{pattern}[\s:]*([\d]+[,\.]?\d*)", text, re.IGNORECASE)
            if match and match.group(1):
                try:
                    return float(match.group(1).replace(',', '.'))
                except:
                    return None
            return None

        # 6. Değerleri al
        extracted_input = {
            "WBC": extract("WBC"),
            "LYMp": extract("LYM[%]"),
            "LYMn": extract("LYM[#]"),
            "NEUTp": extract("NEU[%]"),
            "NEUTn": extract("NEU[#]"),
            "RBC": extract("RBC"),
            "HGB": extract("HGB"),
            "HCT": extract("HCT"),
            "MCV": extract("MCV"),
            "MCH": extract("MCH"),
            "MCHC": extract("MCHC"),
            "PLT": extract("PLT"),
            "PDW": extract("PDW"),
            "PCT": extract("PCT"),
        }
        
        

        # 7. Eksik değer kontrolü
        missing = [k for k, v in extracted_input.items() if v is None]
        if missing:
            return {
                "error": f"Could not extract: {', '.join(missing)}",
                "ocr_text": text,
                "input_values": extracted_input
            }

        # 8. Tahmin yap
        input_array = np.array([[extracted_input[f] for f in features]])
        pred = anemia_model.predict(input_array)[0]
        label = label_encoder.inverse_transform([pred])[0]

        return {
            "prediction": label,
            "input_values": extracted_input
        }

    except Exception as e:
        return {"error": str(e)}


# Sunucuyu başlatma
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
