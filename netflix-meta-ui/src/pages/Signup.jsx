import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

import { useNavigate } from "react-router-dom";
//Navigate,

export default function Signup() {
   const [showPassword, setShowPassword] = useState(false);
   const [formValues, setFormValues] = useState({
      email: "",
      password: "",
   });
   const navigate = useNavigate();

   //khi bấm vào nút này sẽ lấy dữ liệu từ tk vs mk để
   const handleSingIn = () => {
      const { email, password } = formValues;

      fetch("http://localhost:5000/users/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formValues),
      })
         .then((res) => res.json())
         .then((res) => {
            if (res.code === 1) {
               // hàm navigatechuyển hướng người dùng đến trang "/login" (trang đăng nhập).
               navigate("/login");
            } else {
               alert(res.message);
            }
         });
   };

   return (
      <Container showPassword={showPassword}>
         <BackgroundImage />
         <div className="content">
            <Header />
            <div className="body flex column a-center j-center">
               <div className="text flex column">
                  <h1>Unlimikted movides, TV shows and more</h1>
                  <h4>Watch anywhere. Cancel anytime</h4>
                  <h6>
                     Ready to watch? Enter your email to create or restart
                     membership
                  </h6>
               </div>
               <div className="form">
                  <input
                     type="email"
                     placeholder="Email Address"
                     name="email"
                     value={formValues.email}
                     onChange={(e) =>
                        setFormValues({
                           ...formValues,
                           [e.target.name]: e.target.value,
                        })
                     }
                  />
                  {showPassword && (
                     <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formValues.password}
                        onChange={(e) =>
                           setFormValues({
                              ...formValues,
                              [e.target.name]: e.target.value,
                           })
                        }
                     />
                  )}
                  {!showPassword && (
                     <button onClick={() => setShowPassword(true)}>
                        Get Started
                     </button>
                  )}
               </div>
               <button onClick={handleSingIn}>Sign Up</button>
            </div>
         </div>
      </Container>
   );
}

const Container = styled.div`
   position: relative;
   .content {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      height: 100vh;
      width: 100vw;
      display: grid;
      grid-template-rows: 15vh 85vh;
   }
   .body {
      gap: 1rem;
      .text {
         gap: 1rem;
         text-align: center;
         font-size: 1.5rem;
         h1 {
            padding: 0 25rem;
         }
      }

      .form {
         display: grid;
         grid-template-columns: ${({ showPassword }) =>
            showPassword ? "1fr 1fr" : "2fr 1fr"};
         width: 60%;
         input {
            color: black;
            border: none;
            padding: 1.5rem;
            font-size: 1.2rem;
            border: 1px solid black;
            &:focus {
               outline: none;
            }
         }

         button {
            padding: 0.5rem 1rem;
            background-color: var(--red-color-blu);
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
            &:hover {
               background-color: var(--red-color);
            }
         }
      }
      button {
         padding: 0.5rem 1rem;
         background-color: var(--red-color-blu);
         border: none;
         cursor: pointer;
         color: white;
         border-radius: 0.2rem;
         font-weight: bolder;
         font-size: 1.05rem;
         &:hover {
            background-color: var(--red-color);
         }
      }
   }
`;
