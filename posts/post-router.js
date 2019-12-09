const express = require('express');

// database access using knex
//knex documentation has db listed as knex
const knex = require('../data/db-config.js');

const router = express.Router();

// return a list of posts from the database
router.get('/', (req, res) => {
    //select * from posts
    knex.select('*')
        .from('posts')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error getting the posts" })
        })
});

router.get('/:id', (req, res) => {
    // select * from posts where id = req.params.id
    knex.select('*')
        .from('posts')
        .where({ id: req.params.id })
        .first() //equivalent to posts[0]
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error getting the post" })
        })
});

router.post('/', (req, res) => {
    //make sure to validate
    const postData = req.body;
    knex('posts')
        .insert(postData, "id")
        .then(ids => {
            //returns an array of one element, the id of the last record inserted
            const id = ids[0];
            res.status(200).json(id);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error getting the post" })
        })
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;