import "./App.css"

import { Navbar } from "app/Navbar.jsx"
import { Categories } from "features/Categories/Categories.jsx"
import { AddFriendForm } from "features/Friends/AddFriendForm"
import { FriendsList } from "features/Friends/FriendsList"
import { BrowserRouter, Route,Routes } from "react-router-dom"

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
