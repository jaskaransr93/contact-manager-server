const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PhoneNumber = require('./PhoneNumber');
const Email = require('./Email');

const ContactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String
    },
    // profile_picture: {
    //     data: Buffer,
    //     contentType: String
    // },
    phoneNumbers: [PhoneNumber.schema],
    emails: [Email.schema],
    notes: [String],
    favourite : {
        type: Boolean
    }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);