import { proxy } from "valtio";
import { Item } from "../models/Item.model";

export interface GameStore {
	score: number;
	level: number;

    troops: number;

    items: Item[];
}

const gameStore = proxy<GameStore>({
	score: 0,
	level: 1,
    troops: 20,
    items: [],
});

export default gameStore;

export function increaseScore(amount: number) {
	gameStore.score += amount;
}


export function newGame() {
    gameStore.score = 0;
    gameStore.level = 1;
    gameStore.items = [];
}