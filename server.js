const express =  require('express');
const connectDB = require('./config/db');
var cors = require('cors');

//create express app
const app = express();
connectDB();

app.use(cors());  

//set the middleware to parse data
app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname +'/uploads/'));
app.use('/api/contacts', require('./routes/api/contact'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log('server started') });