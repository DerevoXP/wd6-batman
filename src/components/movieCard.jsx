import React from 'react';
import * as PropTypes from 'prop-types';
import { all as Misc } from "./misc";
import {
	Card,
	CardBody,
	Row
} from "reactstrap";


function MovieCard(props) {

	const onViewMore = () => null; // оно тут нафиг не нужно. Но пусть будет.

	const {
		id,
		name = "",
		url = "",
		image = {},
		summary,
		premiered,
		watched,
		showList,
	} = props;

	return (
		<Card style={{ width: "30%", margin: "15px" }} color={watched !== -1 ? "success" : ""} >
			<Misc.ImageGo image={image} name={name} />
			<CardBody>
				<Misc.NameGo name={name} />
				<Misc.SummaryGo summary={summary} />
				<Misc.PremieredUrlGo premiered={premiered} url={url} />
				<Row>
					<Misc.WatchedGo watched={watched} showList={showList} id={id} />
					<Misc.ViewMore onViewMore={onViewMore} id={id} />
				</Row>
			</CardBody>
		</Card>
	)
};

MovieCard.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	url: PropTypes.string,
	image: PropTypes.string,
	summary: PropTypes.string,
	premiered: PropTypes.string,
	watched: PropTypes.number,
	showList: PropTypes.func,
};

export default React.memo(MovieCard); // а чо, так можно было штоле? О_о