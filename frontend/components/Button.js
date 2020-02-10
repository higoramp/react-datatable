import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.div`
    &{
        display: inline-block;
        width: fit-content;
        padding: 10px 20px;
        border-radius: 10px;
        box-shadow: 1px 1px 4px #66666690, 0px 0px 6px #66666620;
        transition: all 0.5s;
    }

    &:hover{
        transform: scale(1.1);
    }

    &:active{
        transform: scale(0.9);
        box-shadow: none;
        
    }

`
function Button(props){
    const styleButton = {
        color: props.color,
        backgroundColor: props.backgroundColor || "#00796B",
    }
    

    return (<ButtonStyle onClick={(event)=>props.onClick(props.value)} style={styleButton}>{props.label}</ButtonStyle>);

}

export default Button;