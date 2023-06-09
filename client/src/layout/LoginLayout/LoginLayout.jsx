import React, { useContext } from "react";
import "./LoginLayout.css";
import imagecard from "../../image/imagecard.jpg"
import logo from "../../image/logo.png"
import { Link } from "react-router-dom";

function LoginLayout({ children }) {
	const img = {
		logo: "../src/image/logo.png",
		imagecard: "../src/image/imagecard.jpg",
	};

	return (
		<div className="App">
			<div className="login-container">
				<div className="login-card">
					<div className="login-card-pic">
						<img className="logo" src={imagecard} />
					</div>
					<section className="login-right position-relative">
						<div className="login-card-text">
							<div
								className="logo-top"
								style={{ display: "flex", flexDirection: "column" }}
							>
								<Link to={'/'} className="text-center"><img className="logo" src={logo} /></Link>
								{children}
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
		// <div className="block-center-h-v">
		//   <div className="card-auth">
		//     <div className="row">
		//       <div className="col-7">
		//         <img src={img.imagecard} width="100%" height="100%" />
		//       </div>
		//       <div className="col-5 p-3 pe-5">
		//         <div className="text-center">
		//           <img src={img.logo} width="252px" />
		//         </div>
		//         {children}
		//       </div>
		//     </div>
		//   </div>
		// </div>
	);
}

export default LoginLayout;
