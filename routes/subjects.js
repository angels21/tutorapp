const mongoose = require('mongoose');
const router = require('express').Router();
const Subject = require('../models/Subject');

//to add a subject to JSS category
router.post('/addJSSSubject', (req, res) => {
    console.log("Adding a JSS subject")
    const subjectObj = {
        "_id": new mongoose.Types.ObjectId(),
        "subject": req.body.subject,
        "description": req.body.description,
        "category": "5ebcccab207678aa4b3b2ba8"
    }
    const newSubject = new Subject(subjectObj);
    newSubject.save((err, subject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(subject);
    })
});
//add subject to SSS category
router.post('/addSSSSubject', (req, res) => {
    console.log("Adding a SSS subject")
    const subjectObj = {
        "_id": new mongoose.Types.ObjectId(),
        "subject": req.body.subject,
        "description": req.body.description,
        "category": "5ebcd089207678aa4b3b2ba9"
    }
    const newSubject = new Subject(subjectObj);
    newSubject.save((err, subject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(subject);
    })
});
//add subject to primary category
router.post('/addPRIMARYSubject', (req, res) => {
    console.log("Adding a PRIMARY subject")
    const subjectObj = {
        "_id": new mongoose.Types.ObjectId(),
        "subject": req.body.subject,
        "description": req.body.description,
        "category": "5ebcd0bb207678aa4b3b2baa"
    }
    const newSubject = new Subject(subjectObj);
    newSubject.save((err, subject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(subject);
    })
});
//To retrieve all subjects
router.get('/subjects', (req, res) => {
    console.log("Retrieving all subjects");
    Subject.find({}).populate("category").exec((err, subjects) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(subjects);
    })
})
//get subject by name*
router.get('/subjectbyname', (req, res, next) => {
	Subject.getSubjectByname(req.subject.subject, function(err, subject){
		if(err)
		    res.status(400).send(err);
        else
            res.status(200).json(subject);
	});
});
//To update a subject by ID
router.put('/updatesubjectbyId/:id', (req, res) => {
    console.log("Updating a subject");
    const subjectObj = {
        "subject": req.body.subject,
        "description": req.body.description
    }
    Subject.findByIdAndUpdate(req.params.id, subjectObj, {new: true}).exec((err, subject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(subject);
    })
})
//Delete a subject by ID
router.delete('/deletesubjectbyId/:id', (req, res) => {
    console.log("Deleting subject");
    Subject.findByIdAndDelete(req.params.id).exec((err, subject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(subject);
    })
})

module.exports = router;