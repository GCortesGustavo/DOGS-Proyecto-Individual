const validate = (input) => {
    const nameRegex = new RegExp(/^[a-zA-Z]+$/)
    const numRegex = new RegExp(/^[0-9]+$/)
    const urlRegex = new RegExp(/^(http|https):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/)
    let errors = {};
    
    //CHEADO
    if(!input.name) {
        errors.name = "Must be a name"
    } else if (!nameRegex.test(input.name)) {
        errors.name = "The name cant contain numbers or special caracters"
    } else if(input.name.length > 12) {
        errors.name = "El tamaño máximo son 12 caracteres"
    }

    if(Number(input.weight_min) < 0) {
        errors.weight_min = "El minimo no puede ser 0"
    } else if( input.weight_min > input.weight_max) {
        errors.weight_min = "El minimo no puede ser mayor al maximo"
    } 

    if(Number(input.weight_max) < 0) {
        errors.weight_max = "El maximo no puede ser 0"
    } else if( input.weight_max > 62) {
        errors.weight_max = "El maxino no puede ser mayor a 62"
    }


    if(Number(input.height_min) < 0) {
        errors.height_min = "El minimo no puede ser 0"
    } else if( input.height_min > input.height_max) {
        errors.height_min = "El minimo no puede ser mayor al maximo"
    } 

    if(Number(input.height_max) < 0) {
        errors.height_max = "El maximo no puede ser 0"
    } else if( input.height_max > 100) {
        errors.height_max = "El maxino no puede ser mayor a 100"
    }



    if(!input.life_span || input.life_span <= 0 || !numRegex.test(input.life_span)) {
        errors.life_span = "The life span must be greater"
    }


    if (input.image && !urlRegex.test(input.image)) {
        errors.image = "La imagen debe ser una URL válida";
    }

    return errors
}

export default validate;