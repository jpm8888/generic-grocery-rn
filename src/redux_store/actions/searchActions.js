export const SEARCH_KEY = 'search_';
export const SEARCH_START = SEARCH_KEY +'start';
export const SEARCH_END = SEARCH_KEY +'end';

export const SEARCH_RESET = SEARCH_KEY +'reset';


export const onQuery = (queryStr, category_id) => ({
    type: SEARCH_START,
    payload : {queryStr, category_id},
});


export const onQueryFulfilled = (data) => ({
    type: SEARCH_END,
    payload : data,
});


export const clearSearch = () => ({
    type: SEARCH_RESET,
    payload : {},
});
