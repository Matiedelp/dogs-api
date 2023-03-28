const axios = require("axios");
const { Temperament } = require("../db");

let tempsfromApi = async () => {
  // me traigo la data de la API
  let datas = await axios("https://api.thedogapi.com/v1/breeds");
  let allTemps = datas.data // a las datas que me traiga de la API, voy a acceder a la data y
    .map((el) => (el.temperament ? el.temperament : "")) // voy a mapearla. Que me devuelva el temp del elemento si existe, caso contrario que me devuelva un string vacío
    .map((el) => el?.split(", ")); // y a los elementos que me traiga, voy a verificar si existen y voy a separarlos con una coma (", ") para que quede ordenadito

  // elimina todas los strings repetidos y los almacena en en arrays
  let temps = [...new Set(allTemps.flat())];

  temps.forEach((el) => {
    if (el) {
      Temperament.bulkCreate({
        // se va a crear donde el nombre sea igual al elemento
        where: {
          name: el,
        },
      });
    }
  });
  temps = await Temperament.findAll({
    // excluyo datos que no me interesan
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
  });
  return temps;
};

module.exports = { tempsfromApi };