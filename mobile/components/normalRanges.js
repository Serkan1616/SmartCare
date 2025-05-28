export const normalRanges = {
  WBC: {
    min: 4.5,
    max: 11.0,
    unit: "×10³/µL",
    description:
      "White Blood Cell (WBC) count measures the total number of white blood cells in your blood. It is a key marker in identifying infections, inflammation, immune system disorders, and even leukemia. Low WBC may indicate bone marrow problems, autoimmune conditions, or the effects of medications.",
  },
  LYMp: {
    min: 20,
    max: 40,
    unit: "%",
    description:
      "Lymphocyte percentage (LYM%) represents the proportion of lymphocytes among total white blood cells. Elevated levels can indicate viral infections or chronic inflammation, while low levels may suggest immunodeficiency or bone marrow suppression.",
  },
  NEUTp: {
    min: 40,
    max: 70,
    unit: "%",
    description:
      "Neutrophil percentage (NEUT%) reflects the proportion of neutrophils among white blood cells. Neutrophils are the first responders to bacterial infections. High levels are commonly associated with acute infections, stress, or inflammation; low levels may suggest bone marrow suppression or certain viral infections.",
  },
  LYMn: {
    min: 1.0,
    max: 4.0,
    unit: "×10³/µL",
    description:
      "Absolute Lymphocyte Count (LYM#) is a direct measure of the number of lymphocytes in a microliter of blood. It is crucial for immune system assessment. Low counts may signal viral infections, autoimmune diseases, or immunodeficiency, while high counts may relate to chronic infections or certain leukemias.",
  },
  NEUTn: {
    min: 2.0,
    max: 7.0,
    unit: "×10³/µL",
    description:
      "Absolute Neutrophil Count (NEUT#) quantifies neutrophils per microliter of blood. It is a vital parameter for evaluating bacterial infections and monitoring chemotherapy or bone marrow health. Extremely low counts (neutropenia) increase the risk of infections.",
  },
  RBC: {
    min: 4.2,
    max: 5.9,
    unit: "×10⁶/µL",
    description:
      "Red Blood Cell (RBC) count measures the number of red blood cells in your blood. These cells carry oxygen to tissues. Low RBC may suggest anemia, blood loss, or nutritional deficiencies, while high values may indicate dehydration or polycythemia.",
  },
  HGB: {
    min: 13.5,
    max: 17.5,
    unit: "g/dL",
    description:
      "Hemoglobin (HGB) is the iron-containing protein in red blood cells that carries oxygen. It’s a central marker for diagnosing anemia. Low levels may indicate iron deficiency or chronic disease; high levels might result from smoking, dehydration, or lung disease.",
  },
  HCT: {
    min: 41.0,
    max: 53.0,
    unit: "%",
    description:
      "Hematocrit (HCT) reflects the percentage of blood volume occupied by red blood cells. It helps evaluate anemia, dehydration, or overproduction of red cells (polycythemia).",
  },
  MCV: {
    min: 80,
    max: 100,
    unit: "fL",
    description:
      "Mean Corpuscular Volume (MCV) indicates the average size of red blood cells. Low MCV suggests microcytic anemia (often due to iron deficiency), whereas high MCV points to macrocytic anemia (common in B12 or folate deficiency).",
  },
  MCH: {
    min: 27,
    max: 33,
    unit: "pg",
    description:
      "Mean Corpuscular Hemoglobin (MCH) measures the average amount of hemoglobin per red blood cell. It helps classify types of anemia—low values are often seen in iron-deficiency anemia.",
  },
  MCHC: {
    min: 32,
    max: 36,
    unit: "g/dL",
    description:
      "Mean Corpuscular Hemoglobin Concentration (MCHC) measures the concentration of hemoglobin in red blood cells. Low MCHC indicates hypochromic anemia; high values are less common and can occur in hereditary conditions like spherocytosis.",
  },
  PLT: {
    min: 150,
    max: 450,
    unit: "×10³/µL",
    description:
      "Platelet count (PLT) indicates the number of platelets in blood, essential for clotting. Low PLT (thrombocytopenia) can cause bleeding issues; high PLT (thrombocytosis) may increase clotting risk or indicate inflammation or bone marrow disorders.",
  },
  PDW: {
    min: 9,
    max: 17,
    unit: "%",
    description:
      "Platelet Distribution Width (PDW) shows the variability in platelet size. High PDW is associated with platelet activation, often linked to cardiovascular conditions, infections, or bone marrow dysfunction.",
  },
  PCT: {
    min: 0.19,
    max: 0.39,
    unit: "%",
    description:
      "Plateletcrit (PCT) is the volume percentage of platelets in blood. It gives a fuller picture of platelet mass and is useful for monitoring disorders like thrombocytopenia or thrombocytosis alongside PLT and MPV.",
  },
};
