const mongoose = require('mongoose');
const router = require('express').Router();
const Category = require('../models/Category');

//to add a category   
router.post('/addCategory', (req, res) => {
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

//To retrieve all categories
router.get('/categories', (req, res) => {
    console.log("Retrieving all categories");
    Category.find({}).exec((err, categories) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(categories);
    })
})
//To update a category by ID
router.put('/updatecategorybyId/:id', (req, res) => {
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
router.delete('/deletecategorybyId/:id', (req, res) => {
    console.log("Deleting category");
    Category.findByIdAndDelete(req.params.id).exec((err, category) =>{
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(category);
    })
})

module.exports = router;