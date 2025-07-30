import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../css/SearchPage.css'
import { BackPath } from '../components/BackendPath'

function SearchPage() {
    const navigate = useNavigate()
    const [loggedInUser, setLoggedInUser] = useState('')
    const [search, setSearch] = useState('')
    const [profiles, setProfiles] = useState([])


    useEffect(() => {
        const serchHandler = () => {
            axios.post(`${BackPath}/search`, { search: search }, { withCredentials: true }).then((res) => {
                setProfiles(res.data.users);
                setLoggedInUser(res.data.logUserId)
            }).catch((error) => {
                console.log(error);
            })
        };

        const delayDebounce = setTimeout(() => {
            if (search.trim() !== '') {
                serchHandler();
            } else {
                setProfiles([]); // Clear if input is empty
            }
        }, 500); // delay in ms (500ms = half a second)

        return () => clearTimeout(delayDebounce); // cleanup on next render
    }, [search]);


    function renderOtherProfile(frontuser) {
        if (frontuser._id == loggedInUser) {
            navigate('/home/profile')
        } else {
            navigate(`/home/otherperson/:${frontuser.username}`, {
                state: {
                    userdata: frontuser
                }
            })
        }
    }
    return (
        <div className='main-container'>
            <div className='search-container'>
                <div className='header'>
                    <h2 style={{ color: 'white' }}>Search</h2>
                    <input className='search-inp' type="text" placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    <hr />
                </div>
                <div className='profiles-container'>
                    {profiles && (
                        profiles.map((profile) => (

                            <div key={profile._id} onClick={() => { renderOtherProfile(profile) }} style={{ cursor: 'pointer' }} >
                                <img
                                    src={profile.pic ? profile.pic : "https://i.pravatar.cc/150?img=10"}
                                    alt="User"
                                    className="profile-pic"
                                />
                                <div>
                                    <h2 className="username">{profile.username}</h2>
                                    <p id='fullname'>{profile.fullname}</p>
                                </div>
                            </div>

                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage