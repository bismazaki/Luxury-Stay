// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Room.css"; // Custom CSS file for additional styling

// const Room = () => {
//     const [rooms, setRooms] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchRooms = async () => {
//             try {
//                 const response = await axios.get("http://localhost:2000/api/Room/rooms");
//                 console.log("API Response:", response.data);
//                 setRooms(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError("Failed to fetch rooms");
//                 setLoading(false);
//             }
//         };
//         fetchRooms();
//     }, []);

//     // Filter rooms based on search term
//     const filteredRooms = rooms.filter(room =>
//         room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <>
//             {/* Breadcrumb */}
//             <section className="breadcrumb_area">
//                 <div className="overlay bg-parallax"></div>
//                 <div className="container">
//                     <div className="page-cover text-center">
//                         <h1 className="page-cover-title" style={{color: `white`}}>Rooms</h1>
//                         <ol className="breadcrumb">
//                             <li><Link to="/">Home</Link></li>
//                             <li className="active">Rooms</li>
//                         </ol>
//                     </div>
//                 </div>
//             </section>

//             {/* Search Bar */}
//             <div className="container my-4 text-center">
//                 <input
//                     type="text"
//                     className="form-control search-bar"
//                     placeholder="Search for a room..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>

//             {/* Special Accommodation */}
//             <section className="accomodation_area mt-5">
//                 <div className="container">
//                     <div className="section_title text-center">
//                         <h1 className="title_color">Special Rooms</h1>
//                         <h3 style={{fontSize: `20px`}}>Find the best rooms with top-notch facilities.</h3>
//                     </div>

//                     {loading ? (
//                         <p className="loading-text">Loading rooms...</p>
//                     ) : error ? (
//                         <p className="error-text">{error}</p>
//                     ) : (
//                         <div className="row">
//                             {filteredRooms.length > 0 ? (
//                                 filteredRooms.map(room => (
//                                     <div key={room.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
//                                         <div className="room-card">
//                                             <div className="room-img-container">
//                                                 <img 
//                                                     src={room.image} 
//                                                     alt={room.roomType} 
//                                                     className="room-img"
//                                                 />
//                                                 <button 
//                                                     className="btn book-btn"
//                                                     onClick={() => navigate("/booking", { state: { ...room } })}
//                                                 >
//                                                     Book Now
//                                                 </button>
//                                             </div>
//                                             <div className="room-info">
//                                                 <h4>{room.roomType}</h4>
//                                                 <h5>${room.pricePerNight}<small>/night</small></h5>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-center">No rooms found.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Room;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Room.css"; // Custom CSS file for additional styling

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

    // Function to navigate to Booking Page with Room Data
    const handleBooking = (room) => {
        navigate("/booking", { 
            state: { 
                id: room._id,  // Ensure room._id is correct
                roomType: room.roomType,
                pricePerNight: room.pricePerNight,
                image: room.image 
            } 
        });
    };

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
                        <h1 className="page-cover-title" style={{color: `white`}}>Rooms</h1>
                        <ol className="breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Rooms</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <div className="container my-4 text-center">
                <input
                    type="text"
                    className="form-control search-bar"
                    placeholder="Search for a room..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Special Accommodation */}
            <section className="accomodation_area mt-5">
                <div className="container">
                    <div className="section_title text-center">
                        <h1 className="title_color">Special Rooms</h1>
                        <h3 style={{fontSize: `20px`}}>Find the best rooms with top-notch facilities.</h3>
                    </div>

                    {loading ? (
                        <p className="loading-text">Loading rooms...</p>
                    ) : error ? (
                        <p className="error-text">{error}</p>
                    ) : (
                        <div className="row">
                            {filteredRooms.length > 0 ? (
                                filteredRooms.map(room => (
                                    <div key={room._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                        <div className="room-card">
                                            <div className="room-img-container">
                                                <img 
                                                    src={room.image} 
                                                    alt={room.roomType} 
                                                    className="room-img"
                                                />
                                                <button 
                                                    className="btn book-btn"
                                                    onClick={() => handleBooking(room)}
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                            <div className="room-info">
                                                <h4>{room.roomType}</h4>
                                                <h5>${room.pricePerNight}<small>/night</small></h5>
                                            </div>
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
