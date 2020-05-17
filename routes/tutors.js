const router = require('express').Router();
const Tutor = require('../models/Tutor');
const bcrypt = require('bcryptjs');

//Tutor Register  
const Joi = require('@hapi/joi');

const schema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().min(4).required()
});
router.post('/addTutor', async(req, res)=>{
  //validate user input
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
  //check if user exist
    const emailExist = await Tutor.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

  //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //create new tutor
    const tutor = new Tutor({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
        gender: req.body.gender,
        role: req.body.role,
        timestamps: req.body.timestamps
    });
    try{
        const savedTutor = await tutor.save();
        res.send({tutor:tutor._id});
    } catch (err) {
        res.status(400).send(err);
    }
});
//Retrieve all tutors
router.get('/tutors', (req, res) => {
    console.log("Retrieving all tutors");
    Tutor.find({}).exec((err, tutors) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(tutors);
    })
})
//get tutor by firstname*
router.get('/tutorbyfirstname', (req, res, next) => {
	Tutor.getTutorByFirstname(req.tutor.firstname, function(err, tutor){
		if(err)
		    res.status(400).send(err);
        else
            res.status(200).json(tutor);
	});
});
//Get a tutor by ID
router.get('/gettutorbyId/:id', (req, res) => {
    console.log("Retrieving a tutor by Id");
    Tutor.findById(req.params.id).exec((err, tutor) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(tutor);
    })
})
//Deactivate tutor by Id
router.delete('/deletetutorbyId/:id', (req, res) => {
    console.log("Deleting tutor");
    Tutor.findByIdAndDelete(req.params.id).exec((err, tutor) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(tutor);
    })
})
module.exports = router;