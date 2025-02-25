import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
	  const handleScroll = () => {
		if (window.scrollY > 50) {
		  setScrolled(true);
		} else {
		  setScrolled(false);
		}
	  };
  
	  window.addEventListener('scroll', handleScroll);
	  return () => {
		window.removeEventListener('scroll', handleScroll);
	  };
	}, []);
  return (
<>
<header className={`header_area ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    
                    <Link className="navbar-brand logo_h" to="/"><img src="/image/Logo.png" alt=""/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                        <ul className="nav navbar-nav menu_nav ml-auto">
                            <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li> 
                            <li className="nav-item"><Link className="nav-link" to="/about">About us</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/rooms">Rooms</Link></li>
                            {/* <li className="nav-item submenu dropdown">
                                <a href="/" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog</a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item"><a className="nav-link" href="blog.html">Blog</a></li>
                                    <li className="nav-item"><a className="nav-link" href="blog-single.html">Blog Details</a></li>
                                </ul>
                            </li>  */}
                             <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                             <li className="nav-item"><Link className="nav-link" to="/login"><IoPersonSharp /></Link></li>
                        </ul>
                           
                    </div> 
                </nav>
            </div>
        </header>

		
</>
  )
}

export default Navbar
