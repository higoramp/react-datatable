import styled from 'styled-components';
import React from 'react';




const Row = styled.div`
    &{
        padding: 10px;
        
        display: grid;

        grid-template-columns: ${(props)=>(new Array(props.nColumnSM).fill().map((elem, index)=>(props.templateColumn[index]+" ")))};

        @media(min-width: 600px) {
            grid-template-columns: ${(props)=>(new Array(props.nColumnMD).fill().map((elem, index)=>(props.templateColumn[index]+" ")))};
        }
        @media(min-width: 900px) {
            grid-template-columns: ${(props)=>(new Array(props.nColumnLG).fill().map((elem, index)=>(props.templateColumn[index]+" ")))};
        }

    }
`

function RowResponsive(props){
    //setting defaults;
    let nColumnLG = props.nColumns||1;
    let nColumnMD = props.nColumnMD?props.nColumnMD: nColumnLG;
    let nColumnSM = props.nColumnSM?props.nColumnSM: nColumnMD;
    
    //If template was not provided, the default is 1fr
    return (<Row templateColumn={props.templateColumn?props.templateColumn.split(" "): new Array(nColumnLG).fill('1fr')}
        nColumnLG={nColumnLG} nColumnMD={nColumnMD} nColumnSM={nColumnSM}>{props.children}</Row>);

}

export default RowResponsive;