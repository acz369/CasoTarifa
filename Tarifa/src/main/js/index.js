const express = require('express');
const app = express();
const morgan = require('morgan');


//settings
app.set('port', 3000)
app.set('json spaces', 2)

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//routes
app.use('/api/clients',require('../routes/clients'))
app.use('/api/products',require('../routes/products'))


//Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})