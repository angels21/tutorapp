const mongoose = require('mongoose');
const router = require('express').Router();
const Lesson = require('../models/Lesson');
//add a lesson
router.post('/addLesson', (req, res) => {
    console.log("Adding a lesson")
    const lessonObj = {
        "_id": new mongoose.Types.ObjectId(),
        "time": req.body.time,
        "lessonnumber": req.body.lessonnumber,
        "registersubject": "5ebdb1bb3b12e0d893fc2a02"
    }
    const newLesson = new Lesson(lessonObj);
    newLesson.save((err, lesson) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(lesson);
    })
});
//retrieve all lessons
router.get('/allLessons', (req, res) => {
    console.log("Retrieving all lessons");
    Lesson.find({}).exec((err, lessons) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(lessons);
    })
})
//Get a lesson by ID
router.get('/getlessonbyId/:id', (req, res) => {
    console.log("Retrieving a lesson by Id");
    Lesson.findById(req.params.id).exec((err, lesson) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(lesson);
    })
})
//update a lesson by ID
router.put('/updatelessonbyId/:id', (req, res) => {
    console.log("Updating a lesson");
    const lessonObj = {
        "time": req.body.time,
        "lessonnumber":req.body.lessonnumber
    }
    Lesson.findByIdAndUpdate(req.params.id, lessonObj, {new: true}).exec((err, lesson) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(lesson);
    })
})
//Delete a lesson by ID
router.delete('/deletelessonbyId/:id', (req, res) => {
    console.log("Deleting a lesson");
    Lesson.findByIdAndDelete(req.params.id).exec((err, lesson) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(lesson);
    })
})
module.exports = router;