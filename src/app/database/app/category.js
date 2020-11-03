import Constants, {debugLog} from '../../../common/Constants';
import {executeSql} from '../DatabaseExecutor';
import {get_pref, KEY_AUTH_TOKEN} from '../../../logic/prefs';

export const fetch_category_n_insert = async() =>{
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let url = Constants.API_BASE_URL + `common_v2/fetch_category`;
    let response = await fetch(url,  {method : 'GET', headers});
    let json = await response.json();
    await insert_category(json.categories);
};

const insert_category = async (categories = []) =>{
    const table_name = 'category';

    let query = `insert into ${table_name} `;
    query += `(id, name, f_image, is_active, weight, created_at, updated_at) `;
    query += `VALUES (?, ?, ?, ?, ?, ?, ?)`;

    if (categories.length === 0){
        debugLog('insertCategory() - items array is empty');
    }

    try{
        const asyncRes = await Promise.all(categories.map(async (item)=>{
            let result = await executeSql(`select id from ${table_name} where id = ${item.id}`, []);
            let array = result.rows;
            if (array.length === 0){
                await executeSql(query, [
                    item.id,
                    item.name,
                    item.f_image,
                    item.is_active,
                    item.weight,
                    item.created_at,
                    item.updated_at,
                ]);
            }else{
                await update_category(result.rows.item(0), item);
            }
        }));
        debugLog(`successfully inserts in ${table_name}`);
    }catch (error) {
        debugLog(`insert error in ${table_name} :`)
        debugLog(error)
    }
};

async function update_category(oldItem, newItem) {
    if (oldItem.updated_at === newItem.updated_at) return;
    const {id, name, f_image, is_active, weight, created_at, updated_at} = newItem;
    const tableName = "category";
    let query = `update ${tableName} set name=?, f_image=?, is_active=?, weight=?, created_at=?, updated_at=? where id = ?`;
    try{
        await executeSql(query, [name, f_image, is_active, weight, created_at, updated_at, id]);
    }catch (e) {
        debugLog('update_category error :');
        console.log(e);
    }
}

export const get_category = async () =>{
    const table_name = 'category';
    let query = `select * from ${table_name} order by weight`;
    try{
        let result = await executeSql(query, []);
        let rows = result.rows;
        let array = [];
        for (let i = 0; i < rows.length; i++) {
            array.push(rows.item(i));
        }
        debugLog(`returning result get_category()`);
        return array;
    }catch (error) {
        debugLog(`get_category() error in ${table_name} :` + JSON.stringify(error))
    }
};
