const express = require('express');
const db = require('../data/dbConfig')

const router = express.Router();

//Grab all the projects
router.get('/', (req, res) => {
    //get data from database and return it to client
    // select * from posts

    // all db operations return a promise
    db('accounts')
        .then(accounts => {
            console.log(accounts)
            res.status(200).json(accounts)
        })
        .catch(err => { res.json(err) })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    db('accounts')
        .where({ id })
        .first()
        .then(accounts => {
            console.log(accounts)
            res.status(200).json(accounts)
        })
        .catch(err => { res.json(err) })

})

router.post('/', (req, res) => {
    const account = req.body

    if (!account.name || !account.budget) {
        return res.status(400).json({ message: "You need to submit an account with a Name and a Budget" })
    }

    db('accounts').insert(account, 'id')
        .then(([id]) => {
            db('accounts')
                .where({ id })
                .first()
                .then(accounts => {
                    console.log(accounts)
                    res.status(200).json(accounts)
                })
        })
        .catch(err => { res.json(err) })


})

router.put('/:id', (req, res) => {
    const updated = req.body

    db('accounts')
        .where('id', req.params.id)
        .update(updated)
        .then(count => {
            res.status(200).json({ message: `Updated ${count} ID ` })
        })
        .catch(err => {
            res.json(err)
        })
})

router.delete('/:id', (req, res) => {
    db('accounts')
        .where('id', req.params.id)
        .del()
        .then(count => {
            res.status(200).json({ message: `Deleted ${count} ID ` })
        })
        .catch(err => {
            res.json(err)
        })
})



module.exports = router;