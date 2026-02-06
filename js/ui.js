/* ============================================
   UI Functions
   All DOM manipulation and rendering using ES6+
   ============================================ */

// DOM Elements
const elements = {
    searchForm: document.getElementById('searchForm'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    searchError: document.getElementById('searchError'),
    recipeGrid: document.getElementById('recipeGrid'),
    loading: document.getElementById('loading'),
    errorState: document.getElementById('errorState'),
    emptyState: document.getElementById('emptyState'),
    errorMessage: document.getElementById('errorMessage'),
    modal: document.getElementById('recipeModal'),
    modalContent: document.getElementById('modalContent'),
    favCount: document.getElementById('favCount')
};

// Utility functions
const showElement = (element) => element.classList.add('show');
const hideElement = (element) => element.classList.remove('show');

// Loading state
const showLoading = () => {
    showElement(elements.loading);
    hideElement(elements.errorState);
    hideElement(elements.emptyState);
    elements.recipeGrid.innerHTML = '';
};

const hideLoading = () => {
    hideElement(elements.loading);
};

// Error state
const showError = (message = 'Unable to load recipes. Please try again.') => {
    elements.errorMessage.textContent = message;
    showElement(elements.errorState);
    hideElement(elements.emptyState);
    hideLoading();
};

// Empty state
const showEmptyState = () => {
    showElement(elements.emptyState);
    hideElement(elements.errorState);
    hideLoading();
};

// Form validation
const validateSearchInput = (value) => {
    if (value.trim().length < 2) {
        elements.searchInput.classList.add('error');
        showElement(elements.searchError);
        return false;
    }
    elements.searchInput.classList.remove('error');
    hideElement(elements.searchError);
    return true;
};

// Extract ingredients from recipe object
const extractIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : ''
            });
        }
    }
    return ingredients;
};

// Create recipe card HTML using template literals and destructuring
const createRecipeCard = (recipe) => {
    const { idMeal, strMeal, strMealThumb, strArea, strCategory } = recipe;
    const isInFavorites = isFavorite(idMeal);
    
    return `
        <div class="recipe-card" data-recipe-id="${idMeal}">
            <div class="recipe-image-wrapper">
                <button class="favorite-btn ${isInFavorites ? 'active' : ''}" 
                        data-recipe-id="${idMeal}" 
                        onclick="handleFavoriteClick(event, '${idMeal}')">
                    ${isInFavorites ? '❤️' : '🤍'}
                </button>
                <span class="recipe-cuisine">${strArea || 'International'}</span>
                <img src="${strMealThumb}" 
                     alt="${strMeal}" 
                     class="recipe-image"
                     loading="lazy">
            </div>
            <div class="recipe-info">
                <h3 class="recipe-title">${strMeal}</h3>
                <div class="recipe-meta">
                    <span class="recipe-category">🍽️ ${strCategory || 'Main'}</span>
                </div>
            </div>
        </div>
    `;
};

// Create modal content using template literals
const createModalContent = (recipe) => {
    const { 
        strMeal, 
        strMealThumb,
        strInstructions, 
        strCategory,
        strArea,
        strYoutube
    } = recipe;
    
    // Extract and map ingredients
    const ingredients = extractIngredients(recipe);
    const ingredientsList = ingredients.map(item => 
        `<div class="ingredient-item">
            <div class="ingredient-check"></div>
            <span><strong>${item.ingredient}</strong> - ${item.measure}</span>
        </div>`
    ).join('');
    
    return `
        <div class="modal-header">
            <img src="${strMealThumb}" alt="${strMeal}" class="modal-image">
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <h2 class="modal-title">${strMeal}</h2>
            
            <div class="modal-meta">
                <span class="modal-tag cuisine">${strArea || 'International'}</span>
                <span class="modal-tag">${strCategory || 'Main Course'}</span>
            </div>
            
            <div class="modal-section">
                <h3>Ingredients</h3>
                <div class="ingredients-grid">
                    ${ingredientsList}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>Instructions</h3>
                <p class="instructions">${strInstructions || 'No instructions available.'}</p>
            </div>
            
            ${strYoutube ? `
                <div class="modal-section">
                    <h3>Video Tutorial</h3>
                    <a href="${strYoutube}" target="_blank" class="video-link">
                        ▶️ Watch on YouTube
                    </a>
                </div>
            ` : ''}
        </div>
    `;
};

// Render recipes to grid using map() and join()
const renderRecipes = (recipes) => {
    hideLoading();
    
    if (!recipes || recipes.length === 0) {
        showEmptyState();
        elements.recipeGrid.innerHTML = '';
        return;
    }
    
    hideElement(elements.errorState);
    hideElement(elements.emptyState);
    
    // Use map() to transform array and join() to create HTML string
    elements.recipeGrid.innerHTML = recipes
        .map(recipe => createRecipeCard(recipe))
        .join('');
    
    // Add click listeners to recipe cards
    attachRecipeCardListeners();
};

// Attach event listeners to recipe cards
const attachRecipeCardListeners = () => {
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking favorite button
            if (e.target.closest('.favorite-btn')) return;
            
            const recipeId = card.dataset.recipeId;
            openRecipeModal(recipeId);
        });
    });
};

// Open recipe modal
const openRecipeModal = async (recipeId) => {
    showLoading();
    const recipeDetails = await getRecipeDetails(recipeId);
    hideLoading();
    
    elements.modalContent.innerHTML = createModalContent(recipeDetails);
    showElement(elements.modal);
    document.body.style.overflow = 'hidden';
};

// Close recipe modal
const closeModal = () => {
    hideElement(elements.modal);
    document.body.style.overflow = 'auto';
};

// Update favorites count
const updateFavoritesCount = () => {
    const count = getFavorites().length;
    elements.favCount.textContent = `(${count})`;
};

// Update favorite button state
const updateFavoriteButton = (recipeId, isFav) => {
    const buttons = document.querySelectorAll(`[data-recipe-id="${recipeId}"].favorite-btn`);
    buttons.forEach(btn => {
        btn.classList.toggle('active', isFav);
        btn.textContent = isFav ? '❤️' : '🤍';
    });
};

// Set active filter button
const setActiveFilter = (filterButtons, activeValue, attribute) => {
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset[attribute] === activeValue);
    });
};

// Set active tab
const setActiveTab = (activeTab) => {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === activeTab);
    });
};
