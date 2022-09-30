import express from "express";
import moment from "moment/moment.js";
import cors from "cors";
import {addNewChild, changeChildAmount, editRecord, getValuesFromStatement} from "./helpers.js";

const server = express();
const corsOptions = {
    origin: '*'
}
const port = 8000

server.use(cors(corsOptions))
    .use(express.json());

server.route('/statement')
    .get(getAllValuesFromStatement)
    .post(addNewRecord)

server.route('/editStatement')
    .post(editStatementRecord)

server.route('/changeAmount')
    .post(changeAmount)

async function getAllValuesFromStatement(req, res) {
    let result;
    try{
        result = await getValuesFromStatement();
    } catch (e) {
        result = `An error has been occurred while getting value from Statement table: ${e}`
        console.log('Error: ',e)
    }
    res.send(JSON.stringify(result))
}

async function addNewRecord(req, res) {
    let result;
    try{
        result = await addNewChild(req.body.tableNum, req.body.lastName, req.body.firstName, req.body.amount, req.body.comment);
    } catch (e) {
        result = `An error has been occurred while getting value from Statement table: ${e}`
        console.log('Error: ',e)
    }
    res.send(JSON.stringify(result))
}

async function changeAmount(req, res){
    let result;
    try{
        result = await changeChildAmount(req.body.tableNum, req.body.amount);
    } catch (e) {
        result = `An error has been occurred while changing amount in Statement table: ${e}`
        console.log('Error: ',e)
    }
    res.send(JSON.stringify(result))
}

async function editStatementRecord(req, res) {
    let result;
    try{
        result = await editRecord(req.body.tableNum, req.body.lastName, req.body.firstName, req.body.amount, req.body.comment);
    } catch (e) {
        result = `An error has been occurred while changing data in Statement table: ${e}`
        console.log('Error: ',e)
    }
    res.send(JSON.stringify(result))
}

// Server
server.listen(`${port}`, () => {
    console.log("Server is running and listening on port ", port)
});