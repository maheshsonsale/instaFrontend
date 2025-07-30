import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import { BackPath } from '../components/BackendPath';
// import { response } from 'express';


const Register = () => {
    const navigate = useNavigate()

    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessege] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post(`${BackPath}/create`, { fullname, username, email, password }, { withCredentials: true }).then((response) => {
                if (response.data.success) {
                    setMessege("Account created successfuly")
                    navigate('/home')
                } else {
                    setMessege("Account Already Exist Please Login")
                }
            }).catch()
        } catch (err) {
            console.log(err);
            setMessege("something went wrong")
        }
        // Add your backend registration logic here
    };

    return (
        <div className="insta-register-wrapper">
            <div className="insta-register-box">
                <h1 className="insta-logo">Instagram</h1>
                <form onSubmit={handleSubmit} className="insta-form">
                    <input type="text" name="fullname" placeholder="Full Name" value={fullname}
                        onChange={(e) => setFullname(e.target.value)} required />

                    <input type="text" name="username" placeholder="Username" value={username}
                        onChange={(e) => setUsername(e.target.value)} required />

                    <input type="email" name="email" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />

                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit">Sign up</button>
                </form>
                <p className="insta-login-link">
                    Have an account? <Link to="/">Log in</Link>
                </p>
                <p className='message'>{message}</p>
            </div>
        </div>
    );
};

export default Register;
