import '../css/Post.css'
import React from 'react'

function Posts({
    posts,
    activeCommentPostId,
    comments,
    renderOtherUser,
    handleLike,
    handleCommentClick,
    handleCommentChange,
    postcomment,
}) {
    return (
        <div>
            <div className="insta-feed-container">
                {posts?.length === 0 ? (
                    <p className="insta-no-posts">No posts available</p>
                ) : (
                    posts?.map((post) => (
                        <div className="insta-post-card" key={post._id}>
                            <div className="insta-post-header">
                                <div className="insta-post-user-info" onClick={() => renderOtherUser(post?.userid)}>
                                    <img
                                        src={post?.userid?.pic || `https://avatars.dicebear.com/api/identicon/${Math.random().toString(36).substring(7)}.svg`}
                                        alt="User"
                                        className="insta-post-user-pic"
                                    />
                                    <span className="insta-post-username">
                                        {post.userid?.username || "Anonymous"}
                                    </span>
                                </div>
                                <span className="insta-post-time">
                                    {new Date(post.createdAt).toLocaleString()}
                                </span>
                            </div>

                            {post.image && (
                                <img
                                    className="insta-post-img"
                                    src={post.image}
                                    alt="Post"
                                />
                            )}

                            <div className="insta-post-content">{post.content}</div>

                            <div className="insta-post-actions">
                                <div className="insta-like-btn">
                                    <button className="insta-action-btn" onClick={() => handleLike(post._id)}>
                                        🧡 {post.likeunlike} {post.likes.length}
                                    </button>
                                </div>
                                <div className="insta-comment-btn">
                                    <button className="insta-action-btn" onClick={() => handleCommentClick(post._id)}>
                                        💬 {activeCommentPostId === post._id ? 'Hide ' : 'View all'} {post?.commentids.length} Comments
                                    </button>
                                </div>
                            </div>

                            {activeCommentPostId === post._id && (
                                <div className="insta-comment-list">
                                    {(post.commentids || []).map((comment) => (
                                        <div
                                            className="insta-comment"
                                            key={comment._id}
                                            onClick={() => renderOtherUser(comment?.sender)}
                                        >
                                            <img
                                                className="insta-comment-user-pic"
                                                src={comment?.sender?.pic || `https://avatars.dicebear.com/api/identicon/${Math.random().toString(36).substring(7)}.svg`}
                                                alt="User"
                                            />
                                            <span className="insta-comment-username">
                                                {comment?.sender?.username || "Anonymous"}
                                            </span>
                                            <p className="insta-comment-text">{comment.comments}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <input
                                type="text"
                                className="insta-comment-input"
                                placeholder="Add a comment"
                                value={comments[post._id] || ''}
                                onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') postcomment(post._id);
                                }}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Posts;
