const validate = (input) => {
    let errors = {};
    //input.name && !/^[a-zA-Z]*$/.test(input.name)
    
    if(!input.name) {
        errors.name = "Must be a name"
    } else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
        errors.name = "The name cant contain numbers or special caracters"
    }

    if(input.weight_min < 0 || input.weight_max > 75) {
        if (!/^[0-9]*$/) {
            errors.height = "El peso mínimo debe ser 0 y el máximo debe ser 75"
        }
    }

    if(input.height_min < 0 || input.height_max <= 100) {
        errors.height = "La altura minima debe ser 0 y la máxima debe ser 100"
    }

    // if(input.weight){
    //     if (!/^[0-9]*$/) {
    //         errors.weight = "It must be only numbers"
    //     }
    // }

    if(!input.weight || input.weight <= 0) {
        errors.weight = "The minimum weight must be greater than 0"
    }

    if(!input.life_span || input.life_span <= 0) {
        errors.life_span = "The life span must be greater"
    }

    if(input.life_span){
        if (!/^[0-9]*$/) {
            errors.life_span = "It must be only numbers"
        }
    }

    if (input.image && !/^https?:\/\/\S+$/.test(input.image)) {
        errors.image = "La imagen debe ser una URL válida";
    }

    return errors
}

export default validate;