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
const ActionsList = styled.ul`
    &{
        position: absolute;
        width: 100%;
        padding: 10px;
        margin: 5px 0px;
        background-color: white;
        box-sizing: border-box;
        box-shadow: 1px 1px 3px #333, 0px 0px 8px #33333350;
        border-radius: 5px;
        font-size: 0.8rem;
        text-align: center;
        
    }
    & li {
        text-decoration: none;
        list-style: none;
        padding: 10px;
        border-bottom: 1px solid #33333310;
}

        
    }

    
`

function Button(props){
    const styleButton = {
        color: props.color,
        backgroundColor: props.backgroundColor || "#00796B",
        fontSize: props.fontSize
    }
    

    return (<ButtonStyle onClick={(event)=>props.onClick(props.value)} style={styleButton}>{props.label}</ButtonStyle>);

}

function DropdownButton(props){
    let actions = props.actions || [];
    
    return (<div style={{textAlign: "right", position: "absolute", display: "inline-block", ...props.style}}>
        <Button onClick={(event)=>props.onClick(props.value)} label={props.label} color={props.color} fontSize={props.fontSize}/>
        <ActionsList>
        {actions.map((action)=>{
            return (<li><a onClick={(event)=>props.onClick(action.value)}>{action.label}</a></li>);
        })}
        </ActionsList>
    </div>);
}

export default Button;
export {DropdownButton};