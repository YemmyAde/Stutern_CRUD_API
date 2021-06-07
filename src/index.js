import express from 'express';
import cors from 'cors';
import client from '../database/index.js';
import {getUsers, getUsersId, postUsers, putUsers, deleteUsers} from '../route/index.js';

 const app = express();
 const PORT = process.env.port || 7050

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());


client.connect()
app.get('/', (req, res)=>{
    res.send({name: "ok"})
})

app.get('/Users',getUsers)
app.get('/Users/:id',getUsersId)
app.post('/Users', postUsers)
app.put('/Users/:id', putUsers)
app.delete('/Users/:id', deleteUsers)


app.listen(PORT, ()=> {
    console.log("hello world")
})