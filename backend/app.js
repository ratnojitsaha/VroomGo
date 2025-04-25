const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors= require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

connectToDb();

//accepting access from particular domain, 
//later going to change the cors() to specific domain
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req, res)=>{
    res.send("Hello World");
})


app.use('/users', userRoutes);


module.exports = app
