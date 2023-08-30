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
    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: 0,
        image: "",
        temperament: []
    })

    
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
        dispatch(postDog(doggy));
        alert("The dow was created")
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
            <h1 className={Styles.title}>CREATE DOG</h1>
            <div>
                <Link to="/home">
                    <button className={Styles.create}>HOME</button>
                </Link>
            </div>
            <div>
                <form onSubmit={handleSubmit} className={Styles.containerForm}>
                    <div>
                        <h3 className={Styles.containerH3}>Name:</h3>
                        <input 
                            name="name"
                            key="1"
                            required 
                            type="text" 
                            value={input.name} 
                            onChange={handleChange} 
                            placeholder="Type a name of dog"/>
                        <h2>{errors.name && (<p className={Styles.errors}>{errors.name}</p>)}</h2>
                    </div>
                    <div>
                        <h3 className={Styles.containerH3}>Height min:</h3>
                        <input required 
                        key="2"
                        name="height_min"
                        min="0" 
                        type="number" 
                        value={input.height_min} 
                        onChange={handleChange}/>
                        <h2>{errors.height_min && (<p className={Styles.errors}>{errors.height_min}</p>)}</h2>
                        <h3 className={Styles.containerH3}>Height Max:</h3>
                        <input required 
                        key="3"
                        name="height_max"
                        min="0" 
                        type="number" 
                        value={input.height_max} 
                        onChange={handleChange}/>
                        <h2>{errors.height_max && (<p className={Styles.errors}>{errors.height_max}</p>)}</h2>
                    </div>
                    <div>
                        <h3 className={Styles.containerH3}>Weight Min:</h3>
                        <input 
                        key="4"
                        required 
                        name="weight_min"
                        min="0" 
                        type="number" 
                        value={input.weight_min} 
                        onChange={handleChange}/>
                        <h2>{errors.weight_min && (<p className={Styles.errors}>{errors.weight_min}</p>)}</h2>
                        <h3 className={Styles.containerH3}>Weight Max:</h3>
                        <input 
                        key="5"
                        required 
                        name="weight_max"
                        min="0" 
                        type="number" 
                        value={input.weight_max} 
                        onChange={handleChange}/>
                        <h2>{errors.weight_max && (<p className={Styles.errors}>{errors.weight_max}</p>)}</h2>
                    </div>
                    <div>
                        <h3 className={Styles.containerH3}>Life Span:</h3>
                        <input required 
                        key="6"
                        name="life_span"
                        min="0" 
                        type="number" 
                        value={input.life_span} 
                        onChange={handleChange}/>
                        <h2>{errors.life_span && (<p className={Styles.errors}>{errors.life_span}</p>)}</h2>
                    </div>
                    <div>
                        <h3 className={Styles.containerH3}>Image:</h3>
                        <input  
                        key="7"
                        name="image" 
                        type="url" 
                        value={input.image} 
                        onChange={handleChange}/>
                    </div>
                    <div></div>
                    <div>
                        <h3 className={Styles.containerH3}>TEMPERAMENTS</h3>
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
                        <h2>{errors.temperament && (<p className={Styles.errors}>{errors.temperament}</p>)}</h2>
                    </div>
                    {
                        (errors.length <= 1)
                        ?
                        <div className={Styles.errors}>The dog cant be Created Yed</div>
                        :
                        <button type="submit" className={Styles.button}> Create</button>
                    }
                </form>
                    <div className={Styles.temperaments}>
                        {input.temperament.map((d, i) => {
                            return (
                                <div key={i++} >
                                    <div className={Styles.temperamentsButton}>
                                        {d}
                                    </div>
                                    <button onClick={() => handleErase(d)} className={Styles.button}>X</button>
                                </div>
                            )
                        })}
                    </div>
            </div>
            </div>
        </div>
    )
}

export default DogCreate;