import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../src/image/landing_page/logo-lg.png";
import "../assets/css/LandingPage.css";
import { UserContext } from "../contexts/UserContext";
import DevBoom from "../image/DevTeam/Dev_boom.jpg";
import DevLif from "../image/DevTeam/Dev_lif.jpg";
import DevPang from "../image/DevTeam/Dev_pang.jpg";
import DevPlug from "../image/DevTeam/Dev_plug.jpg";
import DevToey from "../image/DevTeam/Dev_toey.jpg";
import DevVee from "../image/DevTeam/Dev_vee.jpg";
import WwwdImage from "../image/landing_page/what_we_do.png";
// import group14 from "../image/landing_page/group1472.png"

const LandingPage = () => {
	const { user, setUser } = useContext(UserContext);
	const [toggleNavbar, setToggleNavbar] = useState(false);
	const nav = useNavigate();
	let navUser;
	let showMenu;
	const logoutHandler = async () => {
		localStorage.removeItem("user");
		setUser(null);
		nav("/");
	};

	const onNavbarToggle = () => {
		setToggleNavbar((current) => !current);
	};

	if (toggleNavbar) {
		showMenu = "show";
	} else {
		showMenu = "";
	}
	if (!user) {
		navUser = (
			<>
				<a
					href="/register"
					className="btn my-nav-btn me-3 my-btn-register"
					style={{ fontWeight: "600" }}
				>
					Register
				</a>
				<a
					href="/login"
					className="btn my-nav-btn my-btn-login"
					style={{ fontWeight: "600" }}
				>
					Login
				</a>
			</>
		);
	} else {
		navUser = (
			<>
				<a href="/dashboard" className="btn me-3 btn-dark">
					{user.displayName}
				</a>
				<button onClick={logoutHandler} className="btn btn-danger">
					Logout
				</button>
			</>
		);
	}

	const scrollChangNavbar = () => {
		//! Put the class name that you want to use
		// Class name that will be added to the navbar element in the "scrolled" state
		const SCROLLED_STATE_CLASS = "my-bg-white";
		//! Use your own ID or selector
		// The id of navigation bar HTML element
		const NAVBAR_ID = "my-nav";
		// Get the navigation bar element
		const navbar = document.getElementById(NAVBAR_ID);
		// OnScroll event handler
		const onScroll = () => {
			// Get scroll value
			const scroll = document.documentElement.scrollTop;
			// If scroll value is more than 0 - means the page is scrolled, add or remove class based on that
			if (scroll > 0) {
				navbar.classList.add(SCROLLED_STATE_CLASS);
			} else {
				navbar.classList.remove(SCROLLED_STATE_CLASS);
			}
		};
		// Use the function
		window.addEventListener("scroll", onScroll);
	};

	const titlePage = () => {
		document.title = "G-Trainee Fitness & Health";
	};

	useEffect(() => {
		scrollChangNavbar();
		titlePage();
	}, []);

	return (
		<div>
			{/* Navbar */}
			<nav
				className="navbar navbar-expand-lg my-nav fixed-top"
				aria-label="Thirteenth navbar example"
				id="my-nav"
			>
				{/* Container fluid */}
				<div className="container-fluid">
					{/* Btn Burger Menu */}
					<button
						className="navbar-toggler ms-auto"
						type="button"
						onClick={onNavbarToggle}
					>
						{/* Burger Menu icon */}
						<span className="navbar-toggler-icon" />
					</button>
					{/* Block Navbar menu */}
					<div
						className={`collapse navbar-collapse d-lg-flex ${showMenu}`}
						id="menuItems"
					>
						{/* Block for grid col-3 */}
						<div className="col-lg-3 me-0" />
						{/* Block for grid col-6 Menu list */}
						<ul
							className="navbar-nav col-lg-6 justify-content-lg-center"
							style={{ fontSize: "1.25rem" }}
						>
							<li className="nav-item">
								<a
									className="nav-link"
									aria-current="page"
									href="#section-heroes"
								>
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#section-review">
									Review
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#section-what-we-do">
									About
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#section-step-by-step">
									How to use?
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#section-dev-team">
									Team
								</a>
							</li>
						</ul>
						{/* Block for grid col-3 End Button */}
						<div className="d-lg-flex col-lg-3 justify-content-lg-end">
							{navUser}
						</div>
						{/* End Block for grid col-3 End Button */}
					</div>
					{/* End Block Navbar menu */}
				</div>
				{/* End Container fluid */}
			</nav>
			{/* End Navbar */}
			{/* Block Main */}
			<main>
				{/* Heroes Section */}
				<article className="section-heroes" id="section-heroes">
					{/* Heroes content */}
					<section className="hero-text container">
						{/* Logo Image */}
						<img src={Logo} alt="g-trainee-logo" />
						{/* Heroes Text */}
						<p className="mt-5 text-hero-section">
							Welcome to our extraordinary activity tracking website, where the
							captivating allure of K-pop idols intertwines with cutting-edge
							technology, empowering you to embark on an awe-inspiring weight
							loss journey.
						</p>
						<Link className="btn btn-success px-5 py-3" to={'/dashboard'}><h3><b>Get Started</b></h3></Link>
					</section>
					{/* End Heroes content */}
				</article>
				{/* End Heroes Section */}
				{/* Reviews Section */}
				<article
					className="section-review container text-light pt-5 pb-5"
					id="section-review"
				>
					{/* Reviews Section Title */}
					<h2
						className="text-center pb-5"
						style={{
							fontWeight: "bold",
							fontSize: "3rem",
							textShadow: "1px 2px 4px rgba(0, 0, 0, 0.7)",
						}}
					>
						Review
					</h2>
					{/* Reviews Section content row */}
					<div className="row">
						{/* Reviews Section content col 4 */}
						<div className="col-md-12 col-lg-4 mt-4">
							{/* Card Content */}
							<div className="card my-bg-secondary">
								{/* image tumnail */}
								<img
									src="https://m.media-amazon.com/images/I/91RJPV9NADL.png"
									className="rounded-circle card-img-top mt-3 mx-auto"
								/>
								{/* Card body */}
								<div className="card-body">
									{/* Card title */}
									<h5
										className="card-title text-center"
										style={{ fontWeight: "bold" }}
									>
										Vladimoew Putin
									</h5>
									{/* Card paragraph */}
									<p
										className="font-weight-400"
										style={{ fontSize: "1.25rem" }}
									>
										Meowwww meow meow good good meow.
									</p>
								</div>
							</div>
							{/* End Card Content */}
						</div>
						{/* End Reviews Section content col 4 */}
						{/* Reviews Section content col 4 */}
						<div className="col-md-6 col-lg-4 mt-4">
							{/* Card Content */}
							<div className="card my-bg-secondary">
								{/* image tumnail */}
								<img
									src="https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg"
									className="rounded-circle card-img-top mt-3 mx-auto"
								/>
								{/* Card body */}
								<div className="card-body">
									{/* Card title */}
									<h5
										className="card-title text-center"
										style={{ fontWeight: "bold" }}
									>
										เจ๊หน่อย
									</h5>
									{/* Card paragraph */}
									<p
										className="font-weight-400"
										style={{ fontSize: "1.25rem" }}
									>
										ไม่เคยใช้แอพไหน แล้วดีเท่านี้เลยค่ะ สานฝันอยากเป็นเจนนี่.
									</p>
								</div>
							</div>
							{/* End Card Content */}
						</div>
						{/* End Reviews Section content col 4 */}
						{/* Reviews Section content col 4 */}
						<div className="col-md-6 col-lg-4 mt-4">
							{/* Card Content */}
							<div className="card my-bg-secondary">
								{/* image tumnail */}
								<img
									src="https://50814aoy.files.wordpress.com/2017/02/1948703.jpg"
									className="rounded-circle card-img-top mt-3 mx-auto"
								/>
								{/* Card body */}
								<div className="card-body">
									{/* Card title */}
									<h5
										className="card-title text-center"
										style={{ fontWeight: "bold" }}
									>
										Kim Jong Un
									</h5>
									{/* Card paragraph */}
									<p
										className="font-weight-100"
										style={{ fontSize: "1.25rem" }}
									>
										체중 데이터 저장에 아주 좋습니다.very good!
									</p>
								</div>
							</div>
							{/* End Card Content */}
						</div>
						{/* End Reviews Section content col 4 */}
					</div>
				</article>
				{/* End Reviews Section */}
				{/* What We do Section */}
				<article
					className="section-what-we-do pt-5 pb-5 container-fluid"
					id="section-what-we-do"
				>
					{/* row */}
					<div className="row text-white">
						{/* col-7 */}
						<div className="col-xl-7 d-none d-xl-block">
							<img
								src={WwwdImage}
								alt="prototype-feature"
								width="80%"
								style={{ marginLeft: "190px", marginBottom: "10px" }}
							/>
						</div>
						{/* end col-7 */}
						{/* col-5 */}
						<div className="col-xl-5 position-relative z-100 p-5 p-xl-3 what-we-do d-flex align-items-center">
							<div>
								{/* Header 2 */}
								<h2
									style={{
										fontWeight: "bold",
										fontSize: "3rem",
										textShadow: "1px 2px 4px rgba(0, 0, 0, 0.7)",
									}}
								>
									What we do?
								</h2>
								{/* paragraph text-header-3 pading-top 5 */}
								<p className="h3 pt-5">
									At G-Trainee, we empower individuals to achieve their weight
									loss goals through personalized and motivating workouts. Our
									platform offers the choice to follow your favorite idols'
									weight goals or set custom targets, inspiring your weight loss
									journey with added passion. Track your progress and see your
									weight loss journal come to life. Join our community, and
									let's create a healthier and happier you together!
								</p>
							</div>
						</div>
						{/* end col-5 */}
					</div>
					{/* end row */}
					<div className="liner-end z-90"></div>
				</article>
				{/* End What We do Section */}
				{/* Step by step section */}
				<article
					className="section-step-by-step pt-5 pb-5 container z-100"
					id="section-step-by-step"
				>
					<h1
						className="text-center text-light mb-5 pb-5"
						style={{
							fontWeight: "bold",
							fontSize: "3rem",
							textShadow: "3px 3px 1px rgba(0, 0, 0, 0.7)",
						}}
					>
						Step by step
					</h1>
					<hr className="mt-5" />
					<div className="step-line-block container mt-5">
						{/* circle block */}
						<div className="step-line-content-block">
							{/* circle */}
							<div>
								{/* Icon */}
								<span>
									<i className="fa-solid fa-user-plus fa-2xl" />
								</span>
							</div>
							{/* text */}
							<p className="text-center" style={{ fontSize: "1.25rem" }}>
								Sign-up
							</p>
						</div>
						{/* circle block */}
						<div className="step-line-content-block">
							{/* circle */}
							<div>
								{/* Icon */}
								<span>
									<i className="fa-sharp fa-solid fa-right-to-bracket fa-2xl" />
								</span>
							</div>
							{/* text */}
							<p className="text-center" style={{ fontSize: "1.25rem" }}>
								Sign-in
							</p>
						</div>
						{/* circle block */}
						<div className="step-line-content-block">
							{/* circle */}
							<div>
								{/* Icon */}
								<span>
									<i className="fa-solid fa-plus fa-xl" />
								</span>
							</div>
							{/* text */}
							<p className="text-center" style={{ fontSize: "1.25rem" }}>
								Create Activity
							</p>
						</div>
						{/* circle block */}
						<div className="step-line-content-block">
							{/* circle */}
							<div>
								{/* Icon */}
								<span>
									<i className="fa-solid fa-check fa-2xl" />
								</span>
							</div>
							{/* text */}
							<p className="text-center" style={{ fontSize: "1.25rem" }}>
								Done
							</p>
						</div>
						{/* circle block */}
						<div className="step-line-content-block">
							{/* circle */}
							<div>
								{/* Icon */}
								<span>
									<i className="fa-solid fa-chart-line fa-2xl" />
								</span>
							</div>
							{/* text */}
							<p className="text-center" style={{ fontSize: "1.25rem" }}>
								History
							</p>
						</div>
					</div>
				</article>
				{/* End Step by step section */}
				{/* add jenniecard by pang*/}
				<article
					className="section-dev-team container text-light pt-5 pb-5 mb-5"
					id="section-dev-team"
				>
					<div className="container">
						{/*add card jennie1*/}
						<h2
							className="text-center pb-5"
							style={{
								fontWeight: "bold",
								fontSize: "3rem",
								textShadow: "1px 2px 4px rgba(0, 0, 0, 0.7)",
							}}
						>
							Developer Team
						</h2>
						<div className="row">
							{/* Reviews Section content col 4 */}
							<div className="col-lg-6 col-xl-4 mt-4">
								{/* Card Content */}
								<div className="card my-bg-secondary h-100">
									{/* image tumnail */}
									<img
										src={DevLif}
										className="rounded-circle card-img-top mt-3 mx-auto"
									/>
									{/* Card body */}
									<div
										className="card-body"
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										{/* Card title */}
										<h5 className="card-title text-center">
											<b>Arlif Tagaree</b>
										</h5>
										<div>
											<a
												href="https://github.com/ArlifTagaree"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
													alt="github"
												/>
											</a>
											<a
												href="https://www.linkedin.com/in/arlif-tagaree/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
													alt="linkedin"
												/>
											</a>
											<a
												href="https://portfolio-arliftagaree.vercel.app/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&logo=About.me&logoColor=orange"
													alt="website"
												/>
											</a>
										</div>
									</div>
								</div>
								{/* End Card Content */}
							</div>
							{/*add card jennie2*/}
							{/* Reviews Section content col 4 */}
							<div className="col-lg-6 col-xl-4 mt-4">
								{/* Card Content */}
								<div className="card my-bg-secondary h-100">
									{/* image tumnail */}
									<img
										src={DevToey}
										className="rounded-circle card-img-top mt-3 mx-auto"
									/>
									{/* Card body */}
									<div
										className="card-body"
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										{/* Card title */}
										<h5 className="card-title text-center">
											<b>Cheewathun Lerttanapit</b>
										</h5>
										<div>
											<a
												href="https://github.com/doctoey"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
													alt="github"
												/>
											</a>
											<a
												href="https://www.linkedin.com/in/cheewathun/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
													alt="linkedin"
												/>
											</a>
											<a
												href="https://cheewathun.vercel.app/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&logo=About.me&logoColor=orange"
													alt="website"
												/>
											</a>
										</div>
									</div>
								</div>
								{/* End Card Content */}
							</div>
							{/*add card jennie3*/}
							{/* Reviews Section content col 4 */}
							<div className="col-lg-6 col-xl-4 mt-4">
								{/* Card Content */}
								<div className="card my-bg-secondary h-100">
									{/* image tumnail */}
									<img
										src={DevVee}
										className="rounded-circle card-img-top mt-3 mx-auto"
									/>
									{/* Card body */}
									<div
										className="card-body"
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										{/* Card title */}
										<h5 className="card-title text-center">
											<b>Pongpeera Ratana-arporn</b>
										</h5>
										<div>
											<a
												href="https://github.com/ppongpeera"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
													alt="github"
												/>
											</a>
											<a
												href="https://www.linkedin.com/in/pongpeera/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
													alt="linkedin"
												/>
											</a>
											<a
												href="https://pongpeera-myport.vercel.app/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&logo=About.me&logoColor=orange"
													alt="website"
												/>
											</a>
										</div>
									</div>
								</div>
								{/* End Card Content */}
							</div>
							{/* Reviews Section content col 4 */}
							<div className="col-lg-6 col-xl-4 mt-4">
								{/* Card Content */}
								<div className="card my-bg-secondary h-100">
									{/* image tumnail */}
									<img
										src={DevPlug}
										className="rounded-circle card-img-top mt-3 mx-auto"
									/>
									{/* Card body */}
									<div
										className="card-body"
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										{/* Card title */}
										<h5 className="card-title text-center">
											<b>Pramote Phan-on</b>
										</h5>
										<div>
											<a
												href="https://github.com/pramotepon"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
													alt="github"
												/>
											</a>
											<a
												href="https://www.linkedin.com/in/pramotephanon/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
													alt="linkedin"
												/>
											</a>
											<a
												href="https://pramote-dev.vercel.app/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&logo=About.me&logoColor=orange"
													alt="website"
												/>
											</a>
										</div>
									</div>
								</div>
								{/* End Card Content */}
							</div>
							{/* Reviews Section content col 4 */}
							<div className="col-lg-6 col-xl-4 mt-4">
								{/* Card Content */}
								<div className="card my-bg-secondary h-100">
									{/* image tumnail */}
									<img
										src={DevPang}
										className="rounded-circle card-img-top mt-3 mx-auto"
									/>
									{/* Card body */}
									<div
										className="card-body"
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										{/* Card title */}
										<h5 className="card-title text-center">
											<b>Sasiwan Janma</b>
										</h5>
										<div>
											<a
												href="https://github.com/SasiwanJ"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
													alt="github"
												/>
											</a>
											<a
												href="https://www.linkedin.com/in/sasiwan-janma/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
													alt="linkedin"
												/>
											</a>
											<a
												href="https://pangportfolio.vercel.app/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&logo=About.me&logoColor=orange"
													alt="website"
												/>
											</a>
										</div>
									</div>
								</div>
								{/* End Card Content */}
							</div>
							{/* Reviews Section content col 4 */}
							<div className="col-lg-6 col-xl-4 mt-4">
								{/* Card Content */}
								<div className="card my-bg-secondary h-100">
									{/* image tumnail */}
									<img
										src={DevBoom}
										className="rounded-circle card-img-top mt-3 mx-auto"
									/>
									{/* Card body */}
									<div
										className="card-body"
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										{/* Card title */}
										<h5 className="card-title text-center">
											<b>Thatpong Paleekan</b>
										</h5>
										<div>
											<a
												href="https://github.com/BoomNooB"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
													alt="github"
												/>
											</a>
											<a
												href="https://www.linkedin.com/in/thatpong/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
													alt="linkedin"
												/>
											</a>
											<a
												href="https://thatpong.com/"
												target="_blank"
												style={{ paddingRight: "15px" }}
											>
												<img
													src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&logo=About.me&logoColor=orange"
													alt="website"
												/>
											</a>
										</div>
									</div>
								</div>
								{/* End Card Content */}
							</div>
						</div>
					</div>
				</article>
				{/* End jenniecard by pang*/}
				{/* Copy right */}
				<p className="text-center text-light bg-black mb-0 py-3">
					Copyright &copy; 2023 G-won Developer team.
				</p>
				{/* End copy right */}
			</main>
			{/* End Block Main */}
			{/* Footer */}
			<footer />
		</div>
	);
};

export default LandingPage;
