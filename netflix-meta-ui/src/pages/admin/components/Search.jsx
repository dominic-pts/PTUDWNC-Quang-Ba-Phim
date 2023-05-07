import React from 'react'
import styled from 'styled-components'
import {AiOutlineSearch} from 'react-icons/ai'
export default function Search() {
  return (
    <Container >
        <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <AiOutlineSearch className='icon'/>
            </div>
    </Container>
  )
}
const Container = styled.div`
    padding: 1.5rem 2rem;
.topnav__search{
    position: relative;
    width: 17.5rem;
    height: 50px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 15px;
    overflow: hidden;
}

.topnav__search > input {
    height: 100%;
    width: 100%;
    padding: 10px 60px 10px 20px;
    font-size: 1rem;
    border-radius: 15px;
    color: #455560;
    background-color: #ffffff;
    outline-color: #349eff;
    outline-width: 10px;
    border: none ;
}
.icon {
    font-size: 1.5rem;
    position: absolute;
    right: 20px;
} 

`;