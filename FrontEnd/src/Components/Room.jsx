import React from 'react';
import { Link } from 'react-router-dom';

const rooms = [
    { id: 1, name: "Double Deluxe Room", price: 250, image: "/image/room1.jpg" },
    { id: 2, name: "Single Deluxe Room", price: 200, image: "/image/room2.jpg" },
    { id: 3, name: "Honeymoon Suit", price: 750, image: "/image/room3.jpg" },
    { id: 4, name: "Economy Double", price: 200, image: "/image/room4.jpg" }
];

const RoomCard = ({ name, price, image }) => (
    <div className="col-lg-3 col-sm-6">
        <div className="accomodation_item text-center">
            <div className="hotel_img">
                <img src={image} alt={name} />
                <Link to="/booking" className="btn theme_btn button_hover">Book Now</Link>
            </div>
            <h4 className="sec_h4">{name}</h4>
            <h5>${price}<small>/night</small></h5>
        </div>
    </div>
);

const Room = () => {
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

            {/* Special Accommodation */}
            <section className="accomodation_area section_gap">
                <div className="container">
                    <div className="section_title text-center">
                        <h2 className="title_color">Special Accommodation</h2>
                        <p>Find the best rooms with top-notch facilities.</p>
                    </div>
                    <div className="row mb_30">
                        {rooms.map(room => <RoomCard key={room.id} {...room} />)}
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section className="hotel_booking_area">
                <div className="container">
                    <div className="row hotel_booking_table">
                        <div className="col-md-3">
                            <h2>Book<br /> Your Room</h2>
                        </div>
                        <div className="col-md-9">
                            <div className="boking_table">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="book_tabel_item">
                                            <input type='date' className="form-control" placeholder="Arrival Date" />
                                            <input type='date' className="form-control" placeholder="Departure Date" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <select className="form-control">
                                            <option>Adult</option>
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                        <select className="form-control">
                                            <option>Child</option>
                                            <option>0</option>
                                            <option>1</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <select className="form-control">
                                            <option>Number of Rooms</option>
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                        <Link className="book_now_btn button_hover" to="/booking">Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Normal Accommodation */}
            <section className="accomodation_area section_gap">
                <div className="container">
                    <div className="section_title text-center">
                        <h2 className="title_color">Normal Accommodation</h2>
                        <p>Affordable and comfortable stays.</p>
                    </div>
                    <div className="row">
                        {rooms.map(room => <RoomCard key={room.id} {...room} />)}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Room;
