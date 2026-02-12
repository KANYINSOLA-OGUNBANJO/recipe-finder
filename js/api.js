const NIGERIAN_RECIPES = [
    {
        idMeal: '1001',
        strMeal: 'Jollof Rice',
        strCategory: 'Vegetarian',
        strArea: 'Nigerian',
        strMealThumb: 'https://www.abapoprestaurant.com/wp-content/uploads/2024/01/Jollof-Rice.jpg',
        strInstructions: 'Heat oil in a large pot. Add onions and cook until soft. Add tomato paste, blended tomatoes, and peppers. Cook for 15-20 minutes until oil rises to the top.',
        strYoutube: '',
        strIngredient1: 'Rice', strMeasure1: '3 cups',
        strIngredient2: 'Tomatoes', strMeasure2: '400g',
        strIngredient3: 'Peppers', strMeasure3: '3',
        strIngredient4: 'Onions', strMeasure4: '2'
    },
    {
        idMeal: '1002',
        strMeal: 'Egusi Soup',
        strCategory: 'Beef',
        strArea: 'Nigerian',
        strMealThumb: 'https://bing.com/th?id=OSK.4e0bc4045b2edcce252a527bea98cbcb',
        strInstructions: 'Season beef and cook until tender. Heat palm oil, add onions and egusi seeds.',
        strYoutube: '',
        strIngredient1: 'Egusi', strMeasure1: '2 cups',
        strIngredient2: 'Beef', strMeasure2: '500g',
        strIngredient3: 'Palm Oil', strMeasure3: '1/2 cup'
    },
    {
        idMeal: '1003',
        strMeal: 'Suya',
        strCategory: 'Beef',
        strArea: 'Nigerian',
        strMealThumb: 'https://bing.com/th?id=OSK.7f6125f28a6b5d918665c562b72a1cd1',
        strInstructions: 'Slice beef into strips. Mix peanuts with spices. Grill for 15-20 minutes.',
        strYoutube: '',
        strIngredient1: 'Beef', strMeasure1: '1kg',
        strIngredient2: 'Peanuts', strMeasure2: '1 cup',
        strIngredient3: 'Paprika', strMeasure3: '2 tbsp'
    }
];

const searchRecipes = async (query) => {
    try {
        const url = buildApiUrl(CONFIG.ENDPOINTS.SEARCH, { s: query });
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const apiResults = data.meals || [];
        const nigerianMatches = NIGERIAN_RECIPES.filter(r => r.strMeal.toLowerCase().includes(query.toLowerCase()));
        return [...apiResults, ...nigerianMatches];
    } catch (error) {
        console.error('Search Error:', error);
        throw error;
    }
};

const filterByCuisine = async (cuisine) => {
    try {
        if (cuisine.toLowerCase() === 'nigerian') return NIGERIAN_RECIPES;
        if (cuisine === 'all') {
            const url = buildApiUrl(CONFIG.ENDPOINTS.SEARCH, { s: '' });
            const response = await fetch(url);
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            return [...(data.meals ? data.meals.slice(0, 20) : []), ...NIGERIAN_RECIPES];
        }
        const url = buildApiUrl(CONFIG.ENDPOINTS.FILTER_BY_AREA, { a: cuisine });
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        if (!data.meals) return [];
        const detailedMeals = await Promise.all(data.meals.slice(0, 12).map(m => getRecipeDetails(m.idMeal)));
        return detailedMeals.filter(m => m !== null);
    } catch (error) {
        console.error('Cuisine Error:', error);
        throw error;
    }
};

const filterByCategory = async (category) => {
    try {
        const url = buildApiUrl(CONFIG.ENDPOINTS.FILTER_BY_CATEGORY, { c: category });
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        if (!data.meals) return NIGERIAN_RECIPES.filter(r => r.strCategory.toLowerCase() === category.toLowerCase());
        const detailedMeals = await Promise.all(data.meals.slice(0, 12).map(m => getRecipeDetails(m.idMeal)));
        const nigerianMatches = NIGERIAN_RECIPES.filter(r => r.strCategory.toLowerCase() === category.toLowerCase());
        return [...detailedMeals.filter(m => m !== null), ...nigerianMatches];
    } catch (error) {
        console.error('Category Error:', error);
        throw error;
    }
};

const getRecipeDetails = async (recipeId) => {
    try {
        const nigerian = NIGERIAN_RECIPES.find(r => r.idMeal === recipeId);
        if (nigerian) return nigerian;
        const url = buildApiUrl(CONFIG.ENDPOINTS.MEAL_DETAILS, { i: recipeId });
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Details Error:', error);
        return null;
    }
};

const getInitialRecipes = async () => {
    try {
        const url = buildApiUrl(CONFIG.ENDPOINTS.SEARCH, { s: 'chicken' });
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return [...(data.meals ? data.meals.slice(0, 12) : []), ...NIGERIAN_RECIPES];
    } catch (error) {
        console.error('Initial Error:', error);
        throw error;
    }
};