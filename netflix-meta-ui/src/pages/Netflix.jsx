import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieLogo from "../assets/homeTitle.webp";
import backgroundImage from "../assets/home.jpg";
// import { FaPlay } from "react-icons/fa";
// import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";

export default function Netflix() {
   // const navigate = useNavigate();

   const [movies, setMovies] = useState([]);

   useEffect(() => {
      fetch("http://localhost:5000/movies/")
         .then((res) => res.json())
         .then((res) => {
            if (res.code === 1) {
               setMovies(res.data);
            }
         });
   }, []);


   return (
      <Container>
         <Navbar />
         <div className="hero">
            <img
               src={backgroundImage}
               alt="background"
               className="background-image"
            />

            <div className="container">
               <div className="logo">
                  <img src={MovieLogo} alt="Movie Logo" />
               </div>
               <div className="buttons ">
                  {/* <button
                     className="flex j-center a-center"
                     onClick={() => navigate("/movies/:id")}
                  >
                     <FaPlay /> Play
                  </button> */}
                  {/* <button className="flex j-center a-center">
                     <AiOutlineInfoCircle /> More Info
                  </button> */}
               </div>
            </div>
         </div>
         <Slider movies={movies} />
      </Container>
   );
}

const Container = styled.div`
   background-color: black;
   .hero {
      position: relative;
      .background-image {
         filter: brightness(60%);
      }
      img {
         width: 100vw;
         height: 100vh;
      }
      .container {
         position: absolute;
         bottom: 5rem;
         .logo {
            img {
               width: 100%;
               height: 100%;
               margin-left: 5rem;
            }
         }
         .buttons {
            margin: 5rem;
            gap: 2rem;
            button {
               font-size: 1.4rem;
               gap: 1rem;
               border-radius: 0.2rem;
               padding: 0.5rem 2.4rem 0.5rem 2rem;
               border: none;
               cursor: pointer;
               transition: 0.3s ease-in-out;
               &:hover {
                  opacity: 0.8;
               }
               &:nth-of-type(2) {
                  background-color: rgba(109, 109, 110, 0.7);
                  color: white;
                  svg {
                     font-size: 1.8rem;
                  }
               }
            }
         }
      }
   }
`;
