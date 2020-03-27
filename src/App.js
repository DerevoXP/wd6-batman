import React from 'react';
import {
	Container,
	Row,
	Col,
} from 'reactstrap';

import Err from './components/err';
import MovieCard from './components/MovieCard';


class App extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			list: [], // список комиксов
			watched: [], // список смотрел / не смотрел
			errState: null, // состояние запроса - есть ошибка / все ок
		};
	}

	componentDidMount() { // тут всегда солнечно, сучара. Не надо тут ничего трогать.
		const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');
		movies.then((data) => {
			return data.json();
		}).then((data) => {
			this.setState({
				list: data || [],
			});
		}).catch((e) => {
			console.log("REQUEST ERROR: ", e);
			this.setState({ errState: e });
		});

		if (localStorage.length === 0) { // если локалсторож пуст, то  создаём хранилище айдишников в локалстороже
			localStorage.setItem(`moviesInfo`, JSON.stringify([]));
		} else {
			this.setState({ watched: JSON.parse(localStorage.getItem('moviesInfo')) });
		};

	}

	onChange = (id) => {
		return this.state.watched.indexOf(id);
	}

	onChangeHandler = (id) => {	 // вызывается по нажатию кнопки смотрел/не смотрел	

		let index = this.onChange(id);
		let base = [...this.state.watched];
		if (index !== -1) {
			base.splice(index, 1);
		} else {
			base.push(id);
		};
		this.setState({ watched: base }, () => localStorage.setItem(`moviesInfo`, JSON.stringify(base)));
	}

	renderCard = () => {

		if (this.state.list.length === 0) {
			return null;
		}

		return this.state.list.map((item) => {

			const {
				id,
				name = "",
				url = "",
				image = {},
				summary,
				premiered,
			} = item.show || {}; // потрошим сведения о фильме из JSON

			return <MovieCard
				key={id}
				id={id}
				name={name}
				url={url}
				image={image.medium}
				summary={summary}
				premiered={premiered}
				watched={this.onChange(id)} // если фильма нет в локалстороже, то -1
				showList={this.onChangeHandler} // передаём в потомка метод смены статуса "просмотрено/не просмотрено" 
			/>
		});
	};

	render() {

		if (this.state.errState !== null) {
			return <Err />
		}

		return (
			<Container>
				<Row>
					<Col><h1>Batman Movies</h1></Col>
				</Row>
				<Row>
					<Col sm="12">
						<div style={{ display: "flex", flexWrap: "wrap" }}>
							{
								this.renderCard()
							}
						</div>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default App;