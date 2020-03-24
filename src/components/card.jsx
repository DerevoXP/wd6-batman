import React, { Component } from "react";
import * as PropTypes from 'prop-types';

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

export function CardRen(props) {

	// CardRen.propTypes = {
	// 	id: PropTypes.number.isRequired,
	// 	image: PropTypes.string.isRequired,
	// 	name: PropTypes.string.isRequired,
	// 	description: PropTypes.string,
	// 	premiered: PropTypes.string,
	// };

	// CardRen.defaultProps = {
	// 	name: "No name movies",
	// 	description: "No descriptions",
	// };

	//	console.log("Отака херня, малята :", props); // пропс представляет из себя объект с объектами. Я не уверен, что это фен-шуй, но время военное - не до фен-шуя.

	////////////////////////////////////////////////////////////////////////

	let idSetter; // инициализируем локалсторож
	if (localStorage.length == 0) { // если локалсторож пуст, то  создаём хранилище айдишников 
		localStorage.setItem(`moviesInfo`, JSON.stringify([]));
	} else {
		idSetter = localStorage.getItem('moviesInfo');
	};

	const iSawIt = (e, sawStatus) => { // засовываем в локалсторож айдишники просмотренных (возможно, через жопу, но я ещё только учусь)
		const { target } = e;
		const { name } = target;
		console.log("name = ", name);
		let base = JSON.parse(localStorage.getItem('moviesInfo'));
		if (base.indexOf(name) != -1) { // проверяем, есть ли в локалстороже такой айдишник
			for (let i = 0; i < base.length; i++) {
				if (base[i] == name) {
					base.splice(i, 1);
					localStorage.setItem(`moviesInfo`, JSON.stringify(base));
					break;
				};
			};
		} else { // если такого айдишника нет - добавляем его
			base.push(name);
			localStorage.setItem(`moviesInfo`, JSON.stringify(base));
		}
		return (
			null
		)
	}

	////////////////////////////////////////////////////////////////////////

	let filmBox = []; // хранилище для фильмов, очищенное от говна

	let base = JSON.parse(localStorage.getItem('moviesInfo'));

	for (let i in props) {
		let a = props[i].show;
		const {
			id,
			image,
			name,
			summary,
		} = a;

		let descr = summary.replace(/<\/?[^>]+>/g, ''); // удаляем тэги <p> из описания. Спасибо, Гугл.
		
		let sawStatus;

		if (base.indexOf(id) != -1) { // что так, продажная женщина, всегда тру
			sawStatus = "ПРОСМОТРЕНО";
			console.log("просмотрено id", id, " в ", base);
		} else {
			sawStatus = "НЕ ПРОСМОТРЕНО";
			console.log("не просмотрено id", id, " в ", base);
		}

		// let k = false;
		// for (let j = 0; j<base.length; j++) {
		// 	if (base[j] = id) k = true;
		// }
		// console.log(k); // что так, ещё более продажная женщина, всегда тру

		filmBox.push({ id, image, name, descr, sawStatus}); // запихиваем в хранилище только то, что нам нужно.
	};

	////////////////////////////////////////////////////////////////////////

	const renderCard = (filmInfo) => {

		const {
			id, // покамест непонятно, нахера нам сдался что key, что id. But let it be.
			image,
			name,
			descr,
			sawStatus,
		} = filmInfo;

		return (

			<Card style={{
				width: "30%",
				margin: "10px",
			}}>
				<CardBody>
					<CardImg top width="100%" src={image.medium} alt={name} />
					<CardTitle><br />Name: {name}</CardTitle>
					<CardText>Descript: {descr}</CardText>
					<CardText> Status: {sawStatus} </CardText>
					<Button name={id} onClick={(e) => iSawIt(e, { sawStatus })}>Button</Button>
				</CardBody>
			</Card>
		)
	};

	/////////////////////////////////////////////////////////////////////

	return (

		<div style={{
			display: "flex",
			flexWrap: "wrap",
			justifyContent: "space-evenly",
		}}>
			{filmBox.map(renderCard)}
		</div>
	)
};
