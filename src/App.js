import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Footer, Blog, Possibility, Features, WhatGPT3, Header, Homepage } from './containers';
import { CTA, Brand, Navbar } from './components';
import { Home, Daftar } from './containers';
import { NavbarMain, Juknis } from './components';

import './App.css';
import UserList from './components/UserList/UserList';
import Update from './components/update/Update';
import Login from './components/login/Login';
import Rmc from './components/Rmc/Rmc';
import RmcValidated from './components/Rmc/RmcValidated';
import Bpfk from './components/Bpfk/Bpfk';
import BpfkValidated from './components/Bpfk/BpfkValidated';
import Navbarr from './components/navbarr/Navbarr';
import RegistrasiList from './components/RegistrasiList/RegistrasiList';
import ValidatedList from './components/ValidatedList/ValidatedList';

const App = () => (
    <div className="App">
        <BrowserRouter basename={''}>
            <Routes>
                <Route path="/" element={<div className="gradient__bg"><NavbarMain /><Home /></div>} />
                <Route path="/juknis" element={<div className="gradient__bg"><NavbarMain /><Juknis /></div>} />
                <Route path="/daftar" element={<div className="gradient__bg"><NavbarMain /><Daftar /></div>} />
                <Route path="/masuk" element={<div className="gradient__bg"><NavbarMain /><Login /></div>} />
                <Route path="/registrasilist" element={<div className="gradient__bg"><Navbar /><RegistrasiList /></div>} />
                <Route path="/validatedlist" element={<div className="gradient__bg"><Navbar /><ValidatedList /></div>} />
                {/* <Route path="/update" element={<div className="gradient__bg"><Update /></div>} />
                <Route path="/tes" element={<div className="gradient__bg"><NavbarMain /><CTA /></div>} />
                <Route path="/rmc" element={<div className="gradient__bg"><Navbar /><Rmc /></div>} />
                <Route path="/rmcvalidated" element={<div className="gradient__bg"><Navbar /><RmcValidated /></div>} />
                <Route path="/bpfk" element={<div className="gradient__bg"><Navbar /><Bpfk /></div>} />
                <Route path="/bpfkvalidated" element={<div className="gradient__bg"><Navbar /><BpfkValidated /></div>} />
                <Route path="/userlist" element={<div className="gradient__bg"><Navbar /><UserList /></div>} />
                <Route path="/homepage" element={<div className="gradient__bg"><Homepage /></div>} /> */}
            </Routes>
        </BrowserRouter>
        {/* <Homepage /> */}

        {/* <div className="gradient__bg">
            <Navbar />
            <Header />
        </div> */}
        {/* <Brand /> */}
        {/* <WhatGPT3 /> */}
        {/* <Features /> */}
        {/* <Possibility /> */}
        {/* <CTA /> */}
        {/* <Blog /> */}
        {/* <Footer /> */}
    </div>
);

export default App;
