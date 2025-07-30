import React, { useEffect, useState } from 'react';
import '../css/Feed.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BackPath } from '../components/BackendPath';
// import Posts from '../components/Posts';
//************************************************************************************************************** */
const FeedPage = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('')
    const [activeCommentPostId, setActiveCommentPostId] = useState(null); // for comment button toggle
    const [comments, setComments] = useState({});  // this will store comment data as obj
    //*******************************************************************************************************************
    // fetching  all posts of all users from mongodb
    useEffect(() => {
        axios.get(`${BackPath}/allposts`, {
            withCredentials: true,
        }).then((res) => {
            setPosts(res?.data?.modifiedPosts);
            setLoggedInUser(res?.data?.userid)
        }).catch(() => {
            console.error('Error fetching posts:');
        })
    });
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
    //******************************************** JSX ****************************************************** */
    return (
        <div>
            <div className="feed-container">

                {posts?.length === 0 ? (   // checking for post has or not 
                    <p className="no-posts">No posts available</p>
                ) : (
                    posts?.map((post) => (
                        <div className="post-card" key={post._id}>
                            <div className="post-header">
                                <div className='post-pic-name' onClick={() => { renderOtherUser(post?.userid) }}>
                                    <img src={post?.userid?.pic || `https://avatars.dicebear.com/api/identicon/${Math.random().toString(36).substring(7)}.svg`} alt="User"
                                        className="post-profile-pic" />
                                    <span className="post-username">{post.userid?.username || "Anonymous"}</span>
                                </div>
                                <span className="post-time">{new Date(post.createdAt).toLocaleString()}</span>
                            </div>
                            {post.image && (
                                <img className='post-img' src={post.image} alt="Image"
                                    style={{ width: "100%", height: "480px", borderRadius: "10px", margin: "5px 0" }} />
                            )}
                            <div className="post-content">{post.content}</div>
                            <div className="post-actions">
                                <div className='left-btn'>  {/* like button section */}
                                    <button className="action-btn" onClick={() => handleLike(post._id)}>
                                        🧡 {post.likeunlike} {post.likes.length}
                                    </button>
                                </div>
                                <div className='middle-btn'>
                                    <button className="action-btn" onClick={() => handleCommentClick(post._id)}>
                                        💬 {activeCommentPostId === post._id ? 'Hide ' : 'View all'} {post?.commentids.length} Comments</button>
                                </div>
                            </div>
                            {activeCommentPostId === post._id && (
                                <div className='comment-list'>
                                    {(post.commentids || []).map((comment) => (
                                        <div className="comment" key={comment._id} onClick={() => { renderOtherUser(comment?.sender) }}>
                                            <img className="comment-profilepic" src={comment?.sender?.pic || `https://avatars.dicebear.com/api/identicon/${Math.random().toString(36).substring(7)}.svg`} alt="User"
                                            />
                                            <span className="post-username">{comment?.sender?.username || "Anonymous"}</span>
                                            <p>{comment.comments}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <input type="text" className="comment-input" placeholder="Add a comment" value={comments[post._id] || ''}
                                onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') postcomment(post._id);
                                }} />
                        </div>
                    ))
                )}
            </div>

        </div>
    )

};
export default FeedPage;