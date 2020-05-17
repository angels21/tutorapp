const router = require('express').Router();
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Tutor = require('../models/Tutor');
const Joi = require('@hapi/joi');
//login validation

router.post('/register', async(req, res)=>{
    const schema = Joi.object({
        firstname: Joi.string().min(2).required(),
        lastname: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        isAdmin: Joi.string().min(3).required(),
        gender: Joi.string().min(4).required(),
        role: Joi.string().min(4).required()
    });
    //validate user input
      const {error} = schema.validate(req.body);
      if(error){ 
          return res.status(400).send(error.details[0].message);
      }else{
        const email   = req.body.email;
        const isAdmin = req.body.isAdmin;
        const role    = req.body.role;

        if(role =='student'){
                console.log('Registering Student...');
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
        }else if(role == 'tutor') {
            console.log('Registering Tutor...');
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
        }else if(email == 'admin@yahoo.com' && isAdmin == 'true'){
            console.log('Registering isAdmin...');
          //check if user exist
            const emailExist = await Admin.findOne({email: req.body.email});
            if(emailExist) return res.status(400).send('Admin already registered');
        
          //Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
          //create new tutor
            const admin = new Admin({
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
                const savedAdmin = await admin.save();
                res.send({admin: admin._id});
            } catch (err) {
                res.status(400).send(err);
            }
        }
    }
});
//User login
router.post('/login', async(req, res)=>{
        //login validation
        const schema = Joi.object({
            
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required(),
            role: Joi.string().min(5).required()

        });
    //validate user input
      const {error} = schema.validate(req.body);
      if(error) return res.status(400).send(error.details[0].message);
      const role = req.body.role;
      if(role == 'student'){
            //check if student email exist
            const student = await Student.findOne({email: req.body.email});
            if(!student) return res.status(400).send('Student email is not found');
            //check if password is correct
            const validPass = await bcrypt.compare(req.body.password, student.password)
            if(!validPass) return res.status(400).send('Invalid password');
            //create and assign a token including personalized secret token
            const tokenSecret = "qehagdfyw170vebxc834jg";
            const token = jwt.sign({_id: student._id}, tokenSecret);
            res.header('auth-token', token).send(token);

      }else if(role == 'tutor'){
            const tutor = await Tutor.findOne({email: req.body.email});
            if(!tutor) return res.status(400).send('Tutor email is not found');
            //check if password is correct
            const validPass = await bcrypt.compare(req.body.password, tutor.password)
            if(!validPass) return res.status(400).send('Invalid password');
            //create and assign a token including personalized secret token
            const tokenSecret = "qehagdfyw170vebxc834jg";
            const token = jwt.sign({_id: tutor._id}, tokenSecret);
            res.header('auth-token', token).send(token);
      }else if(role == 'admin'){
            const admin = await Admin.findOne({email: req.body.email});
            if(!admin) return res.status(400).send('Email not admin');
            //check if password is correct
            const validPass = await bcrypt.compare(req.body.password, admin.password)
            if(!validPass) return res.status(400).send('Invalid password');
            //create and assign a token including personalized secret token
            const tokenSecret = "qehagdfyw170vebxc834jg";
            const token = jwt.sign({_id: admin._id}, tokenSecret);
            res.header('auth-token', token).send(token);
      }
    
});

module.exports = router;