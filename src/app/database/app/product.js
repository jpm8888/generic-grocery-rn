import Constants, {debugLog} from '../../../common/Constants';
import {executeSql} from '../DatabaseExecutor';
import {get_pref, KEY_AUTH_TOKEN} from '../../../logic/prefs';

export const fetch_product_n_insert = async(category_id, offset = 0, limit = 40) =>{
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;

    let url = Constants.API_BASE_URL + `common_v2/fetch_products`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const body = JSON.stringify({
       category_id, offset, limit
    });

    let response = await fetch(url,  {method : 'POST', headers, body});
    let json = await response.json();
    await insert_product(json.products, json.base_url_images);
};

const insert_product = async (productItems = [], baseUrl) =>{
    const table_name = 'product';

    let query = `insert into ${table_name} `;
    query += `(id, parent_id, code, name, price, category_id, min_qty, qty_type, description, is_active, created_at, updated_at) `;
    query += `VALUES (?, ?, ?, ?, ?, ?, ? , ? , ? , ? , ?, ? )`;

    if (productItems.length === 0){
        debugLog('insert_product() - items array is empty');
    }

    try{
        const asyncRes = await Promise.all(productItems.map(async (item)=>{
            let result = await executeSql(`select id from ${table_name} where id = ${item.id}`, []);
            let array = result.rows;
            if (array.length === 0){
                const {id, parent_id, code, name, price, category_id, min_qty, qty_type, description, is_active, created_at, updated_at} = item;
                await executeSql(query, [
                    id, parent_id, code, name, price, category_id, min_qty, qty_type, description, is_active, created_at, updated_at
                ]);
            }else{
                await update_product(result.rows.item(0), item);
            }

            await insert_images(baseUrl, item.f_product_images);
        }));
        debugLog(`successfully inserts in ${table_name}`);
    }catch (error) {
        debugLog(`insert error in ${table_name} :`)
        debugLog(error)
    }
};

async function update_product(oldItem, newItem) {
    if (oldItem.updated_at === newItem.updated_at) return;
    const {id, parent_id, code, name, price, category_id, min_qty, qty_type, description, is_active, created_at, updated_at} = newItem;
    const tableName = "product";
    let query = `update ${tableName} set code=?, parent_id = ?, name=?, price=?, category_id=?, min_qty=?, qty_type=?, description=?, is_active=?, created_at=?, updated_at=? where id = ${id}`;
    try{
        await executeSql(query, [code, parent_id, name, price, category_id, min_qty, qty_type, description, is_active, created_at, updated_at]);
    }catch (e) {
        debugLog('update_product error :');
        console.log(e);
    }
}

async function update_image(oldItem, newItem, baseUrl) {
    if (oldItem.updated_at === newItem.updated_at) return;
    const {id, type, type_id, image_path, created_at, updated_at} = newItem;
    const path = baseUrl + image_path;
    const tableName = "image";
    let query = `update ${tableName} set type = ?, type_id = ?, image_path = ?, created_at= ?, updated_at = ? where id = ${id}`;
    try{
        await executeSql(query, [type, type_id, path, created_at, updated_at]);
    }catch (e) {
        debugLog('update_image error :');
        console.log(e);
    }
}

const insert_images = async (baseUrl, images = []) =>{
    const table_name = 'image';
    let query = `insert into ${table_name} `;
    query += `(id, type, type_id, image_path, created_at, updated_at) `;
    query += `VALUES (?, ?, ?, ?, ?, ?)`;
    const asyncRes = await Promise.all(images.map(async (item)=>{
        let result = await executeSql(`select id from ${table_name} where id = ${item.id}`, []);
        let array = result.rows;
        if (array.length === 0){
            const {id, type, type_id, image_path, created_at, updated_at} = item;
            const path = baseUrl + image_path;
            await executeSql(query, [
                id, type, type_id, path, created_at, updated_at
            ]);
        }else{
            await update_image(result.rows.item(0), item, baseUrl);
        }
    }));
}

export const get_product = async (category_id, offset = 0, limit = 20) =>{
    const table_name = 'product';
    let selected_cols = `${table_name}.category_id, ${table_name}.parent_id, ${table_name}.code, ${table_name}.id, ${table_name}.liked, ${table_name}.name, ${table_name}.price, ${table_name}.qty_type`

    let query = `select ${selected_cols}, image.image_path from ${table_name} left join image on product.id = image.type_id where product.parent_id = 0 and product.category_id = ${category_id} and image.type = 'product' group by ${table_name}.id order by product.code limit ${offset}, ${limit}`;
    try{
        let result = await executeSql(query, []);
        let rows = result.rows;
        let array = [];
        for (let i = 0; i < rows.length; i++) {
            array.push(rows.item(i));
        }
        debugLog(`returning result get_product()`);
        return array;
    }catch (error) {
        debugLog(`get_product() error in ${table_name} :` + JSON.stringify(error))
    }
};


export const get_product_details = async (product_id) =>{
    try{
        const table_name = 'product';
        let query = `select * from ${table_name} where id = ${product_id} or parent_id = ${product_id}`;
        await fetch_product_details(product_id);
        let result = await executeSql(query, []);
        let rows = result.rows;

        let productDetails = [];

        let products = [];
        for (let i = 0; i < rows.length; i++) {
            products.push(rows.item(i));
        }


        await Promise.all (products.map(async product => {
            let imageQuery = `select * from image where type_id = ${product_id} and type = 'product' limit 1`;
            let res = await executeSql(imageQuery, []);
            let images = res.rows;
            let image = images.item(0);
            productDetails.push({product, image});
        }));

        debugLog(`returning result get_product_details()`);
        return productDetails;
    }catch (error) {
        debugLog(`get_product_details() error :` + JSON.stringify(error))
    }
};

async function fetch_product_details(id) {
    debugLog('fetching product details ->' + id);
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;

    let url = Constants.API_BASE_URL + `common_v2/product/${id}`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let response = await fetch(url,  {method : 'GET', headers});
    let json = await response.json();
    await insert_product([json.product], json.base_url_images);
    debugLog('inserting variants ->' + json.variants.length);
    await insert_product(json.variants, json.base_url_images); //variants
}
