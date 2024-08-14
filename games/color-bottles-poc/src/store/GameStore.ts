import { proxy } from "valtio";
import { iBottle } from "../models/Bottle.model";
import { bottlePour } from "../utils/bottleUtils";
import { GameSettings } from "../models/GameSettings";
import { generateColors, generateBottlesForColors } from "../utils/randomBottle";
import { win } from "../utils/bottleValidator";

export enum GAMESTATUS {
    play = "playing",
    won = "won",
    lost = "lost",
}
/**
 * Store interface
 */
export interface GameStore {
    bottles: iBottle[];
    origBottles: iBottle[];

    status: GAMESTATUS;
    moves: number;

    settings: GameSettings;

    // Game actions
    pour: (sourceId: string, targetId: string) => boolean;

    // Checks if the player wins or loses. Returns true if the state changes
    checkState: () => boolean;

    // Setup action
    reset: () => void;
    newGame: (settings?: GameSettings) => void;

    // Setters
    setBottles: (bottles: iBottle[]) => void;
    setSettings: (settings: GameSettings) => void;
    setStatus: (status: GAMESTATUS) => void;

    getBottle(id: string): iBottle | undefined;
}


/**
 * Game Store Object
 */
export const gameStore: GameStore = proxy<GameStore>({
    bottles: [],
    origBottles: [],

    moves: 0,

    settings: {
        colors: 4,
        parts: 4,
        multiplier: 1,
    },

    status: GAMESTATUS.play,

    pour: (sid, tid) => {
        console.log(`Pour ${sid} to ${tid}` );
        const source = gameStore.getBottle(sid);
        const target = gameStore.getBottle(tid);
        if(!source || !target) return false;
        
        const pourIsSuccess = bottlePour(source, target);
        if (!pourIsSuccess) return false;
        gameStore.bottles = gameStore.bottles.map((b) => {
            if (b.id === source.id) return source;
            if (b.id === target.id) return target;
            return b;
        });
        gameStore.checkState();
        gameStore.moves++;
        return true;
    },


    checkState: () => {

        const won = win(gameStore.bottles);

        if(won && gameStore.status === GAMESTATUS.play) {
            gameStore.status = GAMESTATUS.won;
            return true;
        }
        
        return false;
    },

    reset: () => {
        gameStore.bottles = [...gameStore.origBottles];
        gameStore.status = GAMESTATUS.play;
    },

    newGame: (settings) => {
        if (settings) {
            gameStore.settings = settings;
        }

        const colorArray = generateColors(
            gameStore.settings.multiplier,
            gameStore.settings.parts,
            gameStore.settings.colors
        );

        const newBottles = generateBottlesForColors(colorArray, gameStore.settings.parts);

        gameStore.bottles = newBottles;
        gameStore.origBottles = [...newBottles];
        gameStore.status = GAMESTATUS.play;
    },

    setBottles: (bottles: iBottle[]) => {
        gameStore.bottles = bottles;
    },
    setSettings: (settings: GameSettings) => {
        gameStore.settings = settings;
    },
    setStatus: (status: GAMESTATUS) => {
        gameStore.status = status;
    },

    getBottle: (id) => {
        return gameStore.bottles.find((b: iBottle) => b.id === id);
    }
});
