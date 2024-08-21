import { useSnapshot } from "valtio";
import { Troop } from "../../models/Troops.model";

import "./troop-cell.css";
import { levelStore } from "../../stores/LevelStore";

export interface TroopCellProps {
	troop: Troop;
}

const TroopCell = (props: TroopCellProps) => {
	const snap = useSnapshot(levelStore);

	const classes = ["troop-cell"];
	classes.push(props.troop.status);
	classes.push(props.troop.active ? "active" : "inactive");

	let textSizeClass: string = "";

	if (props.troop.size < 10) textSizeClass = "large-text";
	if (props.troop.size > 999) textSizeClass = "small-text";
	if (props.troop.size > 99999) textSizeClass = "mini-text";
	classes.push(textSizeClass);


    props.troop.effects.forEach((effect) => {
        classes.push(effect);
    });


	function setMeActive() {
		snap.setActiveTroop(props.troop.id);
	}

	return (
		<div className={classes.join(" ")} onClick={setMeActive}>
			{props.troop.size}
		</div>
	);
};

export default TroopCell;
