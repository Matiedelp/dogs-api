import React from "react";
import {Link} from 'react-router-dom'; 



function validation (input){
    let errors = {};
    if (!input.name){
      errors.name = "Breed is required"
   } else if (!input.height) {
    errors.height = "Height is required"
    if(input.height < 20 || input.height > 25) {
      errors.height = 'The height must be between "20 cm" and "70 cm"'; 
     }
    } else if (!input.weight){
      errors.weight ="Weight is required"
      if(input.weight < 1 || input.weight > 82)
      errors.weight ='The weigth must be between "1 kg" and "82 kg"'
    } else if (!input.age) {
       errors.age = 'Age is required'
       if(input.age == 0 || input.age > 20  ) 
        errors.age = 'Age should be bigger than 0 and lower than 20 year'
    } else if (!input.image){
      errors.image = 'Image is required'
    } else if (!input.temperaments){
      errors.temperaments = 'Must select at least one temperament'
    }
    return errors
  }

  export default function Creator() {

    return (
         <div >
          
         </div>
    );
  }
