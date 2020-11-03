import {debugLog} from '../../common/Constants';
import {is_migration_registered, register_migration} from './migrations';
import {executeSql} from './DatabaseExecutor';
import {create_index, create_unique_idx} from './database_func';

const migration_name = `create_base_tables`;

export const run_migration_v1 = async () =>{
    let is_registered = await is_migration_registered(migration_name);
    if (is_registered) {
        debugLog('already migrated : ' + migration_name);
        return;
    }

    await create_table_prefs();
    await create_table_category();
    await create_table_image();
    await create_table_product();
    await create_table_cart();
    await create_table_recent();

    await register_migration(migration_name);
};

const create_table_recent = async (db) =>{
    let table_name = 'recent';
    let query = `create table if not exists ${table_name}(`;
    query += `product_id integer, `;
    query += `is_sync integer default 0, `;
    query += `created_at text)`;

    try{
        await executeSql(query);
        await create_unique_idx(db, table_name, 'product_id');
        debugLog(`created ${table_name} success`);
    }catch (error) {
        debugLog(`creation error on ${table_name}` + JSON.stringify(error));
        return false;
    }
};

const create_table_cart = async (db) =>{
    let table_name = 'cart';
    let query = `create table if not exists ${table_name}(`;
    query += `id integer primary key not null, `;
    query += `product_id integer, `;
    query += `qty integer, `;
    query += `created_at text, `;
    query += `updated_at text)`;

    try{
        let results = await executeSql(query,[]);
        debugLog(`created ${table_name} success`);
    }catch (error) {
        debugLog(`creation error on ${table_name}` + JSON.stringify(error));
        return false;
    }
};

const create_table_prefs = async (db) =>{
    let table_name = 'prefs';
    let query = `create table if not exists ${table_name}(`;
    query += `id integer primary key not null, `;
    query += `key text, `;
    query += `value text)`;

    try{
        await executeSql(query,[]);
        debugLog(`created ${table_name} success`);
    }catch (error) {
        debugLog(`creation error on ${table_name}` + JSON.stringify(error));
        return false;
    }
};

const create_table_category = async (db) =>{
    let table_name = 'category';
    let query = `create table if not exists ${table_name}(`;
    query += `id integer primary key not null, `;
    query += `name text, `;
    query += `f_image text, `;
    query += `is_active integer, `;
    query += `weight integer, `;
    query += `created_at text, `;
    query += `updated_at text)`;

    try{
        let results = await executeSql(query,[]);
        debugLog(`created ${table_name} success`);
    }catch (error) {
        debugLog(`creation error on ${table_name}` + JSON.stringify(error));
        return false;
    }
};

const create_table_image = async (db) =>{
    let table_name = 'image';
    let query = `create table if not exists ${table_name}(`;
    query += `id integer primary key not null, `;
    query += `type text, `; //type : product or category
    query += `type_id integer, `; //product_id or category_id
    query += `image_path text, `;
    query += `created_at text, `;
    query += `updated_at text)`;

    try{
        let results = await executeSql(query,[]);
        await create_index(db, table_name, 'type');
        await create_index(db, table_name, 'type_id');
        debugLog(`created ${table_name} success`);
    }catch (error) {
        debugLog(`creation error on ${table_name}` + JSON.stringify(error));
        return false;
    }
};

const create_table_product = async (db) =>{
    let table_name = 'product';
    let query = `create table if not exists ${table_name}(`;
    query += `id integer primary key not null, `;
    query += `parent_id integer, `;
    query += `code text, `;
    query += `name text, `;
    query += `price text, `;
    query += `category_id integer, `;
    query += `min_qty integer, `;
    query += `qty_type text, `; //set or piece
    query += `description text, `;
    query += `liked integer default 0, `;
    query += `is_active integer, `;
    query += `created_at text, `;
    query += `updated_at text)`;

    try{
        let results = await executeSql(query,[]);
        await create_index(db, table_name, 'parent_id');
        await create_index(db, table_name, 'code');
        await create_index(db, table_name, 'category_id');
        await create_index(db, table_name, 'qty_type');
        debugLog(`created ${table_name} success`);
    }catch (error) {
        debugLog(`creation error on ${table_name}` + JSON.stringify(error));
        return false;
    }
};



