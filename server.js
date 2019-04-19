var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var mongoose = require('mongoose');
const flash = require('express-flash');
var uniqueValidator = require('mongoose-unique-validator');

app.use(express.static(__dirname + '/public/dist/public'));
app.use(flash());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mean_exam');
var PetSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name cannot be blank"], unique: [true, "Name to be different"], minlength: [3, "Name needs to be at least 3 chars"] },
    type: { type: String, required: [true, "Type cannot be blank"], minlength: [3, "Type needs to be at least 3 chars"] },
    description: { type: String, required: [true, "description cannot be blank"], minlength: [3, "Description needs to be at least 3 chars"] },
    skill1: { type: String, },
    skill2: { type: String, },
    skill3: { type: String, },
    like: {type: Number, default: 0}
}, { timestamps: true });

mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet')
PetSchema.plugin(uniqueValidator);

app.get("/", function (req, res) {

})

app.get("/pets", function (req, res) {
    Pet.find({}, function (err, pet) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err })
        }
        else {
            res.json({ pet })
        }
    }).sort({ "type": 1 })
})

app.get('/pets/:id', function (req, res) {
    pet = req.params.id;
    Pet.find({ _id: pet }, function (err, pet) {
        if (err) {
            res.json({ message: "Error", error: err })
        }
        else {
            res.json({ pet });
        }
    })
})

app.post("/pets", function (req, res) {
    var pet = new Pet({ name: req.body.name, type: req.body.type, description: req.body.description, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3 });
    pet.save(function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            console.log(pet);
            res.json({ message: "Success", pet })
        }
    })
})

app.delete('/delete/:id', function (req, res) {
    console.log("Hit delete backend")
    var pet = req.params.id;
    console.log(pet)
    Pet.remove({ _id: pet }, function () {
        console.log("Deleted Pet");
        res.json({ message: "Deleted" })
    })
})

app.put('/edit/:id', function (req, res) {
    Pet.findOne({ _id: req.params.id }, function (err, pet) {
        pet.name = req.body.name;
        pet.type = req.body.type;
        pet.description = req.body.description;
        pet.skill1 = req.body.skill1;
        pet.skill2 = req.body.skill2;
        pet.skill3 = req.body.skill3;
        pet.save(function (err) {
            if (err) {
                res.json({ message: "Error", error: err })
            } else {
                console.log(pet);
                res.json({ message: "Success", pet })
            }
        })
    })
})
app.put('/petlike/:id', function(req,res){
    Pet.findOne({_id: req.params.id}, function(err, thispet){
        console.log(thispet)
        thispet.like +=1 ;

        thispet.save(function(err, thispet){
            if(err){
                res.json({message: "Could not edit this pet", error:err})
            } else{
                res.json({message: 'success', data: thispet})
            }
        });
    });
})
app.put('/petunlike/:id', function(req,res){
    Pet.findOne({_id: req.params.id}, function(err, thispet){
        console.log(thispet)
        thispet.like -=1 ;

        thispet.save(function(err, thispet){
            if(err){
                res.json({message: "Could not edit this pet", error:err})
            } else{
                res.json({message: 'success', data: thispet})
            }
        });
    });
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function () {
    console.log("listening on port 8000");
})