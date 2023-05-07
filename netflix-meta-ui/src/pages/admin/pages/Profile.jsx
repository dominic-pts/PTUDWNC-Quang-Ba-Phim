import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

export default function Profile() {
  return (
    <Container className="setBackGroud">
      <Sidebar /> 
      <h2 className="page_header">
        Profile
        </h2>
    </Container>
  );
}

const Container = styled.div`

`;
