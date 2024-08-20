import { FC, useState } from "react";
import { CELLTYPE } from "../../models/Grid.model";

import "./background-tile.css";
import { rnd } from "rndlib";

export type BackgroundTileProps = {
    type?: CELLTYPE;
}

let prevPos = 0;

const BackgroundTile: FC<BackgroundTileProps> = (props) => {

    const [pos] = useState(() => {
        let newPos = rnd(1,4);
        while(newPos === prevPos) {
            newPos = rnd(1,4);
        }
        return newPos;
    });

    const type = props.type || CELLTYPE.EMPTY;

    const rndPos = `pos-${pos}`;

    const classes = `bg-tile ${type} ${rndPos}`;
    return (
        <div className={classes}></div>
    );
}

export default BackgroundTile;