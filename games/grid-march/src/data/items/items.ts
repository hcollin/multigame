import { v4 } from "uuid";
import { GeneralItem, ITEMTYPE } from "../../models/Item.model";
import { mainProcess } from "../../utils/commands";
import { splitTroop } from "../../utils/troopUtils";

export const itemJump: GeneralItem = {
	name: "Jump",
	price: 100,

	stats: {
		cooldown: 0,
		charges: 0,
	},

	types: [ITEMTYPE.SINGLEUSE, ITEMTYPE.ACTIVE, ITEMTYPE.ENDTURN],

	execution: {
		jump: {
			key: "activate",
			process: (levelStore, _gameStore, troop) => {
				if (!troop) return;
				levelStore.jumpTroop(troop.id);
			},
		},
	},

	create: () => {
		return {
			id: v4(),
			used: 0,
			...itemJump,
		};
	},
};

export const itemSplitter: GeneralItem = {
	name: "Splitter",
	price: 250,

	stats: {
		cooldown: 3,
		charges: 0,
	},

	types: [ITEMTYPE.COOLDOWN, ITEMTYPE.ACTIVE, ITEMTYPE.ENDTURN],

	execution: {
		split: {
			key: "activate",
			process: (levelStore, _gameStore, troop) => {
				if (!troop) return;
				if (troop && troop.size > 2) {
					const nt = splitTroop(troop);
					if (nt.col >= levelStore.grid.size[1] - 1) {
						nt.col = levelStore.grid.size[1] - 1;
					}
					if (troop.col < 0) troop.col = 0;
					levelStore.addNewTroop(nt);
					mainProcess();
				}
			},
		},
	},

	create: () => {
		return {
			id: v4(),
			used: 1,
			...itemSplitter,
		};
	},
};
