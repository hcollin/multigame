import { Troop } from "../models/Troops.model";

import "./troop-cell.css";

export interface TroopCellProps {
    troop: Troop;
}

const TroopCell = (props: TroopCellProps) => {
    const classes = ["troop-cell"];
    classes.push(props.troop.status);

    return <div className={classes.join(" ")}>{props.troop.size}</div>;
};

export default TroopCell;
