import styled from 'styled-components';
import React from 'react';
import RowResponsive from './RowResponsive.js';


//Just a simple Box Panel with some nice shadow
const BoxPanel = styled.div`
    &{
        box-shadow: 0px 0px 4px #333, 0px 0px 8px #33333360, 0px 0px 12px #33333340;
        padding: 15px;
        background-color: white;
        position: ${(props)=> props.position||'unset'};
        border-radius: 5px;
    }
`

function Box(props){
    return (<BoxPanel {...props}>{props.children}</BoxPanel>);
}

export default Box;