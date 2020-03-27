import React from 'react';
import {
    Button,
    CardImg,
    CardText,
    CardTitle,
    Col
} from "reactstrap";

function NameGo({ name }) {
    return (
        <><CardTitle> {name} </CardTitle></>
    )
};

function ImageGo({ image, name }) {
    return (
        <><CardImg top width="100%" src={image} alt={name} /></>
    )
};

function SummaryGo({ summary }) {
    return (
        <><CardText>
            < small className="text-muted" dangerouslySetInnerHTML={{ __html: summary }} />
        </CardText></>
    )
};

function PremieredUrlGo({ premiered, url }) {
    return (
        <><CardText>
            <small className="text-muted">{premiered}</small> <br />
            <small><a target="_blank" rel="noopener noreferrer" href={url}>Visit movie page</a></small> <br /> <br />
        </CardText></>
    )
};

function ViewMore({ onViewMore, id }) {
    return (
        <><Col>
            <Button
                size="sm"
                onClick={() => { onViewMore(id) }}
                variant="info">
                Детали
			</Button>
        </Col></>
    )
}

function WatchedGo({ watched, showList, id }) {
    return (
        <><Col>
            <Button
                size="sm"
                onClick={() => { showList(id) }}
                variant={watched !== -1 ? "success" : "outline-secondary"}
            >
                {watched !== -1 ? "Смотрел" : "Не смотрел"}
            </Button>
        </Col></>
    )
}

export const all = {
    NameGo: React.memo(NameGo),
    ImageGo: React.memo(ImageGo),
    SummaryGo: React.memo(SummaryGo),
    PremieredUrlGo: React.memo(PremieredUrlGo),
    WatchedGo: React.memo(WatchedGo),
    ViewMore: React.memo(ViewMore),
};