import moment from 'moment';
import {debugLog} from '../../../common/Constants';
import {executeSql} from '../DatabaseExecutor';


export const insert_recent = async(product_id) =>{
    let created_at = moment().format('YYYY:MM::DD HH:mm:ss');
    console.log(created_at);
    const table_name = 'recent';

    let query = `replace into ${table_name} `;
    query += `(product_id, created_at) `;
    query += `VALUES (?, ?)`;

    try{
        await executeSql(query, [product_id, created_at]);
    }catch (e) {
        debugLog('insert recent error');
        console.log(e);
    }


}

export const get_recent = async(limit = 15) =>{
    const table_name = 'recent';

    let cols = `product.code, product.id, product.liked, product.name, product.price, product.qty_type, image.image_path`;
    let query = `select ${cols} from ${table_name} left join product on recent.product_id = product.id`;
    query += ` left join image on product.id = image.type_id where image.type = 'product'`;
    query += ` group by product.id order by recent.created_at desc limit ${limit}`;

    try{
        let result = await executeSql(query, []);
        let rows = result.rows;
        let array = [];
        for (let i = 0; i < rows.length; i++) {
            array.push(rows.item(i));
        }
        debugLog(`returning result get_recent()`);
        return array;
    }catch (error) {
        debugLog(`get_recent() error in ${table_name} :` + JSON.stringify(error))
    }
}
