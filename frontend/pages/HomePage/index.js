import React from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';

import IconLabel from '../../components/IconLabel.js';

import {MailIcon, PersonIcon} from '../../components/MyIcons.js';

import DatatableResponsive, {LazyDataFetch} from '../../components/DatatableResponsive.js';

import Button from '../../components/Button.js';

import DetailBox from '../../components/DetailBox.js';


const users = require('../../data/users.json');

import {processDataUsers} from '../../common/Utils.js';

const Container = styled.div`
 :root{
   --divider-color: grey;
 }
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    padding: 20px;
    @media(min-width: 1024px) {
      padding: 20px 100px;
    }
    text-align: center;
    background-color: #5f7774;

`;



function detalhes(id){
  console.log("CALLBACK", id);
}
//Escondendo firstname, lastname e email pq será mostrado na coluna detailUser
const columns={
    id: {label: "Id",  style:{ color: "var(--primary-text-color)", fontWeight: "bold", size: "minmax(0,60px)", justify: "center"}},
    firstName: {label: "Nome", hideMobile: true},
    lastName: {label: "Sobrenome", hideMobile: true},
    email: {label: "Email", hideMobile: true, style: { justify: "left", size: "minmax(0, 1.5fr)", icon: MailIcon}, renderFunc: IconLabel},
    acao: {label: "Ação", hideMobile: true,  composite: {id: {style:{size: "minmax(0, 0.5fr)", color: "white"}, renderFunc: (props)=>Button({...props, label: "Detalhes", onClick: detalhes})}}},
    detailUser: {label: "Detail",  composite: {name: {label: "Nome completo", renderFunc: IconLabel, style: {icon: PersonIcon}}, email: "email"}, hideDesktop: true, style:{size: 'minmax(280px,1fr)'}}
}
const limitPage = 5;
console.log(users.length);
const userMapped = users.map(user=>(({id, name, email})=>({id, name, firstName: name.split(" ")[0], lastName: name.split(" ")[1], email}))(user));
console.log("users:",userMapped);

class HomePage extends React.Component {


    constructor(props){
        super(props);
        this.state={
            displayUsers: []

        };
        this.lazyData= new LazyDataFetch(`${Koji.config.serviceMap.backend}/users`, processDataUsers);
    }
    componentDidMount() {

        console.log("CONFIG", Koji.config);
    }

    render() {
        
        console.log("RENDER INDEX");
        return (
            <Container>
            
            <DatatableResponsive limit={5} columns={columns} data={this.lazyData} patternLabel="Mostrando de ${start+1} até ${end} de ${length} usuários "
                orderBy={[{value: {by: "id", asc: true}, label:"Id crescente"}, {value: {by: "name", asc: true}, label:"Nome crescente"}]}
            />
            
            <DetailBox user={users[0]}/>
            </Container>
        );
    }
}

export default HomePage;
