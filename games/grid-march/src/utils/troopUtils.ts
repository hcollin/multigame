import { Troop, TROOPSTATUS } from "../models/Troops.model";

let troopIdCounter = 1;

export function createTroop(troopOpts: Partial<Troop>): Troop {
    return {
        id: troopOpts.id || `troop-${troopIdCounter++}`,
        col: troopOpts.col || 0,
        rowDiff: troopOpts.rowDiff || 0,
        size: troopOpts.size || 20,
        status: troopOpts.status || TROOPSTATUS.ALIVE,
    };
}