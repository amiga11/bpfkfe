import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/check.png';
import './home.css';

const Home = () => (
    <div className="gpt3__home section__padding" id="home">
        <div className="gpt3__home-content">
        <h1 className="gradient__text">Selamat Datang di Aplikasi Registrasi BPFK/IPFK - RMC / Unit Pemeliharaan Peralatan Kesehatan </h1>
        <p>Aplikasi ini membantu mempermudah proses registrasi Balai  Pengujian Fasilitas Kesehatan (BPFK)/ Institusi Pengujian Fasilitas Kesehatan (IPFK), dan Regional Maintenance Center (RMC) / Unit Pemeliharaan Peralatan Kesehatan.</p>

        {/* <div className="gpt3__home-content__input">
            <input type="email" placeholder="Your Email Address" />
            <button type="button">Get Started</button>
        </div> */}

        {/* <div className="gpt3__home-content__people">
            <img src={people} />
            <p>1,600 people requested access a visit in last 24 hours</p>
        </div> */}
        </div>

        <div className="gpt3__home-image">
        <img src={ai} />
        </div>
    </div>
);

export default Home;
