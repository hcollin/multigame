import { proxy } from "valtio";
import { CELLTYPE, Grid, GRIDOBJECTSTATUS, GRIDOBJECTYPE } from "../models/Grid.model";
import { Troop, TROOPEFFECTS, TROOPSTATUS } from "../models/Troops.model";
import { gridObjectValue } from "../utils/gridObject";

export enum MOVEDIRECTION {
	LEFT = "left",
	RIGHT = "right",
	FORWARD = "forward",
}

export enum GAMESTATUS {
	INIT = "init",
	PLAY = "play",
	WON = "won",
	LOST = "lost",
}

export interface GameStore {
	turn: number;
	grid: Grid;
	score: number;
	troops: Troop[];
	status: GAMESTATUS;

	row: number;

	moveHistory: string[];

	reset: (grid: Grid, troops: Troop[]) => void;
	start: () => void;

	process: () => void;
	move: (troopId: string, direction: MOVEDIRECTION) => boolean;

	takeDamage: (troopId: string, damage: number) => void;

	setActiveTroop: (troopId: string) => void;
	setNextTroopActive: () => void;
	getActiveTroop: () => Troop | null;
	addNewTroop: (troop: Troop) => void;
	remoteTroop: (troopId: string) => void;

	jumpTroop: (troopId?: string) => void;
}

