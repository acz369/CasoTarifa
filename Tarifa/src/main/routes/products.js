const {Router} = require('express')
const router = Router()

const products = require('../products.json');

//routes
router.get('/', (req, res) => {
    res.json(products);
})

module.exports = router;