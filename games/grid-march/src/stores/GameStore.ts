import { proxy } from "valtio";
import { CELLTYPE, Grid, GRIDOBJECTSTATUS, GRIDOBJECTYPE } from "../models/Grid.model";
import { Troop, TROOPSTATUS } from "../models/Troops.model";
import { gridObjectValue } from "../utils/gridObject";

export enum MOVEDIRECTION {
    LEFT = "left",
    RIGHT = "right",
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
    troops: Troop[];
    status: GAMESTATUS;

    row: number;

    moveHistory: string[];

    reset: (grid: Grid, troops: Troop[]) => void;
    start: () => void;

    process: () => void;
    move: (troopId: string, direction: MOVEDIRECTION) => boolean;

    takeDamage: (troopId: string, damage: number) => void;
}

export const gameStore = proxy<GameStore>({
    turn: 0,
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

        // Remove all dead troops
        gameStore.troops = gameStore.troops.filter((t) => t.status !== TROOPSTATUS.DEAD);

        // Check effects of the grid for each troop
        gameStore.troops.forEach((t) => {
            const troopCell = gameStore.grid.rows[gameStore.row + t.rowDiff].cells[t.col];

            // If troop is in water, take 50% damage
            const isInWater = troopCell.type === CELLTYPE.WATER;
            if (isInWater) {
                const dmg = Math.floor(t.size / 2);
                gameStore.takeDamage(t.id, dmg);
            }

            // Check for objects on the cell
            troopCell.objects.forEach((o) => {
                if (o.status !== GRIDOBJECTSTATUS.ONGRID) return;
                
                if (o.type === GRIDOBJECTYPE.TROOPPLUS) {
                    const val = gridObjectValue(o);
                    t.size += val;
                    o.status = GRIDOBJECTSTATUS.PICKEDUP;
                }

                if (o.type === GRIDOBJECTYPE.TROOPMULTI) {
                    const val = gridObjectValue(o);
                    t.size *= val;
                    o.status = GRIDOBJECTSTATUS.PICKEDUP;
                }
            });
        });

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
});
