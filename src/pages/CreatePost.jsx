import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import "../css/CreatePost.css"; // Optional for styling
import { BackPath } from "../components/BackendPath";
function CreatePost() {
  const navigate=useNavigate()
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [preview,setPreview]=useState(null)
    const [image,setImage]=useState("")
    //************************************************************************************************ */
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🚀 Form submitted");
        if (!content.trim()) {
            setMessage("Post content cannot be empty.");
            return;
        }
        setMessage("")
        setImage("")
          navigate('/home/profile')
        
        try {
            axios.post(`${BackPath}/createpost`, { content,image:image }, { withCredentials: true });
            setContent("")
            setMessage("✅ Post created successfully!");
        } catch (error) {
            console.error("Post creation failed:", error);
            setMessage("❌ Failed to create post.");
        }
    };

    function handleImageChange(e){
        const file=e.target.files[0];
        setPreview(URL.createObjectURL(file))   //to show image on screen when select image 

        const data=new FormData()
        data.append("file",file)
        data.append("upload_preset","chat-app")

        axios.post( 'https://api.cloudinary.com/v1_1/dzmmp468g/image/upload',data).then((res)=>{
            setImage(res.data.secure_url)
        }).catch((err)=>{
            console.log(err);
        })
    }
// ********************************************** jsx starts here ***************************************************
    return (
         <div className="create-post-container">
      <h2>📝 Create a New Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          placeholder="What are you thinking....."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
        ></textarea>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: '150px', marginTop: '10px', borderRadius: '8px' }}
          />
        )}

        <button type="submit">Post</button>
      </form>
      <p className="message">{message}</p>
    </div>
    );
}

export default CreatePost;
