import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";


export default function Movies() {
  return (
    <Container>
      <Navbar />
      <div className="content flex column">
        <h1>Movies</h1>
        </div>
    </Container>
  );
}

const Container = styled.div`
.content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: .5rem;
    }
  }
`;
