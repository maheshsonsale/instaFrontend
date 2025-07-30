import axios from 'axios'
import React from "react";
import "../css/Chat.css";
import { useEffect } from "react";
import { BackPath } from '../components/BackendPath'
import { useState } from 'react';
const Chat = () => {
    const [username,setUsername]=useState('')
    const [pic,setPic]=useState('')
const [users,setUsers]=useState([])
    useEffect(() => {
        axios.post(`${BackPath}/chatUser`, {}, { withCredentials: true }).then((res) => {
            console.log(res.data);
            
            setUsers(res.data.following)
        }).catch((err) => {
            console.log(err);
        })
    },[])


    function shwUser(name,pic){
        setUsername(name)
        setPic(pic)
    }
    return (
        <div className="chat-page">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Instagram</h2>
                    <div className="sidebar-icons">
                        <span>➕</span>
                        <span>⋮</span>
                    </div>
                </div>

                <div className="sidebar-search">
                    <input type="text" placeholder="Search" />
                </div>

                <div className="sidebar-filters">
                    <button>All</button>
                    <button>Unread</button>
                    <button>Favorites</button>
                    <button>Groups</button>
                </div>

                <div className="user-list">
                    {users.map((user)=>(
                    <div className="user-card" key={user._id} onClick={()=>{shwUser(user.fullname,user.pic)}}>
                        <img src={user?.pic} alt="user" />
                        <div className="user-info">
                            <div className="user-header">
                                <h3>{user?.username}</h3>
                                <span className="time">11:45</span>
                            </div>
                            <p className="last-message">the content written by the last</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="chat-area">
                <div className="chat-header">
                    <div className="chat-user">
                        <img src={pic} alt="person" />
                        <h3>{username}</h3>
                    </div>
                    <div className="chat-icons">
                        <span>📞</span>
                        <span>🔍</span>
                        <span>⋮</span>
                    </div>
                </div>

                <div className="chat-messages">
                    <h1>No chat yet</h1>
                </div>

                <div className="chat-input">
                    <span>➕</span>
                    <span>😀</span>
                    <input type="text" placeholder="Type a message..." />
                    <span>🎤</span>
                </div>
            </div>
        </div>
    );
};

export default Chat;
