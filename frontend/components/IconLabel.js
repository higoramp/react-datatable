import React from 'react';
function IconLabel(props){
    const styleDefaultElement = {
        display: "flex",
        alignItems: "center",
        justifyContent: props.justify || "left",
        color: props.color,
        fontWeight: props.fontWeight
    }
    return (<span style={styleDefaultElement} key={props.value}>{(props.icon?props.icon():'')} <span key={props.value} style={{marginLeft: "2px", ...props.style}}>{props.value}</span></span>);

}

export default IconLabel;