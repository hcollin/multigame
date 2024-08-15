import { proxy } from "valtio";
import { CELLTYPE, Grid } from "../models/Grid.model";
import { Troop, TROOPSTATUS } from "../models/Troops.model";

export enum MOVEDIRECTION {
    LEFT = "left",
    RIGHT = "right",
}

export enum GAMESTATUS {
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

    process: () => void;
    move: (troopId: string, direction: MOVEDIRECTION) => boolean;
}

export const gameStore = proxy<GameStore>({
    turn: 0,
    grid: {
        size: [20, 8],
        rows: [],
    },
    troops: [],

    status: GAMESTATUS.PLAY,
    row: 0,
    moveHistory: [],


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


        // All drowned troops are now dead
        gameStore.troops.forEach((t) => {
            if(t.status === TROOPSTATUS.DROWNED) {
                t.status = TROOPSTATUS.DEAD;
            }
        });


        // Check if any troop drops into water
        gameStore.troops.forEach((t) => {
            const isInWater = gameStore.grid.rows[gameStore.row + t.rowDiff].cells[t.col].type === CELLTYPE.WATER;
            if(isInWater) {
                t.status = TROOPSTATUS.DROWNED;
                t.size = 0;
            }
            // return isInWater;
        });



        // If now troops are alive, game over
        const aliveTroops = gameStore.troops.filter((t) => t.status === TROOPSTATUS.ALIVE);
        if(aliveTroops.length === 0) {
            console.log("Game Over");
            gameStore.status = GAMESTATUS.LOST;
        }
        
        // If any troop reaches the end alive, game won
        if(gameStore.row === gameStore.grid.size[0] - 1) {
            const won = gameStore.troops.some((t) => t.status === TROOPSTATUS.ALIVE);
            if(won) {
                console.log("Game Won");
                gameStore.status = GAMESTATUS.WON;
            }
        }
        
    },

    move: (troopId: string, direction: MOVEDIRECTION) => {
        console.log(gameStore.turn, gameStore.moveHistory.length);
        const troop = gameStore.troops.find((t) => t.id === troopId);
        if (!troop) return false;

        if (direction === MOVEDIRECTION.LEFT) {
            if (troop.col === 0) {
                return false;
            }

            troop.col--;
        }

        if(direction === MOVEDIRECTION.RIGHT) {
            if (troop.col === gameStore.grid.size[1] - 1) {
                return false;
            }

            troop.col++;
        }   

        gameStore.moveHistory.push(`Troop ${troopId} moved ${direction} row ${gameStore.row}`);
        gameStore.process();

        return true;
    },
});
