import React from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import validate from "./validate";
import { postDog, getAllTemperament } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./DogCreate.module.css"

const DogCreate = () => {
    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})
    const [ dogTemperament , setDogTemperaments] = useState({temperament : ""})
    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: 0,
        image: "",
        temperament: []
    })

    // const handleTemperament = (event) => {
    //     event.preventDefault();
    //     setDogTemperaments(prevState => {
    //         return { ...prevState, [event.target.name]: event.target.value }
    //     });
    // }
    
    const handleSelect = (event) => {
        const selectedValue = event.target.value
        if(!input.temperament.includes(selectedValue)){
            setInput({
                ...input,
                temperament: [...input.temperament, selectedValue]
            })
        }
    }

    
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
        const inputCopy = {...input,[event.target.name] : event.target.value}
        const validation = validate(inputCopy);
        setErrors(validation)
        
    };

    
    
    
    const handleSubmit = (event) => {
        const formData = new FormData(event.target)
        event.preventDefault();
        const dog = Object.fromEntries(formData.entries());
        const validationErrors = validate(input);
        setErrors(validationErrors);
        if(Object.keys(validationErrors) === 0) {
            alert("The dow was created")
            setInput({
            name: dog.name,
            height: `${dog.height} - ${dog.height}`,
            weight: `${dog.weight} - ${dog.weight}`,
            life_span: dog.life_span,
            image: dog.image,
            temperament: [dog.temperament]
            });
            
            window.location.href = "/home";
        }
        const doggy = {
            name: dog.name,
            height: `${dog.height_min} - ${dog.height_max}`,    
            weight: `${dog.weight_min} - ${dog.weight_max}`,
            life_span: dog.life_span,
            image: dog.image,
            temperament: input.temperament

        }
        console.log(doggy);
        console.log(doggy.temperament);
        dispatch(postDog(doggy));
    }

    

    

    const handleErase = (dog) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(tem => tem !== dog)
        })
    }

    useEffect(() => {
        dispatch(getAllTemperament())
    }, [dispatch])
    

    return (
        <div className={Styles.background}>
            <div className={Styles.container}>
            <h1>CREATE DOG</h1>
            <div>
                <Link to="/home">
                    <button>HOME</button>
                </Link>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Name:</h3>
                        <input 
                            name="name"
                            key="1"
                            required 
                            type="text" 
                            value={input.name} 
                            onChange={handleChange} 
                            placeholder="Type a name of dog"/>
                    </div>
                    <div>
                        <h3>Height min:</h3>
                        <input required 
                        key="2"
                        name="height_min"
                        min="0" 
                        type="number" 
                        value={input.height_min} 
                        onChange={handleChange}/>
                        
                        <h3>Height Max:</h3>
                        <input required 
                        key="3"
                        name="height_max"
                        min="0" 
                        type="number" 
                        value={input.height_max} 
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <h3>Weight Min:</h3>
                        <input 
                        key="4"
                        required 
                        name="weight_min"
                        min="0" 
                        type="number" 
                        value={input.weight_min} 
                        onChange={handleChange}/>

                        <h3>Weight Max:</h3>
                        <input 
                        key="5"
                        required 
                        name="weight_max"
                        min="0" 
                        type="number" 
                        value={input.weight_max} 
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <h3>Life Span:</h3>
                        <input required 
                        key="6"
                        name="life_span"
                        min="0" 
                        type="number" 
                        value={input.life_span} 
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <h3>Image:</h3>
                        <input  
                        key="7"
                        name="image" 
                        type="url" 
                        value={input.image} 
                        onChange={handleChange}/>
                    </div>
                    <div></div>
                    <div>
                        <h3>TEMPERAMENTS</h3>
                        <select onChange={handleSelect}>
                            <option value="all" disabled key="temp" >
                                Temperaments
                            </option>
                            {
                            allTemperaments.map((t) => {
                            return (
                                <option value={t.name} key={t.id}>{t.name}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    {
                        (errors.length < 1)
                        ?
                        <div>The dog cant be Created Yed</div>
                        :
                        <button type="submit"> Create</button>
                    }
                </form>
                    <div>
                        {input.temperament.map((d, i) => {
                            return (
                                <div key={i++}>
                                    <div>
                                        {d}
                                    </div>
                                    <button onClick={() => handleErase(d)}>X</button>
                                </div>
                            )
                        })}
                    </div>


                    <div>
                        <h2>ERRORS:</h2>
                    </div>
                    <div className={Styles.container}>
                        <h2>{errors.name && (<p>{errors.name}</p>)}</h2>
                        <h2>{errors.height_min && (<p>{errors.height_min}</p>)}</h2>
                        <h2>{errors.height_max && (<p>{errors.height_max}</p>)}</h2>
                        <h2>{errors.weight_min && (<p>{errors.weight_min}</p>)}</h2>
                        <h2>{errors.weight_max && (<p>{errors.weight_max}</p>)}</h2>
                        <h2>{errors.life_span && (<p>{errors.life_span}</p>)}</h2>
                        <h2>{errors.temperament && (<p>{errors.temperament}</p>)}</h2>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default DogCreate;