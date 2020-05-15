const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const Subject = require('./models/Subject.js');
const Category = require('./models/Category.js');
const Tutor = require('./models/Tutor.js');
const Registersubject = require('./models/Registersubject.js');
const Lesson = require('./models/Lesson.js');

mongoose.connect("mongodb+srv://angels21:squeeze21@cluster0-nptxo.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }
  )
  .then(result => {
    console.log("Database connected");
  })
  .catch(err => console.log(err)
  );



app.get('/', (req, res) => {
res.send("Home Page")
});
//to add a category   
app.post('/addCategory', (req, res) => {
    console.log("Adding new category");
    const categoryObj = {
        "_id": new mongoose.Types.ObjectId(),
        "category": req.body.category
    } 
    const newCategory = new Category(categoryObj);
    newCategory.save((err, category) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(category);
    })
});
//to add a subject to JSS category
app.post('/addJSSSubject', (req, res) => {
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
app.post('/addSSSSubject', (req, res) => {
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
app.post('/addPRIMARYSubject', (req, res) => {
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
app.get('/subjects', (req, res) => {
    console.log("Retrieving all subjects");
    Subject.find({}).populate("category").exec((err, subjects) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(subjects);
    })
})
//To retrieve all categories
app.get('/categories', (req, res) => {
    console.log("Retrieving all categories");
    Category.find({}).exec((err, categories) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(categories);
    })
})
//To update a subject by ID
app.put('/updatesubjectbyId/:id', (req, res) => {
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
app.delete('/deletesubjectbyId/:id', (req, res) => {
    console.log("Deleting subject");
    Subject.findByIdAndDelete(req.params.id).exec((err, subject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(subject);
    })
})
//To update a category by ID
app.put('/updatecategorybyId/:id', (req, res) => {
    console.log("Updating a category");
    const categoryObj = {
        "category": req.body.category,
        "description": req.body.description
    }
    Category.findByIdAndUpdate(req.params.id, categoryObj, {new: true}).exec((err, category) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(category);
    })
})
//Delete a category by ID
app.delete('/deletecategorybyId/:id', (req, res) => {
    console.log("Deleting category");
    Category.findByIdAndDelete(req.params.id).exec((err, category) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(category);
    })
})

//Tutor Register   
app.post('/addTutor', (req, res) => {
    console.log("Adding new Tutor");
    const TutorObj = {
        "_id": new mongoose.Types.ObjectId(),
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "password": req.body.password,
        "isAdmin": req.body.isAdmin,
        "gender": req.body.gender,
        "role": req.body.role
        
    } 
    const newTutor = new Tutor(TutorObj);
    newTutor.save((err, tutor) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(tutor);
    })
});
//to add a JSS subject to a tutor
app.post('/addtutortoJSSSubject', (req, res) => {
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
app.post('/addtutortoSSSSubject', (req, res) => {
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
app.post('/addtutortoPRIMARYSubject', (req, res) => {
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
app.get('/registeredsubjects/:id', (req, res) => {
    console.log("Retrieving all subjects for a tutor");
    Registersubject.find(req.params.tutor_id).populate("tutor").exec((err, registersubjects) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(registersubjects);
    })
})

//To update a registered subject by ID
app.put('/updateregisteredsubjectbyId/:id', (req, res) => {
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
app.delete('/deleteregisteredsubjectbyId/:id', (req, res) => {
    console.log("Deleting registered subject");
    Registersubject.findByIdAndDelete(req.params.id).exec((err, registersubject) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(registersubject);
    })
})
//Retrieve all tutors
app.get('/tutors', (req, res) => {
    console.log("Retrieving all tutors");
    Tutor.find({}).exec((err, tutors) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(tutors);
    })
})
//Get a tutor by ID
app.get('/gettutorbyId/:id', (req, res) => {
    console.log("Retrieving a tutor by Id");
    Tutor.findById(req.params.id).exec((err, tutor) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(tutor);
    })
})

//Deactivate tutor by Id
app.delete('/deletetutorbyId/:id', (req, res) => {
    console.log("Deleting tutor");
    Tutor.findByIdAndDelete(req.params.id).exec((err, tutor) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(tutor);
    })
})
//add a lesson
app.post('/addLesson', (req, res) => {
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
app.get('/allLessons', (req, res) => {
    console.log("Retrieving all lessons");
    Lesson.find({}).exec((err, lessons) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(lessons);
    })
})
//Get a lesson by ID
app.get('/getlessonbyId/:id', (req, res) => {
    console.log("Retrieving a lesson by Id");
    Lesson.findById(req.params.id).exec((err, lesson) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(lesson);
    })
})
//update a lesson by ID
app.put('/updatelessonbyId/:id', (req, res) => {
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
app.delete('/deletelessonbyId/:id', (req, res) => {
    console.log("Deleting a lesson");
    Lesson.findByIdAndDelete(req.params.id).exec((err, lesson) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(lesson);
    })
})

app.listen(3000, () => console.log('Server running'));

