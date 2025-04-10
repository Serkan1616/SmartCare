# import pandas as pd
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.model_selection import train_test_split
# import joblib  # Modeli kaydetmek için kullanılır
# import numpy as np

# # # Veri setini yükle
# # df_main = pd.read_csv("Training.csv")

# # # Özellikleri (X) ve hedef değişkeni (y) ayır
# # X = df_main.drop(columns=['Disease'], axis=1)
# # y = df_main['Disease']

# # # Eğitim ve test verisi olarak ayır
# # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=40)

# # # RandomForest modelini oluştur ve eğit
# # model = RandomForestClassifier(n_estimators=100, random_state=42)
# # model.fit(X_train, y_train)

# # # Eğitilen modeli bir dosyaya kaydet
# # joblib.dump(model, 'disease_model.pkl')

# # print("Model başarıyla eğitildi ve 'disease_model.pkl' dosyasına kaydedildi.")
# #         confidence = np.max(prediction[0])
# #         return {  


# # Modeli yükle
# model = joblib.load('disease_model.pkl')

# # Örnek input verisi (WBC, RBC, HGB, PLT, NEUT, LYMPH, MONO, EO, BASO)
# # Bu değerleri uygun şekilde değiştirerek test edebilirsin
# sample_input = np.array([5.2, 4.5, 13.0, 50, 60, 30, 6, 2, 0.5]).reshape(1, -1)

# # Tahmin yap
# prediction = model.predict(sample_input)[0]

# # Tahmin edilen sonucu isme çevir
# disease = {0: 'Anemia', 1: 'Polycythemia', 2: 'Leukocytosis', 3: 'Leukopenia', 4: 'Thrombocytopenia',
#            5: 'Thrombocytosis', 6: 'Neutropenia', 7: 'Neutrophilia', 8: 'Lymphocytopenia', 9: 'Lymphocytosis',
#            10: 'Monocytes high', 11: 'Eosinophil high', 12: 'Basophil high', 13: 'Normal'}

# print(f"Tahmin edilen hastalık: {disease[prediction]} (sınıf: {prediction})")


import pandas as pd
import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder

# 🔹 Modeli yükle
model = joblib.load("anemia_model.pkl")

# 🔹 LabelEncoder sınıfları
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

# 🔹 Veriyi yükle
df = pd.read_csv("diagnosed_cbc_data_v4.csv")

# 🔹 Modelin kullandığı sütunlara göre sadece feature'ları al
features = ['WBC', 'LYMp', 'NEUTp', 'LYMn', 'NEUTn', 'RBC', 'HGB', 'HCT', 'MCV', 'MCH', 'MCHC', 'PLT', 'PDW', 'PCT']

X_sample = df[features].iloc[:3]  # ilk 3 satır

# 🔹 Tahmin yap
y_pred_encoded = model.predict(X_sample)

# 🔹 Etikete çevir
y_pred_labels = label_encoder.inverse_transform(y_pred_encoded)

# 🔹 Sonuçları yazdır
for i, label in enumerate(y_pred_labels):
    print(f"📊 Satır {i+1} → Tahmin edilen anemi türü: {label}")

