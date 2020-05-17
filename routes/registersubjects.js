const mongoose = require('mongoose');
const router = require('express').Router();
const Registersubject = require('../models/Registersubject');

//to add a JSS subject to a tutor
router.post('/addtutortoJSSSubject', (req, res) => {
    console.log("Registering JSS subject under a tutor")
    const registersubjectObj = {
        "_id": new mongoose.Types.ObjectId(),
        "duration": req.body.duration,
        "category": "5ebcccab207678aa4b3b2ba8",
        "subject": "5ebcda365229d1aaef705b7d",
        "tutor": "5ebd8ea86301dcbfbbeb7fb4"
    }
    const newRegistersubject = new Registersubject(registersubjectObj);
    newRegistersubject.save((err, registersubject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(registersubject);
    })
});
//register tutor for SSS subject
router.post('/addtutortoSSSSubject', (req, res) => {
    console.log("Registering SSS subject under a tutor")
    const registersubjectObj = {
        "_id": new mongoose.Types.ObjectId(),
        "duration": req.body.duration,
        "category": "5ebcd089207678aa4b3b2ba9",
        "subject": "5ebcdd6bf54dc5aed3d6b608",
        "tutor": "5ebdb00cb4fa6ecc5f91f3d9"
    }
    const newRegistersubject = new Registersubject(registersubjectObj);
    newRegistersubject.save((err, registersubject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(registersubject);
    })
});
//register tutor for PRIMARY subject
router.post('/addtutortoPRIMARYSubject', (req, res) => {
    console.log("Registering PRIMARY subject under a tutor")
    const registersubjectObj = {
        "_id": new mongoose.Types.ObjectId(),
        "duration": req.body.duration,
        "category": "5ebcd0bb207678aa4b3b2baa",
        "subject": "5ebce009b5780cb377afdaab",
        "tutor": "5ebdafddb4fa6ecc5f91f3d8"
    }
    const newRegistersubject = new Registersubject(registersubjectObj);
    newRegistersubject.save((err, registersubject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(registersubject);
    })
});
//To retrieve all subjects a tutor is registered for
router.get('/registeredsubjects/:id', (req, res) => {
    console.log("Retrieving all subjects for a tutor");
    Registersubject.find(req.params.tutor_id).populate("tutor").exec((err, registersubjects) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(registersubjects);
    })
})

//To update a registered subject by ID
router.put('/updateregisteredsubjectbyId/:id', (req, res) => {
    console.log("Updating a registered subject");
    const registersubjectObj = {
        "duration": req.body.duration,
    }
    Registersubject.findByIdAndUpdate(req.params.id, registersubjectObj, {new: true}).exec((err, registersubject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(registersubject);
    })
})
//Delete a registered subject by ID
router.delete('/deleteregisteredsubjectbyId/:id', (req, res) => {
    console.log("Deleting registered subject");
    Registersubject.findByIdAndDelete(req.params.id).exec((err, registersubject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(registersubject);
    })
})
module.exports = router;