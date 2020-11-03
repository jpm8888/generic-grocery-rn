export const CATEGORY_KEY = 'category_';
export const CATEGORY_LOADING = CATEGORY_KEY +'category_load_start';
export const CATEGORY_LOAD_SUCCESS = CATEGORY_KEY +'category_load_success';


export const get_categories_from_db = () => ({
    type: CATEGORY_LOADING,
    payload : true,
});


export const fetchedCategory = (rows) => ({
    type: CATEGORY_LOAD_SUCCESS,
    payload : rows,
});



