import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdReadMore } from "react-icons/md";
import { CiSquareRemove } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

export default function Card({ movieData, isLiked = false }) {
   const [isHoverd, setIsHovered] = useState(false);
   const [email, setEmail] = useState(undefined);
   const navigate = useNavigate();

   // onAuthStateChanged(firebaseAuth, (currentUser) => {
   //   if (currentUser) setEmail(currentUser.email);
   //   else navigate("/login");
   // });
   // const addToList = async () => {
   //   try {
   //     await axios.post("http://localhost:5000/api/user/add", {
   //       email,
   //       data: movieData,
   //     });
   //   } catch (err) {
   //     console.log(err);
   //   }
   // };
   return (
      <Container
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <img src={movieData.imageUrl} alt="movies" />

         {isHoverd && (
            <div className="hover">
               <div className="image-vide-container">
                  <img
                     src={movieData.imageUrl}
                     alt="movies"
                     onClick={() => navigate("/player")}
                  />
                  <video autoPlay loop muted>
                     <source src={movieData.videoUrl} type="video/mp4" />
                  </video>
               </div>
               <div className="info-container felx column">
                  <h3 className="name" onClick={() => navigate("/player")}>
                     {movieData.name}
                  </h3>
                  <div className="icons flex j-between">
                     <div className="controls flex">
                        <MdReadMore
                           title="More Info"
                           onClick={() => navigate("/player")}
                        />
                     </div>
                     <div>
                        {isLiked ? (
                           <CiSquareRemove title="Remove From List" />
                        ) : (
                           <AiOutlinePlus title="Add to my list" />
                        )}
                     </div>
                  </div>
                  <div className="genres flex">
                     <ul className="flex">
                        {movieData?.genres?.map((genre) => (
                           <li key={genre}>{genre}</li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         )}
      </Container>
   );
}

const Container = styled.div`
   max-width: 230px;
   width: 230px;
   height: 100%;
   cursor: pointer;
   position: relative;
   img {
      border-radius: 0.2rem;
      width: 100%;
      z-index: 10;
   }
   .hover {
      z-index: 90;
      height: max-content;
      width: 20rem;
      position: absolute;
      top: -18vh;
      left: 0;
      border-radius: 0.3rem;
      box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
      background-color: #181818;
      transition: 0.3s ease-in-out;
      .image-vide-container {
         position: relative;
         height: 140px;
         img {
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: 0.3rem;
            top: 0;
            z-index: 4;
            position: absolute;
         }
         video {
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: 0.3rem;
            top: 0;
            z-index: 5;
            position: absolute;
         }
      }
      .info-container {
         padding: 1rem;
         gap: 0.5rem;
         /* .name{
      text-align: center;
    } */
      }
      .icons {
         padding: 1rem;
         .controls {
            display: flex;
            gap: 1rem;
         }
         svg {
            font-size: 2rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover {
               color: #b8b8b8;
            }
         }
      }
      .genres {
         ul {
            gap: 1rem;
            li {
               padding-right: 0.7rem;
               &:first-of-type {
                  list-style-type: none;
               }
            }
         }
      }
   }
`;
