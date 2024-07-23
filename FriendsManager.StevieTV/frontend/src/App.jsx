import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import { Navbar } from 'app/Navbar.jsx';
import { Categories } from 'features/Categories/Categories.jsx';
import { AddFriendForm } from 'features/Friends/AddFriendForm';
import { FriendsList } from 'features/Friends/FriendsList';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route exact={true} path="/"
            Component={FriendsList}
          />
          <Route exact={true} path="/categories"
            Component={Categories}
          />
          <Route exact={true} path="addFriend"
            Component={AddFriendForm}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
