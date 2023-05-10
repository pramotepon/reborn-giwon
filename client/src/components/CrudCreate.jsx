import React, { useEffect } from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/components/CRUD.css"


const CrudCreate = () => {

    const [name, setName] = useState('')
    const [duration, setDuration] = useState(0)
    const [type, setType] = useState()
    const [date, setDate] = useState()
    const [weight, setWeight] = useState(0)
    const [text, setText] = useState('')

    const saveActivity = (event) => {
        const itemData = {
            name: name,
            duration: duration,
            type: type,
            date: date,
            weight: weight,
            text: text,
        }
    }
    useEffect(()=>{
        console.log(type);
      },[type]);

    return (
        <div className="card-container">
            <div className="card-top">
                <div className="card-left">
                    <div className="add-image">
                    <FontAwesomeIcon className="imageIcon" icon="fa-regular fa-image" style={{color: "#b4bcca",}}/>
                    <FontAwesomeIcon className="plusIcon" icon="fa-solid fa-circle-plus" style={{color: "#b4bcca",}} />
                    </div>
                    <div className="name">
                        <label for="name">Activity Name</label>
                        <input type="text" className="fill" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="duration">
                        <label for="duration">Activity Duration</label>
                        <input type="number" className="fill" min="0" onChange={(e) => setDuration(e.target.value)}/>
                    </div>
                </div>

                <div className="card-right">
                    <div className="type">
                        <label for="type">Activity Type</label>
                        <select name="act-type" id="act-type" onChange ={(e) => setType(e.target.value)}>
                            <option value="Running">Running</option>
                            <option value="Swimming">Swimming</option>
                            <option value="Hiking">Hiking</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                    
                    <div className="date">
                        <label for="date">Date</label>
                        <input type="date" className="fill" onChange={(e) => setDate(e.target.value)} />    
                    </div>
                    <div className="weight">
                        <label for="weight">Current Weight (kg)</label>
                        <input type="number" className="fill" min="0" onChange={(e) => setWeight(e.target.value)} />    
                    </div>
                </div>

            </div>

            <div className="card-description">
                <label for="weight">Describe your journal</label>
                <input type="text" className="fill" onChange={(e) => setText(e.target.value)} />    
            </div>

            <div className="card-buttons">
                <button className="cancel">Cancel</button>
                <button className="add" onClick={saveActivity}>Add</button>
            </div>
        </div>


    )
}

export default CrudCreate