/* ============================================
   API Functions
   TheMealDB API interactions with fallback data
   ============================================ */

const CONFIG = {
    API_KEY: '1',
    BASE_URL: 'https://www.themealdb.com/api/json/v1/1',
    ENDPOINTS: {
        SEARCH: '/search.php',
        FILTER_BY_AREA: '/filter.php',
        FILTER_BY_CATEGORY: '/filter.php',
        MEAL_DETAILS: '/lookup.php',
        RANDOM: '/random.php'
    }
};

window.buildApiUrl = function(endpoint, params = {}) {
    const url = new URL(`${CONFIG.BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => {
        if (params[key]) url.searchParams.append(key, params[key]);
    });
    return url.toString();
};

const FALLBACK_RECIPES = [
    {
        idMeal: '1001',
        strMeal: 'Jollof Rice',
        strCategory: 'Vegetarian',
        strArea: 'Nigerian',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        strInstructions: 'Heat oil in a large pot. Add onions and cook until soft. Add tomato paste, blended tomatoes, and peppers. Cook for 15-20 minutes until oil rises to the top. Add chicken stock, bay leaves, thyme, and curry powder. Add rice and stir well. Cover and cook on low heat for 30-40 minutes until rice is tender.',
        strYoutube: '',
        strIngredient1: 'Rice', strMeasure1: '3 cups',
        strIngredient2: 'Tomatoes', strMeasure2: '400g',
        strIngredient3: 'Peppers', strMeasure3: '3',
        strIngredient4: 'Onions', strMeasure4: '2',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1002',
        strMeal: 'Egusi Soup',
        strCategory: 'Beef',
        strArea: 'Nigerian',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/g7w0o51619790672.jpg',
        strInstructions: 'Season beef and cook until tender. Heat palm oil, add onions and egusi seeds. Add stock gradually. Add beef and fish. Add spinach. Cook for 10 minutes.',
        strYoutube: '',
        strIngredient1: 'Egusi', strMeasure1: '2 cups',
        strIngredient2: 'Beef', strMeasure2: '500g',
        strIngredient3: 'Palm Oil', strMeasure3: '1/2 cup',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1003',
        strMeal: 'Suya',
        strCategory: 'Beef',
        strArea: 'Nigerian',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/1550441882.jpg',
        strInstructions: 'Slice beef into strips. Mix peanuts with spices. Coat beef with spice mix. Thread onto skewers. Grill for 15-20 minutes.',
        strYoutube: '',
        strIngredient1: 'Beef', strMeasure1: '1kg',
        strIngredient2: 'Peanuts', strMeasure2: '1 cup',
        strIngredient3: 'Paprika', strMeasure3: '2 tbsp',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1004',
        strMeal: 'Pad Thai',
        strCategory: 'Chicken',
        strArea: 'Thai',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wvtzq31535790223.jpg',
        strInstructions: 'Soak noodles. Scramble eggs. Stir-fry chicken. Add noodles and sauce. Add peanuts.',
        strYoutube: '',
        strIngredient1: 'Noodles', strMeasure1: '200g',
        strIngredient2: 'Chicken', strMeasure2: '300g',
        strIngredient3: 'Eggs', strMeasure3: '2',
        strIngredient4: 'Peanuts', strMeasure4: '1/4 cup',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1005',
        strMeal: 'Thai Green Curry',
        strCategory: 'Chicken',
        strArea: 'Thai',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
        strInstructions: 'Heat coconut milk. Add curry paste. Add chicken. Add vegetables. Serve with rice.',
        strYoutube: '',
        strIngredient1: 'Chicken', strMeasure1: '400g',
        strIngredient2: 'Coconut Milk', strMeasure2: '400ml',
        strIngredient3: 'Curry Paste', strMeasure3: '3 tbsp',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1006',
        strMeal: 'Tom Yum Soup',
        strCategory: 'Seafood',
        strArea: 'Thai',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        strInstructions: 'Boil water. Add lemongrass. Add prawns. Add seasonings. Serve hot.',
        strYoutube: '',
        strIngredient1: 'Prawns', strMeasure1: '300g',
        strIngredient2: 'Lemongrass', strMeasure2: '3 stalks',
        strIngredient3: '', strMeasure3: '',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1007',
        strMeal: 'Kung Pao Chicken',
        strCategory: 'Chicken',
        strArea: 'Chinese',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/1525872624.jpg',
        strInstructions: 'Marinate chicken. Stir-fry. Add peanuts. Serve with rice.',
        strYoutube: '',
        strIngredient1: 'Chicken', strMeasure1: '500g',
        strIngredient2: 'Peanuts', strMeasure2: '1/2 cup',
        strIngredient3: '', strMeasure3: '',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1008',
        strMeal: 'Sweet and Sour Pork',
        strCategory: 'Pork',
        strArea: 'Chinese',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/1529442316.jpg',
        strInstructions: 'Fry pork. Make sauce. Combine. Serve.',
        strYoutube: '',
        strIngredient1: 'Pork', strMeasure1: '500g',
        strIngredient2: 'Pineapple', strMeasure2: '1 cup',
        strIngredient3: '', strMeasure3: '',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1009',
        strMeal: 'Mapo Tofu',
        strCategory: 'Vegetarian',
        strArea: 'Chinese',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/1525873040.jpg',
        strInstructions: 'Cook tofu. Add sauce. Serve with rice.',
        strYoutube: '',
        strIngredient1: 'Tofu', strMeasure1: '400g',
        strIngredient2: 'Sauce', strMeasure2: '2 tbsp',
        strIngredient3: '', strMeasure3: '',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1010',
        strMeal: 'Classic Burger',
        strCategory: 'Beef',
        strArea: 'American',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg',
        strInstructions: 'Form patties. Grill. Assemble burger. Serve.',
        strYoutube: '',
        strIngredient1: 'Beef', strMeasure1: '500g',
        strIngredient2: 'Buns', strMeasure2: '4',
        strIngredient3: '', strMeasure3: '',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1011',
        strMeal: 'BBQ Ribs',
        strCategory: 'Pork',
        strArea: 'American',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/7nkosr1585589527.jpg',
        strInstructions: 'Season ribs. Bake. Brush with sauce. Grill. Serve.',
        strYoutube: '',
        strIngredient1: 'Ribs', strMeasure1: '1kg',
        strIngredient2: 'BBQ Sauce', strMeasure2: '1 cup',
        strIngredient3: '', strMeasure3: '',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1012',
        strMeal: 'Mac and Cheese',
        strCategory: 'Vegetarian',
        strArea: 'American',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg',
        strInstructions: 'Cook pasta. Make cheese sauce. Combine. Bake.',
        strYoutube: '',
        strIngredient1: 'Pasta', strMeasure1: '400g',
        strIngredient2: 'Cheese', strMeasure2: '300g',
        strIngredient3: '', strMeasure3: '',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1013',
        strMeal: 'Tacos',
        strCategory: 'Beef',
        strArea: 'Mexican',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg',
        strInstructions: 'Cook beef with spices. Warm tortillas. Assemble tacos with toppings.',
        strYoutube: '',
        strIngredient1: 'Beef', strMeasure1: '500g',
        strIngredient2: 'Tortillas', strMeasure2: '8',
        strIngredient3: 'Cheese', strMeasure3: '1 cup',
        strIngredient4: '', strMeasure4: '',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1014',
        strMeal: 'Chicken Tikka Masala',
        strCategory: 'Chicken',
        strArea: 'Indian',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
        strInstructions: 'Marinate chicken in yogurt and spices. Grill. Make tomato cream sauce. Combine.',
        strYoutube: '',
        strIngredient1: 'Chicken', strMeasure1: '600g',
        strIngredient2: 'Yogurt', strMeasure2: '1 cup',
        strIngredient3: 'Tomatoes', strMeasure3: '400g',
        strIngredient4: 'Cream', strMeasure4: '1/2 cup',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    },
    {
        idMeal: '1015',
        strMeal: 'Spaghetti Carbonara',
        strCategory: 'Pork',
        strArea: 'Italian',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
        strInstructions: 'Cook spaghetti. Fry bacon. Mix eggs and cheese. Combine all with pasta water.',
        strYoutube: '',
        strIngredient1: 'Spaghetti', strMeasure1: '400g',
        strIngredient2: 'Bacon', strMeasure2: '200g',
        strIngredient3: 'Eggs', strMeasure3: '3',
        strIngredient4: 'Parmesan', strMeasure4: '1 cup',
        strIngredient5: '', strMeasure5: '',
        strIngredient6: '', strMeasure6: '',
        strIngredient7: '', strMeasure7: '',
        strIngredient8: '', strMeasure8: '',
        strIngredient9: '', strMeasure9: '',
        strIngredient10: '', strMeasure10: ''
    }
];

const searchRecipes = async (query) => {
    return FALLBACK_RECIPES.filter(recipe => 
        recipe.strMeal.toLowerCase().includes(query.toLowerCase())
    );
};

const filterByCuisine = async (cuisine) => {
    if (cuisine === 'all') return FALLBACK_RECIPES;
    return FALLBACK_RECIPES.filter(r => r.strArea.toLowerCase() === cuisine.toLowerCase());
};

const filterByCategory = async (category) => {
    return FALLBACK_RECIPES.filter(r => r.strCategory.toLowerCase() === category.toLowerCase());
};

const getRecipeDetails = async (recipeId) => {
    return FALLBACK_RECIPES.find(r => r.idMeal === recipeId) || FALLBACK_RECIPES[0];
};

const getInitialRecipes = async () => {
    return FALLBACK_RECIPES;
};