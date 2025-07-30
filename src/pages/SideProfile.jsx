import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/SideProfile.css';
import axios from 'axios';
import { BackPath } from '../components/BackendPath';
const SideProfile = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [pic, setPic] = useState('')
    const [otherUsers, setOtherUsers] = useState([])

    useEffect(() => {
        axios.get(`${BackPath}/sideprofile`, { withCredentials: true }).then((response) => {
            setUsername(response.data.User.username)
            setFullname(response.data.User.fullname)
            setPic(response.data.User.pic)
            setOtherUsers(response.data.otherUsers)
        })
    })

    function handleFollowers(frontuserid) {
        try {
            axios.post(`${BackPath}/followers`, { frontuserid }, { withCredentials: true })
        } catch (error) {
            console.log(error);
        }
    }

    function following(frontuserid) {
        try {
            axios.post(`${BackPath}/following`, { frontuserid }, { withCredentials: true })
        } catch (error) {
            console.log(error);
        }
    }

    function renderOtherProfile(frontuser) {
        navigate(`/home/otherperson/:${frontuser.username}`, {
            state: {
                userdata: frontuser
            }
        })
    }


    return (
        <aside className="side-profile">
            <div className="profile-top">
                <NavLink to="profile">
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <img src={pic ? pic : "https://i.pravatar.cc/150?img=10"}
                            alt="User" className="profile-pic" />
                        <div>
                            <h2 className="username">{username}</h2>
                            <p id='fullname'>{fullname}</p>
                        </div>
                    </div>
                </NavLink>
                <h6 className='switch-btn'>Switch</h6>
            </div>


            {/* Other users */}

            <div className='other-profiles'>
                <div className='suggested-all' >
                    <span style={{ color: 'gray' }}>Suggested for you</span>
                    <span style={{ color: 'whitesmoke' }}>See All</span>
                </div>
                {otherUsers.map((user) => (
                    <div key={user._id}>
                        <div className="profile-top">
                            <div style={{ display: 'flex', gap: '10px', cursor: 'pointer' }} onClick={() => renderOtherProfile(user)}>
                                <img
                                    src={user.pic ? user.pic : "https://i.pravatar.cc/150?img=10"}
                                    alt="User"
                                    className="profile-pic"
                                />
                                <div>
                                    <h2 className="username">{user.username}</h2>
                                    <p id='fullname'>{user.fullname}</p>
                                </div>
                            </div>
                            <h6 className='switch-btn' onClick={() => { handleFollowers(user._id); following(user._id); }}>{user.follUnfoll}</h6>
                        </div>
                    </div>
                ))}
            </div>

        </aside>
    );
};

export default SideProfile;
