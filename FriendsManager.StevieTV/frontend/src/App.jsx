import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./App.css"
import { Navbar } from "./app/Navbar.jsx"
import { FriendsList } from "./features/Friends/FriendsList"
import { AddFriendForm } from "./features/Friends/AddFriendForm"
import { Categories } from "./features/Categories/Categories"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route exact path="/" Component={FriendsList} />
          <Route exact path="/categories" Component={Categories} />
          <Route exact path="addFriend" Component={AddFriendForm} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
