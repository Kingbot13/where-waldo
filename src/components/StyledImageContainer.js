import styled from "styled-components"

export const StyledImageContainer = styled.div`
    height: 40vh;
    width: 40vw;
    overflow: hidden;
    border: 1px solid #cacaca;
    color: black;
    letter-spacing: 1px;
    font-size: 20px;
    &:hover{
        box-shadow: 0 1px 15px 0 #cacaca; 
        color: red;
    } 
    transition: box-shadow 1s;
    
`