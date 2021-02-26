const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

// All authers Route
router.get('/',async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors =await Author.find(searchOptions)
        res.render('authors/index', {authors: authors, searchOptions: req.query})
    }catch{
        res.redirect('/')
    }
    
    
})

// New author Route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

// Create author ROUTE and save to database
router.post('/',async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect('authors/${newAuthor.id}')
        res.redirect('authors')

    }catch(e){
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })
    }
   
    res.send(req.body.name)
})


module.exports = router