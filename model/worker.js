const mongoose = require('mongoose');


const workerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    role:{
        type: String,
        required: true
    },

    e_mail:{
        type: String
    },

    password: {
        type: String
    }
})

const worker = mongoose.model('worker', workerSchema);
module.exports = worker;