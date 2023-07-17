import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../logo.svg';
import './navbarMain.css';
import { Link } from 'react-router-dom'

const NavbarMain = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className="gpt3__navbar">
        <div className="gpt3__navbar-links">
            <div className="gpt3__navbar-links_logo">
            <img src={logo} />
            </div>
            <div className="gpt3__navbar-links_container">
            <p><Link to={`/`}>Home</Link></p>
            <p><Link to={`/juknis`}>Juknis</Link></p>
            <p><Link to={`/kontak`}>Kontak</Link></p>
            {/* <p><a href="#features">Case Studies</a></p>
            <p><a href="#blog">Library</a></p> */}
            </div>
        </div>
        <div className="gpt3__navbar-sign">
            {/* <Link to={`/masuk`}>
                <p>Masuk</p>
            </Link> */}
            <Link to={`/daftar`}>
                <button type="button">Daftar</button>
            </Link>
        </div>
        <div className="gpt3__navbar-menu">
            {toggleMenu
            ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
            : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
            {toggleMenu && (
            <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
                <p><Link to={`/`}>Home</Link></p>
                <p><Link to={`/juknis`}>Juknis</Link></p>
                <p><Link to={`/kontak`}>Kontak</Link></p>
                {/* <p><a href="#features">Case Studies</a></p>
                <p><a href="#blog">Library</a></p> */}
            </div>
            <div className="gpt3__navbar-menu_container-links-sign">
                <Link to={`/masuk`}>
                    <p>Masuk</p>
                </Link>
                <Link to={`/daftar`}>
                    <button type="button">Daftar</button>
                </Link>
            </div>
            </div>
            )}
        </div>
        </div>
    );
};

export default NavbarMain;
