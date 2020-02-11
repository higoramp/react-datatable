import styled from 'styled-components';
import React, { useState } from 'react';

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
const DropWrapper = styled.div`
    &{
        position: relative;
        display: inline-block;
    }

    .button-dropdown:active + .dropdown-list, .button-dropdown:focus + .dropdown-list{
        display: block;
    }

    .dropdown-list.hide{
        display: none;
    }
    
    

`
const ActionsList = styled.ul`
    &{
        position: absolute;
        width: 100%;
        padding: 10px 0px;
        margin: 5px 0px;
        background-color: white;
        box-sizing: border-box;
        box-shadow: 1px 1px 3px #333, 0px 0px 8px #33333350;
        border-radius: 5px;
        font-size: 0.8rem;
        text-align: center;
        max-height: 100vh;
        transition: all 1s;
        text-align: end;
        
    }
 
    & li {
        text-decoration: none;
        list-style: none;
        padding: 10px;
        border-bottom: 1px solid #33333310;
        transition: all 0.5s;
    }

    & li:hover, & li:active {
        background: #cdd3e4 radial-gradient(circle, transparent 1%, #8aa3ea 1%) center/15000%;
    }

        
    }

    
`

function Button(props){
    const styleButton = {
        color: props.color,
        backgroundColor: props.backgroundColor || "#00796B",
        fontSize: props.fontSize
    }
    

    return (<ButtonStyle className={props.className} onClick={(event)=>props.onClick(props.value)} style={styleButton}>{props.label}</ButtonStyle>);

}

function DropdownButton(props){
    let actions = props.actions || [];
    const [show, showDropdown] = useState(false);
    const [selected, setSelected] = useState(null);
    
    function open(event){
        showDropdown(!show);
    }

    return (
        <div style={{textAlign: "right", position: "relative", display: "block"}}>
        <DropWrapper style={props.style}>
        <Button className="button-dropdown" onClick={open} label={(selected?selected:props.label)+" ▼"} color={props.color} fontSize={props.fontSize}/>
        <ActionsList className={(show?'':'hide')+" dropdown-list"}>
        {actions.map((action)=>{
            return (<li><a onClick={(event)=>{
                    showDropdown(false);
                    setSelected(action.label);
                    return props.onClick(action.value);
                }}>{action.label}</a></li>);
        })}
        </ActionsList>
    </DropWrapper></div>);
}

export default Button;
export {DropdownButton};