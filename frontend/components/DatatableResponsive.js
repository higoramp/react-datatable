import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import './style.css';

import {DropdownButton} from './Button.js';


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
   position: relative;

`
const ButtonPage = styled.button`
&{
    width: 40px;
    height: 40px;
    background-color: #aae4de8a;
    border: none;
    outline: none;
    margin: 5px;
    box-shadow: 0px 0px 5px #333333;
    border-radius: 5px;
    color: white;
    transition: all 0.5;
}
&.selected {
  transform: scale(0.9);
  box-shadow: none;
  color: #333;
  box-shadow: inset 0px 0px 10px #33333370;
}
&.disabled {
  opacity: 0.2;
}
&:not(.disabled):not(.selected):hover{
  transform: scale(1.1);
}

&:not(.disabled):active {
  transform: scale(0.9);
}
`
const NavigatorPagesStyle = styled.div`
margin-top: 10px;


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

const TotalLabel = styled.div`
  text-align: left;
  color: white;
  font-size: var(--label-font-size);
  margin-top: 5px;
`




function DatatableResponsive(props) {

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(props.limit||10);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState({by: (props.orderby||"id"), asc: true});

  //pegando as chaves das colunas
  let columnsKeys = Object.keys(props.columns);
  //Separando apenas o que é importante para o estilo css, ou seja HideMobile, hideDEsktop e style
  let columnsStyles = Object.entries(props.columns).map(elem=>(({ hideMobile, hideDesktop, style }) => ({ hideMobile, hideDesktop, style: style||{}}))(elem[1]));
  //Pegando apenas os valores que serão mostrados
  let start=page*limit;
  let end =(page+1)*limit;
  let length = props.data.length;

  let patternLabel = props.patternLabel ||"Showing ${start+1} of ${end} of ${length} results";

  function atualizaData(){
      Promise.resolve(props.data.slice(start, end)).then((dataLoaded)=>{
        console.log("SET DATA", dataLoaded);
        setData(dataLoaded);
    });
  }
  //Criando uma promessa para tratar tanto listas normais, como a LazyList da mesma maneira
  useEffect(()=>{
      console.log("DATA PROPS", props.data.data);
    atualizaData();
  }, [page])

  useEffect(()=>{
    console.log("DATA PROPS", order);
    props.data.sort(order.by, order.asc);
    atualizaData();
  }, [order]);
  

  console.log("RENDER TABLE");
  return (
    <Table>
        {props.orderBy?(<DropdownButton color="var(--label-font-color)" label="Select an order" fontSize="0.7rem" actions={props.orderBy} 
                style={{right: "0px"}} onClick={(order)=>setOrder(order)}/>):''}
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
        
        {data.map((item, index)=>{
          

            return (
         
              <TableRow key={item.id||index} tabIndex={1} columns={columnsStyles}>
             
              {columnsKeys.map((columnHeader)=>{
                  
                  let columnDefinition = props.columns[columnHeader];
                  //Se não for composta, renderiza apenas ela mesma
                  let columnsRender= columnDefinition.composite || {[columnHeader]: props.columns[columnHeader]}; //Poderia usar Object destruction tbm (({})=>({[columnHeader]}))(props.columns), mas desse outro jeito é mais fácil de ler
                    return (<ConditionalDisplayWrapper onClick={columnDefinition.onClick?((event)=>columnDefinition.onClick(item.id)):''} hideMobile={columnDefinition.hideMobile} hideDesktop={columnDefinition.hideDesktop} key={columnHeader}>
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
    <TotalLabel>{eval("`"+patternLabel+"`")}</TotalLabel>
    <NavigatorPages npages={4} onClick={(page)=>setPage(page)}></NavigatorPages>
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

function NavigatorPages (props){
  let buttons = [];
  const [selected, setSelected] = useState(0);
  useEffect(()=>{
    props.onClick(selected);
  });

  for (let i=0;i<props.npages;i++){
    buttons.push((<ButtonPage className={selected==i?'selected':''} onClick={(event)=>changePage(i)}>{i+1}</ButtonPage>));
  }

  function changePage(newPage){
    switch (newPage){
      case "next":
        setSelected((selected<(props.npages-1)?selected+1:selected));
        console.log("NEEEXT");
      break;
      case "previous":
        setSelected(selected>0?(selected-1):selected);
      break;
      default:
        setSelected(newPage);
    }
  }

  return (<NavigatorPagesStyle>
    <ButtonPage className={selected<=0?'disabled':''} onClick={(event)=>changePage("previous")}>{"<"}</ButtonPage>{buttons}
    <ButtonPage className={selected>=(props.npages-1)?'disabled':''} onClick={(event)=>changePage("next")}>{">"}</ButtonPage>
  </NavigatorPagesStyle>);
}

function OrderBy (props){
  let buttons = [];
  const [selected, setSelected] = useState(0);
  useEffect(()=>{
    props.onClick(selected);
  });



  return (<NavigatorPagesStyle>
    <ButtonPage className={selected<=0?'disabled':''} onClick={(event)=>changePage("previous")}>{"<"}</ButtonPage>{buttons}
    <ButtonPage className={selected>=(props.npages-1)?'disabled':''} onClick={(event)=>changePage("next")}>{">"}</ButtonPage>
  </NavigatorPagesStyle>);
}

class LazyDataFetch {

  constructor (urlFetch, processData=(data)=>new Array(...data), order, asc){
    this.urlFetch = urlFetch;
    this.processData= processData;
    this.data = [];
    this.order = order;
    this.asc = asc;
    this.updateList = false;
    this.length=0;
  }
  slice(start, end){

    return new Promise((resolve, reject)=>{
      
      let newStart = start;
      if (this.updateList){
          //Desconsidera o que já foi feito o fetch
          this.data=[];
          this.updateList = false;
          newStart= 0;
      }
      if(end<=this.data.length){
        //Retornando do "cache"
        return resolve(this.data.slice(start, end));
      }else{
        return fetch(`${this.urlFetch}?_start=${newStart}&_end=${end}${this.order?('&_sort='+this.order):''}${this.asc?('&_asc='+this.asc):''}`)
          .then((response) => {
            this.length=response.headers.get("x-total-count");
            return response.json();})
          .then((users) => {
              console.log("DATA ANTES", this.data);
		    this.data.splice(newStart, (end-newStart), ...this.processData(users));
            console.log("DATA", this.data);
            return resolve(this.data.slice(start, end));//Retorna apenas o que foi pedido
          })
          .catch(err => {
              console.log('Fetch Error: ', err);
              return reject(err);
          });
      }
    });
    
      
  }

  sort(order, asc){
    if(this.order!=order||this.asc!=asc){
        this.order=order;
        this.asc= asc;
        this.updateList = true; //Para manter o controle dos dados que possui em "cache"
    }
      
  }

}

export default DatatableResponsive;
export {LazyDataFetch};