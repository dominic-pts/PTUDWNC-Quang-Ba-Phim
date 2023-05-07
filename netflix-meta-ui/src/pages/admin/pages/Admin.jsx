import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

export default function Admin() {
   const [users, setUsers] = useState([]);
   const [movieTypes, setMovieTypes] = useState([]);
   const [movies, setMovies] = useState([]);

   useEffect(() => {
      Promise.all([getUsers(), getMovieTypes(), getMovies()]).then(
         ([usersResponse, movieTypesResponse, moviesResponse]) => {
            usersResponse.code === 1 && setUsers(usersResponse.data);
            movieTypesResponse.code === 1 && setMovieTypes(movieTypesResponse.data);
            moviesResponse.code === 1 && setMovies(moviesResponse.data);
         }
      );
   }, []);

   const getUsers = async () => {
      const res = await fetch("http://localhost:5000/users");
      return res.json();
   };
   const getMovieTypes = async () => {
      const res = await fetch("http://localhost:5000/movieTypes");
      return res.json();
   };
   const getMovies = async () => {
      const res = await fetch("http://localhost:5000/movies");
      return res.json();
   };

   return (
      <Container>
         <Sidebar />
         <h2 className="page_header">Dashboard</h2>
         <h3>Users: {users.length}</h3>
         <h3>Movie types: {movieTypes.length}</h3>
         <h3>Movies: {movies.length}</h3>
      </Container>
   );
}

const Container = styled.div`
   margin-left: 300px;
   background-color: white;
   width: 100vw;
   height: 100vh;
   color: black;
`;
