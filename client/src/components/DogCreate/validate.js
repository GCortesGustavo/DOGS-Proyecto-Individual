const validate = (input) => {
    const nameRegex = new RegExp(/(<([^>]+)>)/)
    const numRegex = new RegExp(/^[0-9]+$/)
    const urlRegex = new RegExp(/^(http|https):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/)
    let errors = {};
    //input.name && !/^[a-zA-Z]*$/.test(input.name)
    
    if(!input.name) {
        errors.name = "Must be a name"
    } else if (nameRegex.test(input.name)) {
        errors.name = "The name cant contain numbers or special caracters"
    } else if(input.name.length > 10) {
        errors.name = "El tamaño máximo son 10 caracteres"
    }

    if(input.weight_min < 0 || input.weight_min > input.weight_max || input.weight_max > 62) {
            errors.height = "El peso mínimo debe ser 0 y el máximo debe ser 62"
    }

    if(input.height_min < 0 || input.height_max <= 100) {
        errors.height = "La altura minima debe ser 0 y la máxima debe ser 100"   
    }


    if(!input.weight || input.weight <= 0) {
        errors.weight = "The minimum weight must be greater than 0"
    }

    if(!input.life_span || input.life_span <= 0 || !numRegex.test(input.life_span)) {
        errors.life_span = "The life span must be greater"
    }

    // if(input.life_span){
    //     if (numRegex) {
    //         errors.life_span = "It must be only numbers"
    //     }
    // }

    if (input.image && !urlRegex.test(input.image)) {
        errors.image = "La imagen debe ser una URL válida";
    }

    return errors
}

export default validate;