require("dotenv").config();
const axios = require('axios');
const {Dog, Temperament} = require("../db.js");
const { API_KEY } = process.env;

// traigo la info de la api
const getApiAll = async () => {
    let apiData = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
    let apiResults = await apiData.data.map((dog) => {
        // retorno todo lo que necesito
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life: dog.life_span,
            temperament: dog.temperament
        };
    });
    return apiResults;
   }

// traigo todo lo que necesito de mi db
const dogAllDB = async () => {
   
        const apiResults = await getApiAll();
        let dbDogs = await Dog.findAll({
        // me trae todo lo de la db incluya => include    
            include: {
                model: Temperament, 
                attributes: ["name"],
                through: { attributes: [] }
            },
        });


const fromDb = dbDogs.map((dog) => {
     // mapeo la data de la bd y que me devuelva lo que necesito
    return {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height,
            weight: dog.weight,
            life: dog.life,
            temperament: dog.temperament.map(temp =>{return temp.name}).join(', ')
        }
        }) 
        return fromDb;
};

const contDbAndApi = async () => {
    let contApi = await getApiAll();
    let contDb = await dogAllDB();
    let conts = contApi.concat(contDb);
    return conts;
}

const queryXName = async (name) => {
    let newName = name.toLowerCase();
    let breeds = await contDbAndApi();
    let result = breeds.filter((dog) => dog.name.toLowerCase().includes(newName));
  
    if (result.length) {
      return result;
    } else {
      throw new Error("No existe esa raza de perrito");
    }
  };


  const getById = async (id) => {
    if(!isNaN(id)) {
        let result = await axios(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`);
        if (!Object.keys(result.data).length) {
            throw new Error(`El perrito con el id ${id} no existe`);
        }
        return result.data;
    } else{
        let result = await Dog.findByPk(id);
        if(!Object.keys(result).length) {
            throw new Error(`El perrito con el id ${id} no existe`);
        }
        return result;
    }
  };


  const createNewDog = async (
    weight,
    height,
    name,
    life,
    image,
    temperament
  ) => {
      // si alguno de estos datos no existe entonces tirame el error
    if (!weight || !height || !name || !life || !image || !temperament) {
      throw new Error(
        "Falta información, por favor, complete los datos requeridos."
      );
    } else {
      // caso contrario creame el perrito con la data pasada
      let newDog = await Dog.create({
        weight,
        height,
        name,
        life,
        image,
        temperament
      });
      let temp = await Temperament.findAll({
        where: {
          name: temperament,
        },
      });
      await newDog.addTemperament(temp);
      // le agregamos el temperamento al perrito
    }
  };

module.exports = {
    contDbAndApi,
    queryXName,
    getById,
    createNewDog
};