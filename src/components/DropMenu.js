import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    position: absolute;
    background-color: #fff;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
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