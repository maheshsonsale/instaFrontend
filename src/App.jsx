import Register from "./pages/Register"
import Login from "./pages/Login"
import HomePage from "./pages/HomePage"
import CreatePost from "./pages/CreatePost"
import ProfilePage from "./pages/ProfilePage"
import FeedPage from "./pages/FeedPage"
import OtherPerson from "./pages/OtherPerson"
import './App.css'
import { Routes, Route } from "react-router-dom"
import SearchPage from "./pages/SearchPage"
import ProtectiveRoute from "./components/ProtectiveRoute"
import Chat from "./pages/Chat"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/" element={<ProtectiveRoute><HomePage /></ProtectiveRoute>} >
          <Route path="profile" element={<ProfilePage />} />
          <Route path="otherperson/:id" element={<OtherPerson />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="feedpage" element={<FeedPage />} />
          <Route path="chat" element={<Chat />} />
          <Route path="search" element={<SearchPage />} />
          <Route index  element={<FeedPage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
