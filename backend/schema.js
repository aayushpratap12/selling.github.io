const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String
    },
    user_email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
});




const User = mongoose.model('User', UserSchema);

module.exports = { User };