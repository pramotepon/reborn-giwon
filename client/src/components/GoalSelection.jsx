import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "../assets/css/components/GoalSelection.css";
import BamBamPic from "../image/Idol/bambam.png";
import JaehyunPic from "../image/Idol/jaehyun.png";
import JenniePic from "../image/Idol/jennie.png";

const GoalSelection = () => {
	const [ownGoal, setOwnGoal] = useState(0);

	return (
		<div className="idol-card-container ">
			<Button variant="link">
				<Card className="idol-card">
					<Card.Body className="cardbody">
						<Card.Title>Or Create Your Own Goal here!</Card.Title>
						<Card.Text>
							<FontAwesomeIcon className="editIcon" icon="fa-plus" />
						</Card.Text>
					</Card.Body>
				</Card>
			</Button>

			<br></br>

			<Button variant="link">
				<Card className="idol-card">
					<div>
						<Card.Img
							variant="top"
							src={BamBamPic}
							className="cardImage img-fluid"
						/>
					</div>
					<Card.Body className="cardbody">
						<Card.Title style={{ fontWeight: "bold" }}>BamBam GOT-7</Card.Title>
						<Card.Text>Weight: 52kg</Card.Text>
					</Card.Body>
				</Card>
			</Button>

			<br></br>

			<Button variant="link">
				<Card className="idol-card">
					<div>
						<Card.Img
							variant="top"
							src={JaehyunPic}
							className="cardImage img-fluid"
						/>
					</div>
					<Card.Body className="cardbody">
						<Card.Title style={{ fontWeight: "bold" }}>Jaehyun NCT</Card.Title>
						<Card.Text>Weight: 60kg</Card.Text>
					</Card.Body>
				</Card>
			</Button>

			<br></br>

			<Button variant="link">
				<Card className="idol-card">
					<div>
						<Card.Img
							variant="top"
							src={JenniePic}
							className="cardImage img-fluid"
						/>
					</div>
					<Card.Body className="cardbody">
						<Card.Title style={{ fontWeight: "bold" }}>
							Jennie Blackpink
						</Card.Title>
						<Card.Text>Weight: 50kg</Card.Text>
					</Card.Body>
				</Card>
			</Button>
		</div>
	);
};

export default GoalSelection;
