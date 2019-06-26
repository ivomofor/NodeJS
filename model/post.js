const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/NodeDB',{useNewUrlParser: true}, ()=>console.log('Connected to Database'));
const postSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone: String,
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: [true, 'Message field is required!']
    }
});

module.exports = mongoose.model('PostContactDB', postSchema);