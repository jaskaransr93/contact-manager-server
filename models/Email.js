const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmailSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    primary: {
        type: Boolean,
        default: false
    }
});

module.exports = Email = mongoose.model('email', EmailSchema);