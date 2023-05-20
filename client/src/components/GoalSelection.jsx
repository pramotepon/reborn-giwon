import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "../assets/css/components/GoalSelection.css";
import BamBamPic from "../image/Idol/bambam.png";
import JaehyunPic from "../image/Idol/jaehyun.png";
import JenniePic from "../image/Idol/jennie.png";

const GoalSelection = ({ handleToggle }) => {
	const [ownGoal, setOwnGoal] = useState(0);

	return (
		<div className="goalSelection">
			<Row className="justify-content-center">
				<Col className="col-6">
					<h1
						className="text-center rounded p-4 m-3"
						style={{
							color: "black",
							backgroundColor: "#85B9C9",
							border: "2px solid #02FEFE",
						}}
					>
						<strong>Choose your goal</strong>
					</h1>
				</Col>
			</Row>

			<Row className="justify-content-center" onClick={handleToggle}>
				<Col className="col-4 m-3">
					<Card
						className={`goalCard ${ownGoal === 4 ? "goalCardSelected" : ""}`}
						onClick={() => setOwnGoal(4)}
					>
						<div className="d-flex justify-content-center">
							<Card.Body>
								<Card.Title className="text-center">
									<strong>Specific Goal</strong>
								</Card.Title>
								<Card.Text className="text-center">
									You can set your own goal Here!
									<br />
									<FontAwesomeIcon icon="fa-plus-circle" size="2x" />
								</Card.Text>
							</Card.Body>
						</div>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col>
					<Card
						className={`goalCard ${ownGoal === 1 ? "goalCardSelected" : ""}`}
						onClick={() => setOwnGoal(1)}
					>
						<Card.Img variant="top" src={BamBamPic} className="mx-auto" />
						<Card.Body>
							<div className="text-center">
								<Card.Title>
									<strong>BamBam</strong>
								</Card.Title>
								<Card.Text>
									Weight: 52 kg
									<br></br>
									Height: 170 cm
								</Card.Text>
							</div>
						</Card.Body>
					</Card>
				</Col>

				<Col>
					<Card
						className={`goalCard ${ownGoal === 2 ? "goalCardSelected" : ""}`}
						onClick={() => setOwnGoal(2)}
					>
						<Card.Img variant="top" src={JaehyunPic} className="mx-auto" />
						<Card.Body>
							<div className="text-center">
								<Card.Title>
									<strong>Jaehyun</strong>
								</Card.Title>
								<Card.Text>
									Weight: 63 kg
									<br></br>
									Height: 180 cm
								</Card.Text>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card
						className={`goalCard ${ownGoal === 3 ? "goalCardSelected" : ""}`}
						onClick={() => setOwnGoal(3)}
					>
						<Card.Img variant="top" src={JenniePic} className="mx-auto" />
						<Card.Body>
							<div className="text-center">
								<Card.Title>
									<strong>Jennie</strong>
								</Card.Title>
								<Card.Text>
									Weight: 50 kg
									<br></br>
									Height: 163 cm
								</Card.Text>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<br></br>
			<div className="d-grid gap-2">
				<Button
					variant="success"
					href={ownGoal === 4 ? "/specificgoal" : "/dashboard"}
					className="btn btn-lg"
					type="button"
				>
					<FontAwesomeIcon icon="fa-regular fa-check-square" /> Confirm
				</Button>
			</div>
		</div>
	);
};

export default GoalSelection;