export const gameStore = proxy<GameStore>({
	turn: 0,
	score: 0,
	grid: {
		size: [0, 0],
		rows: [],
	},
	troops: [],

	status: GAMESTATUS.INIT,
	row: 0,
	moveHistory: [],

	start: () => {
		gameStore.status = GAMESTATUS.PLAY;
	},

	reset: (grid: Grid, troops: Troop[]) => {
		gameStore.turn = 0;
		gameStore.row = 0;
		gameStore.grid = grid;
		gameStore.troops = troops;
		gameStore.status = GAMESTATUS.PLAY;
	},

	process: () => {
		gameStore.row++;
		gameStore.turn++;

		gameStore.score++;

		// Remove all dead troops
		gameStore.troops = gameStore.troops.filter((t) => t.status !== TROOPSTATUS.DEAD);

		// Check effects of the grid for each troop
		gameStore.troops.forEach((troop) => {
			if (troop.status === TROOPSTATUS.DEAD) return;

			const troopCell = gameStore.grid.rows[gameStore.row + troop.rowDiff].cells[troop.col];

			const troopIsJumping = troop.effects.includes(TROOPEFFECTS.JUMPING);

			// If troop is in water, take 50% damage
			const isInWater = troopCell.type === CELLTYPE.WATER && !troopIsJumping;
			if (isInWater) {
				const dmg = Math.floor(troop.size / 2);
				gameStore.takeDamage(troop.id, dmg);
			}

			// If troop is in a scoring cell, add its size to the score
			const isScoring = troopCell.type === CELLTYPE.SCORE && !troopIsJumping;
			if (isScoring) {
				gameStore.score += troop.size;
			}

			// If troop is in the last add 25% of its size to the score
			const isLast = gameStore.row === gameStore.grid.size[0] - 1;
			if (isLast) {
				gameStore.score += Math.floor(troop.size / 4);
			}

			// Check for objects on the cell
			if (!troopIsJumping) {
				troopCell.objects.forEach((o) => {
					if (o.status !== GRIDOBJECTSTATUS.ONGRID) return;

					if (o.type === GRIDOBJECTYPE.TROOPPLUS) {
						const val = gridObjectValue(o);
						troop.size += val;
						o.status = GRIDOBJECTSTATUS.PICKEDUP;
					}

					if (o.type === GRIDOBJECTYPE.TROOPMULTI) {
						const val = gridObjectValue(o);
						troop.size *= val;
						o.status = GRIDOBJECTSTATUS.PICKEDUP;
					}
				});
			}

			// All troops in the same cell are combined to a single troop
			const sameCellTroops = gameStore.troops.filter(
				(t) =>
					t.col === troop.col &&
					t.id !== troop.id &&
					t.status === TROOPSTATUS.ALIVE &&
					t.rowDiff === troop.rowDiff &&
					!t.effects.includes(TROOPEFFECTS.JUMPING),
			);
			if (sameCellTroops.length > 0) {
				const totalSize = sameCellTroops.reduce((acc, t) => acc + t.size, troop.size);
				troop.size = totalSize;

				sameCellTroops.forEach((t) => {
					t.status = TROOPSTATUS.DEAD;
					gameStore.remoteTroop(t.id);
				});
			}
		});

		// If no troops are active, activate the first one
		const activeTroop = gameStore.getActiveTroop();
		if (!activeTroop) {
			gameStore.setActiveTroop(gameStore.troops[0].id);
		}

		// If no troops are alive, game over
		const aliveTroops = gameStore.troops.filter((t) => t.status === TROOPSTATUS.ALIVE);
		if (aliveTroops.length === 0) {
			console.log("Game Over");
			gameStore.status = GAMESTATUS.LOST;
		}

		// If any troop reaches the end alive, game won
		if (gameStore.row === gameStore.grid.size[0] - 1) {
			const won = gameStore.troops.some((t) => t.status === TROOPSTATUS.ALIVE);
			if (won) {
				console.log("Game Won");
				gameStore.status = GAMESTATUS.WON;
			}
		}
	},

	move: (troopId: string, direction: MOVEDIRECTION) => {
		const troop = gameStore.troops.find((t) => t.id === troopId);
		if (!troop) return false;

		if (direction === MOVEDIRECTION.FORWARD) {
			// if (troop.effects.includes(TROOPEFFECTS.JUMPING)) {
			// 	troop.effects = troop.effects.filter((e) => e !== TROOPEFFECTS.JUMPING);
			// }
		}

		if (direction === MOVEDIRECTION.LEFT) {
			if (troop.col === 0) {
				return false;
			}
			troop.col--;
		}

		if (direction === MOVEDIRECTION.RIGHT) {
			if (troop.col === gameStore.grid.size[1] - 1) {
				return false;
			}
			troop.col++;
		}

		gameStore.moveHistory.push(`Troop ${troopId} moved ${direction} row ${gameStore.row}`);

        // Remove effects from all troops
        gameStore.troops = gameStore.troops.map((t) => {
            
            const removed: TROOPEFFECTS[] = [];
            t.effects = t.effects.filter((effect) => {
                if(removed.includes(effect)) {
                    return true;
                }
                removed.push(effect);
                return false;
            });
            

            return t;
        });

		return true;
	},

	takeDamage: (troopId: string, damage: number) => {
		const troop = gameStore.troops.find((t) => t.id === troopId);
		if (!troop) return;
		troop.size -= damage;
		if (troop.size <= 0) {
			troop.status = TROOPSTATUS.DEAD;
			troop.size = 0;
		}
	},

	setActiveTroop: (troopId: string) => {
		let activeId = -1;

		gameStore.troops = gameStore.troops.map((t: Troop, i: number) => {
			if (troopId === t.id) {
				t.active = true;
				activeId = i;
			} else {
				t.active = false;
			}
			return t;
		});
		if (activeId === -1 && gameStore.troops.length > 0) {
			gameStore.troops[0].active = true;
		}
	},

	setNextTroopActive: () => {
		const activeTroop = gameStore.getActiveTroop();
		if (activeTroop) {
			const idx = gameStore.troops.findIndex((t) => t.id === activeTroop.id);
			if (idx !== -1) {
				const next = gameStore.troops[(idx + 1) % gameStore.troops.length];
				gameStore.setActiveTroop(next.id);
			} else {
				console.error("No idx?", idx);
			}
		} else {
			console.error("No active troop found");
		}
	},

	getActiveTroop: () => {
		const t = gameStore.troops.find((t: Troop) => t.active) as Troop | undefined;
		return t || null;
	},

	addNewTroop: (troop: Troop) => {
		gameStore.troops.push(troop);
	},

	remoteTroop: (troopId: string) => {
		gameStore.troops = gameStore.troops.filter((t) => t.id !== troopId);
	},

	jumpTroop: (troopId?: string) => {
		const troop = troopId ? gameStore.troops.find((t) => t.id === troopId) : gameStore.getActiveTroop();
		if (!troop) return;

		troop.effects.push(TROOPEFFECTS.JUMPING);
		gameStore.process();
	},
});
