import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    position: absolute;
    background-color: #fff;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    width: 8rem;
    height: auto;
    overflow: hidden;
    box-shadow: 0 1px 15px 0 black;

    & li {
        border-bottom: 1px solid #cacaca;
        width: 100%;
        padding-top: 5px

    }

    & li:hover {
        background-color: #cacaca;
        cursor: pointer;
    }

    & li:last-child {
        border: none;
    }

    & ul{
        list-style-type: none;
        width: 100%;
        padding: none;
        margin: none;
    }
`
const DropMenu = ({top, left, validate}) => {
    return (
        <StyledDiv top={top} left={left} >
            <ul>
                <li onClick={(e) => validate(e)}>Waldo</li>
                <li onClick={(e) => validate(e)}>Wilma</li>
                <li onClick={(e) => validate(e)}>Wizard</li>
                <li onClick={(e) => validate(e)}>Odlaw</li>
            </ul>
        </StyledDiv>
    )
}

export default DropMenu;