const {Router} = require('express');
const { contDbAndApi,queryXName,getById,createNewDog} = require('../Controllers/dogControllers');

const getRouter = Router();




getRouter.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        if (!name){

            let result = await contDbAndApi();

            return res.status(200).json(result);
        }else{
            let result = await queryXName(name);

            return res.status(200).json(result);
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

getRouter.get("/:idRaza", async (req, res) =>{
    const { idRaza } = req.params;
    try {
        let result = await getById(idRaza);

        return res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


getRouter.post("/",  async (req, res) => {
    let { weight, height, name, life, image, temperament} = req.body;
    try {
        await createNewDog({weight, height, name, life, image, temperament});
        // espera los datos
        res.status(200).send(createNewDog);
        // si todo salió bien 200 OK
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})

module.exports = getRouter;
