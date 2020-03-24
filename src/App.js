import React from 'react';
import { CardRen } from "./components/card";


import {
	Container,
	Row,
	Col,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
} from 'reactstrap';

class App extends React.PureComponent {

	constructor(props) {

		super(props);
		this.state = {
			list: [], // список комиксов
			watched: JSON.parse(localStorage.getItem('moviesInfo')), // список смотрел / не смотрел
			errState: null, // состояние запроса - есть ошибка / все ок
		}
	}

	componentDidMount() {

		const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');
		movies.then((data) => {
			return data.json();
		}).then((data) => {
			this.setState({
				list: data || [],
			});
		}).catch((e) => {
			console.log("REQUEST ERROR: ".e);
		});
	}

	// showStatusRender(id) {
	// 	if (this.state.watched.indexOf(id) != -1) { // проверяем, есть ли в локалстороже такой айдишник
	// 		return ("ПРОСМОТРЕНО")
	// 	} else {
	// 		return (
	// 			"НЕ ПРОСМОТРЕНО"
	// 		)
	// 	}
	// }

	render() {

		console.log("Почему этот трахнутый рендер отрабатывает дважды или четырежды? Где, его мать, логика?")

		return (
			<Container>
				<Row>
					<Col ><h1>Batman Cartoons</h1></Col>
				</Row>
				<div style={{
					backgroundColor: "black",
				}}>
					<CardRen {...this.state.list} />
				</div>
			</Container>
		);
	}
}

export default App; // помнится, за каким-то членом мы переносили эту строчку вверх. За каким?