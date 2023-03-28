const {Router} = require('express');
const {tempsfromApi}= require ("../Controllers/controllerTemp")

const getAllTemp = Router();

getAllTemp.get("/", async (req, res)=>{
    try {
        let result = await tempsfromApi()
        
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})


module.exports = getAllTemp;