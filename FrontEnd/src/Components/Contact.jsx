import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const Feedback = () => {
  const { guestName, userId } = useContext(AuthContext);

  const [feedback, setFeedback] = useState({
    name: guestName || "",
    guestId: userId || "",
    serviceType: "",
    rating: 0,
    comments: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating) => {
    setFeedback({ ...feedback, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2000/api/feedback/feedback", feedback);
      alert("Feedback submitted successfully!");
      setFeedback({
        name: guestName || "",
        guestId: userId || "",
        serviceType: "",
        rating: 0,
        comments: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
      <section className="breadcrumb_area">
        <div className="overlay bg-parallax"></div>
        <div className="container">
          <div className="page-cover text-center">
            <h2 className="page-cover-tittle">Guest Feedback</h2>
            <ol className="breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li className="active">Feedback</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="contact_area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="contact_info">
                <div className="info_item">
                  <i className="lnr lnr-home"></i>
                  <h6>California, United States</h6>
                  <p>Santa Monica Boulevard</p>
                </div>
                <div className="info_item">
                  <i className="lnr lnr-phone-handset"></i>
                  <h6>
                    <a href="/">00 (440) 9865 562</a>
                  </h6>
                  <p>Mon to Fri 9am to 6 pm</p>
                </div>
                <div className="info_item">
                  <i className="lnr lnr-envelope"></i>
                  <h6>
                    <a href="/">support@colorlib.com</a>
                  </h6>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <form className="row contact_form" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={feedback.name}
                      readOnly
                      placeholder="Your Name (Auto-filled)"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="guestId"
                      value={feedback.guestId}
                      readOnly
                      placeholder="Guest ID (Auto-filled)"
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="serviceType"
                      value={feedback.serviceType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Service Type</option>
                      <option value="Room">Room</option>
                      <option value="Food">Food</option>
                      <option value="Cleanliness">Cleanliness</option>
                      <option value="Customer Service">Customer Service</option>
                    </select>
                  </div>

                  {/* Star Rating */}
                  <div className="form-group">
                    <label>Rating:</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${star <= feedback.rating ? "selected" : ""}`}
                          onClick={() => handleStarClick(star)}
                          style={{
                            fontSize: "24px",
                            cursor: "pointer",
                            color: star <= feedback.rating ? "yellow" : "gray",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="comments"
                      value={feedback.comments}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter your feedback"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-12 text-right">
                  <button type="submit" className="btn theme_btn button_hover">
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          .star {
            font-size: 24px;
            cursor: pointer;
          }
          .selected {
            color: yellow;
          }
        `}
      </style>
    </>
  );
};

export default Feedback;
