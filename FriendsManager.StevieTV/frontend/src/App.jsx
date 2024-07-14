import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./App.css"
import { FriendsList } from "./features/Friends/FriendsList"
import { AddFriendForm } from "./features/Friends/AddFriendForm"

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" Component={FriendsList} />
          <Route exact path="addFriend" Component={AddFriendForm} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
