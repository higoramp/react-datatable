import React, {useRef} from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';

import IconLabel from '../../components/IconLabel.js';
import {MailIcon, PersonIcon} from '../../components/MyIcons.js';
import DatatableResponsive from '../../components/DatatableResponsive.js';
import LazyDataFetch from '../../components/LazyDataFetch.js';
import Button from '../../components/Button.js';
import DetailBox from './DetailBox.js';

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


class HomePage extends React.Component {
  

    constructor(props){
        super(props);
        this.state={
            displayUsers: []

        };
        this.detailBox = React.createRef();
        this.lazyData= new LazyDataFetch(`${Koji.config.serviceMap.backend||"http://localhost:3001"}/users`, processDataUsers);
    
        this.columns={
            id: {label: "Id",  style:{ color: "var(--primary-text-color)", fontWeight: "bold", size: "minmax(0,60px)", justify: "center"}},
            firstName: {label: "Nome", hideMobile: true},
            lastName: {label: "Sobrenome", hideMobile: true},
            email: {label: "Email", hideMobile: true, style: { justify: "left", size: "minmax(0, 1.5fr)", icon: MailIcon}, renderFunc: IconLabel},
            acao: {label: "Ação", hideMobile: true,  composite: {id: {style:{size: "minmax(0, 0.5fr)", color: "white"}, renderFunc: (props)=>Button({...props, label: "Detalhes", onClick: this.detalhes.bind(this)})}}},
            detailUser: {label: "Detail",  composite: {name: {label: "Nome completo", renderFunc: IconLabel, style: {icon: PersonIcon}}, email: "email"},
            hideDesktop: true, style:{size: 'minmax(280px,1fr)'}, onClick: this.detalhes.bind(this) }
        }

        
    }

    detalhes(id){
      this.showDetail();
      this.setUser(this.lazyData.data.filter((item)=>item.id==id)[0]);
    }

    render() {
        
        return (
            <Container >
            
            <DatatableResponsive  limit={5} columns={this.columns} data={this.lazyData} patternLabel="Mostrando de ${start+1} até ${end} de ${length} usuários "
                orderBy={[{value: {by: "id", asc: true}, label:"Id crescente"}, {value: {by: "name", asc: true}, label:"Nome crescente"}]}
            />
            
            <DetailBox  refs={(show, hide, setUser)=>{this.showDetail= show; this.hideDetail= hide; this.setUser = setUser;}}  />
            </Container>
        );
    }
}

export default HomePage;
