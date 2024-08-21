import { GameStore } from "../stores/GameStore";
import { LevelStore } from "../stores/LevelStore";
import { Troop } from "./Troops.model";


export enum ITEMTYPE {
    
    PASSIVE = "Passive",            // Passive items always provide their benefit
    ACTIVE = "Active",              // Active items require require an action to use

    ENDTURN = "End Turn",           // Run the main process after this item is used
    
    PERMANENT = "Permanent",        // Permanent items can be used whenever (or are passive)
    COOLDOWN = "Cooldown",          // Cooldown items can be used but need to cooldown afterwards
    SINGLEUSE = "Single Use",       // Single use items can only be used once (and are consumed)
    CHARGES = "Charges",            // Charges items can be used a limited number of usages in the until they are consumed
    
}


export interface ItemExecution {
    key: string;                    // When this event happens, run the process function
    process: (levelStore: LevelStore, gameStore: GameStore, troop?: Troop) => void;         // The function to run
}


export interface GeneralItem {
    name: string;
    price: number;
    
    stats: {
        cooldown: number;
        charges: number;
    }

    types: ITEMTYPE[];

    execution: Record<string, ItemExecution>;

    create: () => Item;
    
}



export interface Item extends GeneralItem {
    id: string;
    used: number;
}