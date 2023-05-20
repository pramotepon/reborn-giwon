import React from "react";
import "../assets/css/components/ActivityCard.css";

const ActivityCard = (props) => {
  return (
    <div
      className="container my-bg-blue rounded pt-3 pb-3 mb-3"
      style={{ position: "relative" }}
    >
      <div className="row">
      <div className="col-sm-4 d-flex align-items-center justify-content-center">
          <div className="fixed-size-image-container">
            <img className="img-fluid" src={props.activity.image} alt="" />
          </div>
        </div>
        <div className="col-sm-8 boxcard">
          <h2>
            <a href="/activitydetail" className="text-decoration-none text-dark link-primary"><strong>{props.activity.title}</strong></a>
          </h2>
          <div className="my-top-right-button">
            <button className="btn p-0" style={{marginRight :  "10px"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
            <button className="btn p-0" style={{ margin: "10px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "red" }} width="32" height="32" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
            </button>
          </div>

          <div className="toeyja">
          <div>
          <p style={{fontSize:"52px"}}>{props.activity.activity_name}</p>
          <p style={{fontSize:"22px"}}>Description :{props.activity.description}</p>
          <p style={{fontSize:"28px"}}>Duration {props.activity.duration.hour} hour : {props.activity.duration.minute} minute</p>
          </div>
          <div className="toeykung">
          <p style={{fontSize:"160px", margin:"0"}}>{props.activity.current_weight}</p><p style={{fontSize:"32px"}}>Kg.</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
