import styled from 'styled-components';
import React from 'react';
import RowResponsive from './RowResponsive.js';




const BoxPanel = styled.div`
    &{
        box-shadow: 0px 0px 4px #333, 0px 0px 8px #33333360, 0px 0px 12px #33333340;
        padding: 15px;
        background-color: white;
    }
`

function Box(props){

    

    return (<BoxPanel><RowResponsive {...props}>{props.children}</RowResponsive></BoxPanel>);

}

export default Box;