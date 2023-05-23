import React from "react";
import LoginLayout from "../layout/LoginLayout/LoginLayout";
import IsLoadingComponent from "../components/IsLoadingComponent";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import "../assets/css/login.css";
import Swal from "sweetalert2";

function ResetPassScreen() {
  const [email, setEmail] = useState();

  const [isEmailValid, setEmailValid] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
    setEmailValid(/\S+@\S+\.\S+/.test(event.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        email
      };

      axios.post('/users/verify-before-reset-password/', formData).then(async (resolve) => {
        // const data = await verifyToken(resolve.data);
        Swal.fire({
					title: "Successfully.",
					text: resolve.data,
					icon: "success",
					confirmButtonText: "Ok!",
				}).then((result) => {
					if (result.isConfirmed) {
						navigate("/login");
					}
				});
      }).catch((reject) => {
        const { message } = reject.response.data;
        Swal.fire({
          title: 'Failed!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Try'
        })
      }).finally(()=>{
        setIsLoading(false)
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleCancel = () => {
    setEmail("");
  };

  return (
    <LoginLayout>
      {isLoading && <IsLoadingComponent />}
      <form action="" className="form-reset" onSubmit={handleSubmit}>
        <div className="reset-text">
          <h2 style={{ fontWeight: "bold" }}>Reset Password</h2>
        </div>
        <div className="reset-text">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder=""
            className="input-regis"
            style={{ fontWeight: "bold" }}
            onChange={handleChangeEmail}
          />
          {!isEmailValid && (
            <div className="position-absolute alert alert-danger translate-middle badge border border-light p-2"
              style={{ left: "-22%", top: "36%", transform: "translate(-50%, -50%)" }}>Email must be valid</div>
          )}
        </div>

        <div className="btn-regis">
          <div>
            <button
              className="btn-save-regis" type="submit"
              style={{ marginRight: "26px", fontWeight: "bold" }}
            // onClick={handleSave}
            >
              Send Email
            </button>
          </div>

          <div>
            <Link to="/login">
              <button
                className="btn-cancel-regis"
                style={{ fontWeight: "bold" }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </LoginLayout>
  );
}

export default ResetPassScreen;
