const express = require("express");
const path = require("path");
const fs = require("fs");
const app=express();
const port=8000;

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactdance');
}

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    name: String
  });
const contact = mongoose.model('Kitten', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been save to database")
    }).catch(()=>{
        res.status(400).send("Item was not send to database")
    })
    // res.status(200).render('contact.pug');
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});