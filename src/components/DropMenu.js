import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    position: absolute;
    z-index: 1;
    background-color: #fff;
    top: props.top;
    left: props.left;
`
const DropMenu = ({top, left}) => {
    return (
        <StyledDiv top={top} left={left} >
            <ul>
                <li>Waldo</li>
                <li>Wilma</li>
                <li>Wizard</li>
                <li>Odlaw</li>
            </ul>
        </StyledDiv>
    )
}

export default DropMenu;