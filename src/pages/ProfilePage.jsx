import axios from 'axios';
import PopupUpdateProfile from '../components/PopupUpdateProfile';
import React, { useEffect, useState, useRef } from 'react';
import '../css/ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { BackPath } from '../components/BackendPath';
import Posts from '../components/Posts';

const ProfilePage = () => {
    const navigate = useNavigate();
    const picUploadRef = useRef()
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [imageUrl, setImageUrl] = useState()
    const [showPopup, setShowPopup] = useState(false);



    const [posts, setPosts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [activeCommentPostId, setActiveCommentPostId] = useState(null);
    const [comments, setComments] = useState({});

    // Fetch profile data
    useEffect(() => {
        axios.get(`${BackPath}/profile`, { withCredentials: true }).then((response) => {
            setFullname(response.data.fullname);
            setUsername(response.data.username);
            setBio(response.data.bio);
            setFollowers(response.data.followers)
            setFollowing(response.data.following)
            setImageUrl(response.data.pic)
            setPosts(response.data.postids)
            setLoggedInUser(response?.data?._id)
        }).catch((error) => {
            console.log(error);
        })
    });


    function showPop() {
        setShowPopup(true)
    }

    // async function deletepost(postid) {
    //     try {
    //         await axios.post(
    //             `${BackPath}/deletepost`, { postid },
    //             { withCredentials: true }
    //         );
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    async function handlePic(e) {
        const file = e.target.files[0]
        if (!file) { return }
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "dzmmp468g")
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dzmmp468g/image/upload", data);
            await axios.post(`${BackPath}/editPic`, { imageUrl: res.data.secure_url }, { withCredentials: true })
        } catch (error) {
            console.log("Upload failed:", error);
        }
    }

    // *******************************************like handler function****************************************
    function handleLike(postid) {
        axios.put(`${BackPath}/likes`, { postid }, { withCredentials: true, }).then().catch((err) => {
            console.error('Error fetching posts:', err);
        })
    }
    //********************************** comment input toggler*************************************

    const handleCommentClick = (postId) => {
        setActiveCommentPostId(prevId => (prevId === postId ? null : postId));
    };
    //**********************  when typing in comment box data will be store here as object *****************************
    const handleCommentChange = (postid, value) => {
        setComments((prev) => ({ ...prev, [postid]: value }));
    };

    // *********************************post the  comment in *****************************
    function postcomment(postid) {
        axios.post(`${BackPath}/comments`, { postid: postid, comments: comments[postid] }, {
            withCredentials: true,
        })
        setComments((prev) => ({ ...prev, [postid]: "" }))
    }

    function renderOtherUser(user) {
        if (user._id == loggedInUser) {
            navigate('/home/profile')
        } else {
            navigate(`/home/otherperson/:${user?.username}`, {
                state: {
                    userdata: user
                }
            })
        }
    }

    function profileDelete() {
        const password = prompt("Please enter your password")
        axios.delete('http://localhost:5000/deleteProfile', { data: { password: password }, withCredentials: true }).then(() => {
            navigate('/')
        }).catch((error) => {
            if (error.response.status == 401) {
                return
            }
        })
    }
    return (
        <div className="profile-container">
            {showPopup && (<PopupUpdateProfile close={() => setShowPopup(false)} />)}
            <div className="profile-header">
                <img className="profile-dp" src={imageUrl ? imageUrl : "https://i.pravatar.cc/150?img=10"} alt="No Image Found" onClick={() => picUploadRef.current.click()} style={{ cursor: "pointer" }} />

                <div className="profile-info">
                    <div className="username-section">
                        <h2>{username}</h2>
                        <input type='file' className="btn" ref={picUploadRef} onChange={handlePic} style={{ display: "none" }} />
                        <div className="profile-stats">
                            <button onClick={showPop}>Edite Profile</button>
                            <button>View Archiev</button>
                            <p style={{ cursor: 'pointer' }} onClick={() => { profileDelete() }}>⚙️</p>

                        </div>
                    </div>
                    <div className="profile-stats">
                        <span><strong>{posts.length}</strong> posts</span>
                        <span><strong>{followers.length}</strong> followers</span>
                        <span><strong>{following.length}</strong> following</span>
                    </div>

                    <div className="bio">
                        <strong>{fullname}</strong><br />
                        <p>{bio}</p>
                    </div>
                    <div className="profile-stats">
                    <button onClick={()=>navigate('/home/createpost')}>Create Post</button>
                    </div>
                </div>
            </div>

            <div className="dashboard-container">
                <h2 className="dashboard-title">📋 My Posts</h2>
            
                <Posts
                    posts={posts}
                    activeCommentPostId={activeCommentPostId}
                    comments={comments}
                    renderOtherUser={renderOtherUser}
                    handleLike={handleLike}
                    handleCommentClick={handleCommentClick}
                    handleCommentChange={handleCommentChange}
                    postcomment={postcomment}
                />
            </div>
        </div>
    )
};

export default ProfilePage
