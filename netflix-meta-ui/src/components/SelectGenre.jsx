import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function SelectGenre({ genres, type }) {
    const dispatch = useDispatch();
  return (
    
    <Select className="flex" onChange={ () => {} }>
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            Genre : {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
margin-left: 3rem;
cursor: pointer;
font-size: 1.4rem;
background-color: rgba(0,0,0,0.4);
color: white;
outline-style: none;
option{
  color: red
}
`;
