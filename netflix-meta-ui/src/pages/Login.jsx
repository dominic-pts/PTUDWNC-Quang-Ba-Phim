import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const [formValues, setFormValues] = useState({
      email: "",
      password: "",
   });
   const navigate = useNavigate();

   //khi bấm vào nút này sẽ lấy dữ liệu từ tk vs mk để
   const handleLogIn = () => {
      fetch("http://localhost:5000/users/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formValues),
      })
         .then((res) => res.json())
         .then((res) => {
            if (res.code === 1) {
               // hàm navigate chuyển hướng người dùng đến trang "/" (trang chủ).
               navigate("/");
            } else {
               alert(res.message);
            }
         });
   };

   return (
      <Container>
         <BackgroundImage />
         <div className="content">
            <Header />
            <div className="form-container flex column a-center j-center">
               <div className="form flex column a-center j-center">
                  <div className="title">
                     <h3>Login</h3>
                  </div>
                  <div className="container flex column">
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
                     <button onClick={handleLogIn}>Login</button>
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
}

const Container = styled.div`
   .content {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      height: 100vh;
      width: 100vw;
      display: grid;
      grid-template-rows: 15vh 85vh;
      .form-container {
         gap: 2rem;
         height: 85vh;
         .forgotpass {
            width: 100%;
            text-decoration: none;
            color: #b13f9e;
            font-size: 0.8rem;
            text-align: end;
         }
         .form {
            padding: 2rem;
            background-color: #000000b0;
            width: 25vw;
            gap: 2rem;
            color: white;
            border-radius: 0.5rem;
            .container {
               gap: 2rem;
               input {
                  padding: 0.5rem 1rem;
                  width: 15rem;
                  border-radius: 0.3rem;
                  border: none;
                  &:focus {
                     outline: none;
                  }
               }
               button {
                  padding: 0.5rem 1rem;
                  background-color: #e50914c3;
                  border: none;
                  cursor: pointer;
                  color: white;
                  border-radius: 0.3rem;
                  font-weight: bolder;
                  font-size: 1.05rem;
                  &:hover {
                     background-color: #e50914;
                  }
               }
            }
         }
      }
   }
`;
