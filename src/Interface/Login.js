import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Global.css';
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    axios.defaults.withCredentials = true;


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/Login', values)
            .then(res => {
                if (res.data.Login) {
                    navigate('/Contentieux')

                }
                else {
                    alert("No record")
                }
                console.log(res);
            })
            .catch(err => console.log(err));

    }


    return (
        <div>
            <div className='boddy'></div>
            <div className="login-box">
                <p>Connexion</p>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input name="email" type="text" onChange={handleInput} required />
                        <label>Compte:</label>
                    </div>
                    <div className="user-box">
                        <input name="password" type="password" onChange={handleInput} required />
                        <label>Mot de passe:</label>
                    </div>
                    <div className='button-borders'>
                        <button type='submit' className='primary-button'>
                          Se connecter
                        </button>
                        </div><br></br>
                </form>
                <p>Vous n'avez pas de compte ?   <Link to="/signup" className="a2"> Inscrivez-vous !</Link></p>
            </div>
        </div>
    );
};

export default Login;
