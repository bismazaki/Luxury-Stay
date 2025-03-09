import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:2000/api/Room/rooms");
                console.log("API Response:", response.data);
                setRooms(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch rooms");
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    // Filter rooms based on search term
    const filteredRooms = rooms.filter(room =>
        room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Breadcrumb */}
            <section className="breadcrumb_area">
                <div className="overlay bg-parallax"></div>
                <div className="container">
                    <div className="page-cover text-center">
                        <h2 className="page-cover-tittle">Rooms</h2>
                        <ol className="breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Rooms</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <div className="container my-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a room..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Special Accommodation */}
            <section className="accomodation_area section_gap">
                <div className="container">
                    <div className="section_title text-center">
                        <h2 className="title_color">Special Accommodation</h2>
                        <p>Find the best rooms with top-notch facilities.</p>
                    </div>

                    {loading ? (
                        <p>Loading rooms...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <div className="row mb_30">
                            {filteredRooms.length > 0 ? (
                                filteredRooms.map(room => (
                                    <div key={room.id} className="col-lg-3 col-sm-6">
                                        <div className="accomodation_item text-center">
                                            <div className="hotel_img" style={{ width: "300px", height: "300px", overflow: "hidden", margin: "auto" }}>
                                                <img 
                                                    src={room.image} 
                                                    alt={room.roomType} 
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                                />
                                                <button 
                                                    className="btn theme_btn button_hover"
                                                    onClick={() => navigate("/booking", { state: { ...room } })}
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                            <h4 className="sec_h4">{room.roomType}</h4>
                                            <h5>${room.pricePerNight}<small>/night</small></h5>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No rooms found.</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Room;
