import styled from 'styled-components';

 export const Button = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    height: 4rem;
    width: 8rem;
    border: 2px solid #cacaca;
    /* border-radius: 50px; */
    font-size: 25px;
    &:hover {
        border-color: red;
        color: red;
    }
    transition: border-color 1s, color 1s;
`
