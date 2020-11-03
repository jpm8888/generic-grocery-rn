import Constants, {debugLog} from '../../common/Constants';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(Constants.DATABASE_NAME, (success) => {
    debugLog("database open success : " + success);
}, (error) => {
    debugLog("database open error : " + JSON.stringify(error));
});

export const executeSql = (sql,params=[]) => new Promise((resolve , reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(sql, params, (db,results) => {
                    resolve(results);
                }, (error)=>{
                    reject(error);
                });
        });
    });
