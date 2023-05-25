import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import "../assets/css/components/CRUD.css";

const ActivityDetail = (props) => {
	const navigate = useNavigate();
	const [activity, setActivity] = useState({
		activity_name: "",
		activity_type: "",
		calendar: "",
		current_weight: "",
		description: "",
		duration: "",
	});

	let id = props.acitivityId;
	useEffect(() => {
		axios.get(`/activities/${id}`).then((res) => {
			setActivity(res.data);
		});
	}, [id]);

	let image = (
		<>
			<FontAwesomeIcon
				className="imageIcon"
				icon="fa-regular fa-image"
				style={{ color: "#b4bcca" }}
			/>
			<FontAwesomeIcon
				className="plusIcon"
				icon="fa-solid fa-circle-plus"
				style={{ color: "#b4bcca" }}
			/>
		</>
	);
	if (activity.image) {
		image = <img src={activity.image} />;
	}
	return (
		<div className="card-container text-white">
			<Helmet>
				<title>{activity.activity_name}</title>
				<meta name="description" key="description" content={activity.description} />
				<meta name="title" key="title" content={activity.activity_name} />
				<meta property="og:title" key="og:title" content={activity.activity_name} />
				<meta property="og:locale" key="og:locale" content="en_US" />
				<meta charSet="utf-8" />
				<meta property="og:type" key="og:type" content="website" />
				<meta
					property="og:description"
					key="og:description"
					content={activity.description}
				/>
			</Helmet>
			<div className="row p-5">
				{/* Left */}
				<div className="col-6">
					<div className="add-image d-flex justify-content-center col-8">
						{image}
					</div>
					<div className="name">
						<label htmlFor="name">Activity Name</label>
						<p>{activity.activity_name}</p>
					</div>
					<div className="duration">
						<label htmlFor="duration">Activity Duration</label>
						<p>
							{activity.duration.hour +
								" Hours " +
								" : " +
								activity.duration.minute +
								" Minutes"}
						</p>
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
						{/* ISO DATE */}
						<p>
							{new Date(activity.calendar).toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>
					<div className="weight">
						<label htmlFor="weight">Current Weight (kg)</label>
						<p>{activity.current_weight}</p>
					</div>
				</div>

				<div className="duration">
					<label htmlFor="weight">Describe your journal</label>
					<p
						style={{
							fontSize: "22px",
							whiteSpace: "pre-wrap",
							overflowWrap: "break-word",
						}}
					>
						{activity.description}
					</p>
				</div>
			</div>
			<div className="row p-5 ">
				<div className="col-md-12 text-end">
					<button onClick={() => navigate('/dashboard')} className="btn btn-danger">
						Back
					</button>
				</div>
			</div>
		</div>
	);
};
export default ActivityDetail;
