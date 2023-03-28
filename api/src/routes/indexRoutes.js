const {Router} = require('express');
const getRouter = require('./getRouter');
const getAllTemp = require('./getTemparament');


const mainRouter = Router();


mainRouter.use('/dogs', getRouter)
mainRouter.use('/temperaments', getAllTemp)





module.exports = mainRouter;