const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const students = require('./routes/students');
const users = require('./routes/users');
const subjects = require('./routes/subjects');
const categories = require('./routes/categories');
const tutors = require('./routes/tutors');
const registersubjects = require('./routes/registersubjects');
const lessons = require('./routes/lessons');

app.use('/tutorregister', tutors);
app.use('/studentregister', students);
app.use('/userslogin', users);
app.use('/addcategory', categories);
app.use('/addsubjectstocat', subjects);
app.use('/tutregsubject', registersubjects);
app.use('/addlessontoregsubject', lessons);

app.use(require('./routes/tutors'));
app.use(require('./routes/students'));
app.use(require('./routes/users'));
app.use(require('./routes/categories'));
app.use(require('./routes/subjects'));
app.use(require('./routes/registersubjects'));
app.use(require('./routes/lessons'));

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

app.listen(3000, () => console.log('Server running'));

