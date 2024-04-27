import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Global.css';

const ChangerPassword = () => {
    const [compte, setCompte] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate =useNavigate();
    const handleChangePassword = async () => {
        try {
            const response = await axios.post('http://localhost:8081/change-password', {
                compte:compte,
                oldPassword:oldPassword,
                newPassword:newPassword
            });
            if(response.status === 200){
                navigate('/Contentieux');
            }
        } catch (error) {
            console.error('Erreur lors du changement de mot de passe:', error);
        }
    };

    return (
        <div>
            <div className='boddy'></div>
            <div className="login-box">
                <p>Changer le Mot de pass:</p>
                <form>
                    <div className="user-box">
                        <input type="text"  value={compte} onChange={(e) => setCompte(e.target.value)} required/>
                        <label>Votre Compte :</label>
                    </div>
                    <div className="user-box">
                        <input type="password"  value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required/>
                        <label>Ancien mot de passe:</label>
                    </div>
                    <div className="user-box">
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                        <label>Nouveau mot de passe:</label>
                    </div>
                    <div className='button-borders'>
                        <button type='button' onClick={handleChangePassword} className='primary-button'>
                        Changer votre Mot de pass:
                        </button>
                        </div><br></br>
                </form>
            </div>
        </div>
    );
};

export default ChangerPassword;
