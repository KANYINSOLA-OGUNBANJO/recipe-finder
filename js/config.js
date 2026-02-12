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

function buildApiUrl(endpoint, params = {}) {
    const url = new URL(CONFIG.BASE_URL + endpoint);
    Object.keys(params).forEach(key => {
        if (params[key]) url.searchParams.append(key, params[key]);
    });
    return url.toString();
}