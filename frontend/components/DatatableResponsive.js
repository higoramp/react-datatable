import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import './style.css';

import {DropdownButton} from './Button.js';

import {TableBody, Table, ButtonPage, NavigatorPagesStyle, ConditionalDisplayWrapper, TableRow, TableHeader, TotalLabel} from './DataResponsiveStyles.js';


//Core component, where the magic happens :)
//
function DatatableResponsive(props) {

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(props.limit||10);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState({by: (props.orderby||"id"), asc: true});

  //getting keys from columns
  let columnsKeys = Object.keys(props.columns);
  //getting only the values that matters  to css, that is  HideMobile, hideDEsktop abd style
  let columnsStyles = Object.entries(props.columns).map(elem=>(({ hideMobile, hideDesktop, style }) => ({ hideMobile, hideDesktop, style: style||{}}))(elem[1]));
  //What should be displayed on Table
  let start=page*limit;
  let end =(page+1)*limit;
  let length = props.data.length;
  //A Template string can be passed customize that label
  let patternLabel = props.patternLabel ||"Showing ${start+1} of ${end} of ${length} results";

  function updateData(){
      //Creating a Promise, so even a normal list should be async as is with LazyDataFetch
      Promise.resolve(props.data.slice(start, end)).then((dataLoaded)=>{
        setData(dataLoaded);
    });
  }


  useEffect(()=>{
    updateData();
  }, [page])

  useEffect(()=>{
    props.data.sort(order.by, order.asc);
    updateData();
  }, [order]);
  

  return (
    <Table>
        {props.orderBy?(<DropdownButton color="var(--label-font-color)" label="Select an order" fontSize="0.7rem" actions={props.orderBy} 
                style={{right: "0px"}} onClick={(order)=>setOrder(order)}/>):''}
        <TableHeader columns={columnsStyles}>
            {columnsKeys.map((columnHeader)=>{

                  let columnObj = props.columns[columnHeader];
                  //Header shows only on big Screens 
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
                  //If the column is not a composite column, just renders itself
                  let columnsRender= columnDefinition.composite || {[columnHeader]: props.columns[columnHeader]}; //Poderia usar Object destruction tbm (({})=>({[columnHeader]}))(props.columns), mas desse outro jeito é mais fácil de ler
                    return (<ConditionalDisplayWrapper onClick={columnDefinition.onClick?((event)=>columnDefinition.onClick(item.id)):null} hideMobile={columnDefinition.hideMobile} hideDesktop={columnDefinition.hideDesktop} key={columnHeader}>
                    {            
                        Object.keys(columnsRender).map((columnKey)=>{
                            //Cheks if was passed only a name of a column or a new definition
                            let columnObj = props.columns[columnsRender[columnKey]]||columnsRender[columnKey];
                            //If a render Function wasn't set, use the DefaultTableElement   
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
    <NavigatorPages npages={Math.ceil(length/limit)} onClick={(page)=>setPage(page)}></NavigatorPages>
    </Table>
  );
}

//A default table element, used for column header and simple itens
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
    buttons.push((<ButtonPage key={i} className={selected==i?'selected':''} onClick={(event)=>changePage(i)}>{i+1}</ButtonPage>));
  }

  function changePage(newPage){
    switch (newPage){
      case "next":
        setSelected((selected<(props.npages-1)?selected+1:selected));
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


export default DatatableResponsive;