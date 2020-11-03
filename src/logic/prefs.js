import {executeSql} from '../app/database/DatabaseExecutor';
import {debugLog} from '../common/Constants';

export const KEY_AUTH_TOKEN = 'auth_token'; //bearer token

export async function save_pref(k, v) {
    let key = k.toString().trim();
    let value = (v) ? v.toString().trim() : null;
    try{
        const table_name = 'prefs';
        let query = `select * from ${table_name} where key = '${key}' limit 1`;
        let {rows} = await executeSql(query, []);
        if (rows.length > 0){
            let item = rows.item(0);
            let updateQuery = `update ${table_name} set value = '${value}' where id = ${item.id}`;
            await executeSql(updateQuery);
        }else{
            let insertQuery = `insert into ${table_name} (key, value) values('${key}', '${value}')`;
            await executeSql(insertQuery);
        }
    }catch (e) {
        debugLog('save_pref() error :');
        debugLog(e);
    }
}

export async function get_pref(k, dV) {
    let key = k.toString().trim();
    let defaultValue = dV.toString().trim();
    try{
        const table_name = 'prefs';
        let query = `select * from ${table_name} where key = '${key}' limit 1`;
        let {rows} = await executeSql(query, []);
        return rows.length > 0 ? rows.item(0).value : defaultValue;
    }catch (e) {
        debugLog('get_pref() error :');
        debugLog(e);
    }
}
