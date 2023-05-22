import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import "../assets/css/components/GoalSelection.css";
import { UserContext } from "../contexts/UserContext";
import BamBamPic from "../image/Idol/bambam.png";
import JaehyunPic from "../image/Idol/jaehyun.png";
import JenniePic from "../image/Idol/jennie.png";
const GoalSelection = ({ handleToggle }) => {
	const { user } = useContext(UserContext);
	const [ownGoal, setOwnGoal] = useState(0);
	const [goal, setGoal] = useState(0);

	const handleConfirm = () => {
		if (ownGoal === 0) {
			Swal.fire({
				title: "Please Select Your Goal",
				text: "Select a goal to continue",
				icon: "info",
				confirmButtonText: "Back",
			});
		} else if (ownGoal === -1) {
			window.location.href = "/specificgoal";
		} else {
			axios
				.put(`/users/goal-weight-update/${user._id}`, { goal: goal })
				.then((response) => {
					if (response.status === 200) {
						Swal.fire({
							title: "Goal Updated",
							text: "Your goal weight has been updated successfully",
							icon: "success",
							confirmButtonText: "OK",
						}).then(() => {
							window.location.href = "/dashboard";
						});
					} else {
						Swal.fire({
							title: "Error",
							text: "An error occurred while updating the goal weight",
							icon: "error",
							confirmButtonText: "OK",
						});
					}
				})
				.catch((error) => {
					Swal.fire({
						title: "Error",
						text: "An error occurred while updating the goal weight",
						icon: "error",
						confirmButtonText: "OK",
					});
				});
		}
	};

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
						className={`goalCard ${ownGoal === -1 ? "goalCardSelected" : ""}`}
						onClick={() => {
							setOwnGoal(-1);
						}}
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
						onClick={() => {
							setOwnGoal(1);
							setGoal(52);
						}}
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
						onClick={() => {
							setOwnGoal(2);
							setGoal(63);
						}}
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
						onClick={() => {
							setOwnGoal(3);
							setGoal(50);
						}}
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
					// href={ownGoal === 4 ? "/specificgoal" : "/dashboard"} // K'Boom's CODE
					onClick={handleConfirm}
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
