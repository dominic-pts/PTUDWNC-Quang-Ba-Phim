import React from "react";
// dung de phân trang
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import UserLiked from "./pages/UserLiked";

import LoginAdmin from "./pages/admin/pages/LoginAdmin";
import Dashboard from "./pages/admin/pages/Admin";
import UserManager from "./pages/admin/pages/UserManager";
import MovieTypeMangager from "./pages/admin/pages/MovieTypeManager";
import MovieManager from "./pages/admin/pages/MovieManager";
import Profile from "./pages/admin/pages/Profile";

export default function App() {
   return ( 
      <BrowserRouter>
         <Routes>
            {/* User */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/player" element={<Player />} />
            <Route exact path="/movies" element={<Movies />} />
            <Route exact path="/tvshows" element={<TVShows />} />
            <Route exact path="/mylist" element={<UserLiked />} />
            {/* Admin */}
            <Route exact path="/adminLogin" element={<LoginAdmin />} />
            <Route exact path="/admin" element={<Dashboard />} />
            <Route exact path="/admin/user-manager" element={<UserManager />} />
            <Route exact path="/admin/movie-type-manager" element={<MovieTypeMangager />} />
            <Route exact path="/admin/movie-manager" element={<MovieManager />} />
            <Route exact path="/admin/profile" element={<Profile />} />
            <Route exact path="/" element={<Netflix />} />
         </Routes>
      </BrowserRouter>
   );
}
