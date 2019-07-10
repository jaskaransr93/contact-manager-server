const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PhoneNumberSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    primary: {
        type: Boolean,
        default: false
    }
});

module.exports = PhoneNumber = mongoose.model('phoneNumber', PhoneNumberSchema);