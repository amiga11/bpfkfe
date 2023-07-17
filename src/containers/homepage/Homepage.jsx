import React from 'react';

import {Home } from '../../containers';
import {NavbarMain } from '../../components';
import style from "./homepage.css";
import { Table } from 'react-bootstrap';

const Homepage = () => (
    // <div className='homepage'>
    //     <div className="gradient__bg">
    //         <NavbarMain />
    //         <Home />
    //     </div>
    // </div>

    <div className="gpt3__home section__padding" id="home">
    <div className="gpt3__home-content">
    <h1 className="gradient__text">Selamat Datang di Aplikasi Registrasi BPFK/IPFK - RMC / Unit Pemeliharaan Peralatan Kesehatan </h1>
    <p>Aplikasi ini membantu mempermudah proses registrasi Balai  Pengujian Fasilitas Kesehatan (BPFK)/ Institusi Pengujian Fasilitas Kesehatan (IPFK), dan Regional Maintenance Center (RMC) / Unit Pemeliharaan Peralatan Kesehatan.</p>

    <Table
            className="gradient__text"
            striped
            bordered
            responsive
            style={{ width: "500%" }}
          >
    <thead>
            <tr>
                <th>no</th>
                <th>nama</th>
                <th>coba</th>
            </tr>
    </thead>
    </Table>

    </div>
</div>
);

export default Homepage;
