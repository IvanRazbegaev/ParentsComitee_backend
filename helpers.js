import {DatabaseConnection} from "./database_connection.js";

const statementConnection = new DatabaseConnection('ParentsComitee');

export const getValuesFromStatement = async () => {
    return await statementConnection.getStatementValues()
}

export const addNewChild = async (tableNum, lastName, firstName, amount, comment) => {
  await statementConnection.insertNewRecord(tableNum, lastName, firstName, amount, comment);
}

export const changeChildAmount = async (tableNum, amount) => {
    await statementConnection.updateAmount(tableNum, amount);
}

export const editRecord = async (tableNum, lastName, firstName, amount, comment) => {
    await statementConnection.updateRecord(tableNum, lastName, firstName, amount, comment)
}