const validate = (input) => {
    let errors = {};
    if(!input.name) {
        errors.name = "Must be a name"
    }

    if(input.name && !/^[a-zA-Z]*$/.test(input.name)) {
        errors.name = "The name cant contain numbers or special caracters"
    }

    if(input.height) {
        if (!/^[0-9]*$/) {
            errors.height = "It must be only numbers"
        }
    }

    if(!input.height || input.height <= 0) {
        errors.height = "The minimum height must be greater than 0"
    }

    if(input.weight){
        if (!/^[0-9]*$/) {
            errors.weight = "It must be only numbers"
        }
    }

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

    return errors
}

export default validate;