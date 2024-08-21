import { GAMEVIEWSTATE } from "../../App";
import allGeneralItems from "../../data/items/items";
import { GeneralItem } from "../../models/Item.model";

import KeyButton from "../KeyButton";


import "./store-view.css";

interface StoreViewProps {
	changeState: (state: GAMEVIEWSTATE) => void;
}

const StoreView = (props: StoreViewProps) => {
	function back() {
		props.changeState(GAMEVIEWSTATE.MAINMENU);
	}

	return (
		<div className="store-view">
			<h1>Store</h1>

			<div className="items">
				{allGeneralItems.map((item, index) => (
					<GeneralItemContainer key={`item-${index}`} item={item} />
				))}
			</div>

			<KeyButton onClick={back} className="wide">
				Back
			</KeyButton>
		</div>
	);
};

const GeneralItemContainer = (props: { item:GeneralItem }) => {
	function buy() {}

	return (
		<div className="item">
			<h2>{props.item.name}</h2>

			<p>Cost: {props.item.price}</p>
			<KeyButton onClick={buy}>Buy</KeyButton>
		</div>
	);
};

export default StoreView;
