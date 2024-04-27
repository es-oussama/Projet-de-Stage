import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''


    });
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/SignUp', values)
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err));
    };
    // const handleInput =(event)=>{
    //     setValues(prev =>({...prev,[event.target.value]:[event.target.value]}))
    // }
    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    }
    return (
        <div>
            <div className='boddy'> </div>
            <div className="login-box">
                <p> Inscription</p>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input
                            name="name"
                            type="text"
                            onChange={handleInput}
                            required
                        />
                        <label>user:</label>
                    </div>
                    <div className="user-box">
                        <input
                            name="email"
                            type="email"
                            onChange={handleInput}
                            required
                        />
                        <label>email</label>
                    </div>
                    <div className="user-box">
                        <input
                            name="password"
                            type="password"
                            onChange={handleInput}
                            required
                        />
                        <label>Mot de pass:</label>
                    </div>
                    <div className='button-borders'>
                        <button type='submit' className='primary-button'>
                            Créer un compte
                        </button>
                        </div><br></br>
                </form>
                <p>Already have an account? <Link to="/" className="a2">Log in!</Link></p>
            </div>
        </div>
    );
};

export default SignUp;
