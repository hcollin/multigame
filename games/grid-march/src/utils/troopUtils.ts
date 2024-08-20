import { Troop, TROOPSTATUS } from "../models/Troops.model";

let troopIdCounter = 1;

export function createTroop(troopOpts: Partial<Troop>): Troop {
	return {
		id: troopOpts.id || `troop-${troopIdCounter++}`,
		col: troopOpts.col || 0,
		rowDiff: troopOpts.rowDiff || 0,
		size: troopOpts.size || 20,
		status: troopOpts.status || TROOPSTATUS.ALIVE,
		active: troopOpts.active || false,
		effects: troopOpts.effects || [],
	};
}

export function splitTroop(troop: Troop): Troop {
	troop.size = Math.floor(troop.size / 2);
	const newTroop = createTroop({ col: troop.col + 1, size: troop.size, rowDiff: troop.rowDiff, active: false });
	troop.active = true;
	troop.col = troop.col - 1;

	return newTroop;
}
