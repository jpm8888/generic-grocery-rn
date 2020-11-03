export const HOME_KEY = 'home_';
export const FETCH_RECENT = HOME_KEY + 'fetch_recent';
export const RECENT_LOADED = HOME_KEY + 'recent_loaded';

export const HOME_FETCH_START = HOME_KEY + 'home_fetch_start';
export const HOME_FETCH_END = HOME_KEY + 'home_fetch_end';


export const get_recents_from_db = () => ({
    type: FETCH_RECENT,
});

export const fetchedRecent = (rows) => ({
    type: RECENT_LOADED,
    payload: rows,
});


export const fetch_home = () => ({
    type: HOME_FETCH_START,
    payload : null,
});

export const fetchedHome = (json) => ({
    type: HOME_FETCH_END,
    payload : {data : json.data},
});
