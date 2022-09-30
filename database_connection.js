import mysql from "mysql";
import dotenv from "dotenv";


export class DatabaseConnection {
    db;

    constructor(db) {
        this.db = db
    }

    setupDB(db) {
        dotenv.config({path: `.env.${process.env.NODE_ENV}`})
        return mysql.createConnection({
            host: process.env.MYSQL_HOST
                || 'localhost', //убрать после реализации ha_calculation
            user: process.env.MYSQLDB_USER
                || 'root', //убрать после реализации ha_calculation
            database: db,
            password: process.env.MYSQLDB_ROOT_PASSWORD
                || 'my_name_is_ivan', //убрать после реализации ha_calculation
            insecureAuth: true
        })
    }

    getStatementValues(){
        const sql = 'SELECT * FROM Statement'
        const connection = this.setupDB(this.db);

        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    return reject(err)
                }
                connection.end();
                return resolve(result)
            })
        })
    }

    insertNewRecord(tableNum, lastName, firstName, amount, comment){
        const sql = 'INSERT INTO Statement VALUES (?, ?, ?, ?, DEFAULT,?)'
        const connection = this.setupDB(this.db);

        return new Promise((resolve, reject) => {
            connection.query(sql, [tableNum, firstName, lastName, amount, comment], (err, result) => {
                if (err) {
                    return reject(err)
                }
                connection.end();
                console.log("Inserted successfully")
                return resolve(result)
            })
        })
    }
    updateAmount(tableNum, amount){
        const sql = 'UPDATE Statement SET Amount = ? WHERE TableNum = ?'
        const connection = this.setupDB(this.db);

        return new Promise((resolve, reject) => {
            connection.query(sql, [amount, tableNum], (err, result) => {
                if (err) {
                    return reject(err)
                }
                connection.end();
                console.log("Updated successfully")
                return resolve(result)
            })
        })
    }

    updateRecord(tableNum, lastName, firstName, amount, comment){
        const sql = 'UPDATE Statement SET LastName = ?, FirstName = ?, Amount = ?, Comments = ?  WHERE TableNum = ?'
        const connection = this.setupDB(this.db);

        return new Promise((resolve, reject) => {
            connection.query(sql, [lastName, firstName, amount, comment, tableNum], (err, result) => {
                if (err) {
                    return reject(err)
                }
                connection.end();
                console.log("Updated successfully")
                return resolve(result)
            })
        })
    }
}