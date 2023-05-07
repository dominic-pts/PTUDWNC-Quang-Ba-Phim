import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import {FaUsers} from "react-icons/fa"
import {MdTypeSpecimen, MdLocalMovies} from "react-icons/md"
import {AiOutlinePercentage} from "react-icons/ai"
import { Link } from "react-router-dom";

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
     <>
    <Container>
      <Sidebar />
      <div class="row_4">
        <Link to={"/admin/user-manager"} style={{ textDecoration: 'none' }} class="row_row">
          <div class="status-card">
            <div class="status-card__icon">
            <FaUsers/>
            </div>
            <div class="status-card__info">
              <h4>{users.length}</h4>
              <span>Total Users</span>
            </div>
          </div>
        </Link>
        <Link to={"/admin/movie-type-manager"} style={{ textDecoration: 'none' }} class="row_row">
          <div class="status-card">
            <div class="status-card__icon">
             <MdTypeSpecimen/>
            </div>
            <div class="status-card__info">
              <h4>{movieTypes.length}</h4>
              <span>Total Movie Types</span>
            </div>
          </div>
        </Link>
        <Link to={"/admin/movie-manager"} style={{ textDecoration: 'none' }} class="row_row">
          <div class="status-card">
            <div class="status-card__icon">
              <MdLocalMovies/>
            </div>
            <div class="status-card__info">
              <h4>{movies.length}</h4>
              <span>Total Movies</span>
            </div>
          </div>
        </Link>
        <Link to={"/favourite"} style={{ textDecoration: 'none' }} class="row_row">
          <div class="status-card">
            <div class="status-card__icon">
              <AiOutlinePercentage/>
            </div>
            <div class="status-card__info">
              <h4>89</h4>
              <span>Total Favourite</span>
            </div>
          </div>
        </Link>
      </div>
    </Container>
     </> 
  );
}

const Container = styled.div`
  margin-left: 300px;
  background-color: white;
  width: 100%;
  height: 100vh;
  color: black;
  gap: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .row_4 {
   
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 2rem;
    gap: 2rem;
    width: 600px;
    margin-left: -300px
    
  }
  .row_row {
   color: #455560;
      &:hover{
        color:  #d68102;
        cursor: pointer;
      }
    }
  .status-card {
    width: 15rem;
    padding: 30px;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.5s ease 0s;
    margin-bottom: 30px;
    .status-card__icon {
      width: 30%;
      height: 100%;
      font-size: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 1rem;
      z-index: 1;
      .status-card__info {
        flex-grow: 1;
        text-align: center;
        z-index: 1;
        text-transform: capitalize;
      }
    }
  }
`;
