import React, { useEffect } from 'react'
import '../assets/css/LandingPage.css'

const LandingPage = () => {

    const scrollChangNavbar = () => {
        //! Put the class name that you want to use
        // Class name that will be added to the navbar element in the "scrolled" state
        const SCROLLED_STATE_CLASS = "my-bg-white"
        //! Use your own ID or selector
        // The id of navigation bar HTML element
        const NAVBAR_ID = "my-nav"
        // Get the navigation bar element
        const navbar = document.getElementById(NAVBAR_ID)
        // OnScroll event handler
        const onScroll = () => {
            // Get scroll value
            const scroll = document.documentElement.scrollTop
            // If scroll value is more than 0 - means the page is scrolled, add or remove class based on that
            if (scroll > 0) {
                navbar.classList.add(SCROLLED_STATE_CLASS);
            } else {
                navbar.classList.remove(SCROLLED_STATE_CLASS)
            }
        }
        // Use the function
        window.addEventListener('scroll', onScroll)
    }

    const titlePage = () => {
        document.title = 'G-Trainee Fitness & Health'
    }

    useEffect(() => {
        scrollChangNavbar();
        titlePage();
    }, []);
    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg my-nav fixed-top" aria-label="Thirteenth navbar example" id="my-nav">
                {/* Container fluid */}
                <div className="container-fluid">
                    {/* Btn Burger Menu */}
                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
                        {/* Burger Menu icon */}
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Block Navbar menu */}
                    <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                        {/* Block for grid col-3 */}
                        <div className="col-lg-3 me-0" />
                        {/* Block for grid col-6 Menu list */}
                        <ul className="navbar-nav col-lg-6 justify-content-lg-center">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#section-heroes">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#section-review">Review</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#section-what-we-do">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#section-step-by-step">How to use?</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#section-dev-team">Dev team</a>
                            </li>
                        </ul>
                        {/* Block for grid col-3 End Button */}
                        <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                            <a href='/register' className="btn my-nav-btn me-3 my-btn-register">Register</a>
                            <a href='/login' className="btn my-nav-btn my-btn-login">Login</a>
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
                        <img src="./src/image/landing_page/logo-lg.png" alt="g-trainee-logo" />
                        {/* Heroes Text */}
                        <p className="mt-5">
                            It is a long established fact that a reader will be distracted by
                            the readable content of a page when looking at its layout. The point
                            of using Lorem Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using 'Content here, content
                            here', making it look like readable English. test hahahaha
                        </p>
                    </section>
                    {/* End Heroes content */}
                </article>
                {/* End Heroes Section */}
                {/* Reviews Section */}
                <article className="section-review container text-light pt-5 pb-5" id="section-review">
                    {/* Reviews Section Title */}
                    <h2 className="text-center pb-5">Review</h2>
                    {/* Reviews Section content row */}
                    <div className="row">
                        {/* Reviews Section content col 4 */}
                        <div className="col-md-12 col-lg-4 mt-4">
                            {/* Card Content */}
                            <div className="card my-bg-secondary">
                                {/* image tumnail */}
                                <img src="https://www.fashiongonerogue.com/wp-content/uploads/2022/08/Jennie-Calvin-Klein-Fall-2022-Campaign01.jpg" className="rounded-circle card-img-top mt-3 mx-auto" />
                                {/* Card body */}
                                <div className="card-body">
                                    {/* Card title */}
                                    <h5 className="card-title text-center">Card title</h5>
                                    {/* Card paragraph */}
                                    <p className="card-text">
                                        Some quick example text to build on the card title and make up
                                        the bulk of the card's content.
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
                                <img src="https://www.fashiongonerogue.com/wp-content/uploads/2022/08/Jennie-Calvin-Klein-Fall-2022-Campaign01.jpg" className="rounded-circle card-img-top mt-3 mx-auto" />
                                {/* Card body */}
                                <div className="card-body">
                                    {/* Card title */}
                                    <h5 className="card-title text-center">Card title</h5>
                                    {/* Card paragraph */}
                                    <p className="card-text">
                                        Some quick example text to build on the card title and make up
                                        the bulk of the card's content.
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
                                <img src="https://www.fashiongonerogue.com/wp-content/uploads/2022/08/Jennie-Calvin-Klein-Fall-2022-Campaign01.jpg" className="rounded-circle card-img-top mt-3 mx-auto" />
                                {/* Card body */}
                                <div className="card-body">
                                    {/* Card title */}
                                    <h5 className="card-title text-center">Card title</h5>
                                    {/* Card paragraph */}
                                    <p className="card-text">
                                        Some quick example text to build on the card title and make up
                                        the bulk of the card's content.
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
                <article className="section-what-we-do pt-5 pb-5 container-fluid" id="section-what-we-do">
                    {/* row */}
                    <div className="row text-white">
                        {/* col-7 */}
                        <div className="col-xl-7 d-none d-xl-block">
                            <img src="./src/image/landing_page/Group_14.png" alt="prototype-feature" width="100%" />
                        </div>
                        {/* end col-7 */}
                        {/* col-5 */}
                        <div className="col-xl-5 position-relative z-100 p-5 p-xl-3 what-we-do d-flex align-items-center">
                            <div>
                                {/* Header 2 */}
                                <h2>What we do?</h2>
                                {/* paragraph text-header-3 pading-top 5 */}
                                <p className="h3 pt-5">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                                    reprehenderit obcaecati facere porro voluptatum nostrum, labore
                                    quae ea itaque natus tempore fugiat, eum optio, doloremque
                                    deserunt autem perspiciatis amet consectetur! Lorem ipsum dolor
                                    sit amet consectetur adipisicing elit. In suscipit maxime, maiores
                                    sequi dolorem illum ducimus repellendus veritatis repudiandae
                                    minus fuga laudantium delectus iure totam voluptatum animi
                                    accusantium minima nostrum?
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
                <article className="section-step-by-step pt-5 pb-5 container z-100" id="section-step-by-step">
                    <h1 className="text-center text-light mb-5 pb-5">Step by step</h1>
                    <hr className="mt-5" />
                    <div className="step-line-block container mt-5">
                        {/* circle block */}
                        <div className="step-line-content-block">
                            {/* circle */}
                            <div>
                                {/* Icon */}
                                <span><i className="fa-solid fa-user-plus fa-2xl" /></span>
                            </div>
                            {/* text */}
                            <p className="text-center">Sign-up</p>
                        </div>
                        {/* circle block */}
                        <div className="step-line-content-block">
                            {/* circle */}
                            <div>
                                {/* Icon */}
                                <span><i className="fa-sharp fa-solid fa-right-to-bracket fa-2xl" /></span>
                            </div>
                            {/* text */}
                            <p className="text-center">Sign-in</p>
                        </div>
                        {/* circle block */}
                        <div className="step-line-content-block">
                            {/* circle */}
                            <div>
                                {/* Icon */}
                                <span><i className="fa-solid fa-plus fa-xl" /></span>
                            </div>
                            {/* text */}
                            <p className="text-center">Create Activity</p>
                        </div>
                        {/* circle block */}
                        <div className="step-line-content-block">
                            {/* circle */}
                            <div>
                                {/* Icon */}
                                <span><i className="fa-solid fa-check fa-2xl" /></span>
                            </div>
                            {/* text */}
                            <p className="text-center">Done</p>
                        </div>
                        {/* circle block */}
                        <div className="step-line-content-block">
                            {/* circle */}
                            <div>
                                {/* Icon */}
                                <span><i className="fa-solid fa-chart-line fa-2xl" /></span>
                            </div>
                            {/* text */}
                            <p className="text-center">Analysis</p>
                        </div>
                    </div>
                </article>
                {/* End Step by step section */}
                {/* add jenniecard by pang*/}
                <article className="section-dev-team container text-light pt-5 pb-5 mb-5" id="section-dev-team">
                    <div className="container">
                        {/*add card jennie1*/}
                        <h2 className="text-center pb-5">Dev Team</h2>
                        <div className="row">
                            {/* Reviews Section content col 4 */}
                            <div className="col-lg-6 col-xl-4 mt-4">
                                {/* Card Content */}
                                <div className="card my-bg-secondary h-100">
                                    {/* image tumnail */}
                                    <img src="https://www.fashiongonerogue.com/wp-content/uploads/2022/08/Jennie-Calvin-Klein-Fall-2022-Campaign01.jpg" className="rounded-circle card-img-top mt-3 mx-auto" />
                                    {/* Card body */}
                                    <div className="card-body">
                                        {/* Card title */}
                                        <h5 className="card-title text-center">Arlif Tagaree</h5>
                                        {/* Card paragraph */}
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up
                                            the bulk of the card's content.
                                        </p>
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
                                    <img src="https://www.fashiongonerogue.com/wp-content/uploads/2022/08/Jennie-Calvin-Klein-Fall-2022-Campaign01.jpg" className="rounded-circle card-img-top mt-3 mx-auto" />
                                    {/* Card body */}
                                    <div className="card-body">
                                        {/* Card title */}
                                        <h5 className="card-title text-center">Cheewathun Lerttanapit</h5>
                                        {/* Card paragraph */}
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up
                                            the bulk of the card's content.
                                        </p>
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
                                    <img src="https://www.fashiongonerogue.com/wp-content/uploads/2022/08/Jennie-Calvin-Klein-Fall-2022-Campaign01.jpg" className="rounded-circle card-img-top mt-3 mx-auto" />
                                    {/* Card body */}
                                    <div className="card-body">
                                        {/* Card title */}
                                        <h5 className="card-title text-center">Pongpeera Ratana-arporn</h5>
                                        {/* Card paragraph */}
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up
                                            the bulk of the card's content.
                                        </p>
                                    </div>
                                </div>
                                {/* End Card Content */}
                            </div>
                            {/* Reviews Section content col 4 */}
                            <div className="col-lg-6 col-xl-4 mt-4">
                                {/* Card Content */}
                                <div className="card my-bg-secondary h-100">
                                    {/* image tumnail */}
                                    <img src="https://www.fashiongonerogue.com/wp-content/uploads/2022/08/Jennie-Calvin-Klein-Fall-2022-Campaign01.jpg" className="rounded-circle card-img-top mt-3 mx-auto" />
                                    {/* Card body */}
                                    <div className="card-body">
                                        {/* Card title */}
                                        <h5 className="card-title text-center">Pramote Phan-on</h5>
                                        {/* Card paragraph */}
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up
                                            the bulk of the card's content.
                                        </p>
                                    </div>
                                </div>
                                {/* End Card Content */}
                            </div>
                            {/* Reviews Section content col 4 */}
                            <div className="col-lg-6 col-xl-4 mt-4">
                                {/* Card Content */}
                                <div className="card my-bg-secondary h-100">
                                    {/* image tumnail */}
                                    <img src="https://www.fashiongonerogue.com/wp-content/uploads/2022/08/Jennie-Calvin-Klein-Fall-2022-Campaign01.jpg" className="rounded-circle card-img-top mt-3 mx-auto" />
                                    {/* Card body */}
                                    <div className="card-body">
                                        {/* Card title */}
                                        <h5 className="card-title text-center">Sasiwan Janma</h5>
                                        {/* Card paragraph */}
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up
                                            the bulk of the card's content.
                                        </p>
                                    </div>
                                </div>
                                {/* End Card Content */}
                            </div>
                            {/* Reviews Section content col 4 */}
                            <div className="col-lg-6 col-xl-4 mt-4">
                                {/* Card Content */}
                                <div className="card my-bg-secondary h-100">
                                    {/* image tumnail */}
                                    <img src="https://www.fashiongonerogue.com/wp-content/uploads/2022/08/Jennie-Calvin-Klein-Fall-2022-Campaign01.jpg" className="rounded-circle card-img-top mt-3 mx-auto" />
                                    {/* Card body */}
                                    <div className="card-body">
                                        {/* Card title */}
                                        <h5 className="card-title text-center">THATPONG PALEEKAN</h5>
                                        {/* Card paragraph */}
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up
                                            the bulk of the card's content.
                                        </p>
                                    </div>
                                </div>
                                {/* End Card Content */}
                            </div>
                        </div>
                    </div>
                </article>
                {/* End jenniecard by pang*/}
            </main>
            {/* End Block Main */}
            {/* Footer */}
            <footer />
        </div>

    )
}

export default LandingPage