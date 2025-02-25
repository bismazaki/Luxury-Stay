import React from 'react'

const About = () => {
  return (
    <>
 <section className="breadcrumb_area">
            <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background=""></div>
            <div className="container">
                <div className="page-cover text-center">
                    <h2 className="page-cover-tittle">About Us</h2>
                    <ol className="breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li className="active">About</li>
                    </ol>
                </div>
            </div>
        </section>

        <section className="about_history_area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 d_flex align-items-center">
                        <div className="about_content ">
                            <h2 className="title title_color">About Us <br/>Our History<br/>Mission & Vision</h2>
                            <p>inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards especially in the workplace. That’s why it’s crucial that, as women, our behavior on the job is beyond reproach. inappropriate behavior is often laughed.</p>
                            <a href="/" className="button_hover theme_btn_two">Request Custom Price</a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid" src="/image/about_bg.jpg" alt="img"/>
                    </div>
                </div>
            </div>
        </section>

        <section className="facilities_area section_gap">
            <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background="">  
            </div>
            <div className="container">
                <div className="section_title text-center">
                    <h2 className="title_w">Royal Facilities</h2>
                    <p>Who are in extremely love with eco friendly system.</p>
                </div>
                <div className="row mb_30">
                    <div className="col-lg-4 col-md-6">
                        <div className="facilities_item">
                            <h4 className="sec_h4"><i className="lnr lnr-dinner"></i>Restaurant</h4>
                            <p>Usage of the Internet is becoming more common due to rapid advancement of technology and power.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="facilities_item">
                            <h4 className="sec_h4"><i className="lnr lnr-bicycle"></i>Sports CLub</h4>
                            <p>Usage of the Internet is becoming more common due to rapid advancement of technology and power.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="facilities_item">
                            <h4 className="sec_h4"><i className="lnr lnr-shirt"></i>Swimming Pool</h4>
                            <p>Usage of the Internet is becoming more common due to rapid advancement of technology and power.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="facilities_item">
                            <h4 className="sec_h4"><i className="lnr lnr-car"></i>Rent a Car</h4>
                            <p>Usage of the Internet is becoming more common due to rapid advancement of technology and power.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="facilities_item">
                            <h4 className="sec_h4"><i className="lnr lnr-construction"></i>Gymnesium</h4>
                            <p>Usage of the Internet is becoming more common due to rapid advancement of technology and power.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="facilities_item">
                            <h4 className="sec_h4"><i className="lnr lnr-coffee-cup"></i>Bar</h4>
                            <p>Usage of the Internet is becoming more common due to rapid advancement of technology and power.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default About
