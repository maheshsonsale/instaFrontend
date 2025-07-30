
import React, { useState, useEffect } from 'react';
import '../css/PopupUpdateProfile.css'
import axios from 'axios'

function PopupUpdateProfile({ close }) {

  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [mobile, setMobile] = useState('')
  const [bio, setBio] = useState('')



  useEffect(() => {
    axios.get('http://localhost:5000/getUserDetail',{withCredentials:true}).then((res) => {
      setFullname(res.data.fullname || '')
      setUsername(res.data.username || '')
      setMobile(res.data.mobile || '')
      setBio(res.data.bio || '')

    }).catch((error) => {
      console.log("unable to get user detail",error);
    })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.patch('http://localhost:5000/updateUserDetail', { fullname, username, mobile, bio }, { withCredentials: true })
      close()
      alert("detail updated")
    } catch (error) {
      console.log(error.message);
    }

  };

  return (
    <div className="popup-form-wrapper">
      <div className="popup-overlay" id="popup-overlay">
        <div className="popup-box" id="popup-box">
          <h2 className="popup-title">Update Details</h2>
          <form  className="popup-form" onSubmit={handleSubmit}>
            <div className="popup-form-field" id="field-username">
              <label htmlFor="fullname">fullName:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}

              />
            </div>
            <div className="popup-form-field" id="field-username">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="popup-form-field" id="field-biodata">
              <label htmlFor="biodata">Biodata:</label>
              <textarea
                id="biodata"
                name="biodata"
                value={bio}
                onChange={(e) => setBio(e.target.value)}

              />
            </div>

            <div className="popup-form-field" id="field-mobile">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                pattern="[0-9]{10}"
              />
            </div>

            <div className="popup-buttons">
              <button type="submit" className="popup-submit-btn">Submit</button>
              <button
                type="button"
                onClick={close}
                className="popup-cancel-btn"
              >
                X
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default PopupUpdateProfile;
