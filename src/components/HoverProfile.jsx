import React from 'react'

function HoverProfile({ profile }) {
    return (
        <div style={{marginRight:'300px', width:'200px',height:'200px'}}>
            <div className="profile-header">
                <img className="profile-dp" src={profile.pic ? profile.pic : "https://i.pravatar.cc/150?img=10"} alt="No Image Found" style={{ cursor: "pointer" }} />

                <div className="profile-info">
                    <div className="username-section">
                        <h2>{profile?.username}</h2>

                        <div className="profile-stats">
                            <button >Edite Profile</button>
                            <button>View Archiev</button>
                            <p style={{ cursor: 'pointer' }}>⚙️</p>

                        </div>
                    </div>
                    <div className="profile-stats">
                        <span><strong>{profile?.posts?.length}</strong> posts</span>
                        <span><strong>{profile?.followers?.length}</strong> followers</span>
                        <span><strong>{profile?.following?.length}</strong> following</span>
                    </div>

                    <div className="bio">
                        <strong>{profile?.fullname}</strong><br />
                        <p>{profile?.bio}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HoverProfile