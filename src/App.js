import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import './Global.css';
import './App.css';

import Login from './Interface/Login';
import SignUp from './Interface/SignUp';
import Contentieux from './Interface/Contentieux';
import ChangerPassword from './Interface/ChangerPassword';
import AjouterCon from './Interface/AjouterCon';
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [buttonInfo, setButtonInfo] = useState({
    label: '',
    to: '/',
  });

  useEffect(() => {
    if (location.pathname === "/Signup") {
      setButtonInfo({ label: "Retour", to: "/" });
    } else if (location.pathname === "/Contentieux") {
      setButtonInfo({ label: "Changer mot de pass", to: "/ChangerPassword" });
    } else if (location.pathname === "/ChangerPassword") {
      setButtonInfo({ label: "Retour", to: "/" });
    } else if (location.pathname === "/AjouterCon") {
      setButtonInfo({ label: "Add", to: "/contentieux" });
    } 
    else {
      setButtonInfo({ label: "S'inscrire", to: "/Signup" });
    }
  }, [location]);
  const handleLogout=()=>{
    const confirmLogout = window.confirm('Voulez-vous vraiment vous Deconnecter?');
    if(confirmLogout){
      window.location.href='/';
    }
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="/images/Logo.png" alt="Company Logo" />
        </div>
        <h1>GESTION DE CONTENTIEUX</h1>
        <div className="right-links">
          <Link to={buttonInfo.to}>
            <button className="signupBtn">
              {buttonInfo.label}
              <span className="arrow">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="rgb(183, 128, 255)">
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
                </svg>
              </span>
            </button>
          </Link>
          <div className='logout'>

            
            <img src="\images\logout.png" onClick={handleLogout} width={"30px"} height={"auto"} style={{ marginRight: "25px" }} alt='logout'></img>
          

        </div>
        {/* Afficher les boutons "Déconnexion" et "Changer Password" uniquement sur la page Contentieux  */}
         {/* {location.pathname === "/Contentieux" && (
            <div className="header-buttons">
              <Link to="/ChangerPassword">
                <button className="signupBtn">Changer Mot de Passe</button>
              </Link>
            </div>
          )} */}
    </div> 
      </header >

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/Contentieux" element={<Contentieux />} />
      <Route path="/AjouterCon" element={<AjouterCon />} />
      <Route path="/ChangerPassword" element={<ChangerPassword />} />

    </Routes>
    </div >
  );
}
