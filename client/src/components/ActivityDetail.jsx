import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/components/CRUD.css"
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ActivityDetail = (props) => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState({
    activity_name: "",
    activity_type: "",
    calendar: "",
    current_weight: "",
    description: "",
    duration: ""

  })

  let id = props.acitivityId
  useEffect(() => {
    axios.get(`/activities/${id}`)
		.then(res => {
			setActivity(res.data)
		})
  }, [id]);
	
  let image = <>
    <FontAwesomeIcon className="imageIcon" icon="fa-regular fa-image" style={{ color: "#b4bcca", }} />
    <FontAwesomeIcon className="plusIcon" icon="fa-solid fa-circle-plus" style={{ color: "#b4bcca", }} />
  </>
  if (activity.image) {
    image = <img src={activity.image}/>


  }
  return (
    <div className="card-container text-white">
      <div className="row p-5">
        {/* Left */}
        <div className="col-6">
          <div className="add-image">
            {image}
          </div>
          <div className="name">
            <label htmlFor="name">Activity Name</label>
            <p>{activity.activity_name}</p>
          </div>
          <div className="duration">
            <label htmlFor="duration">Activity Duration</label>
            <p>{activity.duration.hour+ "H " +activity.duration.minute + "M"}</p>
          </div>
        </div>
        {/* Right */}
        <div className="col-6">
          <div className="type">
            <label htmlFor="type">Activity Type</label>
            <p>{activity.activity_type}</p>
          </div>

          <div className="date">
            <label htmlFor="date">Date</label>
            <p>{activity.calendar}</p>
          </div>
          <div className="weight">
            <label htmlFor="weight">Current Weight (kg)</label>
            <p>{activity.current_weight}</p>
          </div>
        </div>

				<div className="duration">
					<label htmlFor="weight">Describe your journal</label>
					<p>{activity.description}</p>
				</div>
			</div>
      <div className="row p-5 ">
        <div class="col-md-12 text-end">
          <button onClick={() => navigate(-1)} class="btn btn-danger">Back</button>	
        </div>
      </div>
		</div>
	);
};
export default ActivityDetail;
