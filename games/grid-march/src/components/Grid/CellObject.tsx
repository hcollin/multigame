import { GridObject, GRIDOBJECTYPE } from "../../models/Grid.model";
import { gridObjectValue } from "../../utils/gridObject";

import "./cell-object.css";

const CellObject = (props: { object: GridObject }) => {
	if (props.object.type === GRIDOBJECTYPE.TROOPPLUS) {
		return <CellObjectTroopPlus object={props.object} />;
	}
	if (props.object.type === GRIDOBJECTYPE.TROOPMULTI) {
		return <CellObjectTroopMulti object={props.object} />;
	}
	const classes = ["cell-object"];
	// classes.push(props.object.type);

	const val = gridObjectValue(props.object);

	return <div className={classes.join(" ")}>{val}</div>;
};

const CellObjectTroopPlus = (props: { object: GridObject }) => {
	const value = gridObjectValue(props.object);
	const valueStr = value > 0 ? `+${value}` : value.toString();
	return <div className="cell-object troop-plus">{valueStr}</div>;
};

const CellObjectTroopMulti = (props: { object: GridObject }) => {
	const value = gridObjectValue(props.object);
	const valueStr = `x${value}`;
	return <div className="cell-object troop-multi">{valueStr}</div>;
};

export default CellObject;
