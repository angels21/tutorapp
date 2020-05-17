const router = require('express').Router();
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');


//Validation
const Joi = require('@hapi/joi');
const schema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().min(4).required(),
    role: Joi.string().min(4).required()
});


router.post('/addStudent', async(req, res)=>{
  //validate user input
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
  //check if user exist
    const emailExist = await Student.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

  //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //create new student
    const student = new Student({
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
        const savedStudent = await student.save();
        res.send({student:student._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;