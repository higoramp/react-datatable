import styled from 'styled-components';

//Just keeping all the styled basic components in one place
//Css variables used: --divider-color, --secondary-text-color, --secondary-text-size, --label-font-size, --label-font-color

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

`;
const Table = styled.div`
    width: 100%;
    position: relative;
`;
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
`;
const NavigatorPagesStyle = styled.div`
margin-top: 10px;
`;
const ConditionalDisplayWrapper = styled.div`
  padding: 20px;
  display: ${props=> props.hideMobile?'none':'grid'};
  @media(min-width: 600px){
    display: ${props => props.hideDesktop?'none': 'grid'};    
  }
`;
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

`;
const TotalLabel = styled.div`
  text-align: left;
  color: white;
  font-size: var(--label-font-size);
  margin-top: 5px;
`;


export {TableBody, Table, ButtonPage, NavigatorPagesStyle, ConditionalDisplayWrapper, TableRow, TableHeader, TotalLabel};