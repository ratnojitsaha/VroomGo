const mongoose = require('mongoose');

const db = process.env.DB_CONNECT;

//need to remove the db and maintain the normal flow

function connectToDb(){
    mongoose.connect(db//process.env.DB_CONNECT 
       ).then(()=>{
        console.log(`connected to db ${db}`);
       }).catch(err => console.log(err));

}


module.exports = connectToDb;