const {Router} = require('express')
const router = Router()

const clients = require('../clients.json')

//routes
router.get('/', (req, res) => {
    res.json(clients)
})

module.exports = router;