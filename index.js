const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json())


app.get("/complaints", (req, res) => {
    res.send('Complaints page')
})

app.get("/", function (req, res) {
    res.send("Hello")
})



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})

// db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

app.post("/", (req, res) => {
    console.log(req.body);
    var name = req.body.name;
    var phone = req.body.phone;
    var location = req.body.location;
    var complaint = req.body.Cname;

    var data = {
        "name": name,
        "phone": phone,
        "location": location,
        "complaint": complaint
    }

    db.collection('sarkar').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
            console.log(err);
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('https://dheesimha.github.io/sarkar-frontend/');

})
