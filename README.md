
# Projeto teste para a empresa Inco Investimentos


## O objetivo do teste
Desenvolver uma webapp utilizando ReactJs como tecnologia e que tenha as seguintes funcionalidades:

* Receber dados de um endpoint REST e renderizar uma lista com as seguintes colunas: | Id | Nome | Sobrenome | Email | Idade | Ações | Obs.: Na coluna ações deve conter um botão.
* Implementar ordenação por id e/ou idade.
* Implementar paginação através dos parametros de URL _start e _end do endpoint REST com 5 itens por página.
* Fazer com que seja possível visualizar uma página com mais informações do usuário ao clicar no botão da coluna "Ações".
## Sobre o trabalho realizado

O foco do trabalho foi na criação de Componentes reutilizáveis e que sejam responsivos, tornando a experiência do usuário a melhor possível, seja no computador, tablet ou celular. 

## Deploy do projeto

### Com Docker
```
docker build -t inco .
docker run -p 3001:3001 -p 8080:8080 inco
npm start
```
Acesse http://localhost:8080/


### Sem docker

#### Frontend
```
npm install
npm start
```

#### Backend
```
npm install
npm start
```

## Demonstração

https://frontend-1ea2f790-5776-46ae-ae44-7fd01f3e91bf.koji-apps.com/

## Exemplo de uso do componente da Tabela Responsiva

```js
import  DatatableResponsive  from  'DatatableResponsive';

const columns = {
id: {
	label: "Id",
	style:{
		fontWeight: "bold",
		size: "minmax(0,60px)",
	}
},
firstName: {label: "Nome", hideMobile: true},
lastName: {label: "Sobrenome", hideMobile: true},
detailUser: {
	label: "Detail",
	composite: {
		name: {label: "Nome completo", renderFunc: IconLabel, style: {icon: PersonIcon}},
		email: "email"
		},
	hideDesktop: true, style:{size: 'minmax(280px,1fr)'}, onClick: this.detalhes.bind(this) }
};

const data = [
  {"id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz"},
  {"id": 2, "name": "Ervin Howell", "username": "Antonette", "email": "Shanna@melissa.tv"}
];

React.render(<DatatableResponsive limit={5} columns={columns} data={data}/>);
```
##  Componentes desenvolvidos

* Box
* Button, DropdownButton
* [DatatableResponsive](#DatatableResponsive), TableRow, DefaultTableElement
* IconLabel
* LazyDataFetch
* RowResponsive
* Section


## DatatableResponsive
Tabela criada com o objetivo de ser responsiva. Apresentar ao usuário o máximo de informações independente do tipo de dispositivo.

### Propriedades do DatatableResponsive

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| limit | Number | 10| Limita a quantidade de itens por página|
| orderby | Object| {by: "id", asc: true}| Ordem que será mostrado os resultados. Objeto contendo atributo **by**(String) e **asc**(boolean)|
| columns | Object| | Descrição das colunas, conforme exemplo|
| data | List `|` LazyDataFetch| | Dados a serem apresentados na tabela|
| patternLabel | String |Showing ${start+1} of ${end} of ${length} results | Template string para mostrar o total de resultados e qual está sendo mostrado. Parâmetros que podem ser utilizados: **start, end e length**|

### Parâmetros CSS

| Name | Default | Description |
| --- | --- | --- |
| --divider-color | #CCCCCC50 | Cor usada para as linhas de divisão da tabela |
| --label-font-size | 1rem | Tamanho da fonte para os labels na tabela |
| --label-font-color |#FFFFFF | Cor da fonte para os labels na tabela |


## Propriedades das colunas

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | String | **Obrigatório** | String que aparecerá no Header da coluna |
| style | Objeto |  | Objeto descrevendo o estilo da coluna, mesmo formato do CSS, com camelcase no lugar do híphen |
| hideMobile | Boolean | false| Indica se a coluna deve aparecer ou não em telas menores |
| hideDesktop | Boolean | false | Indica se a coluna deve aparecer ou não em telas maiores |
| renderFunc | Function | DefaultTableElement | Função que irá renderizar cada elemento da coluna |
| composite | Objeto | | Uma coluna também pode ser composta por mais de um atributo, para isso deve-se passar ou o nome do atributo (caso já possua uma coluna, ou a definição desse novo atributo). Veja o exemplo acima |
