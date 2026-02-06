/* ============================================
   Main Application Logic
   State management, event handlers, localStorage
   ============================================ */

// Application State
const state = {
    allRecipes: [],
    favorites: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
    currentTab: 'discover',
    currentCuisine: 'all',
    currentCategory: null,
    isLoading: false
};

// LocalStorage Functions
const saveFavorites = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(state.favorites));
    updateFavoritesCount();
};

const getFavorites = () => {
    return state.favorites;
};

const isFavorite = (recipeId) => {
    return state.favorites.some(recipe => recipe.idMeal === recipeId);
};

const addToFavorites = (recipe) => {
    if (!isFavorite(recipe.idMeal)) {
        state.favorites.push(recipe);
        saveFavorites();
    }
};

const removeFromFavorites = (recipeId) => {
    state.favorites = state.favorites.filter(recipe => recipe.idMeal !== recipeId);
    saveFavorites();
};

const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.idMeal)) {
        removeFromFavorites(recipe.idMeal);
    } else {
        addToFavorites(recipe);
    }
    
    // Update button state
    updateFavoriteButton(recipe.idMeal, isFavorite(recipe.idMeal));
    
    // Re-render if on favorites tab
    if (state.currentTab === 'favorites') {
        renderRecipes(state.favorites);
    }
};

// Event Handlers
const handleSearch = async (e) => {
    e.preventDefault();
    
    const searchTerm = elements.searchInput.value.trim();
    
    // Validate input
    if (!validateSearchInput(searchTerm)) {
        return;
    }
    
    showLoading();
    state.currentCuisine = 'all';
    state.currentCategory = null;
    
    // Clear active filters
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-cuisine="all"]').classList.add('active');
    
    const recipes = await searchRecipes(searchTerm);
    state.allRecipes = recipes;
    renderRecipes(recipes);
};

const handleCuisineFilter = async (cuisine) => {
    state.currentCuisine = cuisine;
    state.currentCategory = null;
    setActiveFilter(
        document.querySelectorAll('#cuisineFilters .filter-btn'),
        cuisine,
        'cuisine'
    );
    
    // Clear category filters
    document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    showLoading();
    
    const recipes = await filterByCuisine(cuisine);
    state.allRecipes = recipes;
    renderRecipes(recipes);
};

const handleCategoryFilter = async (category) => {
    state.currentCategory = category;
    setActiveFilter(
        document.querySelectorAll('#categoryFilters .filter-btn'),
        category,
        'category'
    );
    
    showLoading();
    
    const recipes = await filterByCategory(category);
    state.allRecipes = recipes;
    renderRecipes(recipes);
};

const handleTabSwitch = (tab) => {
    state.currentTab = tab;
    setActiveTab(tab);
    
    if (tab === 'favorites') {
        renderRecipes(state.favorites);
    } else {
        renderRecipes(state.allRecipes);
    }
};

const handleFavoriteClick = (event, recipeId) => {
    event.stopPropagation();
    
    // Find recipe in current recipes or favorites
    let recipe = state.allRecipes.find(r => r.idMeal === recipeId) ||
                state.favorites.find(r => r.idMeal === recipeId);
    
    if (recipe) {
        toggleFavorite(recipe);
    }
};

// Initialize app
const initializeApp = () => {
    // Search form
    elements.searchForm.addEventListener('submit', handleSearch);
    
    // Clear error on input
    elements.searchInput.addEventListener('input', () => {
        if (elements.searchInput.classList.contains('error')) {
            elements.searchInput.classList.remove('error');
            hideElement(elements.searchError);
        }
    });
    
    // Input validation on blur
    elements.searchInput.addEventListener('blur', () => {
        const value = elements.searchInput.value.trim();
        if (value.length > 0) {
            validateSearchInput(value);
        }
    });
    
    // Cuisine filter buttons
    document.querySelectorAll('#cuisineFilters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            handleCuisineFilter(btn.dataset.cuisine);
        });
    });
    
    // Category filter buttons
    document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            handleCategoryFilter(btn.dataset.category);
        });
    });
    
    // Tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            handleTabSwitch(tab.dataset.tab);
        });
    });
    
    // Modal close on outside click
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Update favorites count
    updateFavoritesCount();
    
    // Load initial recipes
    loadInitialRecipes();
};

// Load initial recipes
const loadInitialRecipes = async () => {
    showLoading();
    
    const recipes = await getInitialRecipes();
    state.allRecipes = recipes;
    renderRecipes(recipes);
};

// Make functions globally available for onclick handlers
window.handleFavoriteClick = handleFavoriteClick;
window.closeModal = closeModal;

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
