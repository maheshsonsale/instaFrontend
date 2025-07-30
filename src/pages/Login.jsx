import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import HomePage from './HomePage';
import axios from 'axios';
import '../css/Login.css';
import { BackPath } from '../components/BackendPath';

const Login = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messege,setMessege]=useState('')

    const handleLogin = async(e) => {
        e.preventDefault();
        
            axios.post(`${BackPath}/login`,{email,password},{withCredentials:true}).then(()=>{
                    setMessege("Login Success")
                    navigate('/home')
                }).catch(()=>{
                    setMessege("Invalid Email Or Password")
                })
    };

    return (
        <div className="insta-login-wrapper">
            <div className="insta-login-box">
                <h1 className="insta-logo">Instagram</h1>
                <form onSubmit={handleLogin} className="insta-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Log in</button>
                </form>

                <p className="insta-login-link">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
                <p className='message'>{messege}</p>
            </div>
        </div>
    );
};

export default Login;
