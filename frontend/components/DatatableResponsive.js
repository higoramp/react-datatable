import React, { useState } from 'react';
import styled from 'styled-components';
import './style.css';


const TableBody = styled.div`
    
    &{
        width: 100%;
        border-radius: 5px;

        @media(min-width: 600px) {
            overflow: hidden;
            background-color: #FFFFFF;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.05), 0 6px 12px rgba(0,0,0,0.02), 0 10px 10px 6px rgba(0,0,0,0.01);
        }
    }


`
const Table = styled.div`
  width: 100%;

`
const ConditionalDisplayWrapper = styled.div`
  padding: 20px;
  display: ${props=> props.hideMobile?'none':'grid'};
  @media(min-width: 600px){
    display: ${props => props.hideDesktop?'none': 'grid'};    
  }
`
const TableRow = styled.div`
  &{
    display: grid;

    grid-template-columns: ${(props)=>props.columns.filter(elem=>!elem.hideMobile).map(elem=>(elem.style.size||'minmax(0,1fr)')+" ")};
    background-color: #FFFFFF;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.05), 0 6px 12px rgba(0,0,0,0.02), 0 10px 10px 6px rgba(0,0,0,0.01);
    margin: 10px 0px;
    border-radius: 5px;
    border-bottom: 1px solid var(--divider-color);
    color: var(--secondary-text-color);
    font-size: var(--secondary-text-size);
    @media(min-width: 600px) {
        grid-template-columns: ${props=>props.columns.filter(elem=>!elem.hideDesktop).map(elem=>(elem.style.size||'minmax(0,1fr)')+" ")};
        margin: 0px;
        border-radius: 0px;
        box-shadow: none;
    }
    transition: all 0.1s;
  }
  &:active{
    background: #cdd3e4 radial-gradient(circle, transparent 1%, #8aa3ea 1%) center/15000%;
  }

   &:focus{
    background: #cdd3e4 radial-gradient(circle, transparent 1%, #b3cac7 1%) center/15000%;
    border-left: 5px solid #FFC107;
    outline: none;
  }
`;

const TableHeader = styled(TableRow)`
  &{
    background-color: transparent;
    font-size: var(--label-font-size);
    color: var(--label-font-color);
  }
  &:active{
    background: initial;
  }

`

function DatatableResponsive(props) {

  const {page, setPage}= useState(0);
  
  //getting the key values of columns
  let columnsKeys = Object.keys(props.columns);
  let columnsStyles = Object.entries(props.columns).map(elem=>(({ hideMobile, hideDesktop, style }) => ({ hideMobile, hideDesktop, style: style||{}}))(elem[1]));

  //For performance purposes, since all rows should be with same columns props

  return (
    <Table>
    
        <TableHeader columns={columnsStyles}>
            {columnsKeys.map((columnHeader)=>{

                  let columnObj = props.columns[columnHeader];
                  //Renderizando o Header ta tabela primeiro, que irá aparecer de acordo com as config de HideMobile e hideDesktop  
                  return (  <ConditionalDisplayWrapper hideMobile={true} hideDesktop={columnObj.hideDesktop} key={columnHeader} >
                                {DefaultTableElement({value: columnObj.label})}
                            </ConditionalDisplayWrapper>);
                
              })}
          </TableHeader>

    <TableBody>
        
        {props.data.map((item, index)=>{


            return (
         
              <TableRow key={item.id||index} tabIndex={1} columns={columnsStyles}>
             
              {columnsKeys.map((columnHeader)=>{
                  
                  let columnDefinition = props.columns[columnHeader];
                  //Se não for composta, renderiza apenas ela mesma
                  let columnsRender= columnDefinition.composite || {[columnHeader]: props.columns[columnHeader]}; //Poderia usar Object destruction tbm (({})=>({[columnHeader]}))(props.columns), mas desse outro jeito é mais fácil de ler
                    return (<ConditionalDisplayWrapper hideMobile={columnDefinition.hideMobile} hideDesktop={columnDefinition.hideDesktop} key={columnHeader}>
                    {            
                        Object.keys(columnsRender).map((columnKey)=>{
                            //verifica se foi passado um nome de outra coluna ou a propria definição de uma columna
                            let columnObj = props.columns[columnsRender[columnKey]]||columnsRender[columnKey];
                            console.log("RENDER", columnKey);
                            //Se não f=possuir uma função para renderização, usa o Elemento padrão    
                            let renderFunc= columnObj.renderFunc|| DefaultTableElement;
                            return renderFunc({value: item[columnKey], ...columnObj.style, ...item[columnKey]});   
                        })    
                    }
                  
                </ConditionalDisplayWrapper>);
            }
            )}
            </TableRow>);
            
        })}
    </TableBody>

    </Table>
  );
}




function DefaultTableElement(props){
    const styleDefaultElement = {
        display: "flex",
        alignItems: "center",
        justifyContent: props.justify || "left",
        color: props.color,
        fontWeight: props.fontWeight
    }

    return (<span key={props.value} style={styleDefaultElement}>{props.value}</span>);

}

export default DatatableResponsive;