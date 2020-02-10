import styled from 'styled-components';
import React from 'react';
import RowResponsive from './RowResponsive.js';




const SectionPanel = styled.div`
    &{
        background-color: white;
    }
    & hr{
        margin: 2px;
        border-top: 1px solid #33333320;
    }
`
const Title = styled.span`
    color: ${(props)=> props.color||"#333"};
    font-size: ${(props)=> props.fontSize||"1rem"};
`
function Section(props){

    

    return (
    <SectionPanel>
        <Title {...props}>{props.title}</Title>
        <hr/>
        <RowResponsive {...props}>{props.children}</RowResponsive>
    </SectionPanel>);

}

export default Section;