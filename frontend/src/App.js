import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import DisplayMatch from './components/DisplayMatch/DisplayMatch';
import CreateParty from './components/CreateParty/CreateParty';
import SearchUsers from './components/SearchUsers/SearchUsers';
import DisplayUserProfile from './components/DisplayUserProfile/DisplayUserProfile';
import DisplayFriendRequests from './components/DisplayFriendRequests/DisplayFriendRequests';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Login />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/getMatch" element={ <DisplayMatch />} />
          <Route path="/createParty" element={ <CreateParty />} />
          <Route path="/searchUsers" element={<SearchUsers />} />
          <Route path="/getUserProfile/:userId" element={<DisplayUserProfile />} />
          <Route path="/getFriendRequests" element={<DisplayFriendRequests/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
