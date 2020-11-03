import {debugLog} from '../../common/Constants';
import {executeSql} from './DatabaseExecutor';

const table_name = 'migrations';
export const create_table_migrations = async () =>{
    let query = `create table if not exists ${table_name}(`;
    query += `id integer primary key not null, `;
    query += `name unique)`;

    try{
        let results = await executeSql(query,[]);
        debugLog(`created ${table_name} success ` + JSON.stringify(results));
    }catch (error) {
        debugLog(`creation error on ${table_name}` + JSON.stringify(error));
    }
};


export const register_migration = async (migration_name) =>{
    debugLog(`registering migration : ${migration_name}`);
    let query = `insert into ${table_name} `;
    query += `(name) `;
    query += `VALUES ('${migration_name}')`;

    try{
        let results = await executeSql(query,[]);
        debugLog(`successfully insert in ${table_name}`);
    }catch (error) {
        debugLog(`insert error in ${table_name} :` + JSON.stringify(error))
    }
};

export const is_migration_registered = async (migration_name) =>{
  let query = `select * from ${table_name} where name = '${migration_name}'`;
    try{
        let results = await executeSql(query,[]);
        debugLog('migration data fetched successfully');
        return (results.rows.length !== 0);
    }catch (error) {
        debugLog(`select error in ${table_name} :` + JSON.stringify(error));
        return false;
    }
};
