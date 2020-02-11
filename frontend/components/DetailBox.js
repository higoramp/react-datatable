import styled from 'styled-components';
import React, { useState} from 'react';
import Box from './Box.js';
import Section from './Section.js';
import IconLabel from './IconLabel.js';
import {MailIcon, PersonIcon, FingerprintIcon, WebIcon, PhoneIcon} from './MyIcons.js';


const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media(min-width: 600px) {
        justify-content: flex-end;
    }
    
    margin-right: 5px;
    color: #999;
    font-size: 0.7rem;
`
const DetailBoxStyle = styled.div`
    &{
       transition: all 0.7s;
       position: absolute;
       visibility: visible;
    }

    &.hide{
        transform: translateX(100vw);
        visibility: hidden;
    }
`
const CloseButton = styled.button`
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: transparent;
    border: none;

`
const styleLabelIcon = {
    color: "#333",
    fontSize: "1.1rem",
    margin: "5px 0px 10px 5px",
    textAlign: "left"

}


function DetailBox(props){
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState(props.user);

    function showDetailBox(){
        setVisible(true);
    }

    function hideDetailBox(){
        setVisible(false);
    }

    if(props.refs){
        props.refs(showDetailBox, hideDetailBox, setUser);
    }

    return (
        <DetailBoxStyle  className={visible?'':'hide'}>
            <Box position="relative">
                <CloseButton onClick={hideDetailBox}>X</CloseButton>
                <Section title={`Dados do usuário - ID: ${user.id}`} templateColumn="1fr 3fr 1fr 3fr" nColumns={4} nColumnMD={2} nColumnSM={1}>
                    <Label>Nome:</Label>
                    <IconLabel style={styleLabelIcon} icon={PersonIcon} value={user.name}/>
                    <Label>Usuário:</Label>
                    <IconLabel  style={styleLabelIcon} icon={FingerprintIcon} value={user.username}/>
                    <Label>Email:</Label>
                    <IconLabel  style={styleLabelIcon} icon={MailIcon} value={user.email}/>
                    <Label>Telefone:</Label>
                    <IconLabel  style={{...styleLabelIcon, fontSize: "0.9rem"}} icon={PhoneIcon} value={user.phone}/>
                    <Label>Website:</Label>
                    <IconLabel  style={styleLabelIcon} icon={WebIcon} value={user.website}/>
                </Section>

                <Section title={`Dados da empresa`} templateColumn="1fr 3fr 1fr 3fr" nColumns={4} nColumnMD={2} nColumnSM={1}>
                    <Label>Nome:</Label>
                    <IconLabel style={styleLabelIcon}  value={user.company.name}/>
                    <Label>Slogan:</Label>
                    <IconLabel  style={styleLabelIcon} value={user.company.catchPhrase}/>
                    <Label>Ramo:</Label>
                    <IconLabel  style={styleLabelIcon}  value={user.company.bs}/>
                
                </Section>

        
        </Box></DetailBoxStyle>);
}

export default DetailBox;