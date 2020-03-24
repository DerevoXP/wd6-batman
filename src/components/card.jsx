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

	let filmBox = []; // хранилище для фильмов, очищенное от говна
	for (let i in props) {
		let a = props[i].show;
		const {
			id,
			image,
			name,
			summary,
			sawStatus = "не смотрел"
		} = a;
		let descr = summary.replace(/<\/?[^>]+>/g, ''); // удаляем тэги <p> из описания. Спасибо, Гугл.
		filmBox.push({ id, image, name, descr, sawStatus }); // запихиваем в хранилище только то, что нам нужно.
	}

	////////////////////////////////////////////////////////////////////////

	const iSawIt = (e) => {
		const {
			crutch,
		} = e.sawStatus

		console.log("elem = ", e.sawStatus);
		// e.sawStatus = e.sawStatus === "не смотрел" ? "смотрел" : "не смотрел";
		return (
		<> { e.sawStatus } </>
		)
	}

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
					<CardText> Status: {iSawIt({sawStatus})} </CardText>
					<Button onClick={(e) => iSawIt({ sawStatus })}>Button</Button>
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
