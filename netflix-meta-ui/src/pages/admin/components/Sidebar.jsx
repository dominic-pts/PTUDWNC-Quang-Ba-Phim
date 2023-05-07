import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../admin/assets/img/logo.png";
import { RxDashboard } from "react-icons/rx";
import { FiUserCheck } from "react-icons/fi";
import { MdOutlineMovieFilter, MdLocalMovies } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  // const links = [
  //   { name: "Dashboard", link: "/dashboard", icon: "RxDashboard"},
  //   { name: "Manage user accounts", link: "/ManageUserAccounts", icon:"FiUserCheck" },
  //   { name: "Movie genre manager", link: "/movieGenreManager",icon:"MdOutlineMovieFilter" },
  //   { name: "Movie manager", link: "/movieManager",icon:"MdLocalMovies" },
  //   { name: "Admin info", link: "/" ,icon:"RiAdminFill"},
  //   { name: "Log out", link: "/",icon:"AiOutlineLogout" },
  // ];
  return (
    <Container>
      <div className="sidebars">
        <div className="sidebar__logo">
          <img src={logo} alt="company logo" />
        </div>
        <div className="sidebar_item">
          <Link
            className="sidebar__item"
            to={"/admin"}
            style={{ textDecoration: "none" }}
          >
            <div className={`sidebar__item-inner active`}>
              <RxDashboard className="sidebar__item-icon" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link
            className="sidebar__item"
            to={"/admin/user-manager"}
            style={{ textDecoration: "none" }}
          >
            <div className={`sidebar__item-inner `}>
              <FiUserCheck className="sidebar__item-icon" />
              <span>User manager</span>
            </div>
          </Link>
          <Link
            className="sidebar__item"
            to={"/admin/movie-type-manager"}
            style={{ textDecoration: "none" }}
          >
            <div className={`sidebar__item-inner `}>
              <MdOutlineMovieFilter className="sidebar__item-icon" />
              <span>Movie type manager</span>
            </div>
          </Link>
          <Link
            className="sidebar__item"
            to={"/admin/movie-manager"}
            style={{ textDecoration: "none" }}
          >
            <div className={`sidebar__item-inner `}>
              <MdLocalMovies className="sidebar__item-icon" />
              <span>Movie manager</span>
            </div>
          </Link>
          <Link
            className="sidebar__item"
            to={"/admin/profile"}
            style={{ textDecoration: "none" }}
          >
            <div className={`sidebar__item-inner `}>
              <RiAdminFill className="sidebar__item-icon" />
              <span>Profile</span>
            </div>
          </Link>
          <Link
            className="sidebar__item"
            to={"/adminLogin"}
            style={{ textDecoration: "none" }}
          >
            <div className={`sidebar__item-inner `}>
              <AiOutlineLogout className="sidebar__item-icon" />
              <span>Logout</span>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  /* background-color: white; */
  /* width: 100vw;
  height: 100vh; */
  .sidebars {
    background-color: white;
    min-width: 300px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    /* z-index: 100; */
    .sidebar__logo {
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sidebar__logo > img {
      height: 70px;
    }
    .sidebar_item {
      padding: 0 20px;
    }
    .sidebar__item {
      margin-top: 1rem;
      padding: 0 20px;
    }
    .sidebar__item-inner {
      padding: 15px 25px;
      display: flex;
      align-items: center;
      font-weight: 600;
      transition: color 0.3s ease 0s;
      color: #455560;
      border-radius: 15px;
      transition: 0.3s linear;
      span {
        text-transform: capitalize;
      }
      &:hover {
        background-image: linear-gradient(to right, #d68102, #fca11a);
        color: #fff;
        cursor: pointer;
      }
    }
    .sidebar__item-icon {
      margin-right: 10px;
      font-size: 1.5rem;
    }

    /* .sidebar__item-inner.active {
    border-radius: 15px;
    background-image: linear-gradient(to right, #d68102, #fca11a);
    color: #fff;
    } */
  }
`;
