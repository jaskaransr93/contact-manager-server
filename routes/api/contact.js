const express = require("express");
const config = require('config')
const router = express.Router();
const auth = require('../../middlewares/auth');
const User  = require('../../models/User');
var multer = require('multer');
var upload = multer({ 
    dest: './uploads',   
    limits: {
        fileSize: 4 * 1024 * 1024,
    } 
});
const Contact  = require('../../models/Contact');
const parser = require('../../utils/parser');

router.post('/', auth, upload.single('avatar'), async (req, res) => {

    try {
        
        const newContact = new Contact ({
            user: req.user.id,
            name: req.body.name,
            phoneNumbers: parser.tryParse(req.body.phoneNumbers, []),
            emails: parser.tryParse(req.body.emails, []),
            favourite: Boolean(req.body.favourite)
        });

        if (req.file) {
            newContact.profile_picture = req.file.filename;
        }
    
        const contactDB = await newContact.save();
        res.send(contactDB);
    }
    catch(err) {
        console.log("Couldn't add the error", err);
        res.status(500).send("Server Error");
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.send(contacts);
        }
    catch(err) {
        console.log("Couldn't add the error", err);
        res.status(500).send("Server Error");
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findOne({ user: req.user.id, _id: req.params.id });
        res.send(contact);
    }
    catch(err) {
        console.log("Couldn't add the error", err);
        res.status(500).send("Server Error");
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Contact.findOneAndDelete({ _id: req.params.id, user: req.user.id }, (err, result) => {
            if(typeof error != 'undefined' && err != null){
                console.log("Error in deleting !");
                throw error;
            } else {
                console.log("Data all gone and deleted !");
                res.send(result);
            }
        });
    } catch(err) {
        console.log("Couldn't delete the error", err);
        res.status(500).send("Server Error");
    }
});

router.post('/update/:id', auth, async (req, res) => {
    try {
        const contact = {
            user: req.user.id,
            name: req.body.name,
            phoneNumbers:  req.body.phoneNumbers,
            emails:  req.body.emails,
            favourite: req.body.favourite
        };
        const dbContact = await Contact.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        Object.keys(contact).forEach((key) => {
            if (contact[key]) {
                dbContact[key] = contact[key];
            }
        });

        const result = await dbContact.save();
        res.send(result);
    } catch(err) {
        console.log("Couldn't delete the error", err);
        res.status(500).send("Server Error");
    }
});

router.post('/notes', auth, async (req, res) => {

    try {
        const dbContact = await Contact.findOne({
            _id: req.body.contactId,
            user: req.user.id
        });

        if (!dbContact) {
            console.log("Couldn't find contact", err);
            res.status(500).send("Server Error : Couldn't find contact");
        }



       (dbContact.notes || []).push(req.body.description);
    
        const contactDB = await dbContact.save();
        res.send(contactDB);
    }
    catch(err) {
        console.log("Couldn't add the error", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;