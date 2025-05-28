const axios = require("axios");
const User = require("../models/User");
const nutritionData = {
  "Iron deficiency anemia": {
    recommendedFoods: [
      "Red meat (especially liver)",
      "Spinach, kale, swiss chard",
      "Lentils, beans, chickpeas",
      "Pumpkin seeds, sesame seeds",
      "Tofu and soy products",
      "Iron-fortified cereals and grains",
      "Broccoli and Brussels sprouts",
      "Egg yolks",
    ],
    recommendedMeals: [
      "Grilled liver with spinach salad",
      "Lentil soup with whole grain bread",
      "Tofu stir-fry with broccoli",
      "Iron-fortified oatmeal with berries",
    ],
    recommendedDrinks: [
      "Orange juice (for vitamin C to boost iron absorption)",
      "Smoothies with spinach and strawberries",
      "Herbal teas (avoid tea/coffee with meals due to tannins)",
    ],
  },

  Leukemia: {
    recommendedFoods: [
      "Lean proteins (chicken, fish, tofu)",
      "Whole grains (brown rice, oats)",
      "Fruits rich in antioxidants (blueberries, oranges)",
      "Vegetables (carrots, tomatoes, spinach)",
      "Nuts and seeds",
      "Yogurt or kefir (for probiotics)",
    ],
    recommendedMeals: [
      "Grilled chicken with quinoa and vegetables",
      "Oatmeal with berries and flaxseeds",
      "Baked salmon with sweet potatoes",
    ],
    recommendedDrinks: [
      "Green tea",
      "Fresh fruit smoothies",
      "Plenty of water",
    ],
  },

  "Leukemia with thrombocytopenia": {
    recommendedFoods: [
      "Soft fruits (bananas, mangoes)",
      "Well-cooked vegetables (avoid raw, fibrous types)",
      "Lean proteins (eggs, chicken, fish)",
      "Iron-rich but low-fiber foods",
      "Calcium-rich foods (yogurt, cheese)",
      "Avoid spicy or acidic foods",
    ],
    recommendedMeals: [
      "Scrambled eggs with mashed potatoes",
      "Smooth chicken soup with rice",
      "Banana oatmeal with honey",
    ],
    recommendedDrinks: [
      "Mild herbal teas",
      "Fruit smoothies (no citrus)",
      "Room temperature water",
    ],
  },

  "Macrocytic anemia": {
    recommendedFoods: [
      "Eggs",
      "Fortified cereals with B12 and folic acid",
      "Leafy greens (spinach, kale)",
      "Asparagus, Brussels sprouts",
      "Citrus fruits (oranges, lemons)",
      "Liver and shellfish (high in B12)",
    ],
    recommendedMeals: [
      "Boiled eggs with avocado toast",
      "B12-fortified cereal with orange juice",
      "Stir-fried spinach with mushrooms",
    ],
    recommendedDrinks: [
      "Orange juice",
      "B-complex fortified smoothies",
      "Milk or fortified plant-based milk",
    ],
  },

  "Normocytic hypochromic anemia": {
    recommendedFoods: [
      "Lean red meats",
      "Egg yolks",
      "Legumes and beans",
      "Green leafy vegetables",
      "Iron-fortified grains",
      "Vitamin C rich foods to improve iron absorption",
    ],
    recommendedMeals: [
      "Beef stew with potatoes and carrots",
      "Lentil curry with brown rice",
      "Spinach omelet with orange slices",
    ],
    recommendedDrinks: ["Orange juice", "Pomegranate juice", "Herbal teas"],
  },

  "Normocytic normochromic anemia": {
    recommendedFoods: [
      "Well-balanced diet with lean proteins",
      "Green vegetables",
      "Whole grains",
      "Iron-rich and B-complex-rich foods",
      "Fruits with vitamin C",
    ],
    recommendedMeals: [
      "Turkey sandwich with spinach and whole grain bread",
      "Mixed vegetable soup with beans",
      "Grilled fish with quinoa and steamed broccoli",
    ],
    recommendedDrinks: [
      "Citrus-infused water",
      "Smoothies with leafy greens",
      "Iron-enhanced shakes",
    ],
  },

  "Other microcytic anemia": {
    recommendedFoods: [
      "Red meat",
      "Shellfish",
      "Iron-rich cereals",
      "Dark leafy greens",
      "Legumes",
      "Vitamin C-rich fruits",
    ],
    recommendedMeals: [
      "Beef and bean chili",
      "Stuffed bell peppers with rice and ground meat",
      "Spinach and lentil salad",
    ],
    recommendedDrinks: [
      "Orange juice",
      "Strawberry banana smoothie",
      "Herbal iron tonics",
    ],
  },

  Thrombocytopenia: {
    recommendedFoods: [
      "Foods rich in vitamin K (kale, spinach, broccoli)",
      "Folate-rich foods (beans, liver, asparagus)",
      "Vitamin B12-rich foods (eggs, fish, dairy)",
      "Papaya and pomegranate",
      "Whole grains",
      "Avoid alcohol and processed foods",
    ],
    recommendedMeals: [
      "Omelet with spinach and cheese",
      "Pomegranate chicken salad",
      "Quinoa bowl with mixed vegetables",
    ],
    recommendedDrinks: ["Papaya juice", "Pomegranate juice", "Green tea"],
  },
};

