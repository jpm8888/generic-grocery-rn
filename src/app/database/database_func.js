import * as shortId from 'shortid';
import {executeSql} from './DatabaseExecutor';
import {debugLog} from '../../common/Constants';

export const create_index = async (db, table_name, column_name) =>{
    let id = shortId.generate();
    id = replaceAll(id, '-', 'x');

    let index_name = `${table_name}_${column_name}_${id}_index`;
    let query = `create index ${index_name} ON ${table_name} (${column_name})`;

    try{
        let results = await executeSql(query,[]);
        debugLog(`created ${index_name} on ${table_name} success`);
    }catch (error) {
        debugLog(`creation error on ${table_name}` + JSON.stringify(error));
        return false;
    }
};

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

export const create_unique_idx = async (db, table_name, column_name) =>{
    let id = shortId.generate();
    id = replaceAll(id, '-', 'x');

    let index_name = `${table_name}_${column_name}_${id}_unique_idx`;
    let query = `create unique index ${index_name} ON ${table_name} (${column_name})`;

    try{
        let results = await executeSql(query,[]);
        debugLog(`created ${index_name} on ${table_name} success`);
    }catch (error) {
        debugLog(`creation error on ${table_name}` + JSON.stringify(error));
        return false;
    }
}
