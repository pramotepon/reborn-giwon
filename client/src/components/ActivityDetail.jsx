import React, { useEffect } from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/components/CRUD.css"

const ActivityDetail = () => {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(0)
  const [type, setType] = useState()
  const [date, setDate] = useState()
  const [weight, setWeight] = useState(0)
  const [text, setText] = useState('')

  return (
    <div className="card-container text-white">
      <div className="row p-5">
        {/* Left */}
        <div className="col-6">
          <div className="add-image">
            <FontAwesomeIcon className="imageIcon" icon="fa-regular fa-image" style={{ color: "#b4bcca", }} />
            <FontAwesomeIcon className="plusIcon" icon="fa-solid fa-circle-plus" style={{ color: "#b4bcca", }} />
          </div>
          <div className="name">
            <label htmlFor="name">Activity Name</label>
            <p>name</p>
          </div>
          <div className="duration">
            <label htmlFor="duration">Activity Duration</label>
            <p>Duration</p>
          </div>
        </div>
        {/* Right */}
        <div className="col-6">
          <div className="type">
            <label htmlFor="type">Activity Type</label>
            <p>Type</p>
          </div>

          <div className="date">
            <label htmlFor="date">Date</label>
            <p>Date</p>
          </div>
          <div className="weight">
            <label htmlFor="weight">Current Weight (kg)</label>
            <p>Date (kg)</p>
          </div>
        </div>

        <div className='duration'>
          <label htmlFor="weight">Describe your journal</label>
          <p>Describe your journal</p>
        </div>

      </div>
    </div>
  )
};
export default ActivityDetail;