const generateMealPlanPrompt = (diagnosis, healthProfile) => {
  const data = nutritionData[diagnosis];

  if (!data) {
    return `No nutrition data found for ${diagnosis}.`;
  }

  const foods = data.recommendedFoods.join(", ");
  const meals = data.recommendedMeals.join(", ");
  const drinks = data.recommendedDrinks.join(", ");

  return `
The user has been diagnosed with "${diagnosis}" anemia.
 Health Profile:
- Age: ${healthProfile.age}
- Height: ${healthProfile.height} cm
- Weight: ${healthProfile.weight} kg
- Blood Type: ${healthProfile.bloodType}
- Smoking: ${healthProfile.smoking}
- Alcohol: ${healthProfile.alcohol}
- Medical Conditions: ${healthProfile.medicalConditions}

Using the following foods, meals, and drinks and considering the user's health profile,

- Foods: ${foods}
- Example Meals: ${meals}
- Example Drinks: ${drinks}

Create a 1-day meal plan in table format. Include:

- Breakfast
- Lunch
- Dinner
- 1 Snack

Give the meal plan directly, **without any introductory sentences or phrases such as "Here is the meal plan" or "Breakfast includes"**.

After the meal plan, give a summary of whether these changes.and suggestions based on the user's health profile and anemia type if necessary.
Respond concisely and in english. Format the meal plan simply as:
write just paragraph with meals in order:
Breakfast: ...
Lunch: ...
Snack: ...
Dinner: ...
Effects: ...
Suggesttions: ...
No extra explanations before the meal plan.
`;
};

// 🔹 AI feature analysis
exports.analyzeFeatureChanges = async (req, res) => {
  try {
    const { feature, values } = req.body;

    if (!feature || !values) {
      return res
        .status(400)
        .json({ error: "Feature and values are required." });
    }

    const promptText = `Feature "${feature}" values from different times for the same person, ordered from oldest to newest: ${values.join(
      ", "
    )}. 
Give a short summary: are these changes good or bad? 
Mention possible health effects briefly.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse =
      response.data?.candidates?.[0]?.content || "No analysis returned.";

    let analysisText = "";

    if (typeof aiResponse === "string") {
      analysisText = aiResponse;
    } else if (aiResponse?.parts && Array.isArray(aiResponse.parts)) {
      analysisText = aiResponse.parts.map((part) => part.text).join("\n");
    } else {
      analysisText = JSON.stringify(aiResponse);
    }

    res.json({ analysis: analysisText });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI analysis failed." });
  }
};

// 🔹 Meal Plan Generator
exports.generateMealPlan = async (req, res) => {
  try {
    const { diagnosis } = req.body;
    const userId = req.user.id;

    if (!diagnosis) {
      return res.status(400).json({ error: "Diagnosis is required." });
    }

    // 🔹 Kullanıcı sağlık profili alınır
    const user = await User.findById(userId);

    if (!user || !user.healthProfile) {
      return res.status(404).json({ error: "Health profile not found." });
    }

    const promptText = generateMealPlanPrompt(diagnosis, user.healthProfile);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data?.candidates?.[0]?.content;

    let planText = "";

    if (typeof aiResponse === "string") {
      planText = aiResponse;
    } else if (aiResponse?.parts && Array.isArray(aiResponse.parts)) {
      planText = aiResponse.parts.map((part) => part.text).join("\n");
    } else {
      planText = JSON.stringify(aiResponse);
    }

    res.json({ mealPlan: planText });
  } catch (error) {
    console.error(
      "Gemini Meal Plan Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Meal plan generation failed." });
  }
};
