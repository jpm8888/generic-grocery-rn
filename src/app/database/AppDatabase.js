import Constants, {debugLog} from '../../common/Constants';
import {run_migration_v1} from './migration_v1';
import {create_table_migrations} from './migrations';
import {executeSql} from './DatabaseExecutor';


export const run_database_migrations = async () =>{
    debugLog('running database migrations...');
    await create_table_migrations();
    await run_migration_v1();
};


export const insert_mcq = async (mcqArray) =>{
    const table_name = 'mcq';

    let query = `insert into ${table_name} `;
    query += `(id, lang_id, question, op_a, op_b, op_c, op_d, answer, level_id) `;
    query += `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    if (mcqArray.length === 0){
        debugLog('mcq array is empty');
    }

    try{
        mcqArray.map(async (item)=>{
            let result = await executeSql(`select id from ${table_name} where id = ${item.id}`, []);
            let array = result.rows;
            if (array.length === 0){
                await executeSql(query, [item.id, item.lang_id, item.question, item.op_a, item.op_b, item.op_c, item.op_d, item.answer, item.level_id]);
            }
        });
        debugLog(`successfully inserts in ${table_name}`);
    }catch (error) {
        debugLog(`insert error in ${table_name} :` + JSON.stringify(error))
    }
};

export const insert_counts = async (countOb) =>{
    const table_name = 'counts';

    let query = `insert into ${table_name} `;
    query += `(key, value) `;
    query += `VALUES (?, ?)`;

    try{
        await executeSql(`delete from ${table_name}`, []);
        await executeSql(query, ['very_easy', countOb.very_easy]);
        await executeSql(query, ['easy', countOb.easy]);
        await executeSql(query, ['medium', countOb.medium]);
        await executeSql(query, ['hard', countOb.hard]);
        await executeSql(query, ['very_hard', countOb.very_hard]);
        debugLog(`successfully inserts in ${table_name}`);
    }catch (error) {
        debugLog(`insert error in ${table_name} :` + JSON.stringify(error))
    }
};

export const fetch_mcqs_n_insert = async(lang_id) =>{
    let url = Constants.API_BASE_URL + `mcq/get_rand/${lang_id}`;
    let response = await fetch(url);
    let json = await response.json();
    await insert_mcq(json.mcq);
    await insert_counts(json.counts);
};

export const get_mcq = async (level_id, lang_id) =>{
    const table_name = 'mcq';
    let query = `select * from ${table_name} where level_id = ${level_id} and lang_id = ${lang_id} and is_attempt = 0 ORDER BY random() limit 1`;

    try{
        let mcq = await executeSql(query, []);
        if (mcq.rows.length === 0){
            debugLog('fetching from api...');
            // let url = Constants.API_BASE_URL + `mcq/get_rand/${lang_id}`;
            // let response = await fetch(url);
            // let json = await response.json();
            let json = await fetch_mcqs_n_insert(lang_id);

            mcq = await executeSql(query, []);
            if (mcq.rows.length === 0){
                debugLog('resetting is_attempt...');
                await executeSql(`update ${table_name} set is_attempt = 0`, []);
                mcq = await executeSql(query, []);
            }
        }
        debugLog(`success select in ${table_name}`);
        return mcq.rows.item(0);
    }catch (error) {
        debugLog(`select error in ${table_name} :` + JSON.stringify(error));
        return undefined;
    }
};

export const set_is_attempt = async (mcq_id) =>{
    try{
        const table_name = 'mcq';
        let query = `update ${table_name} set is_attempt = 1 where id = ${mcq_id}`;
        await executeSql(query, []);
    }catch (e) {
        debugLog(`set_is_attempt() error  :` + JSON.stringify(error));
    }
};

export const get_counts = async () =>{
    const table_name = 'counts';
    let query = `select * from ${table_name}`;

    try{
        let results = await executeSql(query, []);
        debugLog(`success select in ${table_name}`);
        return results.rows;
    }catch (error) {
        debugLog(`select error in ${table_name} :` + JSON.stringify(error))
        return [];
    }
};
